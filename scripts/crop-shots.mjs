/*
  실제 화면을 슬라이드에서 읽히는 크기로 잘라낸다.

  1440×900 전체를 슬라이드에 넣으면 제목 아래 남는 높이에 맞춰 축소되어
  표의 글자가 안 읽힌다. 강의실 프로젝터에서는 더 심하다.
  증거가 안 읽히면 증거가 아니다.

  좌표는 원본(2880×1800) 기준이다.
*/
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const IMG = join(dirname(fileURLToPath(import.meta.url)), "..", "images");

/** left, top, width, height — 원본 픽셀 */
const CROPS = [
  /* 목록 표의 머리와 앞 세 행.
     행을 더 넣으면 두 장을 위아래로 쌓았을 때 캡션 자리가 없어진다.
     칸이 뒤바뀐 것을 보여주는 데는 세 줄이면 충분하다. */
  ["site-v1", "site-v1-cols", { left: 360, top: 380, width: 2240, height: 300 }],
  ["site-v2", "site-v2-cols", { left: 360, top: 380, width: 2240, height: 300 }],

  // 결론 문장 + 지표 + 조치가 필요한 구간 + 교차표
  ["ex1-kpi", "ex1-crop", { left: 30, top: 270, width: 2820, height: 1180 }],

  // 숫자 카드 + 원문 확인 필요 + 표 머리
  ["ex2-briefing", "ex2-briefing-crop", { left: 30, top: 60, width: 2820, height: 1120 }],

  // 원문 ↔ 해석 두 열
  ["ex2-detail", "ex2-detail-crop", { left: 30, top: 60, width: 2820, height: 1200 }],

  // 수집 건수와 사이트 표기가 나란히 보이는 줄
  ["ex2-runs", "ex2-runs-crop", { left: 30, top: 60, width: 2820, height: 900 }],

  // 판단불가 구역이 목록 위에 따로 모여 있는 부분
  ["ex2-notices", "ex2-notices-crop", { left: 30, top: 60, width: 2820, height: 1180 }],

  /* 같은 도구·같은 프로젝트에 지침만 바꿔 뽑은 두 시안.
     아래쪽 빈 공간을 잘라내 둘을 같은 비율로 맞춘다.
     비교하려면 크기가 같아야 한다. */
  ["stitch-plain", "stitch-plain-crop", { left: 0, top: 0, width: 1280, height: 600 }],
  ["stitch-good", "stitch-good-crop", { left: 0, top: 0, width: 1280, height: 600 }],

  /* Antigravity 공식 문서의 Implementation Plan 원본은 5340px 로 너무 넓다.
     왼쪽 대화창을 버리고 계획 본문만 — 우리가 보여줄 건
     「기술 스택과 알고리즘을 사람에게 확인받는다」는 부분이다. */
  ["docs/ag-plan", "docs/ag-plan-crop", { left: 3060, top: 40, width: 1320, height: 1010 }],

  /*
    실습 캡처는 세로로 길다(1.1~1.6:1). 16:9 슬라이드에 제목까지 얹으면
    쓸 수 있는 높이가 380px 남짓이라, 세로로 긴 그림은 손톱만 해진다.

    그래서 「가장 가르칠 만한 띠」만 가로로 잘라낸다.
    답 전체를 다 보여주는 게 목적이 아니다 — 답이 어떤 모양으로 오는지가 목적이다.
  */
  ["lab/q1-what-can-do", "lab/q1-crop", { left: 0, top: 30, width: 1632, height: 700 }],
  ["lab/q2-followup", "lab/q2-crop", { left: 0, top: 300, width: 1602, height: 520 }],
  ["lab/q3-select-menu", "lab/q3-menu-crop", { left: 0, top: 60, width: 1590, height: 460 }],
  ["lab/q3-side-chat", "lab/q3-chat-crop", { left: 0, top: 650, width: 1618, height: 500 }],
  ["lab/q4-search", "lab/q4-crop", { left: 0, top: 250, width: 1588, height: 520 }],
  ["lab/q5-artifact", "lab/q5-crop", { left: 0, top: 30, width: 1152, height: 620 }],

  /* 공식 릴리스 노트 자산은 장식 여백이 넓다.
     슬라이드에서는 그 여백만큼 앱이 작아지므로 창만 남긴다. */
  ["official/desktop-browser", "official/desktop-browser-crop", { left: 150, top: 25, width: 965, height: 670 }],
];

for (const [src, out, region] of CROPS) {
  await sharp(join(IMG, `${src}.png`))
    .extract(region)
    .toFile(join(IMG, `${out}.png`));
  const m = await sharp(join(IMG, `${out}.png`)).metadata();
  console.log(`${out.padEnd(20)} ${m.width}×${m.height}  ${(m.width / m.height).toFixed(2)}:1`);
}
