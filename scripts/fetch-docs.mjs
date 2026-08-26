/*
  공식 문서에서 교안에 쓸 것을 가져온다.

  두 가지다.
    1. Antigravity 공식 제품 이미지 — 주소 그대로 내려받아 로컬에 둔다
    2. 문서 화면 캡처 — 인용한 문장이 실제로 그 페이지에 있다는 증거

  원격 주소를 슬라이드에 그대로 박지 않는다.
  강의장 네트워크가 막히면 장표가 비고, 그건 수업 중에 고칠 수 없다.

    node scripts/fetch-docs.mjs
*/
import { chromium } from "playwright-chromium";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const IMG = join(dirname(fileURLToPath(import.meta.url)), "..", "images", "docs");

/** 내려받을 공식 이미지 */
const ASSETS = [
  [
    "ag-plan.png",
    "https://antigravity.google/assets/image/docs/artifacts/artifact-implementation-plan.png",
  ],
  [
    "ag-plan-comments.png",
    "https://antigravity.google/assets/image/docs/artifacts/artifact-implementation-plan-comments.png",
  ],
  [
    "ag-lockup.svg",
    "https://antigravity.google/_astro/antigravity_product_lockup_full_color.aARNVLq7.svg",
  ],
];

/*
  캡처할 문서 페이지.
  clip 은 본문 시작 부분만 — 사이드바와 목차까지 넣으면 글자가 안 읽힌다.
*/
const PAGES = [
  ["cc-overview", "https://code.claude.com/docs/en/overview"],
  ["ag-overview", "https://antigravity.google/docs/overview"],
  ["ag-artifacts", "https://antigravity.google/docs/artifacts"],
  ["ag-plan-doc", "https://antigravity.google/docs/implementation-plan"],
];

await mkdir(IMG, { recursive: true });

for (const [name, url] of ASSETS) {
  const res = await fetch(url);
  if (!res.ok) {
    console.log(`${name.padEnd(20)} 실패 ${res.status}`);
    continue;
  }
  await writeFile(join(IMG, name), Buffer.from(await res.arrayBuffer()));
  console.log(`${name.padEnd(20)} 받음`);
}

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

/*
  본문 전체를 찍으면 세로로 길어서 슬라이드에서 손톱만 해진다.
  우리가 보여줄 건 인용한 문장이 실제로 거기 있다는 것뿐이므로,
  위에서부터 딱 그 문단까지만 남긴다.
*/
const CLIP_H = { "cc-overview": 320, "ag-overview": 560, "ag-artifacts": 420, "ag-plan-doc": 420 };

for (const [name, url] of PAGES) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const main = page.locator("main").first();
  const target = (await main.count()) ? main : page;
  const box = await target.boundingBox();
  await page.screenshot({
    path: join(IMG, `${name}.png`),
    clip: {
      x: box.x,
      y: box.y,
      width: Math.min(box.width, 1280 - box.x),
      height: Math.min(CLIP_H[name] ?? 420, box.height),
    },
  });
  console.log(`${name.padEnd(20)} 캡처`);
}

await browser.close();
