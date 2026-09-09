# 공식 문서 전수 감사 — DOCS-AUDIT

`https://code.claude.com/docs/en/*` **191쪽 전부**를 받아 읽고, 세아그룹 14시간 교안에
넣을 것과 뺄 것을 판정한 기록. 판정 기준은 셋이다.

- **Windows.** macOS 전용 기능은 아무리 좋아도 뺀다.
- **코드 경험 없음.** 설정 파일을 손으로 고쳐야 하는 것은 뺀다.
- **데스크톱 앱(Code 탭).** CLI 전용 기능은 「그런 게 있다」 이상 가지 않는다.

수집일 2026-08-29 · 원본 `교안/.omx/docs-sweep/*.md` (8.8MB)

---

## 1. 수집 방법

`sitemap.xml` 에 13개 언어 × 191쪽이 들어 있다. 영어만 추려 191개.
Mintlify 계열이라 URL 뒤에 `.md` 를 붙이면 마크다운 원문이 그대로 나온다.
playwright 로 렌더링할 필요가 없었다.

```bash
curl -s https://code.claude.com/sitemap.xml | grep -o '<loc>[^<]*</loc>' \
  | sed 's/<[^>]*>//g' | grep '/docs/en/' | sort -u        # 191개
curl -sL "https://code.claude.com/docs/en/<slug>.md"        # 본문 마크다운
```

구성: 본체 133쪽 · Agent SDK 31쪽 · 주간 릴리스 노트 21쪽 · 그 밖 6쪽.

---

## 2. 전 페이지 판정

### 2-1. 넣는다 (30쪽)

| 페이지 | 구간 | 장표 제목 | 근거 문장 |
|---|---|---|---|
| `overview` | 1-A | Claude Code란 · 할 수 있는 일 4가지 · 실행 환경 4종 | "Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands" |
| `how-claude-code-works` | 1-A 신규 | 일하는 3단계 | "it works through three phases: **gather context**, **take action**, and **verify results**" |
| `desktop` | 1-A·1-B | 1-B 전 장표의 원전 | "The Claude Desktop app has three tabs: Chat…, Cowork…, and Code for software development" |
| `desktop-quickstart` | 사전 준비 | (구두 안내) | "The desktop app includes Claude Code. You don't need to install Node.js or the CLI separately." |
| `permission-modes` | 1-B | 권한 모드 5종 비교 · **기본은 Auto**(신규) | "On Pro, Max, and Team plans, the built-in starting permission mode is auto mode." |
| `checkpointing` | 1-C | 체크포인트 · 되감기 메뉴 · 한계 | "checkpointing automatically captures the state of your code **before each user prompt**" |
| `interactive-mode` | 1-C | 작업 중 끼어들기 (큐잉 절만) | "Claude Code queues the message instead of interrupting the turn" |
| `model-config` | 1-D | 모델 종류 · Effort 단계 · 자동 압축 | "The default effort is `high` on every model that supports effort, except Opus 4.7, which defaults to `xhigh`." |
| `context-window` | 1-D | 컨텍스트가 차는 자리 | 대화형 시뮬레이션 페이지. 무엇이 자동으로 실리고 파일 하나가 얼마를 먹는지 눈으로 보여준다 |
| `costs` | 1-D·4-D | 비용이 새는 자리 | "Token usage scales with the number of active teammates and how long each one runs." |
| `sub-agents` | 1-E | 서브에이전트 · 자동 위임 | "Claude Code includes built-in subagents that Claude automatically uses when appropriate." |
| `agents` | 1-E | 일 나누는 4가지 | 서브에이전트 / 에이전트 뷰 / 에이전트 팀 / 다이내믹 워크플로 비교표 |
| `workflows` | 1-E 신규 | 다이내믹 워크플로 | "Dynamic workflows orchestrate many subagents from a script Claude writes" — **데스크톱에서 도는 유일한 다중 에이전트** |
| `memory` | 1-F | CLAUDE.md vs 자동 메모리 · 위치별 적용 범위 · `.claude/rules/` | "All discovered files are concatenated into context rather than overriding each other." |
| `skills` | 1-G | 스킬 · 스킬 파일 구조 | "All fields are optional. Only `description` is recommended so Claude knows when to use the skill." |
| `mcp` · `mcp-quickstart` | 1-G | MCP · 설치 스코프 3종 | "MCP servers can be configured at three scopes." |
| `hooks-guide` | 1-G | 훅 | "Run shell commands automatically when Claude Code edits files, finishes tasks, or needs input." |
| `artifacts` | 1-G | 아티팩트 · 아티팩트가 아닌 것 | "An artifact is a capture of work: one self-contained page with no backend" |
| `plugins` · `discover-plugins` | 1-G | 플러그인 한 줄 설치 | "Claude Code adds the official Anthropic marketplace (`claude-plugins-official`) automatically" |
| `features-overview` | 1-G 신규 | 언제 무엇을 붙이나 | `#build-your-setup-over-time` 의 「트리거 → 추가」 8행 표. 초보자에게 가장 실용적인 한 장 |
| `chrome` | 1-H | Claude in Chrome | "Chrome integration works with Google Chrome and Microsoft Edge." |
| `best-practices` | 1-I·3-C | 검증 수단 제공 · 탐색→계획→코드 · 조기 수정 · 역인터뷰 | "Give Claude a check it can run… **you become the verification loop**" |
| `common-workflows` | 4-C | 테스트 붙이기 | "Claude examines your existing test files to match the style, frameworks, and assertion patterns already in use." |
| `code-review` | 1-B·4-C | 코드 리뷰 요청 | "you can still review a diff locally with the `/code-review` command" |
| `goal` | 4-D | 완료 조건 걸기 | "`/goal` works in non-interactive mode, **in the desktop app**, and through Remote Control." |
| `github-actions` · `desktop-scheduled-tasks` | 4-E | 자동 실행 | "run `/install-github-app` from Claude Code" / "Scheduled tasks start a new session automatically at a time and frequency you choose." |
| `commands` | 참조 | 슬래시 명령 표의 원전 | 번들 스킬 14개의 정식 목록이 여기에만 있다 |

