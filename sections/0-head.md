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
  시작 상태: Windows 노트북 · Claude 유료 계정. Git과 Node.js는 수업 중 설치 안내.
  종료 수행: PRD 를 채우고, 만든 것이 맞는지 확인할 방법을 붙여 배포한다.
  오개념: (1) 한 줄로 되는데 왜 배우나 (2) 에러가 안 나면 잘 된 것

  기존 제목과 테마를 유지한다. 제목을 반복하는 부제는 생략하고, 필요한 설명은 짧은 명사구 또는 자연스러운 문장으로 쓴다.

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

<p class="thesis">사례에서 도구로, 요구사항에서 구현과 검증으로</p>

<div class="steps tight">
<div><b>0 · AX 사례와 트렌드</b><span>남들은 어디까지 와 있는가</span></div>
<div><b>1 · Claude Code 기초</b><span>화면 · 권한 · 되돌리기 · 일 나누기 · 컴퓨터 제어</span></div>
<div><b>2 · Antigravity 기초</b><span>같은 일을 다른 도구로 시켜 보기</span></div>
<div><b>3 · PRD와 디자인</b><span>역인터뷰로 요구사항 확정 · 스킬과 레퍼런스로 구현</span></div>
<div><b>4 · 검증과 완성</b><span>Playwright MCP로 검증 · 두 예제에 적용 · 배포</span></div>
</div>

<!-- 시간 배분은 구두로. 0부는 30분, 1부가 가장 길다. -->

---
class: top-led  compact
---

<p class="eyebrow">COURSE · 1일차</p>

# 1일차 진행 순서

<p class="lead">7시간 · 작은 앱 하나를 직접 만들고 검증하기</p>

| 구간 | 할 일 | 시간 |
|---|---|---:|
| 사례와 준비 | AX 사례 · Windows 설치 · 첫 질문 | 70분 |
| Claude Code | 권한 · 모델 · 파일 · 지침 · 스킬 | 90분 |
| 도구 비교 | Antigravity 설치·계획 시연 | 25분 |
| 구현 실습 | 역인터뷰 · PRD · 레퍼런스 · 디자인 스킬 | 120분 |
| 검증과 배포 | Playwright MCP · 수정 · Vercel·Cloud Run 소개 | 75분 |

<p class="thesis">진행 380분 + 휴식 40분. 점심 별도. 팀·자동 실행·상세 비교 실험은 선택 확장.</p>
<!-- 10명 기준. 짝끼리 설치 상태를 확인하고, 강사는 막힌 사람을 지원한다. 기존 전체 교안의 흐름은 유지하되 1일차에는 핵심 경로만 진행한다. -->

---
class: divider
---

<p class="div-no">0부</p>

## AX 사례와 트렌드

<p class="div-sub">기업 적용 사례와 최근 도구의 변화</p>

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

# AI 도입과 업무 변화

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

<p class="thesis">확인할 질문 · <em>AI를 넣은 뒤 일하는 순서가 어떻게 달라졌는가?</em></p>

---
class: top-led compact
---

<p class="eyebrow">0부 · 사례</p>

# 삼성의 결정

<div class="split evidence">
<div>

<p class="lead">외부 생성형 AI 세 종, <em>DX부문 임직원에게 도입</em></p>

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

<p class="lead">연구·생산·정비·고객 응대, 여섯 현장의 적용 사례</p>

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

<p class="lead">흩어진 충돌 시험 리포트·해석 데이터·고속 영상 검색</p>

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

<p class="lead">조립 라인의 <em>식별번호·차량 사양 대조</em></p>

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

<p class="lead">프레스·차체 공정의 운반 대차 동선과 병목</p>

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

<p class="lead">현장 엔지니어가 직접 만드는 공정용 AI 도구</p>

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

<p class="lead">복잡한 고장 코드와 정비 이력, 진단에 필요한 정보 찾기</p>

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

<p class="lead">여러 국가의 앱 리뷰를 읽고 분류하는 반복 업무</p>

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

<p class="lead">발표문이 내세운 용도 · 컴퓨터로 수행하는 업무</p>

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

<p class="lead">코딩 · 지식 업무 · 오래 걸리는 작업</p>

<figure class="shot band nochrome" data-origin="web" data-source="https://www.anthropic.com/claude-fable-and-mythos-5-1">
<img src="./images/trend/fable.png" alt="Anthropic 발표 페이지의 첫 화면. SEPTEMBER 2026 아래에 Claude Fable 5.1 and Mythos 5.1 이라는 제목이 있다" />
<figcaption>Anthropic 발표 · 2026-09-01 · <a href="https://www.anthropic.com/claude-fable-and-mythos-5-1"><code>anthropic.com</code></a></figcaption>
</figure>

<p class="thesis">발표의 핵심은 접근 범위의 차이. Fable도 실제 사용 가능 여부와 크레딧 조건은 계정에서 확인합니다.</p>

