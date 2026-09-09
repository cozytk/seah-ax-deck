/*
  공식 자산을 내려받아 교안에서 쓸 형태로 만든다.

  Claude Code 문서의 릴리스 노트(whats-new)에는 실제 제품 화면이 이미지와
  영상으로 올라와 있다. 데스크톱 레퍼런스 문서에는 캡처가 없지만 여기에는 있다.
  영상은 그대로 못 쓰니 대표 프레임 한 장을 뽑는다.

  프레임 위치는 자산마다 다르다. 앞부분은 대개 빈 화면이고,
  끝부분은 결과가 다 나온 뒤라 화면이 꽉 찬다. 자산별로 초를 지정한다.

  사용:  node scripts/fetch-official.mjs
         node scripts/fetch-official.mjs usage      (하나만)
*/
import { chromium } from "playwright-chromium";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "images", "official");

const CDN = "https://mintcdn.com/claude-code";

/** name, 경로, 종류, 영상이면 뽑을 초 */
const ASSETS = [
  // ── 이미지 ────────────────────────────────────────────────
  ["usage", `${CDN}/FTi4SBJ9YRs7d-5X/images/whats-new/usage.png?w=1100&fit=max&auto=format&n=FTi4SBJ9YRs7d-5X&q=85&s=1dfcf6d1c3b5693af8979fe0d3f34468`, "img"],
  ["fast-mode", `${CDN}/ITvjicPxe1SM3GX7/images/whats-new/fast-mode-opus-47.png?w=1100&fit=max&auto=format&n=ITvjicPxe1SM3GX7&q=85&s=73cd67b861da8a43d9c75dcad3bedd89`, "img"],
  ["workflows", `${CDN}/QsIrGXGFg6xd7joy/images/whats-new/dynamic-workflows.png?w=1100&fit=max&auto=format&n=QsIrGXGFg6xd7joy&q=85&s=c048e128f64da9eed08feda4dc663446`, "img"],
  ["web", `${CDN}/FTi4SBJ9YRs7d-5X/images/whats-new/web-redesign.jpeg?w=1100&fit=max&auto=format&n=FTi4SBJ9YRs7d-5X&q=85&s=a30f9ce4cd9c10934194e2dc427cb98e`, "img"],
  ["ios-sim", `${CDN}/N3yEaTYPXMXFrF6k/images/whats-new/ios-simulator.jpg?w=1100&fit=max&auto=format&n=N3yEaTYPXMXFrF6k&q=85&s=03d967821f13cb4b27bddd64a1ec2726`, "img"],
  ["subagents-vs-teams", `${CDN}/nsvRFSDNfpSU5nT7/images/subagents-vs-agent-teams-light.png?w=1100&fit=max&auto=format&n=nsvRFSDNfpSU5nT7&q=85&s=923986caa23c0ef2c27d7e45f4dce6d1`, "img"],
  ["artifacts-viewer", `${CDN}/kaHIYYMIYMYPxQg9/images/artifacts-viewer.png?w=1100&fit=max&auto=format&n=kaHIYYMIYMYPxQg9&q=85&s=3b4b1be6ec53a5f6de627958aa97172b`, "img"],

  // ── 영상 → 대표 프레임 ────────────────────────────────────
  ["desktop-browser", `${CDN}/x358isu_VzLnyTEN/images/whats-new/desktop-browser.mp4?fit=max&auto=format&n=x358isu_VzLnyTEN&q=85&s=8033e85a1cb0a37870a79e702c18f4e4`, "vid", 0.75],
  ["agent-view", `${CDN}/ITvjicPxe1SM3GX7/images/whats-new/agent-view.mp4?fit=max&auto=format&n=ITvjicPxe1SM3GX7&q=85&s=0eefe6cbe75464c8f7902bba630ab7a4`, "vid", 0.8],
  ["cross-session", `${CDN}/N3yEaTYPXMXFrF6k/images/whats-new/cross-session-messaging.mp4?fit=max&auto=format&n=N3yEaTYPXMXFrF6k&q=85&s=8f33c3390f78660a4a26dc980f46159f`, "vid", 0.8],
  ["session-recap", `${CDN}/FTi4SBJ9YRs7d-5X/images/whats-new/session-recap.mp4?fit=max&auto=format&n=FTi4SBJ9YRs7d-5X&q=85&s=0a8db1470bd0161a47efeb2f322af76f`, "vid", 0.85],
  ["artifacts", `${CDN}/1ylKDoQynT1UgfEK/images/whats-new/artifacts.mp4?fit=max&auto=format&n=1ylKDoQynT1UgfEK&q=85&s=7f5391559d2bc69989621b36322fcff1`, "vid", 0.85],
  ["design-skill", `${CDN}/2SnAdpL4dJ18nKb3/images/whats-new/design-skill.mp4?fit=max&auto=format&n=2SnAdpL4dJ18nKb3&q=85&s=0b376a94227c14a4204af89c4c9fd7ac`, "vid", 0.85],
  ["auto-continue", `${CDN}/2SnAdpL4dJ18nKb3/images/whats-new/desktop-auto-continue.mp4?fit=max&auto=format&n=2SnAdpL4dJ18nKb3&q=85&s=1937f489695feaea715e48ecfd7e62cd`, "vid", 0.8],
  ["ultrareview", `${CDN}/FTi4SBJ9YRs7d-5X/images/whats-new/ultrareview.mp4?fit=max&auto=format&n=FTi4SBJ9YRs7d-5X&q=85&s=0fb1271365d38f414ad155aeb8edb08e`, "vid", 0.85],
  ["goal", `${CDN}/ITvjicPxe1SM3GX7/images/whats-new/goal.mp4?fit=max&auto=format&n=ITvjicPxe1SM3GX7&q=85&s=6806df3780c548b93a02d6fa71da276b`, "vid", 0.8],
  ["push-notifications", `${CDN}/uII1TETOZxBUZ3lB/images/whats-new/push-notifications.mp4?fit=max&auto=format&n=uII1TETOZxBUZ3lB&q=85&s=c91a967139596500cbdb581a53822ac1`, "vid", 0.8],
  ["security", `${CDN}/QsIrGXGFg6xd7joy/images/whats-new/security-guidance.mp4?fit=max&auto=format&n=QsIrGXGFg6xd7joy&q=85&s=c91d865936411586f42b24c558bcdd1d`, "vid", 0.8],
];

