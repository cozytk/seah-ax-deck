---
class: divider brand-ag-solid
---

<p class="div-no">2부</p>

## Antigravity 기초

<p class="div-sub">같은 일을 다른 도구로 시켜 보기</p>

<p class="div-file">시연만 · 실습 없음</p>

---
class: top-led brand-ag
---

<p class="eyebrow">2부 · Antigravity</p>

# Antigravity란

<div class="split evidence">
<div>

<p class="lead">구글이 만든, 에이전트를 <em>여러 개 굴리는</em> 데스크톱 앱입니다.</p>

<div class="deflist">
<div><b>어디서 도나</b><span>편집기 없이 <em>혼자 도는 앱</em>입니다</span></div>
<div><b>시킬 수 있는 것</b><span>명령 실행 · 파일 수정 · 웹 검색 · 크롬 조작</span></div>
<div><b>일하는 단위</b><span>프로젝트. 묶어 둔 폴더 안에서만</span></div>
</div>

<p class="thesis">터미널용 CLI 와 편집기 버전도 따로 있습니다. 이 수업은 <em>데스크톱 앱</em>만 봅니다.</p>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://antigravity.google/docs/overview/">
<img src="./images/docs/ag-overview.png" alt="Antigravity 공식 문서 개요 첫 문단" />
<figcaption>원문 · <a href="https://antigravity.google/docs/overview/"><code>docs/overview</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Antigravity 공식 문서 「Overview」 antigravity.google/docs/overview</p>

---
class: top-led brand-ag
---

<p class="eyebrow">2부 · Antigravity</p>

# 실행 모드 2종

<p class="lead">대화를 시작할 때 <em>계획을 낼지 말지</em>를 먼저 고릅니다.</p>

<div class="duo">
<div class="pane"><h3><span class="latin">PLANNING</span>계획 모드</h3><p>일을 묶음으로 정리하고, 코드를 읽어 조사한 뒤 <em>계획 문서</em>를 냅니다. 처음 보는 코드나 여러 파일을 건드릴 때.</p></div>
<div class="pane"><h3><span class="latin">FAST</span>바로 실행</h3><p>계획 단계 없이 바로 합니다. 이름 바꾸기, 명령 한 줄, 작은 정리처럼 <em>범위가 뻔한</em> 일.</p></div>
</div>

<p class="thesis">이름만 다를 뿐, Claude Code 의 <em>Plan 모드와 같은 자리</em>입니다.</p>

<p class="src">출처 — Antigravity 공식 문서 「Artifact Review」 antigravity.google/docs/artifact-review</p>

---
class: top-led brand-ag
---

<p class="eyebrow">2부 · Antigravity</p>

# 아티팩트

<div class="split evidence">
<div>

<p class="lead">매 단계를 지켜보는 대신 <em>산출물</em>로 확인합니다.</p>

<div class="deflist">
<div><b>무엇이 나오나</b><span>계획 문서 · 코드 diff · 구조도 · 브라우저 녹화</span></div>
<div><b>왜 나오나</b><span>오래 도는 일을 붙어 앉아 볼 수 없기 때문입니다</span></div>
<div><b>어디서 보나</b><span>앱 오른쪽 패널에서 열고 되돌려 봅니다</span></div>
</div>

<p class="thesis">도구 호출 하나하나가 아니라 <em>중간 지점의 결과물</em>을 봅니다. 볼 자리가 그만큼 줄어듭니다.</p>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://antigravity.google/docs/artifacts/">
<img src="./images/docs/ag-artifacts.png" alt="Antigravity 공식 문서의 아티팩트 정의 문단" />
<figcaption>원문 · <a href="https://antigravity.google/docs/artifacts/"><code>docs/artifacts</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Antigravity 공식 문서 「Artifacts」 antigravity.google/docs/artifacts</p>

---
class: top-led brand-ag
---

<p class="eyebrow">2부 · Antigravity</p>

# Implementation Plan

<div class="split evidence">
<div>

<p class="lead">코드를 건드리기 전에 <em>사람에게 확인받는</em> 문서입니다.</p>