---
class: top-led compact
---

<p class="eyebrow">0부 · 트렌드</p>

# 갈리는 지점

<p class="lead">성능 주장과 함께 볼 것 · <em>이용 경로와 과금 조건</em></p>

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

<p class="lead">같은 일을 시킨 사용 기록과 결과 비교</p>

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

# Astra 사용 후기

<div class="split evidence">
<div>



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

<p class="lead">브라우저 안에서 업무를 처리하는 에이전트</p>

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

<p class="lead">직접 수정하는 파일, 로그인한 웹 서비스</p>

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

# Aside 사용 후기



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

<p class="lead">여러 벤치마크를 합산한 Artificial Analysis 지수</p>

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

<p class="lead">평가 항목이 바뀌면 순위의 의미도 달라진다</p>

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

<p class="lead">세로축은 점수, 가로축은 <em>과제당 출력 토큰</em></p>

<figure class="shot band nochrome" data-origin="web" data-source="https://artificialanalysis.ai/models">
<img src="./images/trend/aa-scatter.png" alt="Artificial Analysis 산점도. 세로축은 지능 지수, 가로축은 과제당 출력 토큰의 로그 눈금. GPT-6 Astra 는 약 2만 7천 토큰에 52점 부근, Claude Fable 5.1 은 약 7만 8천 토큰에 53점 부근에 찍혀 있다. 왼쪽 위 초록 영역이 가장 유리한 사분면으로 표시되어 있다" />
<figcaption>2026-09 · <a href="https://artificialanalysis.ai/models"><code>artificialanalysis.ai/models</code></a> · 가로축은 로그 눈금</figcaption>
</figure>

<p class="thesis">캡처 시점의 출력 토큰은 약 2.7만과 7.8만. <em>이 지표만으로 실제 업무 비용을 단정할 수는 없습니다.</em> 입력·캐시·도구 비용과 구독 한도는 별도입니다.</p>

---
class: top-led
---

<p class="eyebrow">0부 · 정리</p>

# 이 수업에서 만드는 것

<p class="lead">자료를 모아 읽기, 반복해서 대조하기. 두 업무를 작은 앱으로 구현합니다.</p>

<div class="deflist">
<div><b>모아 읽기</b><span>예제 1 — 엑셀을 올리면 볼 곳을 짚어 주는 화면. 충돌안전 어시스턴트와 같은 종류</span></div>
<div><b>대신 대조하기</b><span>예제 2 — 공고를 훑어 조건에 맞는 것만 골라내는 화면. 차량 식별번호 인식과 같은 종류</span></div>
</div>

<p class="thesis">출발점은 비슷합니다. <em>필요한 자료와 판단 기준</em>부터 정하고, 수업에서는 작은 범위로 구현합니다.</p>

<!-- 여기서 "우리 팀에서 이 두 종류에 해당하는 일"을 한 명씩 말하게 하고 1부로 넘어간다. -->

---
class: top-led
---

<p class="eyebrow">COURSE · 결과물</p>

# 오늘의 결과물

<p class="lead">1일차는 작은 앱 한 개, 2일차는 업무 예제로 확장</p>

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

<p class="lead">Claude Desktop에서 <em>로컬 세션을 시작하기 위한 준비</em></p>

<div class="steps tight">
<div><b>Claude 데스크톱 앱</b><span>Windows x64 또는 ARM64</span></div>
<div><b>Git for Windows</b><span>설치한 뒤 <em class="warn">앱을 다시 켜야</em> 합니다</span></div>
<div><b>유료 플랜 로그인</b><span>Pro · Max · Team · Enterprise</span></div>
</div>

<div class="callout"><b>Git 이 없으면 Code 탭이 안 열립니다</b> 앱이 세션마다 폴더를 따로 떼어 쓰는데 그 일을 <code>git</code> 이 합니다. 설치 후 Claude 앱을 다시 시작합니다.</div>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application · Work in parallel with sessions」 · 「Desktop quickstart」</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">시작 전 · Windows</p>

# Windows에서 첫 세션

<div class="steps">
<div><b>설치</b><span><a href="https://claude.com/download">Claude Desktop</a>과 <a href="https://git-scm.com/downloads/win">Git for Windows</a> 설치</span></div>
<div><b>로그인</b><span>Claude 앱을 다시 열고, 구독 중인 계정으로 로그인</span></div>
<div><b>폴더 선택</b><span>Code → Local → Select folder에서 <code>C:\ax-lab</code> 선택</span></div>
<div><b>첫 확인</b><span>「현재 작업 폴더의 경로와 파일 목록을 알려줘. 아직 수정하지 마.」</span></div>
</div>
<p class="thesis">내가 선택한 폴더와 답변의 경로가 같으면 준비 완료. 캡처의 운영체제가 달라도 메뉴 이름으로 찾아갑니다.</p>
<p class="src">공식 안내 · <a href="https://code.claude.com/docs/en/desktop-quickstart">Desktop quickstart</a> · Windows Local은 Git 필요, WSL은 선택</p>

