"use client";

import { useState, useEffect, useRef } from "react";

const WORDS: { term: string; meaning: string }[] = [
  { term: "Adjournment", meaning: "Delayed because nobody cares about your case" },
  { term: "Sealed Cover", meaning: "A mystery envelope that only the judge gets to peek at" },
  { term: "Suo Motu", meaning: "The court decided to get offended on its own" },
  { term: "Contempt of Court", meaning: "The crime of hurting a judge's feelings" },
  { term: "Bail", meaning: "The price of temporary freedom (varies by political connections)" },
  { term: "Collegium", meaning: "A secret club where judges pick their friends to be judges" },
  { term: "Sine Die", meaning: "Indefinitely — come back never" },
  { term: "Interim Order", meaning: "A temporary band-aid that will last 15 years" },
  { term: "Sub Judice", meaning: "We can't talk about it because it's convenient" },
  { term: "Natural Justice", meaning: "Fairness (terms and conditions apply)" },
  { term: "Writ Petition", meaning: "A formal letter begging the court to do its job" },
  { term: "Fundamental Rights", meaning: "Rights you technically have but practically don't" },
  { term: "PIL", meaning: "Someone else fighting for your rights because you gave up" },
  { term: "Amicus Curiae", meaning: "A 'friend of the court' (not your friend though)" },
  { term: "Next Date", meaning: "Another day when nothing will happen" },
  { term: "Reserved Judgment", meaning: "The judge needs time to think (estimated: 6 months to never)" },
  { term: "Dismissed", meaning: "Your problems are not the court's problems" },
  { term: "Stay Order", meaning: "Everything stops while the judge takes a vacation" },
  { term: "Pending", meaning: "In the queue (behind 4.9 crore other cases)" },
  { term: "Prima Facie", meaning: "At first glance (we won't look deeper, trust us)" },
  { term: "Learned Counsel", meaning: "The expensive lawyer" },
  { term: "Cognizance", meaning: "The court has noticed (doesn't mean it will act)" },
  { term: "Expeditious", meaning: "Faster than usual (still decades)" },
  { term: "Without Prejudice", meaning: "We're saying no but pretending it's fair" },
  { term: "In the Interest of Justice", meaning: "Because we said so" },
];

function getWordForToday(): { term: string; meaning: string } {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return WORDS[dayOfYear % WORDS.length];
}

export default function WordOfTheDay() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const word = getWordForToday();

  const clearCollapse = () => {
    if (collapseTimer.current) { clearTimeout(collapseTimer.current); collapseTimer.current = null; }
  };

  const scheduleCollapse = () => {
    clearCollapse();
    collapseTimer.current = setTimeout(() => setExpanded(false), 2000);
  };

  const expand = () => { clearCollapse(); setExpanded(true); };

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onMouseEnter={() => { expand(); }}
      onMouseLeave={scheduleCollapse}
      className={`fixed top-20 right-4 z-40 transition-all duration-700 ease-in-out ${
        visible ? "translate-x-0 opacity-100" : "translate-x-40 opacity-0 pointer-events-none"
      } w-72`}
    >
      <div
        onClick={expand}
        className={`bg-card-bg border rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out ${
          expanded
            ? "border-gold/30 shadow-[0_8px_30px_-8px_rgba(197,164,78,0.3)]"
            : "border-gold bg-gold shadow-lg"
        }`}
      >
        <div className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
          expanded ? "bg-gold/10 px-4 py-2" : "px-3 py-1.5"
        }`}>
          <span className={`font-bold uppercase tracking-widest transition-all duration-500 ${
            expanded ? "text-[10px] text-gold" : "text-[10px] text-background"
          }`}>
            ⚖️ Word of the Day
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
            className={`text-muted hover:text-gold text-xs transition-all duration-300 ${
              expanded ? "opacity-100 scale-100" : "opacity-0 scale-0 w-0"
            }`}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className={`transition-all duration-700 ease-in-out overflow-hidden ${
          expanded ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="p-4">
            <p className="font-serif text-lg font-bold text-gold mb-2">
              {word.term}
            </p>
            <p className="text-xs text-muted leading-relaxed mb-3">
              <span className="text-foreground/60 italic">Legal meaning:</span> You already know.
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              <span className="text-gold font-semibold">CJI meaning:</span> {word.meaning}
            </p>
          </div>
          <div className="px-4 pb-3 flex gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`⚖️ Word of the Day: ${word.term}\n\nCJI meaning: ${word.meaning}\n\n— cheapjusticeofindia.com`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] px-2 py-1 rounded border border-border text-muted hover:text-[#25d366] hover:border-[#25d366] transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`⚖️ Word of the Day: ${word.term}\n\nCJI meaning: ${word.meaning}\n\n— cheapjusticeofindia.com`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] px-2 py-1 rounded border border-border text-muted hover:text-gold hover:border-gold transition-colors"
            >
              𝕏 Post
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
