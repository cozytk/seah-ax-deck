/*
  공식 문서의 특정 구간을 잘라 이미지로 저장한다.

  왜 필요한가.
  Claude Code 데스크톱 문서에는 앱 스크린샷이 없다(로고 두 개가 전부).
  그런데 교안에서 인용하는 알맹이는 대부분 "표"다 — 권한 모드 다섯 종,
  단축키, 뷰 모드. 이건 문서 화면 자체가 가장 정확한 증거다.
  「어디서 가져왔다」를 말로 적는 대신 그 자리를 그대로 보여준다.

  동작.
  heading anchor(id)를 찾아 그 heading 부터 다음 heading 직전까지를
  하나의 영역으로 묶어 clip 한다. 폭은 본문 폭에 맞춘다.

  사용:  node scripts/clip-docs.mjs            (전체)
         node scripts/clip-docs.mjs perm-modes (하나만)
*/
import { chromium } from "playwright-chromium";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir } from "node:fs/promises";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "images", "docs");

/** name, url, anchor(id), maxH(px, 넘으면 위에서 자름), stopAt(어느 제목에서 멈출지)
    하위 제목(h3)이 바로 뒤따르는 구간은 stopAt 을 "H2" 로 줘야 본문까지 딸려온다. */
const CLIPS = [
  // 개요 도입부 — 제목에 anchor 가 없어 선택자로 잡는다. 첫 문단에서 끊는다
  ["cc-intro", "https://code.claude.com/docs/en/overview", "@main header", 176],
  // 권한 모드 다섯 종 — 표 전체
  ["perm-modes", "https://code.claude.com/docs/en/desktop", "choose-a-permission-mode", 560],
  // 단축키 표
  ["shortcuts", "https://code.claude.com/docs/en/desktop", "keyboard-shortcuts", 620],
  // 뷰 모드 세 종
  ["view-modes", "https://code.claude.com/docs/en/desktop", "switch-view-modes", 420],
  // 세션 시작 시 정하는 네 가지
  ["start-session", "https://code.claude.com/docs/en/desktop", "start-a-session", 480],
  // 변경 확인 화면 설명
  ["diff-view", "https://code.claude.com/docs/en/desktop", "review-changes-with-diff-view", 460],
  // 컴퓨터 제어가 켜지는 조건
  ["computer-use", "https://code.claude.com/docs/en/desktop", "when-computer-use-applies", 460],
  // 어디서든 쓴다 — 표면별 안내 표
  ["everywhere", "https://code.claude.com/docs/en/overview", "use-claude-code-everywhere", 620],
  // 할 수 있는 일 목록
  ["what-you-can-do", "https://code.claude.com/docs/en/overview", "what-you-can-do", 520],
  // 체크포인트가 못 되돌리는 것 — 아래가 전부 h3 라 h2 까지 훑는다
  ["ckpt-limits", "https://code.claude.com/docs/en/checkpointing", "limitations", 620, "H2"],
  // Effort 조절
  ["effort", "https://code.claude.com/docs/en/model-config", "adjust-effort-level", 460],
  // CLAUDE.md 와 자동 메모리
  // 앵커에 하이픈이 하나 더 있다. claudemd- 로 쓰면 404 가 아니라 조용히 빈 그림이 나온다
  ["memory", "https://code.claude.com/docs/en/memory", "claude-md-vs-auto-memory", 472],
  // MCP 설치 스코프
  ["mcp-scopes", "https://code.claude.com/docs/en/mcp", "mcp-installation-scopes", 460],
  // 아티팩트가 아닌 것
  ["artifact-not", "https://code.claude.com/docs/en/artifacts", "what-an-artifact-is-not", 400],
  // GitHub Actions 예시
  ["gha-uses", "https://code.claude.com/docs/en/github-actions", "example-use-cases", 620, "H2"],
  // 되감기
  ["rewind", "https://code.claude.com/docs/en/checkpointing", "rewind-and-summarize", 460],
  // 작업 중 메시지 큐잉
  ["queue", "https://code.claude.com/docs/en/interactive-mode", "queue-messages-while-claude-works", 400],
  // 서브에이전트 · 에이전트 팀 비교
  ["teams-compare", "https://code.claude.com/docs/en/agent-teams", "compare-with-subagents", 520],
  // 확인할 방법을 먼저 준다
  ["verify-first", "https://code.claude.com/docs/en/best-practices", "give-claude-a-way-to-verify-its-work", 520],
  // 탐색 → 계획 → 코드
  ["explore-plan", "https://code.claude.com/docs/en/best-practices", "explore-first-then-plan-then-code", 480],
  // 거꾸로 인터뷰시키기
  ["interview", "https://code.claude.com/docs/en/best-practices", "let-claude-interview-you", 420],
  // 테스트와 함께 일하기
  ["tests", "https://code.claude.com/docs/en/common-workflows", "work-with-tests", 520],
  // 계획 모드 — 고치기 전에 먼저 읽고 계획을 내놓는 모드
  ["plan-mode", "https://code.claude.com/docs/en/permission-modes", "analyze-before-you-edit-with-plan-mode", 480],
  // 기본으로 들어 있는 서브에이전트들
  ["subagents-builtin", "https://code.claude.com/docs/en/sub-agents", "built-in-subagents", 520],
  // CLAUDE.md 에 무엇을 적나
  ["claudemd-when", "https://code.claude.com/docs/en/memory", "when-to-add-to-claude-md", 480],
  // 일하는 3단계 — 맥락 수집 → 실행 → 검증
  ["agentic-loop", "https://code.claude.com/docs/en/how-claude-code-works", "the-agentic-loop", 482, "H2"],
  // 「그래서 언제 뭘 붙이나」 트리거 표
  ["setup-over-time", "https://code.claude.com/docs/en/features-overview", "build-your-setup-over-time", 560],
  // 세션 시작 권한 모드 기본값 — Pro·Max·Team 은 auto 로 시작한다
  ["auto-mode", "https://code.claude.com/docs/en/permission-modes", "eliminate-prompts-with-auto-mode", 520],
  // 지시에 맥락을 넣는 네 갈래 — Before/After 표
  ["prompt-specific", "https://code.claude.com/docs/en/best-practices", "provide-specific-context-in-your-prompts", 860],
  // 누가 계획을 쥐고 있나 — 서브에이전트·스킬·팀·워크플로 비교표. 열이 다섯이라 wide
  ["workflow-plan", "https://code.claude.com/docs/en/workflows", "when-to-use-a-workflow", 540, "H2,H3,H4", true],
  // 예약 실행 세 갈래 — 클라우드 / 데스크톱 로컬 / loop
  ["sched-compare", "https://code.claude.com/docs/en/desktop-scheduled-tasks", "compare-scheduling-options", 548, "H2,H3,H4", true],
  // 예약 작업이 실제로 도는 조건 — 앱이 열려 있고 컴퓨터가 깨어 있어야
  ["sched-run", "https://code.claude.com/docs/en/desktop-scheduled-tasks", "how-scheduled-tasks-run", 560],
];

