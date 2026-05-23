"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#cji-letter", label: "CJI Letter" },
  { href: "#excuse-generator", label: "Excuse Generator" },
  { href: "#revolving-door", label: "Revolving Door" },
  { href: "#fiqs", label: "FIQs" },
  { href: "#wall", label: "Wall of Shame" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-serif text-gold text-2xl font-bold tracking-wide">
              CJI
            </span>
            <span className="hidden sm:block text-sm text-muted uppercase tracking-[0.15em]">
              Cheap Justice of India
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-muted hover:text-gold transition-colors uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-muted hover:text-gold"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="lg:hidden pb-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-xs text-muted hover:text-gold transition-colors uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
