"use client";

import { useState, useRef, useCallback } from "react";
import excuseData from "../../content/data/excuses.json";

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ExcuseGenerator() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{
    action: string;
    excuse: string;
    outcome: string;
  } | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const playPop = useCallback(() => {
    try {
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      const notes = [523, 659, 784];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.connect(gain);
        gain.connect(ctx.destination);
        const t = now + i * 0.1;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.15, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.start(t);
        osc.stop(t + 0.25);
      });
    } catch {}
  }, []);

  const spawnConfetti = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;z-index:50";
    container.appendChild(canvas);
    const ctx2d = canvas.getContext("2d")!;
    const colors = ["#c5a44e", "#dc2626", "#facc15", "#f97316", "#22c55e", "#3b82f6"];
    const pieces = Array.from({ length: 60 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -10 - 2,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rv: (Math.random() - 0.5) * 15,
      gravity: 0.25,
      opacity: 1,
    }));
    let frame = 0;
    const animate = () => {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of pieces) {
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.rotation += p.rv;
        p.opacity -= 0.012;
        if (p.opacity <= 0) continue;
        alive = true;
        ctx2d.save();
        ctx2d.translate(p.x, p.y);
        ctx2d.rotate((p.rotation * Math.PI) / 180);
        ctx2d.globalAlpha = p.opacity;
        ctx2d.fillStyle = p.color;
        ctx2d.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx2d.restore();
      }
      frame++;
      if (alive && frame < 120) requestAnimationFrame(animate);
      else canvas.remove();
    };
    requestAnimationFrame(animate);
  }, []);

  function generate() {
    if (spinning) return;
    setSpinning(true);

    let ticks = 0;
    intervalRef.current = setInterval(() => {
      setResult({
        action: pick(excuseData.actions),
        excuse: pick(excuseData.excuses),
        outcome: pick(excuseData.results),
      });
      ticks++;
      if (ticks >= 12) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setSpinning(false);
        playPop();
        spawnConfetti();
      }
    }, 100);
  }

  return (
    <section id="excuse-generator" className="border-b border-border py-16 relative" ref={containerRef} aria-label="Judicial Excuse Generator">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <p className="font-serif text-gold text-xs uppercase tracking-[0.25em] mb-3">
          Interactive
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          The Judicial Excuse Generator
        </h2>
        <p className="text-muted text-sm mb-10">
          Click to generate a perfectly valid reason why your case didn&apos;t
          move forward today.
        </p>

        <div className="border border-border rounded-xl bg-card-bg p-8 mb-8">
          {result ? (
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gold mb-1">
                  The Judge
                </p>
                <p
                  className={`font-serif text-xl font-bold text-foreground ${spinning ? "opacity-50" : ""}`}
                >
                  {result.action}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gold mb-1">
                  Because
                </p>
                <p
                  className={`font-serif text-xl font-bold text-foreground ${spinning ? "opacity-50" : ""}`}
                >
                  {result.excuse}
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-[10px] uppercase tracking-widest text-accent mb-1">
                  Result
                </p>
                <p
                  className={`font-serif text-xl font-bold text-accent ${spinning ? "opacity-50" : ""}`}
                >
                  {result.outcome}
                </p>
              </div>
            </div>
          ) : (
            <div className="py-8">
              <p className="font-serif text-2xl text-muted italic">
                &ldquo;The wheels of justice turn slowly...&rdquo;
              </p>
              <p className="text-xs text-muted mt-2">
                Press the button to find out why
              </p>
            </div>
          )}
        </div>

        <button
          onClick={generate}
          disabled={spinning}
          className="px-8 py-3 bg-gold text-background font-bold text-sm rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {spinning ? "Generating Excuse..." : result ? "Generate Another" : "Generate Excuse"}
        </button>

        {result && !spinning && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => {
                const text = `⚖️ Judicial Excuse of the Day:\n\nThe Judge: ${result.action}\nBecause: ${result.excuse}\nResult: ${result.outcome}\n\n— cheapjusticeofindia.com`;
                navigator.clipboard.writeText(text);
              }}
              className="px-4 py-2 border border-border text-muted text-xs rounded-lg hover:border-gold hover:text-gold transition-colors"
            >
              📋 Copy
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`⚖️ Judicial Excuse of the Day:\n\nThe Judge: ${result.action}\nBecause: ${result.excuse}\nResult: ${result.outcome}\n\n— cheapjusticeofindia.com`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-border text-muted text-xs rounded-lg hover:border-[#25d366] hover:text-[#25d366] transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`https://t.me/share/url?url=https://cheapjusticeofindia.com&text=${encodeURIComponent(`⚖️ Judicial Excuse of the Day:\n\nThe Judge: ${result.action}\nBecause: ${result.excuse}\nResult: ${result.outcome}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-border text-muted text-xs rounded-lg hover:border-[#0088cc] hover:text-[#0088cc] transition-colors"
            >
              Telegram
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`⚖️ Judicial Excuse of the Day:\n\nThe Judge: ${result.action}\nBecause: ${result.excuse}\nResult: ${result.outcome}\n\n— cheapjusticeofindia.com`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-border text-muted text-xs rounded-lg hover:border-gold hover:text-gold transition-colors"
            >
              𝕏 Post
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
