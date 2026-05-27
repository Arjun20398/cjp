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
import HeroTitle from "@/components/HeroTitle";
import Typewriter from "@/components/Typewriter";
import SealedCoverGame from "@/components/SealedCoverGame";
import WordOfTheDay from "@/components/WordOfTheDay";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Cheap Justice of India",
      url: "https://cheapjusticeofindia.com",
      description:
        "Real facts about judicial corruption in India — 4.9 crore pending cases, 8,600+ complaints, judges moving to politics.",
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://cheapjusticeofindia.com/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      name: "Cheap Justice of India",
      alternateName: ["CheapJusticeOfIndia", "Cheap Justice India", "CJI Satire"],
      url: "https://cheapjusticeofindia.com",
      logo: "https://cheapjusticeofindia.com/favicon.svg",
      description:
        "A satirical publication exposing corruption, loopholes, and conflicts of interest in India's judiciary using real, sourced facts.",
      sameAs: [
        "https://www.reddit.com/r/cheapjusticeofindia/",
        "https://www.instagram.com/cheapjusticeforindia/",
        "https://www.youtube.com/@CheapJusticeOfIndia",
      ],
    },
  ],
};

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SplashScreen />

      <section className="border-b border-border" aria-label="Hero">
        <div className="max-w-5xl mx-auto px-4 py-24 md:py-32 text-center">
          <FadeIn>
            <p className="font-serif text-gold text-xs uppercase tracking-[0.3em] mb-6">
              Supreme Court of Satire &bull; Est. 2026
            </p>
            <HeroTitle />
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
                href="#sealed-cover-game"
                className="px-5 py-2.5 text-sm font-medium border border-border rounded-lg hover:border-gold hover:text-gold transition-colors"
              >
                Sealed Cover Game
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
      <FadeIn><SealedCoverGame /></FadeIn>

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
                className="group block bg-card-bg border border-border rounded-xl p-4 transition-all duration-300 ease-out
                  hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_16px_40px_-12px_rgba(197,164,78,0.25)]"
              >
                <p className="text-sm font-semibold text-gold mb-1 transition-all duration-300 group-hover:translate-x-0.5">{src.name}</p>
                <p className="text-[11px] text-muted leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">{src.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <FadeIn>
        <section id="articles" className="border-b border-border py-16" aria-label="Articles and deep dives">
          <div className="max-w-4xl mx-auto px-4">
            <p className="font-serif text-gold text-xs uppercase tracking-[0.25em] mb-3">
              Deep Dives
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Read the Full Story
            </h2>
            <p className="text-muted text-sm mb-8">
              Long-form investigations into the judiciary&apos;s darkest corners
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="/articles/the-revolving-door-of-justice"
                className="group block bg-card-bg border border-border rounded-xl p-5 transition-all duration-300 ease-out
                  hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_20px_50px_-15px_rgba(197,164,78,0.3)]"
              >
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/15 text-accent uppercase transition-all duration-300 group-hover:bg-accent group-hover:text-background">
                  Revolving Door
                </span>
                <h3 className="font-serif text-lg font-bold text-foreground mt-3 mb-2 transition-colors duration-300 group-hover:text-gold">
                  From Bench to Political Bench
                </h3>
                <p className="text-xs text-muted leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                  How retired judges seamlessly transition into political roles, raising questions about their impartiality while on the bench.
                </p>
              </a>
              <a
                href="/articles/sealed-cover-jurisprudence"
                className="group block bg-card-bg border border-border rounded-xl p-5 transition-all duration-300 ease-out
                  hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_20px_50px_-15px_rgba(197,164,78,0.3)]"
              >
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/15 text-accent uppercase transition-all duration-300 group-hover:bg-accent group-hover:text-background">
                  Loopholes
                </span>
                <h3 className="font-serif text-lg font-bold text-foreground mt-3 mb-2 transition-colors duration-300 group-hover:text-gold">
                  Justice in the Dark
                </h3>
                <p className="text-xs text-muted leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                  How sealed cover submissions became a tool to keep the public in the dark about matters that directly affect them.
                </p>
              </a>
            </div>
          </div>
        </section>
      </FadeIn>

      <section className="bg-card-bg">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="font-serif text-gold text-xs uppercase tracking-[0.25em] mb-6">
            Closing Argument
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 leading-relaxed min-h-[4rem] md:min-h-[6rem]">
            &ldquo;<Typewriter text="In a democracy, the judiciary is the last line of defense. When that line is compromised, the people must become the auditors." speed={40} cursor={false} />&rdquo;
          </h2>
          <p className="text-sm text-gold font-semibold uppercase tracking-wide text-right">
            <Typewriter text="— Cheap Justice of India" speed={60} cursor={false} delay={5200} />
          </p>
        </div>
      </section>

      <WordOfTheDay />
      <ContemptNotice />
      <FloatingGavel />
      <JusticeClock />
    </div>
  );
}
