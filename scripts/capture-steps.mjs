#!/usr/bin/env node
/* ============================================================================
   capture-steps.mjs — 실습 화면 캡처 + 대상 bbox 추출.
   → images/_raw/<id>.png + images/steps.recipe.json

   자동 locator가 실패하면 가짜 좌표를 만들지 않는다. target.manual에 명시 좌표가
   있을 때만 callout을 만들며, 나머지는 missingTargets에 기록하고 recipe를 쓴 뒤
   종료 코드 1을 반환한다.
   ============================================================================ */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptPath = fileURLToPath(import.meta.url)
const defaultRoot = path.resolve(path.dirname(scriptPath), '..')

const modeOf = (target) => target.mode ?? 'box'
const finite = (value) => Number.isFinite(value)
const rounded = (value) => Math.round(value)

export function calloutFromBoundingBox(number, target, box) {
  const x = rounded(box.x)
  const y = rounded(box.y)
  const width = rounded(box.width)
  const height = rounded(box.height)
  const mode = modeOf(target)
  if (mode === 'pin') {
    const targetX = x + Math.round(width / 2)
    const targetY = y + Math.round(height / 2)
    const badgeX = Math.max(34, x - 56)
    return [String(number), badgeX, targetY, targetX, targetY, target.label ?? '', 'pin']
  }
  if (mode !== 'box') throw new Error(`unsupported callout mode: ${mode}`)
  return [String(number), x, y, width, height, target.label ?? '', 'box']
}

export function calloutFromManual(number, target) {
  if (!target.manual) return null
  const mode = modeOf(target)
  if (mode === 'box') {
    const { x, y, width, height } = target.manual
    if (![x, y, width, height].every(finite)) {
      throw new Error('manual box needs finite x, y, width, height')
    }
    return [String(number), rounded(x), rounded(y), rounded(width), rounded(height), target.label ?? '', 'box']
  }
  if (mode === 'pin') {
    const { badgeX, badgeY, targetX, targetY } = target.manual
    if (![badgeX, badgeY, targetX, targetY].every(finite)) {
      throw new Error('manual pin needs finite badgeX, badgeY, targetX, targetY')
    }
    return [
      String(number), rounded(badgeX), rounded(badgeY), rounded(targetX), rounded(targetY),
      target.label ?? '', 'pin',
    ]
  }
  throw new Error(`unsupported callout mode: ${mode}`)
}

const printable = (value) => value instanceof RegExp ? value.toString() : value

const selectorRecord = (target) => {
  if (target.css) return { css: target.css }
  if (target.role) {
    const selector = { role: target.role }
    if (target.name != null) selector.name = printable(target.name)
    return selector
  }
  if (target.text != null) return { text: printable(target.text) }
  if (target.placeholder != null) return { placeholder: printable(target.placeholder) }
  return {}
}

export function missingTargetRecord(number, target, error) {
  return {
    number: String(number),
    label: target.label ?? '',
    mode: modeOf(target),
    selector: selectorRecord(target),
    error: error?.message ?? String(error),
  }
}

function locator(page, target) {
  if (target.css) return page.locator(target.css).first()
  if (target.role) return page.getByRole(target.role, target.name ? { name: target.name } : {}).first()
  if (target.text != null) return page.getByText(target.text).first()
  if (target.placeholder != null) return page.getByPlaceholder(target.placeholder).first()
  throw new Error(`target needs css | role(+name) | text | placeholder: ${JSON.stringify(target)}`)
}

