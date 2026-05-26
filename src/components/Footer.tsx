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
                { href: "#sealed-cover-game", label: "Sealed Cover Game" },
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

        <div className="mt-10 pt-8 border-t border-border text-center">
          <h3 className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">
            Follow and Support Us
          </h3>
          <div className="flex justify-center gap-5">
            <a
              href="https://www.reddit.com/r/cheapjusticeofindia/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted hover:text-gold transition-all duration-300 hover:scale-110"
              aria-label="Reddit"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 0-.463.327.327 0 0 0-.231-.094c-.06 0-.144.028-.192.07-.572.572-1.7.862-2.538.862-.839 0-1.966-.29-2.538-.856a.286.286 0 0 0-.192-.076z"/></svg>
              <span className="text-xs font-semibold">Reddit</span>
            </a>
            <a
              href="https://www.instagram.com/cheapjusticeforindia/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted hover:text-gold transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              <span className="text-xs font-semibold">Instagram</span>
            </a>
            <a
              href="https://www.youtube.com/@CheapJusticeOfIndia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted hover:text-gold transition-all duration-300 hover:scale-110"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span className="text-xs font-semibold">YouTube</span>
            </a>
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
