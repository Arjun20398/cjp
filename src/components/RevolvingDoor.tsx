"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import timelineData from "../../content/data/revolving-door.json";

type TimelineEntry = {
  name: string;
  verdict: string;
  verdictYear: string;
  retired: string;
  postRetirement: string;
  postYear: string;
  gap: string;
  source?: string;
};

const timeline: TimelineEntry[] = timelineData;
const CARD_W = 480;
const GAP = 16;
const AUTO_SPEED = 0.5;
const PAUSE_MS = 5000;

function Card({ entry, active }: { entry: TimelineEntry; active: boolean }) {
  return (
    <div
      className={`group shrink-0 rounded-xl overflow-hidden flex flex-col border transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(197,164,78,0.3)] hover:border-gold/50
        ${active ? "scale-[1.03] shadow-lg shadow-gold/10 border-gold/30" : "shadow-md shadow-black/20 border-transparent"}`}
      style={{ width: CARD_W, height: 380 }}
    >
      <div className="bg-gradient-to-r from-gold/20 via-gold/10 to-transparent px-5 py-3 border-b border-gold/20 h-[68px] flex flex-col justify-center shrink-0">
        <p className="font-serif text-foreground font-bold text-base leading-tight line-clamp-2 transition-colors duration-300 group-hover:text-gold">
          {entry.name}
        </p>
        <p className="text-[10px] text-gold/70 uppercase tracking-widest mt-1">
          Bench → Retirement → Reward
        </p>
      </div>

      <div className="bg-card-bg px-5 py-4 flex flex-col flex-1 overflow-hidden">
        <div className="relative flex items-stretch gap-0 text-xs mb-4">
          <div className="flex-1 rounded-l-lg border border-border border-r-0 p-3 bg-card-bg-alt">
            <p className="text-gold uppercase tracking-wider text-[10px] font-semibold mb-1.5">
              ⚖️ Verdict ({entry.verdictYear})
            </p>
            <p className="text-foreground/80 leading-snug">{entry.verdict}</p>
          </div>
          <div className="flex items-center text-gold/50 text-lg -mx-1 z-10">→</div>
          <div className="flex-1 border border-border border-r-0 p-3 bg-card-bg-alt">
            <p className="text-gold uppercase tracking-wider text-[10px] font-semibold mb-1.5">
              🏛️ Retired
            </p>
            <p className="text-foreground/80">{entry.retired}</p>
          </div>
          <div className="flex items-center text-accent/70 text-lg -mx-1 z-10">→</div>
          <div className="flex-1 rounded-r-lg border border-accent/30 p-3 bg-accent/5">
            <p className="text-accent uppercase tracking-wider text-[10px] font-semibold mb-1.5">
              🎖️ Reward ({entry.postYear})
            </p>
            <p className="text-foreground font-semibold leading-snug">
              {entry.postRetirement}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="mx-3 text-[11px] font-mono font-bold text-accent bg-accent/10 px-3 py-1 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/20">
            ⏱ {entry.gap}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {entry.source && (
          <a
            href={entry.source}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 text-xs font-semibold text-gold/80 hover:text-gold transition-all duration-300 truncate group-hover:translate-x-1"
          >
            📰 Source →
          </a>
        )}
      </div>
    </div>
  );
}

export default function RevolvingDoor() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pausedUntil = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollToDot = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = idx * (CARD_W + GAP);
    el.scrollTo({ left: target, behavior: "smooth" });
    setActiveIdx(idx);
    pausedUntil.current = Date.now() + PAUSE_MS;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const tick = () => {
      if (Date.now() < pausedUntil.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      el.scrollLeft += AUTO_SPEED;
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
      const idx = Math.round(el.scrollLeft / (CARD_W + GAP)) % timeline.length;
      setActiveIdx(idx);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const items = [...timeline, ...timeline];

  return (
    <section id="revolving-door" className="border-b border-border py-16 overflow-hidden" aria-label="The Revolving Door — Judges moving to politics">
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <p className="font-serif text-gold text-xs uppercase tracking-[0.25em] mb-3">
          Follow the Career Path
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          The Revolving Door
        </h2>
        <p className="text-muted text-sm mb-2">
          From bench to political bench — the career trajectories that raise
          questions nobody is allowed to ask.
        </p>
        <p className="text-muted text-xs italic">
          Real names. Real cases. Real pattern.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-4 px-4 py-4 overflow-x-hidden"
          onMouseEnter={() => { pausedUntil.current = Date.now() + 999999999; }}
          onMouseLeave={() => { pausedUntil.current = Date.now() + 1000; }}
        >
          {items.map((entry, i) => (
            <Card
              key={`${entry.name}-${i}`}
              entry={entry}
              active={i % timeline.length === activeIdx}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {timeline.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToDot(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIdx ? "bg-gold scale-125" : "bg-border hover:bg-gold/50"}`}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="border border-accent/30 rounded-lg p-5 bg-accent/5">
          <p className="font-serif text-accent text-sm font-bold mb-2 text-center">
            The Systemic Pattern
          </p>
          <p className="text-muted text-xs leading-relaxed text-center mb-3">
            Judges may consciously or unconsciously favor governments while in office, expecting future appointments.
            Rajya Sabha seats, Governor posts, tribunal chairs, party memberships — all within months of retirement.
            No cooling-off period exists in India. The revolving door spins freely.
          </p>
          <div className="flex items-center justify-center gap-4 text-[10px]">
            <span className="font-mono font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
              ⏱ Gap: 0 to 4 months (typical)
            </span>
            <a
              href="https://www.bbc.com/news/articles/c627l7zexr8o"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              📰 BBC Source →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
