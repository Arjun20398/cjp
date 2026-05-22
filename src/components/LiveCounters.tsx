"use client";

import { useState, useEffect, useRef } from "react";

type CounterData = {
  label: string;
  target: number;
  suffix?: string;
  prefix?: string;
  increment: number;
  live?: boolean;
};

const counters: CounterData[] = [
  {
    label: "Cases Pending in Indian Courts",
    target: 50000000,
    prefix: "",
    suffix: "+",
    increment: 237,
    live: true,
  },
  {
    label: "Avg Days a Supreme Court Case Takes",
    target: 3944,
    suffix: "",
    increment: 1,
  },
  {
    label: "Judges Who Joined Political Parties After Retirement",
    target: 17,
    suffix: "",
    increment: 1,
  },
  {
    label: "Judges Held Accountable for Corruption",
    target: 0,
    suffix: "",
    increment: 0,
  },
];

function formatNumber(n: number): string {
  if (n >= 10000000) return (n / 10000000).toFixed(1) + " Cr";
  if (n >= 100000) return (n / 100000).toFixed(1) + " L";
  if (n >= 1000) return n.toLocaleString("en-IN");
  return n.toString();
}

function Counter({ data }: { data: CounterData }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (data.increment === 0) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    const stepValue = Math.ceil(data.target / steps);
    let current = 0;

    const interval = setInterval(() => {
      current += stepValue;
      if (current >= data.target) {
        current = data.target;
        clearInterval(interval);
      }
      setCount(current);
    }, stepTime);

    return () => clearInterval(interval);
  }, [started, data.target, data.increment]);

  useEffect(() => {
    if (!started || !data.live) return;
    const interval = setInterval(() => {
      setCount((c) => c + data.increment);
    }, 1000);
    return () => clearInterval(interval);
  }, [started, data.live, data.increment]);

  return (
    <div ref={ref} className="text-center p-6">
      <span className="text-4xl md:text-5xl font-black text-[#dc2626] block mb-2">
        {data.prefix}
        {formatNumber(count)}
        {data.suffix}
      </span>
      <p className="text-sm text-[#a8a29e]">{data.label}</p>
    </div>
  );
}

export default function LiveCounters() {
  return (
    <section id="stats" className="border-b border-[#292524] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {counters.map((c) => (
            <Counter key={c.label} data={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