<div class="deflist">
<div><b>담기는 것</b><span>무엇을 왜 고칠지, 새로 만들 파일 목록</span></div>
<div><b>따로 표시</b><span>「User Review Required」 로 묶인 갈림길</span></div>
<div><b>멈추는 자리</b><span>이 문서를 내고 멈춰서 기다립니다</span></div>
</div>

<p class="thesis">3부에서 쓸 PRD 와 다릅니다. PRD 는 <em>무엇을 만들지</em>, 이 문서는 <em>어떻게 고칠지</em>입니다.</p>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://antigravity.google/docs/implementation-plan/">
<img src="./images/docs/ag-plan-crop.png" alt="Antigravity 의 실행 계획 화면. 기술 스택과 알고리즘을 사람에게 확인받는 항목이 나열되어 있다" />
<figcaption>계획 아티팩트 · <a href="https://antigravity.google/docs/implementation-plan/"><code>docs/implementation-plan</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Antigravity 공식 문서 「Plan」 antigravity.google/docs/implementation-plan</p>

---
class: top-led brand-ag
---

<p class="eyebrow">2부 · Antigravity</p>

# 계획 승인과 반려

<p class="lead">갈림길로 표시된 곳부터 읽고, 그대로 가려면 <em>Proceed</em>.</p>

<div class="steps">
<div><b>코멘트</b><span>고칠 문장을 골라 「이건 이번엔 빼」 처럼 적습니다</span></div>
<div><b>되돌려 주기</b><span>Review 로 묶어 보내면 계획을 고쳐 다시 냅니다</span></div>
<div><b>진행</b><span>Proceed 를 누르면 그때 파일을 건드립니다</span></div>
</div>

<div class="callout"><b>기본값</b> 멈춰서 묻는 쪽입니다. <em>Always Proceed</em> 로 바꾸면 멈춤이 사라집니다.</div>

<p class="src">출처 — Antigravity 공식 문서 「Plan」·「Artifact Review」 antigravity.google/docs</p>

---
class: top-led brand-ag
---

<p class="eyebrow">2부 · Antigravity</p>

# 모델 선택

<p class="lead">안에서 도는 모델을 <em>직접 고릅니다</em>. 구글 것만 있는 게 아닙니다.</p>

<div class="chips">
<i>Gemini 3.7 Flash</i>
<i>Gemini 3.6 Flash</i>
<i>Gemini 3.5 Flash</i>
<i>Gemini 3.1 Pro</i>
<i>Claude Sonnet 4.6</i>
<i>Claude Opus 4.6</i>
<i>GPT-OSS 120B</i>
</div>

<p class="thesis">요금제에 따라 목록이 다릅니다. Claude 계열과 GPT-OSS 는 <em class="warn">Enterprise 플랜에서는 안 뜹니다</em>. 돌아가는 중에 바꿔도 그 턴은 원래 모델로 끝납니다.</p>

<p class="src">출처 — Antigravity 공식 문서 「Models」 antigravity.google/docs/models</p>

---
class: top-led brand-ag compact
---

<p class="eyebrow">2부 · Antigravity</p>

# Claude Code vs Antigravity

<p class="lead">어느 쪽이 나은가가 아니라 <em>어떤 화면이 필요한가</em>입니다.</p>

| | Claude Code | Antigravity |
|---|---|---|
| 도는 자리 | 터미널 · 데스크톱 앱 · 웹 · IDE | 데스크톱 앱 · CLI · IDE |
| 계획 | Plan 모드로 받아 승인 | 계획 모드가 문서 한 장을 냅니다 |
| 확인 방식 | 대화에 쌓이는 변경 내용 | 아티팩트 패널의 산출물 |
| 모델 | Claude 계열 | Gemini · Claude · GPT-OSS 중 선택 |
| 확장 | 스킬 · MCP · 플러그인 · 훅 | 스킬 · MCP · 플러그인 · 훅 |

<p class="thesis">맨 아랫줄이 같습니다. 둘 다 <code>SKILL.md</code> 와 MCP 를 씁니다. <em>갈리는 건 화면</em>입니다.</p>

<p class="src">출처 — Antigravity 공식 문서 「Feature overview」·「Skills」·「MCP」 / Claude Code 공식 문서 「Overview」</p>

