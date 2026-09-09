# slides.md 전수 검증 — VERIFY-REPORT

대조 대상 `교안/slides.md` (3,218줄 · 138장) ↔ 근거 `교안/.omx/docs-sweep/*.md` (공식 문서 191쪽 전문).
검증일 2026-08-30. 문서가 맞다는 전제로 판정했다. 파일은 고치지 않았다.

판정 요약 — **A 5건 · B 9건 · C 7건**. DOCS-AUDIT 27건 중 **23건 반영 · 2건 미반영 · 2건 부분 반영**.

---

## A. 반드시 고쳐야 (사실이 틀림)

| slides.md:줄 | 장표 제목 | 현재 서술 | 문서상 사실 | 근거 파일#앵커 |
|---|---|---|---|---|
| 343 | 대화를 웹페이지로 (실습 1-5) | 「기본은 비공개입니다. 남에게 보여주려면 페이지 오른쪽 위 *Share* 에서 링크를 켭니다」 — 플랜 조건 없음 | Enterprise 는 **Owner 가 admin settings 에서 아티팩트를 켜야** 동작한다. 안 켜져 있으면 "Claude writes a local HTML file or says it cannot publish". 또 **Team·Enterprise 는 공개 공유가 기본 꺼짐** — Owner 가 External sharing 을 켜기 전까지 조직 내부 공유만 된다 | `artifacts.md#availability` (Plan 행) · `artifacts.md` L294 |
| 1126 | 사용량이 새는 자리 (1-D) | 「`/usage` 는 … `d` · `w` 로 하루치와 한 주치를 오갑니다」 | `d`/`w` 는 **터미널 TUI 키**다. 문서는 VS Code 확장에서는 같은 정보가 "Day and Week toggle" 로 나온다고 따로 적어 두었다 — GUI 표면으로 그대로 안 옮겨간다. 데스크톱의 공식 경로는 **모델 피커 옆 usage ring 클릭**이고, 인자 없는 터미널 대화상자 명령은 Code 탭에서 `isn't available in this environment` 로 거절된다 | `costs.md#plan-usage-breakdown` L64 · `desktop.md#check-usage` L243-245 · `desktop.md#whats-not-available-in-desktop` |
| 1683 | 자주 쓰는 명령 8개 (1-G) | 표에 `/usage` — 「얼마나 썼는지」, 표면 단서 없음 | 위와 같음. 데스크톱만 쓰는 수강생에게는 usage ring 이 답이다. 같은 덱 748-755 장표는 이미 ring 기준으로 맞게 써 두었다 → **장표끼리 어긋남** | 같음 |
| 423 | CLI vs Desktop (1-A) | 「데스크톱에만 \| 창 배치 · 변경 확인 · 앱 미리보기 · **사이드 채팅** · **컴퓨터 제어**」 | **사이드 채팅은 데스크톱 전용이 아니다.** 터미널에서 `/btw` 로 쓰고 답은 dismissible overlay 로 뜬다(`x` 로 지움). VS Code 확장에도 패널로 있다. **컴퓨터 제어도** CLI 에 있다 — macOS 한정이고 `/mcp` 로 켠다 | `interactive-mode.md#side-questions-with-/btw` L511-521 · `commands.md` L62 · `desktop.md#feature-comparison` (Computer use 행) |
| 557-567 ↔ 967 · 1101 | 기본은 Auto (1-B) ↔ 모델 4종 · 작업별 설정 기준 (1-D) | 「Pro · Max · Team \| 세션이 Auto 로 시작합니다」 + 「단순한 잔일 → `haiku`」「문구 고치기 · 파일 이름 바꾸기 → `haiku` · `sonnet`」 | **Haiku 에서는 auto 모드가 아예 안 뜬다.** "Older models, including Sonnet 4.5, Opus 4.5, **Haiku**, and claude-3 models, are not supported on any provider." 그리고 "When the flag, a settings file, or the built-in default selects `auto` but auto mode isn't available to the session, Claude Code starts the session in **Manual** instead." → 덱이 시킨 대로 haiku 로 바꾼 수강생은 갑자기 매번 승인 창을 보게 되고 「고장 났다」고 판단한다 | `permission-modes.md#eliminate-prompts-with-auto-mode` (Model 요건) · `permission-modes.md#which-mode-a-session-starts-in` L87 |
| 2040-2052 · 2067 | 일하는 동안 (1-H) · 화면을 움직여 보기 (실습 3) | 「중단 \| Esc 를 누르면 그 자리에서 멈춥니다」 「한 번에 한 세션만 화면을 잡습니다」, 출처 = 「Computer use · How Claude works on your screen」 `docs/en/computer-use` | 그 페이지는 **`# Let Claude use your computer from the CLI`** 이고 노트는 "research preview on **macOS**". Esc 중단은 **macOS 알림**("Claude is using your computer · press Esc to stop") 과 함께 CLI 문맥으로만 기술돼 있고, `desktop.md` 에는 Esc 중단도 세션 잠금도 **한 줄도 없다**. Windows 데스크톱에서 Esc 로 멈춘다는 근거가 문서에 없다 — 실습 3의 세 번째 단계가 여기에 걸려 있다 | `computer-use.md` L5, L9, `#stop-at-any-time` L115-119 · `desktop.md#let-claude-use-your-computer` (해당 서술 없음) |

