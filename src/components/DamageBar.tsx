"use client";

import { useEffect, useRef, useState } from "react";

const bars = [
  { label: "Public Trust in Judiciary", value: 32, color: "#dc2626" },
  { label: "Cases Pending", value: 87, color: "#d97706" },
  { label: "Judges with Conflicts of Interest", value: 64, color: "#dc2626" },
  { label: "Transparency of Collegium", value: 8, color: "#d97706" },
];

export default function DamageBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="damage" className="border-b border-[#292524] py-16">
      <div ref={ref} className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-black text-[#f5f5f4] mb-2">
          The Damage Report
        </h2>
        <p className="text-[#a8a29e] mb-2">
          A snapshot of where things stand
        </p>
        <div className="h-1 w-12 bg-[#dc2626] mb-10" />

        <div className="flex flex-col gap-6">
          {bars.map((bar) => (
            <div key={bar.label}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#a8a29e]">{bar.label}</span>
                <span className="text-[#f5f5f4] font-bold">{bar.value}%</span>
              </div>
              <div className="h-3 bg-[#1c1917] rounded-full overflow-hidden border border-[#292524]">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: started ? `${bar.value}%` : "0%",
                    backgroundColor: bar.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
