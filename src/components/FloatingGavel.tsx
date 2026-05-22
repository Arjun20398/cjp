"use client";

export default function FloatingGavel() {
  return (
    <a
      href="mailto:stories@cheapjusticeofindia.com"
      title="Submit your story"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg shadow-gold/20 hover:scale-110 transition-transform"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0c0f1a"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M14 2l4 4-9.5 9.5-4 1 1-4L14 2z" />
        <path d="M3 20h18" />
      </svg>
    </a>
  );
}
