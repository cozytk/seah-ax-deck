/*
  터미널 캡처(ANSI)를 슬라이드에 붙일 PNG 로 만든다.

  왜 필요한가.
  실습 증거는 「실제로 이렇게 나왔다」여야 한다. 그런데 터미널 창을 그대로
  화면 캡처하면 (1) 창 크기와 폰트가 그때그때 달라 장표마다 글자 크기가 튀고
  (2) macOS 화면 기록 권한이 필요하며 (3) 프롬프트에 사내 계정 주소 같은 게
  섞여 들어온다. 그래서 tmux 로 크기를 못 박아 돌리고, `capture-pane -e` 로
  나온 ANSI 바이트를 그대로 그린다. 글자는 CLI 가 내보낸 것 그대로다.

  입력  .omx/term/<이름>.ansi   (tmux capture-pane -p -e 결과)
  출력  images/term/<이름>.png

  사용  node scripts/term-render.mjs ctx-before ctx-after ...
        node scripts/term-render.mjs --all
        node scripts/term-render.mjs 'claudemd-obey:34-  >claudemd-answer'

  마지막 형태는 한 캡처를 줄 범위로 잘라 다른 이름으로 낸다. 긴 대화 하나가
  16:9 장표에 안 들어갈 때 앞뒤를 두 장으로 나눠 싣기 위한 것이다 —
  내용을 감추려고 자르는 게 아니라 두 장에 나눠 다 싣는다.
*/
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pw from "playwright-chromium";

const { chromium } = pw;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, ".omx", "term");
const OUT = join(ROOT, "images", "term");

/* xterm 256 색상표. 앞 16색은 터미널마다 다른데, Claude Code TUI 는
   16~255 구간만 쓰므로 앞 16색은 흔한 값으로 채워 둔다. */
const BASE16 = [
  "#1c1c1c", "#d16969", "#7ec699", "#d7ba7d", "#6fa8dc", "#c586c0", "#6ec2c2", "#c8ccd4",
  "#5a5f66", "#e88b8b", "#a3d9b1", "#e6d08a", "#96c0ea", "#dba7d9", "#93d6d6", "#f0f2f5",
];
const CUBE = [0, 95, 135, 175, 215, 255];
function xterm(i) {
  if (i < 16) return BASE16[i];
  if (i < 232) {
    const n = i - 16;
    const r = CUBE[Math.floor(n / 36)], g = CUBE[Math.floor(n / 6) % 6], b = CUBE[n % 6];
    return `rgb(${r},${g},${b})`;
  }
  const v = 8 + (i - 232) * 10;
  return `rgb(${v},${v},${v})`;
}

/* 동아시아 폭 2칸 문자인가. 한글·한자·가나와 전각 기호만 보면 된다. */
function isWide(cp) {
  return (
    (cp >= 0x1100 && cp <= 0x115f) ||
    (cp >= 0x2e80 && cp <= 0xa4cf && cp !== 0x303f) ||
    (cp >= 0xac00 && cp <= 0xd7a3) ||
    (cp >= 0xf900 && cp <= 0xfaff) ||
    (cp >= 0xfe30 && cp <= 0xfe6f) ||
    (cp >= 0xff00 && cp <= 0xff60) ||
    (cp >= 0xffe0 && cp <= 0xffe6)
  );
}

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function spanFor(text, st) {
  const style = [];
  let fg = st.fg, bg = st.bg;
  if (st.inverse) [fg, bg] = [bg ?? "var(--bg)", fg ?? "var(--fg)"];
  if (fg) style.push(`color:${fg}`);
  if (bg) style.push(`background:${bg}`);
  if (st.bold) style.push("font-weight:700");
  if (st.dim) style.push("opacity:.62");
  if (st.italic) style.push("font-style:italic");
  if (st.underline) style.push("text-decoration:underline");

  /* 넓은 글자는 폭을 2칸으로 못 박는다. 폰트마다 한글 폭이 달라서
     그냥 두면 표·박스 그림의 세로줄이 어긋난다. */
  let html = "";
  let run = "";
  for (const ch of text) {
    if (isWide(ch.codePointAt(0))) {
      if (run) { html += esc(run); run = ""; }
      html += `<i class="w">${esc(ch)}</i>`;
    } else run += ch;
  }
  if (run) html += esc(run);
  if (!style.length) return html;
  return `<span style="${style.join(";")}">${html}</span>`;
}