---

## B. 고치는 게 좋음 (오해를 부름)

| slides.md:줄 | 장표 제목 | 현재 서술 | 문서상 사실 | 근거 파일#앵커 |
|---|---|---|---|---|
| 545 | 권한 모드 5종 비교 (1-B) | 「Bypass permissions \| `bypassPermissions` \| 묻지 않습니다. 샌드박스나 VM 에서만」 | **플랜 게이트가 빠졌다.** "On Pro and Max plans, enable it in your Settings → Claude Code under 'Allow bypass permissions mode'; on Team and Enterprise plans there is no Settings toggle, and **organization policy controls it instead**." 즉 세아그룹이 Team/Enterprise 면 이 모드는 선택기에 아예 안 보일 수 있다. 또 「묻지 않습니다」도 절대가 아니다 — 외부 사이트 안전 분류기·세션 보관 등은 여전히 묻는다 | `desktop.md#choose-a-permission-mode` (Bypass 행) · `permission-modes.md#switch-permission-modes` (Desktop 탭) |
| 2047 | 일하는 동안 (1-H) | 「끝 \| 숨겼던 창이 되돌아옵니다」 | 데스크톱은 **끌 수 있는 설정**이다 — "Unhide apps when Claude finishes … hidden windows are restored **unless you turn this setting off**". CLI 는 always on. 기본값 기준으로는 맞지만 단정형은 과하다 | `desktop.md#app-permissions` (Settings > General 항목) |
| 1235-1246 | 앞에서와 뒤에서 (1-E) | 「결과를 *기다릴 일*과 *던져둘 일*은 다릅니다」 — 사용자가 고르는 구도 | **사용자가 고르는 게 아니다.** 대화형 세션은 fork mode 가 기본 켜짐이고, 그때는 "Claude Code runs the subagent in the background … and **Claude can't ask for the foreground**". fork mode 가 꺼진 경우에도 백그라운드가 기본이다. 표에 적힌 개별 동작(`Ctrl B`·`/tasks`·다음 턴 알림)은 전부 정확하다 | `sub-agents.md#run-subagents-in-foreground-or-background` L836-840 |
| 2966 · 2972 | 테스트 동시 요청 (4부) | 출처가 `common-workflows#work-with-tests` 하나 | 장표 본문(「`user@example.com` → 통과, `invalid` → 실패」, 「원하는 모양을 캡처해 붙이고 비교하게」)은 **`best-practices` 의 Before/After 표에서 그대로 온 문장**이다. `common-workflows#work-with-tests` 는 4단계 순차 레시피라 「한 프롬프트에 같이」의 근거가 아니다. DOCS-AUDIT #14 가 「둘 다 병기」를 권했고 아직 안 됐다 | `best-practices.md#give-claude-a-way-to-verify-its-work` (Provide verification criteria / Verify UI changes visually 행) |
| 1302-1308 | 서브에이전트와 팀 (1-E) | 「7배쯤」의 출처가 `docs/en/agent-teams` (도해 캡션과 `src` 모두) | **수치 자체는 맞다** — "Agent teams use approximately **7x** more tokens than standard sessions **when teammates run in plan mode**". 다만 그 문장은 `agent-teams` 가 아니라 **`costs.md`** 에 있다. `agent-teams#compare-with-subagents` 표에는 배수가 없다 | `costs.md#background-token-usage` L319 |
| 2006-2008 | 컴퓨터 제어 (1-H) | 그림 `data-source` 가 `desktop#when-computer-use-applies`, alt 는 「어떤 조건에서 켜지는지」 | 플랜 조건(Pro·Max, Team·Enterprise 불가)과 research preview 표기는 **`#let-claude-use-your-computer` 바로 아래 Note** 에 있다. `#when-computer-use-applies` 는 「어느 도구를 먼저 쓰나」 절이다. 캡처가 실제로 가리키는 앵커와 내용이 어긋난다 | `desktop.md#let-claude-use-your-computer` L251-253 |
| 1994-2000 | 컴퓨터 제어 (1-H) | 되는 일·조건·기본값만 | **research preview** 라는 말이 빠졌다. 사내 도입 판단에 영향을 주는 표기다. 「Claude Desktop 앱이 떠 있어야 한다」도 문서에 있다 | `desktop.md#let-claude-use-your-computer` |
| 2775-2777 | 한 줄 개입 두 갈래 (3-F) | ```claude plugin install frontend-design@claude-plugins-official``` — 실행 자리 안내 없음 | 명령 형식은 유효하지만 **셸 명령**이다. 같은 덱 1814-1817 장표는 데스크톱 경로(`/plugin` → Discover 탭)를 가르친다. 데스크톱은 Plugin manager UI 가 정식 경로이고, 세션 안에서는 `/plugin install <name>@claude-plugins-official` 이다. `claude plugin install` 은 "doesn't run in a session" 이라 다음 실행이나 `/reload-plugins` 전까지 안 붙는다 | `discover-plugins.md#install-plugins` L286-300, L324 · `desktop.md#feature-comparison` (Plugins 행) |
| 1256-1278 | 메시지 줄 세우기 (1-E) | 「잘못 넣었으면 첫 줄에서 `↑` 로 도로 가져옵니다」 | 서술 자체는 정확하다(`interactive-mode.md` L360). 다만 이 절 전체가 **터미널 인터랙션**이고, 데스크톱의 같은 동작은 495-497 장표에서 이미 다뤘다. `↑` 로 큐를 회수하는 키가 Code 탭에서도 되는지는 문서에 없다 | `interactive-mode.md#take-back-what-you-queued` L360 |

