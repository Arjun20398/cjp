"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  speed?: number;
  className?: string;
  cursor?: boolean;
  delay?: number;
};

export default function Typewriter({ text, speed = 60, className = "", cursor = true, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setStarted(true), delay);
          } else {
            setStarted(true);
          }
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
    if (charIndex >= text.length) return;
    const timeout = setTimeout(() => setCharIndex((i) => i + 1), speed);
    return () => clearTimeout(timeout);
  }, [started, charIndex, text, speed]);

  const done = charIndex >= text.length;

  return (
    <span ref={ref} className={className}>
      {started ? text.slice(0, charIndex) : "\u00A0"}
      {cursor && !done && <span className="animate-pulse text-gold">|</span>}
    </span>
  );
}
