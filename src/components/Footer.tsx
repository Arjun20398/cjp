import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card-bg mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="font-serif text-gold text-xl font-bold">CJI</span>
            <p className="mt-2 text-sm text-muted">{siteConfig.tagline}</p>
            <p className="mt-1 text-xs text-muted italic">
              Real facts. Satirical tone.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold text-gold uppercase tracking-widest mb-3">
              Sections
            </h3>
            <ul className="space-y-2">
              {[
                { href: "#services", label: "Our Services" },
                { href: "#cji-letter", label: "CJI Letter" },
                { href: "#excuse-generator", label: "Excuse Generator" },
                { href: "#revolving-door", label: "Revolving Door" },
                { href: "#fiqs", label: "FIQs" },
                { href: "#wall", label: "Wall of Shame" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-muted hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold text-gold uppercase tracking-widest mb-3">
              Disclaimer
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              {siteConfig.disclaimer}
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold text-gold uppercase tracking-widest mb-3">
              Contact
            </h3>
            <p className="text-xs text-muted leading-relaxed mb-2">
              For grievances, corrections, or legal inquiries:
            </p>
            <a
              href="mailto:contact@cheapjusticeofindia.com"
              className="text-xs text-gold hover:underline"
            >
              contact@cheapjusticeofindia.com
            </a>
            <p className="text-[10px] text-muted mt-3 leading-relaxed">
              Grievance Officer as per IT Rules, 2021
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved. Built with satire, not malice.
        </div>
      </div>
    </footer>
  );
}
