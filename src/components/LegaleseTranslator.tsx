"use client";

import { useState, useCallback } from "react";

const TRANSLATIONS: [RegExp, string][] = [
  [/\badjourn(ed|ment)?\b/gi, "delayed because nobody cares about your case"],
  [/\bsealed cover\b/gi, "a mystery envelope that only the judge gets to peek at"],
  [/\bsuo motu\b/gi, "the court decided to get offended on its own"],
  [/\bcontempt of court\b/gi, "the crime of hurting a judge's feelings"],
  [/\bbail\b/gi, "the price of temporary freedom (varies by political connections)"],
  [/\bcollegium\b/gi, "a secret club where judges pick their friends to be judges"],
  [/\bthe court is of the opinion\b/gi, "the judge has decided, and your opinion is irrelevant"],
  [/\bin the interest of justice\b/gi, "because we said so"],
  [/\bsatisfied\b/gi, "willing to look the other way"],
  [/\bprima facie\b/gi, "at first glance (we won't look deeper, trust us)"],
  [/\bsine die\b/gi, "indefinitely — come back never"],
  [/\binterim order\b/gi, "a temporary band-aid that will last 15 years"],
  [/\bsub judice\b/gi, "we can't talk about it because it's convenient"],
  [/\bnatural justice\b/gi, "fairness (terms and conditions apply)"],
  [/\bwrit petition\b/gi, "a formal letter begging the court to do its job"],
  [/\bfundamental rights?\b/gi, "rights you technically have but practically don't"],
  [/\bpublic interest litigation\b/gi, "someone else fighting for your rights because you gave up"],
  [/\bamicus curiae\b/gi, "a 'friend of the court' (not your friend though)"],
  [/\bthe matter is listed\b/gi, "your case exists in a spreadsheet somewhere"],
  [/\bnext date\b/gi, "another day when nothing will happen"],
  [/\breserved (for )?judgment\b/gi, "the judge needs time to think (estimated: 6 months to never)"],
  [/\bdismissed\b/gi, "your problems are not the court's problems"],
  [/\bwithout prejudice\b/gi, "we're saying no but pretending it's fair"],
  [/\bstay order\b/gi, "everything stops while the judge takes a vacation"],
  [/\bpending\b/gi, "in the queue (behind 4.9 crore other cases)"],
  [/\bthe hon'?ble\b/gi, "the allegedly honourable"],
  [/\blearned counsel\b/gi, "the expensive lawyer"],
  [/\bit is directed\b/gi, "the court orders (and hopes someone actually listens)"],
  [/\bcognizance\b/gi, "the court has noticed (doesn't mean it will act)"],
  [/\bexpedit(e|ious)(ly)?\b/gi, "faster than usual (still decades)"],
];

const SARCASTIC_SUFFIXES = [
  "\n\n— Translated by the Supreme Court of Satire, 2026",
  "\n\n— Decoded for citizens who don't speak Fluent Delay™",
  "\n\n— In other words: justice is coming. Eventually. Maybe.",
  "\n\n— This translation is protected under Article 19(1)(a). Probably.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function LegaleseTranslator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [matchCount, setMatchCount] = useState(0);

  const translate = useCallback(() => {
    if (!input.trim()) return;
    let result = input;
    let count = 0;
    for (const [pattern, replacement] of TRANSLATIONS) {
      const matches = result.match(pattern);
      if (matches) {
        count += matches.length;
        result = result.replace(pattern, `✨${replacement}✨`);
      }
    }
    result += pick(SARCASTIC_SUFFIXES);
    setOutput(result);
    setMatchCount(count);
  }, [input]);

  const shareableText = output
    ? `⚖️ Legalese-to-Sarcasm Translation:\n\n${output.slice(0, 250)}...\n\nTranslate yours: cheapjusticeofindia.com`
    : "";

  return (
    <section id="translator" className="border-b border-border py-16" aria-label="Legalese to Sarcasm Translator">
      <div className="max-w-2xl mx-auto px-4">
        <p className="font-serif text-gold text-xs uppercase tracking-[0.25em] mb-3">
          Interactive Tool
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          Legalese-to-Sarcasm Translator
        </h2>
        <p className="text-muted text-sm mb-2">
          Paste any court order, legal notice, or government notification.
          We&apos;ll strip away the high-status linguistic armor and tell you what it
          actually means.
        </p>
        <p className="text-xs text-gold mb-8">
          Try pasting phrases like &ldquo;adjourned sine die,&rdquo; &ldquo;sealed cover,&rdquo; or &ldquo;in the interest of justice.&rdquo;
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste court order or legal text here..."
          className="w-full h-40 bg-card-bg border border-border rounded-xl p-4 text-sm text-foreground placeholder:text-muted focus:border-gold focus:outline-none resize-none"
        />

        <button
          onClick={translate}
          disabled={!input.trim()}
          className="mt-4 px-8 py-3 bg-gold text-background font-bold text-sm rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🔮 Translate to Sarcasm
        </button>

        {output !== null && (
          <div className="mt-8 border border-border rounded-xl bg-card-bg p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] uppercase tracking-widest text-gold">
                Sarcasm Output — {matchCount} legal term(s) decoded
              </p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold/15 text-gold uppercase">
                Translated
              </span>
            </div>
            <p className="font-serif text-sm text-foreground leading-relaxed whitespace-pre-wrap mb-6">
              {output}
            </p>
            <div className="border-t border-border pt-4 flex flex-wrap gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="px-4 py-2 border border-border text-muted text-xs rounded-lg hover:border-gold hover:text-gold transition-colors"
              >
                📋 Copy
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareableText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-border text-muted text-xs rounded-lg hover:border-[#25d366] hover:text-[#25d366] transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareableText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-border text-muted text-xs rounded-lg hover:border-gold hover:text-gold transition-colors"
              >
                𝕏 Post
              </a>
              <a
                href={`https://t.me/share/url?url=https://cheapjusticeofindia.com&text=${encodeURIComponent(shareableText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-border text-muted text-xs rounded-lg hover:border-[#0088cc] hover:text-[#0088cc] transition-colors"
              >
                Telegram
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
