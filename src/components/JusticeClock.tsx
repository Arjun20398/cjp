"use client";

import { useState, useEffect } from "react";

const BASE_PENDING = 49029231;
const CASES_PER_SECOND = 3;

export default function JusticeClock() {
  const [mounted, setMounted] = useState(false);
  const [pending, setPending] = useState(BASE_PENDING);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - start) / 1000);
      setPending(BASE_PENDING + diff * CASES_PER_SECOND);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const added = pending - BASE_PENDING;

  return (
    <div
      className="fixed bottom-6 left-6 z-40 transition-all duration-300 ease-out cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`border border-border rounded-xl bg-card-bg/95 backdrop-blur-md shadow-xl shadow-black/30 overflow-hidden transition-all duration-300 origin-bottom-left ${hovered ? "w-[280px]" : "w-[200px]"}`}
      >
        <div className="bg-gradient-to-r from-accent/20 to-transparent px-4 py-2 border-b border-accent/20">
          <p className="font-serif text-gold text-[10px] uppercase tracking-widest">
            ⚖️ Justice Clock
          </p>
        </div>

        <div className="px-4 py-3">
          <p className="font-mono text-xl font-black text-accent tabular-nums leading-none">
            {pending.toLocaleString("en-IN")}
          </p>
          <p className="text-[9px] text-muted mt-1.5">
            cases pending & counting...
          </p>

          <div
            className={`overflow-hidden transition-all duration-300 ${hovered ? "max-h-80 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}`}
          >
            <div className="border-t border-border pt-3 space-y-2.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted">Added since you opened</span>
                <span className="font-mono font-bold text-accent">
                  +{added.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted">Filing rate</span>
                <span className="font-mono font-bold text-foreground">
                  ~3 cases/sec
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted">Complaints vs judges (10yr)</span>
                <span className="font-mono font-bold text-accent">
                  8,600+
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted">Peak year (2024)</span>
                <span className="font-mono font-bold text-accent">
                  1,170
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted">Avg wait for justice</span>
                <span className="font-mono font-bold text-gold">
                  ~27 years
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted">Judge-to-citizen ratio</span>
                <span className="font-mono font-bold text-foreground">
                  1 : 75,000
                </span>
              </div>
              <p className="text-[8px] text-muted/60 italic pt-1 border-t border-border">
                Source: Lok Sabha (Feb 2026), NJDG, Dept. of Justice
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
