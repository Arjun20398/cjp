"use client";

import { useState, useEffect } from "react";

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    setMounted(true);
    const fadeTimer = window.setTimeout(() => setPhase("fading"), 3000);
    const hideTimer = window.setTimeout(() => setPhase("gone"), 3700);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!mounted || phase === "gone") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0c0f1a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 0.7s ease",
        pointerEvents: phase === "fading" ? "none" : "auto",
      }}
    >
      <div
        style={{
          border: "2px solid #2a2f45",
          borderRadius: 10,
          padding: "48px 56px",
          textAlign: "center",
          maxWidth: 480,
        }}
      >
        <p
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "#c5a44e",
            fontSize: 13,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Supreme Court of Satire
        </p>
        <p
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "#e8e4dc",
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          Case No. CJI/2026/001
        </p>
        <p
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "#8a8578",
            fontSize: 14,
            marginBottom: 28,
          }}
        >
          The People of India v. The Judiciary
        </p>

        <div
          style={{
            width: "100%",
            height: 4,
            background: "#2a2f45",
            borderRadius: 2,
            overflow: "hidden",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              height: "100%",
              background: "#c5a44e",
              borderRadius: 2,
              animation: "loadBar 2.8s ease-in-out forwards",
            }}
          />
        </div>

        <p style={{ color: "#8a8578", fontSize: 13 }}>
          Loading case files... Estimated wait: 1947 years
        </p>
      </div>

      <style>{`
        @keyframes loadBar {
          0% { width: 0%; }
          60% { width: 70%; }
          90% { width: 95%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
