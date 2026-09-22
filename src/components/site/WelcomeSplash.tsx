import { useEffect, useState } from "react";

import splashSlice from "@/assets/splash-pizza-slice.jpg";

const SPLASH_DURATION = 5000;

export function WelcomeSplash({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExiting(true), SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isExiting) return;
    const timer = setTimeout(onComplete, 800);
    return () => clearTimeout(timer);
  }, [isExiting, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden bg-charcoal transition-all duration-700 ease-in-out ${
        isExiting ? "pointer-events-none scale-105 opacity-0" : "opacity-100"
      }`}
    >
      <img
        src={splashSlice}
        alt="Hand lifting a slice from a wood-fired pizza"
        className="animate-ken-burns absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/45 via-charcoal/30 to-charcoal" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-20 text-center md:pb-24">
        <h1 className="animate-fade-up font-logo text-5xl font-semibold tracking-wide text-cream drop-shadow-lg md:text-7xl">
          Pizza <span className="text-gold">Atelier</span>
        </h1>

        <div className="animate-fade-up animation-delay-200 mt-5 flex items-center gap-4">
          <span className="h-px w-8 bg-gold/60 md:w-12" />
          <p className="eyebrow whitespace-nowrap">Wood-Fired · Brooklyn</p>
          <span className="h-px w-8 bg-gold/60 md:w-12" />
        </div>

        <p className="animate-fade-up animation-delay-400 mt-5 font-display text-lg italic text-cream/85 drop-shadow md:text-xl">
          Crafted like art. Baked with passion.
        </p>

        <div className="mt-10 h-0.5 w-48 overflow-hidden rounded-full bg-cream/20">
          <div
            className="animate-progress h-full bg-gold"
            style={{ animationDuration: `${SPLASH_DURATION}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
