"use client";

import { useState, useCallback } from "react";

const SEALED_EVIDENCE = [
  "The defendant was seen eating a samosa with green chutney, which is a clear threat to national security.",
  "Classified satellite imagery shows the accused walking suspiciously near a library — a known hub of dangerous ideas.",
  "Intelligence reports suggest the petitioner once googled 'how does democracy work,' raising serious concerns.",
  "A sealed envelope containing a Post-it note that reads 'Trust us, he's guilty' — signed by an unnamed official.",
  "Intercepted WhatsApp messages reveal the accused shared a meme about court delays. Contempt is implied.",
  "Top-secret dossier confirms the defendant owns a copy of the Indian Constitution. Motive: reading it.",
  "Audio surveillance captured the accused telling a friend, 'The judiciary should be accountable.' Dangerous rhetoric.",
  "Financial records show the petitioner donated ₹100 to a legal aid NGO — clear anti-national funding.",
  "CCTV footage of the accused entering a courtroom and expecting justice. Clearly delusional behavior.",
  "A redacted 47-page report that, when unredacted, simply says 'Because we said so' on every page.",
  "The accused was spotted near Parliament. Since he is not a retired judge, this is suspicious.",
  "Forensic analysis of the defendant's tweets reveals excessive use of the word 'transparency.' Red flag.",
];

const JUDGE_RESPONSES = [
  "The court has taken note. The sealed cover shall remain sealed for the protection of national interest.",
  "Your objection is noted and dismissed. The prosecution's evidence is compelling even if you cannot see it.",
  "The bench finds your argument interesting but ultimately irrelevant given the gravity of the sealed material.",
  "We have reviewed the sealed cover and are satisfied. That is all you need to know.",
  "Your request to view the evidence is denied. Trust in the institution is paramount.",
  "The court reminds you that questioning sealed evidence is itself a form of contempt.",
  "We shall take this matter up after lunch. And by lunch, we mean six months from now.",
  "The bench is inclined to agree with whatever is in the sealed cover. Court adjourned.",
];

const DEFENSE_OPTIONS = [
  "I object! My client has a right to see the evidence!",
  "Your Honor, how can I cross-examine a sealed envelope?",
  "With respect, the Constitution guarantees fair trial rights.",
  "I request the court to at least reveal the nature of the allegations.",
  "My client cannot defend against invisible charges.",
  "Your Honor, this is a violation of natural justice principles.",
];