function ansiToHtml(raw) {
  const st = { fg: null, bg: null, bold: false, dim: false, italic: false, underline: false, inverse: false };
  let out = "";
  let buf = "";
  const flush = () => { if (buf) { out += spanFor(buf, st); buf = ""; } };

  const re = /\x1b\[([0-9;]*)m/g;
  let last = 0, m;
  while ((m = re.exec(raw))) {
    buf += raw.slice(last, m.index);
    last = re.lastIndex;
    flush();
    const codes = (m[1] || "0").split(";").map((n) => parseInt(n || "0", 10));
    for (let i = 0; i < codes.length; i++) {
      const c = codes[i];
      if (c === 0) Object.assign(st, { fg: null, bg: null, bold: false, dim: false, italic: false, underline: false, inverse: false });
      else if (c === 1) st.bold = true;
      else if (c === 2) st.dim = true;
      else if (c === 3) st.italic = true;
      else if (c === 4) st.underline = true;
      else if (c === 7) st.inverse = true;
      else if (c === 22) { st.bold = false; st.dim = false; }
      else if (c === 23) st.italic = false;
      else if (c === 24) st.underline = false;
      else if (c === 27) st.inverse = false;
      else if (c >= 30 && c <= 37) st.fg = xterm(c - 30);
      else if (c === 39) st.fg = null;
      else if (c >= 40 && c <= 47) st.bg = xterm(c - 40);
      else if (c === 49) st.bg = null;
      else if (c >= 90 && c <= 97) st.fg = xterm(c - 90 + 8);
      else if (c >= 100 && c <= 107) st.bg = xterm(c - 100 + 8);
      else if (c === 38 || c === 48) {
        const target = c === 38 ? "fg" : "bg";
        if (codes[i + 1] === 5) { st[target] = xterm(codes[i + 2]); i += 2; }
        else if (codes[i + 1] === 2) { st[target] = `rgb(${codes[i + 2]},${codes[i + 3]},${codes[i + 4]})`; i += 4; }
      }
    }
  }
  buf += raw.slice(last);
  flush();
  return out;
}

const PAGE = (body, cols) => `<!doctype html><meta charset="utf-8"><style>
  :root { --bg:#16181C; --fg:#CDD2D9; --cell: 12px; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background: var(--bg); }
  pre {
    /* Nerd Font 가 박스 그림·파워라인 글리프를 갖고 있어 먼저 둔다.
       ⛶ 같은 기호는 없어서 Menlo·Apple Symbols 로 흘려보낸다 —
       빠지면 네모 상자로 그려져 「빈 칸」 표시가 뭉개진다. */
    font-family: "JetBrainsMono Nerd Font Mono", Menlo, "Apple Symbols",
                 "Apple SD Gothic Neo", monospace;
    font-size: 20px; line-height: 1.42; color: var(--fg);
    padding: 26px 30px; white-space: pre; letter-spacing: 0;
    font-variant-ligatures: none; -webkit-font-smoothing: antialiased;
    width: max-content; min-width: ${cols}ch;
  }
  /* 넓은 글자만 2칸으로 못 박는다. overflow 를 hidden 으로 두면 inline-block 의
     기준선이 아래 모서리로 바뀌어 한글이 숫자보다 내려앉는다 — visible 로 둔다. */
  pre i.w { font-style: normal; display: inline-block; width: 2ch;
            overflow: visible; vertical-align: baseline; }
</style><pre>${body}</pre>`;

async function main() {
  let names = process.argv.slice(2);
  if (!names.length || names[0] === "--all") {
    names = (await fs.readdir(SRC)).filter((f) => f.endsWith(".ansi")).map((f) => f.replace(/\.ansi$/, ""));
  }
  await fs.mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });

  for (const spec of names) {
    /* `원본:시작-끝>낼이름` 을 풀어 낸다. 셋 다 없으면 원본 전체. */
    const m = /^([^:>]+)(?::(\d*)-(\d*))?(?:>(.+))?$/.exec(spec);
    const name = m[1];
    const from = m[2] ? parseInt(m[2], 10) : 1;
    const to = m[3] ? parseInt(m[3], 10) : Infinity;
    const outName = m[4] || name;
    const src = join(SRC, `${name}.ansi`);
    if (!existsSync(src)) { console.log(`  (없음) ${name}.ansi`); continue; }
    let raw = await fs.readFile(src, "utf8");
    /* OSC 8 하이퍼링크는 걷어낸다. 링크 글자는 남기고 URL 만 없앤다 —
       Claude Code 는 상태 표시줄에 세션 URL 을 링크로 심어 두는데,
       그대로 두면 그림에 세션 주소가 찍힌다. SGR 이 아닌 CSI 도 같이 뺀다. */
    raw = raw
      .replace(/\x1b\]8;[^\x07\x1b]*(?:\x07|\x1b\\)/g, "")
      .replace(/\x1b\[[0-9;?]*[A-Za-ln-z]/g, "");
    raw = raw.replace(/[ \t]+$/gm, "").replace(/\n+$/, ""); // 오른쪽 빈칸·끝 빈 줄 정리
    /* tmux 안내 줄은 뺀다. 이건 제품이 하는 말이 아니라 내 캡처 장치가
       만든 잡음이다 — 붙어 있지 않은(detached) 세션이라 계속 뜬다. */
    raw = raw
      .split("\n")
      .filter((l) => !/^\s*tmux (focus-events|detected)\b/.test(l.replace(/\x1b\[[0-9;]*m/g, "")))
      .slice(from - 1, to === Infinity ? undefined : to)
      .join("\n")
      .replace(/^\n+/, "")
      .replace(/\n+$/, "");
    /* 폭은 SGR 를 먼저 걷어낸 뒤에 잰다. 색 지정이 줄 끝 공백 뒤에 오는 줄이 있어서
       순서를 바꾸면 상태 표시줄 하나 때문에 폭이 두 배로 잡힌다. */
    const cols = Math.max(
      ...raw.split("\n").map((l) => l.replace(/\x1b\[[0-9;]*m/g, "").replace(/\s+$/, "").length),
    );
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.setContent(PAGE(ansiToHtml(raw), cols));
    await page.waitForTimeout(120);
    const box = await page.locator("pre").boundingBox();
    await page.setViewportSize({ width: Math.ceil(box.width), height: Math.ceil(box.height) });
    await page.waitForTimeout(80);
    const out = join(OUT, `${outName}.png`);
    await page.locator("pre").screenshot({ path: out });
    const { width, height } = await page.locator("pre").boundingBox();
    console.log(`  ${outName}.png  ${Math.round(width)}×${Math.round(height)}  (${cols}칸)`);
  }
  await browser.close();
}

main();