---

## C. 확인 필요 (내가 판단 못 함)

| slides.md:줄 | 장표 제목 | 현재 서술 | 문서 상태 | 왜 판단이 어려운지 |
|---|---|---|---|---|
| 849-857 · 948 · 2218 | 되감기 여는 법 · 일부러 망가뜨리기 · 되짚기 답 | 「Esc 를 *두 번*. 단, 입력창이 비어 있을 때만」 | `checkpointing.md#rewind-and-summarize` 는 표면을 말하지 않는다. `desktop.md` 는 **rewind·checkpoint 를 단 한 번도 언급하지 않고**, 데스크톱 단축키 표에는 `Esc` = "Stop Claude's response" 만 있고 이중 Esc 항목이 없다 | 문서 어디에도 「데스크톱에서 Esc×2 가 되감기 메뉴를 연다」는 문장이 없다. 실습 2 전체가 이 키에 걸려 있다. 덱이 「`/rewind` 를 쳐도 같은 메뉴」라는 대안을 병기해 둔 건 잘한 일이다 — **수업 전 실기로 한 번 확인해 두길 권한다.** 안 되면 `/rewind` 를 주 경로로 바꾸면 된다 |
| 562-566 | 기본은 Auto (1-B) | 「Pro · Max · Team → Auto 로 시작 / Enterprise → Manual 로 시작」 | 페이지 머리글은 표면 한정 없이 "On Pro, Max, and Team plans, the built-in starting permission mode is auto mode" 라고 한다. 그런데 **built-in default 표에는 "The table covers sessions you start in a terminal or through the VS Code extension; for the desktop app and claude.ai, see the Desktop and Web tabs"** 라는 단서가 붙어 있고, 그 Desktop 탭은 **시작 모드를 아예 말하지 않는다** | 데스크톱의 시작 모드가 문서에 명시돼 있지 않다. 「Enterprise → Manual」은 터미널 표의 행을 데스크톱에 옮겨 온 것이다. 장표가 「대개」로 완화해 둔 건 적절하다. 그대로 두어도 큰 사고는 없지만 「대개」를 지우면 안 된다 |
| 1793 | MCP 설치 스코프 3종 (1-G) | 「스코프는 나중에 못 바꿉니다. *지우고 다시* 넣어야 합니다」 | `mcp.md` 어디에도 이 문장이 없다. 스코프를 바꾸는 명령도 없고, 대신 `claude mcp remove <name> --scope <scope>` 후 재추가하는 흐름만 나온다 | 「스코프 변경 명령이 문서에 없다」는 사실에서 「못 바꾼다」를 추론한 것으로 보인다. 실제로 그게 맞을 가능성이 높지만 **문서가 그렇게 말하지는 않는다.** 문서 인용이 아니라 실무 관찰로 표기하는 편이 안전하다 |
| 522 · 2864 | 대화에 파일 첨부 (1-B) · 예제 1 절차 | 「엑셀·PDF·버그 화면 캡처·디자인 시안. *세션 어디서나 됩니다*」 | 본문은 "attach images, PDFs, **and other files**" 라 엑셀을 포함한다. 그런데 같은 페이지의 **Feature comparison 표는 File attachments 를 "Images, PDFs" 로만 적어** 두었다. 세션 종류별 가부도 명시가 없다 | 문서가 자기 안에서 어긋난다. 예제 1 전체가 「엑셀을 붙여 시작」이므로 **로컬 세션에서 .xlsx 첨부가 실제로 되는지 사전 확인**이 필요하다. 「세션 어디서나」도 근거를 못 찾았다 |
| 1946-1962 | 사이트 승인 (1-H) | 「한 번만 허용 / 항상 허용 / 거부」 3종 · 서브도메인 별도 | 문서와 정확히 일치한다 | 판정 불가는 아니고 **통과**. 참고로 관리자가 `disableBrowserExternalNavigation`·`browserExternalPageTools` 로 외부 브라우징을 막을 수 있어, 사내 정책에 따라 이 장표가 재현 안 될 수 있다. 강사 사전 확인 항목 후보 |
| 1511 · 1644 | 터미널 한 사이클 (실습) | 「Windows Terminal 에서 Git Bash 탭을 열면 이 순서가 그대로입니다」 | 문서에 Git Bash 관련 서술이 없다. 덱 스스로 1644 에서 「화면은 macOS, 프롬프트는 영어. 한글 타이핑은 미검증」이라고 밝혀 두었다 | 미검증을 명시한 건 정직하다. 다만 「그대로입니다」는 단정형이다. Windows 네이티브에서 한 번 재현해 보고 문구를 조정하는 편이 낫다 |
| 2373-2389 | 모델 선택 (2부 Antigravity) | Gemini 3.7/3.6/3.5 Flash · 3.1 Pro · Claude Sonnet 4.6 · Opus 4.6 · GPT-OSS 120B, Enterprise 에서 Claude·GPT-OSS 안 뜸 | **근거 자료 범위 밖.** docs-sweep 는 Claude Code 문서만 191쪽이고 Antigravity 문서는 들어 있지 않다 | 대조할 원본이 없다. 2부 전체(2242-2508, 12장)가 같은 상태다. 모델 목록은 특히 잘 바뀌는 값이라 **수업 직전 antigravity.google/docs/models 로 한 번 갱신**을 권한다 |