### 2-2. 언급만 (31쪽)

| 페이지 | 어디에 한 줄 |
|---|---|
| `platforms` | 1-A 실행 환경 4종 각주 |
| `worktrees` | 1-B 「세션마다 프로젝트 사본이 따로 생긴다」 근거 |
| `sessions` | 1-B 사이드바 세션 관리 |
| `desktop-wsl` | 사전 안내 — **쓰지 않는다**고 말하기 위해 (WSL 세션은 터미널·커넥터·플러그인·파일창·`@` 가 전부 막힘) |
| `setup` · `quickstart` · `authentication` | 사전 준비 구두 안내 |
| `troubleshoot-install` · `errors` | 강사 대비용. 덱에는 안 넣는다 |
| `network-config` | 사전 IT 협조 요청 (CDN 허용 목록) |
| `feature-availability` | 강사가 수강생 플랜을 사전 확인하는 근거표 |
| `agent-teams` | 1-E 한 줄 — 「CLI 에만 있고 실험 기능이다」 |
| `claude-directory` | 1-F `.claude/` 폴더 안에 뭐가 사는지 한 줄 |
| `debug-your-config` | 1-F 「지침이 안 먹으면 `/context`」 |
| `permissions` · `settings` · `tools-reference` | 각 구간 각주 |
| `output-styles` | 1-D 한 줄 — Explanatory·Learning 이 있다 (데스크톱은 설정 파일 편집이라 실습엔 안 맞음) |
| `computer-use` | 1-H 각주 — 이 페이지는 **CLI·macOS 전용**. 데스크톱 앵커를 써야 함 |
| `ultrareview` | 4-C 한 줄 — 유료 크레딧 |
| `routines` · `scheduled-tasks` | 4-E 비교 한 줄 (클라우드 / 세션 한정) |
| `claude-code-on-the-web` · `web-quickstart` · `mobile` · `remote-control` | 「자리를 떠도 이어서」 한 줄 묶음 |
| `glossary` · `prompt-library` | 핸드아웃 링크 |
| `security` · `data-usage` | 사내 승인 질문 대비 한 줄 |
| `whats-new` | 그림 자산 출처 표기 |

