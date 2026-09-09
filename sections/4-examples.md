---
class: divider brand-cc-solid
---

<p class="div-no">4-C</p>

## 두 예제 다시 보기

<p class="div-sub">앞에서 만든 두 화면에 새 디자인 프로세스를 그대로 걸어 봅니다</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">4-C · 예제 되짚기</p>

# 픽셀은 그대로

<p class="lead">예제 1의 첫 화면은 고치기 전과 뒤가 <em>파일 크기까지 똑같습니다</em>. 그런데 Tab 을 한 번 누르면 갈립니다.</p>

<figure class="shot band nochrome" data-origin="capture">
<img src="./images/ex1/before-data-tab.png" alt="생산·품질 실적 화면에서 Tab 을 한 번 누른 모습. 초점이 오른쪽 끝 인쇄·PDF 버튼으로 곧장 건너뛴다" />
<figcaption>고치기 전 — 초점이 <em>오른쪽 끝 버튼</em>으로 건너뜁니다</figcaption>
</figure>

<figure class="shot band nochrome mark-ok" data-origin="capture">
<img src="./images/ex1/after-data-tab.png" alt="같은 화면에서 Tab 을 한 번 누른 모습. 왼쪽 위에 본문으로 건너뛰기 버튼이 주황 테두리와 함께 나타난다" />
<figcaption>셀프리뷰 뒤 — 왼쪽 위에 <em>「본문으로 건너뛰기」</em></figcaption>
</figure>

<p class="src">근거 — 예제 1(생산실적 대시보드) · 같은 데이터 324행 · 같은 폭 1440 · 첫 화면 캡처 두 장은 해시가 동일</p>

---
class: top-led brand-cc
---

<p class="eyebrow">4-C · 예제 되짚기</p>

# 입구가 막혀 있었다

<p class="lead">이 앱에 들어가는 길은 <em>파일 올리기 하나</em>뿐인데, 그 하나가 키보드로 안 닿았습니다.</p>

<div class="deflist">
<div><b>왜 그랬나</b><span>파일 입력을 <code>display:none</code> 으로 숨기고 예쁜 상자를 대신 그렸습니다</span></div>
<div><b>무슨 뜻인가</b><span>마우스가 없으면 <em class="bad">이 앱을 시작할 수 없습니다</em></span></div>
<div><b>어떻게 고쳤나</b><span>보이지만 않게 숨기고, 초점이 오면 테두리가 뜨게</span></div>
</div>

<p class="thesis">화면만 보면 멀쩡합니다. <em>Tab 을 눌러 봐야</em> 드러납니다.</p>

<p class="src">근거 — 예제 1 셀프리뷰 1회 · 기능 변경 없음 · 단위 64개 · E2E 7개 그대로 통과</p>

---
class: top-led brand-cc
---

<p class="eyebrow">4-C · 예제 되짚기</p>

# 고치다 새로 만든 것

<p class="lead">한 번 돌린 걸로 끝나지 않았습니다. <em>고치는 과정에서 새 문제</em>가 생겼습니다.</p>

<div class="duo">
<div class="pane">
<h3>무슨 일이 있었나</h3>
<p>표가 가로로 넘치지 않게 스크롤 칸을 씌웠는데, 쓰던 표 부품이 이미 하나를 갖고 있었습니다. Tab 정거장이 두 개가 됐습니다.</p>
</div>
<div class="pane">
<h3>어떻게 찾았나</h3>
<p>마지막에 셀프리뷰를 <em>한 번 더</em> 돌렸습니다. 고친 결과에 대고 다시 물어야 이런 게 나옵니다.</p>
</div>
</div>

<p class="thesis">그래서 순서가 이렇습니다 — <em>만들고 → 보고 → 고치고 → 다시 보고</em>.</p>

---
class: top-led brand-cc
---

<p class="eyebrow">4-C · 예제 되짚기</p>

# 지침이 있어도

<p class="lead">예제 2에는 <em>272줄짜리 DESIGN.md</em> 가 이미 있었습니다. 그런데도 빠진 게 있었습니다.</p>

<div class="vs">
<div class="pane">
<h3>문서가 옮긴 것</h3>
<p>색 · 타이포 · 정보 위계. 판정 스트라이프와 마감 게이지 같은 시그니처까지 코드에 그대로 있었습니다.</p>
</div>
<i class="vs-badge">그런데</i>
<div class="pane">
<h3>문서에 없던 것</h3>
<p>초점 테두리 · 건너뛰기 링크 · 명암비 하한. <em class="bad">한 줄도</em> 적혀 있지 않았습니다.</p>
</div>
</div>

