# 예제 1 디자인 개선 기록

대상: `예시프로젝트-생산실적대시보드` (Next.js 16 · Tailwind · shadcn · recharts)
방법: ① `DESIGN.md` 에 디자인 4항목을 적고 ② 그대로 고친 뒤
③ [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) 로 셀프리뷰
날짜: 2026-08-30 · 확인 조건: 1440px 폭, `deviceScaleFactor: 2`, 라이트, `public/sample.xlsx` 324행

캡처: `images/ex1/{before,after}-{top,tab,data,data-tab}.png` (8장, 전후 같은 조건)

---

## 0. 출발점 — 이 프로젝트에 없던 것

`DESIGN.md` 가 없었다. 그런데 **화면은 이미 멀쩡했다.**
색은 색각 이상 시뮬레이션을 통과한 팔레트였고, 브랜드 오렌지를 막대 색으로 쓰지 않는 이유가
소스 주석에 ΔE 값까지 적혀 있었다. `.tnum` 도, 차트 애니메이션을 끄는 이유도 있었다.

**빠진 것은 눈에 보이는 쪽이 아니었다.** 아래가 고치기 전에 없던 것들이다.

| 없던 것 | 어떻게 확인했나 | 결과 |
|---|---|---|
| 건너뛰기 링크 | 초점을 풀고 첫 `Tab` | 빈 화면에선 표 스크롤 상자, 대시보드에선 오른쪽 끝 `인쇄 · PDF` 로 건너뜀 |
| `<main>` 랜드마크 | `document.querySelectorAll("main")` | 빈 화면 **0개** (헤더·네비도 0) |
| `<h1>` | `document.querySelectorAll("h1")` | 데이터 올린 화면에 **0개**. 제목이 `<span>` 이었다 |
| 키보드로 파일 올리기 | Tab 을 여섯 번 눌러 초점 추적 | 파일 입력이 `class="hidden"`(=`display:none`) → **초점이 아예 안 감** |
| 키보드로 표 정렬 | 원본 탭에서 머리글에 Tab | `<th onClick>` → **닿지 않음.** 마우스 전용 |
| `color-scheme` | `getComputedStyle(html).colorScheme` | `normal`. OS 다크인 사람은 숫자 입력창·스크롤바만 검게 |
| `prefers-reduced-motion` | 스타일시트 규칙 수 | 프로젝트가 쓴 건 0건 (1건은 `tw-animate-css` 것) |
| 차트 대체 문구 | recharts `<svg>` 의 이름 | 없음. 낭독기에 「그래프」라고도 안 읽힘 |
| 다시 계산 알림 | `[aria-live]` 개수 | 대시보드 1개(라디스 내부). 필터를 바꿔도 아무 말 없음 |
| 폼 라벨 | 라벨 없는 `input` 수 | 「불량률 기준」 입력이 옆 글자와 묶여 있지 않음 |

정리하면 **색·타이포는 이미 잘 돼 있었고, 접근성만 통째로 비어 있었다.**
검증 실험에서 갈렸던 축과 정확히 같다.

---

## 1. DESIGN.md 4항목이 화면 어디로 갔나

### 색 → `app/globals.css`

이미 있던 결정(계열 색 4개 + 회색, 상태색 3단, 브랜드 오렌지는 크롬 전용)을
**문서로 옮기고 근거를 적었다.** 새로 넣은 것은 하나다.

- `color-scheme: light` — 다크 모드를 만들지 않기로 정했으므로 **명시**한다.
  선언을 빼면 OS 다크인 사람에게 네이티브 컨트롤만 검게 나온다
- `<meta name="theme-color">` 를 상단 바 색 `#3b4951` 에 맞춤 (`app/layout.tsx` 의 `viewport`)

### 타이포·숫자 → `.label` 클래스

크기 사다리에 **라벨 단이 없었다.** KPI 라벨이 12px 본문색이라
26px 숫자와의 대비가 약했다. `globals.css` 에 `.label`(11px · 600 · 자간 `0.06em`)을 만들고
KPI 라벨 5개, 필터 라벨 4개, 격자 머리글에 붙였다.

`tabular-nums` 는 원래 방침을 유지했다 — 표·격자는 등폭, KPI 큰 숫자는 아니다.
서로 다른 지표라 자릿수를 맞출 이유가 없고, 26px 에서 등폭은 자간이 벌어져 보인다.

### 정보 위계 → 결론 카드

