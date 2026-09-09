---
class: divider brand-cc-solid
---

<p class="div-no">4-B</p>

## 두 예제에 적용

<p class="div-sub">같은 세 단계로 데이터와 화면, 실제 동작을 확인합니다</p>

---
class: top-led brand-cc
---

<p class="eyebrow">4-B · 예제 1</p>

# 생산실적 분석 흐름

<p class="lead">엑셀의 숫자 뜻부터 <em>역인터뷰로 확정</em>합니다.</p>
<div class="steps">
<div><b>① 역인터뷰 → PRD</b><span>생산량·불량수의 뜻, 계산식, 라인 필터, 빈 값 처리를 결정합니다.</span></div>
<div><b>② 디자인·개발</b><span>대시보드 캡처를 reference에 넣고 두 스킬로 구현합니다.</span></div>
<div><b>③ Playwright MCP</b><span>업로드·필터·오류 안내를 조작하고 기대값과 비교합니다.</span></div>
</div>
<p class="thesis">완료 조건을 통과하면 배포하고, 배포 주소에서도 같은 샘플을 확인합니다.</p>


---
class: top-led brand-cc
---

<p class="eyebrow">4-B · 예제 1 결과</p>

# 예제 1 결과 화면

<p class="lead">첫 화면에서 <em>조치가 필요한 구간</em>을 먼저 보여줍니다.</p>

<figure class="shot hero nochrome" data-origin="capture">
<img src="./images/ex1-crop.png" alt="기존 생산실적 분석 화면" />
<figcaption>기존 완성 화면 · 이번 스킬 조합으로 새로 만든 결과는 아닙니다</figcaption>
</figure>

---
class: top-led brand-cc
---

<p class="eyebrow">4-B · 예제 2</p>

# 수주 레이더 흐름

<p class="lead">수집한 값의 뜻과 <em>판정할 수 없는 경우</em>부터 합의합니다.</p>
<div class="steps">
<div><b>① 역인터뷰 → PRD</b><span>대상 공고·판정 기준·수집 실패와 판단불가 처리를 정합니다.</span></div>
<div><b>② 디자인·개발</b><span>목록 화면 캡처를 reference에 넣고 두 스킬로 구현합니다.</span></div>
<div><b>③ Playwright MCP</b><span>판정 필터·원문 링크·수집 실패 안내를 실제로 조작합니다.</span></div>
</div>
<p class="thesis">원문을 못 읽었으면 부적합으로 바꾸지 않습니다. 판단불가로 남깁니다.</p>


---
class: top-led brand-cc
---

<p class="eyebrow">4-B · 예제 2</p>

# 새 공고 없음과 수집 실패

<p class="lead">빈 목록 두 개라도 <em>사용자가 해야 할 행동은 다릅니다.</em></p>

| 검증 상황 | 기대 결과 |
|---|---|
| 정상 조회, 공고 0건 | 새 공고 없음 |
| 조회 실패 | 수집 실패 안내와 재시도 방법 |
| 원문 조건 확인 불가 | 판단불가 표시와 원문 링크 |

<p class="thesis">Playwright MCP에 각 상황을 재현할 테스트 자료를 주고, 표시 결과를 확인하게 합니다.</p>


<!--
재현 가능한 테스트용 데이터나 테스트 환경을 준비합니다. 실제 외부 사이트 장애가 나기를 기다리지 않습니다. 실제 수집 성공 여부는 수집 로그와 원문도 확인해야 하며 화면 조작만으로 증명하지 않습니다.
-->

---
class: top-led brand-cc
---

<p class="eyebrow">4-B · 예제 2 결과</p>

# 예제 2 결과 화면

<p class="lead"><em>오늘 볼 공고와 원문 확인이 필요한 건</em>을 구분합니다.</p>

<figure class="shot hero nochrome" data-origin="capture">
<img src="./images/ex2-briefing-crop.png" alt="기존 수주 레이더 브리핑 화면" />
<figcaption>기존 완성 화면 · 이번 스킬 조합으로 새로 만든 결과는 아닙니다</figcaption>
</figure>
