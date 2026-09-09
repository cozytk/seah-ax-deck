#!/usr/bin/env node
/* ============================================================================
   visual-qa.mjs — 슬라이드별 라이트/다크 캡처 + 자동 감사 + 시각 검토 게이트.
   출력: .omx/qa/{light,dark}-NNN.png, contact-*.png, report.json,
         review.template.json.

   실행:
     pnpm qa
     pnpm qa:gate   # contact sheet를 직접 읽은 뒤 review.json 검증
   옵션: --slides N, --width N, --height N, --check-review
   ============================================================================ */
import fs from 'node:fs/promises'
import path from 'node:path'
import net from 'node:net'
import { spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const scriptPath = fileURLToPath(import.meta.url)
const defaultRoot = path.resolve(path.dirname(scriptPath), '..')

const issue = (code, message, extra = {}) => ({ code, message, ...extra })
const padSlide = (value) => String(value).padStart(3, '0')

export function createRunId(payload) {
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex')
}

export function findRepeatedSignatures(slides, scheme) {
  const entries = Object.entries(slides ?? {})
    .map(([slide, value]) => ({ slide: Number(slide), signature: value?.layoutSignature }))
    .sort((a, b) => a.slide - b.slide)
  const repeated = []
  let run = []

  const flush = () => {
    if (run.length >= 3 && run[0].signature?.startsWith('body')) {
      repeated.push({
        code: 'REPEATED_LAYOUT',
        severity: 'warning',
        scheme,
        slides: run.map(({ slide }) => slide),
        signature: run[0].signature,
        message: '같은 레이아웃 서명이 3장 연속 반복됩니다.',
      })
    }
    run = []
  }

  for (const entry of entries) {
    const previous = run.at(-1)
    if (!previous || (entry.slide === previous.slide + 1 && entry.signature === previous.signature)) {
      run.push(entry)
    } else {
      flush()
      run.push(entry)
    }
  }
  flush()
  return repeated
}

export function findCopySlopSignals({ title = '', text = '' } = {}) {
  const signals = []
  if (/(^|\s)[—–](\s|$)/.test(title)) {
    signals.push({
      code: 'HEADLINE_EM_DASH_FORMULA',
      severity: 'warning',
      message: '헤드라인이 「주제 — 부연」 공식에 기대고 있습니다.',
    })
  }
  const promotional = /(?:강력한|획기적(?:인)?|압도적(?:인)?|혁신적(?:인)?|한 번이면|버튼\s*\d+\s*번|단\s*\d+\s*(?:개|분|초|단계)?(?:면|으로))/
  if (promotional.test(text)) {
    signals.push({
      code: 'PROMOTIONAL_COPY',
      severity: 'warning',
      message: '과장·판촉성 문구가 보여 학습자 행동과 관찰 가능한 결과로 바꿔야 합니다.',
    })
  }
  return signals
}

export function findDeckStyleIssues(slides, scheme) {
  const entries = Object.entries(slides ?? {})
    .map(([slide, value]) => ({ slide: Number(slide), value: value ?? {} }))
    .sort((a, b) => a.slide - b.slide)
  const issues = []

  const colonSlides = entries
    .filter(({ value }) => /[:：]/.test(value.title ?? ''))
    .map(({ slide }) => slide)
  if (colonSlides.length >= 3) {
    issues.push({
      code: 'HEADLINE_COLON_SERIES',
      severity: 'warning',
      scheme,
      slides: colonSlides,
      message: '콜론 부제형 헤드라인이 3장 이상 반복됩니다.',
    })
  }

  let eyebrowRun = []
  const flushEyebrows = () => {
    if (eyebrowRun.length >= 4) {
      issues.push({
        code: 'EYEBROW_WALL',
        severity: 'warning',
        scheme,
        slides: eyebrowRun.map(({ slide }) => slide),
        message: 'eyebrow가 4장 이상 연속 반복됩니다. 실제 길찾기 정보가 없는 라벨은 제거하세요.',
      })
    }
    eyebrowRun = []
  }
  for (const entry of entries) {
    const previous = eyebrowRun.at(-1)
    const isBody = entry.value.layoutSignature?.startsWith('body')
    const hasEyebrow = entry.value.structure?.eyebrow === true
    if (isBody && hasEyebrow && (!previous || entry.slide === previous.slide + 1)) {
      eyebrowRun.push(entry)
    } else {
      flushEyebrows()
      if (isBody && hasEyebrow) eyebrowRun.push(entry)
    }
  }
  flushEyebrows()
  return issues
}

export function findImageContractIssues(image = {}) {
  const issues = []
  if (!image.loaded) {
    issues.push(issue('IMAGE_BROKEN', '이미지가 로드되지 않았습니다.', { image }))
  }
  if (image.decorative) return issues
  if (!image.alt?.trim?.()) {
    issues.push(issue('IMAGE_ALT_MISSING', '비장식 이미지에 설명형 alt가 없습니다.', { src: image.src }))
  }
  if (!image.caption?.trim?.()) {
    issues.push(issue('FIGCAPTION_MISSING', '비장식 이미지에 figcaption이 없습니다.', { src: image.src }))
  }
  if (!['web', 'generated', 'capture'].includes(image.origin)) {
    issues.push(issue(
      'IMAGE_ORIGIN_MISSING',
      'figure data-origin을 web/generated/capture 중 하나로 지정해야 합니다.',
      { src: image.src },
    ))
  }
  if (image.origin === 'web') {
    if (!/^https:\/\//i.test(image.source ?? '')) {
      issues.push(issue(
        'IMAGE_SOURCE_MISSING',
        '웹 이미지는 figure data-source에 HTTPS 원문 페이지 주소가 필요합니다.',
        { src: image.src },
      ))
    } else if (!image.sourceLinked) {
      issues.push(issue(
        'IMAGE_SOURCE_LINK_MISSING',
        '웹 이미지 figcaption에 data-source 원문 페이지 링크가 필요합니다.',
        { src: image.src, source: image.source },
      ))
    }
  }
  return issues
}

export function validateReview(report, review) {
  if (!review) return [issue('REVIEW_MISSING', 'review.json이 없습니다.')]
  const issues = []
  if (review.runId !== report.runId) {
    issues.push(issue('REVIEW_STALE', 'review.json의 runId가 최신 캡처와 다릅니다.'))
  }

  const inspected = new Set(Array.isArray(review.inspectedSheets) ? review.inspectedSheets : [])
  const missingSheets = (report.contactSheets ?? [])
    .map((sheet) => sheet.path)
    .filter((sheetPath) => !inspected.has(sheetPath))
  if (missingSheets.length) {
    issues.push(issue(
      'CONTACT_SHEET_NOT_INSPECTED',
      '모든 contact sheet를 직접 확인해야 합니다.',
      { missingSheets },
    ))
  }
  if ((report.summary?.errors ?? 0) > 0) {
    issues.push(issue(
      'AUTOMATED_ERRORS_PRESENT',
      `자동 QA 오류 ${report.summary.errors}개가 남아 있습니다.`,
    ))
  }
  const manualIssues = Array.isArray(review.issues) ? review.issues : []
  const highSeverity = manualIssues.filter((entry) => ['blocker', 'major'].includes(entry?.severity))
  const unresolved = highSeverity.filter((entry) => entry?.status !== 'resolved')
  if (unresolved.length) {
    issues.push(issue(
      'MANUAL_ISSUES_UNRESOLVED',
      `수동 blocker/major ${unresolved.length}개가 해결되지 않았습니다.`,
      { issueIds: unresolved.map((entry) => entry.id).filter(Boolean) },
    ))
  }
  const missingEvidence = highSeverity.filter((entry) => (
    entry?.status === 'resolved'
    && (!entry.edit?.trim?.() || !entry.recaptureResult?.trim?.())
  ))
  if (missingEvidence.length) {
    issues.push(issue(
      'MANUAL_RESOLUTION_EVIDENCE_MISSING',
      `해결된 blocker/major ${missingEvidence.length}개에 수정·재캡처 근거가 없습니다.`,
      { issueIds: missingEvidence.map((entry) => entry.id).filter(Boolean) },
    ))
  }
  if (review.verdict !== 'pass') {
    issues.push(issue('REVIEW_NOT_PASSED', 'review.json verdict가 pass가 아닙니다.'))
  }
  return issues
}

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

export async function buildContactSheets({ outDir, scheme, captures }) {
  const { default: sharp } = await import('sharp')
  const batchSize = 9
  const cellWidth = 416
  const imageHeight = 234
  const labelHeight = 28
  const cellHeight = imageHeight + labelHeight
  const gap = 8
  const padding = 8
  const width = 1280
  const height = 818
  const sheets = []

  for (let offset = 0; offset < captures.length; offset += batchSize) {
    const batch = captures.slice(offset, offset + batchSize)
    const composites = []
    for (const [index, capture] of batch.entries()) {
      const column = index % 3
      const row = Math.floor(index / 3)
      const left = padding + column * (cellWidth + gap)
      const top = padding + row * (cellHeight + gap)
      const thumbnail = await sharp(capture.path)
        .resize(cellWidth, imageHeight, { fit: 'cover', position: 'centre' })
        .png()
        .toBuffer()
      const label = Buffer.from(`
        <svg width="${cellWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${cellWidth}" height="${labelHeight}" fill="#272a30"/>
          <text x="9" y="19" fill="#fff" font-size="14" font-family="Arial, sans-serif">
            ${escapeXml(scheme)} · ${padSlide(capture.slide)}
          </text>
        </svg>
      `)
      composites.push({ input: label, left, top })
      composites.push({ input: thumbnail, left, top: top + labelHeight })
    }

    const from = batch[0].slide
    const to = batch.at(-1).slide
    const filename = `contact-${scheme}-${padSlide(from)}-${padSlide(to)}.png`
    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 18, g: 20, b: 24, alpha: 1 },
      },
    }).composite(composites).png().toFile(path.join(outDir, filename))
    sheets.push({ scheme, from, to, path: filename })
  }
  return sheets
}