### 2-3. 뺀다 (130쪽)

| 묶음 | 쪽 수 | 페이지 | 이유 |
|---|---|---|---|
| Agent SDK | 31 | `agent-sdk/*` 전부 | 파이썬·타입스크립트로 에이전트를 직접 짜는 일. 이 수업 범위 밖 |
| 주간 릴리스 노트 | 21 | `whats-new/2026-w13`~`w34` | 덱에 넣을 내용이 아니라 **그림 자산 출처**. `images/official/*` 조달용으로만 씀 |
| 엔터프라이즈 배포 | 25 | `admin-setup` `managed-settings` `server-managed-settings` `managed-mcp` `auto-mode-config` `corporate-launcher` `devcontainer` `sandbox-environments` `sandboxing` `zero-data-retention` `legal-and-compliance` `analytics` `monitoring-usage` `third-party-integrations` `github-enterprise-server` `security-guidance` `claude-security` `champion-kit` `communications-kit` `env-vars` `settings-reference` `settings-example` `cloud-environments` `deep-links` `channels-reference` | 관리자용. 실무자 대상 아님 |
| 자체 호스팅·게이트웨이 | 18 | `self-hosted-environments*`(7) `claude-apps-gateway*`(6) `llm-gateway*`(4) `gateways` | 인프라 담당 영역 |
| CLI 전용 화면 | 9 | `cli-reference` `keybindings` `terminal-config` `fullscreen` `statusline` `voice-dictation` `accessibility` `headless` `agent-view` | 데스크톱 Code 탭에 없음. `fullscreen` 은 「터미널 그리기 방식」이라 창 최대화와 무관 |
| 3P 모델 제공자 | 6 | `amazon-bedrock` `google-vertex-ai` `microsoft-foundry` `claude-platform-on-aws` `github-actions-cloud-providers` `gitlab-ci-cd` | 데스크톱 앱은 기본이 Anthropic API |
| 플러그인 제작 | 5 | `plugins-reference` `plugin-marketplaces` `plugin-dependencies` `plugin-hints` `plugin-relevance` | 만드는 쪽 이야기. 쓰는 쪽만 다룬다 |
| IDE 확장 | 2 | `vs-code` `jetbrains` | 다른 도구를 먼저 깔아야 함 |
| macOS·Linux 전용 | 2 | `desktop-ios-simulator` `desktop-linux` | 대상 OS 아님 |
| 그 밖 | 11 | `hooks`(레퍼런스) `advisor`(실험·API 전용) `prompt-caching` `fast-mode` `cross-session-messaging` `channels` `slack` `claude-tag` `large-codebases` `troubleshooting` `changelog` | 초보자에게 과하거나 이 수업 범위 밖 |

합계 30 + 31 + 130 = **191**.

> `fast-mode` 를 뺀 이유를 따로 적어 둔다. **Opus 5·4.8 전용**이고 `$10/$50 per MTok` 으로
> **usage credits 를 따로 켜야** 돌아간다. 「빠른 모드가 있다」고 알려 주면 수강생이 켜고
> 크레딧을 태운다. 강의 구조 v2 의 그림 목록에 `fast-mode` 를 1-D 모델 종류에 쓰기로
> 되어 있는데, **그림만 쓰고 기능은 설명하지 않는 편**이 낫다.

---

## 3. 문서와 어긋난 서술

문서가 맞다. 형식은 `파일:줄 — 현재 서술 → 문서상 사실 → 출처`.

### 3-1. 치명적 — 실습이 통째로 무너지는 것

**① 컴퓨터 제어는 Pro·Max 전용. Team·Enterprise 에서는 토글이 안 보인다.**
`강의 구조 v2.md:143-153` — 1-H 「컴퓨터 제어」 7장 + 실습 3
→ "Computer use is a research preview on macOS **and Windows** that requires a **Pro or Max plan.
   It is not available on Team or Enterprise plans.** The Claude Desktop app must be running."
→ `docs/en/desktop#let-claude-use-your-computer`