const only = process.argv[2];
const jobs = only ? CLIPS.filter(([n]) => n === only) : CLIPS;

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1100, height: 1400 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

for (const [name, url, anchor, maxH, stopAt = "H2,H3,H4", wide = false] of jobs) {
  // 본문 폭보다 넓은 표는 1100 뷰포트에서 오른쪽 열이 잘린다. wide 를 주면
  // 뷰포트를 넓혀 표 전체가 칠해지게 하고, 클립 폭도 제목이 아니라 가장 넓은 자식에 맞춘다.
  await page.setViewportSize({ width: wide ? 1500 : 1100, height: 1400 });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

  // 문서 사이트의 고정 헤더가 캡처에 끼어든다. 지운다.
  // 사이트 상단 바가 고정이라 캡처에 끼어든다. 다만 본문 안의 <header>(제목+도입부)는
  // 우리가 잡으려는 대상이므로 건드리면 안 된다 — body 직계만 지운다.
  await page.addStyleTag({
    content: `#navbar,body>header,nav[aria-label],#sidebar,aside,[class*="sticky"],[class*="Sticky"]{position:static!important}
              #navbar,body>header{display:none!important}`,
  });

  const box = await page.evaluate(
    ({ anchor, maxH, stopAt, wide }) => {
      // "@" 로 시작하면 id 가 아니라 CSS 선택자다. 제목에 anchor 가 없는 도입부용.
      const h = anchor.startsWith("@") ? document.querySelector(anchor.slice(1)) : document.getElementById(anchor);
      if (!h) return null;
      // heading 부터 다음 heading 직전까지
      const stop = new Set(stopAt.split(","));
      const start = h.closest("h2,h3,h4") ?? h;
      let bottom = start.getBoundingClientRect().bottom;
      let right = start.getBoundingClientRect().right;
      for (let n = start.nextElementSibling; n; n = n.nextElementSibling) {
        if (stop.has(n.tagName)) break;
        const r = n.getBoundingClientRect();
        if (r.height === 0) continue;
        bottom = Math.max(bottom, r.bottom);
        // 표는 래퍼보다 넓을 수 있다. 실제로 칠해지는 오른쪽 끝을 따로 잰다.
        for (const t of [n, ...n.querySelectorAll("table")]) {
          const tr = t.getBoundingClientRect();
          if (tr.height > 0) right = Math.max(right, tr.right);
        }
      }
      const top = start.getBoundingClientRect().top + window.scrollY;
      const height = Math.min(bottom + window.scrollY - top, maxH);
      const r = start.getBoundingClientRect();
      const width = wide ? right - r.left + 16 : r.width + 16;
      return { x: r.left + window.scrollX - 8, y: top - 8, width, height: height + 16 };
    },
    { anchor, maxH, stopAt, wide },
  );

  if (!box) {
    console.log(`${name.padEnd(18)} ✗ anchor 없음 (#${anchor})`);
    continue;
  }

  // clip 좌표는 문서 전체 기준이다. fullPage 없이는 뷰포트 밖이라 잘린다.
  await page.screenshot({ path: join(OUT, `${name}.png`), clip: box, fullPage: true });
  console.log(`${name.padEnd(18)} ${Math.round(box.width)}×${Math.round(box.height)}  ${url.split("/en/")[1]}#${anchor}`);
}

await browser.close();