// Playwright의 page.evaluate 안에서 직렬화되어 실행되므로 외부 변수를 참조하지 않는다.
export function auditRenderedSlide() {
  const errors = []
  const warnings = []
  const add = (target, code, message, extra = {}) => target.push({ code, message, ...extra })
  const visible = (element) => {
    const rect = element.getBoundingClientRect()
    const style = getComputedStyle(element)
    return rect.width > 1 && rect.height > 1 && style.visibility !== 'hidden' && style.display !== 'none'
  }
  const describe = (element) => ({
    tag: element.tagName.toLowerCase(),
    cls: typeof element.className === 'string' ? element.className.slice(0, 80) : '',
    text: (element.innerText || element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
  })

  const overlay = document.querySelector('vite-error-overlay')
  if (overlay) add(errors, 'VITE_ERROR_OVERLAY', 'Vite 오류 오버레이가 슬라이드를 덮고 있습니다.')

  const currentPage = window.__slidev__?.nav?.currentPage
  const currentLayout = Number.isFinite(currentPage)
    ? document.querySelector(`.slidev-page-${currentPage} .slidev-layout`)
    : null
  const layouts = [...document.querySelectorAll('.slidev-layout')].filter(visible)
  const layout = currentLayout && visible(currentLayout) ? currentLayout : layouts.at(-1)
  if (!layout) {
    add(errors, 'LAYOUT_MISSING', '렌더링된 .slidev-layout을 찾지 못했습니다.')
    return {
      title: '', htmlClass: document.documentElement.className, layoutSignature: 'missing',
      errors, warnings, images: [], geometry: { headlineLines: 0 },
      structure: { eyebrow: false, crumbs: false }, copyText: '',
    }
  }

  const layoutRect = layout.getBoundingClientRect()
  const images = []
  const layoutClasses = new Set(String(layout.className).split(/\s+/))
  const kind = layoutClasses.has('cover') ? 'cover' : layoutClasses.has('divider') ? 'divider' : 'body'
  const signatureSelectors = [
    ['split', '.split'], ['shot', '.shot'], ['figure', '.figure'], ['duo', '.duo'],
    ['trio', '.trio'], ['quad', '.quad'], ['vs', '.vs'], ['steps', '.steps'],
    ['timeline', '.timeline'], ['flow', '.flow'], ['zonemap', '.zonemap'],
    ['bigstat', '.bigstat'], ['table', 'table'], ['code', 'pre'],
    ['callout', '.callout'], ['note', '.note'],
  ]
  const signature = kind === 'body'
    ? [kind, ...signatureSelectors
      .map(([name, selector]) => [name, layout.querySelectorAll(selector).length])
      .filter(([, count]) => count > 0)
      .map(([name, count]) => `${name}:${count}`)].join('|')
    : kind

  for (const element of layout.querySelectorAll('*')) {
    if (!visible(element) || ['PATH', 'DEFS', 'SYMBOL', 'G', 'SVG'].includes(element.tagName.toUpperCase())) continue
    const rect = element.getBoundingClientRect()
    const outBottom = Math.round(rect.bottom - layoutRect.bottom)
    const outRight = Math.round(rect.right - layoutRect.right)
    if (outBottom > 2 || outRight > 2) {
      add(errors, 'OVERFLOW', '요소가 슬라이드 경계를 벗어났습니다.', {
        element: describe(element), outBottom, outRight,
      })
    }

    const style = getComputedStyle(element)
    const clipsX = ['hidden', 'clip', 'auto', 'scroll'].includes(style.overflowX)
    const clipsY = ['hidden', 'clip', 'auto', 'scroll'].includes(style.overflowY)
    const clippedX = clipsX && element.scrollWidth > element.clientWidth + 2
    const clippedY = clipsY && element.scrollHeight > element.clientHeight + 2
    if (clippedX || clippedY) {
      add(errors, 'ELEMENT_CLIPPED', '요소 내부 콘텐츠가 잘렸습니다.', {
        element: describe(element), clippedX, clippedY,
        clientWidth: element.clientWidth, scrollWidth: element.scrollWidth,
        clientHeight: element.clientHeight, scrollHeight: element.scrollHeight,
      })
    }
  }

  for (const image of layout.querySelectorAll('img')) {
    if (!visible(image)) continue
    const figure = image.closest('figure')
    const caption = figure?.querySelector('figcaption')?.innerText?.trim() || ''
    const origin = figure?.dataset.origin || ''
    const source = figure?.dataset.source || ''
    const sourceLinked = [...(figure?.querySelectorAll('figcaption a') ?? [])].some((link) => (
      link.getAttribute('href') === source || link.href === source
    ))
    const alt = image.getAttribute('alt')
    const decorative = image.getAttribute('aria-hidden') === 'true' || image.getAttribute('role') === 'presentation'
    const loaded = image.complete && image.naturalWidth > 0 && image.naturalHeight > 0
    const imageRecord = {
      src: image.getAttribute('src') || '',
      currentSrc: image.currentSrc || '',
      loaded,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      alt,
      origin,
      source,
      sourceLinked,
      caption,
      decorative,
    }
    images.push(imageRecord)
  }

  // Slidev/Shiki의 복사 버튼 아이콘 같은 UI 장식은 제외하고, 슬라이드의 시각 증거만 검사한다.
  for (const svg of layout.querySelectorAll('figure svg, .mermaid svg')) {
    if (!visible(svg)) continue
    const decorative = svg.getAttribute('aria-hidden') === 'true' || svg.getAttribute('role') === 'presentation'
    const label = svg.getAttribute('aria-label') || svg.getAttribute('aria-labelledby') || svg.querySelector('title')?.textContent?.trim()
    if (!decorative && !label) {
      add(errors, 'SVG_LABEL_MISSING', '의미 있는 SVG에 aria-label, aria-labelledby 또는 title이 없습니다.', {
        element: describe(svg),
      })
    }
  }

  for (const placeholder of layout.querySelectorAll('.shot-ph')) {
    add(errors, 'SHOT_PLACEHOLDER', '실습 화면 자리표시자(.shot-ph)를 실제 캡처로 교체해야 합니다.', {
      element: describe(placeholder),
    })
  }

  for (const [selector, expected] of [['.duo', 2], ['.trio', 3], ['.quad', 4]]) {
    for (const grid of layout.querySelectorAll(selector)) {
      const actual = [...grid.children].filter((child) => child.classList.contains('pane')).length
      if (actual !== expected) {
        add(errors, 'GRID_COUNT_MISMATCH', `${selector}는 .pane ${expected}개가 필요하지만 ${actual}개입니다.`, {
          selector, expected, actual,
        })
      }
    }
  }

  const headline = layout.querySelector('h1')
  let headlineLines = 0
  if (headline && visible(headline)) {
    const style = getComputedStyle(headline)
    const lineHeight = Number.parseFloat(style.lineHeight) || Number.parseFloat(style.fontSize) * 1.2
    // getBoundingClientRect는 Slidev의 화면 확대 비율이 반영되지만 computed line-height는
    // 내부 캔버스 단위라 서로 나누면 두 줄 제목을 세 줄로 오판한다. 둘 다 내부 단위인
    // scrollHeight와 line-height를 사용한다.
    headlineLines = lineHeight > 0 ? headline.scrollHeight / lineHeight : 0
    if (headlineLines > 2.4) {
      add(warnings, 'HEADLINE_TOO_MANY_LINES', '제목이 세 줄 이상으로 보여 텍스트 배치를 다시 확인해야 합니다.', {
        lines: Number(headlineLines.toFixed(2)),
      })
    }
  }

  const eyebrow = layout.querySelector('.eyebrow')
  const crumbs = layout.querySelector('.crumbs')
  const crumb = crumbs || eyebrow
  const text = layout.innerText || ''
  const textLength = text.replace(/\s+/g, '').length
  if (textLength > 360) add(warnings, 'DENSITY_HIGH', `본문 ${textLength}자로 밀도가 높습니다.`)
  if (crumb && /\bM\d|모듈\s*\d|module\s*\d/i.test(crumb.innerText || '')) {
    add(warnings, 'BREADCRUMB_INTERNAL_CODE', '브레드크럼에 내부 모듈 코드가 보입니다.')
  }
  const calloutCount = layout.querySelectorAll('.callout, .note').length
  if (calloutCount >= 2) add(warnings, 'CALLOUT_OVERUSE', `callout/note가 ${calloutCount}개입니다.`)
  if (/🛑|🚫|❌/.test(text)) add(warnings, 'ALARM_EMOJI', '경보·금지 이모지를 절제된 텍스트 강조로 바꾸세요.')

  return {
    title: (headline?.innerText || layout.querySelector('h2')?.innerText || '').replace(/\s+/g, ' ').trim(),
    htmlClass: document.documentElement.className,
    layoutSignature: signature,
    errors,
    warnings,
    images,
    geometry: { headlineLines: Number(headlineLines.toFixed(2)) },
    structure: { eyebrow: Boolean(eyebrow), crumbs: Boolean(crumbs) },
    copyText: text,
  }
}

export async function waitForVisualAssets(page, timeoutMs = 5_000) {
  return page.evaluate(async (timeout) => {
    const currentPage = window.__slidev__?.nav?.currentPage
    const currentLayout = Number.isFinite(currentPage)
      ? document.querySelector(`.slidev-page-${currentPage} .slidev-layout`)
      : null
    const layouts = [...document.querySelectorAll('.slidev-layout')].filter((element) => {
      const rect = element.getBoundingClientRect()
      return rect.width > 1 && rect.height > 1
    })
    const currentRect = currentLayout?.getBoundingClientRect()
    const layout = currentRect && currentRect.width > 1 && currentRect.height > 1
      ? currentLayout
      : layouts.at(-1)
    const images = layout ? [...layout.querySelectorAll('img')] : []
    const ready = async () => {
      if (document.fonts?.ready) await document.fonts.ready.catch(() => {})
      await Promise.all(images.map(async (image) => {
        if (typeof image.decode === 'function') await image.decode().catch(() => {})
        else if (!image.complete) await new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true })
          image.addEventListener('error', resolve, { once: true })
        })
      }))
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      return 'ready'
    }
    return Promise.race([
      ready(),
      new Promise((resolve) => setTimeout(() => resolve('timeout'), timeout)),
    ])
  }, timeoutMs)
}