Windows 지원 자체는 된다. 오히려 macOS 보다 쉽다 — "On Windows, the toggle takes effect
immediately and setup is complete." 접근성·화면기록 권한 부여 단계는 **macOS 전용**이므로
슬라이드에서 빼야 한다. 문제는 요금제다. 세아그룹이 Team/Enterprise 계약이면
**1-H 7장과 실습 3이 전원 재현 불가**다. 수업 전에 수강생 플랜을 확인해야 한다.
불가로 판명되면 1-H 를 인앱 브라우저(전 플랜 가능) 중심으로 다시 짜는 편이 낫다.

**② 에이전트 팀은 데스크톱 앱에 없다. 게다가 실험 기능이라 기본 꺼짐이다.**
`강의 구조 v2.md:115-117` — 1-E 「서브에이전트 vs 에이전트 팀」 「활용 사례」 「토큰 비용」 3장
→ "**Agent teams**: coordinated teams… are available in the **CLI**, not in Desktop.
   For multi-agent work inside one session, use **dynamic workflows**, which run in Desktop"
→ `docs/en/desktop#whats-not-available-in-desktop`
→ "Agent teams are **experimental and disabled by default**. Enable them by setting
   `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`" → `docs/en/agent-teams`

3장을 **다이내믹 워크플로**로 갈아 끼우기를 권한다. 같은 자리(여러 에이전트를 굴린다)를
채우면서 데스크톱에서 실제로 돈다.

**③ 아티팩트는 Enterprise 에서 관리자가 켜야 켜진다.**
`slides.md:288-315` 실습 1-5, `강의 구조 v2.md:139-140` 1-G 2장
→ "On **Team plans, artifacts are on by default. On Enterprise plans, an Owner enables them**
   in claude.ai admin settings." / "Public sharing is off by default on Team and Enterprise plans"
→ `docs/en/artifacts#availability`

실습 1의 마지막 단계다. 꺼져 있으면 Claude 가 로컬 HTML 파일만 쓰고 끝난다.
**사전 확인 항목**에 넣어야 한다.

### 3-2. 사실 관계가 틀린 것