---

## D. DOCS-AUDIT 27건 반영 여부

3-1 치명적 3건 + 3-2 사실관계 14건 + 3-3 앵커 4건 + 3-4 Windows 6건 = 27건.

| # | 감사 항목 | 판정 | 근거 |
|---|---|---|---|
| 3-1 ① | 컴퓨터 제어 Pro·Max 전용, Team·Enterprise 불가 | **반영됨** | 1999 「조건 \| Pro·Max 요금제. Team·Enterprise 는 안 됨」, 2003 「Windows 는 토글 하나, macOS 는 권한 두 개」, 2070 「안 되면 강사 시연으로 대체」 |
| 3-1 ② | 에이전트 팀은 데스크톱에 없음 · 실험 기능 | **반영됨** | 1299 callout 「팀은 데스크톱 앱에 없습니다 … 환경 변수를 넣어야 켜지는 실험 기능 … 앱에서는 다이내믹 워크플로」. 다만 감사가 권한 *워크플로 대체 장표 2장*은 만들지 않았고 한 줄 언급만 남았다 |
| 3-1 ③ | 아티팩트는 Enterprise 에서 관리자가 켜야 함 · 공개 공유 기본 꺼짐 | **아직** | 343 장표에 플랜 조건이 전혀 없다. 준비물 3가지(87-99)에도 없다. → **A-1** |
| 3-2 1 | 체크포인트는 「내 프롬프트마다」 · 100개 | **반영됨** | 833 「내가 메시지를 보낼 때마다 하나씩. 최근 100개가 대화와 함께 저장됩니다」 |
| 3-2 2 | Esc×2 는 되감기가 아니라 메뉴 · 입력창 비어야 · `/rewind` | **반영됨** | 844-857 전용 장표. 「글자가 남아 있으면 Esc 두 번은 글자만 지웁니다」, 「`↑` 로 되살립니다」까지 |
| 3-2 3 | 체크포인트 한계 3가지 → 5가지 | **반영됨** | 894-906 에 4가지(Bash·서브에이전트·외부·링크) + 923-934 별도 장표로 「버전 관리 대체 아님」 = 5 |
| 3-2 4 | 포그라운드/백그라운드는 사용자가 고르는 게 아님 | **부분** | 1240-1246 의 개별 동작은 전부 정확. 그러나 「백그라운드가 기본」과 「fork mode 에서는 포그라운드 요청 불가」가 빠졌고 리드는 여전히 선택 구도다 → **B-3** |
| 3-2 5 | 팀 토큰 배수 수치가 문서에 없다 | **반영됨(그리고 개선)** | 1297 「계획 모드로 돌면 7배쯤」 — `costs.md` L319 의 "approximately 7x … when teammates run in plan mode" 에 정확히 대응. 감사 지적보다 나은 상태. 출처 표기만 어긋남 → B-5 |
| 3-2 6 | Extended thinking 은 토글, 「얼마나」는 effort | **해당없음** | 덱에 extended thinking 장표 자체가 없다. 그 자리를 Effort 5단계(991-1015)가 대신하고, 「얼마나 공들일지만 바꿉니다」로 올바르게 서술 |
| 3-2 7 | 자동 압축 고정 % 임계값 없어짐 · 앵커 교체 | **반영됨** | 1043-1067 은 `context-window` 를 인용하고 % 를 말하지 않는다. 폐기된 `#context-window-and-auto-compaction` 앵커도 안 쓴다 |
| 3-2 8 | `/usage` 는 CLI · 데스크톱은 usage ring | **부분** | 743-764 「사용량 확인」은 `desktop#check-usage` 기준으로 고쳐졌다. 그러나 1126 과 1683 에 `/usage` 와 `d`·`w` 가 표면 단서 없이 남았다 → **A-2 · A-3** |
| 3-2 9 | 권한 모드 4종 → 5종 | **반영됨** | 535 「권한 모드 5종 비교」, 설정 키·동작 전부 `desktop.md` 표와 일치. 2198 「다섯 중 무엇으로 시작합니까」도 일관 |
| 3-2 10 | 스킬 머리말에 필수 항목 없음 | **반영됨** | 1729 「머리말은 `description` 한 줄이면 충분합니다. 나머지 항목은 전부 선택입니다」 |
| 3-2 11 | Chrome 출처를 `docs/en/chrome` 로 | **반영됨** | 1981 「「Choose between the Browser and the Chrome extension」 · 「Chrome extension」 docs/en/chrome」. WSL 불가(1979)도 반영 |
| 3-2 12 | 앱 승인 등급 출처 `desktop#app-permissions` | **반영됨** | 2032 「Desktop application · App permissions」. 3단 등급표 내용도 문서와 일치 |
| 3-2 13 | 검증 수단 제공 앵커 | **반영됨** | 2094 `data-source` · 2096 링크 · 2100 `src` 모두 `best-practices#give-claude-a-way-to-verify-its-work` |
| 3-2 14 | 테스트 동시 요청 출처 둘 다 병기 | **아직** | 2966·2972 모두 `common-workflows#work-with-tests` 하나. 본문 문장은 `best-practices` 에서 왔다 → **B-4** |
| 3-3 a | `memory#claudemd-vs-auto-memory` → `claude-md-` | **반영됨** | 1331 `data-source` · 1333 링크 모두 `memory#claude-md-vs-auto-memory` |
| 3-3 b | `#organize-rules-with-clauderules` 앵커 | **해당없음** | 1432 는 URL 앵커를 안 쓰고 「How Claude remembers your project · Organize rules with .claude/rules/」 제목만 적었다. 404 날 자리가 없다 |
| 3-3 c | `#context-window-and-auto-compaction` 앵커 | **반영됨** | 덱에 이 앵커가 남아 있지 않다 |
| 3-3 d | `#enable-computer-use` → `desktop#app-permissions` | **반영됨** | 2032 가 app permissions 를 가리킨다. 다만 2006 의 `data-source` 가 새로 어긋났다 → B-6 |
| 3-4 a | 225 「`Cmd ;`」 → `Ctrl ;` + `/btw` | **반영됨** | 262 「단축키는 `Ctrl ;`, 입력창에 `/btw` 를 쳐도 열립니다」 |
| 3-4 b | 530 「Cmd+Enter」 → `Ctrl+Enter` | **반영됨** | 597 「여러 줄에 달아 두었다가 `Ctrl+Enter` 로 한꺼번에」 |
| 3-4 c | 617 「Cmd+\\」 → `Ctrl+\\` | **반영됨** | 685 「`Ctrl+\\` 로 닫습니다」 |
| 3-4 d | 창 5종 → 8종 | **반영됨** | 685 「창은 모두 여덟 가지」. SVG 도 대화·변경·브라우저·터미널·파일·계획·작업·서브에이전트를 담았다 |
| 3-4 e | 단축키 표에 `Cmd Shift I`(모델 메뉴) | **반영됨** | 786 「`Ctrl Shift I` \| 모델 메뉴」. 6개 전부 `desktop#keyboard-shortcuts` 와 일치 |
| 3-4 f | `Shift+Tab` 은 데스크톱에서 무동작 — 경고 필요 | **반영됨(3중)** | 788 「앱에서 아무 일도 안 합니다. 터미널 전용 키」, 1149 「터미널의 `Shift Tab` 은 앱에 없습니다」, 1550 「앱에서 눌러도 아무 일이 없습니다 — 앱은 `Ctrl Shift M`」 |

