/*
  플러그인 검증 산출물(~/Documents/claude-plugin-eval/outputs/*.html)에서
  교안에 넣을 화면을 찍는다.

  같은 프롬프트에 지시 한 줄만 바꿔 나온 결과들이라, 비교하려면
  폭·스크롤 위치·기다림이 전부 같아야 한다. 그래서 한 스크립트에서 한 번에 찍는다.

  출력: images/plugin-eval/
*/
import os from "node:os";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pw from "playwright-chromium";

const { chromium } = pw;
const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(os.homedir(), "Documents", "claude-plugin-eval", "outputs");
const OUT = join(HERE, "..", "images", "plugin-eval");

const W = 1440;

/** name, file, clip{x,y,width,height}, prep(page) */
const SHOTS = [
  // 베이스라인. 「못생겼다」가 아니라 「보기엔 멀쩡하다」가 요점이라 상단을 그대로 찍는다.
  ["A1-N-hero", "A1-N.html", { x: 0, y: 0, width: 1440, height: 700 }],

  // 공식 frontend-design. 열마다 타입 배지와 미니 히스토그램이 붙는다.
  ["A1-F-columns", "A1-F.html", { x: 0, y: 0, width: 1440, height: 700 }],

  // 나란히 놓고 비교할 두 장. 높이를 같게 맞춘다.
  ["A1-N-top", "A1-N.html", { x: 0, y: 0, width: 1440, height: 620 }],
  ["A1-TG-top", "A1-TG.html", { x: 0, y: 0, width: 1440, height: 620 }],

  /* 검사기가 「그라디언트」로 센 것의 정체 — 헤더 바로 아래 눈금자 띠.
     띠 자체가 20px 남짓이라 크게 잘라 두면 히어로가 화면을 차지해 눈금이 안 보인다.
     헤더와 띠까지만 남긴다. */
  ["A1-F-ruler", "A1-F.html", { x: 0, y: 0, width: 1440, height: 132 }],

  /* Tab 한 번에 나타나는 「본문으로 건너뛰기」. 셀프리뷰 한 줄이 만든 차이.
     같은 조작을 베이스라인에도 해서 「없다」를 나란히 보여준다 —
     한쪽만 찍으면 원래 그런 건지 개입의 결과인지 알 수 없다. */
  [
    "A1-N-skip",
    "A1-N.html",
    { x: 0, y: 0, width: 1440, height: 170 },
    async (page) => {
      await page.evaluate(() => document.activeElement?.blur());
      await page.keyboard.press("Tab");
      await page.waitForTimeout(400);
    },
  ],
  [
    "A1-TG-skip",
    "A1-TG.html",
    { x: 0, y: 0, width: 1440, height: 170 },
    async (page) => {
      // 클릭으로 포커스를 옮기면 「그 다음 요소」로 가 버린다. 포커스를 아예 풀고
      // 첫 Tab 을 눌러야 문서의 첫 초점 대상 — 즉 건너뛰기 링크가 나온다.
      await page.evaluate(() => document.activeElement?.blur());
      await page.keyboard.press("Tab");
      await page.waitForTimeout(400);
    },
  ],
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: 900 }, deviceScaleFactor: 2 });

for (const [name, file, clip, prep] of SHOTS) {
  await page.goto(`file://${join(SRC, file)}`, { waitUntil: "networkidle", timeout: 60000 });
  // 차트가 그려질 시간을 준다. 애니메이션이 도는 중에 찍으면 막대가 반쯤 올라온 채로 남는다.
  await page.waitForTimeout(1800);
  if (prep) await prep(page);
  await page.screenshot({ path: join(OUT, `${name}.png`), clip });
  console.log(`${name.padEnd(16)} ${file}`);
}

await browser.close();