| # | 위치 | 현재 서술 | 문서상 사실 | 출처 |
|---|---|---|---|---|
| 1 | `강의 구조 v2.md:91` / `BRIEF.md:59` | 체크포인트는 「파일을 고치기 직전마다」 찍힌다 | "checkpointing automatically captures the state of your code **before each user prompt**" · 세션당 최근 100개 | `checkpointing#automatic-tracking` |
| 2 | `강의 구조 v2.md:92` | 「Esc ×2 되감기 — 두 번 누르면 그 전 상태로」 | 되감기가 아니라 **메뉴가 열린다**. 그것도 "when the prompt input is empty". 글자가 있으면 입력만 지운다. 명령은 `/rewind` | `checkpointing#rewind-and-summarize` |
| 3 | `강의 구조 v2.md:93` | 체크포인트 한계 **3가지** | **5가지**. Bash 변경 · 서브에이전트 편집 · 외부 변경 · **심볼릭/하드링크** · 버전 관리 대체 아님 | `checkpointing#limitations` |
| 4 | `강의 구조 v2.md:114` | 「포그라운드 vs 백그라운드 — 기다릴 일과 던져둘 일」 | 사용자가 고르는 게 아니다. **백그라운드가 기본**이고, fork mode 가 켜져 있으면 "Claude can't ask for the foreground" | `sub-agents#run-subagents-in-foreground-or-background` |
| 5 | `강의 구조 v2.md:117` | 「팀은 토큰을 **몇 배**로 쓴다」 | 배수 수치가 문서에 없다. "token usage is roughly **proportional to team size**" · "Token costs scale **linearly**" | `costs#agent-team-token-costs` |
| 6 | `강의 구조 v2.md:104` | Extended thinking = 「오래 생각하게 만드는 스위치」 | 섹션은 남아 있으나 이제 **켜고 끄는 토글**이다. 「얼마나」는 effort 가 정한다 — "**the effort level is the primary control for how much thinking happens**" | `model-config#extended-thinking` |
| 7 | `강의 구조 v2.md:105` | 「대화가 길어지면 스스로 접는다」 + 앵커 `#context-window-and-auto-compaction` | 고정 % 임계값이 없어졌다. 모델의 컨텍스트 한계에서 접는다. Sonnet 5 는 1M 창에 **약 967K** 지점. 앵커는 `#default-auto-compact-thresholds` | `model-config#default-auto-compact-thresholds` |
| 8 | `강의 구조 v2.md:70` | 사용량은 「`/usage` 한 줄로」 | `/usage` 는 CLI 명령. **데스크톱은 모델 피커 옆 usage ring 을 누른다** | `desktop#check-usage` |
| 9 | `강의 구조 v2.md:65` / `:22` / `:390` | 「권한 모드 **4종** 비교」 (본문) / 하단 노트는 5종 | 데스크톱 선택기에 **5종**, 문서 전체로는 **6종**(`dontAsk` 는 CLI 전용). `slides.md:498` 은 이미 5종으로 고쳐져 있다 | `permission-modes#available-modes` · `desktop#choose-a-permission-mode` |
| 10 | `강의 구조 v2.md:135` | 스킬 「머리말과 본문 두 덩어리」 — 필수 항목이 있는 것처럼 | "**All fields are optional.** Only `description` is recommended" · `name` 도 선택이며 호출 이름은 **폴더 이름**에서 온다 | `skills#frontmatter-reference` |
| 11 | `강의 구조 v2.md:149` | Claude in Chrome 출처를 `docs/en/desktop` | 전용 페이지가 따로 있다 — `docs/en/chrome`. 확장 v1.0.36+ 필요, Edge 도 됨, **WSL 에서는 안 됨** | `chrome#prerequisites` |
| 12 | `강의 구조 v2.md:152` | 「앱별 승인 등급」 출처를 `#enable-computer-use` | 그 앵커는 **토글 켜기**다. 승인 등급 3단(View only / Click only / Full control)은 `desktop#app-permissions` | `desktop#app-permissions` |
| 13 | `강의 구조 v2.md:159` | 「검증 수단 제공」 출처가 페이지 통째 | 앵커가 있다 — `best-practices#give-claude-a-way-to-verify-its-work` | 같음 |
| 14 | `강의 구조 v2.md:307` | 「테스트 **동시** 요청」 출처를 `common-workflows#work-with-tests` | 그 섹션은 4단계 **순차** 레시피다. 「구현과 테스트를 한 프롬프트에」의 근거는 `best-practices#give-claude-a-way-to-verify-its-work` 의 예시 프롬프트 | 둘 다 병기 권장 |

### 3-3. 앵커가 404 나는 것

| 위치 | 현재 앵커 | 실제 앵커 |
|---|---|---|
| `강의 구조 v2.md:123` | `memory#claudemd-vs-auto-memory` | `memory#claude-md-vs-auto-memory` |
| `강의 구조 v2.md:126` | `#organize-rules-with-clauderules` | `#organize-rules-with-claude/rules/` (슬래시 포함, 그대로 복사할 것) |
| `강의 구조 v2.md:105` | `#context-window-and-auto-compaction` | `#default-auto-compact-thresholds` |
| `강의 구조 v2.md:152` | `#enable-computer-use` (앱 승인 등급용) | `desktop#app-permissions` |

### 3-4. Windows 표기 누락 — 이미 쓴 21장에서

대상이 전원 Windows 인데 macOS 키만 적힌 자리다.