const only = process.argv[2];
const jobs = only ? ASSETS.filter(([n]) => n === only) : ASSETS;

await mkdir(OUT, { recursive: true });

// mintcdn 은 평범한 fetch 를 막을 때가 있다. 브라우저 컨텍스트로 받는다.
const browser = await chromium.launch();
const ctx = await browser.newContext();

for (const [name, url, kind, at = 0.8] of jobs) {
  try {
    const res = await ctx.request.get(url, { timeout: 90000 });
    if (!res.ok()) {
      console.log(`${name.padEnd(20)} ✗ HTTP ${res.status()}`);
      continue;
    }
    const buf = Buffer.from(await res.body());

    if (kind === "img") {
      await writeFile(join(OUT, `${name}.png`), buf);
      console.log(`${name.padEnd(20)} ${(buf.length / 1024).toFixed(0)}KB`);
      continue;
    }

    // 영상: 임시로 떨군 뒤 지정 지점의 한 프레임만 뽑는다
    const tmp = join(OUT, `${name}.mp4`);
    await writeFile(tmp, buf);
    const { stdout } = await run("ffprobe", [
      "-v", "error", "-show_entries", "format=duration",
      "-of", "default=nw=1:nk=1", tmp,
    ]);
    const dur = parseFloat(stdout.trim());
    const t = (dur * at).toFixed(2);
    await run("ffmpeg", ["-y", "-loglevel", "error", "-ss", t, "-i", tmp, "-frames:v", "1", join(OUT, `${name}.png`)]);
    await unlink(tmp);
    console.log(`${name.padEnd(20)} 영상 ${dur.toFixed(1)}초 중 ${t}초 지점`);
  } catch (e) {
    console.log(`${name.padEnd(20)} ✗ ${e.message.split("\n")[0].slice(0, 70)}`);
  }
}

await browser.close();
