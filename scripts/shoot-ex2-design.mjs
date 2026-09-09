/*
  예제 2(수주 레이더)의 접근성 보강 전후를 같은 조건으로 찍는다.

  비교하려면 조건이 같아야 한다 — 폭·배율·스크롤 위치·데이터가 전부 같아야
  「달라진 건 코드뿐」이라고 말할 수 있다. 그래서 한 스크립트에서 태그만 바꿔 돌린다.

    (다른 창) cd 예시프로젝트-수주레이더 && pnpm exec next dev -p 3102
    node scripts/shoot-ex2-design.mjs before
    node scripts/shoot-ex2-design.mjs after

  출력: images/ex2/{before,after}-{top,tab}.png
*/
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pw from "playwright-chromium";

const { chromium } = pw;
const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "..", "images", "ex2");

const TAG = process.argv[2];
if (TAG !== "before" && TAG !== "after") {
  console.error("사용법: node scripts/shoot-ex2-design.mjs before|after");
  process.exit(1);
}

const BASE = process.env.EX2_BASE ?? "http://localhost:3102";
const W = 1440;

/** name, clip, prep(page) */
const SHOTS = [
  // 첫 화면. 「못생겼다」가 아니라 「보기엔 멀쩡하다」가 요점이라 상단을 그대로 찍는다.
  [`${TAG}-top`, { x: 0, y: 0, width: 1440, height: 760 }],

  /* Tab 을 한 번 눌렀을 때. 클릭으로 포커스를 옮기면 「그 다음 요소」로 가 버리므로
     포커스를 아예 풀고 첫 Tab 을 눌러야 문서의 첫 초점 대상이 나온다. */
  [
    `${TAG}-tab`,
    { x: 0, y: 0, width: 1440, height: 170 },
    async (page) => {
      await page.evaluate(() => document.activeElement?.blur());
      await page.keyboard.press("Tab");
      await page.waitForTimeout(400);
    },
  ],
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: W, height: 900 },
  deviceScaleFactor: 2,
  // 교안 이미지는 라이트 기준이다. OS 설정에 따라 다크로 찍히면 전후 비교가 깨진다.
  colorScheme: "light",
});

/* 개발 서버가 좌하단에 띄우는 배지. 교안 이미지에 들어가면 안 된다. */
await ctx.addInitScript(() => {
  const css = document.createElement("style");
  css.textContent = "nextjs-portal, [data-nextjs-toast] { display: none !important; }";
  document.addEventListener("DOMContentLoaded", () => document.head.append(css));
});

const page = await ctx.newPage();

for (const [name, clip, prep] of SHOTS) {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  // 스냅샷을 클라이언트에서 받아 그리므로 표가 채워질 때까지 기다린다
  await page.waitForSelector("table tbody tr", { timeout: 15000 });
  await page.waitForTimeout(600);
  if (prep) await prep(page);
  await page.screenshot({ path: join(OUT, `${name}.png`), clip });
  console.log(`${name.padEnd(14)} ${page.url()}`);
}

await browser.close();
