"use client";

import casesData from "../../content/data/cause-list.json";

type CauseEntry = {
  time: string;
  title: string;
  bench: string;
  status: string;
  statusColor: string;
};

const cases: CauseEntry[] = casesData;

export default function CauseList() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section id="cause-list" className="border-b border-border py-16">
      <div className="max-w-4xl mx-auto px-4">
        <p className="font-serif text-gold text-xs uppercase tracking-[0.25em] mb-3">
          Daily Proceedings
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          Today&apos;s Cause List
        </h2>
        <p className="text-muted text-sm mb-1">{today}</p>
        <p className="text-muted text-xs italic mb-10">
          Supreme Court of Satire &bull; Principal Bench &bull; New Delhi
        </p>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-card-bg-alt border-b border-border text-[10px] uppercase tracking-widest text-gold font-mono">
            <div className="col-span-1">Time</div>
            <div className="col-span-4">Case</div>
            <div className="col-span-4">Bench</div>
            <div className="col-span-3">Status</div>
          </div>

          {cases.map((c, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-5 py-4 ${i % 2 === 0 ? "bg-card-bg" : "bg-card-bg-alt"} ${i < cases.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="md:col-span-1 font-mono text-xs text-gold">
                {c.time}
              </div>
              <div className="md:col-span-4 font-serif text-sm text-foreground font-medium">
                {c.title}
              </div>
              <div className="md:col-span-4 text-xs text-muted">
                Bench: {c.bench}
              </div>
              <div className={`md:col-span-3 text-xs font-bold ${c.statusColor}`}>
                {c.status}
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-muted mt-4 text-center italic">
          Note: All cases are subject to adjournment without notice. Which is the whole point.
        </p>
      </div>
    </section>
  );
}
