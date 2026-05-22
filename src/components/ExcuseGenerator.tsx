"use client";

import { useState, useRef } from "react";
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
      }
    }, 100);
  }

  return (
    <section id="excuse-generator" className="border-b border-border py-16">
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
          <button
            onClick={() => {
              const text = `⚖️ Judicial Excuse of the Day:\n\nThe Judge: ${result.action}\nBecause: ${result.excuse}\nResult: ${result.outcome}\n\n— cheapjusticeofindia.com`;
              navigator.clipboard.writeText(text);
            }}
            className="ml-3 px-6 py-3 border border-border text-muted text-sm rounded-lg hover:border-gold hover:text-gold transition-colors"
          >
            Copy & Share
          </button>
        )}
      </div>
    </section>
  );
}
