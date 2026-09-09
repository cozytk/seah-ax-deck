# 구간 초안 작성 브리프

이 문서는 교안 한 구간을 맡아 초안을 쓰는 사람이 지키는 규약이다.
결과물은 `교안/sections/<구간id>.md` 하나. **`slides.md` 는 절대 건드리지 않는다.**

---

## 1. 수업 맥락

- 강의명: **Claude Code 활용 PRD 작성 및 개발**
- 대상: 세아그룹 실무자. 엑셀은 능숙, **코드는 처음**. Windows.
- 시간: 14시간. 전체 약 170장.
- 목차 네 덩어리: Claude Code 기초 / Antigravity 기초 / PRD 작성 / 프로젝트 개발
- 무게중심은 Claude Code. Antigravity 는 선택지로 짧게 소개하고 **시연만** 한다.
- 전체 구조는 `/Users/taekkim/claude-code-lecture/강의 구조 v2.md` 를 따른다.

---

## 2. 제목 규칙 — 가장 자주 어기는 것

**제목은 라벨, 결론은 본문 첫 줄.**

| 쓰지 말 것 | 쓸 것 |
|---|---|
| 시킬 수 있는 일 네 갈래 | **할 수 있는 일 4가지** |
| 같은 앱입니다. 인터페이스만 다릅니다 | **CLI vs Desktop** |
| 파일과 화면을 대화에 끌어다 놓기 | **대화에 파일 첨부** |
| 과감하게 시킬 수 있는 이유 두 가지 | **체크포인트** |

- 제목: 명사구, 8~14자. 목차에 그대로 얹어도 구획이 읽히는 말.
- **금지**: 서술형 종결(`~합니다` `~하기` `~인가`), 두 문장 제목, 콜론 부제(`X: Y`),
  em dash 부연(`주제 — 부연`).
- 결론 문장은 제목이 아니라 `<p class="lead">` 로 내린다.

## 3. 한국어 문체

- 담백하게. 과장어(강력한·획기적·압도적·놀라운) 금지.
- 직접 동사로 쓰고 문장 길이를 변주한다. 볼드 남발 금지.
- 곧은 따옴표 대신 `「」`.
- `~에서 ~로`, `~할 수 있다`, `~을 가지고 있다`, `결론적으로` 같은 번역투 회피.
- 의인화 주어(「도구가 말한다」) 금지.

---

## 4. 파일 형식

각 장표는 `---` 로 구분하고 frontmatter 로 클래스를 준다. **첫 줄부터 `---` 로 시작한다**
(맨 앞에 frontmatter 블록을 두지 않는다 — 나중에 이어 붙이기 때문).

```
---
class: top-led brand-cc
---

<p class="eyebrow">1-C · 되돌리기</p>

# 체크포인트

<p class="lead">과감하게 시킬 수 있는 건 <em>되돌릴 자리</em>가 자동으로 쌓이기 때문입니다.</p>

<div class="deflist">
<div><b>언제 찍히나</b><span>보내기를 누를 때마다</span></div>
<div><b>무엇이 담기나</b><span>그 시점의 파일 내용</span></div>
</div>

<p class="src">출처 — Claude Code 공식 문서 「Checkpointing」 docs/en/checkpointing</p>
```

**클래스 규칙**
- 본문 장표: `class: top-led brand-cc` (Claude Code 구간) / `top-led brand-ag` (Antigravity 구간)
- 빽빽한 장표: `class: top-led brand-cc compact`
- 구간 표지: `class: divider brand-cc-solid` (또는 `brand-ag-solid`)
- 실습 캡처 + 설명: `class: top-led brand-cc lab-page` + `<div class="split">본문 / figure.shot</div>`
- 실습 캡처 한 장만: `class: top-led brand-cc shot-page` + `<figure class="shot full">`

**실습 캡처는 잘라내지 않는다.** 「가장 가르칠 만한 띠」만 남기면 학생이 화면에서
찾아야 할 위아래가 사라진다. 통째로 넣고, 위 두 레이아웃이 제목·리드를 눌러
남는 높이를 전부 그림에 준다.

---

## 5. 쓸 수 있는 컴포넌트 — 계약을 정확히 지킬 것

계약을 어기면 렌더가 깨진다. 자식 태그를 임의로 바꾸지 않는다.

