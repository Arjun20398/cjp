import storiesData from "../../content/data/testimonies.json";

type Statement = {
  quote: string;
  author: string;
  court: string;
  context: string;
  year: string;
};

const statements: Statement[] = storiesData;

export default function WallOfShame() {
  return (
    <section id="wall" className="border-b border-border py-16">
      <div className="max-w-4xl mx-auto px-4">
        <p className="font-serif text-gold text-xs uppercase tracking-[0.25em] mb-3">
          From the Bench
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          The Wall of Shame
        </h2>
        <p className="text-muted text-sm mb-10">
          Real statements made by real judges — in open court, on record
        </p>

        <div className="grid gap-6">
          {statements.map((s, i) => (
            <div
              key={i}
              className="bg-card-bg border border-border rounded-lg p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/15 text-accent uppercase">
                  {s.court}
                </span>
                <span className="text-[10px] font-mono text-muted">
                  {s.year}
                </span>
              </div>
              <p className="font-serif text-foreground text-lg leading-relaxed italic mb-4">
                &ldquo;{s.quote}&rdquo;
              </p>
              <p className="text-xs text-gold font-semibold mb-3">
                — {s.author}
              </p>
              <div className="border-t border-border pt-3">
                <p className="text-xs text-muted leading-relaxed">
                  {s.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
