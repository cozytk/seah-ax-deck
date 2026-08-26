/*
  images/ 를 빌드 결과로 복사한다.

  슬라이드의 그림은 마크다운 안 raw HTML 로 들어간다 —
  <figure class="shot"><img src="./images/…"></figure>.
  Vite 는 마크다운 본문의 HTML 속성을 자산으로 처리하지 않아서,
  이 경로들은 빌드에서 아무 일도 일어나지 않고 문자열 그대로 남는다.

  dev 서버는 파일 시스템에서 바로 읽어주므로 로컬에서는 멀쩡히 보인다.
  깨지는 건 배포한 다음이고, 그때는 그림 스무 장이 통째로 404 다.
  실제로 첫 배포에서 그렇게 됐다.

    node scripts/copy-images.mjs dist
*/
import { cp, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, process.argv[2] ?? "dist");

await mkdir(OUT, { recursive: true });
await cp(join(ROOT, "images"), join(OUT, "images"), { recursive: true });

console.log(`images/ → ${process.argv[2] ?? "dist"}/images/`);
