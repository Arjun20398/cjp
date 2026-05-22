"use client";

import { useState, useEffect, useRef } from "react";

export default function ContemptNotice() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dismissed) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [dismissed]);

  return (
    <>
      <div ref={ref} className="h-1" />
      {show && !dismissed && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div
            className="max-w-lg w-full border-2 border-gold/60 rounded-lg bg-card-bg p-8 md:p-10 text-center"
            style={{ animation: "fadeInUp 0.4s ease" }}
          >
            <p className="font-serif text-gold text-[10px] uppercase tracking-[0.3em] mb-4">
              Supreme Court of Satire &bull; Contempt Jurisdiction
            </p>

            <div className="border border-border rounded p-6 mb-6 bg-background">
              <p className="font-serif text-accent text-lg font-bold mb-4">
                CONTEMPT OF COURT NOTICE
              </p>
              <p className="font-serif text-foreground text-sm leading-relaxed mb-3">
                To the reader of this website,
              </p>
              <p className="font-serif text-muted text-sm leading-relaxed mb-3">
                You have been found guilty of reading satirical content about
                the Indian judiciary. This act constitutes scandalising the
                court under Section 2(c)(i) of the Contempt of Courts Act,
                1971.
              </p>
              <p className="font-serif text-muted text-sm leading-relaxed mb-3">
                You are hereby directed to report to the nearest district
                court. Your hearing has been tentatively scheduled for{" "}
                <span className="text-accent font-bold">2039</span>.
              </p>
              <p className="font-serif text-muted text-sm leading-relaxed">
                Until then, you are advised to not form any opinions about the
                judiciary, its members, their assets, their post-retirement
                careers, or the speed at which they deliver justice.
              </p>
            </div>

            <p className="font-serif text-muted text-xs italic mb-6">
              Ordered by: The Hon&apos;ble Bench of Absolutely No Irony
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDismissed(true)}
                className="px-6 py-2.5 bg-gold text-background font-bold text-sm rounded-lg hover:bg-gold/90 transition-colors"
              >
                I Accept My Guilt
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="px-6 py-2.5 border border-border text-muted text-sm rounded-lg hover:border-gold hover:text-gold transition-colors"
              >
                File an Appeal (in 2040)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
