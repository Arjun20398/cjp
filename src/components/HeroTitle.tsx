"use client";

import { useState, useEffect } from "react";

const RESOLVED = "resolved";
const ADJOURNED = "adjourned.";

export default function HeroTitle() {
  const [phase, setPhase] = useState<"typing" | "pause" | "striking" | "deleting" | "gap" | "retyping" | "done">("typing");
  const [charIndex, setCharIndex] = useState(0);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    switch (phase) {
      case "typing":
        if (charIndex < RESOLVED.length) {
          timeout = setTimeout(() => setCharIndex((i) => i + 1), 80);
        } else {
          timeout = setTimeout(() => setPhase("pause"), 600);
        }
        break;
      case "pause":
        timeout = setTimeout(() => {
          setPhase("striking");
          setCharIndex(0);
        }, 400);
        break;
      case "striking":
        if (charIndex < RESOLVED.length) {
          timeout = setTimeout(() => setCharIndex((i) => i + 1), 50);
        } else {
          timeout = setTimeout(() => setPhase("gap"), 300);
        }
        break;
      case "gap":
        timeout = setTimeout(() => {
          setPhase("retyping");
          setCharIndex(0);
        }, 400);
        break;
      case "retyping":
        if (charIndex < ADJOURNED.length) {
          timeout = setTimeout(() => setCharIndex((i) => i + 1), 80);
        } else {
          timeout = setTimeout(() => setPhase("done"), 200);
        }
        break;
      case "done":
        timeout = setTimeout(() => {
          setPhase("typing");
          setCharIndex(0);
        }, 2500);
        break;
    }

    return () => clearTimeout(timeout);
  }, [phase, charIndex]);

  const showResolved = phase === "typing" || phase === "pause" || phase === "striking" || phase === "gap" || phase === "retyping" || phase === "done";
  const strikeCount = phase === "striking" ? charIndex : (phase === "gap" || phase === "retyping" || phase === "done") ? RESOLVED.length : 0;
  const showAdjourned = phase === "retyping" || phase === "done";
  const cursorVisible = true;

  return (
    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight min-h-[5rem] md:min-h-[8rem] lg:min-h-[10rem]">
      Your case has been{" "}
      {showResolved && (
        <span className="relative inline">
          <span className="text-muted">
            {phase === "typing"
              ? RESOLVED.slice(0, charIndex)
              : RESOLVED}
          </span>
          {strikeCount > 0 && (
            <span
              className="absolute left-0 top-1/2 h-[3px] bg-accent"
              style={{ width: `${(strikeCount / RESOLVED.length) * 100}%` }}
            />
          )}
        </span>
      )}
      {" "}
      {showAdjourned && (
        <span className="text-accent">
          {ADJOURNED.slice(0, charIndex)}
        </span>
      )}
      {cursorVisible && (
        <span className="animate-pulse text-gold">|</span>
      )}
    </h1>
  );
}
