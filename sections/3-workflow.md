---
class: divider brand-cc-solid
---

<p class="div-no">3부</p>

## 질문으로 PRD 작성

<p class="div-sub">모호한 아이디어를 확인 가능한 요구사항으로 바꿉니다</p>

---
class: top-led brand-cc
---

<p class="eyebrow">3부 · 전체 흐름</p>

# 개발 워크플로우

<p class="lead">세 단계를 한 바퀴 돕니다. <em>완료 기준은 첫 단계에서</em> 정합니다.</p>
<figure class="figure">
<svg viewBox="0 0 900 230" role="img" aria-label="역인터뷰로 PRD 확정, 스킬과 reference 이미지로 개발, Playwright MCP로 검증. 실패하면 해당 단계로 돌아간다">
<g fill="var(--ink)" style="font-family:var(--sans);font-size:24px;font-weight:600">
<text x="35" y="66">① 역인터뷰</text><text x="345" y="66">② 디자인·개발</text><text x="680" y="66">③ 검증</text>
</g>
<g fill="var(--dim)" style="font-family:var(--sans);font-size:17px">
<text x="35" y="110">질문하고 답하며 PRD 확정</text><text x="345" y="110">스킬 + reference 이미지</text><text x="680" y="110">Playwright MCP</text>
<text x="260" y="206">결과가 다르면 원인을 짚고 수정한 뒤 다시 확인</text>
</g>
<g fill="none" stroke="var(--accent)" stroke-width="3">
<path d="M270 74 H320 l-10 -7 m10 7 l-10 7 M600 74 H650 l-10 -7 m10 7 l-10 7"/>
<path d="M785 135 V162 H150 V135 m0 0 l-7 10 m7 -10 l7 10"/>
</g></svg>
</figure>

---
class: top-led brand-cc
---

<p class="eyebrow">3-A · 역인터뷰로 PRD 작성</p>

# 첫 요청은 역인터뷰

<p class="lead">무엇을 만들지 짧게 말하고, <em>Claude가 질문하게</em> 합니다.</p>

```text
생산실적 엑셀을 올리면 라인별 불량률을 확인하는 화면을 만들고 싶어.
바로 개발하지 말고, PRD를 쓸 수 있도록 나를 역인터뷰해줘.
사용자, 데이터 뜻, 핵심 기능, 제외 범위, 완료 조건을 물어봐.
한 번에 1~2개씩 질문하고, 애매한 답은 예를 들어 다시 물어봐.
내가 모르는 부분은 선택지와 차이를 설명해줘.
```
<p class="thesis">시작 상태 · Code 탭에서 수업용 프로젝트를 열고 샘플 엑셀을 첨부합니다.</p>


<!--
강사는 먼저 두 번의 질문·답변을 시연합니다. 이후 학생이 자기 업무로 바꿔 입력합니다. 질문 수보다 애매함이 줄었는지를 봅니다.
근거: https://code.claude.com/docs/en/best-practices#let-claude-interview-you
-->

---
class: top-led brand-cc
---

<p class="eyebrow">3-A · 역인터뷰로 PRD 작성</p>

# 모르는 것도 되묻기

<p class="lead">내가 답하기 어렵다면 <em>예를 들어 설명해 달라</em>고 묻습니다.</p>
<div class="deflist">
<div><b>Claude의 질문</b><span>전체 불량률은 라인별 비율의 평균인가요, 수량 합계로 계산하나요?</span></div>
<div><b>내가 되묻기</b><span>둘이 어떻게 달라? 생산량이 다른 두 라인으로 설명해줘.</span></div>
<div><b>내가 결정하기</b><span>불량수 합계 ÷ 생산량 합계로 계산하자. PRD에 적어줘.</span></div>
</div>
<p class="thesis">Claude가 묻고, 내가 답하고, 낯선 기준은 다시 묻습니다.</p>


---
class: top-led brand-cc
---

<p class="eyebrow">3-A · 역인터뷰로 PRD 작성</p>

# 대화가 기준이 되는 순간

<p class="lead">「불량률을 보여줘」를 <em>값까지 확인할 수 있는 문장</em>으로 바꿉니다.</p>

| 샘플 | 생산량 | 불량수 | 불량률 |
|---|---:|---:|---:|
| A라인 | 100 | 4 | 4% |
| B라인 | 200 | 2 | 1% |
| 전체 | 300 | 6 | **2%** |

<p class="thesis">합의 · 전체는 2%, A라인을 선택하면 4%. 단순 평균 2.5%를 쓰지 않습니다.</p>


<!--
교육용 데이터입니다. 실제 프로젝트의 기존 데이터나 결과를 재측정한 표가 아닙니다. 이후 PRD·구현·검증에서 이 샘플을 동일하게 사용합니다.
-->

---
class: top-led brand-cc
---

<p class="eyebrow">3-A · 역인터뷰로 PRD 작성</p>

# 합의한 내용을 PRD로

<p class="lead"><em>PRD는 무엇을 만들고 어떻게 확인할지</em> 합의한 문서입니다.</p>

```text
지금까지 합의한 내용을 PRD.md로 정리해줘.
목적·사용자·데이터 정의·핵심 기능·제외 범위·완료 조건을 담아줘.
미정인 내용은 지어내지 말고 따로 표시해줘.
개발을 막는 미정 항목부터 다시 질문해줘. 아직 코드는 만들지 마.
```
<p class="thesis">확인 · 읽고 나서 「내가 정하지 않은 기능이나 기준」이 있는지 고칩니다.</p>


---
class: top-led brand-cc
---

<p class="eyebrow">3-A · 역인터뷰로 PRD 작성</p>

# PRD에 남길 내용

<p class="lead">개발을 시작하기 전에 <em>완료 조건까지</em> 읽고 확정합니다.</p>
<div class="deflist">
<div><b>목적·사용자</b><span>생산 담당자가 회의 전에 라인별 불량률을 확인한다.</span></div>
<div><b>데이터·기능</b><span>라인·생산량·불량수 열을 읽고, 업로드와 라인 필터를 제공한다.</span></div>
<div><b>제외 범위</b><span>이번에는 로그인, 자동 수집, 외부 시스템 연동을 만들지 않는다.</span></div>
<div><b>완료 조건</b><span>샘플 전체 2%, A라인 4%. 필수 열이 없으면 누락된 열을 안내한다.</span></div>
</div>
<p class="thesis">생산량이 0일 때 표시할 값처럼 남은 질문도 결정한 뒤 반영합니다.</p>


---
class: top-led brand-cc
---

<p class="eyebrow">3-A · 역인터뷰로 PRD 작성</p>

# 내 업무로 역인터뷰

<p class="lead"><em>10분 실습</em> · 만들고 싶은 업무 화면 하나로 질문과 답변을 이어갑니다.</p>
<div class="steps">
<div><b>시작</b><span>업무 설명 한 문장과 사용할 샘플 자료를 보냅니다.</span></div>
<div><b>대화</b><span>불명확한 말이 나오면 구체적인 상황과 예시로 답합니다.</span></div>
<div><b>완료</b><span>PRD.md에서 사용자·핵심 기능·제외 범위·완료 조건을 찾습니다.</span></div>
</div>
<p class="thesis">짝에게 묻기 · 이 PRD만 읽고 무엇을 확인하면 완료인지 말할 수 있나요?</p>


<!--
추가 설명이 필요하면 그 설명을 PRD에 반영합니다. 디자인 단계로 넘어가기 전에 한 가지 핵심 사용자 흐름과 기대 결과를 확정합니다.
-->
