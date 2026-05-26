"use client";

import { useState, useRef, useCallback } from "react";

const FLAGGED_WORDS = [
  "accountability", "transparency", "corruption", "integrity", "nepotism",
  "collegium", "impeachment", "contempt", "RTI", "activist", "protest",
  "democracy", "justice", "reform", "audit", "complaint", "inquiry",
  "investigation", "whistleblower", "scam", "fraud", "bribery",
  "conflict of interest", "abuse of power", "misconduct", "delay",
  "pending", "backlog", "sealed cover", "adjournment", "bail",
  "independence", "oversight", "public interest", "PIL", "fundamental rights",
  "free speech", "censorship", "freedom", "truth", "facts", "evidence",
  "cockroach", "parasite",
];

export default function CensorshipSimulator() {
  const [input, setInput] = useState("");
  const [censored, setCensored] = useState<string | null>(null);
  const [flagCount, setFlagCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const censor = useCallback(() => {
    if (!input.trim()) return;
    let result = input;
    let count = 0;
    for (const word of FLAGGED_WORDS) {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      const matches = result.match(regex);
      if (matches) {
        count += matches.length;
        result = result.replace(regex, (m) => "█".repeat(m.length));
      }
    }
    setCensored(result);
    setFlagCount(count);
  }, [input]);

  const downloadImage = useCallback(() => {
    if (!censored) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 1080;
    const H = 1350;
    canvas.width = W;
    canvas.height = H;

    ctx.fillStyle = "#0c0f1a";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "#c5a44e";
    ctx.fillRect(0, 0, W, 6);
    ctx.fillRect(0, H - 6, W, 6);

    ctx.fillStyle = "#dc2626";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.fillText("⚠ CLASSIFIED — FOR AUTHORIZED EYES ONLY ⚠", W / 2, 50);

    ctx.fillStyle = "#c5a44e";
    ctx.font = "bold 32px Georgia, serif";
    ctx.fillText("TEXTBOOK CENSORSHIP BUREAU", W / 2, 110);

    ctx.fillStyle = "#888";
    ctx.font = "14px monospace";
    ctx.fillText("Supreme Court of Satire, Est. 2026", W / 2, 145);

    ctx.fillStyle = "#c5a44e33";
    ctx.fillRect(60, 170, W - 120, 2);

    ctx.fillStyle = "#ffffff";
    ctx.font = "22px Georgia, serif";
    ctx.textAlign = "left";
    const lines = wrapText(ctx, censored, W - 160);
    const lh = 36;
    const startY = 220;
    lines.slice(0, 25).forEach((line, i) => {
      ctx.fillText(line, 80, startY + i * lh);
    });

    const stampY = Math.min(startY + lines.length * lh + 60, H - 180);

    ctx.save();
    ctx.translate(W / 2, stampY);
    ctx.rotate(-0.15);
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 4;
    ctx.strokeRect(-200, -35, 400, 70);
    ctx.fillStyle = "#dc2626";
    ctx.font = "bold 28px monospace";
    ctx.textAlign = "center";
    ctx.fillText("HEADS MUST ROLL", 0, 10);
    ctx.restore();

    ctx.fillStyle = "#888";
    ctx.font = "12px monospace";
    ctx.textAlign = "center";
    ctx.fillText(`${flagCount} dangerous word(s) neutralized for national security`, W / 2, H - 80);

    ctx.fillStyle = "#c5a44e";
    ctx.font = "bold 16px monospace";
    ctx.fillText("cheapjusticeofindia.com", W / 2, H - 40);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "censored-document-cji.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [censored, flagCount]);

  return (
    <section id="censorship" className="border-b border-border py-16" aria-label="Textbook Censorship Bureau">
      <div className="max-w-2xl mx-auto px-4">
        <p className="text-muted text-sm mb-2">
          In 2026, the Supreme Court took suo motu cognizance of a Class VIII textbook
          that dared mention judicial corruption. Paste any text below and watch
          democracy in action.
        </p>
        <p className="text-xs text-accent mb-8">
          Words like &ldquo;accountability,&rdquo; &ldquo;transparency,&rdquo; and &ldquo;corruption&rdquo; will be redacted for national security.
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your essay, resume, cover letter, or any text here..."
          className="w-full h-40 bg-card-bg border border-border rounded-xl p-4 text-sm text-foreground placeholder:text-muted focus:border-gold focus:outline-none resize-none"
        />

        <button
          onClick={censor}
          disabled={!input.trim()}
          className="mt-4 px-8 py-3 bg-accent text-background font-bold text-sm rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🔍 Run Through the Censorship Bureau
        </button>

        {censored !== null && (
          <div className="mt-8 border border-border rounded-xl bg-card-bg p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] uppercase tracking-widest text-accent">
                ⚠ Classified Output — {flagCount} word(s) censored
              </p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/15 text-accent uppercase">
                Redacted
              </span>
            </div>
            <p className="font-mono text-sm text-foreground leading-relaxed whitespace-pre-wrap mb-6">
              {censored}
            </p>
            <div className="border-t border-border pt-4 flex flex-wrap gap-2">
              <button
                onClick={downloadImage}
                className="px-4 py-2 bg-gold text-background font-bold text-xs rounded-lg hover:bg-gold/90 transition-colors"
              >
                📷 Download as Image
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`🔒 My text was censored by the Textbook Censorship Bureau!\n\n${flagCount} dangerous words neutralized.\n\nTry it: cheapjusticeofindia.com`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-border text-muted text-xs rounded-lg hover:border-[#25d366] hover:text-[#25d366] transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🔒 The Textbook Censorship Bureau just censored ${flagCount} "dangerous" words from my text.\n\nWords like accountability & transparency are threats to national security, apparently.\n\nTry it: cheapjusticeofindia.com`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-border text-muted text-xs rounded-lg hover:border-gold hover:text-gold transition-colors"
              >
                𝕏 Post
              </a>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </section>
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
