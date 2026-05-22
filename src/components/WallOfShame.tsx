"use client";

import { useState } from "react";
import storiesData from "../../content/data/testimonies.json";

type Testimony = {
  quote: string;
  author: string;
  caseType: string;
  years: string;
};

const stories: Testimony[] = storiesData;

const BATCH_SIZE = 3;

export default function WallOfShame() {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  return (
    <section id="wall" className="border-b border-border py-16">
      <div className="max-w-4xl mx-auto px-4">
        <p className="font-serif text-gold text-xs uppercase tracking-[0.25em] mb-3">
          Testimonies
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          The Wall of Shame
        </h2>
        <p className="text-muted text-sm mb-10">
          Real experiences from citizens who trusted the system
        </p>

        <div className="grid gap-4">
          {stories.slice(0, visibleCount).map((story, i) => (
            <div
              key={i}
              className="bg-card-bg border border-border rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold/15 text-gold uppercase">
                  {story.caseType}
                </span>
                <span className="text-[10px] font-mono text-accent">
                  {story.years} years in court
                </span>
              </div>
              <p className="font-serif text-foreground/75 leading-relaxed italic mb-4">
                &ldquo;{story.quote}&rdquo;
              </p>
              <p className="text-xs text-gold font-semibold">
                — {story.author}
              </p>
            </div>
          ))}
        </div>

        {visibleCount < stories.length ? (
          <button
            onClick={() =>
              setVisibleCount((c) => Math.min(c + BATCH_SIZE, stories.length))
            }
            className="mt-8 px-6 py-2.5 text-sm font-medium border border-border rounded-lg hover:border-gold hover:text-gold transition-colors"
          >
            Load More Testimonies
          </button>
        ) : (
          <p className="mt-8 text-sm text-muted">
            No more testimonies on record. But there are 5 crore more out
            there.{" "}
            <a
              href="mailto:stories@cheapjusticeofindia.com"
              className="text-gold hover:underline"
            >
              Submit yours.
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
