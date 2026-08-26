import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import {
  buildContactSheets,
  createRunId,
  findCopySlopSignals,
  findDeckStyleIssues,
  findImageContractIssues,
  findRepeatedSignatures,
  validateReview,
} from '../scripts/visual-qa.mjs'

test('createRunId is stable for the same capture payload and changes with a new run', () => {
  const payload = { generatedAt: '2026-07-10T00:00:00.000Z', captures: ['light-001.png'] }
  assert.match(createRunId(payload), /^[a-f0-9]{64}$/)
  assert.equal(createRunId(payload), createRunId(payload))
  assert.notEqual(createRunId(payload), createRunId({ ...payload, generatedAt: '2026-07-10T00:00:01.000Z' }))
})

test('findRepeatedSignatures reports runs of three or more consecutive body layouts', () => {
  const slides = {
    1: { layoutSignature: 'cover' },
    2: { layoutSignature: 'body|split:1|shot:1' },
    3: { layoutSignature: 'body|split:1|shot:1' },
    4: { layoutSignature: 'body|split:1|shot:1' },
    5: { layoutSignature: 'body|figure:1' },
  }
  assert.deepEqual(findRepeatedSignatures(slides, 'light'), [{
    code: 'REPEATED_LAYOUT',
    severity: 'warning',
    scheme: 'light',
    slides: [2, 3, 4],
    signature: 'body|split:1|shot:1',
    message: '같은 레이아웃 서명이 3장 연속 반복됩니다.',
  }])
})

test('findCopySlopSignals warns on formulaic headlines and promotional copy', () => {
  assert.deepEqual(findCopySlopSignals({
    title: '쿠키 — 브라우저가 기억하는 방법',
    text: '단 3단계면 강력한 쿠키 보안을 완성합니다.',
  }).map((entry) => entry.code), [
    'HEADLINE_EM_DASH_FORMULA',
    'PROMOTIONAL_COPY',
  ])

  assert.deepEqual(findCopySlopSignals({
    title: '브라우저를 닫으면 이 쿠키는 사라집니다',
    text: '만료 시각이 없는 세션 쿠키를 브라우저가 종료될 때 제거합니다.',
  }), [])
})

test('findDeckStyleIssues catches repeated colon headlines and decorative eyebrow walls', () => {
  const slides = {
    1: { title: '쿠키: 브라우저의 기억', layoutSignature: 'body', structure: { eyebrow: true } },
    2: { title: '세션: 창을 닫을 때 끝', layoutSignature: 'body', structure: { eyebrow: true } },
    3: { title: '만료: 시간을 정해 보관', layoutSignature: 'body', structure: { eyebrow: true } },
    4: { title: '선택 기준을 적용합니다', layoutSignature: 'body', structure: { eyebrow: true } },
  }

  assert.deepEqual(findDeckStyleIssues(slides, 'light').map((entry) => entry.code), [
    'HEADLINE_COLON_SERIES',
    'EYEBROW_WALL',
  ])
})

test('findImageContractIssues requires load, alt, provenance, caption, and linked web source', () => {
  const goodWebImage = {
    src: 'https://cdn.example.com/flow.svg',
    loaded: true,
    alt: '브라우저 요청이 서버로 흐르는 순서',
    origin: 'web',
    source: 'https://example.com/docs/flow',
    sourceLinked: true,
    caption: '요청 처리 흐름 · 공식 문서',
    decorative: false,
  }
  assert.deepEqual(findImageContractIssues(goodWebImage), [])

  assert.deepEqual(findImageContractIssues({
    ...goodWebImage,
    loaded: false,
    alt: '',
    sourceLinked: false,
    caption: '',
  }).map((entry) => entry.code), [
    'IMAGE_BROKEN',
    'IMAGE_ALT_MISSING',
    'FIGCAPTION_MISSING',
    'IMAGE_SOURCE_LINK_MISSING',
  ])

  assert.deepEqual(findImageContractIssues({
    ...goodWebImage,
    origin: 'diagram',
    source: '',
    sourceLinked: false,
  }).map((entry) => entry.code), ['IMAGE_ORIGIN_MISSING'])
})

