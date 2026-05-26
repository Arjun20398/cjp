"use client";

import { useRef, useCallback } from "react";

type QuoteData = {
  quote: string;
  author: string;
  court: string;
  year: string;
};

export default function QuoteCardGenerator({ quote, author, court, year }: QuoteData) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;

    ctx.fillStyle = "#0c0f1a";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "#c5a44e";
    ctx.fillRect(0, 0, W, 6);
    ctx.fillRect(0, H - 6, W, 6);
    ctx.fillRect(0, 0, 6, H);
    ctx.fillRect(W - 6, 0, 6, H);

    ctx.fillStyle = "#c5a44e";
    ctx.font = "bold 120px Georgia, serif";
    ctx.textAlign = "left";
    ctx.fillText("\u201C", 60, 160);

    ctx.fillStyle = "#ffffff";
    ctx.font = "italic 36px Georgia, serif";
    ctx.textAlign = "left";
    const lines = wrapText(ctx, quote, W - 160);
    const lineHeight = 52;
    const totalTextHeight = lines.length * lineHeight;
    const startY = Math.max(220, (H - totalTextHeight) / 2 - 40);
    lines.forEach((line, i) => {
      ctx.fillText(line, 80, startY + i * lineHeight);
    });

    ctx.fillStyle = "#c5a44e";
    ctx.font = "bold 120px Georgia, serif";
    ctx.textAlign = "right";
    ctx.fillText("\u201D", W - 60, startY + totalTextHeight + 40);

    const bottomY = Math.max(startY + totalTextHeight + 100, H - 200);

    ctx.fillStyle = "#c5a44e33";
    ctx.fillRect(60, bottomY - 20, W - 120, 2);

    ctx.fillStyle = "#c5a44e";
    ctx.font = "bold 28px Georgia, serif";
    ctx.textAlign = "left";
    ctx.fillText(`\u2014 ${author}`, 80, bottomY + 30);

    ctx.fillStyle = "#888888";
    ctx.font = "16px monospace";
    ctx.fillText(`${court} \u2022 ${year}`, 80, bottomY + 65);

    ctx.fillStyle = "#c5a44e";
    ctx.font = "bold 18px monospace";
    ctx.textAlign = "right";
    ctx.fillText("cheapjusticeofindia.com", W - 80, H - 40);

    ctx.fillStyle = "#c5a44e44";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("WALL OF SHAME", 80, H - 40);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cji-quote-${author.replace(/\s+/g, "-").toLowerCase()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [quote, author, court, year]);

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <button
        onClick={generate}
        className="text-[10px] px-2.5 py-1 rounded border border-border text-muted hover:text-gold hover:border-gold transition-colors"
        aria-label={`Download quote card by ${author}`}
      >
        📷 Card
      </button>
    </>
  );
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}
