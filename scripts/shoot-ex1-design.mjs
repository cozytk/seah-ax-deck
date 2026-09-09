/*
  예제 1(생산·품질 실적 대시보드)의 디자인 개선 전후를 같은 조건으로 찍는다.

  before / after 를 나란히 놓으려면 폭·스크롤 위치·데이터 상태가 전부 같아야 한다.
  그래서 한 스크립트에서 단계(phase)만 인자로 받아 두 번 돌린다.

    node scripts/shoot-ex1-design.mjs before
    node scripts/shoot-ex1-design.mjs after

  개발 서버는 http://localhost:3101 에 미리 떠 있어야 한다.
  출력: images/ex1/
*/
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pw from "playwright-chromium";

const { chromium } = pw;
const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "..", "images", "ex1");
const PROJECT = join(
  HERE,
  "..",
  "..",
  "예시프로젝트-생산실적대시보드",
);
const SAMPLE = join(PROJECT, "public", "sample.xlsx");

const BASE = "http://localhost:3101/";
const W = 1440;

const phase = process.argv[2];
if (phase !== "before" && phase !== "after") {
  console.error("사용법: node scripts/shoot-ex1-design.mjs before|after");
  process.exit(1);
}

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: W, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: "light",
});

/**
 * 첫 Tab 이 문서의 첫 초점 대상에 닿게 한다.
 * 클릭으로 포커스를 옮기면 「그 다음 요소」로 가 버리므로 포커스를 아예 푼 뒤 누른다.
 *
 * next dev 는 개발용 오버레이(<nextjs-portal>)를 문서 맨 앞에 꽂아 두는데,
 * 이게 첫 Tab 을 가로챈다. 실제 배포본에는 없는 물건이라 건너뛴다.
 * before·after 양쪽에 똑같이 적용해야 비교가 공정하다.
 */
async function firstTab() {
  await page.evaluate(() => document.activeElement?.blur());
  await page.keyboard.press("Tab");
  await page.waitForTimeout(200);
  const onOverlay = await page.evaluate(
    () => document.activeElement?.tagName.toLowerCase() === "nextjs-portal",
  );
  if (onOverlay) {
    await page.keyboard.press("Tab");
  }
  await page.waitForTimeout(400);
}

async function loadSample() {
  await page.locator('input[type="file"]').first().setInputFiles(SAMPLE);
  /*
    exact 가 없으면 빈 화면의 안내 문구("…조치가 필요한 구간을 찾아냅니다")에도 걸려
    업로드가 끝나기 전에 통과한다. 발견 목록 카드의 제목만 이 글자와 정확히 같다.
  */
  await page
    .getByText("조치가 필요한 구간", { exact: true })
    .waitFor({ timeout: 20000 });
  // 차트가 다 그려질 시간. 반쯤 그려진 상태로 찍히면 비교가 안 된다.
  await page.waitForTimeout(2000);
}

// ── 1) 첫 화면 상단 ───────────────────────────────────────────
await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1200);
await page.screenshot({
  path: join(OUT, `${phase}-top.png`),
  clip: { x: 0, y: 0, width: 1440, height: 760 },
});
console.log(`${phase}-top.png`);

// ── 2) Tab 한 번 ─────────────────────────────────────────────
await firstTab();
await page.screenshot({
  path: join(OUT, `${phase}-tab.png`),
  clip: { x: 0, y: 0, width: 1440, height: 170 },
});
console.log(`${phase}-tab.png`);

// ── 3) 데이터가 올라간 상태 ────────────────────────────────────
await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(800);
await loadSample();
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.screenshot({
  path: join(OUT, `${phase}-data.png`),
  clip: { x: 0, y: 0, width: 1440, height: 760 },
});
console.log(`${phase}-data.png`);

// ── 4) 데이터가 올라간 상태에서 Tab 한 번 ───────────────────────
await firstTab();
await page.screenshot({
  path: join(OUT, `${phase}-data-tab.png`),
  clip: { x: 0, y: 0, width: 1440, height: 170 },
});
console.log(`${phase}-data-tab.png`);

await browser.close();