type Round = {
  evidence: string;
  defense: string;
  response: string;
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function SealedCoverGame() {
  const [phase, setPhase] = useState<"intro" | "playing" | "result">("intro");
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [currentEvidence, setCurrentEvidence] = useState("");
  const [currentResponse, setCurrentResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [history, setHistory] = useState<Round[]>([]);

  const totalRounds = 5;

  const startGame = useCallback(() => {
    setPhase("playing");
    setRound(1);
    setScore(0);
    setHistory([]);
    setCurrentEvidence(pick(SEALED_EVIDENCE));
    setCurrentResponse("");
    setShowResponse(false);
  }, []);

  const submitDefense = useCallback((defense: string) => {
    const response = pick(JUDGE_RESPONSES);
    const earned = Math.floor(Math.random() * 3);
    setScore((s) => s + earned);
    setCurrentResponse(response);
    setShowResponse(true);
    setHistory((h) => [...h, { evidence: currentEvidence, defense, response }]);
  }, [currentEvidence]);

  const nextRound = useCallback(() => {
    if (round >= totalRounds) {
      setPhase("result");
      return;
    }
    setRound((r) => r + 1);
    setCurrentEvidence(pick(SEALED_EVIDENCE));
    setCurrentResponse("");
    setShowResponse(false);
  }, [round]);

  const maxScore = totalRounds * 2;
  const rating = score <= 2 ? "Cockroach Class" : score <= 5 ? "Parasite Grade" : score <= 8 ? "Adjournment Expert" : "Honorary Judge";

  const shareText = `⚖️ Sealed Cover Courtroom Score: ${score}/${maxScore}\nRating: ${rating}\n\nI tried to argue against sealed evidence. Spoiler: the judge wasn't impressed.\n\nPlay: cheapjusticeofindia.com`;

  return (
    <section id="sealed-cover-game" className="border-b border-border py-16" aria-label="Sealed Cover Courtroom Game">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          The Sealed Cover Courtroom
        </h2>
        <p className="text-muted text-sm mb-8">
          You are a defense attorney. The prosecution keeps submitting sealed covers
          you cannot see. Try to defend your client against invisible evidence.
          Spoiler: you will lose.
        </p>

        {phase === "intro" && (
          <div className="border border-border rounded-xl bg-card-bg p-8 text-center">
            <p className="font-serif text-2xl text-muted italic mb-6">
              &ldquo;The right to a fair trial is guaranteed*&rdquo;
            </p>
            <p className="text-xs text-muted mb-8">*Terms and conditions apply. Sealed cover not included.</p>
            <button
              onClick={startGame}
              className="px-8 py-3 bg-gold text-background font-bold text-sm rounded-lg hover:bg-gold/90 transition-colors"
            >
              Enter the Courtroom
            </button>
          </div>
        )}

        {phase === "playing" && (
          <div className="border border-border rounded-xl bg-card-bg p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/15 text-accent uppercase">
                Round {round}/{totalRounds}
              </span>
              <span className="text-[10px] font-mono text-gold">
                Score: {score}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-widest text-accent mb-2">
                🔒 Prosecution Submits Sealed Cover #{round}
              </p>
              <div className="bg-background border border-border rounded-lg p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-foreground/90 flex items-center justify-center">
                  <span className="font-serif text-lg text-background font-bold rotate-[-5deg]">
                    🔒 SEALED — CLASSIFIED
                  </span>
                </div>
                <p className="font-mono text-xs text-muted blur-md select-none" aria-hidden>
                  {currentEvidence}
                </p>
              </div>
              <p className="text-[10px] text-muted mt-2 italic">
                The actual evidence: &ldquo;{currentEvidence}&rdquo;
              </p>
            </div>

            {!showResponse ? (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gold mb-3">
                  Choose Your Defense
                </p>
                <div className="grid gap-2">
                  {DEFENSE_OPTIONS.sort(() => Math.random() - 0.5).slice(0, 3).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => submitDefense(opt)}
                      className="text-left text-xs p-3 border border-border rounded-lg text-foreground hover:border-gold hover:text-gold transition-colors"
                    >
                      &ldquo;{opt}&rdquo;
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="border-t border-border pt-4 mb-4">
                  <p className="text-[10px] uppercase tracking-widest text-accent mb-2">
                    ⚖️ Judge&apos;s Response
                  </p>
                  <p className="font-serif text-foreground italic leading-relaxed">
                    &ldquo;{currentResponse}&rdquo;
                  </p>
                </div>
                <button
                  onClick={nextRound}
                  className="px-6 py-2 bg-gold text-background font-bold text-xs rounded-lg hover:bg-gold/90 transition-colors"
                >
                  {round >= totalRounds ? "See Results" : "Next Round →"}
                </button>
              </div>
            )}
          </div>
        )}

        {phase === "result" && (
          <div className="border border-border rounded-xl bg-card-bg p-8 text-center">
            <p className="text-[10px] uppercase tracking-widest text-accent mb-4">
              Case Verdict
            </p>
            <p className="font-serif text-4xl font-bold text-gold mb-2">
              {score}/{maxScore}
            </p>
            <p className="font-serif text-lg text-foreground mb-1">
              Rating: {rating}
            </p>
            <p className="text-xs text-muted mb-8">
              Don&apos;t worry — nobody wins against sealed covers. That&apos;s the point.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <button
                onClick={startGame}
                className="px-6 py-2 bg-gold text-background font-bold text-xs rounded-lg hover:bg-gold/90 transition-colors"
              >
                Play Again
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-border text-muted text-xs rounded-lg hover:border-[#25d366] hover:text-[#25d366] transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-border text-muted text-xs rounded-lg hover:border-gold hover:text-gold transition-colors"
              >
                𝕏 Post
              </a>
              <a
                href={`https://t.me/share/url?url=https://cheapjusticeofindia.com&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-border text-muted text-xs rounded-lg hover:border-[#0088cc] hover:text-[#0088cc] transition-colors"
              >
                Telegram
              </a>
            </div>

            <div className="border-t border-border pt-6 text-left">
              <p className="text-[10px] uppercase tracking-widest text-gold mb-4">
                Case Transcript
              </p>
              {history.map((h, i) => (
                <div key={i} className="mb-4 pb-4 border-b border-border last:border-0">
                  <p className="text-[10px] text-accent mb-1">Round {i + 1} — Sealed Evidence:</p>
                  <p className="text-xs text-muted italic mb-2">&ldquo;{h.evidence}&rdquo;</p>
                  <p className="text-[10px] text-gold mb-1">Your Defense:</p>
                  <p className="text-xs text-foreground mb-2">&ldquo;{h.defense}&rdquo;</p>
                  <p className="text-[10px] text-accent mb-1">Judge:</p>
                  <p className="text-xs text-muted italic">&ldquo;{h.response}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
