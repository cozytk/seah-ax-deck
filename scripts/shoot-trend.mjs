/*
  0부(AX 사례와 트렌드)에 쓸 바깥 페이지 캡처.

  왜 캡처인가. 발표문·기사는 링크만 걸면 수업 중에 아무도 안 연다. 화면을 띄워
  놓고 「여기 이렇게 적혀 있습니다」라고 짚을 수 있어야 근거가 근거가 된다.
  대신 캡처는 시점이 박히므로 figcaption 에 날짜와 원문 주소를 함께 남긴다.

  출력  images/trend/<이름>.png
  사용  node scripts/shoot-trend.mjs [이름 ...]
*/
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pw from "playwright-chromium";

const { chromium } = pw;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "images", "trend");

/* clip 은 페이지 좌표(CSS px). 히어로만 잘라 오는 게 목적이라
   대개 y=0 부터 800~1000 이면 제목·리드·핵심 문단이 다 들어온다. */
const SHOTS = [
  /* 삼성 뉴스룸(news.samsung.com)과 openai.com 은 자동 접근에 확인 화면을 띄운다.
     확인 절차를 뚫지 않는다 — 대신 같은 사실을 담은, 막지 않는 출처로 바꿨다.
     삼성은 보도 기사, Astra 는 OpenAI 가 직접 올린 개발자 포럼 공지다. */
  {
    name: "samsung",
    url: "https://www.ddaily.co.kr/page/view/2026060910411877728",
    anchor: "p.title", // 기사 제목. h1 은 이 사이트에선 제호(로고)다
    // 위로 분류, 아래로 발행일. 오른쪽은 음수로 당겨 광고 띠와 글자 크기 버튼을 뺀다
    pad: { top: 60, right: -430, bottom: 96, left: 60 },
  },
  {
    name: "astra",
    url: "https://community.openai.com/t/introducing-gpt-6-astra-the-most-intelligent-and-aligned-model-in-the-world/1394703",
    anchor: "#topic-title",
    // 제목 + 분류 + 첫 줄까지. 아래 발표 영상은 걸치면 잘려 보여 위에서 끊는다
    pad: { top: 22, right: -95, bottom: 122, left: 26 },
  },
  {
    name: "fable",
    url: "https://www.anthropic.com/claude-fable-and-mythos-5-1",
    clip: { x: 180, y: 190, width: 1080, height: 358 }, // 발표 시점 + 제목
  },
  {
    name: "aa-index",
    url: "https://artificialanalysis.ai/",
    anchor: "text=Intelligence Index v4.2", // 지수를 v4.2 로 갈아엎었다는 공지
    pad: { top: 46, right: 560, bottom: 130, left: 24 },
  },
  {
    name: "aa-chart",
    url: "https://artificialanalysis.ai/",
    anchor: "text=Highlights", // 지능·속도·비용 세 막대
    pad: { top: 18, right: 1330, bottom: 400, left: 14 },
  },
  {
    name: "aside",
    url: "https://aside.com/",
    anchor: "h1", // YC 배지 + 한 문장 + 내려받기 버튼
    pad: { top: 70, right: 40, bottom: 95, left: 40 },
  },
];

/* 쿠키·구독 배너는 캡처의 절반을 덮는다. 눈에 보이는 거절 버튼만 누른다 —
   「모두 허용」은 누르지 않는다. */
const DISMISS = [
  "text=거부", "text=모두 거부", "text=Reject all", "text=Decline",
  "text=Necessary only", "[aria-label='Close']", "text=닫기",
];

async function main() {
  const want = process.argv.slice(2);
  const list = want.length ? SHOTS.filter((s) => want.includes(s.name)) : SHOTS;
  await fs.mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  /* 기본 헤드리스 UA 로는 봇 판정에 걸려 확인 화면만 찍히는 사이트가 있다.
     평범한 데스크톱 크롬으로 보이게만 맞춘다 — 확인 절차를 우회하지는 않는다.
     그래도 확인 화면이 나오면 그 사이트는 캡처를 포기하고 다른 출처를 쓴다. */
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
    locale: "ko-KR",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    extraHTTPHeaders: { "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8" },
  });
  const page = await ctx.newPage();

  for (const shot of list) {
    try {
      await page.goto(shot.url, { waitUntil: "networkidle", timeout: 90000 });
    } catch {
      await page.goto(shot.url, { waitUntil: "domcontentloaded", timeout: 90000 });
    }
    for (const sel of DISMISS) {
      const el = page.locator(sel).first();
      if (await el.isVisible().catch(() => false)) {
        await el.click().catch(() => {});
        await page.waitForTimeout(400);
      }
    }
    await page.waitForTimeout(2500);
    const out = join(OUT, `${shot.name}.png`);
    let clip = shot.clip;
    /* 광고가 위에서 늦게 자리를 잡는 페이지는 고정 좌표로 자르면 매번 어긋난다.
       기준 요소를 찾아 그 상자를 기준으로 잘라야 같은 자리가 나온다. */
    if (shot.anchor) {
      const box = await page.locator(shot.anchor).first().boundingBox();
      if (!box) throw new Error(`기준 요소를 못 찾음: ${shot.anchor}`);
      const p = shot.pad ?? { top: 24, right: 24, bottom: 24, left: 24 };
      clip = {
        x: Math.max(0, box.x - p.left),
        y: Math.max(0, box.y - p.top),
        width: Math.min(1440 - Math.max(0, box.x - p.left), box.width + p.left + p.right),
        height: box.height + p.top + p.bottom,
      };
    }
    await page.screenshot({ path: out, clip });
    console.log(`  ${shot.name}.png  ${Math.round(clip.width)}×${Math.round(clip.height)}  ${shot.url}`);
  }
  await browser.close();
}

main();