const getFreePort = () => new Promise((resolve, reject) => {
  const server = net.createServer()
  server.unref()
  server.on('error', reject)
  server.listen(0, '127.0.0.1', () => {
    const port = server.address().port
    server.close(() => resolve(port))
  })
})

const waitForServer = async (base) => {
  let lastError = null
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      if ((await fetch(`${base}/1`)).ok) return
    } catch (error) {
      lastError = error
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  const detail = lastError?.message ? `: ${lastError.message}` : ''
  throw new Error(`Slidev 서버가 제한 시간 안에 응답하지 않았습니다${detail}`)
}

const digestFile = async (filename) => createHash('sha256').update(await fs.readFile(filename)).digest('hex')

const summarizeReport = (report) => {
  let errors = 0
  let warnings = report.deckIssues.length
  for (const scheme of ['light', 'dark']) {
    for (const slide of Object.values(report[scheme] ?? {})) {
      errors += slide.errors.length
      warnings += slide.warnings.length
    }
  }
  return { errors, warnings }
}

const stopServer = async (server) => {
  if (!server || server.exitCode !== null || server.killed) return
  server.kill('SIGTERM')
  await Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ])
}

const readArg = (args, key, fallback) => {
  const index = args.indexOf(`--${key}`)
  return index >= 0 ? args[index + 1] : fallback
}

