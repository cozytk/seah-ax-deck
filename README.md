# 세아지주 Claude Code 교안

- [수정본](https://cozytk.github.io/seah-ax-deck/)
- [수정 전 원본](https://cozytk.github.io/seah-ax-deck/original-20260910/)
- [1일차 샘플 엑셀·Windows MCP 설정](https://cozytk.github.io/seah-ax-deck/downloads/day1-samples.zip)

원래 테마와 스크린샷을 유지한 189장 교안. 1일차 7시간은 `sections/1일차-진행메모.md`에 따라 핵심 경로를 선택한다. 최근 보강 내용과 공식 근거는 `sections/보강-출처-20260910.md`에 기록했다.

내용 수정은 `sections/`에서 한다. `node scripts/assemble.mjs`로 `slides.md`와 `summary.md`를 조립한다. `pnpm dev`로 미리보기, `pnpm build:base`로 GitHub Pages용 빌드, `pnpm qa`로 전체 화면 검사. `pnpm qa:gate`는 실제 슬라이드 모아 보기 검토 기록이 필요하다.

원본 복구 기준은 `original-20260910` 태그. 배포 시 `gh-pages`의 `original-20260910/` 디렉터리는 보존한다.
