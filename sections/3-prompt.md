---
class: top-led brand-cc compact
---

<p class="eyebrow">3부 · 지시 쓰기</p>

# 나쁜 지시 vs 좋은 지시

<p class="lead">1부에서 본 네 쌍 중 둘입니다. 더 들어간 건 <em>어디를 볼지와 무엇이 끝인지</em>뿐입니다.</p>

<div class="vs">
<div class="pane">
<h3>짧게 보내면</h3>
<p>「로그인 버그 고쳐 줘」</p>
<p>「달력 위젯 만들어 줘」</p>
</div>
<i class="vs-badge">VS</i>
<div class="pane key">
<h3>적어서 보내면</h3>
<p>「세션이 끊긴 뒤 로그인이 안 된다고 합니다. auth 폴더의 토큰 갱신을 보고, 재현하는 테스트를 먼저 쓴 다음 고쳐 주세요」</p>
<p>「홈 화면의 기존 위젯이 어떻게 만들어졌는지 보고, 그 방식대로 달력 위젯을 만들어 주세요」</p>
</div>
</div>

<p class="thesis">오른쪽처럼 쓰면 결과가 달라집니다. 그런데 저 문장을 <em>매번 다시 쓰기</em>는 어렵습니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Best practices · Provide specific context in your prompts」 docs/en/best-practices</p>

---
class: top-led brand-cc
---

<p class="eyebrow">3부 · 지시 쓰기</p>

# 한 줄 지시의 한계

<p class="lead">한 줄로 보내면 나머지 넷은 <em>Claude 가 대신 정합니다</em>.</p>

<div class="deflist">
<div><b>범위</b><span>어느 파일까지 손댈지</span></div>
<div><b>완료 기준</b><span>무엇이 되면 「고쳐진 것」인지</span></div>
<div><b>피할 것</b><span>무엇은 건드리면 안 되는지</span></div>
<div><b>확인 방법</b><span>됐는지 무엇으로 보는지</span></div>
</div>

<p class="thesis">넷 다 매번 다르게 정해집니다. 그래서 같은 한 줄을 두 번 보내면 <em>다른 것</em>이 옵니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Best practices · Provide specific context in your prompts」 docs/en/best-practices</p>

---
class: top-led brand-cc
---

<p class="eyebrow">3부 · 지시 쓰기</p>

# 말로 vs 문서로

<p class="lead">같은 문장인데 <em>수명이 다릅니다</em>.</p>

<div class="duo">
<div class="pane"><h3>말로</h3><p>그 대화 안에서만 삽니다. 다음에 시킬 때 같은 설명을 처음부터 다시 하고, 옆자리 사람은 또 다르게 설명합니다.</p></div>
<div class="pane key"><h3>문서로</h3><p>한 번 적으면 사람도 읽고 Claude 도 읽습니다. 며칠 뒤에 다시 시켜도 같은 기준을 봅니다.</p></div>
</div>

<p class="thesis">그래서 다음 장부터 <em>PRD</em>입니다. 말로 하던 것을 한 장에 옮깁니다.</p>