| 위치 | 현재 | 고칠 것 |
|---|---|---|
| `slides.md:225` | 「단축키는 `Cmd ;` 입니다」 | Windows 는 `Ctrl ;`. 그리고 **`/btw`** 를 입력창에 쳐도 열린다 (`desktop#ask-a-side-question-without-derailing-the-session`) |
| `slides.md:530` | 「Cmd+Enter 로 한꺼번에」 | "**Windows**: press **Ctrl+Enter**" (`desktop#review-changes-with-diff-view`) |
| `slides.md:617` | 「Cmd+\ 로 닫습니다」 | Windows 는 `Ctrl+\` |
| `slides.md:596-618` 창 배치 SVG | 창 5종 | 문서상 창은 **8종** — chat, diff, browser, terminal, file, plan, tasks, **subagent**. iOS Simulator 는 macOS 전용이라 뺀 게 맞다 |
| `slides.md:711-719` 단축키 표 | 6개 | `Cmd Shift I`(모델 메뉴)가 빠졌다. Effort 메뉴(`Cmd Shift E`)를 넣었으면 짝을 맞추는 편이 낫다 |
| `slides.md:704` 단축키 장 전반 | — | **`Shift+Tab` 은 데스크톱에서 아무 일도 안 한다.** "The terminal-based interactive mode shortcuts, such as `Shift+Tab` to cycle permission modes, do not apply in Desktop." 엑셀 쓰던 손이 반드시 눌러 본다. 경고 한 줄이 필요하다 |

### 3-5. 사전 준비 안내 정정

`강의 구조 v2.md:38` 「사전 준비사항(설치·WSL2)은 덱에 넣지 않는다」 · `:392` 「Git for Windows 가 먼저 필요」

- **WSL2 는 필요 없다.** 데스크톱 앱은 Windows 에서 그냥 돈다. WSL 은 환경 선택지 넷 중
  하나일 뿐이고, **쓰면 오히려 손해**다 — "A few features aren't available in WSL sessions yet:
  the integrated terminal, connectors and plugins, session forking, the file browser pane,
  and file suggestions when you type `@`" (`docs/en/desktop-wsl`). 오늘 가르칠 화면의 절반이 사라진다.
- **Git for Windows 는 여전히 필수다.** 릴리스 노트 w18 의 "Git for Windows is no longer
  required" 는 **CLI 의 셸 도구** 이야기고, 데스크톱 Code 탭은 세션 격리(worktree)에 `git`
  바이너리가 필요하다. "**On Windows, Git is required for the Code tab to work**: download
  Git for Windows, install it, and **restart the app**." (`desktop#work-in-parallel-with-sessions`)
- **Node.js 는 필요 없다.** "The desktop app includes Claude Code. You don't need to install
  Node.js or the CLI separately." (`desktop-quickstart`)

→ 사전 준비는 **셋뿐**이다. ① Claude Desktop for Windows(x64/ARM64) ② Git for Windows 설치 후 **앱 재시작** ③ 유료 플랜 로그인.

### 3-6. 강사가 수업 전에 확인할 것

문서에 적힌 「이러면 안 돈다」를 모아 둔다.

1. **Git 미설치** — Code 탭이 로컬 세션을 아예 못 연다. 1번 사고 원인.
2. **사내 방화벽** — 실행 시 흰 화면. `*.anthropic.com` `*.claude.ai` `*.claude.com`
   `*.claudeusercontent.com` `downloads.claude.ai` 허용 필요.
3. **환경변수에 남은 `ANTHROPIC_API_KEY`** — 유료 플랜인데 400 에러. PowerShell `$PROFILE`
   과 사용자 환경변수를 확인.
4. **MDM 관리 기기** — 관리자가 `disableDesktopLocalSessions` 를 걸어 두면 Local 항목이
   회색으로 죽어 있다.
5. **`gh` 미설치** — PR 상태 확인·자동 병합 데모가 안 된다. "PR monitoring requires the
   GitHub CLI (`gh`) to be installed and authenticated".
6. **Windows MCP 불안정** — 전용 트러블슈팅 절이 따로 있을 만큼. 실습 5에서 MCP 를
   고르면 위험하다. 스킬 쪽이 안전하다.
