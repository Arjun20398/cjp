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

export default function Home() {
  return (
    <div>
      <SplashScreen />

      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-24 md:py-32 text-center">
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
            A satirical publication exposing corruption, loopholes, flawed
            judgments, and conflicts of interest in India&apos;s judiciary.
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
        </div>
      </section>

      <ServicesSection />
      <CJILetter />
      <ExcuseGenerator />
      <RevolvingDoor />
      <FIQSection />
      <WallOfShame />

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