test('validateReview gates stale runs, missing sheets, automated errors, and verdict', () => {
  const report = {
    schemaVersion: 2,
    runId: 'run-current',
    summary: { errors: 1, warnings: 0 },
    contactSheets: [
      { path: 'contact-light-001-009.png' },
      { path: 'contact-dark-001-009.png' },
    ],
  }
  const review = {
    runId: 'run-old',
    inspectedSheets: ['contact-light-001-009.png'],
    verdict: 'pending',
  }
  assert.deepEqual(validateReview(report, review).map((issue) => issue.code), [
    'REVIEW_STALE',
    'CONTACT_SHEET_NOT_INSPECTED',
    'AUTOMATED_ERRORS_PRESENT',
    'REVIEW_NOT_PASSED',
  ])

  assert.deepEqual(validateReview(
    { ...report, summary: { errors: 0, warnings: 0 } },
    {
      runId: 'run-current',
      inspectedSheets: ['contact-light-001-009.png', 'contact-dark-001-009.png'],
      verdict: 'pass',
    },
  ), [])
})

test('validateReview blocks unresolved major issues and resolved issues without recapture evidence', () => {
  const report = {
    schemaVersion: 2,
    runId: 'run-current',
    summary: { errors: 0, warnings: 0 },
    contactSheets: [{ path: 'contact-light-001-009.png' }],
  }
  const baseReview = {
    runId: 'run-current',
    inspectedSheets: ['contact-light-001-009.png'],
    verdict: 'pass',
  }

  assert.deepEqual(validateReview(report, {
    ...baseReview,
    issues: [{ severity: 'major', status: 'open', observation: '실제 UI가 너무 작다.' }],
  }).map((entry) => entry.code), ['MANUAL_ISSUES_UNRESOLVED'])

  assert.deepEqual(validateReview(report, {
    ...baseReview,
    issues: [{ severity: 'blocker', status: 'resolved', observation: '텍스트가 잘렸다.', edit: '', recaptureResult: '' }],
  }).map((entry) => entry.code), ['MANUAL_RESOLUTION_EVIDENCE_MISSING'])

  assert.deepEqual(validateReview(report, {
    ...baseReview,
    issues: [{
      severity: 'major', status: 'resolved', observation: '실제 UI가 너무 작다.',
      edit: 'hero 크기로 키웠다.', recaptureResult: '재캡처에서 본문보다 크게 읽힌다.',
    }],
  }), [])
})

test('buildContactSheets batches screenshots into labeled 3x3 PNG sheets', async (t) => {
  const { default: sharp } = await import('sharp')
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'slidev-contact-'))
  t.after(() => fs.rm(dir, { recursive: true, force: true }))

  const captures = []
  for (let slide = 1; slide <= 10; slide += 1) {
    const file = path.join(dir, `light-${String(slide).padStart(3, '0')}.png`)
    await sharp({
      create: {
        width: 1280,
        height: 720,
        channels: 3,
        background: { r: slide * 10, g: 40, b: 80 },
      },
    }).png().toFile(file)
    captures.push({ slide, path: file })
  }

  const sheets = await buildContactSheets({ outDir: dir, scheme: 'light', captures })
  assert.deepEqual(sheets.map(({ scheme, from, to, path: file }) => ({ scheme, from, to, path: file })), [
    { scheme: 'light', from: 1, to: 9, path: 'contact-light-001-009.png' },
    { scheme: 'light', from: 10, to: 10, path: 'contact-light-010-010.png' },
  ])
  const metadata = await sharp(path.join(dir, sheets[0].path)).metadata()
  assert.equal(metadata.width, 1280)
  assert.equal(metadata.height, 818)
})
