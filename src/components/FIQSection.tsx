"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import fiqsData from "../../content/data/fiqs.json";

type FIQ = {
  question: string;
  answer: string;
};

const fiqs: FIQ[] = fiqsData;
const CARD_W = 360;
const GAP = 16;
const AUTO_SPEED = 0.5;
const PAUSE_MS = 5000;

function FIQCard({ fiq, index, active }: { fiq: FIQ; index: number; active: boolean }) {
  return (
    <div
      className={`shrink-0 border rounded-lg bg-card-bg p-6 flex flex-col transition-all duration-300 ${active ? "border-gold/60 scale-[1.02]" : "border-border"}`}
      style={{ width: CARD_W }}
    >
      <span className="font-mono text-[10px] text-gold mb-3">§{index + 1}</span>
      <p className="font-serif text-foreground font-semibold text-base mb-4 leading-snug">
        {fiq.question}
      </p>
      <div className="border-l-2 border-gold/30 pl-4 flex-1">
        <p className="text-sm text-foreground/75 font-serif leading-relaxed italic">
          {fiq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FIQSection() {
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
      const idx = Math.round(el.scrollLeft / (CARD_W + GAP)) % fiqs.length;
      setActiveIdx(idx);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const items = [...fiqs, ...fiqs];

  return (
    <section id="fiqs" className="border-b border-border py-16 overflow-hidden" aria-label="Frequently Ignored Questions">
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <p className="font-serif text-gold text-xs uppercase tracking-[0.25em] mb-3">
          Court Order No. CJI/FAQ/2026
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          Frequently Ignored Questions
        </h2>
        <p className="text-muted text-sm mb-2">
          The questions you always had. The answers the judiciary never gave.
        </p>
        <p className="text-muted text-xs italic">
          Delivered in the matter of Curious Citizen v. Opaque System.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-4 px-4 overflow-x-hidden"
          onMouseEnter={() => { pausedUntil.current = Date.now() + 999999999; }}
          onMouseLeave={() => { pausedUntil.current = Date.now() + 1000; }}
        >
          {items.map((fiq, i) => (
            <FIQCard
              key={`${fiq.question}-${i}`}
              fiq={fiq}
              index={i % fiqs.length}
              active={i % fiqs.length === activeIdx}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {fiqs.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToDot(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIdx ? "bg-gold scale-125" : "bg-border hover:bg-gold/50"}`}
            aria-label={`Go to question ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
