<!--
  지속형 길찾기 푸터 — 12장 이상 긴 덱에서만 얇은 진행 바 + 페이지 카운터.
  슬라이드별 대>중>소 맥락은 본문 상단의 .crumbs 가 담당하고,
  이 컴포넌트는 "전체 중 어디쯤"이라는 진행도만 조용히 보여준다.
  짧은 덱에서 강제로 켜려면 class: progress-on, 긴 덱에서 끄려면 progress-off.
  Slidev가 global-bottom.vue 를 자동 로드한다.
-->
<template>
  <!-- 표지/디바이더·짧은 덱에서는 숨김. 구조를 설명하지 못하는 진행 장식은 기본으로 만들지 않는다. -->
  <div class="deck-progress" v-if="show">
    <div class="deck-progress__bar" :style="{ width: pct + '%' }" />
    <div class="deck-progress__count">{{ current }} / {{ total }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage, total, currentSlideRoute } = useNav()
const current = computed(() => currentPage.value)
const pct = computed(() => (total.value ? (currentPage.value / total.value) * 100 : 0))
const show = computed(() => {
  const cls = currentSlideRoute.value?.meta?.slide?.frontmatter?.class || ''
  const classes = String(cls)
  if (/\b(cover|divider|progress-off)\b/.test(classes)) return false
  return total.value >= 12 || /\bprogress-on\b/.test(classes)
})
</script>

<style scoped>
.deck-progress {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 0;
  z-index: 5;
  pointer-events: none;
}
.deck-progress__bar {
  position: absolute;
  left: 0; bottom: 0;
  height: 3px;
  background: var(--accent, #2F6BFF);
  opacity: 0.85;
  transition: width 0.3s ease;
}
.deck-progress__count {
  position: absolute;
  right: 0.9rem; bottom: 0.5rem;
  font-family: var(--mono, monospace);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  color: var(--dim, #888);
  opacity: 0.7;
}
@media (prefers-reduced-motion: reduce) {
  .deck-progress__bar { transition: none; }
}
</style>