<p class="thesis">화면을 보고 쓰는 문서라서, <em>화면에 안 나타나는 것은 쓸 계기가 없습니다</em>.</p>

<p class="src">근거 — 예제 2(수주 레이더) DESIGN.md 272줄 · 셀프리뷰 1회 · 기능과 시그니처는 안 건드림</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">4-C · 예제 되짚기</p>

# Tab 한 번의 차이

<p class="lead">우리 예제 2에서도 <em>같은 자리</em>가 비어 있었습니다.</p>

<figure class="shot band nochrome" data-origin="capture">
<img src="./images/ex2/before-tab.png" alt="수주 레이더 첫 화면에서 Tab 을 한 번 누른 모습. 초점이 왼쪽 메뉴의 오늘 브리핑으로 곧장 들어간다" />
<figcaption>고치기 전 — 표에 닿으려면 <em>메뉴 넷을 매번</em> 지나야 합니다</figcaption>
</figure>

<figure class="shot band nochrome mark-ok" data-origin="capture">
<img src="./images/ex2/after-tab.png" alt="같은 화면에서 Tab 을 한 번 누른 모습. 왼쪽 위에 본문으로 건너뛰기 버튼이 흰 테두리와 함께 나타난다" />
<figcaption>셀프리뷰 뒤 — 왼쪽 위에 <em>「본문으로 건너뛰기」</em></figcaption>
</figure>

<p class="src">근거 — 같은 데이터·같은 폭(1440)·같은 스크롤 위치에서 첫 Tab 을 눌러 캡처</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">4-C · 예제 되짚기</p>

# 명암비 하한

<p class="lead">색은 정교하게 정해 뒀는데 <em>「몇 대 몇 이상」</em>이 없었습니다. 셋이 기준 미달이었습니다.</p>

| 쓰인 자리 | 고치기 전 | 고친 뒤 |
|---|---|---|
| 11px 라벨 전부 · 표 머리 | 3.1 : 1 | 4.8 : 1 |
| 부적합 판정 글자 | 3.1 : 1 | 4.8 : 1 |
| 조건부 판정 · `D-7` | 4.3 : 1 | 5.1 : 1 |

<p class="thesis">눈으로는 안 보입니다. 전후를 나란히 놔도 <em>차이를 찾기 어렵습니다</em>. 그래서 사람이 아니라 규칙이 잡아야 합니다.</p>

<p class="src">근거 — 예제 2 색 토큰 실측 · 본문 기준선 4.5:1</p>

---
class: top-led brand-cc
---

<p class="eyebrow">4-C · 예제 되짚기</p>

# 지침을 지켰는데도

<p class="lead">「표는 자기 칸 안에서 가로 스크롤한다」는 <em>문서에 있었고 코드도 지켰습니다</em>.</p>

<div class="deflist">
<div><b>남은 구멍</b><span>마우스 없이는 그 표를 옆으로 밀 방법이 없었습니다</span></div>
<div><b>필요했던 것</b><span>그 영역을 초점 대상으로 만들어 방향키가 먹게</span></div>
<div><b>대신 생긴 것</b><span>표마다 Tab 정거장이 하나씩 늘었습니다</span></div>
</div>

<p class="thesis">지침 한 줄을 <em>정확히 따랐는데도</em> 구멍이 남았습니다. 그래서 만든 뒤에 한 번 더 봅니다.</p>

---
class: top-led brand-cc
---

<p class="eyebrow">4-C · 예제 되짚기</p>

# 시그니처의 뒷면

<p class="lead">화면의 얼굴로 정한 표기가 <em>그대로 접근성 문제</em>가 되기도 합니다.</p>

<div class="duo">
<div class="pane">
<h3>눈으로는</h3>
<p><code>D-2</code> 는 한 덩어리입니다. 색 띠를 세로로 훑는 이 화면의 설계가 여기 걸려 있습니다.</p>
</div>
<div class="pane">
<h3>낭독기로는</h3>
<p>「디 마이너스 이」로 읽습니다. 표기를 바꾸면 설계가 무너지니, <em>보이는 건 그대로 두고</em> 「마감까지 2일」을 뒤에 하나 더 깔았습니다.</p>
</div>
</div>

<p class="thesis">고치는 방법이 하나가 아닙니다. <em>무엇을 지킬지</em> 먼저 정해야 고를 수 있습니다.</p>
