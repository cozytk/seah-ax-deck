import test from 'node:test'
import assert from 'node:assert/strict'

import {
  calloutFromBoundingBox,
  calloutFromManual,
  missingTargetRecord,
} from '../scripts/capture-steps.mjs'

test('calloutFromBoundingBox creates deterministic box and pin callouts', () => {
  assert.deepEqual(
    calloutFromBoundingBox(1, { label: '검색창', mode: 'box' }, { x: 10.4, y: 20.6, width: 100.2, height: 40.8 }),
    ['1', 10, 21, 100, 41, '검색창', 'box'],
  )
  assert.deepEqual(
    calloutFromBoundingBox(2, { label: '제출', mode: 'pin' }, { x: 100, y: 40, width: 20, height: 10 }),
    ['2', 44, 45, 110, 45, '제출', 'pin'],
  )
})

test('calloutFromManual accepts explicit mode-specific coordinates only', () => {
  assert.deepEqual(calloutFromManual(1, {
    label: '수동 박스',
    mode: 'box',
    manual: { x: 11, y: 22, width: 33, height: 44 },
  }), ['1', 11, 22, 33, 44, '수동 박스', 'box'])

  assert.deepEqual(calloutFromManual(2, {
    label: '수동 핀',
    mode: 'pin',
    manual: { badgeX: 10, badgeY: 20, targetX: 30, targetY: 40 },
  }), ['2', 10, 20, 30, 40, '수동 핀', 'pin'])

  assert.equal(calloutFromManual(3, { label: '좌표 없음', mode: 'box' }), null)
  assert.throws(
    () => calloutFromManual(4, { label: '불완전', mode: 'box', manual: { x: 1, y: 2 } }),
    /manual box needs finite x, y, width, height/,
  )
})

test('missingTargetRecord preserves selector intent without inventing coordinates', () => {
  assert.deepEqual(missingTargetRecord(3, {
    label: 'Create 버튼',
    role: 'button',
    name: /Create pull request/i,
    mode: 'pin',
  }, new Error('locator timed out')), {
    number: '3',
    label: 'Create 버튼',
    mode: 'pin',
    selector: { role: 'button', name: '/Create pull request/i' },
    error: 'locator timed out',
  })
})
