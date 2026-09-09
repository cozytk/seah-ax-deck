/*
  cmux 검증 캡처(3456×2234)에서 슬라이드에 넣을 구간만 잘라낸다.

  두 가지를 동시에 지켜야 한다.
  ① 가르칠 내용은 통째로 — 프롬프트 줄, 선택지 전부, 상태줄까지.
  ② 사내 계정 주소(tk.kim@cobslab.com)가 한 픽셀도 남지 않게.
     이 주소는 셸 프롬프트 오른쪽에 매 줄 붙어 있어서, 가로로 자르는 것만으로는
     안 지워진다. 해당 줄이 통째로 빠지는 세로 구간을 골라야 한다.

  일부 장면은 화면 위아래로 떨어져 있어 두 조각을 이어 붙인다(stack).

  원본: ~/cmux-claude-verification/screenshots/
  출력: images/cmux/
*/
import sharp from "sharp";
import os from "node:os";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(os.homedir(), "cmux-claude-verification", "screenshots");
const OUT = join(HERE, "..", "images", "cmux");

/** left, top, width, height — 원본 픽셀 */
const JOBS = [
  /* 01-cmux-open 은 버렸다. 셸 프롬프트가 매 줄 `사용자@회사.com` 을 달고 있는데
     이 캡처는 그 줄 말고 보여줄 게 없다(빈 프롬프트와 스크롤백뿐). 어디를 잘라도
     주소가 남거나 내용이 사라진다. 「터미널을 연다」는 아래 02 의 첫 줄로 대신한다. */

  // 실행한 명령 → Accessing workspace → 안전 확인 문단 → 두 선택지 → Enter 안내.
  // 1520 부터 시작해야 바로 위의 계정 주소 줄이 빠진다.
  ["02-claude-trust-prompt", "02-trust", [{ left: 0, top: 1520, width: 1910, height: 700 }]],

  // 기동 화면. 로고·버전·모델 줄은 맨 위, 모드 표시는 맨 아래라 사이를 버리고 붙인다.
  ["03-claude-started", "03-started", [
    { left: 0, top: 195, width: 1900, height: 150 },
    { left: 0, top: 2150, width: 1900, height: 80 },
  ]],

  // 두 줄로 접힌 프롬프트 전문 + 상태줄
  ["04-prompt-typed", "04-typed", [{ left: 0, top: 2000, width: 1900, height: 225 }]],

  // Write → Wrote 1 line → 코드 → 실행 → 결과 → Baked for 9s
  ["05-task-complete", "05-done", [{ left: 0, top: 730, width: 1900, height: 700 }]],

  // Bash 권한 다이얼로그. 선택지 네 개가 전부 들어와야 한다.
  ["06-permission-prompt", "06-permission", [{ left: 0, top: 1150, width: 1910, height: 540 }]],

  // 승인 후 실행 + manual mode 상태줄
  ["07-approved-done", "07-approved", [
    { left: 0, top: 940, width: 1900, height: 290 },
    { left: 0, top: 2150, width: 1900, height: 80 },
  ]],
];

await mkdir(OUT, { recursive: true });

for (const [src, out, regions] of JOBS) {
  const inPath = join(SRC, `${src}.png`);
  const outPath = join(OUT, `${out}.png`);

  if (regions.length === 1) {
    await sharp(inPath).extract(regions[0]).toFile(outPath);
  } else {
    // 조각을 위아래로 이어 붙인다. 사이에 가는 구분선을 둬서 잘라 붙였음을 숨기지 않는다.
    const GAP = 10;
    const pieces = await Promise.all(
      regions.map((r) => sharp(inPath).extract(r).png().toBuffer()),
    );
    const metas = await Promise.all(pieces.map((b) => sharp(b).metadata()));
    const width = Math.max(...metas.map((m) => m.width));
    const height = metas.reduce((a, m) => a + m.height, 0) + GAP * (pieces.length - 1);
    let y = 0;
    const layers = [];
    for (let i = 0; i < pieces.length; i++) {
      layers.push({ input: pieces[i], left: 0, top: y });
      y += metas[i].height + GAP;
    }
    await sharp({
      create: { width, height, channels: 3, background: { r: 20, g: 20, b: 20 } },
    })
      .composite(layers)
      .toFile(outPath);
  }

  const m = await sharp(outPath).metadata();
  console.log(`${out.padEnd(14)} ${m.width}×${m.height}  ${(m.width / m.height).toFixed(2)}:1`);
}