---
class: top-led brand-ag
---

<p class="eyebrow">2부 · 시연 1</p>

# 같은 한 줄

<p class="lead">같은 지시 한 줄을 두 도구에 <em>그대로</em> 넣습니다.</p>

<div class="deflist">
<div><b>지시</b><span>「이 폴더의 엑셀을 읽어 월별 합계 화면을 만들어 줘」</span></div>
<div><b>볼 것</b><span>첫 응답이 <em>무엇으로</em> 오는가</span></div>
<div><b>Claude Code</b><span>계획을 대화에 풀어 놓고 승인을 기다립니다</span></div>
<div><b>Antigravity</b><span>계획 문서 한 장을 아티팩트로 냅니다</span></div>
</div>

<p class="thesis">하는 일은 같습니다. 다른 건 <em>사람이 확인하는 자리의 모양</em>입니다.</p>

<!-- 시연. 참가자는 따라 하지 않는다. 두 화면을 나란히 띄워 첫 응답까지만 보여준다. -->

---
class: top-led brand-ag
---

<p class="eyebrow">2부 · 시연 2</p>

# 받은 계획

<div class="split evidence">
<div>

<p class="lead">나온 계획 문서를 <em>같이 읽습니다</em>.</p>

<div class="deflist">
<div><b>맨 위</b><span>무엇을 만드는지 한 문단</span></div>
<div><b>가운데</b><span>결정이 필요한 갈림길 두세 개</span></div>
<div><b>아래</b><span>새로 만들 파일과 각 파일이 하는 일</span></div>
</div>

<p class="thesis">코드를 못 읽어도 <em>이 문서는 읽힙니다</em>. 확인해야 할 것이 여기 다 있습니다.</p>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://antigravity.google/docs/implementation-plan/">
<img src="./images/docs/ag-plan-crop.png" alt="Antigravity 의 실행 계획 본문" />
<figcaption>계획 아티팩트 · <a href="https://antigravity.google/docs/implementation-plan/"><code>docs/implementation-plan</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Antigravity 공식 문서 「Plan」 antigravity.google/docs/implementation-plan</p>

---
class: top-led brand-ag
---

<p class="eyebrow">2부 · 시연 3</p>

# 고쳐서 다시

<div class="split evidence">
<div>

<p class="lead">Proceed 를 누르기 전까지는 <em>파일이 하나도 안 바뀝니다</em>.</p>

<div class="steps">
<div><b>코멘트</b><span>「이 기능은 이번엔 빼」 처럼 범위를 줄입니다</span></div>
<div><b>보내기</b><span>Review 로 묶어 보냅니다</span></div>
<div><b>받기</b><span>고친 계획이 다시 옵니다. 고치는 건 <em>문서 위에서</em> 끝납니다</span></div>
</div>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://antigravity.google/docs/implementation-plan/">
<img src="./images/docs/ag-plan-comments.png" alt="계획 문서 위에 인라인 코멘트 두 개가 달린 화면" />
<figcaption>코멘트를 단 모습 · <a href="https://antigravity.google/docs/implementation-plan/"><code>docs/implementation-plan</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Antigravity 공식 문서 「Plan」 antigravity.google/docs/implementation-plan</p>

---
class: top-led brand-ag
---

<p class="eyebrow">2부 · Antigravity</p>

# 선택 기준

<p class="lead">셋 중 어디에 해당하는지로 고릅니다.</p>

<div class="trio">
<div class="pane key"><h3>Claude Code</h3><p>터미널까지 함께 쓰고, 되돌리기와 권한 모드를 손에 익힌 일. 이 수업의 실습은 전부 여기입니다.</p></div>
<div class="pane"><h3>Antigravity</h3><p>코드는 안 보고 계획 문서만 읽고 승인하고 싶을 때. 모델을 바꿔 가며 견줘 보고 싶을 때.</p></div>
<div class="pane"><h3>둘 다 아님</h3><p>엑셀 한 장으로 끝나는 일. 도구를 켜는 시간이 더 듭니다.</p></div>
</div>

<p class="thesis">3부부터는 <em>Claude Code 로 돌아갑니다</em>. Antigravity 는 선택지로 알아 두면 됩니다.</p>