---
class: top-led brand-cc
---

<p class="eyebrow">시작 전 · Windows</p>

# 앱 설치와 실습 도구

<p class="lead">Claude 앱은 바로 시작, 웹 개발과 MCP에는 실행 도구 추가</p>
<div class="deflist">
<div><b>Claude Desktop</b><span>Claude Code 포함. CLI를 별도로 설치하지 않아도 시작 가능</span></div>
<div><b>Node.js LTS</b><span><a href="https://nodejs.org/en/download">공식 설치 파일</a>로 설치. 웹 개발 서버와 Playwright MCP 실행에 사용</span></div>
<div><b>설치 확인</b><span>새 PowerShell 창에서 <code>node --version</code>, <code>npm.cmd --version</code></span></div>
<div><b>앱 다시 열기</b><span>설치 후 Claude 앱도 재시작. 기존 세션은 새 PATH를 못 읽을 수 있음</span></div>
</div>
<p class="thesis">「node를 찾을 수 없다」는 메시지는 설치·경로 문제. 설치가 제한된 PC는 강사 시연으로 이어갑니다.</p>
<p class="src">공식 안내 · <a href="https://code.claude.com/docs/en/desktop#session-not-finding-installed-tools">도구를 찾지 못할 때</a> · <a href="https://github.com/microsoft/playwright-mcp">Playwright MCP 요구사항</a></p>

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

<p class="lead">코드 읽기 · 파일 수정 · 명령 실행</p>

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

<p class="lead">맥락 수집 → 실행 → 검증. 결과에 따라 반복</p>

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

<p class="lead">오늘 실습에서 사용할 네 가지 작업</p>

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

<p class="div-sub">첫 질문 · 되묻기 · 검색 · 웹페이지 만들기</p>

<p class="div-file">1-1 능력 · 1-2 꼬리 질문 · 1-3 사이드 채팅 · 1-4 검색 · 1-5 아티팩트</p>

---
class: top-led brand-cc lab-page
---

<p class="eyebrow">실습 1-1 · 능력 물어보기</p>

# 첫 질문

<div class="split evidence">
<div>



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

<p class="lead">낯선 단어가 나오면 <em>같은 대화에서</em> 다시 질문</p>

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

<p class="lead">본 작업을 이어 가면서 별도 질문</p>

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

<p class="lead">불확실한 답은 출처를 찾아 확인</p>

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

<p class="lead">지금까지의 대화를 한 장의 웹페이지로</p>

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

<p class="lead">같은 Claude Code, <em>환경에 따라 다른 기능과 연결 설정</em></p>

<figure class="figure mark-none">
<svg viewBox="0 0 900 290" role="img" aria-label="터미널·IDE·데스크톱·웹에서 Claude Code를 사용한다. CLAUDE.md, 설정, MCP는 적용 범위와 지원 여부를 환경별로 확인한다">
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
<figcaption>프로젝트 지침을 재사용할 수 있으며, 도구 연결과 지원 기능은 환경별 확인</figcaption>
</figure>

<p class="src">출처 — Claude Code 공식 문서 「Overview · Use Claude Code everywhere」</p>

---
class: top-led brand-cc compact
---

<p class="eyebrow">1-A · 표면 비교</p>

# CLI vs Desktop

<p class="lead">프로젝트 지침은 공유, 조작 화면과 지원 기능은 차이</p>

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
<div><b>양쪽 공유</b><span>같은 로컬 프로젝트의 CLAUDE.md · 스킬 · 지원되는 설정과 MCP 구성</span></div>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Desktop application」 docs/en/desktop</p>

---
class: top-led brand-cc
---

<p class="eyebrow">1-A · 앱 구조</p>

# 앱의 세 탭

<p class="lead">오늘 사용할 곳은 <em>Code 탭</em></p>

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

<p class="lead">첫 메시지 전에 확인할 네 곳</p>

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

<p class="lead">실행 도중에도 추가 지시와 방향 수정</p>

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

<p class="lead">프로젝트 안의 파일, 바깥에서 가져온 자료</p>

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

<p class="lead">파일 수정과 명령 실행을 <em>어디까지 맡길지</em></p>

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

<p class="lead">새 세션의 권한 모드부터 확인</p>

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

<p class="lead">변경된 줄을 짚어 <em>이유를 질문</em></p>

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

<p class="lead">변경 내용에서 오류 가능성이 높은 부분 점검</p>

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

<p class="lead">실행한 화면을 보며 수정</p>

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

<p class="lead">전체 목록은 <code>Ctrl + /</code></p>

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

<p class="lead">새 대화에서 시작 · 목표는 메신저 공지 3줄</p>

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

<p class="lead">회의 정보를 다시 붙이지 않고 요청만 수정</p>

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