7. **`/permissions` 는 데스크톱에서 안 된다** — "reply with `isn't available in this
   environment`". 시연 대본에 넣지 말 것. `/config` 는 Settings 창을 열 뿐이다.

---

## 4. 누락 발견 — 넣을 만한 12가지

문서에는 있는데 계획 어디에도 없고, **이 수강생에게 실제로 쓸모 있는** 것들. 우선순위 순.

| 순 | 제안 | 구간 | 장 수 | 왜 |
|---|---|---|---|---|
| 1 | **기본은 Auto** | 1-B (권한 모드 뒤) | 1 | Pro·Max·Team 은 세션이 **Auto 로 시작**한다. 「매번 물어볼 줄 알았는데 안 묻는다」가 첫 수업에서 가장 흔한 놀람이다. 근거 — "On Pro, Max, and Team plans, the built-in starting permission mode is auto mode." 백그라운드 분류기가 검사한다는 것까지 한 줄. Enterprise 는 `default` 로 시작하므로 강사가 어느 쪽인지 알고 들어가야 한다 |
| 2 | **일하는 3단계** | 1-A (「Claude Code란」 뒤) | 1 | 「얘가 지금 뭘 하고 있나」의 멘탈 모델. 맥락 수집 → 실행 → 검증이 돌고, 사람은 아무 지점에서나 끊을 수 있다. 공식 SVG(`agentic-loop.svg`)가 있어 그림 조달이 끝나 있다. 근거 — `how-claude-code-works#the-agentic-loop` |
| 3 | **언제 무엇을 붙이나** | 1-G (맨 앞) | 1 | CLAUDE.md · 스킬 · MCP · 훅을 각각 배우고 나면 「그래서 언제 뭘 쓰나」가 남는다. 문서에 **트리거 → 추가** 8행 표가 통째로 있다. "Claude gets a convention or command wrong twice → Add it to CLAUDE.md" 같은 행이 그대로 장표가 된다. 근거 — `features-overview#build-your-setup-over-time` |
| 4 | **나쁜 지시 vs 좋은 지시** | 3-A (한 줄 지시 실습 뒤) | 1 | Before/After 4쌍이 문서에 있다. "add tests for foo.py" → "write a test for foo.py covering the edge case where the user is logged out. avoid mocks." PRD 를 왜 쓰는지로 넘어가는 다리 역할을 한다. 근거 — `best-practices#provide-specific-context-in-your-prompts` |
| 5 | **흔한 실패 5종** | 1-I | 1 | 「한 세션에 다 우겨넣기」 「같은 걸 계속 고쳐 말하기」 등 실패 유형 + 각 처방 한 줄. 비개발자에게 가장 잘 먹히는 포맷이고, 3-A 시행착오 3종 분류와 짝이 맞는다. 근거 — `best-practices#avoid-common-failure-patterns` |
| 6 | **되감기 메뉴 6가지** | 1-C (「Esc ×2」 대체) | 1 | 지금 계획은 「그 전 상태로」 한 줄인데, 실제로는 **코드만 / 대화만 / 둘 다 / 여기부터 요약 / 여기까지 요약 / 취소** 여섯이다. 「코드는 두고 대화만 되감기」가 실무에서 제일 자주 쓰인다. 근거 — `checkpointing#rewind-and-summarize` |
| 7 | **다이내믹 워크플로** | 1-E (에이전트 팀 3장 대체) | 2 | 3-1 ② 참조. 데스크톱에서 도는 유일한 다중 에이전트다. 「누가 계획을 쥐고 있나」 축으로 서브에이전트와 갈린다 — 워크플로는 **스크립트**가 쥔다. 근거 — `workflows#when-to-use-a-workflow` |
| 8 | **예약 실행** | 4-E (GitHub Actions 앞) | 2 | 「매일 아침 9시에 어제 데이터 훑어서 표 만들어 둬」. 엑셀 실무자에게 GitHub Actions 보다 압도적으로 가깝고, 클릭만으로 끝난다. 함정 하나를 반드시 말해야 한다 — **로컬 예약 작업도 사이드바 「Routines」 안에 있고, `Local` 을 골라야 로컬**이다. 그리고 "If your computer sleeps through a scheduled time, the run is skipped." 근거 — `desktop-scheduled-tasks` |
| 9 | **`/context` 로 들여다보기** | 1-D (자동 압축 옆) | 1 | 「컨텍스트가 찬다」는 말이 초보자에게는 추상적이다. `/context` 는 무엇이 자리를 먹고 있는지 항목별로 보여준다. `context-window` 페이지의 대화형 시뮬레이션은 그대로 화면 공유용 교보재다. 근거 — `debug-your-config#see-what-loaded-into-context` |
| 10 | **플러그인 한 줄 설치** | 1-G (실습 5 앞) | 1 | 공식 마켓플레이스가 **처음부터 등록돼 있다**. `/plugin install github@claude-plugins-official` 한 줄, 데스크톱은 `+` 버튼. 실습 5(스킬 또는 MCP)의 세 번째 선택지로 두면 MCP 가 Windows 에서 불안정한 문제를 피할 수 있다. 신뢰 경고를 그대로 인용할 것 — "Make sure you trust a plugin before installing it." 근거 — `discover-plugins#official-anthropic-marketplace` |
| 11 | **완료 조건 걸기 `/goal`** | 4-D (「지시 vs 위임」 옆) | 1 | 「이렇게 고쳐」 대신 「이 조건이 될 때까지」의 실물이다. 매 턴 뒤 작은 모델이 조건 충족을 판정하고, 안 됐으면 스스로 한 턴 더 돈다. **데스크톱에서 된다.** 조건 작성 요령 한 줄도 문서에 있다 — "It doesn't run commands or read files independently, so write the condition as something Claude's own output can demonstrate." 근거 — `goal` |
| 12 | **`/clear` 와 `/compact`** | 1-D 또는 4-D | 1 | 맥락 관리를 개념으로만 말하면 안 남는다. 손이 가는 동작은 둘이다 — 주제가 바뀌면 `/clear`, 같은 일을 계속하는데 길어졌으면 `/compact`. 근거 — `best-practices#manage-context-aggressively` ("Run `/clear` between unrelated tasks to reset context.") · `desktop#work-in-parallel-with-sessions` (`/compact` 는 데스크톱에서도 된다고 명시) |

