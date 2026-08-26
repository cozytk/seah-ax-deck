/*
  배포된 라이브 URL 을 직접 검증한다. 로컬 dist 가 멀쩡한 것과 별개다.

  서브패스 배포(/seah-ax-deck/)에서 실제로 깨지는 두 가지를 본다.
    1. 죽은 preload — asset 404. 로컬에서는 안 나온다
    2. 화살표 내비 — base 가 두 번 붙어 경로가 깨지는 회귀가 있었다.
       라우트를 직접 방문하는 걸로는 안 드러나고, 키보드로 넘겨봐야 나온다.

    node scripts/verify-live.mjs [url]
*/
import { chromium } from "playwright-chromium";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE = process.argv[2] ?? "https://cozytk.github.io/seah-ax-deck/";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", ".omx", "live");

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });

const notFound = [];
page.on("response", (r) => {
  if (r.status() === 404) notFound.push(r.url());
});
const consoleErrors = [];
page.on("pageerror", (e) => consoleErrors.push(e.message));

await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.screenshot({ path: join(OUT, "live-01.png") });
console.log("표지 :", await page.title());

/* 화살표로 세 장 넘기며 URL 이 실제로 바뀌는지 본다 */
const urls = [page.url()];
for (let i = 0; i < 3; i++) {
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(700);
  urls.push(page.url());
}
console.log("내비 :", urls.map((u) => u.replace(BASE, "…/")).join("  →  "));
await page.screenshot({ path: join(OUT, "live-04.png") });

/* 대표 장표 몇 개를 직접 방문 */
for (const n of [5, 13, 35, 62]) {
  await page.goto(`${BASE}#/${n}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(OUT, `live-${String(n).padStart(2, "0")}.png`) });
}

/* SPA 딥링크의 404 는 정상(404.html 폴백). 그 외 asset 404 만 문제다 */
const assetMisses = notFound.filter((u) => /\.(js|css|png|svg|woff2?|json)(\?|$)/.test(u));

console.log("\nasset 404 :", assetMisses.length ? assetMisses : "없음");
console.log("페이지 오류 :", consoleErrors.length ? consoleErrors : "없음");

await browser.close();
if (assetMisses.length || consoleErrors.length) process.exitCode = 1;
