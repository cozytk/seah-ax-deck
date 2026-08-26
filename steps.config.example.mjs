// steps.config.mjs로 복사해 사용한다.
// 공개 페이지는 launch:true, 로그인 세션이 필요하면 launch:false + cdp를 쓴다.
export default {
  launch: true,
  cdp: 'http://127.0.0.1:9222',
  viewport: { width: 1440, height: 900 },
  shots: [
    {
      id: 'todo-home',
      url: 'https://demo.playwright.dev/todomvc/',
      title: '할 일 입력 화면',
      waitMs: 1500,
      cropTop: 0,
      cropBottom: 0,
      compactLabels: true,
      targets: [
        {
          label: '할 일 입력칸',
          placeholder: /What needs to be done/i,
          mode: 'box',
        },

        // locator로 찾을 수 없는 네이티브/canvas 대상만 명시 좌표를 사용한다.
        // 자동 탐색 실패 시 임의 fallback 좌표는 생성되지 않는다.
        {
          label: '수동 박스 예시',
          mode: 'box',
          manual: { x: 120, y: 180, width: 260, height: 48 },
        },
        {
          label: '수동 핀 예시',
          mode: 'pin',
          manual: { badgeX: 80, badgeY: 260, targetX: 240, targetY: 260 },
        },
      ],
    },
  ],
}
