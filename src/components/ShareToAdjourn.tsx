"use client";

import { useState } from "react";

type Props = {
  children: React.ReactNode;
  onUnlock: () => void;
  shareText?: string;
};

export default function ShareToAdjourn({ children, onUnlock, shareText = "Check out Cheap Justice of India — exposing judicial corruption with facts and satire.\n\ncheapjusticeofindia.com" }: Props) {
  const [shareCount, setShareCount] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const required = 2;

  const handleShare = (platform: string) => {
    let url = "";
    const encoded = encodeURIComponent(shareText);
    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${encoded}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=https://cheapjusticeofindia.com&text=${encoded}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encoded}`;
        break;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    const next = shareCount + 1;
    setShareCount(next);
    if (next >= required) {
      setUnlocked(true);
      onUnlock();
    }
  };

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="border border-accent/30 rounded-xl bg-card-bg p-6 text-center">
      <p className="text-[10px] uppercase tracking-widest text-accent mb-2">
        ⚖️ Order 39, Rule 1
      </p>
      <p className="font-serif text-lg font-bold text-foreground mb-2">
        Your request has been adjourned.
      </p>
      <p className="text-xs text-muted mb-6">
        To fast-track your application, serve a copy of this summons to {required - shareCount} more citizen(s).
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => handleShare("whatsapp")}
          className="px-4 py-2 border border-[#25d366] text-[#25d366] text-xs rounded-lg hover:bg-[#25d366]/10 transition-colors"
        >
          Share on WhatsApp
        </button>
        <button
          onClick={() => handleShare("telegram")}
          className="px-4 py-2 border border-[#0088cc] text-[#0088cc] text-xs rounded-lg hover:bg-[#0088cc]/10 transition-colors"
        >
          Share on Telegram
        </button>
        <button
          onClick={() => handleShare("twitter")}
          className="px-4 py-2 border border-gold text-gold text-xs rounded-lg hover:bg-gold/10 transition-colors"
        >
          Share on 𝕏
        </button>
      </div>
      <div className="mt-4 flex justify-center gap-1">
        {Array.from({ length: required }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full border ${i < shareCount ? "bg-gold border-gold" : "border-border"}`}
          />
        ))}
      </div>
      <p className="text-[10px] text-muted mt-2">
        {shareCount}/{required} summons served
      </p>
    </div>
  );
}