| 용도 | 마크업 |
|---|---|
| 결론 한 줄 | `<p class="lead">…<em>강조</em>…</p>` — 장표당 1개 |
| 보조 한 줄 | `<p class="thesis">…</p>` |
| 구간 라벨 | `<p class="eyebrow">1-C · 되돌리기</p>` |
| 용어 나열 | `<div class="deflist"><div><b>용어</b><span>설명</span></div>…</div>` |
| 순서 있는 절차 | `<div class="steps"><div><b>제목</b><span>설명</span></div>…</div>` — 번호 자동 |
| 카드 2·3·4칸 | `<div class="duo\|trio\|quad"><div class="pane"><h3>제목</h3><p>본문</p></div>…</div>` |
| 대립 비교 | `<div class="vs"><div class="pane">…</div><i class="vs-badge">VS</i><div class="pane">…</div></div>` |
| 본문+그림 2열 | `<div class="split evidence"><div>본문</div><figure class="shot">…</figure></div>` |
| 칩 나열 | `<div class="chips"><i>항목</i>…</div>` |
| 참고 상자 | `<div class="callout"><b>라벨</b> 본문</div>` — 장표당 0~1개 |
| 큰 숫자 | `<div class="bigstat"><div><i>라벨</i><b>42%</b><span>설명</span></div></div>` |
| 표 | 그냥 마크다운 표 |

**강조**: `<em>강조</em>` / `<em class="ok">` / `<em class="warn">` / `<em class="bad">`.
밑줄·이탤릭 금지. 인라인 코드는 `` `코드` ``.

**`.vs` 주의** — 우열이 아니라 **선택지 둘**이면 `.vs` 대신 `.duo` 를 쓴다.
한쪽에 `key` 를 붙이면 그쪽이 정답처럼 보인다. 진짜 권장안일 때만 붙인다.

---

## 6. 밀도 예산 — 넘치면 다시 쓰게 된다

한 장표에 들어가는 블록은 **최대 3개**. (lead 1 + 본문 컴포넌트 1 + thesis 1)

- 본문 40단어 이내
- 목록 항목 5개 이하
- `deflist`·`steps` 항목은 **4개 이하**, 각 `<span>` 은 **한 줄로 끝나게** (35자 내외)
- 표는 행 6개 이하. 그 이상이면 `compact` 를 붙이고 열을 3개로 줄인다
- 우겨넣지 말고 **장표를 쪼갠다**. 장 수가 늘어나는 건 문제가 아니다

---

## 7. 그림

**이미지 태그를 직접 쓰지 않는다.** 대신 필요한 그림을 자리표시자로 남기고,
반환 보고에 목록으로 적는다. 실제 삽입은 조립 단계에서 한다.

```
<!-- IMG: docs/en/checkpointing#limitations — 체크포인트가 못 되돌리는 것 표 -->
```

두 가지 중 하나로 적는다.
- `IMG: <문서 URL>#<anchor> — 무엇을 보여주는 그림인지` → 문서 구간 클립으로 만든다
- `IMG: official/<이름> — 무엇` → 이미 받아 둔 공식 자산. 목록은 `교안/images/official/` 참조

직접 SVG 를 그리는 게 더 맞는 개념(공간·흐름·전후)이면 인라인 `<svg>` 로 그려도 된다.
그때는 **SVG 안에 빈 줄을 절대 넣지 않는다** — 마크다운이 거기서 HTML 블록을 끊어
아래 절반이 통째로 사라진다. 색은 `var(--accent)` `var(--ink)` `var(--card)` `var(--rule)`
같은 토큰으로만 쓴다.

---

## 8. 출처

공식 문서에서 가져온 내용이 있는 장표는 **반드시** 맨 아래 한 줄을 붙인다.

```
<p class="src">출처 — Claude Code 공식 문서 「Adjust effort level」 docs/en/model-config</p>
```

- 문서를 **직접 읽고** 쓴다. 기억으로 쓰지 않는다. 버전이 자주 바뀐다.
- 문서 본문을 받는 방법:
  ```bash
  cd /Users/taekkim/claude-code-lecture/교안
  node -e "const pw=require('playwright-chromium');(async()=>{const b=await pw.chromium.launch();const p=await b.newPage();await p.goto('URL',{waitUntil:'networkidle',timeout:60000});console.log(await p.evaluate(()=>(document.querySelector('main')||document.body).innerText));await b.close();})();"
  ```
- 문서와 기억이 다르면 **문서가 맞다.** 다르면 보고에 적는다.

---

## 9. 반환 보고에 담을 것

1. 쓴 파일 경로와 장 수
2. 필요한 그림 목록 (`IMG:` 주석과 같은 내용)
3. 문서를 읽고 **기존 계획과 달랐던 점** (있으면)
4. 판단이 갈렸던 지점과 그 이유
