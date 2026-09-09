/*
  구간 초안의 <!-- IMG: … --> 자리표시자를 실제 <figure> 로 바꾼다.

  초안을 쓴 사람은 그림을 고르지 않는다(어떤 자산이 있는지 모르니까).
  자리표시자만 남기고, 자산과 출처를 아는 조립 단계에서 여기서 한 번에 채운다.

  data-origin="web" 을 쓰면 QA 가 figcaption 안에 data-source 와 똑같은 href 의
  <a> 를 요구한다. 그래서 캡션 링크를 여기서 같이 만든다.

  사용: node scripts/wire-images.mjs
*/
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** file, 자리표시자 안에 든 고유 문구, img 경로, alt, 캡션 앞말, 출처 URL(없으면 실습 캡처) */
const WIRES = [
  ["1-C.md", "rewind-and-summarize", "docs/rewind.png",
    "공식 문서의 되감기 설명. 입력창이 비어 있을 때 Esc 를 두 번 누르면 메뉴가 열린다고 적혀 있다",
    "원문", "https://code.claude.com/docs/en/checkpointing#rewind-and-summarize"],
  ["1-C.md", "checkpointing#limitations", "docs/ckpt-limits.png",
    "공식 문서의 체크포인트 한계 목록",
    "원문", "https://code.claude.com/docs/en/checkpointing#limitations"],

  ["1-D.md", "official/fast-mode", "official/fast-mode.png",
    "모델을 고르는 실제 화면. 목록에서 모델을 고르고 빠른 모드를 켤 수 있다",
    "실제 화면", "https://code.claude.com/docs/en/whats-new/2026-w20"],
  ["1-D.md", "model-config#choose-an-effort-level", "docs/effort.png",
    "공식 문서의 effort 단계 설명",
    "원문", "https://code.claude.com/docs/en/model-config#adjust-effort-level"],

  ["1-E.md", "analyze-before-you-edit-with-plan-mode", "docs/plan-mode.png",
    "공식 문서의 계획 모드 설명. 파일을 고치기 전에 먼저 조사하고 계획을 내놓는다고 적혀 있다",
    "원문", "https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode"],
  ["1-E.md", "sub-agents#built-in-subagents", "docs/subagents-builtin.png",
    "공식 문서의 내장 서브에이전트 목록",
    "원문", "https://code.claude.com/docs/en/sub-agents#built-in-subagents"],
  ["1-E.md", "queue-messages-while-claude-works", "docs/queue.png",
    "공식 문서의 메시지 큐 설명. 작업 중에 보낸 메시지가 순서대로 쌓인다고 적혀 있다",
    "원문", "https://code.claude.com/docs/en/interactive-mode#queue-messages-while-claude-works"],
  ["1-E.md", "official/subagents-vs-teams", "official/subagents-vs-teams.png",
    "서브에이전트와 에이전트 팀을 나란히 그린 공식 도해. 왼쪽은 결과만 회신하고 오른쪽은 공유 목록을 두고 서로 통신한다",
    "공식 도해", "https://code.claude.com/docs/en/agent-teams"],

  ["1-F.md", "memory#claudemd-vs-auto-memory", "docs/memory.png",
    "공식 문서의 비교표. 누가 쓰는지·무엇이 담기는지·적용 범위가 CLAUDE.md 와 자동 메모리로 나뉘어 있다",
    "원문", "https://code.claude.com/docs/en/memory#claude-md-vs-auto-memory"],

  ["1-G.md", "mcp#mcp-installation-scopes", "docs/mcp-scopes.png",
    "공식 문서의 MCP 설치 범위 표",
    "원문", "https://code.claude.com/docs/en/mcp#mcp-installation-scopes"],

  ["1-H.md", "official/desktop-browser-crop", "official/desktop-browser-crop.png",
    "데스크톱 앱 화면. 왼쪽 대화에 브라우저를 조작한 기록과 고친 코드가 쌓여 있고, 오른쪽 브라우저 패널에 만든 주문 화면이 떠 있다",
    "실제 화면", "https://code.claude.com/docs/en/whats-new/2026-w28"],
  ["1-H.md", "desktop#let-claude-use-your-computer", "docs/computer-use.png",
    "공식 문서의 컴퓨터 제어 설명. 어떤 조건에서 켜지는지가 적혀 있다",
    "원문", "https://code.claude.com/docs/en/desktop#when-computer-use-applies"],

  ["1-I.md", "give-claude-a-way-to-verify-its-work", "docs/verify-first.png",
    "공식 문서. 만든 것이 맞는지 스스로 확인할 방법을 먼저 주라고 적혀 있다",
    "원문", "https://code.claude.com/docs/en/best-practices#give-claude-a-way-to-verify-its-work"],

  ["2-antigravity.md", "antigravity.google/docs/overview", "docs/ag-overview.png",
    "Antigravity 공식 문서 개요 첫 문단",
    "원문", "https://antigravity.google/docs/overview/"],
  ["2-antigravity.md", "antigravity.google/docs/artifacts", "docs/ag-artifacts.png",
    "Antigravity 공식 문서의 아티팩트 정의 문단",
    "원문", "https://antigravity.google/docs/artifacts/"],
];

/* 같은 파일에 같은 URL 이 두 번 나오는 자리(2-antigravity 의 implementation-plan)는
   순서대로 다른 그림을 넣어야 해서 따로 처리한다. */
const ORDERED = [
  ["2-antigravity.md", "implementation-plan", [
    ["docs/ag-plan-crop.png", "Antigravity 의 실행 계획 화면. 기술 스택과 알고리즘을 사람에게 확인받는 항목이 나열되어 있다", "계획 아티팩트"],
    ["docs/ag-plan-crop.png", "Antigravity 의 실행 계획 본문", "계획 아티팩트"],
    ["docs/ag-plan-comments.png", "계획 문서 위에 인라인 코멘트 두 개가 달린 화면", "코멘트를 단 모습"],
  ], "https://antigravity.google/docs/implementation-plan/"],
];

function figure({ img, alt, capLead, url }) {
  const short = url.replace(/^https:\/\//, "").replace(/\/$/, "");
  return [
    `<figure class="shot nochrome" data-origin="web" data-source="${url}">`,
    `<img src="./images/${img}" alt="${alt}" />`,
    `<figcaption>${capLead} · <a href="${url}"><code>${short}</code></a></figcaption>`,
    `</figure>`,
  ].join("\n");
}

let wired = 0;
for (const [file, needle, img, alt, capLead, url] of WIRES) {
  const p = join(ROOT, "sections", file);
  let s = await fs.readFile(p, "utf8");
  const re = new RegExp(`^<!-- IMG:[^\\n]*${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^\\n]*-->$`, "m");
  if (!re.test(s)) { console.log(`✗ ${file}  ${needle}`); continue; }
  s = s.replace(re, figure({ img, alt, capLead, url }));
  await fs.writeFile(p, s);
  wired++;
  console.log(`✓ ${file.padEnd(20)} ${img}`);
}

for (const [file, needle, list, url] of ORDERED) {
  const p = join(ROOT, "sections", file);
  let s = await fs.readFile(p, "utf8");
  let i = 0;
  s = s.replace(new RegExp(`^<!-- IMG:[^\\n]*${needle}[^\\n]*-->$`, "gm"), () => {
    const [img, alt, capLead] = list[Math.min(i++, list.length - 1)];
    wired++;
    console.log(`✓ ${file.padEnd(20)} ${img}`);
    return figure({ img, alt, capLead, url });
  });
  await fs.writeFile(p, s);
}

console.log(`\n총 ${wired} 자리 연결`);