### 4-1. 넣지 말자고 판단한 것

- **음성 입력** — CLI 전용. 데스크톱 문서에 「voice」가 한 번도 안 나온다.
- **휴대폰 연동** — Dispatch 는 Pro/Max 전용(Team·Enterprise 불가), Remote Control 은
  터미널에서 시작해야 하고 Team·Enterprise 는 관리자가 켜야 한다. 한 문장으로 스치는 게 맞다.
- **`/ultrareview`** — 조건부 별칭이다. 정식 표기는 `/code-review ultra`. Team·Enterprise 는
  무료 실행이 **0회**이고 회당 $5~$25 크레딧을 태운다. 시연도 위험하다.
- **worktree 개념** — 결과만 한 줄. "In the desktop app, every new session gets its own
  worktree automatically." git 을 설명하지 않는다.
- **Explore 서브에이전트가 Haiku 로 싸게 돈다** — v2.1.198 부터 아니다. 부모 모델을 물려받는다.
- **`/agents` 마법사** — 없어졌다. "running it prints a reminder to ask Claude or edit
  `.claude/agents/` directly".

### 4-2. 숫자를 고쳐 둘 것

교안 어딘가에 쓰이면 틀리기 쉬운 최신 수치들.

- 번들 스킬은 **14개**: `/batch` `/claude-api` `/code-review` `/dataviz` `/debug` `/design-sync`
  `/doctor` `/fewer-permission-prompts` `/loop` `/run` `/run-skill-generator` `/simplify`
  `/verify` `/workflow-authoring`
- 훅 이벤트는 **31개**, 핸들러 유형은 **5종**(command / http / mcp_tool / prompt / agent).
  「훅 = 셸 스크립트」는 이제 반쪽이다
- Effort 는 **`low` → `medium` → `high` → `xhigh` → `max`**, 기본 `high`
- 모델 별칭에 **`best`** 와 **`fable`** 이 생겼다. `opus` → Opus 5, `sonnet` → Sonnet 5
- CLAUDE.md 탐색 위치는 **4곳**(관리 정책 / 사용자 / 프로젝트 / 로컬), 덮어쓰기가 아니라 **이어붙이기**
- 자동 메모리는 **기본 켜짐**, `~/.claude/projects/<project>/memory/` 에 저장, `MEMORY.md`
  앞 200줄(또는 25KB)만 매 세션 실린다
- MCP 스코프는 3종이지만 **우선순위는 5단계**(Local → Project → User → 플러그인 → claude.ai 커넥터)
- 서브에이전트는 내장 6종(Explore / Plan / General-purpose / claude / statusline-setup / claude-code-guide)
