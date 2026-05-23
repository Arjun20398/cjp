import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cheap Justice of India — They judge you. We judge them.",
  description:
    "A satirical website exposing the rot in India's judiciary through humor, facts, and fearless commentary.",
  metadataBase: new URL("https://cheapjusticeofindia.com"),
  openGraph: {
    title: "Cheap Justice of India",
    description:
      "They judge you. We judge them. Real facts about India's judiciary — delivered with satirical honesty.",
    url: "https://cheapjusticeofindia.com",
    siteName: "Cheap Justice of India",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheap Justice of India",
    description:
      "They judge you. We judge them. Real facts about India's judiciary — delivered with satirical honesty.",
  },
  keywords: [
    "Indian judiciary",
    "judicial corruption",
    "Supreme Court India",
    "satire",
    "judicial accountability",
    "revolving door judiciary",
    "cheap justice",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
