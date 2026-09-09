---
theme: default
title: Claude Code 활용 PRD 작성 및 개발
colorSchema: light
routerMode: hash
fonts:
  sans: Pretendard
  mono: IBM Plex Mono
transition: fade
mdc: true
lineNumbers: false
class: cover brand-cc
---

<!--
  대상: 세아그룹 실무자. 엑셀은 능숙, 코드는 처음. Windows.
  시작 상태: 노트북 + Claude 데스크톱 앱(Code 탭). 준비물 없음.
  종료 수행: PRD 를 채우고, 만든 것이 맞는지 확인할 방법을 붙여 배포한다.
  오개념: (1) 한 줄로 되는데 왜 배우나 (2) 에러가 안 나면 잘 된 것

  장표 제목 규칙 — 제목은 라벨(명사구 8~14자), 결론은 본문 첫 줄(.lead).
  서술형 종결과 두 문장 제목은 쓰지 않는다.

  그림 출처 — images/official/* 는 Claude Code 릴리스 노트의 공식 자산
  (영상은 대표 프레임 추출). images/docs/* 는 공식 문서 해당 구간 캡처.
  images/lab/* 는 실습 중 직접 찍은 화면(번호 박스는 annotate-steps.mjs 로 구움).
  scripts/fetch-official.mjs · clip-docs.mjs · annotate-steps.mjs 로 다시 만든다.
-->

<div class="cover-telemetry"><span>세아그룹</span><span>14시간</span></div>
<div class="title-block">
<div class="latin-mark">CLAUDE CODE</div>

# Claude Code 활용<br><em>PRD 작성</em> 및 개발

<p class="cover-sub">계획을 문서로 고정하고, 만든 것이 맞는지 확인하며 개발하는 과정</p>
</div>

---
class: top-led
---

<p class="eyebrow">COURSE · 구성</p>

# 목차

<p class="thesis">다섯 덩어리. 첫 덩어리는 왜, 가운데 둘은 도구, 뒤의 둘은 그 도구로 무엇을 하는가.</p>

<div class="steps tight">
<div><b>0 · AX 사례와 트렌드</b><span>남들은 어디까지 와 있는가</span></div>
<div><b>1 · Claude Code 기초</b><span>화면 · 권한 · 되돌리기 · 일 나누기 · 컴퓨터 제어</span></div>
<div><b>2 · Antigravity 기초</b><span>같은 일을 다른 도구로 시켜 보기</span></div>
<div><b>3 · PRD와 디자인</b><span>역인터뷰로 요구사항 확정 · 스킬과 레퍼런스로 구현</span></div>
<div><b>4 · 검증과 완성</b><span>Playwright MCP로 검증 · 두 예제에 적용 · 배포</span></div>
</div>

<!-- 시간 배분은 구두로. 0부는 30분, 1부가 가장 길다. -->

---
class: divider
---

<p class="div-no">0부</p>

## AX 사례와 트렌드

<p class="div-sub">남들이 무엇을 만들었는지 보고, 지금 도구가 어디까지 왔는지 확인합니다</p>

<p class="div-file">실습 없음 · 30분</p>

---
class: top-led
---

<p class="eyebrow">0부 · AX</p>

# AX란

<p class="lead"><em>AI Transformation</em><br>AI를 활용해 일하는 방식과 제품을 바꾸는 것</p>

| AX 판단 지표 | 확인할 질문 |
|---|---|
| 업무 방식 | 반복 업무를 AI가 맡고, 사람은 판단에 집중하는가? |
| 의사결정 | 감이 아닌 데이터를 기반으로 결정하는가? |
| 제품 설계 | 단순 기능 추가가 아니라 제품의 핵심 흐름에 AI가 들어갔는가? |

---
class: top-led
---

<p class="eyebrow">0부 · AX</p>

# 예시: 단순 AI 도입과 AX 비교

<div class="vs">
<div class="pane">
<h3>단순 도입</h3>
<p>고객 문의에 챗봇을 답니다. 응대 창구가 하나 늘고, 나머지 일은 그대로입니다.</p>
</div>
<i class="vs-badge">vs</i>
<div class="pane">
<h3>AX</h3>
<p>고객 데이터로 이탈 모델을 만들고, 그 결과가 <em>CS 우선순위와 마케팅 설계까지</em> 바꿉니다.</p>
</div>
</div>

<p class="thesis">판별법은 하나입니다. <em>일하는 순서가 바뀌었는가</em>.</p>

---
class: top-led compact
---

<p class="eyebrow">0부 · 사례</p>

# 삼성의 결정

<div class="split evidence">
<div>

<p class="lead">사내에서 막아 두었던 도구를 <em>임직원 전체에 열었습니다</em>.</p>

<div class="deflist">
<div><b>연 도구</b><span>챗GPT · 제미나이 · 클로드 세 가지 모두</span></div>
<div><b>고른 방식</b><span>임직원 2,500명이 후보를 써 보고 골랐습니다</span></div>
<div><b>적용 범위</b><span>개발·마케팅뿐 아니라 제조·구매까지 전 업무</span></div>
</div>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://news.samsung.com/kr/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90-%EC%99%B8%EB%B6%80-%EC%83%9D%EC%84%B1%ED%98%95-ai-%EB%8F%84%EC%9E%85%EC%9C%BC%EB%A1%9C-ax-%EB%B3%B8%EA%B2%A9%ED%99%94">
<img src="./images/trend/samsung.png" alt="삼성 뉴스룸 기사 본문. 제목은 삼성전자, 외부 생성형 AI 도입으로 AX 본격화. 2026년 6월 11일. DX부문 임직원이 챗GPT, 제미나이, 클로드를 모두 쓸 수 있게 되며, 임직원 2,500여 명이 후보 서비스를 검증해 3종을 골랐다는 내용" />
<figcaption>2026-06-11 · <a href="https://news.samsung.com/kr/%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90-%EC%99%B8%EB%B6%80-%EC%83%9D%EC%84%B1%ED%98%95-ai-%EB%8F%84%EC%9E%85%EC%9C%BC%EB%A1%9C-ax-%EB%B3%B8%EA%B2%A9%ED%99%94"><code>삼성 뉴스룸</code></a></figcaption>
</figure>
</div>

<p class="thesis">한 회사가 도구 하나를 정해 주지 않고 <em>일마다 골라 쓰게</em> 했다는 점이 이 수업의 전제와 같습니다.</p>

<p class="src">출처 — 삼성 뉴스룸 2026-06-11 「삼성전자, 외부 생성형 AI 도입으로 AX 본격화」</p>

---
class: top-led embed-page
---

<p class="eyebrow">0부 · 사례</p>

# 현대차그룹 발표회

<p class="lead">한 그룹이 현장 여섯 곳에 <em>무엇을 만들었는지</em> 발표한 영상입니다. 성과 숫자는 보지 않습니다.</p>

<figure class="embed">
<Youtube id="5WFbSPFbTPA?start=1889" />
<figcaption>현대자동차그룹 「AX 성과 발표회 — Beyond AI, Transforming the Way We Work」 · 31:29 부터 6개 사례</figcaption>
</figure>

<p class="src">출처 — 현대자동차그룹 공식 채널 · 수업에서는 31:29~45:30 구간을 봅니다 · 다음 여섯 장은 이 영상의 화면입니다</p>

---
class: top-led compact
---

<p class="eyebrow">0부 · 현대차 사례 1</p>

# 충돌안전 AI 어시스턴트

<div class="split evidence">
<div>

<p class="lead">수십 년치 충돌 시험 리포트·해석 데이터·고속 영상이 <em>흩어져 있어</em> 찾는 데 시간이 갔습니다.</p>

<div class="deflist">
<div><b>만든 것</b><span>질문하면 관련 보고서와 근거를 찾아 답하는 검색·질의 도구</span></div>
<div><b>읽는 것</b><span>글·표·그래프·시험 이미지를 한 번에</span></div>
<div><b>쓰는 사람</b><span>연구개발 엔지니어</span></div>
</div>

</div>
<figure class="shot nochrome" data-origin="capture">
<img src="./images/trend/hyundai/crash.png" alt="충돌안전 데이터 통합 플랫폼 화면. 어시스턴트, 시험 이미지 검색, 시험 이미지 보정, 시험결과, 사례분석보고서, 프로토콜 같은 탭이 있고, 자막에 시험 노하우나 시험 결과, 이미지 등을 한곳에서 검색할 수 있다고 적혀 있다" />
<figcaption>발표 영상 속 실제 화면 · 「시험 노하우·결과·이미지를 한곳에서 검색」</figcaption>
</figure>
</div>

<p class="src">출처 — 현대자동차그룹 AX 성과 발표회 · 연구개발 부문</p>

---
class: top-led compact
---

<p class="eyebrow">0부 · 현대차 사례 2</p>

# 차량 식별번호 자동 인식

<div class="split evidence">
<div>

<p class="lead">조립 라인에 차가 들어올 때 식별번호와 사양이 맞는지 <em>사람이 일일이 대조</em>하느라 라인이 섰습니다.</p>

<div class="deflist">
<div><b>만든 것</b><span>카메라 이미지에서 식별번호를 읽어 시스템 정보와 맞춰 보는 검사</span></div>
<div><b>퍼진 곳</b><span>전 세계 약 70개 공장</span></div>
<div><b>쓰는 사람</b><span>제조 생산 현장</span></div>
</div>

</div>
<figure class="shot nochrome" data-origin="capture">
<img src="./images/trend/hyundai/vin.png" alt="VIN AI 모델 분석 대시보드 화면. 추론 데모 탭에서 여러 모델 버전을 골라 차량 이미지를 올리고 인식 결과를 비교한다. 자막에 AI가 그 이미지를 분석해서 실제 차량 정보와 대조한다고 적혀 있다" />
<figcaption>발표 영상 속 실제 화면 · 모델 버전별 인식 결과 비교</figcaption>
</figure>
</div>

<p class="src">출처 — 현대자동차그룹 AX 성과 발표회 · 제조 생산 부문</p>

---
class: top-led compact
---

<p class="eyebrow">0부 · 현대차 사례 3</p>

# 대차 정렬 최적화

<div class="split evidence">
<div>

<p class="lead">프레스·차체 공정에서 수백 종의 운반 대차가 오가는 동선이 얽혀 <em>병목</em>이 생겼습니다.</p>

<div class="deflist">
<div><b>만든 것</b><span>대차 이동 순서와 적재 위치를 시뮬레이션으로 다시 짜는 계산</span></div>
<div><b>방식</b><span>강화학습 + 수리 최적화</span></div>
<div><b>쓰는 사람</b><span>제조 물류 담당</span></div>
</div>

</div>
<figure class="shot nochrome" data-origin="capture">
<img src="./images/trend/hyundai/carrier.png" alt="담당자가 모니터의 학습 그래프를 보고 있는 화면. 지표와 보상 값이 반복 학습에 따라 수렴하는 곡선이 여러 개 그려져 있고, 자막에 일정하게 최적의 결과를 낼 수 있게 됐다고 적혀 있다" />
<figcaption>발표 영상 속 실제 화면 · 학습이 안정되는 곡선</figcaption>
</figure>
</div>

<p class="src">출처 — 현대자동차그룹 AX 성과 발표회 · 제조 물류 부문</p>

---
class: top-led compact
---

<p class="eyebrow">0부 · 현대차 사례 4</p>

# E-FOREST: POLARIS

<div class="split evidence">
<div>

<p class="lead">현장 엔지니어가 공정마다 필요한 AI 도구를 <em>개발자 없이</em> 만들기 어려웠습니다.</p>

<div class="deflist">
<div><b>만든 것</b><span>현장 사람이 코딩 없이 업무용 에이전트를 만들고 나누는 공간</span></div>
<div><b>지금 상태</b><span>비전 검사·제조 문서·보전 관리 에이전트가 이미 돌고 있음</span></div>
<div><b>계획</b><span>울산 전기차 신공장부터 2027년까지 전 공장</span></div>
</div>

</div>
<figure class="shot nochrome" data-origin="capture">
<img src="./images/trend/hyundai/polaris.png" alt="E-FOREST POLARIS 의 에이전트 웍스 화면. 비전 검사 AGENT, 제조 문서 AGENT, 보전 관리 AGENT, 제조 품질 관리 AGENT 같은 워크스페이스 카드가 나열되어 있고 각각 에이전트·컬렉션·문서 개수가 적혀 있다" />
<figcaption>발표 영상 속 실제 화면 · 이 수업이 하려는 것과 가장 가깝습니다</figcaption>
</figure>
</div>

<p class="src">출처 — 현대자동차그룹 AX 성과 발표회 · 스마트팩토리 부문</p>

---
class: top-led compact
---

<p class="eyebrow">0부 · 현대차 사례 5</p>

# AI 정비 지원

<div class="split evidence">
<div>

<p class="lead">전동화로 고장 코드가 복잡해져 정비사의 진단이 어려워지고 <em>고객 대기</em>가 길어졌습니다.</p>

<div class="deflist">
<div><b>만든 것</b><span>정비 이력·센서 데이터·정비 매뉴얼을 읽고 원인을 좁혀 주는 도우미</span></div>
<div><b>범위</b><span>전 세계 판매 차량 · 38개 언어</span></div>
<div><b>쓰는 사람</b><span>서비스 센터 정비사</span></div>
</div>

</div>
<figure class="shot nochrome" data-origin="capture">
<img src="./images/trend/hyundai/technician.png" alt="AI Agent for Technician 상세 분석 리포트 화면. 분석 세션 4,869건, 평균 품질 점수 4.38, 지원 언어 38개, 이슈 탐지 세션 1,078건, 멀티턴 비율 31퍼센트가 표시된다" />
<figcaption>발표 영상 속 실제 화면 · 정비사 질문 세션을 모아 본 리포트</figcaption>
</figure>
</div>

<p class="src">출처 — 현대자동차그룹 AX 성과 발표회 · 서비스 부문</p>

---
class: top-led compact
---

<p class="eyebrow">0부 · 현대차 사례 6</p>

# 앱 리뷰 대응 자동화

<div class="split evidence">
<div>

<p class="lead">전 세계 앱 마켓에 달마다 수천 건씩 쌓이는 리뷰를 <em>사람이 읽고 분류</em>하는 데 한계가 왔습니다.</p>

<div class="deflist">
<div><b>만든 것</b><span>다국어 리뷰를 감성·기능별로 나누고 개선 요청을 담당 부서로 보내는 처리</span></div>
<div><b>사람의 몫</b><span>AI 가 쓴 답변 초안을 승인하거나 고쳐서 내보내기</span></div>
<div><b>쓰는 사람</b><span>고객 경험 · 앱 운영 담당</span></div>
</div>

</div>
<figure class="shot nochrome" data-origin="capture">
<img src="./images/trend/hyundai/review.png" alt="HMG Review Admin 화면. 리뷰마다 브랜드·분류·조치·AI 가 만든 답변이 한 줄씩 나열되어 있고, 한국어와 스페인어 답변이 섞여 있다. 자막에 고객 리뷰를 자동으로 분석해서 분류한다고 적혀 있다" />
<figcaption>발표 영상 속 실제 화면 · 답변 초안을 사람이 승인하는 관리 화면</figcaption>
</figure>
</div>

<p class="src">출처 — 현대자동차그룹 AX 성과 발표회 · 고객 경험 부문</p>

---
class: top-led band-page
---

<p class="eyebrow">0부 · 트렌드</p>

# GPT-6 Astra

<p class="lead">발표문 첫 줄이 포지셔닝 전부입니다. <em>컴퓨터로 하는 일</em>을 대신하겠다는 것.</p>

<figure class="shot band nochrome" data-origin="web" data-source="https://community.openai.com/t/introducing-gpt-6-astra-the-most-intelligent-and-aligned-model-in-the-world/1394703">
<img src="./images/trend/astra.png" alt="OpenAI 개발자 커뮤니티의 공지 글. 제목은 Introducing GPT-6-Astra: The most intelligent and aligned model in the world 이고, 본문 첫 줄은 Anything you can do on a computer, Astra can do for you. Fast. 이다" />
<figcaption>OpenAI 공지 · 2026-09-03 · <a href="https://community.openai.com/t/introducing-gpt-6-astra-the-most-intelligent-and-aligned-model-in-the-world/1394703"><code>community.openai.com</code></a></figcaption>
</figure>

<p class="thesis">잘한다고 내세운 일은 <em>컴퓨터 조작 · 브라우징 · 소프트웨어 엔지니어링</em>입니다. 배포는 단계적이고, 사이버보안 심사를 통과한 곳부터 열었습니다.</p>

---
class: top-led band-page
---

<p class="eyebrow">0부 · 트렌드</p>

# Claude Fable 5.1

<p class="lead">이틀 먼저 나왔습니다. 내세운 용도는 <em>코딩 · 지식 업무 · 오래 걸리는 일</em>입니다.</p>

<figure class="shot band nochrome" data-origin="web" data-source="https://www.anthropic.com/claude-fable-and-mythos-5-1">
<img src="./images/trend/fable.png" alt="Anthropic 발표 페이지의 첫 화면. SEPTEMBER 2026 아래에 Claude Fable 5.1 and Mythos 5.1 이라는 제목이 있다" />
<figcaption>Anthropic 발표 · 2026-09-01 · <a href="https://www.anthropic.com/claude-fable-and-mythos-5-1"><code>anthropic.com</code></a></figcaption>
</figure>

<p class="thesis">같은 모델을 <em>이름 둘로 갈라</em> 냈습니다. Fable 5.1 은 누구나, Mythos 5.1 은 심사를 거친 조직만.</p>

---
class: top-led compact
---

<p class="eyebrow">0부 · 트렌드</p>

# 갈리는 지점

<p class="lead">값도 같고 둘 다 「최고」라고 합니다. 갈리는 건 <em>여는 방식</em>입니다.</p>

| | GPT-6 Astra | Claude Fable 5.1 |
|---|---|---|
| 값 (입력/출력, 1M) | $10 / $50 | $10 / $50 |
| 내세운 용도 | 컴퓨터 조작 · 브라우징 | 코딩 · 장시간 작업 |
| 여는 방식 | 한 모델을 단계적으로 개방 | 두 이름으로 나눠 권한 분리 |
| 값 변화 | — | 캐시 읽기 75% 인하 |

<p class="thesis">능력 차이보다 <em>이 줄</em>이 실무에 먼저 옵니다 — 오래 도는 작업일수록 캐시 값이 총액을 좌우합니다.</p>

<p class="src">출처 — OpenAI 공지 2026-09-03 · Anthropic 발표 2026-09-01</p>

---
class: top-led
---

<p class="eyebrow">0부 · 트렌드</p>

# 써 본 사람의 말

<p class="lead">발표문 말고 <em>같은 일을 시켜 본</em> 기록을 봅니다.</p>

<div class="embed-row">
<figure class="embed">
<Youtube id="JfwC02MnN14" />
<figcaption>코드팩토리 · 똑같은 작업 시켜봤습니다</figcaption>
</figure>
<figure class="embed">
<Youtube id="rCl_DAxP2cI" />
<figcaption>코드팩토리 · Computer Use 맞다이</figcaption>
</figure>
</div>

<p class="thesis">갈린 지점은 둘입니다. <em>Astra 는 속도</em>, <em>Fable 은 한 번에 맞히는 정도와 의도 파악</em>.</p>

---
class: top-led compact
---

<p class="eyebrow">0부 · 트렌드</p>

# Astra 에 대한 반응

<div class="split evidence">
<div>

<p class="lead">발표문·리뷰 영상 다음은 <em>Threads 에 올라온 후기</em>입니다.</p>

<div class="deflist">
<div><b>속도와 사용량</b><span>「Ultra 를 1시간 돌렸는데 2% 소모, 버그인가 싶을 만큼 적다」</span></div>
<div><b>구독 고민</b><span>「사용량이 바닥나 Sol 로 돌아왔다 — Pro 로 올려야 하나」</span></div>
<div><b>평가 방식</b><span>「벤치마크보다 실제 테스트로 편향을 확인한다」</span></div>
</div>

</div>
<figure class="shot nochrome" data-origin="capture">
<img src="./images/trend/threads/astra-2.png" alt="Threads 게시물. 작성자가 GPT-6 Astra가 꽤 잘한다는 반응과 함께 공식 문서를 읽고 벤치마크보다 실제 테스트로 편향을 확인한다고 적었고, 게시물에는 좋아요 72개가 표시되어 있다" />
<figcaption>Threads 「GPT-6 Astra」 사용 후기 · 2026-09-08 · Aside CLI 로 캡처</figcaption>
</figure>
</div>

<p class="thesis">셋 다 같은 이야기입니다. <em>점수표보다 내 일에 돌려 본 결과</em>가 판단 근거가 됩니다.</p>

<p class="src">근거 — Threads 공개 게시물 (samsaekzipsa · tahooki · specal1849 · _appcellent_) · 2026-09-06~08</p>

---
class: top-led band-page
---

<p class="eyebrow">0부 · 트렌드</p>

# Aside 열풍

<p class="lead">한국인 셋이 만든 브라우저가 X 와 Threads 에서 <em>화제 토픽에 올랐습니다</em>.</p>

<figure class="shot band nochrome" data-origin="web" data-source="https://aside.com/">
<img src="./images/trend/aside.png" alt="Aside 공식 사이트 첫 화면. Backed by Y Combinator 배지 아래에 The most intelligent AI assistant, but it's a browser. 라는 한 문장과 Download 버튼이 있다" />
<figcaption>공식 사이트 · <a href="https://aside.com/"><code>aside.com</code></a></figcaption>
</figure>

<p class="thesis">한 문장이 전부입니다 — <em>「가장 똑똑한 AI 비서인데, 브라우저다」</em>. 내 ChatGPT·클로드 구독을 그대로 연결해 씁니다. 지금은 macOS 만 되고, <em class="warn">Windows 는 비공개 베타</em>를 돌리는 중입니다.</p>

---
class: top-led
---

<p class="eyebrow">0부 · 트렌드</p>

# 코드 에이전트와 다른 점

<p class="lead">둘 다 대신 일해 주는데 <em>손대는 곳</em>이 다릅니다.</p>

<div class="vs">
<div class="pane">
<h3>코드 에이전트</h3>
<p>내 컴퓨터의 <em>파일과 명령</em>을 다룹니다. 남는 것은 코드와 문서. 바깥 서비스는 MCP 로 따로 연결합니다.</p>
</div>
<i class="vs-badge">vs</i>
<div class="pane">
<h3>브라우저 에이전트</h3>
<p><em>로그인해 둔 웹 서비스</em>를 사람처럼 다룹니다. 남는 것은 처리된 업무. 연동 없이 화면을 그대로 씁니다.</p>
</div>
</div>

<p class="thesis">1부에서 볼 브라우저 패널·컴퓨터 제어가 <em>같은 갈래</em>입니다. Claude Code 는 둘을 한 앱에 넣어 두었습니다.</p>

---
class: top-led
---

<p class="eyebrow">0부 · 트렌드</p>

# Aside 에 대한 반응

<p class="lead">써 본 사람의 말과 만든 사람의 말이 <em>같은 검색 결과</em>에 나란히 있습니다.</p>

<div class="shot-row">
<figure class="shot nochrome" data-origin="capture">
<img src="./images/trend/threads/aside-review.png" alt="Threads 에서 Aside 브라우저를 검색한 결과. 한 달 써 보니 브라우저 자동화 중 최강이라는 후기, 탭 10개를 열면 메모리 50GB 를 먹는다는 불평과 다음 버전에 패치된다는 답글, 어떻게 쓰는지 궁금하다는 질문이 이어진다" />
<figcaption>써 본 사람 — 「자동화 중 최강」 · 「메모리 50GB」 → 「다음 버전에 패치」</figcaption>
</figure>
<figure class="shot nochrome" data-origin="capture">
<img src="./images/trend/threads/aside-windows.png" alt="Aside 팀의 Threads 게시물. 어제부터 Windows 버전의 프라이빗 베타 롤아웃을 시작했고, 신청자가 전 세계 수만 명이라 천천히 내보내는 중이며 Windows 는 하드웨어와 환경이 제각각이라 더 조심스럽다고 적었다" />
<figcaption>만든 사람 — 「Windows 프라이빗 베타 롤아웃 시작」</figcaption>
</figure>
</div>

<p class="src">근거 — Threads 공개 게시물 (yun_ja_dong · nerdboard.official · hiddenest · sanghun_lee1344) · 2026-09-08 · Aside CLI 로 캡처</p>

---
class: top-led band-page
---

<p class="eyebrow">0부 · 트렌드</p>

# 순위표에 붙은 의문

<p class="lead">Artificial Analysis 는 여러 벤치마크를 모아 순위를 매기는 사이트입니다. <em>기사와 발표문이 자주 인용</em>합니다.</p>

<figure class="shot band nochrome" data-origin="web" data-source="https://artificialanalysis.ai/">
<img src="./images/trend/aa-chart.png" alt="Artificial Analysis 첫 화면의 세 막대그래프. 지능 지수에서 Claude Fable 5.1 이 57, GPT-6 Astra 가 55, Claude Opus 5 가 54 로 나란히 있고 그 옆에 속도와 과제당 비용 그래프가 있다" />
<figcaption>2026-09-07 기준 · <a href="https://artificialanalysis.ai/"><code>artificialanalysis.ai</code></a></figcaption>
</figure>

<p class="thesis">Astra 가 나온 직후 이 지수는 Astra 를 <em>전작 GPT-5.6 Sol · Grok 4.6 과 같은 급</em>에, Fable 5.1 보다 아래에 두었습니다. 써 본 사람들의 체감과 달라 점수 자체에 의문이 붙었습니다.</p>

---
class: top-led compact
---

<p class="eyebrow">0부 · 트렌드</p>

# 지표 개편의 배경

<div class="split evidence">
<div>

<p class="lead">의문이 커지자 사이트는 <em>지수 구성을 바꿨습니다</em>. 그래도 남는 한계가 있습니다.</p>

<div class="deflist">
<div><b>어긋난 폭</b><span>같은 과제를 ARC Prize 가 채점하면 62.7%, 발표 수치는 99.9%</span></div>
<div><b>바꾼 것</b><span>문항 교체 · 비공개 문항 비중 확대 · 가중치 조정</span></div>
<div><b>남는 한계</b><span>공개된 문항은 정답을 <em class="warn">학습해 버릴 수 있습니다</em></span></div>
</div>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://artificialanalysis.ai/">
<img src="./images/trend/aa-index.png" alt="Artificial Analysis 첫 화면의 공지. Intelligence Index v4.2 가 새 문항을 더하고 일부 문항을 빼고 가중치를 다시 잡았다고 적혀 있다" />
<figcaption>개편 공지 · <a href="https://artificialanalysis.ai/"><code>artificialanalysis.ai</code></a></figcaption>
</figure>
</div>

<p class="thesis">순위표는 <em>후보를 좁히는 데까지</em>만 씁니다. 고르는 건 내 일로 직접 돌려 보고 정합니다.</p>

<p class="src">근거 — ARC Prize 채점 62.7% 대 발표 수치 99.9% · Intelligence Index v4.2 개편 공지</p>

---
class: top-led band-page
---

<p class="eyebrow">0부 · 트렌드</p>

# 같은 일에 드는 토큰

<p class="lead">세로는 점수, 가로는 <em>과제 하나에 쓴 출력 토큰</em>입니다. 점수는 비슷한데 토큰은 세 배 가까이 차이 납니다.</p>

<figure class="shot band nochrome" data-origin="web" data-source="https://artificialanalysis.ai/models">
<img src="./images/trend/aa-scatter.png" alt="Artificial Analysis 산점도. 세로축은 지능 지수, 가로축은 과제당 출력 토큰의 로그 눈금. GPT-6 Astra 는 약 2만 7천 토큰에 52점 부근, Claude Fable 5.1 은 약 7만 8천 토큰에 53점 부근에 찍혀 있다. 왼쪽 위 초록 영역이 가장 유리한 사분면으로 표시되어 있다" />
<figcaption>2026-09 · <a href="https://artificialanalysis.ai/models"><code>artificialanalysis.ai/models</code></a> · 가로축은 로그 눈금</figcaption>
</figure>

<p class="thesis">Astra 는 과제당 약 2.7만, Fable 5.1 은 약 7.8만 토큰입니다. 값이 같으니 <em>같은 일을 Astra 가 훨씬 싸게</em> 끝냅니다 — Threads 에 「Ultra 를 1시간 돌렸는데 2%」 후기가 올라온 이유입니다.</p>

---
class: top-led
---

<p class="eyebrow">0부 · 정리</p>

# 이 수업에서 만드는 것

<p class="lead">현대차 여섯 사례는 결국 두 종류입니다. <em>흩어진 자료를 모아 읽는 것</em>과 <em>사람이 매번 대조하던 일을 대신하는 것</em>. 이 수업에서 그 둘을 하나씩 만듭니다.</p>

<div class="deflist">
<div><b>모아 읽기</b><span>예제 1 — 엑셀을 올리면 볼 곳을 짚어 주는 화면. 충돌안전 어시스턴트와 같은 종류</span></div>
<div><b>대신 대조하기</b><span>예제 2 — 공고를 훑어 조건에 맞는 것만 골라내는 화면. 차량 식별번호 인식과 같은 종류</span></div>
</div>

<p class="thesis">현대차와 다른 건 <em>규모와 데이터의 양</em>뿐입니다. 만드는 순서는 같습니다.</p>

<!-- 여기서 "우리 팀에서 이 두 종류에 해당하는 일"을 한 명씩 말하게 하고 1부로 넘어간다. -->

---
class: top-led
---

<p class="eyebrow">COURSE · 결과물</p>

# 오늘의 결과물

<p class="lead">이틀 뒤 <em>주소 두 개</em>와 저장소 하나가 남습니다.</p>

<div class="split">
<figure class="shot" data-origin="capture">
<img src="./images/ex1-crop.png" alt="생산실적 분석 화면. 맨 위에 조치가 필요한 구간이 4건 있다는 결론 문장이 있다" />
<figcaption>엑셀을 올리면 볼 곳을 짚어줍니다</figcaption>
</figure>
<figure class="shot" data-origin="capture">
<img src="./images/ex2-briefing-crop.png" alt="수주 레이더 브리핑 화면. 신규 20건이 가장 크게 표시되어 있다" />
<figcaption>공고를 매일 훑어 골라냅니다</figcaption>
</figure>
</div>

<!-- 지금 실제로 열어보게 한다. 막연함을 없애는 게 첫 과제다. -->

---
class: top-led compact
---

<p class="eyebrow">COURSE · 시작 전</p>

# 준비물 3가지

<p class="lead">Windows 에서 필요한 건 <em>셋뿐</em>입니다. WSL 도 Node.js 도 필요 없습니다.</p>

<div class="steps tight">
<div><b>Claude 데스크톱 앱</b><span>Windows x64 또는 ARM64</span></div>
<div><b>Git for Windows</b><span>설치한 뒤 <em class="warn">앱을 다시 켜야</em> 합니다</span></div>
<div><b>유료 플랜 로그인</b><span>Pro · Max · Team · Enterprise</span></div>
</div>

<div class="callout"><b>Git 이 없으면 Code 탭이 안 열립니다</b> 앱이 세션마다 폴더를 따로 떼어 쓰는데 그 일을 <code>git</code> 이 합니다. 첫 시간 사고의 1번 원인입니다.</div>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · Work in parallel with sessions」 · 「Desktop quickstart」</p>

---
class: divider brand-cc-solid
---

<p class="div-no">1부</p>

## Claude Code 기초

<p class="div-sub">화면 · 권한 · 되돌리기 · 일 나누기 · 컴퓨터 제어</p>

<p class="div-file">실습 3회</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-A · 개요</p>

# Claude Code란

<p class="lead">코드를 읽고, 파일을 고치고, <em>명령까지 실행</em>합니다.</p>

<figure class="shot strip" data-origin="web" data-source="https://code.claude.com/docs/en/overview">
<img src="./images/docs/cc-intro.png" alt="Claude Code 공식 문서 개요. 코드베이스를 읽고 파일을 수정하고 명령을 실행하며 개발 도구와 연동한다고 적혀 있다" />
<figcaption>공식 문서 첫 문단 · <a href="https://code.claude.com/docs/en/overview"><code>docs/en/overview</code></a></figcaption>
</figure>

<p class="thesis">세 번째 「명령까지 실행」이 다른 도구와 갈리는 지점입니다. 답을 주는 게 아니라 <em>직접 해 봅니다</em>.</p>

<p class="src">출처 — Claude Code 공식 문서 「Overview」 code.claude.com/docs/en/overview</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-A · 개요</p>

# 일하는 3단계

<p class="lead">시킬 때마다 <em>맥락 수집 → 실행 → 검증</em>을 돕니다. 한 바퀴로 안 끝나면 다시 돕니다.</p>

<figure class="shot band nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/how-claude-code-works#the-agentic-loop">
<img src="./images/docs/agentic-loop.png" alt="공식 도해. 내 지시에서 시작해 맥락 수집·실행·검증 세 단계를 돌고, 아래에서 사람이 언제든 끼어들어 방향을 바꿀 수 있다고 그려져 있다" />
<figcaption>공식 도해 · <a href="https://code.claude.com/docs/en/how-claude-code-works#the-agentic-loop"><code>how-claude-code-works#the-agentic-loop</code></a></figcaption>
</figure>

<p class="thesis">왼쪽 아래 점선이 <em>나</em>입니다. 돌아가는 중에 아무 지점에서나 끊고 방향을 바꿀 수 있습니다.</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-A · 범위</p>

# 할 수 있는 일 4가지

<div class="split evidence">
<div>

<p class="lead">문서는 아홉 가지를 듭니다. 이 수업에서 실제로 쓰는 건 <em>넷</em>입니다.</p>

<div class="deflist">
<div><b>기능·버그</b><span>기능을 만들고 버그를 고칩니다</span></div>
<div><b>지침·스킬·훅</b><span>내 방식대로 동작하게 맞춥니다</span></div>
<div><b>도구 연결</b><span>MCP 로 바깥 도구를 붙입니다</span></div>
<div><b>병렬 실행</b><span>여러 에이전트를 동시에 굴립니다</span></div>
</div>

</div>
<figure class="shot" data-origin="web" data-source="https://code.claude.com/docs/en/overview#what-you-can-do">
<img src="./images/docs/what-you-can-do.png" alt="공식 문서의 할 수 있는 일 목록 아홉 가지" />
<figcaption>원문 아홉 항목 · <a href="https://code.claude.com/docs/en/overview#what-you-can-do"><code>overview#what-you-can-do</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Overview · What you can do」</p>

---
class: divider brand-cc-solid
---

<p class="div-no">실습 1</p>

## Claude Code 사용해보기

<p class="div-sub">설명을 더 듣기 전에, 다섯 가지를 직접 물어봅니다</p>

<p class="div-file">1-1 능력 · 1-2 꼬리 질문 · 1-3 사이드 채팅 · 1-4 검색 · 1-5 아티팩트</p>

---
class: top-led brand-cc lab-page
---

<p class="eyebrow">실습 1-1 · 능력 물어보기</p>

# 첫 질문

<div class="split evidence">
<div>

<p class="lead">「Claude Code는 뭘 할 수 있어?」 <em>이 한 줄</em>로 시작합니다.</p>

<div class="deflist">
<div><b>①</b><span>질문은 이 한 줄이 전부입니다</span></div>
<div><b>②</b><span>일반론이 아니라 <em>「지금 이 세션 기준으로」</em> 답합니다. 폴더·설정·붙어 있는 도구를 보고 말합니다</span></div>
</div>

<p class="thesis">코드 작업 · 실행 환경 · 확장 · 산출물 네 묶음으로 나옵니다.</p>

</div>
<figure class="shot nochrome" data-origin="capture">
<img src="./images/lab/q1-annot.png" alt="첫 질문에 대한 답. 코드 작업과 실행 환경 항목이 목록으로 나열되어 있다" />
<figcaption>실습 화면 · 번호는 아래 설명과 짝</figcaption>
</figure>
</div>

---
class: top-led brand-cc lab-page
---

<p class="eyebrow">실습 1-2 · 꼬리 질문</p>

# 모르는 말이 나왔을 때

<div class="split evidence">
<div>

<p class="lead">답 안에 모르는 단어가 나오면 <em>거기서 다시 묻습니다</em>. 새 대화를 열지 않습니다.</p>

<div class="deflist">
<div><b>물어본 것</b><span>「<code>/schedule</code> 이랑 <code>/loop</code> 이랑 뭐가 달라?」</span></div>
<div><b>돌아온 것</b><span>실행 주체 · 지속성 · 컨텍스트 · 주기 · 용도 다섯 줄 비교표</span></div>
</div>

<p class="thesis">비교표를 <em>달라고 하지 않았는데</em> 비교표로 왔습니다. 무엇이 헷갈리는지 알아채면 형식을 맞춰 옵니다.</p>

</div>
<figure class="shot nochrome" data-origin="capture">
<img src="./images/lab/q2-annot.png" alt="한 번에 두 가지를 물은 화면. cron 과 loop 를 다섯 항목으로 비교한 표가 오고, 아래에 아티팩트 공유 링크 설명이 이어진다" />
<figcaption>실습 화면</figcaption>
</figure>
</div>

---
class: top-led brand-cc lab-page
---

<p class="eyebrow">실습 1-3 · 사이드 채팅</p>

# 옆에서 따로 묻기

<div class="split evidence">
<div>

<p class="lead">본 대화를 흐트리지 않고 <em>궁금한 것만</em> 따로 묻습니다.</p>

<div class="deflist">
<div><b>①</b><span>답 위에서 궁금한 부분을 마우스로 끕니다</span></div>
<div><b>②</b><span>뜨는 메뉴에서 <em>「사이드 채팅으로 보내기」</em></span></div>
</div>

<p class="thesis">단축키는 <code>Ctrl ;</code>, 입력창에 <code>/btw</code> 를 쳐도 열립니다. 본 대화의 맥락은 쓰되, 오간 말은 본 대화에 안 쌓입니다.</p>

</div>
<figure class="shot nochrome" data-origin="capture">
<img src="./images/lab/q3-menu-annot.png" alt="답 위에서 문장을 드래그하자 사이드 채팅으로 보내기와 답글 메뉴가 뜬 화면" />
<figcaption>실습 화면 · 끌면 메뉴가 뜹니다</figcaption>
</figure>
</div>

---
class: top-led brand-cc lab-page
---

<p class="eyebrow">실습 1-3 · 사이드 채팅</p>

# 열린 모습

<div class="split evidence">
<div>

<p class="lead">답이 <em>오른쪽 패널에만</em> 쌓입니다.</p>

<div class="deflist">
<div><b>물어본 것</b><span>「배포랑 CI가 뭐야?」 — 본 주제와 상관없는 질문</span></div>
<div><b>안 벌어진 것</b><span>본 대화는 그대로입니다. 다시 돌아가면 하던 이야기가 이어집니다</span></div>
</div>

<p class="thesis">모르는 걸 묻느라 <em>본 작업이 옆길로 새는 것</em>을 막는 장치입니다.</p>

</div>
<figure class="shot nochrome mark-ok" data-origin="capture">
<img src="./images/lab/q3-chat-annot.png" alt="본 대화가 왼쪽에 그대로 있고, 오른쪽에 사이드 채팅 패널이 따로 열려 배포와 CI 를 설명하고 있다" />
<figcaption>실습 화면 · 오른쪽 패널</figcaption>
</figure>
</div>

---
class: top-led brand-cc lab-page
---

<p class="eyebrow">실습 1-4 · 검색 시키기</p>

# 확실치 않다고 할 때

<div class="split evidence">
<div>

<p class="lead">「확실치 않다」는 답이 오면 <em>찾아보라고 시킵니다</em>.</p>

<div class="deflist">
<div><b>①</b><span>웹을 두 번 검색하고</span></div>
<div><b>②</b><span>공식 문서 두 건을 <em>직접 열어</em> 확인합니다</span></div>
</div>

<p class="thesis">추측으로 채우는 대신 근거를 가져오게 만드는 게 요령입니다. 결과는 플랜별 공유 조건 표로 왔습니다.</p>

</div>
<figure class="shot nochrome mark-ok" data-origin="capture">
<img src="./images/lab/q4-annot.png" alt="웹 검색 두 건과 공식 문서 두 건을 가져온 도구 호출 목록" />
<figcaption>실습 화면 · 검색과 문서 열람 기록</figcaption>
</figure>
</div>

---
class: top-led brand-cc lab-page
---

<p class="eyebrow">실습 1-5 · 아티팩트</p>

# 대화를 웹페이지로

<div class="split evidence">
<div>

<p class="lead">지금까지 오간 대화를 <em>한 장의 웹페이지</em>로 만듭니다.</p>

<div class="deflist">
<div><b>①</b><span>「지금까지 대화내역을 정리해서 아티팩트로 만들어줘」</span></div>
<div><b>②</b><span><code>claude-code-qa.html</code> 이 생기고 「Claude Code 세션 문답」으로 발행됩니다</span></div>
</div>

<p class="thesis">기본은 비공개입니다. 남에게 보여주려면 오른쪽 위 <em>Share</em>. 다만 <em class="warn">회사 계정이면 관리자가 켜 둬야</em> 발행됩니다 — 안 켜져 있으면 파일만 만들고 끝납니다.</p>

</div>
<figure class="shot nochrome mark-ok" data-origin="capture">
<img src="./images/lab/q5-annot.png" alt="아티팩트를 만들라는 지시와 발행된 세션 문답 링크" />
<figcaption>실습 화면 · 발행 결과</figcaption>
</figure>
</div>

<p class="src">참고 — Claude Code 공식 문서 「Share session output as artifacts」 docs/en/artifacts</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-A · 실행 환경</p>

# 실행 환경 4종

<p class="lead">어디서 켜도 <em>같은 엔진</em>입니다. 지침·설정·연결한 도구가 그대로 따라옵니다.</p>

<figure class="figure mark-none">
<svg viewBox="0 0 900 290" role="img" aria-label="터미널·IDE·데스크톱 앱·웹 네 표면이 같은 엔진 하나로 모이고, 그 아래에 CLAUDE.md·설정 파일·MCP 서버가 공유된다">
  <g style="font-family: var(--mono); font-size: 15px;" fill="var(--ink)" text-anchor="middle">
    <g style="fill: var(--card); stroke: var(--rule); stroke-width: 1.5;">
      <rect x="20" y="14" width="190" height="50" rx="9"/>
      <rect x="240" y="14" width="190" height="50" rx="9"/>
      <rect x="460" y="14" width="190" height="50" rx="9"/>
      <rect x="680" y="14" width="190" height="50" rx="9"/>
    </g>
    <text x="115" y="45">터미널</text>
    <text x="335" y="45">IDE</text>
    <text x="555" y="45">데스크톱 앱</text>
    <text x="775" y="45">웹</text>
    <g style="stroke: var(--accent); stroke-width: 1.5;" fill="none">
      <path d="M115 64 V92 H450 V118"/>
      <path d="M335 64 V92"/>
      <path d="M555 64 V92"/>
      <path d="M775 64 V92 H450"/>
    </g>
    <rect x="270" y="118" width="360" height="56" rx="10" style="fill: var(--accent-soft); stroke: var(--accent); stroke-width: 2;"/>
    <text x="450" y="152" style="font-size: 17px; font-weight: 700;" fill="var(--accent-text)">같은 Claude Code 엔진</text>
    <path d="M450 174 V202" style="stroke: var(--accent); stroke-width: 1.5;" fill="none"/>
    <g style="fill: var(--card); stroke: var(--rule); stroke-width: 1.5;">
      <rect x="120" y="202" width="200" height="46" rx="9"/>
      <rect x="350" y="202" width="200" height="46" rx="9"/>
      <rect x="580" y="202" width="200" height="46" rx="9"/>
    </g>
    <text x="220" y="231" style="font-size: 14px;">CLAUDE.md</text>
    <text x="450" y="231" style="font-size: 14px;">설정 파일</text>
    <text x="680" y="231" style="font-size: 14px;">MCP 서버</text>
  </g>
</svg>
<figcaption>표면이 달라도 아래는 하나입니다</figcaption>
</figure>

<p class="src">출처 — Claude Code 공식 문서 「Overview · Use Claude Code everywhere」</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-A · 표면 비교</p>

# CLI vs Desktop

<p class="lead">기능이 다른 게 아니라 <em>화면이 다릅니다</em>. 설정과 지침은 양쪽이 같은 파일을 읽습니다.</p>

<div class="split">
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/whats-new/2026-w20">
<img src="./images/official/agent-view.png" alt="터미널에서 돌아가는 Claude Code. 대기 중·작업 중·완료 항목이 목록으로 쌓여 있다" />
<figcaption>터미널 · <a href="https://code.claude.com/docs/en/whats-new/2026-w20"><code>whats-new/2026-w20</code></a></figcaption>
</figure>
<figure class="shot nochrome mark-ok" data-origin="web" data-source="https://code.claude.com/docs/en/whats-new/2026-w33">
<img src="./images/official/auto-continue.png" alt="데스크톱 앱 화면. 수정한 파일 목록과 실행한 명령이 대화 안에 쌓여 있다" />
<figcaption>데스크톱 앱 · <a href="https://code.claude.com/docs/en/whats-new/2026-w33"><code>whats-new/2026-w33</code></a></figcaption>
</figure>
</div>

<div class="deflist">
<div><b>데스크톱에만</b><span>창 배치 · 변경 확인 화면 · 앱 미리보기 · Windows 컴퓨터 제어</span></div>
<div><b>양쪽 공유</b><span>설정 파일 · CLAUDE.md · MCP 서버</span></div>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application」 docs/en/desktop</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-A · 앱 구조</p>

# 앱의 세 탭

<p class="lead">Claude 앱을 열면 탭이 셋입니다. 이 수업은 <em>Code 탭</em>만 씁니다.</p>

<div class="trio">
<div class="pane"><h3>Chat</h3><p>평소 쓰는 대화. 코드 작업과 무관합니다.</p></div>
<div class="pane"><h3>Cowork</h3><p>긴 작업을 맡겨 두는 자리.</p></div>
<div class="pane key"><h3>Code</h3><p>프로젝트 폴더를 열고 코드를 다루는 자리. 여기입니다.</p></div>
</div>

<p class="thesis">Code 탭의 대화 하나가 <em>세션</em> 하나입니다. 세션마다 자기 폴더와 자기 변경 이력을 따로 갖습니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application」 docs/en/desktop</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-B · 데스크톱 앱</p>

# 세션 시작 4가지 설정

<div class="split evidence">
<div>

<p class="lead">첫 메시지를 보내기 전에 <em>입력창 주변</em>에서 네 가지를 정합니다.</p>

<div class="deflist">
<div><b>① 실행 위치</b><span>Local · Cloud · SSH · Windows 라면 WSL 배포판</span></div>
<div><b>② 프로젝트 폴더</b><span>작업할 폴더나 저장소</span></div>
<div><b>③ 모델</b><span>보내기 버튼 옆 드롭다운</span></div>
<div><b>④ 권한 모드</b><span>얼마나 스스로 하게 둘지</span></div>
</div>

<p class="thesis">셋째·넷째는 <em>도중에 바꿔도 됩니다</em>.</p>

</div>
<figure class="shot" data-origin="web" data-source="https://code.claude.com/docs/en/desktop#start-a-session">
<img src="./images/docs/start-session.png" alt="공식 문서의 세션 시작 안내. 실행 위치·프로젝트 폴더·모델·권한 모드 네 가지를 정하라고 적혀 있다" />
<figcaption><a href="https://code.claude.com/docs/en/desktop#start-a-session"><code>desktop#start-a-session</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · Start a session」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-B · 데스크톱 앱</p>

# 프롬프트 입력창

<div class="split evidence">
<div>

<p class="lead">돌아가는 <em>도중에도</em> 다음 지시를 넣을 수 있습니다.</p>

<div class="deflist">
<div><b>즉시 중단</b><span>정지 버튼. 하던 동작이 그 자리에서 멈춥니다</span></div>
<div><b>세우지 않고 방향 틀기</b><span>고칠 말을 쓰고 Enter. 지금 동작이 끝나는 대로 읽습니다</span></div>
<div><b><code>+</code> 버튼</b><span>파일 첨부 · 스킬 · 커넥터 · 플러그인</span></div>
</div>

<p class="thesis">잘못 가고 있으면 끝날 때까지 기다리지 않습니다. <em>일찍 자주 틉니다.</em></p>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/whats-new/2026-w34">
<img src="./images/official/design-skill.png" alt="입력창에 슬래시 명령을 넣은 실제 화면. 아래에 권한 모드·모델·공들이는 정도 표시가 있다" />
<figcaption>입력창 아래에 권한 모드·모델·Effort · <a href="https://code.claude.com/docs/en/whats-new/2026-w34"><code>whats-new/2026-w34</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · Use the prompt box」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-B · 데스크톱 앱</p>

# 대화에 파일 첨부

<p class="lead">둘 다 씁니다. <em>파일이 프로젝트 안에 있느냐 밖에 있느냐</em>로 갈립니다.</p>

<div class="duo">
<div class="pane"><h3><span class="latin">@</span>프로젝트 안 — 파일 언급</h3><p><code>@</code> 뒤에 파일 이름. 이미 폴더에 있는 파일을 대화 맥락에 올립니다. 소스 코드·설정 파일·문서. <em>Cloud·WSL 세션에서는 안 됩니다.</em></p></div>
<div class="pane"><h3><span class="latin">DROP</span>프로젝트 밖 — 파일 붙이기</h3><p>첨부 버튼이나 드래그. 아직 폴더에 없는 것을 넣습니다. 엑셀·PDF·버그 화면 캡처·디자인 시안. <em>세션 어디서나 됩니다.</em></p></div>
</div>

<p class="thesis">예제 1은 엑셀을 <em>붙여</em> 시작하고, 그다음부터는 만들어진 파일을 <em>언급해</em> 이어갑니다. 한 프로젝트에서 둘 다 씁니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · Add files and context to prompts」</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-B · 데스크톱 앱</p>

# 권한 모드 5종 비교

<p class="lead">파일을 고치기 전에 물을지, 명령을 돌리기 전에 물을지, <em>아예 안 물을지</em>를 고릅니다.</p>

| 모드 | 설정 키 | 동작 |
|---|---|---|
| Manual | `default` | 파일 수정·명령 실행 전에 매번 묻습니다. 변경 내용을 보고 건건이 수락·거부 |
| Accept edits | `acceptEdits` | 파일 편집과 `mkdir`·`touch`·`mv` 는 자동 수락. 그 밖의 터미널 명령은 묻습니다 |
| Plan | `plan` | 읽고 탐색만 하고 계획을 냅니다. 소스는 건드리지 않습니다 |
| Auto | `auto` | 전부 실행하되 요청과 어긋나지 않는지 배경에서 확인합니다 |
| Bypass permissions | `bypassPermissions` | 묻지 않습니다. 샌드박스나 VM 에서만 |

<div class="callout"><b>순서</b> 복잡한 일은 <em>Plan</em> 으로 시작해 접근을 먼저 보고, 승인한 뒤 Accept edits 나 Manual 로 바꿔 실행합니다.</div>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · Choose a permission mode」</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-B · 데스크톱 앱</p>

# 기본은 Auto

<div class="split evidence">
<div>

<p class="lead">처음 켜면 대개 <em>Auto</em> 로 시작합니다. 물어볼 줄 알았는데 안 묻는 게 정상입니다.</p>

<div class="deflist">
<div><b>Pro · Max · Team</b><span>세션이 Auto 로 시작합니다</span></div>
<div><b>Enterprise</b><span>Manual 로 시작합니다</span></div>
<div><b>안 묻는 대신</b><span>요청과 어긋나지 않는지 <em>배경에서 확인</em>합니다</span></div>
<div><b>모델을 바꾸면</b><span>Haiku 같은 옛 모델은 Auto 가 <em class="warn">아예 안 뜹니다</em></span></div>
</div>

<p class="thesis">갑자기 매번 승인 창이 뜨면 고장이 아닙니다. <em>모델을 바꿔서 Manual 로 떨어진 것</em>입니다.</p>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode">
<img src="./images/docs/auto-mode.png" alt="공식 문서의 auto 모드 설명. 요금제별로 시작 모드가 다르고 배경 분류기가 요청과 맞는지 검사한다고 적혀 있다" />
<figcaption>원문 · <a href="https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode"><code>permission-modes#eliminate-prompts-with-auto-mode</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Permission modes · Eliminate prompts with auto mode」</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-B · 데스크톱 앱</p>

# Diff 뷰

<div class="split evidence">
<div>

<p class="lead">코드를 못 읽어도 됩니다. 줄에 대고 <em>「이 줄은 왜 이렇게 했어?」</em> 라고 적으면 답이 옵니다.</p>

<div class="steps">
<div><b>변경 표시</b><span><code>+12 -1</code> 처럼 더한 줄·지운 줄 수가 뜹니다</span></div>
<div><b>눌러서 열기</b><span>왼쪽에 파일 목록, 오른쪽에 변경 내용</span></div>
<div><b>줄에 코멘트</b><span>여러 줄에 달아 두었다가 <code>Ctrl+Enter</code> 로 한꺼번에</span></div>
</div>

</div>
<figure class="shot" data-origin="web" data-source="https://code.claude.com/docs/en/desktop#review-changes-with-diff-view">
<img src="./images/docs/diff-view.png" alt="공식 문서의 변경 확인 화면 설명" />
<figcaption><a href="https://code.claude.com/docs/en/desktop#review-changes-with-diff-view"><code>desktop#review-changes-with-diff-view</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · Review changes with diff view」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-B · 데스크톱 앱</p>

# 코드 리뷰 요청

<div class="split evidence">
<div>

<p class="lead">걸러낼 것을 미리 정해 두었기 때문에 <em>지적이 짧습니다</em>. 많이 나오면 그건 진짜입니다.</p>

<div class="duo">
<div class="pane"><h3>본다</h3><p>컴파일 에러 · 논리 오류 · 보안 취약점 · 명백한 버그</p></div>
<div class="pane"><h3>안 본다</h3><p>스타일 · 서식 · 원래 있던 문제 · 린터가 잡을 것</p></div>
</div>

</div>
<figure class="shot nochrome mark-ok" data-origin="web" data-source="https://code.claude.com/docs/en/whats-new/2026-w17">
<img src="./images/official/ultrareview.png" alt="리뷰 결과 화면. 확인된 문제 4건을 짚고, 8건은 오탐으로 기각했다고 적혀 있다" />
<figcaption>확인 4건 · <em>오탐 8건은 스스로 기각</em> · <a href="https://code.claude.com/docs/en/whats-new/2026-w17"><code>whats-new/2026-w17</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · Review your code」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-B · 데스크톱 앱</p>

# 앱 미리보기

<p class="lead">만든 화면을 앱 안에서 띄우고, <em>스스로 눌러 보며</em> 고칩니다.</p>

<figure class="shot hero nochrome mark-ok" data-origin="web" data-source="https://code.claude.com/docs/en/whats-new/2026-w28">
<img src="./images/official/desktop-browser-crop.png" alt="데스크톱 앱 화면. 왼쪽 대화에 브라우저를 조작한 기록과 고친 코드가 쌓여 있고, 오른쪽 브라우저 패널에 만든 주문 화면이 떠 있다" />
<figcaption>왼쪽 대화에 <em>눌러 본 기록</em>이 남습니다 · 오른쪽은 돌아가는 앱 · <a href="https://code.claude.com/docs/en/whats-new/2026-w28"><code>whats-new/2026-w28</code></a></figcaption>
</figure>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · Preview your app」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-B · 데스크톱 앱</p>

# 창 배치

<p class="lead">Code 탭은 <em>창(pane)</em> 을 늘어놓는 화면입니다. 필요한 것만 꺼내 씁니다.</p>

<figure class="figure mark-none">
<svg viewBox="0 0 900 250" role="img" aria-label="Code 탭의 창 배치. 왼쪽 대화 창, 가운데 변경 내용과 브라우저, 오른쪽 터미널과 파일 편집기">
  <g style="font-family: var(--mono); font-size: 13px;" fill="var(--dim)" text-anchor="middle">
    <rect x="10" y="10" width="880" height="230" rx="12" style="fill: var(--card); stroke: var(--rule); stroke-width: 1.5;"/>
    <rect x="24" y="24" width="250" height="202" rx="8" style="fill: var(--accent-soft); stroke: var(--accent); stroke-width: 2;"/>
    <text x="149" y="118" style="font-size: 16px; font-weight: 700;" fill="var(--accent-text)">대화</text>
    <text x="149" y="140">언제나 열려 있음</text>
    <rect x="288" y="24" width="300" height="96" rx="8" style="fill: var(--paper); stroke: var(--accent); stroke-width: 2;"/>
    <text x="438" y="66" style="font-size: 15px; font-weight: 700;" fill="var(--accent-text)">변경 내용</text>
    <text x="438" y="88">Ctrl Shift D</text>
    <rect x="288" y="130" width="300" height="96" rx="8" style="fill: var(--paper); stroke: var(--rule); stroke-width: 1.5;"/>
    <text x="438" y="172" style="font-size: 15px; font-weight: 700;" fill="var(--ink)">브라우저</text>
    <text x="438" y="194">Ctrl Shift B</text>
    <rect x="602" y="24" width="274" height="96" rx="8" style="fill: var(--paper); stroke: var(--rule); stroke-width: 1.5;"/>
    <text x="739" y="66" style="font-size: 15px; font-weight: 700;" fill="var(--ink)">터미널</text>
    <text x="739" y="88">Ctrl 백틱</text>
    <rect x="602" y="130" width="274" height="96" rx="8" style="fill: var(--paper); stroke: var(--rule); stroke-width: 1.5;"/>
    <text x="739" y="160" style="font-size: 15px; font-weight: 700;" fill="var(--ink)">파일 · 계획 · 작업</text>
    <text x="739" y="182">서브에이전트</text>
    <text x="739" y="202">Views 메뉴에서</text>
  </g>
</svg>
<figcaption>창은 모두 여덟 가지. 머리를 끌면 옮겨지고, 경계를 끌면 크기가 바뀝니다. <code>Ctrl+\</code> 로 닫습니다</figcaption>
</figure>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · Arrange your workspace」</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-B · 데스크톱 앱</p>

# 단축키 6개

<div class="split evidence">
<div>

<p class="lead"><code>Ctrl+/</code> 를 누르면 전부 나옵니다. 손이 실제로 가는 건 <em>여섯 개</em>입니다.</p>

| 키 (Windows) | 하는 일 |
|---|---|
| `Esc` | 응답 중단 |
| `Ctrl Shift D` | 변경 내용 창 |
| `Ctrl Shift B` | 브라우저 창 |
| `Ctrl ;` | 사이드 채팅 |
| `Ctrl Shift M` | 권한 모드 메뉴 |
| `Ctrl Shift I` | 모델 메뉴 |

<p class="thesis"><code>Shift+Tab</code> 은 <em class="bad">앱에서 아무 일도 안 합니다</em>. 터미널 전용 키입니다.</p>

</div>
<figure class="shot" data-origin="web" data-source="https://code.claude.com/docs/en/desktop#keyboard-shortcuts">
<img src="./images/docs/shortcuts.png" alt="공식 문서의 단축키 표 전체" />
<figcaption>원문 전체 · <a href="https://code.claude.com/docs/en/desktop#keyboard-shortcuts"><code>desktop#keyboard-shortcuts</code></a></figcaption>
</figure>
</div>

---
class: top-led brand-cc
---

<p class="eyebrow">1-B · 실습 · 5분</p>

# 쓰는 도중에 멈추기

<p class="lead">Code 탭의 새 대화에서 시작합니다. 목표는 <em>메신저에 보낼 안내 3줄</em>입니다.</p>

```text
내일 오후 2시, 3층 회의실에서 생산실적 회의를 해.
팀원들은 지난주 생산량과 불량률을 준비해 와야 해.
이 내용을 격식 있는 안내문으로 30문단 이상 길게 써줘.
파일이나 도구는 쓰지 말고 대화에만 작성해줘.
```

<p class="thesis">첫 문단이 나오면 <em>Esc를 두 번 눌러</em> 멈춰 보세요. 끝까지 기다리지 않습니다.</p>
<p class="src">중단은 Esc 한 번으로도 됩니다. 되감기 메뉴가 열리면 취소하고 입력창으로 돌아오세요. 응답이 계속되면 정지 버튼을 누릅니다.</p>

<!--
강사: 이번에는 일부러 목표와 맞지 않게 긴 글을 시킵니다. Claude의 오답을 유도하는 시험이 아니라 사용자가 도중에 요구를 바꾸는 연습입니다.
먼저 첫 문단에서 멈추는 모습을 짧게 시연하고, 학생들이 같은 동작을 합니다.
정지 여부는 새 글이 더 나오지 않는지로 확인합니다. 이미 출력된 글은 남아 있어도 정상입니다.
Esc 두 번은 자동 복구가 아닙니다. CLI에서는 되감기 메뉴를 여는 키이며, 데스크톱 공식 단축키 표는 Esc 중단만 보장합니다.
메뉴가 열렸다면 취소합니다. 이 실습은 되감기 선택 없이 같은 대화에서 이어갑니다.
-->

---
class: top-led brand-cc
---

<p class="eyebrow">1-B · 같은 실습 계속</p>

# 같은 대화에서 다시 지시

<p class="lead">응답이 멈췄으면 <em>아래 지시만</em> 보냅니다. 회의 정보를 다시 붙이지 않습니다.</p>

```text
방향을 바꿀게. 긴 안내문은 그만 쓰고,
앞서 준 회의 정보를 팀 메신저용으로 정확히 3줄로 써줘.
1줄은 일시, 2줄은 장소, 3줄은 준비할 내용.
서론이나 맺음말은 빼줘.
```

<div class="deflist">
<div><b>길이</b><span>새 답변이 정확히 3줄인가요?</span></div>
<div><b>내용</b><span>일시·장소·준비할 내용이 모두 남아 있나요?</span></div>
</div>

<p class="thesis">조건이 빠졌으면 <em>빠진 부분만 짚어 한 번 더 지시</em>하세요.</p>

<!--
학생이 새 대화를 열거나 처음부터 정보를 복사하지 않도록 안내합니다.
모델이 조건을 놓쳤다면 그 자체가 한 번 더 방향을 조정할 기회입니다.
답변이 너무 빨리 끝난 학생은 같은 대화에서 새 지시를 보내 먼저 완료하고, 긴 설명을 추가 요청해 출력 시작 즉시 중단을 다시 경험하게 합니다.
-->

---
class: top-led brand-cc
---

<p class="eyebrow">1-B · 실습 확인</p>

# 멈춘 뒤에도 맥락은 남는다

<p class="lead">회의 정보를 다시 주지 않았는데, <em>새 답변에 그대로 남았나요?</em></p>

<v-click>

```text
일시: 내일 오후 2시
장소: 3층 회의실
준비: 지난주 생산량과 불량률
```

<p>표현은 달라도 됩니다. 3줄 안에 위 정보가 모두 있으면 성공입니다.</p>

</v-click>

<p class="thesis">다음에 방향이 어긋나면, <em>언제 멈추고 무엇을 다시 말하겠어요?</em></p>
<p class="src">출력 예시 · 중단은 이미 수행한 작업을 되돌리지 않습니다. 근거: <a href="https://code.claude.com/docs/en/desktop#keyboard-shortcuts">Desktop 단축키</a> · <a href="https://code.claude.com/docs/en/checkpointing">Checkpointing</a></p>

<!--
정답 예시를 공개하기 전에 학생의 3줄을 먼저 확인합니다.
완료 기준: ① 출력 중 직접 중단함 ② 같은 대화에 변경 지시를 보냄 ③ 새 답변의 길이와 사실을 확인함.
마무리 발문: 「아직 끝나지 않았어도, 목표와 어긋난 걸 보면 멈추고 원하는 결과를 구체적으로 말합니다.」
-->

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-D · 모델과 Effort</p>

# 모델 4종

<div class="split evidence">
<div>

<p class="lead">이름을 직접 고릅니다. 「Default」 는 <em>요금제마다 다른 모델</em>로 풀립니다.</p>

| 이름 | 성격 | 시킬 일 |
|---|---|---|
| `haiku` | 빠르고 저렴 | 단순한 잔일 |
| `sonnet` | 일상 코딩 | 대부분의 작업 |
| `opus` | 복잡한 추론 | 어려운 판단 |
| `fable` | 가장 오래 스스로 | 한 자리에 안 끝나는 일 |

<div class="callout"><b><code>/model</code></b> 목록에서 <em>Enter</em> 는 기본값까지 바꾸고, <code>s</code> 는 이번 세션만 바꿉니다.</div>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/whats-new/2026-w20">
<img src="./images/official/fast-mode.png" alt="모델을 고르는 실제 화면. 목록에서 모델을 고르고 빠른 모드를 켤 수 있다" />
<figcaption>실제 화면 · <a href="https://code.claude.com/docs/en/whats-new/2026-w20"><code>whats-new/2026-w20</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Model configuration · Available models」 docs/en/model-config</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-D · 모델과 Effort</p>

# Effort 5단계

<div class="split evidence">
<div>

<p class="lead">모델을 바꾸는 게 아니라 <em>얼마나 공들일지</em>만 바꿉니다. 기본은 <code>high</code> 입니다.</p>

| 단계 | 언제 |
|---|---|
| `low` | 짧고 범위가 좁은 일 |
| `medium` | 토큰을 아껴야 할 때 |
| `high` | <em>기본값</em>. 대부분의 코딩 |
| `xhigh` | 더 깊게. 토큰은 더 많이 |
| `max` | 어려운 과제. 과하게 생각하기도 |

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/model-config#adjust-effort-level">
<img src="./images/docs/effort.png" alt="공식 문서의 effort 단계 설명" />
<figcaption>원문 · <a href="https://code.claude.com/docs/en/model-config#adjust-effort-level"><code>model-config#adjust-effort-level</code></a></figcaption>
</figure>
</div>

<p class="thesis">메뉴에는 <code>ultracode</code> 가 하나 더 있습니다. 이건 모델 단계가 아니라 Claude Code 설정으로, <code>xhigh</code> 로 돌리면서 <em>일마다 흐름을 따로 짜게</em> 합니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Model configuration · Choose an effort level」 docs/en/model-config</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-D · 모델과 Effort</p>

# Effort 바꾸는 자리

<p class="lead">돌아가는 <em>도중에도</em> 바꿉니다. 바꾼 값은 그 턴의 다음 요청부터 먹습니다.</p>

<div class="steps">
<div><b><code>/effort</code></b><span>슬라이더가 뜹니다. 단계 이름을 붙여 바로 줘도 됩니다</span></div>
<div><b><code>/model</code> 안에서</b><span>모델을 고르는 중에 좌우 화살표로 조절</span></div>
<div><b>데스크톱 앱</b><span><code>Ctrl Shift E</code> — Mac 은 <code>Cmd Shift E</code></span></div>
</div>

<div class="callout"><b>한 턴만 깊게</b> 프롬프트 아무 데나 <code>ultrathink</code> 를 적습니다. 「생각 많이 해」 같은 말은 <em>그냥 글자</em>입니다.</div>

<p class="src">출처 — Claude Code 공식 문서 「Model configuration · Set the effort level」 docs/en/model-config</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-D · 모델과 Effort</p>

# 컨텍스트 창

<p class="lead">내가 말을 걸기 전에 <em>이미 상당히 차 있습니다</em>. 가득 차기 전에 스스로 요약해 접습니다.</p>

<figure class="figure mark-none">
<svg viewBox="0 0 900 210" role="img" aria-label="컨텍스트 창을 가로 막대로 그린 그림. 왼쪽부터 시작 전에 이미 채워지는 지침과 메모리와 도구 목록, 그다음 대화와 읽은 파일, 오른쪽 끝 가까이에서 자동 압축이 일어난다">
  <g style="font-family: var(--mono); font-size: 13px;" fill="var(--ink)" text-anchor="middle">
    <rect x="30" y="52" width="840" height="70" rx="10" style="fill: var(--paper); stroke: var(--rule); stroke-width: 1.5;"/>
    <rect x="30" y="52" width="240" height="70" rx="10" style="fill: var(--accent-soft); stroke: var(--accent); stroke-width: 2;"/>
    <text x="150" y="82" style="font-size: 14px; font-weight: 700;" fill="var(--accent-text)">첫 마디 전에 이미</text>
    <text x="150" y="104" fill="var(--accent-text)">CLAUDE.md · 메모리 · 스킬 · MCP</text>
    <rect x="270" y="52" width="450" height="70" style="fill: var(--card); stroke: var(--rule); stroke-width: 1.5;"/>
    <text x="495" y="82" style="font-size: 14px; font-weight: 700;">오간 말 · 읽은 파일 · 명령 출력</text>
    <text x="495" y="104" fill="var(--dim)">쓸수록 오른쪽으로 찹니다</text>
    <line x1="720" y1="38" x2="720" y2="136" style="stroke: var(--accent); stroke-width: 2; stroke-dasharray: 6 5;"/>
    <text x="800" y="94" style="font-size: 14px; font-weight: 700;" fill="var(--accent-text)">자동 압축</text>
    <text x="800" y="30" style="font-size: 12px;" fill="var(--dim)">여기서 접습니다</text>
    <text x="150" y="164" style="font-size: 13px;" fill="var(--dim)">지침이 길면 여기가 넓어집니다</text>
    <text x="495" y="164" style="font-size: 13px;" fill="var(--dim)">긴 로그·긴 파일이 여기를 먹습니다</text>
  </g>
</svg>
<figcaption>압축되면 대화는 요약으로 바뀌고, CLAUDE.md 와 메모리는 파일에서 다시 읽어 옵니다</figcaption>
</figure>

<p class="src">출처 — Claude Code 공식 문서 「Explore the context window」 docs/en/context-window</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-D · 모델과 Effort</p>

# 맥락 아끼는 법

<p class="lead">자동 압축에 맡기기보다 <em>내가 먼저 정리</em>하는 편이 낫습니다. 무엇을 남길지 내가 고르니까요.</p>

<div class="steps">
<div><b>남길 것을 짚어 압축</b><span><code>/compact 수집기 고친 부분만 남겨줘</code></span></div>
<div><b>상관없는 일로 넘어갈 땐 <code>/clear</code></b><span>새로 시작. 압축과 달리 값이 들지 않습니다</span></div>
<div><b>긴 조사는 서브에이전트에게</b><span>긴 출력이 내 창이 아니라 저쪽 창에 쌓입니다</span></div>
</div>

<p class="thesis">지금 뭐가 자리를 먹는지는 <code>/context</code> 로 봅니다. 대화 중간만 접고 싶으면 되감기 메뉴의 <em>「여기서부터 요약」</em> 을 씁니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Explore the context window · When your context fills up」 docs/en/context-window</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-D · 모델과 Effort</p>

# 작업별 설정 기준

<p class="lead">고민되면 <em>기본값 그대로</em> 둡니다. 바꿀 때는 한 번에 하나만.</p>

| 시킬 일 | 모델 | Effort |
|---|---|---|
| 문구 고치기 · 파일 이름 바꾸기 | `haiku` · `sonnet` | `low`~`medium` |
| 화면 하나 만들기 · 버그 고치기 | `sonnet` | `high` (기본) |
| 원인 모를 문제 · 설계 판단 | `opus` · `fable` | `xhigh` 이상 |

<p class="thesis">올릴수록 좋아지는 게 아닙니다. <code>max</code> 는 <em>과하게 생각하다 되레 헤매기도 한다</em>고 문서가 적어 두었습니다.</p>

<div class="callout"><b>haiku 로 내리면</b> Auto 모드가 안 뜹니다. 세션이 Manual 로 떨어져 <em class="warn">매번 승인 창이 뜹니다</em> — 고장이 아닙니다.</div>

<p class="src">출처 — Claude Code 공식 문서 「Model configuration · Choose an effort level」 docs/en/model-config</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-D · 모델과 Effort</p>

# 같은 질문 두 번

<p class="lead">같은 모델, 같은 질문. <code>low</code> 와 <code>xhigh</code> 만 바꿔 봤습니다.</p>

| | `low` | `xhigh` |
|---|---|---|
| 걸린 시간 | 1분 8초 | 6분 16초 |
| 확인한 방법 | 배포 코드를 내려받아 읽음 | 거기에 파일 5종으로 실제 업로드까지 |
| 결론 | BOM 없는 UTF-8 | 같음 |

<p class="thesis">답은 갈리지 않았습니다. 갈린 건 <em>어디까지 확인했는가</em>입니다. 답이 하나로 모이는 문제라면 올려도 결과가 같습니다.</p>

<p class="src">근거 — 같은 폴더·같은 프롬프트로 두 세션 · <code>/effort</code> 만 바꿈 · 소요 시간은 화면에 찍힌 값</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-D · 모델과 Effort</p>

# 다섯 배가 한 일

<p class="lead"><code>xhigh</code> 는 원인을 찾은 뒤 <em>안 물어본 경우까지</em> 만들어 확인했습니다.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/eff-high.png" alt="검증 결과 표. UTF-8 BOM 없음은 에러 재현, UTF-8 더하기 BOM 은 정상, UTF-8 더하기 BOM 더하기 CRLF 도 정상, xlsx 변환도 정상, CP949 는 실패. 앱과 동일한 로직으로 재현한 뒤 실제 사이트에도 업로드해 확인했다는 문장이 위에 있다" />
<figcaption>안 물어본 CRLF · xlsx · CP949 까지 다섯 가지</figcaption>
</figure>

<p class="thesis">마지막 줄이 중요합니다. <em>한국 엑셀 기본 저장</em>인 CP949 는 여전히 실패합니다 — 이건 <code>low</code> 쪽 답에 없었습니다.</p>

<p class="src">근거 — <code>xhigh</code> 세션 · 5종 파일을 만들어 실제 배포본에 올려 확인</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-D · 모델과 Effort</p>

# 사용량이 새는 자리

<p class="lead">「왜 벌써 다 썼지」의 답은 대개 <em>대화가 길어서</em>입니다.</p>

<div class="deflist">
<div><b>긴 맥락</b><span>한 줄만 물어도 그날 대화 전부를 같이 보냅니다</span></div>
<div><b>캐시 미스</b><span>한참 쉬었다 던진 첫 메시지는 처음부터 다시 읽습니다</span></div>
<div><b>살아 있는 에이전트</b><span>서브에이전트·팀은 끝날 때까지 계속 씁니다</span></div>
<div><b>압축 그 자체</b><span><code>/compact</code> 는 그 큰 대화를 읽어야 합니다</span></div>
</div>

<p class="thesis">무엇이 얼마나 먹었는지는 스킬·서브에이전트·MCP 별로 갈라 볼 수 있습니다. 앱에서는 <em>모델 이름 옆 사용량 고리</em>를 누릅니다 — <code>/usage</code> 는 터미널 쪽입니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Manage costs effectively · Why usage climbs in a long session」 docs/en/costs</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-E · 일 나누기</p>

# 계획 모드

<div class="split evidence">
<div>

<p class="lead">코드를 건드리기 전에 <em>무엇을 할지 먼저 적어 오게</em> 합니다.</p>

<div class="steps">
<div><b>모드를 고릅니다</b><span>보내기 버튼 옆 <em>모드 선택기</em>에서 Plan · <code>Ctrl Shift M</code></span></div>
<div><b>이번 한 번만</b><span>지시 앞에 <code>/plan</code> 을 붙입니다</span></div>
<div><b>돌아가기</b><span>같은 선택기에서 원래 모드로</span></div>
</div>

<p class="thesis">승인 전까지 <em>소스는 막혀 있습니다</em>. 터미널의 <code>Shift Tab</code> 은 앱에 <em class="warn">없습니다</em>.</p>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode">
<img src="./images/docs/plan-mode.png" alt="공식 문서의 계획 모드 설명. 파일을 고치기 전에 먼저 조사하고 계획을 내놓는다고 적혀 있다" />
<figcaption>원문 · <a href="https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode"><code>permission-modes#analyze-before-you-edit-with-plan-mode</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Permission modes · Analyze before you edit with plan mode」 docs/en/permission-modes</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-E · 일 나누기</p>

# 계획 승인 3갈래

<p class="lead">계획이 나오면 셋 중 하나를 묻습니다. <em>고른 대로 실행 권한이 바뀝니다</em>.</p>

<div class="deflist">
<div><b>네, 자동으로</b><span>승인하고 auto 모드로 바로 실행합니다</span></div>
<div><b>네, 편집은 하나씩 확인</b><span>승인하되 파일 변경을 건건이 봅니다</span></div>
<div><b>아니요, 더 계획하세요</b><span>계획 모드에 남아 고칠 점을 말합니다</span></div>
</div>

<div class="callout"><b>계획 자체를 고치려면</b> <code>Ctrl G</code> — 제안된 계획이 텍스트 편집기로 열립니다. 고쳐서 저장한 뒤 진행시킵니다.</div>

<p class="src">출처 — Claude Code 공식 문서 「Permission modes · Review and approve a plan」 docs/en/permission-modes</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-E · 일 나누기</p>

# 서브에이전트

<div class="split evidence">
<div>

<p class="lead">조사는 <em>딴 창에서</em> 시키고 요약만 받습니다. 내 대화가 로그로 덮이지 않습니다.</p>

| 이름 | 맡는 일 | 쓸 수 있는 도구 |
|---|---|---|
| Explore | 코드를 찾고 훑기 | 읽기만 |
| Plan | 계획 모드의 사전 조사 | 읽기만 |
| General-purpose | 조사와 수정이 함께 필요한 일 | 전부 |

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/sub-agents#built-in-subagents">
<img src="./images/docs/subagents-builtin.png" alt="공식 문서의 내장 서브에이전트 목록" />
<figcaption>원문 · <a href="https://code.claude.com/docs/en/sub-agents#built-in-subagents"><code>sub-agents#built-in-subagents</code></a></figcaption>
</figure>
</div>

<p class="thesis">Explore 와 Plan 은 <em>CLAUDE.md 를 읽지 않습니다</em>. 조사를 가볍고 싸게 돌리려는 설계입니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Create custom subagents · Built-in subagents」 docs/en/sub-agents</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-E · 일 나누기</p>

# 자동 위임과 지목 호출

<p class="lead">평소엔 <em>알아서 넘깁니다</em>. 꼭 저 사람이어야 할 때만 지목합니다.</p>

<div class="duo">
<div class="pane"><h3>알아서 넘기기</h3><p>내 요청과 각 에이전트에 적힌 설명을 견줘 Claude 가 판단합니다. 이름을 그냥 말해도 대개 넘깁니다.</p></div>
<div class="pane"><h3>지목해서 넘기기</h3><p><code>@</code> 를 치고 목록에서 고릅니다. 파일을 언급할 때와 같은 방식이고, 그 에이전트가 <em>반드시</em> 돕니다.</p></div>
</div>

<p class="thesis"><code>@</code> 로 고르는 건 <em>누가 할지</em>만 정합니다. 그 에이전트가 받을 지시문은 Claude 가 씁니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Create custom subagents · Invoke subagents explicitly」 docs/en/sub-agents</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-E · 일 나누기</p>

# 앞에서와 뒤에서

<p class="lead">결과를 <em>기다릴 일</em>과 <em>던져둘 일</em>은 다릅니다.</p>

<div class="deflist">
<div><b>기본</b><span>뒤에서 돕니다. 내가 고르는 게 아닙니다</span></div>
<div><b>앞에서</b><span>끝날 때까지 대화가 멈춥니다. 권한 질문도 그대로</span></div>
<div><b>뒤에서</b><span>그동안 다른 걸 시킵니다. 권한 질문은 내 대화로 올라옵니다</span></div>
<div><b>돌던 걸 뒤로</b><span><code>Ctrl B</code></span></div>
<div><b>뭐가 도는지</b><span><code>/tasks</code> — 열어 보거나 세웁니다</span></div>
</div>

<p class="thesis">뒤에서 돌린 결과는 <em>다음 턴</em>에 알림으로 옵니다. 그전에 물으면 아직 돌고 있다고 답합니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Create custom subagents · Run subagents in foreground or background」</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-E · 일 나누기</p>

# 메시지 줄 세우기

<div class="split evidence">
<div>

<p class="lead">돌아가는 중에 Enter 를 쳐도 <em>끊기지 않습니다</em>. 줄을 서서 기다립니다.</p>

<div class="steps">
<div><b>그냥 쓰고 Enter</b><span>입력창 위에 줄 선 항목이 쌓입니다</span></div>
<div><b>언제 가나</b><span>지금 하는 도구 호출이 끝나는 대로 전해집니다</span></div>
<div><b>당장 끊고 싶으면</b><span><code>Esc</code> — 세운 뒤 줄 선 것을 바로 보냅니다</span></div>
</div>

<p class="thesis">잘못 넣었으면 첫 줄에서 <code>↑</code> 로 <em>도로 가져옵니다</em>.</p>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/interactive-mode#queue-messages-while-claude-works">
<img src="./images/docs/queue.png" alt="공식 문서의 메시지 큐 설명. 작업 중에 보낸 메시지가 순서대로 쌓인다고 적혀 있다" />
<figcaption>원문 · <a href="https://code.claude.com/docs/en/interactive-mode#queue-messages-while-claude-works"><code>interactive-mode#queue-messages-while-claude-works</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Interactive mode · Queue messages while Claude works」 docs/en/interactive-mode</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-E · 일 나누기</p>

# 서브에이전트와 팀

<div class="split evidence">
<div>

<p class="lead">하나는 <em>결과만 받는</em> 구조, 하나는 <em>서로 이야기하는</em> 구조입니다.</p>

| | 서브에이전트 | 에이전트 팀 |
|---|---|---|
| 소통 | 부른 쪽에 결과 보고 | 팀원끼리 직접 |
| 지휘 | 본 대화가 다 관리 | 공유 작업 목록으로 스스로 |
| 토큰 | 요약만 돌아옵니다 | 계획 모드로 돌면 7배쯤 |

<div class="callout"><b>팀은 데스크톱 앱에 없습니다</b> 터미널 전용이고, 거기서도 환경 변수를 넣어야 켜지는 <em>실험 기능</em>입니다. 앱에서 여러 에이전트를 굴리는 자리는 다이내믹 워크플로입니다.</div>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/agent-teams">
<img src="./images/official/subagents-vs-teams.png" alt="서브에이전트와 에이전트 팀을 나란히 그린 공식 도해. 왼쪽은 결과만 회신하고 오른쪽은 공유 목록을 두고 서로 통신한다" />
<figcaption>공식 도해 · <a href="https://code.claude.com/docs/en/agent-teams"><code>agent-teams</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Orchestrate agent teams · Compare with subagents」 · 토큰 배수는 「Manage costs · Agent team token costs」 docs/en/costs</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-E · 일 나누기</p>

# 이름이 붙는 자리

<p class="lead">같은 지시를 두 번 줬습니다. 갈린 건 <em>이름이 붙느냐</em>입니다.</p>

<figure class="shot band thin nochrome term" data-origin="capture">
<img src="./images/term/sub-launch.png" alt="터미널 화면. 백그라운드 에이전트 3개를 띄웠다는 줄 아래에 08-24 일지 검토, 08-25 일지 검토, 08-26 일지 검토라는 작업 이름 세 개가 나열되어 있다" />
<figcaption>서브에이전트 — 붙은 건 <em>맡은 일</em>의 이름</figcaption>
</figure>

<figure class="shot band thin nochrome term" data-origin="capture">
<img src="./images/term/team-launch.png" alt="같은 자리의 다른 실행. 백그라운드 에이전트 3개를 띄웠다는 줄 아래에 골뱅이 reviewer-0824, 골뱅이 reviewer-0825, 골뱅이 reviewer-0826 이라는 사람 이름 형태의 식별자 세 개가 나열되어 있다" />
<figcaption>에이전트 팀 — 붙은 건 <em>부를 수 있는</em> 이름</figcaption>
</figure>

<p class="thesis"><code>@</code> 가 붙었다는 건 <em>서로 부를 수 있다</em>는 뜻입니다.</p>

<p class="src">근거 — 같은 폴더·같은 프롬프트로 두 세션 · 에이전트 팀 환경 변수만 바꿈</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-E · 일 나누기</p>

# 도는 동안의 목록

<p class="lead">일하는 중에 <code>←</code> 를 누르면 뜨는 화면도 <em>다르게 적힙니다</em>.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/sub-panel.png" alt="에이전트 목록. main 아래에 general-purpose 라는 종류와 08-24 일지 검토 같은 작업 이름, 그리고 20초에 27.3k 토큰 같은 소요와 사용량이 세 줄 적혀 있다" />
<figcaption>서브에이전트 — <em>종류 · 맡은 일 · 쓴 토큰</em></figcaption>
</figure>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/team-panel.png" alt="같은 자리의 다른 실행. main 아래에 reviewer-0824, reviewer-0825, reviewer-0826 이라는 이름과 각자의 작업 폴더 경로가 적혀 있고, 상태가 idle 또는 1분 12초에 43.6k 토큰으로 표시된다" />
<figcaption>에이전트 팀 — <em>이름 · 일하는 폴더 · 지금 상태</em></figcaption>
</figure>

<p class="src">근거 — 두 세션의 에이전트 패널을 같은 시점에 캡처</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-E · 일 나누기</p>

# 끝났다는 말

<p class="lead">팀원은 나에게 말하지 않습니다. <em>팀장에게</em> 보고합니다.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/team-msg.png" alt="터미널 화면. 골뱅이 reviewer-0824 에게서 메시지가 왔다는 줄, 08-24 검토 결과가 도착했다는 본대화의 말, 그리고 팀원 reviewer-0824 가 끝났다는 알림과 함께 2026-08-24 일지 검토를 마치고 team-lead 에게 결과를 전달했으며 원본은 읽기만 했다는 보고가 이어진다" />
<figcaption>결과가 오기 전에 <em>「메시지가 왔다」</em>가 먼저 뜹니다</figcaption>
</figure>

<p class="thesis">서브에이전트 쪽 같은 자리에는 <code>Agent "08-24 일지 검토" finished · 44s</code> 한 줄뿐입니다. <em>중간에 오갈 말이 없기 때문</em>입니다.</p>

<p class="src">근거 — 같은 프롬프트 두 세션 · 세 검토자가 일지 3건을 나눠 읽고 본 대화가 대조</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-F · 기억과 지침</p>

# CLAUDE.md와 자동 메모리

<div class="split evidence">
<div>

<p class="lead">매번 다시 설명하지 않으려면 <em>둘 중 어디에 적을지</em>부터 정합니다.</p>

| | CLAUDE.md | 자동 메모리 |
|---|---|---|
| 누가 씁니다 | 내가 | Claude 가 |
| 무엇이 | 지시와 규칙 | 배운 것과 버릇 |
| 범위 | 프로젝트 · 계정 · 조직 | 저장소 하나 |
| 담을 것 | 규약 · 작업 순서 · 구조 | 내 취향, 내가 준 교정 |

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/memory#claude-md-vs-auto-memory">
<img src="./images/docs/memory.png" alt="공식 문서의 비교표. 누가 쓰는지·무엇이 담기는지·적용 범위가 CLAUDE.md 와 자동 메모리로 나뉘어 있다" />
<figcaption>원문 · <a href="https://code.claude.com/docs/en/memory#claude-md-vs-auto-memory"><code>memory#claude-md-vs-auto-memory</code></a></figcaption>
</figure>
</div>

<p class="thesis">둘 다 <em>매 세션 시작에</em> 함께 올라옵니다. 다만 강제 설정이 아니라 참고 맥락입니다. 무조건 막아야 할 건 훅으로 막습니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「How Claude remembers your project · CLAUDE.md vs auto memory」 docs/en/memory</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-F · 기억과 지침</p>

# CLAUDE.md에 적을 때

<p class="lead">「또 설명하고 있네」 싶으면 <em>그때가 적을 때</em>입니다.</p>

<div class="deflist">
<div><b>같은 실수 두 번째</b><span>한 번은 그럴 수 있습니다. 두 번이면 적습니다</span></div>
<div><b>리뷰에서 걸린 것</b><span>이 코드베이스라면 알았어야 할 내용</span></div>
<div><b>지난주에도 친 말</b><span>같은 교정을 또 타이핑하고 있을 때</span></div>
<div><b>새 사람이 물을 것</b><span>들어오면 똑같이 물어볼 내용</span></div>
</div>

<p class="thesis">여러 단계짜리 절차나 <em>일부 폴더에서만</em> 맞는 규칙은 여기가 아닙니다. 스킬이나 경로별 규칙으로 보냅니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「How Claude remembers your project · When to add to CLAUDE.md」 docs/en/memory</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-F · 기억과 지침</p>

# 위치별 적용 범위

<p class="lead">파일을 <em>어디에 두느냐</em>가 곧 적용 범위입니다.</p>

<figure class="figure mark-none">
<svg viewBox="0 0 900 250" role="img" aria-label="CLAUDE.md 를 둘 수 있는 네 자리. 위에서부터 조직 정책, 내 계정, 프로젝트, 로컬 순으로 범위가 좁아진다">
  <g style="font-family: var(--mono); font-size: 13px;" fill="var(--ink)">
    <rect x="20" y="16" width="860" height="48" rx="9" style="fill: var(--card); stroke: var(--rule); stroke-width: 1.5;"/>
    <text x="40" y="46">C:\Program Files\ClaudeCode\CLAUDE.md</text>
    <text x="862" y="46" text-anchor="end" fill="var(--dim)">이 PC 의 모든 사람 · IT 가 배포</text>
    <rect x="20" y="74" width="720" height="48" rx="9" style="fill: var(--card); stroke: var(--rule); stroke-width: 1.5;"/>
    <text x="40" y="104">~/.claude/CLAUDE.md</text>
    <text x="722" y="104" text-anchor="end" fill="var(--dim)">내 모든 프로젝트</text>
    <rect x="20" y="132" width="580" height="48" rx="9" style="fill: var(--accent-soft); stroke: var(--accent); stroke-width: 2;"/>
    <text x="40" y="162" fill="var(--accent-text)">./CLAUDE.md</text>
    <text x="582" y="162" text-anchor="end" fill="var(--accent-text)">팀 전체 · git 으로 공유</text>
    <rect x="20" y="190" width="440" height="48" rx="9" style="fill: var(--card); stroke: var(--rule); stroke-width: 1.5;"/>
    <text x="40" y="220">./CLAUDE.local.md</text>
    <text x="442" y="220" text-anchor="end" fill="var(--dim)">나만 · gitignore</text>
  </g>
</svg>
<figcaption>위에서 아래 순서로 읽습니다. 아래로 갈수록 좁고, 나중에 읽힙니다</figcaption>
</figure>

<p class="src">출처 — Claude Code 공식 문서 「How Claude remembers your project · Choose where to put CLAUDE.md files」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-F · 기억과 지침</p>

# 통하는 문장

<p class="lead">지켰는지 <em>확인할 수 있게</em> 써야 지켜집니다.</p>

<div class="duo">
<div class="pane key"><h3>통합니다</h3><p>「들여쓰기는 2칸」<br>「커밋 전에 <code>npm test</code>」<br>「API 처리기는 <code>src/api/handlers/</code> 에」</p></div>
<div class="pane"><h3>안 통합니다</h3><p>「코드를 깔끔하게」<br>「테스트 잘 하기」<br>「파일 정리 잘」</p></div>
</div>

<div class="callout"><b>200줄</b> 그보다 길어지면 맥락도 먹고 잘 지켜지지도 않습니다. 길어지면 규칙 파일로 쪼갭니다.</div>

<p class="src">출처 — Claude Code 공식 문서 「How Claude remembers your project · Write effective instructions」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-F · 기억과 지침</p>

# 자동 메모리 4종

<p class="lead">내가 적지 않아도 <em>스스로 메모를 남깁니다</em>. 네 갈래로 나눠 적습니다.</p>

<div class="deflist">
<div><b>user</b><span>내 역할 · 숙련도 · 일하는 방식</span></div>
<div><b>feedback</b><span>내가 준 교정, 내가 좋다고 한 방식</span></div>
<div><b>project</b><span>진행 중인 일 · 기한 · 결정</span></div>
<div><b>reference</b><span>바깥 자료가 어디 있는지</span></div>
</div>

<p class="thesis">코드를 보면 알 수 있는 것은 <em>일부러 적지 않습니다</em>. CLAUDE.md 에 이미 있는 말도 적지 않습니다. 매 세션 남기는 것도 아닙니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「How Claude remembers your project · Auto memory」 docs/en/memory</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-F · 기억과 지침</p>

# /memory

<p class="lead">무엇이 쌓였는지 <em>열어서 봅니다</em>. 전부 그냥 텍스트 파일입니다.</p>

<div class="deflist">
<div><b>여는 법</b><span><code>/memory</code> — 지침 파일들과 메모리 폴더가 목록으로</span></div>
<div><b>고치기</b><span>골라서 편집기로 엽니다. 지워도 됩니다</span></div>
<div><b>끄기</b><span>같은 화면의 자동 메모리 토글</span></div>
<div><b>지금 올라온 것</b><span><code>/context</code> 의 Memory files</span></div>
</div>

<p class="thesis">「이건 기억해 둬」라고 하면 <em>자동 메모리</em>로 갑니다. CLAUDE.md 에 넣으려면 「CLAUDE.md 에 넣어 줘」라고 짚어 말합니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「How Claude remembers your project · Audit and edit your memory」</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-F · 기억과 지침</p>

# 첫 마디 전의 창

<p class="lead">지침은 <em>내가 말을 걸기 전에</em> 이미 들어가 있습니다. <code>/context</code> 로 확인합니다.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/ctx-on.png" alt="터미널의 /context 출력. 시작 직후인데 30.7k 토큰이 차 있고, 항목별로 시스템 프롬프트 5.2k, 시스템 도구 17.9k, 커스텀 에이전트 2.7k, 메모리 파일 1.5k, 스킬 3.4k 로 나뉘어 있다. 주고받은 말은 8토큰뿐이다" />
<figcaption>같은 폴더에서 <em>말 걸기 전에</em> 찍은 화면</figcaption>
</figure>

<p class="thesis">주고받은 말은 <em>8토큰</em>인데 이미 30.7k 입니다. CLAUDE.md 를 치우면 메모리 파일 줄이 <em>266토큰</em>으로 내려갑니다.</p>

<p class="src">근거 — 데모 폴더 「현장일지」에서 CLAUDE.md 유무만 바꿔 두 번 실행 · 나머지 조건 동일</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-F · 기억과 지침</p>

# 시키지 않은 것

<p class="lead">지시는 <code>이번 주 일지 정리해서 주간 보고 만들어줘</code> 한 줄. <em>형식도 규칙도</em> 말하지 않았습니다.</p>

<figure class="shot band nochrome term mark-ok" data-origin="capture">
<img src="./images/term/claudemd-answer.png" alt="결과 요약. 기준 초과 3건을 모두 실었고, 반복을 따로 묶었고, 합계는 계산값임을 표시했고, 정비 소요 시간을 적었다고 보고한다" />
<figcaption>돌아온 답 — 네 줄 모두 <em>CLAUDE.md 에 적어 둔 항목</em></figcaption>
</figure>

<p class="src">근거 — CLAUDE.md 「요약에 반드시 들어가야 하는 것」 4항목 · 원본 일지 3건 · 입력은 저 한 줄뿐</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-F · 기억과 지침</p>

# 판단이 갈린 자리

<p class="lead">「추정하지 않는다」 한 줄을 적어 두면 <em>모르는 것을 모른다고</em> 말합니다.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/claudemd-judge.png" alt="같은 답변의 뒷부분. 목요일 금요일 일지가 없다는 것, 8월 26일 76도를 원문은 기준 근접이라 적었지만 기준 75도로 보면 넘는다는 것, 장력은 기준값이 일지에 없어 기준 초과가 아니라 반복으로 넣었다는 것 세 가지를 짚어 두었다" />
<figcaption>같은 답의 뒷부분 — 스스로 <em>애매한 세 곳</em>을 꺼내 놓습니다</figcaption>
</figure>

<p class="thesis">지침이 없으면 이 세 가지는 <em>조용히 채워집니다</em>. 없는 기준값을 만들거나, 빠진 이틀을 티 안 나게 넘어갑니다.</p>

<p class="src">근거 — CLAUDE.md 「추정. 일지에 적히지 않은 원인을 지어내지 않습니다」 · 「기준을 만들어 쓰지 않습니다」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-G · 확장</p>

# 슬래시 명령

<p class="lead">입력창에 <em><code>/</code> 한 글자</em>를 치면 지금 쓸 수 있는 명령이 전부 뜹니다.</p>

<div class="deflist">
<div><b>여는 법</b><span><code>/</code> 를 치고 글자를 이어 넣어 좁힙니다</span></div>
<div><b>쓰는 자리</b><span>메시지 <em>맨 앞</em>에서만 명령으로 읽힙니다</span></div>
<div><b>뒤에 붙인 말</b><span>그 명령에 넘기는 값이 됩니다</span></div>
</div>

<p class="thesis">오타가 나면 아무것도 강조되지 않습니다. 그대로 Enter 를 치면 「Unknown command」 가 돌아옵니다. Tab 이나 화살표로 골라야 실행됩니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Commands」 docs/en/commands</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-G · 확장</p>

# 자주 쓰는 명령 8개

<p class="lead">백 개가 넘게 있지만, 처음 두 주 동안 실제로 손이 가는 건 <em>여덟 개</em>입니다.</p>

| 명령 | 언제 씁니까 |
|---|---|
| `/clear` | 다른 일로 넘어갈 때. 대화 맥락을 비웁니다 |
| `/compact` | 대화가 길어졌는데 하던 일은 이어가야 할 때 |
| `/rewind` | 잘못 시켰을 때. 코드와 대화를 되돌립니다 |
| `/plan` | 큰 작업 전에. 계획부터 받습니다 |
| `/model` · `/effort` | 모델과 공들이는 정도를 바꿉니다 |
| `/usage` | 얼마나 썼는지 (앱은 사용량 고리) |
| `/init` | 새 프로젝트에서 CLAUDE.md 를 만듭니다 |

<div class="callout"><b>주의</b> 목록은 사람마다 다릅니다. 요금제와 환경에 따라 <em>안 뜨는 명령</em>이 있습니다.</div>

<p class="src">출처 — Claude Code 공식 문서 「Commands · All commands」 docs/en/commands</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-G · 확장</p>

# 스킬

<p class="lead">같은 지시를 <em>세 번째</em> 붙여넣고 있다면, 거기가 스킬로 만들 자리입니다.</p>

<div class="deflist">
<div><b>무엇인가</b><span><code>SKILL.md</code> 파일 하나에 적어 둔 절차</span></div>
<div><b>부르는 법</b><span><code>/스킬이름</code>. 폴더 이름이 곧 명령 이름</span></div>
<div><b>알아서 부르기</b><span>설명이 지금 일과 맞으면 스스로 씁니다</span></div>
</div>

<p class="thesis">CLAUDE.md 와 갈리는 지점은 <em>쓸 때만 읽힌다</em>는 것입니다. 길게 적어 두어도 안 쓰는 동안에는 비용이 거의 없습니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Extend Claude with skills」 docs/en/skills</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-G · 확장</p>

# SKILL.md 두 덩어리

<p class="lead"><code>---</code> 사이가 <em>머리말</em>, 그 아래가 시키는 말입니다.</p>

```markdown
---
description: 주간 보고 초안을 만든다. 「주간 보고」라고 하면 쓴다.
---

지난주 커밋과 회의록을 훑어 다섯 줄로 정리한다.
숫자는 어디서 나온 값인지 함께 적는다.
```

<p class="thesis">머리말은 <code>description</code> 한 줄이면 충분합니다. 나머지 항목은 전부 선택입니다. 이 한 줄을 보고 <em>언제 꺼내 쓸지</em>를 판단합니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Skills · Frontmatter reference」 docs/en/skills</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-G · 확장</p>

# 스킬 두는 자리

<p class="lead">파일을 <em>어디에 두느냐</em>가 곧 누가 쓰느냐입니다.</p>

| 자리 | 경로 | 적용 범위 |
|---|---|---|
| 개인 | `~/.claude/skills/이름/SKILL.md` | 내 모든 프로젝트 |
| 프로젝트 | `.claude/skills/이름/SKILL.md` | 이 프로젝트만 |
| 플러그인 | 플러그인 안 `skills/` | 그 플러그인을 켠 곳 |

<div class="callout"><b>이름이 겹치면</b> 개인 것이 프로젝트 것을 덮습니다. 플러그인 스킬만 <code>/플러그인이름:스킬이름</code> 이라 애초에 겹치지 않습니다.</div>

<p class="src">출처 — Claude Code 공식 문서 「Skills · Where skills live」 docs/en/skills</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-G · 확장</p>

# 스킬이 열리는 자리

<p class="lead">스킬 이름을 부르지 않았습니다. <em>머리말 한 줄</em>을 보고 알아서 엽니다.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/skill-open.png" alt="터미널 화면. 「3호 압연기가 얼마나 자주 서는지 궁금해. 고장 간격 좀 뽑아줘」 라고 입력하자 Skill(설비-신뢰도) 이 호출되고 스킬을 불러왔다는 줄이 뜬 뒤 파일을 읽기 시작한다" />
<figcaption>입력에 「스킬」도 「신뢰도」도 없는데 <em>설비-신뢰도</em>가 열렸습니다</figcaption>
</figure>

<p class="thesis">머리말에 「설비가 얼마나 자주 서는지 같은 요청이 오면 연다」라고 적어 둔 <em>한 줄</em>이 한 일입니다.</p>

<p class="src">근거 — 데모 폴더 <code>.claude/skills/설비-신뢰도/SKILL.md</code> · 프로젝트 스코프 · 입력은 저 한 줄</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-G · 확장</p>

# 절차대로 나온 표

<p class="lead">스킬에 적어 둔 <em>계산 순서와 표 모양</em>이 그대로 나옵니다.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/skill-table.png" alt="지표 표. 조업 시간 28시간 40분, 정지 시간 1시간 20분, 가동시간 27시간 20분, MTBF 27시간 20분, MTTR 1시간 20분, 가동률 95.3 퍼센트. 각 행마다 계산에 쓴 값이 적혀 있고 계산값이라는 표시가 붙어 있다" />
<figcaption>스킬이 정한 <em>지표 · 값 · 계산에 쓴 값</em> 세 칸 그대로</figcaption>
</figure>

<p class="src">근거 — SKILL.md 「3. 결과를 이렇게 낸다」의 표 머리와 동일 · 일지 3건에서 산출</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-G · 확장</p>

# 스킬이 막은 것

<p class="lead">숫자보다 중요한 건 <em>그 숫자를 믿으면 안 되는 이유</em>입니다.</p>

<figure class="shot band nochrome term mark-ok" data-origin="capture">
<img src="./images/term/skill-caveat.png" alt="표 아래 붙은 단서. 사건 수가 1건이라 평균값의 의미가 제한적이고 MTBF 는 관측된 간격이 아니라는 설명, 조업 시간을 어느 일지 몇 줄에서 가져왔는지, 3호 압연기 단독 가동시간은 일지에 없다는 내용" />
<figcaption>표 아래에 자동으로 붙은 네 줄</figcaption>
</figure>

<p class="thesis">「사건 수가 3건 미만이면 그렇게 적는다」와 「어느 일지 몇 줄에서 가져왔는지 밝힌다」를 스킬에 넣어 둔 결과입니다. <em>한 번 적어 두면 매번 붙습니다</em>.</p>

<p class="src">근거 — SKILL.md 「표 아래에 반드시 두 줄을 붙인다」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-G · 확장</p>

# MCP

<p class="lead">다른 프로그램에서 <em>복사해 붙여넣고</em> 있다면, 그 자리가 MCP 자리입니다.</p>

<div class="deflist">
<div><b>무엇인가</b><span>바깥 도구를 붙이는 공용 규격</span></div>
<div><b>붙이면</b><span>붙여넣기 대신 그 도구를 직접 읽고 씁니다</span></div>
<div><b>예</b><span>이슈 트래커 · 데이터베이스 · 피그마 · 슬랙</span></div>
<div><b>대가</b><span>붙인 서버마다 맥락을 조금씩 먹습니다</span></div>
</div>

<p class="thesis">안 쓰는 서버는 떼는 편이 낫습니다. 도구 이름과 설명이 <em>매 세션</em> 함께 실리기 때문입니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「MCP · What you can do with MCP」 docs/en/mcp</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-G · 확장</p>

# 어디서 온 도구인가

<p class="lead">붙은 서버는 <code>/mcp</code> 에서 <em>출처별로 묶여</em> 보입니다.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/mcp-scope.png" alt="슬래시 mcp 화면의 일부. 프로젝트 MCP 항목 아래에 데모 폴더의 점 mcp 점 json 경로와 playwright 서버가 연결됨 24개 도구로 표시되고, 그 아래 사용자 MCP 항목에 홈 폴더 설정 파일 경로와 stitch 서버가 연결됨 15개 도구로 표시된다" />
<figcaption>같은 화면 안에서 <em>프로젝트</em>와 <em>사용자</em>가 갈립니다</figcaption>
</figure>

<p class="thesis">서버마다 도구 개수가 붙습니다. 24개, 15개처럼 <em>이 숫자가 곧 맥락 비용</em>입니다. 안 쓰면 떼는 편이 낫습니다.</p>

<p class="src">근거 — 데모 폴더에서 <code>/mcp</code> 실행 · 프로젝트 스코프 1개와 사용자 스코프 1개</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-G · 확장</p>

# 플러그인

<p class="lead">스킬·에이전트·훅·MCP 서버를 <em>한 묶음</em>으로 받아 켭니다.</p>

<div class="steps">
<div><b>마켓플레이스 추가</b><span>공식 목록은 처음 실행할 때 자동으로 붙습니다</span></div>
<div><b>고르기</b><span><code>/plugin</code> 을 열고 Discover 탭에서 훑습니다</span></div>
<div><b>범위 정하기</b><span>나만 · 이 저장소만 · 팀 공유 중 하나</span></div>
</div>

<p class="thesis">설치 화면에 <em>맥락 비용</em>과 무엇이 딸려 오는지가 먼저 나옵니다. 그걸 보고 정합니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Discover and install prebuilt plugins」 docs/en/discover-plugins</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-G · 확장</p>

# 커뮤니티 확장 두 가지

<p class="lead">공식 목록 밖에도 <em>작은 문제 하나</em>를 겨냥한 플러그인과 스킬이 있습니다.</p>

<div class="duo">
<div class="pane">
<h3>Caveman</h3>
<p>응답의 주변 설명을 짧게 줄이는 <em>skill</em>입니다. 코드·명령·파일 경로·정확한 오류 문구는 그대로 두고, 말로 된 부분만 압축합니다.</p>
</div>
<div class="pane">
<h3>Ponytail</h3>
<p><em>YAGNI</em>를 지키는 plugin입니다. 재사용·표준 기능·네이티브 기능을 먼저 살펴보고, 꼭 필요한 만큼만 구현하게 합니다.</p>
</div>
</div>

<p class="thesis">둘 다 Anthropic 공식 기능이 아니라 커뮤니티 저장소의 사례입니다. <em>유명해서</em>가 아니라 내 작업과 맞을 때만 고릅니다.</p>

<p class="src">사례 — <a href="https://github.com/juliusbrussee/caveman">github.com/juliusbrussee/caveman</a> · <a href="https://github.com/dietrichgebert/ponytail">github.com/dietrichgebert/ponytail</a></p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-G · 확장</p>

# README 예시로 감 잡기

<p class="lead">두 저장소가 말하는 변화는 <em>결과의 방향</em>을 보여 주는 예시입니다.</p>

| | 길게·많이 만들기 | 짧게·필요한 만큼 만들기 |
|---|---|---|
| **Caveman** | `A component re-renders because an inline object prop creates a new reference...` | `New object ref each render. Inline object prop = new ref = re-render. Use useMemo.` |
| **Ponytail** | `flatpickr` 설치 · 래퍼 컴포넌트 · 스타일시트 | `<input type="date">` |

<div class="callout"><b>읽는 법</b> README에 공개된 전후 예시입니다. 모델·작업·프롬프트에 따라 달라지므로 <em>보장된 절약량</em>으로 읽지 않습니다.</div>

<p class="thesis">사람들의 반응도 같습니다. 출력은 줄어도 규칙 자체의 비용은 남고, 기준 프롬프트가 달라지면 벤치마크도 크게 달라집니다. 먼저 <em>내 작업 하나</em>로 확인합니다.</p>

<p class="src">근거 — 각 저장소 README 「Before / After」 · <a href="https://github.com/dietrichgebert/ponytail/issues/126">Ponytail 이슈 #126</a> · <a href="https://github.com/juliusbrussee/caveman/issues/550">Caveman 이슈 #550</a></p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-G · 확장</p>

# 설치하고 시험하기

<p class="lead">처음부터 둘 다 켜지 말고, <em>새 폴더·새 세션에서 하나씩</em> 비교합니다.</p>

<div class="duo">
<div class="pane">
<h3>Caveman · PowerShell</h3>
<p><code>claude plugin marketplace add JuliusBrussee/caveman</code><br><code>claude plugin install caveman@caveman</code><br><br>스킬만 가볍게 써 보려면 <code>npx skills add JuliusBrussee/caveman</code> 도 됩니다.</p>
</div>
<div class="pane">
<h3>Ponytail · Claude Code</h3>
<p><code>/plugin marketplace add DietrichGebert/ponytail</code><br><code>/plugin install ponytail@ponytail</code><br><br>두 명령을 <em>각각</em> 실행합니다. 자동 활성화 훅까지 쓰려면 Node.js가 PATH에 있어야 합니다.</p>
</div>
</div>

<div class="steps tight">
<div><b>1 · 확인</b><span>설치 화면의 Context cost · Will install · 범위를 읽습니다</span></div>
<div><b>2 · 한 가지 요청</b><span>「날짜 입력 필드 하나만 있는 HTML을 만들어줘」를 플러그인 유무로 비교합니다</span></div>
</div>

<p class="thesis"><em>보안:</em> 출처·설치 파일을 확인합니다. 플러그인은 내 권한으로 실행됩니다.</p>

<p class="src">설치 문법·주의 — <a href="https://code.claude.com/docs/ko/discover-plugins">Claude Code 공식 문서 「플러그인 발견 및 설치」</a> · 설치 예시 — 각 저장소 README</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-G · 확장</p>

# 2571개 중에서

<p class="lead">기준은 하나입니다. <em>내가 반복해서 시키던 일</em>인가.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/plugin-discover.png" alt="플러그인 목록 화면. 전체 2571개 중 첫 화면이고 검색창 아래에 frontend-design 120만 설치, superpowers 110만 설치, code-review 46.4만 설치, context7 43.7만 설치가 설명 한 줄씩과 함께 나열되어 있다" />
<figcaption>설치 수가 함께 뜹니다. 목록 자체는 <em>고르는 기준이 되지 않습니다</em></figcaption>
</figure>

<p class="thesis">많이 깔린 것이 나에게 맞는 것은 아닙니다. 이 목록에서 고르지 말고, <em>지난주에 두 번 이상 시킨 일</em>을 떠올린 다음 그걸 검색합니다.</p>

<p class="src">근거 — <code>/plugin</code> Discover 탭 · 2026년 8월 30일 기준</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-G · 확장</p>

# 켜져 있는 것 세기

<p class="lead">스킬·MCP·플러그인이 <em>한 화면</em>에 모입니다. 얼마나 먹는지도 같이.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/plugin-installed.png" alt="설치됨 탭. 플러그인 세 개와 MCP 서버들이 출처별로 묶여 있고, 스킬 목록에는 slidev-deck-builder 가 85토큰 사흘간 9회, slidev-deck-builder-lab 이 100토큰 한 번도 안 씀, 설비-신뢰도가 프로젝트 스코프 26토큰 오늘 1회로 표시된다" />
<figcaption>항목마다 <em>토큰</em>과 <em>마지막으로 쓴 때</em>가 붙습니다</figcaption>
</figure>

<p class="thesis">「한 번도 안 씀」과 「52일째 안 씀」이 정리 대상입니다. 붙여만 두고 안 쓰는 것이 <em>매 세션 자리를 먹습니다</em>.</p>

<p class="src">근거 — <code>/plugin</code> Installed 탭 · 강사 노트북 실제 상태</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-G · 확장</p>

# 언제 무엇을 붙이나

<div class="split evidence">
<div>

<p class="lead">넷을 다 배웠으니 남는 건 하나입니다 — <em>그래서 언제 뭘 쓰나</em>.</p>

| 이런 일이 생기면 | 이걸 붙입니다 |
|---|---|
| 같은 규칙을 두 번 틀린다 | CLAUDE.md |
| 같은 절차를 세 번 시켰다 | 스킬 |
| 바깥 도구의 데이터가 필요하다 | MCP |
| 매번 잊지 않고 해야 할 게 있다 | 훅 |

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/features-overview#build-your-setup-over-time">
<img src="./images/docs/setup-over-time.png" alt="공식 문서의 표. 어떤 상황이 생기면 무엇을 추가하라는 짝이 여러 줄로 정리되어 있다" />
<figcaption>원문 · <a href="https://code.claude.com/docs/en/features-overview#build-your-setup-over-time"><code>features-overview#build-your-setup-over-time</code></a></figcaption>
</figure>
</div>

<p class="thesis">처음부터 다 갖추지 않습니다. <em>걸릴 때마다 하나씩</em> 붙입니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Features overview · Build your setup over time」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-H · 컴퓨터 제어</p>

# 화면 제어 4단계

<p class="lead">화면을 직접 움직이는 건 <em>마지막 수단</em>입니다. 위에서부터 되는 게 있으면 그걸 씁니다.</p>

<figure class="figure mark-none">
<svg viewBox="0 0 900 300" role="img" aria-label="위에서부터 커넥터·MCP, 터미널 명령, 브라우저, 컴퓨터 제어 네 단계. 위로 갈수록 정확하고 빠르며, 아래로 갈수록 무엇이든 되지만 느리고 위험하다">
  <g style="font-family: var(--mono); font-size: 15px;" fill="var(--ink)">
    <g style="fill: var(--card); stroke: var(--rule); stroke-width: 1.5;">
      <rect x="120" y="16" width="640" height="52" rx="9"/>
      <rect x="120" y="80" width="640" height="52" rx="9"/>
      <rect x="120" y="144" width="640" height="52" rx="9"/>
    </g>
    <rect x="120" y="208" width="640" height="52" rx="9" style="fill: var(--card); stroke: var(--rule); stroke-width: 1.5;"/>
    <text x="150" y="48" style="font-weight: 700;">① 커넥터 · MCP</text>
    <text x="420" y="48" style="font-size: 14px;" fill="var(--dim)">붙여 둔 도구가 있으면 그걸로</text>
    <text x="150" y="112" style="font-weight: 700;">② 터미널 명령</text>
    <text x="420" y="112" style="font-size: 14px;" fill="var(--dim)">명령 한 줄로 끝나는 일이면 그걸로</text>
    <text x="150" y="176" style="font-weight: 700;">③ 브라우저</text>
    <text x="420" y="176" style="font-size: 14px;" fill="var(--dim)">웹에서 하는 일이면 브라우저로</text>
    <text x="150" y="240" style="font-weight: 700;">④ 컴퓨터 제어</text>
    <text x="420" y="240" style="font-size: 14px;" fill="var(--dim)">위 셋으로 안 되면 그제야 마우스를</text>
    <g style="stroke: var(--rule); stroke-width: 1.5;" fill="none">
      <path d="M62 52 V222"/>
      <path d="M56 216 L62 224 L68 216"/>
    </g>
    <text x="62" y="32" style="font-size: 13px;" fill="var(--dim)" text-anchor="middle">좁고 정확</text>
    <text x="62" y="250" style="font-size: 13px;" fill="var(--dim)" text-anchor="middle">넓고 느림</text>
  </g>
</svg>
<figcaption>정확한 것부터 씁니다. 화면 제어는 아무것도 안 될 때만 켜집니다</figcaption>
</figure>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · When computer use applies」 docs/en/desktop</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-H · 컴퓨터 제어</p>

# 브라우저 패널

<div class="split evidence">
<div>

<p class="lead">앱 안에 브라우저가 하나 들어 있습니다. <em>Ctrl+Shift+B</em>.</p>

<div class="deflist">
<div><b>만든 화면</b><span>개발 서버를 띄우고 그 안에서 엽니다</span></div>
<div><b>그 밖의 파일</b><span>HTML · PDF · 이미지 · 영상도 열립니다</span></div>
<div><b>바깥 사이트</b><span>탭 브라우저라 문서·게시판도 나란히</span></div>
</div>

<p class="thesis">고친 뒤에 <em>스스로 눌러 보고</em> 화면을 찍어 확인합니다. 기본값이 그렇습니다.</p>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/whats-new/2026-w28">
<img src="./images/official/desktop-browser-crop.png" alt="데스크톱 앱 화면. 왼쪽 대화에 브라우저를 조작한 기록과 고친 코드가 쌓여 있고, 오른쪽 브라우저 패널에 만든 주문 화면이 떠 있다" />
<figcaption>실제 화면 · <a href="https://code.claude.com/docs/en/whats-new/2026-w28"><code>whats-new/2026-w28</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · Preview your app / Browse external sites」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-H · 컴퓨터 제어</p>

# 사이트 승인

<p class="lead">바깥 사이트에서 처음 뭔가를 하려 하면 <em>카드가 뜨고 멈춥니다</em>.</p>

<div class="trio">
<div class="pane"><h3>한 번만 허용</h3><p>이번 동작만 지나갑니다. 아무것도 저장하지 않습니다.</p></div>
<div class="pane"><h3>항상 허용</h3><p>이 사이트만 기억합니다. <em>서브도메인도 따로</em> 받습니다. 설정에서 취소할 수 있습니다.</p></div>
<div class="pane"><h3>거부</h3><p>하지 않습니다.</p></div>
</div>

<div class="callout"><b>승인해도 안 하는 것</b> 결제 · 계정 생성 · CAPTCHA 우회는 <em>사람 손을 기다립니다</em>. 내 개발 서버와 프로젝트 파일은 반대로 묻지 않습니다.</div>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · Approve Claude's actions on a site」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-H · 컴퓨터 제어</p>

# 브라우저 패널 vs Chrome

<p class="lead">갈리는 건 하나입니다. <em>내 로그인 상태가 필요한가</em>.</p>

<div class="duo">
<div class="pane"><h3><span class="latin">IN-APP</span>브라우저 패널</h3><p>앱이 따로 쓰는 깨끗한 프로필입니다. 저장된 로그인도 방문 기록도 없습니다. 내가 만든 화면을 확인하고, 로그인이 필요 없는 사이트를 볼 때.</p></div>
<div class="pane"><h3><span class="latin">CHROME</span>Claude in Chrome</h3><p>평소 쓰는 크롬을 그대로 씁니다. 이미 로그인해 둔 사내 시스템이나 구글 문서를 다뤄야 할 때. 확장 프로그램을 따로 설치합니다.</p></div>
</div>

<p class="thesis">크롬 연동은 <em>WSL 에서는 안 됩니다</em>. Windows 로 WSL 세션을 쓴다면 이 점을 먼저 확인합니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Choose between the Browser and the Chrome extension」 · 「Chrome extension」 docs/en/chrome</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-H · 컴퓨터 제어</p>

# Playwright MCP

<p class="lead">세 번째 브라우저입니다. <em>내 PC의 Chromium</em>을 MCP 로 붙입니다.</p>

<div class="deflist">
<div><b>누가</b><span>Microsoft. 웹 테스트 도구 Playwright 의 MCP 서버판</span></div>
<div><b>어떻게 보나</b><span>화면 픽셀이 아니라 <em>접근성 트리</em>를 글자로 읽습니다. 그림을 안 봐도 버튼과 제목을 압니다</span></div>
<div><b>되는 일</b><span>열기 · 읽기 · 클릭 · 입력 · 캡처. 도구 24개</span></div>
<div><b>어디서 도나</b><span>내 컴퓨터. 앱 안의 브라우저 패널도, 내 크롬도 아닌 <em>별도 Chromium</em></span></div>
</div>

<p class="thesis">앞의 둘과 갈리는 건 <em>요청을 누가 보내느냐</em>입니다. 여기서는 Anthropic 이 아니라 내 PC 가 보냅니다.</p>

<p class="src">출처 — microsoft/playwright-mcp README 「uses Playwright's accessibility tree, not pixel-based input」 · 도구 수는 앞 장 <code>/mcp</code> 화면</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-H · 컴퓨터 제어</p>

# Playwright MCP 붙이기

<p class="lead">한 줄이면 붙습니다. <em>Node.js 18 이상</em>이 있어야 합니다.</p>

```bash
claude mcp add playwright -- npx @playwright/mcp@latest
```

<div class="steps">
<div><b>확인</b><span>새 세션에서 <code>/mcp</code> → playwright 가 <code>connected</code> 로 보이면 됩니다. 팀과 나누려면 <code>--scope project</code></span></div>
<div><b>옵션</b><span><code>--headless</code> 창 없이 · <code>--browser chrome</code> 내 크롬 채널로 · <code>--isolated</code> 프로필을 디스크에 남기지 않고</span></div>
<div><b>떼기</b><span><code>claude mcp remove playwright</code>. 잠깐 끄기만 하려면 <code>/mcp</code> 에서 토글</span></div>
</div>

<p class="thesis">첫 호출은 느립니다. <code>npx</code> 가 패키지를 받고 Chromium 을 띄우는 시간입니다. <em>두 번째부터</em> 빨라집니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「MCP · Add an MCP server」 docs/en/mcp · microsoft/playwright-mcp README 「Configuration」</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-H · 컴퓨터 제어</p>

# 없다고 말하기

<p class="lead">화면을 볼 수 있으면 <em>내 질문이 틀렸을 때</em> 그렇다고 답합니다.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/mcp-run.png" alt="터미널 화면. 「플레이라이트로 주소를 열어서 첫 화면 맨 위에 있는 KPI 카드들의 제목과 숫자를 그대로 읽어와줘」 라는 입력에 대해, 파일 2건을 읽고 playwright 를 4번 호출한 뒤 「페이지는 열렸지만 첫 화면에 KPI 카드가 없습니다. 읽어올 제목과 숫자가 존재하지 않아 그대로 보고합니다」 라고 답한다" />
<figcaption>「맨 위 KPI 카드」는 <em>내가 잘못 안 것</em>이었습니다</figcaption>
</figure>

<p class="thesis">브라우저를 붙이지 않았다면 그럴듯한 카드 이름 다섯 개가 돌아왔을 겁니다. <em>확인할 수단</em>이 있으면 거짓말을 할 이유가 없어집니다.</p>

<p class="src">근거 — Playwright MCP 를 붙인 세션 · 대상은 우리 예제 1 배포본</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-H · 컴퓨터 제어</p>

# 두 번 올려 가른 것

<p class="lead">CSV 를 올렸더니 컬럼을 못 읽었습니다. <em>같은 파일에 BOM 만 붙여</em> 다시 올렸습니다.</p>

<figure class="shot band nochrome term mark-ok" data-origin="capture">
<img src="./images/term/mcp-bom.png" alt="A/B 결과 표. BOM 없는 파일은 실패로 일자·라인·생산량(톤)·불량량(톤) 네 컬럼을 미인식, BOM 있는 파일은 성공으로 대시보드가 렌더링됨. 그 아래 원인이 앱 번들의 XLSX.read 호출이며 SheetJS 가 BOM 없는 CSV 를 latin1 로 디코딩해 한글 헤더가 깨진다는 설명이 붙어 있다" />
<figcaption>내용은 같고 <em>맨 앞 3바이트</em>만 다른 두 파일</figcaption>
</figure>

<p class="thesis">사람이 화면만 보고는 알 수 없는 원인입니다. 직접 눌러 볼 수 있어야 <em>추측이 실험</em>이 됩니다.</p>

<p class="src">근거 — 같은 세션 · 앱 번들 <code>3gi4nspxwc8-z.js</code> 의 <code>XLSX.read(arrayBuffer, {type:"array"})</code> 확인</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-H · 컴퓨터 제어</p>

# 화면에서 읽어 온 값

<p class="lead">고친 파일을 올린 뒤, <em>실제로 뜬 카드</em>를 그대로 옮겨 왔습니다.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/mcp-cards.png" alt="KPI 카드 표. 총 생산량 442.2톤 전월 대비 25.6퍼센트 증가, 불량률 2.46퍼센트 0.46퍼센트포인트 감소, 가동률 90.1퍼센트, 목표 달성률 101.8퍼센트, 종합효율 OEE 89.4퍼센트. 각 행에 산식이 함께 적혀 있다" />
<figcaption>카드 다섯 개 · 전월 대비 · <em>산식까지</em> 읽어 왔습니다</figcaption>
</figure>

<p class="src">근거 — 같은 세션이 만든 예시 CSV 22행을 업로드한 결과 · 실제 실적이 아닌 가상 데이터</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-H · 컴퓨터 제어</p>

# 도구가 흘린 파일

<p class="lead">브라우저 도구가 캡처 파일을 폴더에 떨어뜨렸고, <em>지침에 걸렸습니다</em>.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/mcp-cleanup.png" alt="터미널 화면. 스크린샷과 스냅샷이 프로젝트 폴더 루트에 저장돼서 CLAUDE.md 의 「새 파일은 보고 폴더 아래에만」 규칙에 어긋나 삭제했다고 보고하고, 원본 일지는 건드리지 않았다고 덧붙인다" />
<figcaption>시키지 않았는데 <em>스스로 치우고 보고</em>했습니다</figcaption>
</figure>

<p class="thesis">도구를 붙이면 그 도구의 부작용도 같이 옵니다. <em>「어디에 파일을 만든다」</em>를 지침에 적어 두면 그 부작용까지 걸립니다.</p>

<p class="src">근거 — CLAUDE.md 「새 파일은 <code>보고/</code> 아래에만 만듭니다」 · Playwright MCP 가 만든 <code>.playwright-mcp/</code></p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-H · 실습 · 15분</p>

# 같은 부탁, 다른 도구

<p class="lead">같은 요청을 두 번 보냅니다. 도구를 안 정하고 한 번, <em>Playwright 를 지정해서</em> 한 번.</p>

<p>대상은 네이버 뉴스 경제 탭입니다. 시키기 전에 그 사이트의 규칙부터 봅니다.</p>

```text
$ curl -s https://news.naver.com/robots.txt
User-agent: *
Disallow: /
…
User-agent: ClaudeBot
Disallow: /
```

<p class="thesis"><em>모든 봇에게 모든 경로 금지</em>입니다. 이 상태에서 무엇이 멈추고 무엇이 지나가는지 봅니다.</p>

<p class="src">A 는 각자 따라 합니다. B 는 강사가 시연합니다 · robots.txt 는 2026년 9월 10일 확인 · Playwright 는 <em>B 직전에</em> 붙입니다</p>

<!--
강사: Playwright MCP 가 A 시점에 이미 붙어 있으면 Claude 가 알아서 Playwright 로 넘어가 대조가 안 됩니다. 붙어 있다면 A 는 `claude --strict-mcp-config` 로 시작합니다.
B 를 수강생 전원이 돌리지 않는 이유도 말해 둡니다. robots.txt 가 전면 금지한 사이트에 30명이 동시에 들어가는 건 이 실습의 취지와 어긋납니다.
-->

---
class: top-led brand-cc band-page compact
---

<p class="eyebrow">1-H · 실습 A</p>

# 그냥 시킨다

<p class="lead">MCP 없이 시작합니다. 화면 첫 줄이 보낸 문장입니다. <em>도구 이름은 없습니다</em>.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/robots-fetch.png" alt="터미널 화면. 네이버 뉴스 경제 탭 주소로 최신 뉴스 10개를 가져오라는 입력에 대해 Fetch 를 시도하고 Claude Code is unable to fetch from news.naver.com 오류가 난다. 이어 WebFetch 가 차단되어 브라우저 자동화 도구로 진행하겠다며 claude-in-chrome 을 두 번 호출하고, 모바일 주소 m.news.naver.com 으로 다시 Fetch 를 시도해 같은 오류를 받는다" />
<figcaption>Fetch 오류 → Chrome 확장 → 모바일 주소로 다시 → 또 오류</figcaption>
</figure>

<p class="thesis">Anthropic 쪽 도구 둘이 <em>차례로 멈췄습니다</em>. 오류 문구에 이유는 없지만, robots.txt 를 포함한 자체 제한에 걸린 것입니다.</p>

<p class="src">근거 — 강사 노트북 · <code>claude --strict-mcp-config</code> · 공식 문서 「Web fetch tool」의 <code>url_not_allowed</code> 항목에 robots.txt 가 포함됩니다</p>

---
class: top-led brand-cc band-page compact
---

<p class="eyebrow">1-H · 실습 A</p>

# 멈춘 뒤에 내미는 것

<p class="lead">막히자 <em>대안을 제안합니다</em>. 1번이 「Chrome 확장에서 이 사이트를 직접 허용해 달라」입니다.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/robots-ask.png" alt="터미널 화면. 네이버 뉴스에 두 가지 방법 모두 막혔다고 정리하고, 추측이나 오래된 정보로 채워서 드리고 싶지는 않다고 말한 뒤 진행 방법을 묻는 선택 카드가 뜬다. 1번 Chrome 확장에서 직접 권한 허용, 2번 다른 경제 뉴스 출처로 대체, 3번 직접 URL 복사해서 전달, 4번 직접 입력" />
<figcaption>여기서 멈춥니다. <em>거부</em>하고 이 화면을 그대로 둡니다</figcaption>
</figure>

<p class="thesis">도구는 울타리 안에서 멈췄고, 넘어가는 승인은 <em>내 손</em>에 있습니다. 승인하는 순간 책임도 같이 옵니다.</p>

<p class="src">근거 — 같은 세션 · 헤드리스로 돌리면 <code>curl -A "Mozilla/5.0 … Chrome/120.0"</code> 을 제안합니다. 크롬인 척하는 헤더까지 스스로 붙입니다</p>

<!--
강사: 프롬프트에 「우회하지 마」를 넣지 않습니다. Claude 가 스스로 우회를 제안하는 장면이 「도구 정책 vs 사용자 결정」의 경계를 가장 잘 보여줍니다.
수강생 화면마다 갈래가 다를 수 있습니다. 「어디서 멈췄나」와 「무엇을 제안했나」 두 가지만 확인하게 합니다.
-->

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-H · 실습 B</p>

# 도구를 지정한다

<p class="lead">세션을 나가서 붙이고, 다시 들어와 <em>도구 이름을 넣어</em> 같은 부탁을 합니다.</p>

```bash
claude mcp add playwright -- npx @playwright/mcp@latest
```

```text
Playwright MCP로 https://news.naver.com/section/101 에 접속해서 최신 뉴스 10개 제목과 링크를 가져와줘.
```

<div class="deflist">
<div><b>흐름</b><span><code>browser_navigate</code> → <code>browser_snapshot</code> → 제목 10개. 오류 없음, robots.txt 언급 없음</span></div>
<div><b>한 줄 더</b><span>끝나면 묻습니다. 「방금 접속할 때 robots.txt 를 확인했어?」</span></div>
</div>

<p class="thesis">「확인하지 않았다 · Playwright 에는 그런 검사가 없다」는 답이 <em>결론 장표를 대신합니다</em>.</p>

<p class="src">강사 시연 · microsoft/playwright-mcp 문서에는 robots.txt 라는 단어가 없습니다</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-H · 실습 확인</p>

# 갈린 자리

<p class="lead">프롬프트는 도구 이름 하나 차이였습니다. 갈린 건 <em>요청을 누가 보냈느냐</em>입니다.</p>

|  | A · 도구 미지정 | B · Playwright 지정 |
|---|---|---|
| 요청 주체 | Anthropic 쪽 fetcher · Chrome 확장 | 내 PC 의 Chromium |
| robots.txt | 확인 → 중단 | 확인 안 함 |
| 결과 | 실패 + 대안·우회 제안 | 성공 |
| 책임 | Anthropic 이 회피 | 사용자 |

<p class="thesis">「그럼 B 로 매일 수집해도 되나요?」 답은 되냐가 아니라 <em>누구 책임이냐</em>입니다. 규모 · 약관 · 저장과 재이용이 기준입니다.</p>

<p class="src">2일차 「코드 한 줄 쓰기 전에」 표로 이어집니다 — robots.txt · 이용약관 · 공개 API · 로그인</p>

<!--
강사: 정리표는 B 가 끝난 직후 띄웁니다. 결론 문장은 강사가 말하지 않고 B 의 마지막 답변이 대신하게 둡니다.
반론이 나오면 「되냐」로 답하지 않습니다. 한 번 보기와 매일 수백 건, 내부 참고와 재배포는 다른 일입니다. 이 연결이 실습을 「우회 방법 강의」로 읽히지 않게 하는 안전장치입니다.
끝나면 `claude mcp remove playwright` 로 떼거나 /mcp 에서 끄게 안내합니다.
-->

---
class: top-led brand-cc
---

<p class="eyebrow">1-H · 컴퓨터 제어</p>

# 컴퓨터 제어 켜기

<p class="lead">Windows에서는 <em>앱 설정의 토글 하나</em>로 시작합니다.</p>

<div class="steps">
<div><b>앱을 업데이트합니다</b><span>최신 Claude Desktop으로 올린 뒤 앱을 다시 시작합니다</span></div>
<div><b>Settings를 엽니다</b><span>Settings → General의 Desktop app 영역으로 갑니다</span></div>
<div><b>Computer use를 켭니다</b><span>토글을 켜면 Windows에서는 바로 적용됩니다</span></div>
</div>

<p class="thesis">토글이 보이지 않으면 <em>Pro 또는 Max 플랜</em>인지 확인하고, 업데이트 후 앱을 다시 시작합니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · Enable computer use」 <a href="https://code.claude.com/docs/ko/desktop#enable-computer-use"><code>desktop#enable-computer-use</code></a></p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-H · 컴퓨터 제어</p>

# 컴퓨터 제어

<div class="split evidence">
<div>

<p class="lead">CLI 도 API 도 없는 프로그램은 <em>마우스로 직접</em> 다룹니다.</p>

<div class="deflist">
<div><b>되는 일</b><span>앱 열기 · 클릭 · 타이핑 · 캡처</span></div>
<div><b>쓰는 자리</b><span>네이티브 앱 · 사내 전용 프로그램</span></div>
<div><b>조건</b><span>Pro·Max 요금제. <em class="warn">Team·Enterprise 는 안 됨</em></span></div>
<div><b>기본값</b><span>꺼져 있습니다. 설정에서 켭니다</span></div>
</div>

<p class="thesis">Windows 는 토글 하나, macOS 는 <em>권한 두 개</em>를 더 줍니다.</p>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/desktop#when-computer-use-applies">
<img src="./images/docs/computer-use.png" alt="공식 문서의 컴퓨터 제어 설명. 어떤 조건에서 켜지는지가 적혀 있다" />
<figcaption>원문 · <a href="https://code.claude.com/docs/en/desktop#when-computer-use-applies"><code>desktop#when-computer-use-applies</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Let Claude use your computer」 docs/en/desktop</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-H · 컴퓨터 제어</p>

# 일하는 동안

<p class="lead">시작하면 <em>다른 창이 숨습니다</em>. 승인한 앱만 화면에 남습니다.</p>

<div class="steps">
<div><b>시작</b><span>필요한 앱을 먼저 묻고, 승인한 앱만 만집니다</span></div>
<div><b>도중</b><span>무엇을 하는지 화면에 계속 알립니다</span></div>
<div><b>끝</b><span>승인은 그 세션 동안만. 닫으면 사라집니다</span></div>
</div>

<p class="thesis">한 번에 <em>한 세션</em>만 화면을 잡습니다. 멈추는 키는 <em class="warn">실행 중 뜨는 안내</em>에 적힌 대로 — 문서의 중단 키는 macOS·터미널 기준입니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · Let Claude use your computer」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-I · 잘 쓰는 법</p>

# 검증 수단 제공

<div class="split evidence">
<div>

<p class="lead">확인할 방법을 쥐어 주면 <em>스스로 고칩니다</em>. 안 주면 그 일을 사람이 합니다.</p>

<div class="deflist">
<div><b>검사거리</b><span>테스트 · 빌드 · 화면 대조. 통과/실패가 나오는 것</span></div>
<div><b>없으면</b><span>「그럴듯해 보임」이 유일한 신호가 됩니다</span></div>
<div><b>한 줄로</b><span>「만든 뒤 테스트를 돌려서 통과할 때까지 고쳐」</span></div>
</div>

<p class="thesis">「됐습니다」 대신 <em>증거</em>를 달라고 합니다. 돌린 명령과 그 결과, 또는 결과 화면 캡처.</p>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/best-practices#give-claude-a-way-to-verify-its-work">
<img src="./images/docs/verify-first.png" alt="공식 문서. 만든 것이 맞는지 스스로 확인할 방법을 먼저 주라고 적혀 있다" />
<figcaption>원문 · <a href="https://code.claude.com/docs/en/best-practices#give-claude-a-way-to-verify-its-work"><code>best-practices#give-claude-a-way-to-verify-its-work</code></a></figcaption>
</figure>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Best practices · Give Claude a way to verify its work」</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-I · 잘 쓰는 법</p>

# 확인할 수 없을 때

<p class="lead">파일만 열어 볼 수 있는 세션에 물었습니다. 답은 <em>가능성 네 개의 순위</em>였습니다.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/verify-off.png" alt="원인 추정 목록. 1번 인코딩을 EUC-KR로 강제 디코딩이 가장 유력하다고 적혀 있고, 2번 구분자 오판, 3번 헤더 행 인덱스 가정, 4번 BOM 은 가능성은 있지만 이번 증상과 맞지 않는다고 배제되어 있다. 괄호 안에 도구 제약상 BOM 유무만은 확정하지 못했다고 덧붙였다" />
<figcaption>1번이 「가장 유력」 · 실제 원인인 4번은 <em>배제</em>됐습니다</figcaption>
</figure>

<p class="src">근거 — 같은 질문·같은 모델 · <code>--restricted</code> 로 명령 실행과 웹 접근을 뺀 세션</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-I · 잘 쓰는 법</p>

# 확인할 수 있을 때

<p class="lead">같은 질문을 <em>돌려 볼 수 있는</em> 세션에 했습니다. 순위가 아니라 결론이 나왔습니다.</p>

<figure class="shot band nochrome term mark-ok" data-origin="capture">
<img src="./images/term/verify-on.png" alt="같은 라이브러리 버전으로 재현한 결과. A 현재 앱 방식은 헤더가 깨짐, B BOM 추가 후는 정상, C TextDecoder 사용도 정상. 컬럼 매칭 로직은 멀쩡하고 비교 대상 문자열이 깨져 들어와 무엇과도 맞지 않는다는 결론이 이어진다" />
<figcaption>같은 라이브러리를 내려받아 <em>세 가지로 재현</em>한 결과</figcaption>
</figure>

<p class="thesis">확인 수단이 없으면 <em>가장 그럴듯한 것</em>이 1번이 됩니다. 그리고 그게 오답일 때가 있습니다.</p>

<p class="src">근거 — 같은 질문·같은 모델 · 명령 실행이 열려 있던 세션 · 앞 장과 차이는 이것뿐</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-I · 잘 쓰는 법</p>

# 탐색 → 계획 → 코드

<p class="lead">코드부터 시키면 <em>엉뚱한 문제</em>를 잘 풀어 옵니다.</p>

<div class="steps">
<div><b>탐색</b><span>Plan 모드로 읽게만 합니다. 「어떻게 돌아가는지 봐」</span></div>
<div><b>계획</b><span>「무슨 파일을 고쳐야 해? 계획을 세워」</span></div>
<div><b>실행과 커밋</b><span>계획을 승인해 모드를 바꾸고, 끝나면 「설명을 붙여 커밋해」</span></div>
</div>

<div class="callout"><b>건너뛸 때</b> 오타 고치기처럼 한 문장으로 끝나는 수정이면 <em>계획은 낭비</em>입니다.</div>

<p class="src">출처 — Claude Code 공식 문서 「Best practices · Explore first, then plan, then code」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-I · 잘 쓰는 법</p>

# 조기 방향 수정

<p class="lead">어긋난 걸 봤으면 <em>그 자리에서</em> 세웁니다. 끝나기를 기다리지 않습니다.</p>

<div class="deflist">
<div><b><code>Esc</code></b><span>하던 동작만 멈춥니다. 맥락은 남습니다</span></div>
<div><b><code>Esc</code> 두 번</b><span>코드와 대화를 되돌리는 메뉴가 열립니다</span></div>
<div><b>「방금 거 되돌려」</b><span>말로 시켜도 되돌립니다</span></div>
<div><b><code>/clear</code></b><span>다른 일로 넘어갈 때 맥락을 비웁니다</span></div>
</div>

<p class="thesis">같은 걸 <em>두 번 고쳐 줬는데도</em> 안 되면, 대화가 이미 실패한 시도로 차 있는 것입니다. 지우고 배운 것을 넣어 다시 시킵니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Best practices · Course-correct early and often」</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-I · 잘 쓰는 법</p>

# 30초 만에 보이는 것

<p class="lead">「엑셀 파일로 만들어줘」 한 줄에 <em>파이썬부터 찾기</em> 시작했습니다.</p>

<figure class="shot band nochrome term" data-origin="capture">
<img src="./images/term/redir-wrong.png" alt="터미널 화면. 「주간 보고를 엑셀 파일로도 만들어줘」 라는 입력에 대해 파이썬 및 openpyxl 확인이라는 작업 이름과 함께, python3 와 uv 위치를 찾고 openpyxl 버전을 확인하는 셸 명령이 돌고 있다" />
<figcaption>첫 명령 한 줄에서 이미 <em>어디로 가는지</em> 보입니다</figcaption>
</figure>

<p class="thesis">틀린 길은 아닙니다. 다만 코드가 처음인 사람 노트북에 파이썬 패키지를 까는 길입니다. <em>여기서 세우면 30초</em>, 놔두면 20분입니다.</p>

<p class="src">근거 — 데모 폴더 「현장일지」 · 프롬프트는 저 한 줄 · <code>Esc</code> 를 누른 시점은 시작 30초</p>

---
class: top-led brand-cc band-page
---

<p class="eyebrow">1-I · 잘 쓰는 법</p>

# 세우고 돌리기

<p class="lead"><code>Esc</code> 를 누르면 <em>「대신 뭘 할까요」</em>가 뜹니다. 대화는 그대로 남습니다.</p>

<figure class="shot band nochrome term mark-ok" data-origin="capture">
<img src="./images/term/redir-fix.png" alt="터미널 화면. 읽은 파일과 실행한 명령 요약 아래에 Interrupted, What should Claude do instead 라는 줄이 있고, 이어서 「파이썬 설치까지 가지 말고, 엑셀에서 그냥 열리는 CSV로 만들어줘. 보고 아래에」 라는 입력이 들어간 뒤 CSV로 만들겠다는 답이 이어진다" />
<figcaption>읽어 둔 일지 3건은 <em>버려지지 않습니다</em></figcaption>
</figure>

<p class="thesis">결과물은 엑셀에서 그냥 열리는 CSV 였습니다. <em>파이썬은 한 줄도 깔지 않았습니다</em>.</p>

<p class="src">근거 — 같은 세션 · 방향을 바꾼 뒤 <code>보고/주간-2026-W35.csv</code> 44줄 생성</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-I · 잘 쓰는 법</p>

# 흔한 실수 5가지

<p class="lead">대부분 <em>맥락이 지저분해져서</em> 생깁니다.</p>

| 증상 | 처방 |
|---|---|
| 이 일 저 일을 한 대화에 | 일이 바뀔 때마다 `/clear` |
| 고쳐 줘도 계속 빗나감 | 두 번 넘어가면 `/clear` 하고 다시 시킵니다 |
| CLAUDE.md 가 너무 길어짐 | 안 적어도 잘하는 줄은 지웁니다 |
| 그럴듯한데 안 돌아감 | 확인 방법 없이는 넘기지 않습니다 |
| 「좀 조사해 봐」 하고 방치 | 범위를 좁히거나 서브에이전트로 넘깁니다 |

<p class="thesis">세 번째 줄이 특히 자주 나옵니다. 지침이 길어지면 <em>중요한 규칙이 묻힙니다</em>.</p>

<p class="src">출처 — Claude Code 공식 문서 「Best practices · Avoid common failure patterns」</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1부 · 마무리</p>

# 1부 되짚기

<p class="lead">답이 바로 안 나오는 줄이 있으면 <em>거기가 다시 볼 자리</em>입니다.</p>

<div class="deflist">
<div><b>되돌리려면</b><span>무엇을 누르고, 무엇은 안 돌아옵니까</span></div>
<div><b>시키기 전에</b><span>권한 모드 다섯 중 무엇으로 시작합니까</span></div>
<div><b>대화가 길어지면</b><span>비웁니까, 접습니까</span></div>
<div><b>같은 지시 세 번째</b><span>어디에 적어 둡니까</span></div>
</div>

<p class="thesis">답은 다음 장에 있습니다. 먼저 <em>말로 해 보고</em> 넘깁니다.</p>

<!-- 여기서 멈추고 한 명씩 답하게 한다. 틀린 답이 나오는 줄이 다음 시간 복습 항목이다. -->

---
class: top-led brand-cc
---

<p class="eyebrow">1부 · 마무리</p>

# 되짚기 답

<p class="lead">네 줄 다 나왔다면 1부는 끝입니다.</p>

<div class="deflist">
<div><b>되돌리려면</b><span>Esc 두 번. Bash 로 바꾼 것과 외부 변경은 안 돌아옵니다</span></div>
<div><b>시키기 전에</b><span>Plan. 접근을 보고 승인한 뒤 바꿉니다</span></div>
<div><b>대화가 길어지면</b><span>일이 바뀌었으면 <code>/clear</code>, 이어가야 하면 <code>/compact</code></span></div>
<div><b>같은 지시 세 번째</b><span>스킬. 프로젝트 규칙이면 CLAUDE.md</span></div>
</div>

<p class="thesis">2부는 <em>다른 도구</em>로 같은 일을 시켜 봅니다. 실습은 없고 보기만 합니다.</p>

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

---
class: divider brand-cc-solid
---

<p class="div-no">4부</p>

## 개발 결과 검증

<p class="div-sub">Playwright MCP로 실제 동작을 확인하고, 고친 뒤 다시 확인합니다</p>

---
class: top-led brand-cc
---

<p class="eyebrow">4-A · Playwright MCP로 검증</p>

# 브라우저를 직접 조작

<p class="lead"><em>Playwright MCP</em>는 Claude가 브라우저를 열고 조작하도록 연결합니다.</p>
<div class="steps">
<div><b>열기</b><span>개발 서버를 실행하고 실제 접속 주소를 확인합니다.</span></div>
<div><b>조작</b><span>파일을 올리고, 필터와 버튼을 누릅니다.</span></div>
<div><b>대조</b><span>PRD의 기대값과 화면에 나온 값을 비교합니다.</span></div>
<div><b>증거</b><span>실행 결과와 캡처를 남기고 실패한 동작을 다시 확인합니다.</span></div>
</div>
<p class="src">출처 · <a href="https://github.com/microsoft/playwright-mcp">Microsoft Playwright MCP</a></p>

<!--
사전 준비: 현재 Code 세션에 Playwright MCP가 연결돼 있어야 합니다. 일반 브라우저 미리보기와 구분합니다. 실제 도구 호출이 나타나는지 확인합니다. 캡처만 보는 것과 버튼을 조작하는 것은 서로 다른 확인입니다.
-->

---
class: top-led brand-cc
---

<p class="eyebrow">4-A · Playwright MCP로 검증</p>

# 검증 시작 전 확인

<p class="lead">지시를 보내기 전에 <em>주소·연결·샘플</em>이 준비돼 있어야 합니다.</p>
<div class="deflist">
<div><b>앱 주소</b><span>Claude가 알려 준 개발 서버 주소를 실제로 열 수 있습니다.</span></div>
<div><b>MCP 연결</b><span>현재 세션에서 Playwright MCP의 브라우저 도구를 호출할 수 있습니다.</span></div>
<div><b>검증 자료</b><span>정상 샘플과 필수 열이 빠진 샘플의 파일 위치를 알려 줍니다.</span></div>
</div>
<p class="thesis">연결이 안 되면 연결 문제부터 해결합니다. 검증을 실행하지 못한 항목은 미검증으로 남깁니다.</p>


---
class: top-led brand-cc
---

<p class="eyebrow">4-A · Playwright MCP로 검증</p>

# 검증용 파일 준비

<p class="lead">값을 아는 작은 파일로 확인합니다. <em>아래 두 파일을 만들게</em> 하세요.</p>

```text
검증용 엑셀 두 개를 만들어줘. 열 이름은 PRD.md의 정의를 따라줘.
sample-ok.xlsx: A라인 생산량 100, 불량수 4 / B라인 생산량 200, 불량수 2.
sample-missing.xlsx: 같은 데이터에서 불량수 열을 뺀 파일.
저장한 파일의 위치를 알려줘. 다른 필수 열은 유효한 값으로 채워줘.
```

<p class="thesis">열어서 확인 · 정상 파일의 두 행이 위 값과 같은지, 오류 파일에 불량수 열이 없는지 봅니다.</p>

<!-- 앱을 통한 계산 전에 검증 자료 자체를 열어서 확인합니다. 강사가 두 파일을 사전 준비해도 됩니다. 이후 Playwright MCP가 읽을 수 있는 경로를 전달합니다. -->

---
class: top-led brand-cc
---

<p class="eyebrow">4-A · Playwright MCP로 검증</p>

# 검증 요청 프롬프트

<p class="lead">「확인해줘」 대신 <em>동작과 기대 결과를 함께</em> 보냅니다.</p>

```text
실행 중인 앱을 Playwright MCP로 열어 PRD.md의 완료 조건을 검증해줘.
샘플 파일을 업로드하고 전체 2%, A라인 선택 시 4%인지 확인해줘.
필수 열이 빠진 파일도 올려 안내가 나오는지 확인해줘.
각 항목의 기대값·실제 결과·통과 여부와 화면 캡처를 보여줘.
실패하면 원인을 고치고, 같은 동작을 다시 실행해줘.
```
<p class="thesis">같은 샘플 · A라인 100개 중 4개, B라인 200개 중 2개가 불량입니다.</p>


---
class: top-led brand-cc
---

<p class="eyebrow">4-A · Playwright MCP로 검증</p>

# 통과 판단의 기준

<p class="lead">아래는 <em>수업용 검증표 예시</em>입니다. 실제 실행 결과로 채웁니다.</p>

| 동작 | 기대 결과 | 남길 증거 |
|---|---|---|
| 정상 샘플 업로드 | 전체 불량률 2% | 표시된 값과 화면 |
| A라인 필터 선택 | 불량률 4% | 선택 상태와 표시값 |
| 불량수 열 없는 파일 | 누락된 열 안내 | 안내 문구와 화면 |
| Tab으로 이동 | 업로드·필터 조작 가능 | 이동 순서와 초점 |

<p class="thesis">겉모양이 비슷해도 숫자나 동작이 다르면 완료가 아닙니다.</p>


---
class: top-led brand-cc
---

<p class="eyebrow">4-A · Playwright MCP로 검증</p>

# 실패한 동작 다시 확인

<p class="lead">「고쳤다」는 답 뒤에 <em>같은 조건으로 한 번 더</em> 실행합니다.</p>

```text
A라인을 선택해도 전체 값 2%가 그대로 보여.
필터에 따라 표시값이 바뀌도록 고쳐줘.
Playwright MCP로 같은 샘플을 다시 올려 A라인 4%를 확인하고,
필터를 전체로 바꾸면 2%로 돌아오는지도 확인해줘.
```
<p class="thesis">기능이 맞으면, 같은 화면 크기로 캡처해 reference 이미지와 배치·여백을 비교합니다.</p>


---
class: top-led brand-cc
---

<p class="eyebrow">4-A · Playwright MCP로 검증</p>

# 완료라고 말할 때

<p class="lead"><em>무엇을 실행했고 무엇이 남았는지</em> 확인하고 마칩니다.</p>
<div class="deflist">
<div><b>기능</b><span>PRD의 완료 조건을 실행 결과로 확인했다.</span></div>
<div><b>화면</b><span>캡처를 reference와 대조하고 의도한 차이는 설명했다.</span></div>
<div><b>남은 것</b><span>실패·미검증 항목을 숨기지 않고 다음 조치를 적었다.</span></div>
</div>
<p class="thesis">그다음 배포합니다. 배포 주소에서도 핵심 동작을 다시 확인합니다.</p>


---
class: top-led brand-cc
---

<p class="eyebrow">4-A · Playwright MCP로 검증</p>

# 검증 지시 직접 쓰기

<p class="lead"><em>5분 실습</em> · 내 PRD에서 완료 조건 하나를 골라 검증을 시킵니다.</p>

```text
Playwright MCP로 [앱 주소]를 열어줘.
[입력 자료]로 [사용자 행동]을 실행해줘.
[기대 결과]와 실제 결과를 비교하고 캡처를 남겨줘.
실패하면 고친 뒤 같은 조건으로 다시 확인해줘.
```
<p class="thesis">완료 · 도구 실행 기록과 실제 결과를 보고, 통과인지 직접 판정합니다.</p>

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

---
class: divider brand-cc-solid
---

<p class="div-no">선택 확장</p>

## 검증한 뒤 자동 실행

<p class="div-sub">핵심 흐름이 통과한 다음, 반복할 작업을 예약합니다</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">선택 확장 · 자동 실행</p>

# 예약 실행

<div class="split evidence">
<div>

<p class="lead">「매일 아침 어제 데이터를 표로 만들어 둬」를 <em>걸어 둡니다</em>.</p>

<div class="steps">
<div><b>말로 시킨다</b><span>「매일 아침 9시에 도는 작업 하나 만들어 줘」</span></div>
<div><b>또는 직접 만든다</b><span>사이드바 Routines → New routine → <em>Local</em></span></div>
<div><b>채운다</b><span>시킬 말 · 볼 폴더 · 주기(매일 · 평일만 · 매주)</span></div>
</div>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/desktop-scheduled-tasks#compare-scheduling-options">
<img src="./images/docs/sched-compare.png" alt="공식 문서의 비교표. 클라우드·데스크톱·loop 세 예약 방식을 컴퓨터가 켜져 있어야 하는지, 내 파일을 볼 수 있는지로 견준다" />
<figcaption>원문 · <a href="https://code.claude.com/docs/en/desktop-scheduled-tasks#compare-scheduling-options"><code>desktop-scheduled-tasks#compare-scheduling-options</code></a></figcaption>
</figure>
</div>

<p class="thesis">「Cloud」는 클라우드에서 돌아 <em>내 파일을 못 봅니다</em>. Routines 가 안 보이면 유료 플랜인지부터 봅니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Schedule recurring tasks in Claude Code Desktop」 docs/en/desktop-scheduled-tasks</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">선택 확장 · 자동 실행</p>

# 예약이 건너뛰는 자리

<div class="split evidence">
<div>

<p class="lead">앱이 켜져 있고 컴퓨터가 <em>깨어 있을 때만</em> 돕니다.</p>

<div class="deflist narrow">
<div><b>자고 있으면</b><span>그 회차는 건너뜁니다</span></div>
<div><b>깨어나면</b><span><em>가장 최근 한 번만</em> 따라 돕니다</span></div>
<div><b>안 자게 하려면</b><span>설정 · Desktop app · General 의 Keep computer awake</span></div>
<div><b>뚜껑을 닫으면</b><span>그래도 잡니다</span></div>
</div>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/desktop-scheduled-tasks#how-scheduled-tasks-run">
<img src="./images/docs/sched-run.png" alt="공식 문서 본문. 예약 작업은 앱이 켜져 있고 컴퓨터가 깨어 있을 때만 돌며, 자고 있으면 그 회차를 건너뛴다고 적혀 있다" />
<figcaption>원문 · <a href="https://code.claude.com/docs/en/desktop-scheduled-tasks#how-scheduled-tasks-run"><code>desktop-scheduled-tasks#how-scheduled-tasks-run</code></a></figcaption>
</figure>
</div>

<p class="thesis">9시 작업이 밤 11시에 돌 수도 있습니다. 시각이 중요하면 <em>지시문 안에</em> 조건을 적습니다 — 「오후 5시가 지났으면 검토는 건너뛰고 놓친 것만 요약해」.</p>

<p class="src">출처 — Claude Code 공식 문서 「Schedule recurring tasks · How scheduled tasks run」 docs/en/desktop-scheduled-tasks</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">선택 확장 · 완료 조건</p>

# 완료 조건

<div class="split evidence">
<div>

<p class="lead">「이렇게 고쳐」 대신 <em>「이 조건이 될 때까지」</em>를 겁니다.</p>

<div class="deflist narrow">
<div><b>거는 법</b><span><code>/goal</code> 뒤에 조건을 씁니다</span></div>
<div><b>그 자리에서</b><span>한 턴이 바로 시작됩니다</span></div>
<div><b>매 턴 뒤</b><span>작은 모델이 조건 충족을 판정합니다</span></div>
<div><b>안 찼으면</b><span>내가 안 시켜도 한 턴 더 돕니다</span></div>
</div>

</div>
<figure class="shot nochrome" data-origin="web" data-source="https://code.claude.com/docs/en/whats-new/2026-w20">
<img src="./images/official/goal.png" alt="조건을 걸어 둔 화면. 테스트를 돌리고 파일을 고치기를 반복하다가 조건이 찼다고 표시된다" />
<figcaption>공식 화면 · <a href="https://code.claude.com/docs/en/whats-new/2026-w20"><code>whats-new/2026-w20</code></a></figcaption>
</figure>
</div>

<p class="thesis"><em>데스크톱 앱</em>에서도 됩니다. 조건이 차거나 불가능 판정이 나면 저절로 풀리고, 중간에 걷으려면 <code>/goal clear</code>.</p>

<p class="src">출처 — Claude Code 공식 문서 「Keep Claude working toward a goal」 docs/en/goal</p>

---
class: top-led brand-cc
---

<p class="eyebrow">선택 확장 · 완료 조건</p>

# 조건 쓰는 법

<p class="lead">판정하는 모델은 <em>대화에 남은 것만</em> 봅니다. 스스로 명령을 돌리거나 파일을 열지 않습니다.</p>

<div class="deflist">
<div><b>되는 조건</b><span>「테스트가 다 통과한다」 — 돌린 결과가 대화에 남습니다</span></div>
<div><b>안 되는 조건</b><span>「화면이 보기 좋아진다」 — 무엇으로 증명할지가 없습니다</span></div>
<div><b>확인 방법까지</b><span>「<code>npm test</code> 가 0 으로 끝난다」처럼 적습니다</span></div>
<div><b>멈출 자리</b><span>「20턴 안에 안 되면 멈춰」를 조건에 넣습니다</span></div>
</div>

<p class="thesis">권한 모드는 그대로입니다. 매 턴 손 안 대고 돌리려면 <em>Auto</em> 에서 겁니다.</p>

<p class="src">출처 — Claude Code 공식 문서 「Keep Claude working toward a goal · Write an effective condition」 docs/en/goal</p>

---
class: top-led brand-cc
---

<p class="eyebrow">COURSE · 마무리</p>

# 혼자 다시 시작할 때

<p class="lead">다음 프로젝트에서도 <em>같은 세 단계</em>로 시작합니다.</p>
<div class="steps">
<div><b>① 역인터뷰</b><span>Claude와 묻고 답해 모호한 내용을 PRD.md로 확정합니다.</span></div>
<div><b>② 디자인·개발</b><span>frontend-design + taste-skill, reference/ 이미지로 구현합니다.</span></div>
<div><b>③ 검증</b><span>Playwright MCP로 완료 조건을 실행하고, 고친 뒤 다시 확인합니다.</span></div>
</div>
<p class="thesis">남기는 것 · PRD.md · reference/ · 실행 가능한 앱 · 검증 결과와 배포 주소</p>