결론 문장 카드와 KPI 카드가 **생김새가 같았다.** 여섯 개 중 첫 번째가 결론이라는 걸
아무도 알 수 없다. `components/summary.tsx` 에서

- 왼쪽 **4px 브랜드 오렌지 세로띠**를 달아 KPI 카드와 계열을 갈랐다
- 문장 크기를 17px → **19px**, `text-pretty` 로 홀낱말 방지

`before-data.png` / `after-data.png` 를 나란히 놓으면 이 한 줄이 유일한 눈에 띄는 차이다.

### 접근성 → 아래 2절 전부

---

## 2. 실제로 고친 것

### 건너뛰기 링크 — `app/layout.tsx`, `app/globals.css`

`<a href="#main" class="skip-link">본문으로 건너뛰기</a>` 를 `<body>` 첫 자식으로.
평소엔 `translateY(-200%)` 로 화면 밖, `:focus-visible` 일 때만 왼쪽 위에 나타난다.

목적지를 만드느라 **빈 화면의 바깥 `<div>` 를 `<main id="main" tabIndex={-1}>` 로 바꿨다.**
`tabIndex={-1}` 이 없으면 `#main` 으로 건너뛴 초점이 실제로 얹히지 않는다.
대시보드 쪽 `<main>` 에도 같은 `id` 와 `tabIndex` 를 붙였다.

확인: 초점을 풀고 `Tab` → `a · 본문으로 건너뛰기`, `Enter` → 초점이 `MAIN#main`.

### 초점 표시 — `app/globals.css`

shadcn 의 `Button`·`Input` 에는 `focus-visible` 링이 있었지만,
손으로 만든 `<button>`(라인/작업조 필터, 발견 목록)에는 없어서
브라우저 기본 1px 실선에 기대고 있었다. 어두운 상단 바 위에서는 보이지 않는다.

전역으로 `:focus-visible { outline: 2px solid var(--brand-orange); outline-offset: 2px }`.
`:focus` 가 아니라 `:focus-visible` — 마우스로 눌렀을 때도 테두리가 남으면
사람이 거슬려서 결국 초점 표시를 없애 달라고 한다.

### 키보드로 파일 올리기 — `components/upload.tsx`

**가장 큰 결함이었다.** 파일 입력이 `class="hidden"` = `display:none` 이라
키보드만 쓰는 사람은 **파일을 올릴 방법이 아예 없었다.**

`sr-only`(화면 밖으로 밀되 초점은 살림)로 바꾸고, 드롭존 `<label>` 에
`focus-within:outline-*` 을 줘서 초점이 안쪽에 있을 때 바깥이 테두리를 그린다.
입력에 `aria-label` 도 붙였다.

확인: 빈 화면 Tab 순서가 `건너뛰기 링크 → 파일 입력 → 표 스크롤 영역`.

### 키보드로 표 정렬 — `components/analysis.tsx`

원본 표의 정렬 머리글이 `<th onClick>` 이었다. 눈으로는 멀쩡한데 Tab 으로 닿지 않는다.
`SortHead` 컴포넌트를 만들어 `<th>` 안에 진짜 `<button>` 을 넣고,
정렬 상태를 `aria-sort` 로 알린다 — `↑`/`↓` 글자는 `aria-hidden` 으로 감췄다.

확인: `Enter` 한 번에 `aria-sort` 가 `none → ascending → descending`.

### 움직임 줄이기 — `app/globals.css`

`@media (prefers-reduced-motion: reduce)` 로 전환·애니메이션을 끈다.
확인: `reducedMotion: "reduce"` 로 연 페이지에서 `.skip-link` 의 `transition-duration` 이 `1e-05s`.

### 낭독용 문구

- **차트** — `ChartFigure`(`components/findings.tsx`)로 감싸 `role="img"` + `aria-label`,
  거기에 **값을 문장으로** 붙인다. 이름만 주면 「막대 그래프」까지만 읽히고 값은 못 읽는다.
  일자별 정지시간은 「가장 긴 날 셋」, 불량률 추이는 「기준을 넘은 날 목록」으로 요약한다.
  차트 6곳에 적용
- **격자** — 라인×작업조 격자는 `<div>` 로 짠 것이라 숫자만 죽 늘어섰다.
  맨 앞에 「강조된 칸은 압연라인 C조, 12.08% 로 가장 높습니다」를 넣고,
  칸마다 `라인 조` 이름을, 빨간 칸에는 「가장 높음」을 숨은 글자로 붙였다
