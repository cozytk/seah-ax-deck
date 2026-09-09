---
class: divider brand-cc-solid
---

<p class="div-no">3-B</p>

## 스킬과 레퍼런스

<p class="div-sub">원하는 화면을 보여주고, PRD의 기능을 담아 구현합니다</p>

---
class: top-led brand-cc
---

<p class="eyebrow">3-B · 스킬과 레퍼런스로 디자인</p>

# 디자인에 쓰는 세 가지

<p class="lead"><em>스킬은 구현을 돕고, 이미지는 원하는 방향을 보여줍니다.</em></p>
<div class="deflist">
<div><b>frontend-design</b><span>화면 구성·타이포그래피·시각적 완성도를 고려하며 구현합니다.</span></div>
<div><b>taste-skill</b><span>배치·여백·정보 밀도를 다듬을 때 함께 사용합니다.</span></div>
<div><b>reference/</b><span>내가 고른 화면 캡처를 넣고, 닮았으면 하는 부분을 짚습니다.</span></div>
</div>
<p class="thesis">준비 · 두 스킬이 현재 Claude Code 세션에서 사용 가능한지 확인합니다.</p>
<p class="src">출처 · <a href="https://github.com/anthropics/skills/tree/main/skills/frontend-design">frontend-design</a> · <a href="https://github.com/Leonxlnx/taste-skill">taste-skill</a></p>

<!--
taste-skill 저장소의 기본 프런트엔드 스킬 설치 이름은 design-taste-frontend입니다. 학생이 쓰는 실제 설치 이름을 확인합니다. 스킬을 읽었는지 Claude의 작업 기록에서도 확인하며, 이름을 적었다는 이유만으로 적용됐다고 간주하지 않습니다.
-->

---
class: top-led brand-cc
---

<p class="eyebrow">3-B · 스킬과 레퍼런스로 디자인</p>

# 원하는 화면 캡처

<p class="lead"><em>Dribbble 등에서 마음에 드는 화면</em>을 찾아 캡처합니다.</p>
<div class="steps">
<div><b>찾기</b><span>만드는 것과 비슷한 화면을 검색합니다. 예: dashboard, data table.</span></div>
<div><b>고르기</b><span>전체 배치가 마음에 드는 화면 1장, 필요한 세부 화면 1~2장을 고릅니다.</span></div>
<div><b>캡처하기</b><span>레이아웃과 글자 크기가 보이게 캡처해 프로젝트의 reference 폴더에 저장합니다.</span></div>
</div>
<p class="thesis">5분 실습 · 캡처 후 reference에 저장하고 Claude가 읽는지 확인합니다.</p>
<p class="src">Windows · Win + Shift + S　 /　 macOS · Shift + Command + 4</p>
<p class="src">레퍼런스 탐색 · <a href="https://dribbble.com/">Dribbble</a></p>

<!--
학생이 자기 취향의 실제 화면을 고릅니다. 레퍼런스의 명칭은 Dribbble입니다. 링크만 보내는 대신 캡처 파일을 같은 작업 프로젝트에서 읽을 수 있게 둡니다.
-->

---
class: top-led brand-cc
---

<p class="eyebrow">3-B · 스킬과 레퍼런스로 디자인</p>

# reference 폴더 구성

<p class="lead">프로젝트 폴더 안에 <em>이미지 파일을 직접</em> 넣습니다.</p>

```text
내 프로젝트/
├── PRD.md
└── reference/
    ├── dashboard.png   ← 전체 배치
    └── table.png       ← 표의 간격과 행 구분
```
<p class="thesis">확인 · 「reference 안의 이미지들을 열고, 각 이미지의 특징을 설명해줘.」</p>


<!--
폴더 구조 예시입니다. 예시 파일은 자동 제공되지 않습니다. 학생이 직접 캡처하고 해당 파일명으로 저장합니다. 새 세션이나 다른 작업 사본을 쓰면 같은 폴더를 읽는지 확인합니다.
-->

---
class: top-led brand-cc
---

<p class="eyebrow">3-B · 스킬과 레퍼런스로 디자인</p>

# 참고할 부분을 짚기

<p class="lead">「이것처럼」에 <em>어디를 닮게 할지</em> 한 문장을 더합니다.</p>

```text
reference/dashboard.png의 왼쪽 메뉴와 상단 지표 배치를 참고해줘.
reference/table.png에서는 행 간격과 숫자 정렬을 참고해줘.
색과 여백도 비슷한 느낌으로 맞추되,
문구와 데이터, 기능은 PRD.md에 맞춰줘.
```
<p class="thesis">첫 결과를 보고 레퍼런스와 다른 부분을 짚어 조정합니다. 똑같이 나오는 것은 아닙니다.</p>


---
class: top-led brand-cc
---

<p class="eyebrow">3-B · 스킬과 레퍼런스로 디자인</p>

# 스킬을 써서 개발 시작

<p class="lead">PRD와 이미지를 읽은 뒤, <em>핵심 흐름부터 실제로 동작하게</em> 만듭니다.</p>

```text
PRD.md와 reference/의 이미지를 읽어줘.
frontend-design과 taste-skill(design-taste-frontend)을 사용해 구현해줘.
별도의 디자인 문서는 만들지 말고 레퍼런스를 참고해 바로 개발해줘.
먼저 엑셀 업로드 → 전체 불량률 → 라인 필터 흐름을 완성해줘.
실행한 뒤 접속 주소와 확인할 동작을 알려줘.
```
<p class="thesis">원하는 방향과 다르면 중간에 멈추고, 바꿀 화면과 이유를 말합니다.</p>


---
class: top-led brand-cc
---

<p class="eyebrow">3-B · 스킬과 레퍼런스로 디자인</p>

# 이미지로 확인 못 하는 것

<p class="lead">레퍼런스에 없는 <em>빈 화면과 오류 상태</em>도 PRD대로 만듭니다.</p>
<div class="deflist">
<div><b>파일 없음</b><span>무엇을 올려야 하는지 보이는가?</span></div>
<div><b>잘못된 열</b><span>어떤 열을 고쳐야 하는지 알려 주는가?</span></div>
<div><b>키보드 조작</b><span>Tab으로 업로드와 필터에 닿는가?</span></div>
</div>
<p class="thesis">다음 단계 · Playwright MCP로 실제 화면을 열고 직접 조작하게 합니다.</p>

