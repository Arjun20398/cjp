"use client";

import { useEffect, useRef, useState } from "react";

export default function CJILetter() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="cji-letter" className="border-b border-border py-16">
      <div className="max-w-3xl mx-auto px-4">
        <p className="font-serif text-gold text-xs uppercase tracking-[0.25em] mb-3">
          Official Correspondence
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-10">
          A Letter From The Hon&apos;ble Cheap Justice
        </h2>

        <div
          ref={ref}
          className={`bg-card-bg border border-border rounded-lg p-8 md:p-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="font-serif text-foreground/70 italic leading-relaxed mb-6">
            Dear Citizens of India,
          </p>

          <p className="font-serif text-foreground/80 leading-relaxed mb-4">
            We hear you. We hear every single one of your 5 crore pending cases.
            In fact, we hear them so well that we&apos;ve decided to take our
            time responding — sometimes 20, 30, even 40 years. Good things come
            to those who wait, and justice is the best thing of all.
          </p>

          <p className="font-serif text-foreground/80 leading-relaxed mb-4">
            Some of you have expressed concern about judges joining political
            parties after retirement. Let me assure you — this is simply judges
            exercising their fundamental right to pursue their passions. The fact
            that their passion happens to align with the party whose cases they
            ruled on is purely coincidental.
          </p>

          <p className="font-serif text-foreground/80 leading-relaxed mb-4">
            As for the collegium system — we believe in transparency. That is
            why we transparently decide amongst ourselves, behind closed doors,
            who gets to be a judge. Democracy works best when the people who
            make the decisions also decide who makes the decisions.
          </p>

          <p className="font-serif text-foreground/80 leading-relaxed mb-4">
            Regarding sealed covers — some evidence is simply too important for
            the accused to see. We understand this may seem unfair, but rest
            assured, we have read it, and we think it&apos;s very convincing. You
            should trust us. After all, would a judge lie?
          </p>

          <p className="font-serif text-foreground/80 leading-relaxed mb-6">
            In closing, I want to remind you that criticising the judiciary is
            contempt of court. So please keep your opinions to yourself, or
            we&apos;ll see you in court. Eventually. In about 15 years.
          </p>

          <div className="border-t border-border pt-6">
            <p className="font-serif text-foreground font-bold">
              With judicial warmth,
            </p>
            <p className="font-serif text-gold font-bold text-lg mt-1">
              The Hon&apos;ble Cheap Justice of India
            </p>
            <p className="text-xs text-muted mt-2 italic">
              (This letter was auto-generated. Much like some of our judgments.)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
