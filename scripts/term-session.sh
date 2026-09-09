#!/usr/bin/env bash
# 실습 캡처용 tmux 세션을 연다.
#
# 왜 tmux 인가. 터미널 창을 그대로 찍으면 창 크기·폰트가 그때그때 달라
# 장표마다 글자 크기가 튄다. 칸 수를 못 박아 두면 캡처 폭이 항상 같다.
# focus-events·mouse 를 미리 켜는 건 Claude Code 가 안 켜져 있을 때
# 화면 아래에 안내 줄을 하나씩 띄우기 때문이다 — 그 줄이 그림에 남는다.
#
# 사용  scripts/term-session.sh <세션이름> <칸> <줄> <작업폴더> [claude 인자...]
set -euo pipefail
NAME=$1; COLS=$2; ROWS=$3; DIR=$4; shift 4

tmux kill-session -t "$NAME" 2>/dev/null || true
tmux set -g focus-events on 2>/dev/null || true
tmux set -g mouse on 2>/dev/null || true
tmux new-session -d -s "$NAME" -x "$COLS" -y "$ROWS" -c "$DIR"
tmux send-keys -t "$NAME" "clear; claude $*" Enter
sleep 14