/* 덱이 둘이다 — 전체판(slides.md)과 요약판(summary.md).
   DECK_ENTRY 로 어느 쪽을 캡처할지 고르고, 캡처·리뷰도 각자 폴더에 따로 쌓는다.
   같은 폴더에 쌓으면 요약판 리뷰가 전체판 리뷰를 덮어쓴다.
     pnpm qa                     → slides.md  → .omx/qa
     DECK_ENTRY=summary.md pnpm qa → summary.md → .omx/qa-summary */
const DECK_ENTRY = process.env.DECK_ENTRY || 'slides.md'
const QA_DIR = DECK_ENTRY === 'slides.md' ? 'qa' : `qa-${DECK_ENTRY.replace(/\.md$/, '')}`

export async function runVisualQa({ root = defaultRoot, args = [] } = {}) {
  const { chromium } = await import('playwright-chromium')
  const outDir = path.join(root, '.omx', QA_DIR)
  const maxSlidesValue = readArg(args, 'slides', null)
  const maxSlides = maxSlidesValue == null ? null : Number(maxSlidesValue)
  const viewport = {
    width: Number(readArg(args, 'width', 1280)),
    height: Number(readArg(args, 'height', 720)),
  }
  const generatedAt = new Date().toISOString()
  const report = {
    schemaVersion: 2,
    runId: '',
    generatedAt,
    viewport,
    total: 0,
    captured: 0,
    contactSheets: [],
    summary: { errors: 0, warnings: 0 },
    deckIssues: [],
    light: {},
    dark: {},
  }
  const allCaptures = []
  let browser
  let slidevServer

  try {
    const port = await getFreePort()
    const base = `http://localhost:${port}`
    slidevServer = spawn('pnpm', ['exec', 'slidev', DECK_ENTRY, '--port', String(port), '--log', 'warn'], {
      cwd: root,
      stdio: ['ignore', 'ignore', 'pipe'],
    })
    slidevServer.stderr.on('data', (chunk) => process.stderr.write(chunk))
    await waitForServer(base)

    await fs.rm(outDir, { recursive: true, force: true })
    await fs.mkdir(outDir, { recursive: true })
    browser = await chromium.launch()

    for (const scheme of ['light', 'dark']) {
      const page = await browser.newPage({ viewport, colorScheme: scheme })
      const captures = []
      try {
        await page.goto(`${base}/#/1`, { waitUntil: 'domcontentloaded', timeout: 60_000 })
        await page.waitForFunction(() => window.__slidev__?.nav?.total > 0, null, { timeout: 15_000 })
        await page.waitForFunction(() => {
          const current = window.__slidev__?.nav?.currentPage
          const element = document.querySelector(`.slidev-page-${current} .slidev-layout`)
          const rect = element?.getBoundingClientRect()
          return current === 1 && rect && rect.width > 1 && rect.height > 1
        }, null, { timeout: 15_000 })
        const total = await page.evaluate(() => window.__slidev__.nav.total)
        report.total = total
        const captured = maxSlides ? Math.min(maxSlides, total) : total
        report.captured = captured

        for (let slideNumber = 1; slideNumber <= captured; slideNumber += 1) {
          let navigationError = null
          await page.evaluate((target) => window.__slidev__.nav.go(target), slideNumber)
          try {
            await page.waitForFunction(
              (target) => window.__slidev__?.nav?.currentPage === target,
              slideNumber,
              { timeout: 8_000 },
            )
          } catch (error) {
            navigationError = issue('NAV_TIMEOUT', `슬라이드 ${slideNumber} 이동 확인이 시간 안에 끝나지 않았습니다.`, {
              detail: error.message,
            })
          }
          try {
            await page.waitForFunction((target) => {
              const element = document.querySelector(`.slidev-page-${target} .slidev-layout`)
              const rect = element?.getBoundingClientRect()
              return rect && rect.width > 1 && rect.height > 1 && getComputedStyle(element).visibility !== 'hidden'
            }, slideNumber, { timeout: 3_000 })
          } catch (error) {
            navigationError ??= issue('LAYOUT_SETTLE_TIMEOUT', `슬라이드 ${slideNumber} 레이아웃이 화면에 나타나지 않았습니다.`, {
              detail: error.message,
            })
          }
          await page.waitForTimeout(350)
          await waitForVisualAssets(page)

          const filename = `${scheme}-${padSlide(slideNumber)}.png`
          const screenshotPath = path.join(outDir, filename)
          await page.screenshot({ path: screenshotPath, animations: 'disabled' })
          const audit = await page.evaluate(auditRenderedSlide)
          audit.warnings.push(...findCopySlopSignals({ title: audit.title, text: audit.copyText }))
          for (const image of audit.images) audit.errors.push(...findImageContractIssues(image))
          delete audit.copyText
          if (navigationError) audit.errors.unshift(navigationError)
          audit.screenshot = filename
          report[scheme][slideNumber] = audit
          const capture = { scheme, slide: slideNumber, path: screenshotPath, filename }
          captures.push(capture)
          allCaptures.push(capture)
        }
      } finally {
        await page.close()
      }
      report.contactSheets.push(...await buildContactSheets({ outDir, scheme, captures }))
    }

    report.deckIssues = [
      ...findRepeatedSignatures(report.light, 'light'),
      ...findRepeatedSignatures(report.dark, 'dark'),
      ...findDeckStyleIssues(report.light, 'light'),
      ...findDeckStyleIssues(report.dark, 'dark'),
    ]
    const captureHashes = []
    for (const capture of allCaptures) {
      captureHashes.push({ path: capture.filename, sha256: await digestFile(capture.path) })
    }
    report.runId = createRunId({ generatedAt, viewport, total: report.total, captured: report.captured, captureHashes })
    report.summary = summarizeReport(report)

    await fs.writeFile(path.join(outDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`)
    await fs.writeFile(path.join(outDir, 'review.template.json'), `${JSON.stringify({
      schemaVersion: 1,
      runId: report.runId,
      expectedSheets: report.contactSheets.map((sheet) => sheet.path),
      inspectedSheets: [],
      verdict: 'pending',
      issues: [],
    }, null, 2)}\n`)

    for (const scheme of ['light', 'dark']) {
      for (const [slideNumber, slide] of Object.entries(report[scheme])) {
        for (const error of slide.errors) console.error(`❌ [${scheme} ${slideNumber}] ${error.code}: ${error.message}`)
        for (const warning of slide.warnings) console.warn(`• [${scheme} ${slideNumber}] ${warning.code}: ${warning.message}`)
      }
    }
    for (const deckIssue of report.deckIssues) {
      console.warn(`• [${deckIssue.scheme} ${deckIssue.slides.join(',')}] ${deckIssue.code}: ${deckIssue.message}`)
    }
    console.log(`\n총 ${report.total}장 중 ${report.captured}장 × 2 schemes`)
    console.log(`자동 오류 ${report.summary.errors} · 경고 ${report.summary.warnings}`)
    console.log(`캡처/콘택트시트: ${path.relative(root, outDir)}/`)
    console.log('모든 contact sheet를 직접 읽고 review.json을 작성한 뒤 pnpm qa:gate를 실행하세요.')
    return report.summary.errors > 0 ? 1 : 0
  } finally {
    if (browser) await browser.close().catch(() => {})
    await stopServer(slidevServer)
  }
}

export async function checkReview({ root = defaultRoot } = {}) {
  const outDir = path.join(root, '.omx', QA_DIR)
  let report
  let review
  try {
    report = JSON.parse(await fs.readFile(path.join(outDir, 'report.json'), 'utf8'))
  } catch (error) {
    console.error(`❌ REPORT_MISSING: ${error.message}`)
    return 1
  }
  try {
    review = JSON.parse(await fs.readFile(path.join(outDir, 'review.json'), 'utf8'))
  } catch {
    review = null
  }
  const issues = validateReview(report, review)
  for (const reviewIssue of issues) console.error(`❌ ${reviewIssue.code}: ${reviewIssue.message}`)
  if (issues.length) return 1
  console.log(`✅ 시각 검토 게이트 통과: runId=${report.runId}`)
  return 0
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === scriptPath
if (isMain) {
  const checkOnly = process.argv.includes('--check-review')
  try {
    process.exitCode = checkOnly
      ? await checkReview()
      : await runVisualQa({ args: process.argv.slice(2) })
  } catch (error) {
    console.error(error.stack || error.message)
    process.exitCode = 1
  }
}