export async function runCapture({ root = defaultRoot, configPath } = {}) {
  const { chromium } = await import('playwright-chromium')
  const imgDir = path.join(root, 'images')
  const rawDir = path.join(imgDir, '_raw')
  await fs.mkdir(rawDir, { recursive: true })

  const resolvedConfigPath = configPath
    ? path.resolve(configPath)
    : path.join(root, 'steps.config.mjs')
  const config = (await import(resolvedConfigPath)).default
  if (!config || !Array.isArray(config.shots)) throw new Error('steps.config.mjs must export { shots: [] }')

  let browser
  try {
    browser = config.launch
      ? await chromium.launch()
      : await chromium.connectOverCDP(config.cdp || 'http://127.0.0.1:9222')
    const context = config.launch
      ? await browser.newContext({ viewport: config.viewport || { width: 1512, height: 895 } })
      : (browser.contexts()[0] ?? await browser.newContext())

    const pageFor = async (url) => {
      if (config.launch) {
        const page = await context.newPage()
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 })
        return page
      }
      const host = new URL(url).host
      let page = context.pages().find((candidate) => {
        try { return new URL(candidate.url()).host === host } catch { return false }
      })
      if (!page) page = await context.newPage()
      await page.setViewportSize(config.viewport || { width: 1512, height: 895 })
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 })
      return page
    }

    const recipe = []
    let missingCount = 0
    for (const shot of config.shots) {
      const page = await pageFor(shot.url)
      await page.waitForTimeout(shot.waitMs ?? 2_000)
      const callouts = []
      const missingTargets = []
      let number = 0
      for (const target of shot.targets ?? []) {
        number += 1
        try {
          const element = locator(page, target)
          await element.waitFor({ state: 'visible', timeout: 15_000 })
          const box = await element.boundingBox()
          if (!box) throw new Error('visible target has no bounding box')
          const callout = calloutFromBoundingBox(number, target, box)
          callouts.push(callout)
          console.log(`  [${shot.id}] ${number}. ${target.label ?? ''} bbox (${modeOf(target)})`)
        } catch (locatorError) {
          let manualCallout = null
          let manualError = null
          try {
            manualCallout = calloutFromManual(number, target)
          } catch (error) {
            manualError = error
          }
          if (manualCallout) {
            callouts.push(manualCallout)
            console.warn(`  [${shot.id}] ${number}. ${target.label ?? ''} — locator 실패, 명시 manual 좌표 사용`)
          } else {
            const reason = manualError
              ? new Error(`${locatorError.message}; ${manualError.message}`)
              : locatorError
            const missing = missingTargetRecord(number, target, reason)
            missingTargets.push(missing)
            missingCount += 1
            console.error(`  [${shot.id}] ${number}. ${target.label ?? ''} — 누락: ${reason.message}`)
          }
        }
      }

      const raw = path.join(rawDir, `${shot.id}.png`)
      await page.screenshot({ path: raw, fullPage: false, animations: 'disabled' })
      recipe.push({
        in: `_raw/${shot.id}.png`,
        out: `${shot.id}.png`,
        title: shot.title ?? '',
        hideTitle: shot.hideTitle ?? false,
        compactLabels: shot.compactLabels ?? true,
        cropTop: shot.cropTop ?? 0,
        cropBottom: shot.cropBottom ?? 0,
        targetWidth: shot.targetWidth ?? 1600,
        redact: shot.redact ?? [],
        callouts,
        missingTargets,
      })
      console.log(`captured → images/_raw/${shot.id}.png`)
    }

    await fs.writeFile(path.join(imgDir, 'steps.recipe.json'), `${JSON.stringify(recipe, null, 2)}\n`)
    console.log(`\n레시피 작성: images/steps.recipe.json (${recipe.length} shot)`)
    if (missingCount > 0) {
      console.error(`누락 대상 ${missingCount}개 — locator를 고치거나 target.manual 좌표를 명시하세요.`)
      return 1
    }
    console.log('모든 대상 확인 완료. 다음: pnpm annotate')
    return 0
  } finally {
    if (browser) await browser.close().catch(() => {})
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === scriptPath
if (isMain) {
  try {
    process.exitCode = await runCapture({ configPath: process.argv[2] })
  } catch (error) {
    console.error(error.stack || error.message)
    process.exitCode = 1
  }
}
