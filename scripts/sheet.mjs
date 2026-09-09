/*
  이미지 폴더 하나를 격자 한 장으로 묶어 본다.
  받아 온 자산이 실제로 쓸 만한지 눈으로 확인하는 용도다.

  사용: node scripts/sheet.mjs images/official .omx/official-sheet.png [열수]
*/
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { join, dirname, basename } from "node:path";

const [dir, out, colsArg] = process.argv.slice(2);
const COLS = Number(colsArg ?? 4);
const CELL_W = 460;
const CELL_H = 300;
const PAD = 8;
const LABEL = 22;

const files = (await readdir(dir)).filter((f) => f.endsWith(".png")).sort();
const rows = Math.ceil(files.length / COLS);
const W = COLS * (CELL_W + PAD) + PAD;
const H = rows * (CELL_H + LABEL + PAD) + PAD;

const layers = [];
for (const [i, f] of files.entries()) {
  const x = PAD + (i % COLS) * (CELL_W + PAD);
  const y = PAD + Math.floor(i / COLS) * (CELL_H + LABEL + PAD);

  const img = await sharp(join(dir, f))
    .resize(CELL_W, CELL_H, { fit: "contain", background: "#1b1d20" })
    .toBuffer();
  layers.push({ input: img, left: x, top: y + LABEL });

  const label = Buffer.from(
    `<svg width="${CELL_W}" height="${LABEL}"><text x="2" y="15" font-family="monospace" font-size="13" fill="#e6e8ea">${basename(f, ".png")}</text></svg>`,
  );
  layers.push({ input: label, left: x, top: y });
}

await mkdir(dirname(out), { recursive: true });
await sharp({ create: { width: W, height: H, channels: 3, background: "#111315" } })
  .composite(layers)
  .png()
  .toFile(out);

console.log(`${files.length}장 → ${out}  (${W}×${H})`);