- **전월 대비** — `▲` 는 「올랐다」, 빨강은 「나쁘다」로 **뜻이 다르다.**
  판정이 색에만 있었다. 「개선」/「악화」를 숨은 글자로 함께 넣고 화살표는 `aria-hidden`
- **원본 표** — 불량률 5% 초과 셀이 빨강+굵게로만 표시됐다. 「5% 초과」를 붙였다
- **파레토 막대** — 오른쪽 숫자를 그림으로 다시 말한 것뿐이라 `aria-hidden`.
  대신 주황 막대에 「지금 보는 항목」을 붙였다

### 다시 계산됐다는 알림 — `app/page.tsx`

필터를 바꾸면 화면 전체가 다시 그려지는데 낭독기에는 아무 일도 안 일어난 것과 같았다.
`aria-live="polite"` 로 「2026-07 기준 324행, 조치가 필요한 구간 4건」을 알린다.
「표 복사」 버튼의 결과(`복사됨`)와 파일 읽는 중도 같은 방식으로 처리했다.
`aria-live` 영역: 대시보드 기준 **1개 → 4개**.

### 제목 위계와 폼 — `app/page.tsx`, `components/*`

- 상단 바의 `<span>생산·품질 실적</span>` → **`<h1>`**. 보이는 모양은 그대로다
- 구역마다 `<h2>`(요약 / 발견과 근거 / 전체 분석). 카드 안에 제목이 이미 보이는 곳은 `sr-only`
- 「불량률 기준」에 `<label htmlFor>` + `name` + `inputMode="decimal"` + `autoComplete="off"`
- 필터 버튼 묶음에 `role="group"` + 이름 (「라인」/「작업조」)
- 선택된 발견에 `aria-current` — 오렌지 띠와 배경색으로만 말하던 것
- 오류 카드에 `role="alert"`
- 표 머리글에 `scope="col"`, 표에 `aria-label`

---

## 3. 셀프리뷰가 잡은 것 중 내가 미리 생각 못 했던 것

DESIGN.md 를 쓸 때 「건너뛰기 링크·초점·움직임·대체 텍스트」는 이미 적어 뒀다.
가이드라인을 대고 나서 **처음 보인 것은 넷**이다.

### 1. 파일 입력이 키보드로 아예 안 닿았다

「초점 표시를 넣자」까지만 생각했지, **초점이 갈 수 없는 요소**가 있을 줄은 몰랐다.
가이드라인의 `outline-none / display:none without focus replacement` 항목을 따라가다
`class="hidden"` 을 발견했다. 이 앱의 **유일한 입구**가 키보드로 막혀 있었다.

### 2. 색이 아니라 «화살표»가 문제였다

「색만으로 구분하지 않는다」는 알고 있었다. 그런데 이 화면의 증감 배지는
화살표가 **이미 붙어 있어서** 통과한 줄 알았다. 아니었다 —
`▲` 는 방향(올랐다)이고 판정(좋다/나쁘다)은 색에만 있다.
불량률이 오르면 `▲` 이면서 빨강, 생산량이 오르면 `▲` 이면서 초록이다.
**중복 표시처럼 보이는 것이 실은 다른 정보였다.**

### 3. 대시보드에 `<h1>` 이 없었다

빈 화면에는 `<h1>` 이 있어서 「제목은 있다」고 넘겼다.
데이터를 올리면 그 화면이 통째로 사라지고 `<span>` 만 남는다는 걸 세어 보고서야 알았다.
**화면이 두 갈래인 앱에서는 두 갈래를 각각 세야 한다.**

### 4. 스크롤 영역을 내가 두 겹으로 만들었다

「표는 자기 컨테이너에서 가로 스크롤」을 지키려고 `overflow-x-auto` 래퍼를 씌웠는데,
shadcn 의 `<Table>` 이 **이미 `overflow-x-auto` 컨테이너를 만들고 있었다.**
Tab 정거장이 두 개로 늘어난 걸 보고 알았다. 걷어내고 표에 이름만 붙였다.
**고치는 과정에서 새로 만든 위반**이라, 셀프리뷰를 마지막에 한 번 더 돌린 값이 있다.

### 덤 — 테스트의 잠복 버그가 드러났다

빈 화면을 `<div>` → `<main>` 으로 바꾸자 E2E 하나가 깨졌다.
원인은 내 변경이 아니라 **전부터 틀려 있던 대기 조건**이었다.

