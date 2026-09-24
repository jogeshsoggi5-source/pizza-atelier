import { useEffect, useState } from "react";

const SPLASH_DURATION = 3000;
const EXIT_DURATION = 800;

export function WelcomeSplash({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExiting(true), SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isExiting) return;
    const timer = setTimeout(onComplete, EXIT_DURATION);
    return () => clearTimeout(timer);
  }, [isExiting, onComplete]);

  return (
    <div
      role="status"
      aria-label="Pizza Atelier"
      className={`fixed inset-0 z-[9999] overflow-hidden bg-charcoal transition-opacity duration-700 ease-out ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Ambient warmth from the oven */}
      <div className="splash-glow absolute inset-0" />
      <div className="splash-vignette absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Monogram */}
        <svg
          viewBox="0 0 64 64"
          aria-hidden="true"
          className="animate-scale-in h-20 w-20 md:h-24 md:w-24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle
            cx="32"
            cy="32"
            r="30"
            className="animate-draw-ring stroke-gold/70"
            strokeWidth="0.75"
          />
          <path
            d="M32 15 L47 42 Q32 50 17 42 Z"
            className="fill-gold/10 stroke-cream/80"
            strokeWidth="1.25"
          />
          <path d="M17 42 Q32 50 47 42" className="stroke-gold" strokeWidth="1.5" />
          <circle cx="28" cy="30" r="1.9" className="fill-gold" />
          <circle cx="37" cy="33.5" r="1.9" className="fill-gold" />
          <circle cx="31.5" cy="38" r="1.6" className="fill-gold" />
        </svg>

        {/* Wordmark */}
        <h1
          className="animate-fade-up mt-8 font-logo text-5xl font-semibold tracking-[0.06em] text-cream md:text-7xl"
          style={{ animationDelay: "0.35s" }}
        >
          Pizza <span className="text-gold">Atelier</span>
        </h1>

        {/* Rule + eyebrow */}
        <div
          className="animate-fade-up mt-6 flex items-center gap-4"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70 md:w-16" />
          <p className="eyebrow whitespace-nowrap">Wood-Fired · Brooklyn</p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70 md:w-16" />
        </div>

        <p
          className="animate-fade-up mt-5 font-display text-lg italic text-cream/70 md:text-xl"
          style={{ animationDelay: "0.85s" }}
        >
          Crafted like art. Baked with passion.
        </p>

        {/* Loader */}
        <div
          className="animate-fade-up mt-12 h-px w-40 overflow-hidden bg-cream/15"
          style={{ animationDelay: "1.1s" }}
        >
          <div
            className="animate-progress h-full bg-gold"
            style={{ animationDuration: `${SPLASH_DURATION}ms` }}
          />
        </div>

        <p
          className="animate-fade-up mt-4 font-body text-[0.65rem] font-medium uppercase tracking-[0.3em] text-cream/35"
          style={{ animationDelay: "1.3s" }}
        >
          Est. 2014
        </p>
      </div>
    </div>
  );
}
