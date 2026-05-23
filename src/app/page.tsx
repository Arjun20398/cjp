import SplashScreen from "@/components/SplashScreen";
import JusticeClock from "@/components/JusticeClock";
import ServicesSection from "@/components/ServicesSection";
import CJILetter from "@/components/CJILetter";
import ExcuseGenerator from "@/components/ExcuseGenerator";
import RevolvingDoor from "@/components/RevolvingDoor";
import FIQSection from "@/components/FIQSection";
import WallOfShame from "@/components/WallOfShame";
import ContemptNotice from "@/components/ContemptNotice";
import FloatingGavel from "@/components/FloatingGavel";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <div>
      <SplashScreen />

      <section className="border-b border-border" aria-label="Hero">
        <div className="max-w-5xl mx-auto px-4 py-24 md:py-32 text-center">
          <FadeIn>
            <p className="font-serif text-gold text-xs uppercase tracking-[0.3em] mb-6">
              Supreme Court of Satire &bull; Est. 2026
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Your case has been{" "}
              <span className="text-muted line-through decoration-2">
                resolved
              </span>{" "}
              <span className="text-accent">adjourned.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-4">
              <span className="text-gold font-bold">Cheap Justice of India</span>
              {" "}&mdash; they judge you, we judge them.
            </p>
            <p className="text-base text-muted max-w-xl mx-auto mb-10">
              Real facts about India&apos;s judiciary — corruption, loopholes,
              flawed judgments, and conflicts of interest — delivered with
              satirical honesty.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#services"
                className="px-5 py-2.5 text-sm font-medium border border-border rounded-lg hover:border-gold hover:text-gold transition-colors"
              >
                Our Services
              </a>
              <a
                href="#excuse-generator"
                className="px-5 py-2.5 text-sm font-medium border border-border rounded-lg hover:border-gold hover:text-gold transition-colors"
              >
                Generate an Excuse
              </a>
              <a
                href="#revolving-door"
                className="px-5 py-2.5 text-sm font-medium bg-gold text-background rounded-lg hover:bg-gold/90 transition-colors"
              >
                The Revolving Door
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <FadeIn><ServicesSection /></FadeIn>
      <FadeIn><CJILetter /></FadeIn>
      <FadeIn><ExcuseGenerator /></FadeIn>
      <FadeIn><RevolvingDoor /></FadeIn>
      <FadeIn><FIQSection /></FadeIn>
      <FadeIn><WallOfShame /></FadeIn>

      <section id="sources" className="border-b border-border py-16" aria-label="Sources and references">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-serif text-gold text-xs uppercase tracking-[0.25em] mb-3">
            Verification
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            Our Sources
          </h2>
          <p className="text-muted text-sm mb-8">
            Every fact on this site is sourced. The tone is satirical — the data is not.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "NDTV", url: "https://www.ndtv.com", desc: "Complaint statistics, judiciary corruption data" },
              { name: "BBC News", url: "https://www.bbc.com", desc: "Revolving door pattern, systemic analysis" },
              { name: "The Wire", url: "https://thewire.in", desc: "Ramaswami impeachment, judicial accountability" },
              { name: "ThePrint", url: "https://theprint.in", desc: "Gogoi RS tenure, Rohit Arya profile" },
              { name: "Frontline", url: "https://frontline.thehindu.com", desc: "Gangopadhyay case, Varma cash scandal" },
              { name: "Lok Sabha Records", url: "https://sansad.in", desc: "Parliamentary data on judicial complaints" },
            ].map((src) => (
              <a
                key={src.name}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-card-bg border border-border rounded-lg p-4 hover:border-gold/50 transition-colors"
              >
                <p className="text-sm font-semibold text-gold mb-1">{src.name}</p>
                <p className="text-[11px] text-muted leading-relaxed">{src.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card-bg">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="font-serif text-gold text-xs uppercase tracking-[0.25em] mb-6">
            Closing Argument
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 leading-relaxed">
            &ldquo;In a democracy, the judiciary is the last line of defense.
            When that line is compromised, the people must become the
            auditors.&rdquo;
          </h2>
          <p className="text-sm text-gold font-semibold uppercase tracking-wide">
            — Cheap Justice of India
          </p>
        </div>
      </section>

      <ContemptNotice />
      <FloatingGavel />
      <JusticeClock />
    </div>
  );
}
