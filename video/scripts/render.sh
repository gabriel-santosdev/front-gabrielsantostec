#!/usr/bin/env bash
# Renderiza em partes (pouca RAM), junta e adiciona a trilha.
set -e
cd "$(dirname "$0")/.."
npx remotion bundle src/index.ts --out-dir=build --log=error
: > out/parts/list.txt
for range in 0-239 240-479 480-719 720-959 960-1139; do
  f="out/parts/p${range}.mp4"
  [ -s "$f" ] || npx remotion render build PortfolioPromo "$f" --frames=$range --codec=h264 --crf=18 --concurrency=1 --muted --log=error
  echo "file 'p${range}.mp4'" >> out/parts/list.txt
done
npx remotion ffmpeg -y -f concat -safe 0 -i out/parts/list.txt -i public/music.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart out/portfolio-promo.mp4
echo DONE
