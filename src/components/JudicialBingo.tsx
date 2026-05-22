"use client";

import { useState, useEffect } from "react";

const squares = [
  "Matter adjourned",
  "Sealed cover accepted",
  "Bench recused itself",
  "Contempt notice to journalist",
  "Judge retired, case reset",
  "Date after date after date",
  "Bail denied then granted on appeal",
  "Evidence mysteriously lost",
  "Witness turned hostile",
  "Judge's relative appeared as lawyer",
  "Collegium overruled itself",
  "FREE SPACE: Justice Delayed",
  "PIL dismissed as publicity stunt",
  "Verdict copy-pasted from another case",
  "Judge quotes WhatsApp forward as fact",
  "Hearing lasted 90 seconds",
  "Both sides claim victory",
  "Judge lectures victim on morality",
  "Case transferred to another state",
  "Judge joins party after retirement",
  "Govt gets unlimited adjournments",
  "Citizens told to trust the process",
  "RTI about judge denied",
  "In-house inquiry finds nothing wrong",
  "Justice served... to the powerful",
];

const STORAGE_KEY = "cji-bingo-board";

export default function JudicialBingo() {
  const [marked, setMarked] = useState<Record<number, boolean>>({});
  const [bingoLines, setBingoLines] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setMarked(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(marked).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(marked));
    }
    setBingoLines(checkBingo(marked));
  }, [marked]);

  function toggle(index: number) {
    setMarked((prev) => {
      const next = { ...prev };
      if (next[index]) {
        delete next[index];
      } else {
        next[index] = true;
      }
      return next;
    });
  }

  function resetBoard() {
    setMarked({});
    localStorage.removeItem(STORAGE_KEY);
  }

  function checkBingo(board: Record<number, boolean>): number {
    const lines = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];
    let count = 0;
    for (const line of lines) {
      if (line.every((i) => board[i] || i === 11)) count++;
    }
    return count;
  }

  return (
    <section id="bingo" className="border-b border-[#292524] py-16">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-black text-[#f5f5f4] mb-2">
          Judicial Bingo
        </h2>
        <p className="text-[#a8a29e] mb-2">
          Click the squares you&apos;ve experienced. How many lines can you
          complete?
        </p>
        <div className="h-1 w-12 bg-[#dc2626] mb-6" />

        {bingoLines > 0 && (
          <div className="bg-[#dc2626]/20 border border-[#dc2626]/50 rounded-lg p-4 mb-6 text-center">
            <p className="text-[#dc2626] font-black text-lg">
              🎉 BINGO! {bingoLines} line{bingoLines > 1 ? "s" : ""} completed!
            </p>
            <p className="text-xs text-[#a8a29e] mt-1">
              Congratulations. You&apos;re officially a veteran of the Indian
              judicial system.
            </p>
          </div>
        )}

        <div className="grid grid-cols-5 gap-1.5 mb-6">
          {squares.map((text, i) => {
            const isCenter = i === 11;
            const isMarked = marked[i] || isCenter;
            return (
              <button
                key={i}
                onClick={() => !isCenter && toggle(i)}
                className={`aspect-square p-1.5 rounded text-[10px] sm:text-xs font-medium leading-tight transition-all duration-200 border ${
                  isMarked
                    ? "bg-[#dc2626] border-[#dc2626] text-white"
                    : "bg-[#1c1917] border-[#292524] text-[#a8a29e] hover:border-[#dc2626]/50 hover:text-[#f5f5f4]"
                } ${isCenter ? "cursor-default" : "cursor-pointer"}`}
              >
                {text}
              </button>
            );
          })}
        </div>

        <button
          onClick={resetBoard}
          className="text-xs text-[#a8a29e] hover:text-[#dc2626] transition-colors"
        >
          Reset Board
        </button>
      </div>
    </section>
  );
}