```
await expect(page.getByText("조치가 필요한 구간")).toBeVisible()
```

`getByText` 는 부분 일치라, 빈 화면의 안내 문구
「…조치가 필요한 **구간을 찾아냅니다**」에도 걸려 **업로드가 끝나기 전에 통과**하고 있었다.
다른 테스트는 각자 assertion 이 다시 기다려 줘서 티가 안 났는데,
기다려 주지 않는 `boundingBox()` 하나가 빈 화면(896px)을 재고 만 것이다.
`{ exact: true }` 를 붙여 고쳤다. 폭 비교 자체는 그대로 뒀다.

---

## 4. 고치지 않고 남긴 것

| 남긴 것 | 이유 |
|---|---|
| **`transition-all`** (`ui/button.tsx`·`tabs.tsx`·`badge.tsx`·`toggle.tsx`) | 가이드라인이 안티패턴으로 지목한다. 다만 shadcn 이 생성한 원본 파일이라 다음 `shadcn add` 에서 되돌아온다. `prefers-reduced-motion` 블록이 전역으로 무력화하므로 실효 피해가 없다고 보고 남겼다 |
| **URL 에 상태 반영** | 가이드라인은 필터·탭을 쿼리 파라미터에 담으라고 한다. 이 앱은 파일을 브라우저 안에서만 처리해 링크를 공유해도 상대에게 데이터가 없다. **기능 변경**이기도 하다 |
| **`useEffect` 안의 `setState`** (`page.tsx:48`·`121`) | `eslint` 가 잡는다. 개선 전부터 있던 것이고 고치면 동작이 바뀐다 |
| **큰 숫자의 `tabular-nums`** | 가이드라인은 「숫자 열·비교」에 권한다. KPI 다섯은 서로 다른 지표라 자릿수를 맞출 대상이 아니고, 26px 에서 등폭은 자간이 벌어져 보인다. DESIGN.md 에 근거를 적고 유지 |
| **다크 모드** | `globals.css` 에 `.dark` 블록은 있지만 전환 장치가 없다. 인쇄해서 회의에 들고 가는 화면이라 만들지 않기로 하고, 대신 `color-scheme: light` 를 **명시**했다 |
| **큰 목록 가상화** | 가이드라인은 50행 초과 시 권한다. 원본 표는 기본 30행 + 「더 보기」로 이미 잘라 놓았다 |
| **표 스크롤 컨테이너에 이름** | shadcn `<Table>` 내부 `<div>` 라 props 를 넣을 수 없다. `ui/table.tsx` 를 고치는 대신 `<table>` 에 `aria-label` 을 붙였다 |

---

## 5. 검증

```
vitest      64 passed (2 files)
next build  Compiled successfully · TypeScript 통과
playwright  7 passed
```

E2E 7개는 개선 전과 같은 것들이다 — 레이아웃 붕괴, 빈 차트, 색 고정, 메모 유지,
오류 메시지, 콘솔 에러. **기능은 하나도 바꾸지 않았다.**

---

## 6. 교안에 쓸 한 문장

> **`before-top.png` 와 `after-top.png` 는 바이트까지 똑같습니다.**
> 첫 화면은 픽셀 하나 안 바뀌었는데, `Tab` 을 한 번 누르면 한쪽에만
> 「본문으로 건너뛰기」가 뜹니다. 디자인 지침이 바꾸는 건 대체로 이런 자리입니다.

### 슬라이드에 쓸 캡처 짝

| 짝 | 파일 | 무엇을 보여주나 |
|---|---|---|
| 첫 화면 | `before-top.png` ↔ `after-top.png` | **완전히 같다.** 눈으로는 아무 차이가 없다 |
| 첫 Tab | `before-tab.png` ↔ `after-tab.png` | 한쪽은 아무 일도 없고, 한쪽은 건너뛰기 링크가 뜬다 |
| 대시보드 | `before-data.png` ↔ `after-data.png` | 결론 카드의 오렌지 띠와 라벨 대비 |
| 대시보드 첫 Tab | `before-data-tab.png` ↔ `after-data-tab.png` | 초점이 오른쪽 끝 `인쇄 · PDF` 로 건너뛰던 것이 왼쪽 위 건너뛰기 링크로 |

캡처 스크립트: `교안/scripts/shoot-ex1-design.mjs` (`before`/`after` 인자, 개발 서버 `:3101`)
