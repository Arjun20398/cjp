import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cheap Justice of India — They judge you. We judge them.",
    template: "%s | Cheap Justice of India",
  },
  description:
    "Real facts about judicial corruption in India — 4.9 crore pending cases, 8,600+ complaints in 10 years, judges moving to politics. Exposed with satirical honesty.",
  metadataBase: new URL("https://cheapjusticeofindia.com"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "https://cheapjusticeofindia.com",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: "Cheap Justice of India — They judge you. We judge them.",
    description:
      "4.9 crore pending cases. 8,600+ complaints. Judges turning politicians. Real facts, satirical tone.",
    url: "https://cheapjusticeofindia.com",
    siteName: "Cheap Justice of India",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheap Justice of India",
    description:
      "4.9 crore pending cases. 8,600+ complaints. Judges turning politicians. Real facts, satirical tone.",
  },
  keywords: [
    "cheap justice of india",
    "cheapjusticeofindia",
    "cheap justice of india website",
    "cheap justice india satire",
    "Indian judiciary corruption",
    "judicial corruption India",
    "Supreme Court India corruption",
    "pending cases India",
    "judiciary satire India",
    "judicial accountability India",
    "revolving door judiciary",
    "judges corruption India",
    "collegium system India",
    "judicial complaints India",
    "Indian courts backlog",
    "judge impeachment India",
    "india judiciary memes",
    "judiciary roast india",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#0c0f1a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.remove("light")}catch(e){}
if("serviceWorker"in navigator){navigator.serviceWorker.register("/sw.js").catch(()=>{})}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Script
          defer
          data-domain="cheapjusticeofindia.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