**집계 — 반영 23 · 부분 2(#3-2 4, #3-2 8) · 아직 2(#3-1 ③, #3-2 14).**

DOCS-AUDIT 4장의 「누락 발견 12가지」 중 덱에 들어온 것: ① 기본은 Auto(557) ② 일하는 3단계(138) ③ 언제 무엇을 붙이나(1830) ④ 나쁜 지시 vs 좋은 지시(2128) ⑤ 흔한 실패 5종(2170) ⑥ 되감기 메뉴(874) ⑨ `/context`(1085·1469) ⑩ 플러그인(1810) ⑫ `/clear`·`/compact`(1075). **안 들어온 것 — ⑦ 다이내믹 워크플로 전용 장표 · ⑧ 예약 실행 · ⑪ `/goal`.** 셋 다 감사의 *제안*이지 오류 지적이 아니므로 위 27건 집계에는 넣지 않았다. 플러그인 장표에 문서의 신뢰 경고("Make sure you trust a plugin before installing it")가 빠진 것도 같은 성격이다.

---

## 부록 — 대조해서 「이상 없음」으로 확인한 것

되풀이 검증을 줄이려고 남긴다. 아래는 문서와 한 줄씩 맞춰 보고 **통과**한 서술이다.

- **준비물 3가지**(87-99) — Windows x64/ARM64 · Git for Windows 설치 후 앱 재시작 · 유료 플랜. WSL·Node.js 불필요. `desktop.md` L27 · `desktop-quickstart.md` L53 과 일치
- **할 수 있는 일**(160) — 「문서는 아홉 가지를 듭니다」 ✓ `overview.md#what-you-can-do` 의 Accordion 이 정확히 9개
- **세션 시작 4가지 설정**(463-466) — Environment(Local·Cloud·SSH·WSL)·Project folder·Model·Permission mode ✓
- **권한 모드 5종 표**(539-545) — 설정 키와 동작이 `desktop.md` 표와 문장 단위로 일치
- **단축키 6개**(779-786) · **창 배치 SVG**(664-685) · **뷰 모드 3종 + `Ctrl+O`**(696-712) — 전부 일치
- **체크포인트 100개·30일**(833·928), **되돌리기 3종 + 요약 2종**(874-884), **못 돌아오는 것 4가지**(901-906) — `checkpointing.md` 와 일치. 「그 지점 뒤에 파일이 바뀐 적이 없으면 코드 항목은 아예 안 뜹니다」까지 정확
- **모델 별칭**(967-972) · **「Default」는 요금제마다 다른 모델**(965) · **`/model` 의 Enter/`s`**(974) — `model-config.md#model-aliases`·`#default-model-setting`·`#setting-your-model` 과 일치
- **Effort 5단계 · 기본 `high` · `ultracode` · `ultrathink` · `Ctrl Shift E`**(991-1033) — 전부 일치. 「「생각 많이 해」 같은 말은 그냥 글자」도 문서 그대로
- **압축 후 재주입**(1064) — "Project-root CLAUDE.md … Re-injected from disk / Auto memory … Re-injected from disk" ✓
- **사용량이 새는 자리 4항목**(1120-1123) — `costs.md#why-usage-climbs-in-a-long-session` 의 4항목과 대응
- **계획 승인 3갈래 + `Ctrl G`**(1171-1176) — `permission-modes.md#review-and-approve-a-plan` 과 일치
- **서브에이전트 3종의 도구 권한**(1193-1197) · **Explore·Plan 은 CLAUDE.md 를 안 읽음**(1206) — 일치. 내장은 실제로 6종(claude·statusline-setup·claude-code-guide 추가)이지만 덱이 개수를 주장하지 않아 오류는 아니다
- **자동 위임 vs `@` 지목**(1220-1225) — 「`@` 로 고르는 건 누가 할지만 정합니다. 지시문은 Claude 가 씁니다」가 문서와 정확히 일치
- **CLAUDE.md 4곳 · Windows 관리 정책 경로 · 200줄 · 통하는 문장 예시**(1323-1409) — `memory.md` 와 일치. 예시 세 줄은 문서 원문 그대로
- **`.claude/rules/` 4항목**(1424-1427) — `paths:` frontmatter 조건까지 일치
- **자동 메모리 4종**(1444-1451) — user/feedback/project/reference ✓, 「코드에서 알 수 있는 건 안 적는다」·「매 세션 남기지 않는다」까지 문서 그대로
- **슬래시 명령 오타 동작**(1662) — 「아무것도 강조되지 않습니다 … Unknown command … Tab 이나 화살표로」 ✓ `commands.md#how-the-command-menu-matches-what-you-type`
- **「백 개가 넘게」**(1674) — `commands.md` 전체 명령 110개 ✓
- **스킬 두는 자리 · 이름 충돌 시 개인 > 프로젝트 · 플러그인 네임스페이스**(1743-1749) ✓
- **MCP 스코프 3종 표**(1787-1791) — `mcp.md#mcp-installation-scopes` 와 행 단위 일치
- **플러그인 3단계**(1814-1820) — 공식 마켓 자동 등록 ✓ · Discover 탭 ✓ · 범위 3종(User/Project/Local) ✓ · 「설치 화면에 맥락 비용과 딸려 오는 것」 ✓
- **언제 무엇을 붙이나 4행**(1837-1842) — `features-overview#build-your-setup-over-time` 8행 중 4행을 정확히 옮김
- **브라우저 패널 vs Chrome**(1970-1979) · **사이트 승인 3종**(1954-1960) — `desktop.md`·`chrome.md` 와 일치
- **앱별 제어 등급 3단 + 경고 붙는 앱**(2024-2030) — `desktop.md#app-permissions` 표와 일치
- **검증 수단 제공**(2083-2091) · **탐색→계획→코드**(2112-2118) · **프롬프트 4가지**(2132-2139) · **조기 방향 수정**(2153-2160) · **흔한 실수 5가지**(2174-2182) — `best-practices.md` 의 해당 절과 항목 단위로 일치. 4가지 Before/After 는 문서의 4행을 그대로 옮긴 것
- **역인터뷰**(2617-2627) — `best-practices#let-claude-interview-you` 앵커 존재 ✓
- **GitHub Actions**(3008-3016) — `@claude` 멘션 · 저장소 비밀값 · `#example-use-cases` 앵커 모두 존재
- **터미널 실습 7장**(1498-1644) — 신뢰 프롬프트 · `auto mode on` 상태줄 · `shift+tab` 순환 · Bash 승인 4선택지(「auto mode 로 전환」 포함, v2.1.247+ 필요 — 배너의 v2.1.250 이 조건 충족) 전부 문서와 일치
- **Cmd 잔존** — 1030 한 곳뿐이고 「Mac 은 `Cmd Shift E`」로 Windows 키 옆에 병기한 형태라 정상
