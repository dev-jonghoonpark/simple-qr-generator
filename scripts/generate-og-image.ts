import { createCanvas } from "@napi-rs/canvas";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WIDTH = 1200;
const HEIGHT = 630;

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext("2d");

// Background
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// Draw a sample QR-like pattern (stylized grid)
const qrSize = 200;
const qrX = (WIDTH - qrSize) / 2;
const qrY = 160;
const cellSize = qrSize / 25;

// Generate a simple QR-like pattern for visual effect
const rng = (x: number, y: number) => ((x * 7 + y * 13 + 37) * 31) % 100;

ctx.fillStyle = "#1a1a1a";
for (let row = 0; row < 25; row++) {
  for (let col = 0; col < 25; col++) {
    // Position detection patterns (corners)
    const isTopLeft = row < 7 && col < 7;
    const isTopRight = row < 7 && col >= 18;
    const isBottomLeft = row >= 18 && col < 7;

    let fill = false;

    if (isTopLeft || isTopRight || isBottomLeft) {
      // Outer border
      const lr = isTopLeft ? row : isTopRight ? row : row - 18;
      const lc = isTopLeft ? col : isTopRight ? col - 18 : col;
      if (lr === 0 || lr === 6 || lc === 0 || lc === 6) fill = true;
      else if (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4) fill = true;
    } else {
      fill = rng(row, col) > 45;
    }

    if (fill) {
      ctx.fillRect(
        qrX + col * cellSize,
        qrY + row * cellSize,
        cellSize,
        cellSize
      );
    }
  }
}

// Title
ctx.fillStyle = "#1a1a1a";
ctx.font = "bold 48px sans-serif";
ctx.textAlign = "center";
ctx.fillText("Simple QR Generator", WIDTH / 2, qrY + qrSize + 70);

// Subtitle
ctx.fillStyle = "#666666";
ctx.font = "24px sans-serif";
ctx.fillText(
  "URL to QR Code — Free, No Ads, No Sign-up",
  WIDTH / 2,
  qrY + qrSize + 115
);

// Feature pills
const pills = ["SVG", "PNG", "Clipboard", "Custom Colors"];
const pillY = qrY + qrSize + 155;
const pillHeight = 36;
const pillPadding = 20;
const pillGap = 12;

ctx.font = "16px sans-serif";
const pillWidths = pills.map((p) => ctx.measureText(p).width + pillPadding * 2);
const totalPillWidth =
  pillWidths.reduce((a, b) => a + b, 0) + pillGap * (pills.length - 1);
let pillX = (WIDTH - totalPillWidth) / 2;

pills.forEach((pill, i) => {
  const w = pillWidths[i];
  // Rounded rect
  const r = pillHeight / 2;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, w, pillHeight, r);
  ctx.fillStyle = "#f0f4ff";
  ctx.fill();
  ctx.strokeStyle = "#2563eb";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "#2563eb";
  ctx.font = "16px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(pill, pillX + w / 2, pillY + pillHeight / 2 + 5.5);

  pillX += w + pillGap;
});

// Bottom accent line
ctx.fillStyle = "#2563eb";
ctx.fillRect(0, HEIGHT - 6, WIDTH, 6);

// Save
const buffer = canvas.toBuffer("image/png");
const outPath = resolve(__dirname, "../public/og-image.png");
writeFileSync(outPath, buffer);
console.log(`OG image saved to ${outPath} (${buffer.length} bytes)`);
