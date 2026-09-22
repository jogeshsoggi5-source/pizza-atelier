import { useEffect, useState } from "react";

import splashBackdrop from "@/assets/hero-pizza.jpg";
import splashPizza from "@/assets/pizza-margherita.jpg";

const SPLASH_DURATION = 3600;

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
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-charcoal transition-all duration-700 ease-in-out ${
        isExiting ? "pointer-events-none scale-105 opacity-0" : "opacity-100"
      }`}
    >
      <img
        src={splashBackdrop}
        alt=""
        aria-hidden="true"
        className="animate-ken-burns absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/85 to-charcoal" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="animate-scale-in relative">
          <div className="absolute -inset-6 rounded-full border border-gold/20" />
          <div className="absolute -inset-12 rounded-full border border-gold/10" />
          <div className="h-36 w-36 overflow-hidden rounded-full border-2 border-gold/60 shadow-2xl md:h-44 md:w-44">
            <img
              src={splashPizza}
              alt="Wood-fired Margherita pizza"
              className="animate-spin-slow h-full w-full object-cover"
            />
          </div>
        </div>

        <h1 className="animate-fade-up animation-delay-400 mt-14 font-logo text-5xl font-semibold tracking-wide text-cream md:text-7xl">
          Pizza <span className="text-gold">Atelier</span>
        </h1>

        <div className="animate-fade-up animation-delay-600 mt-6 flex items-center gap-4">
          <span className="h-px w-8 bg-gold/50 md:w-12" />
          <p className="eyebrow whitespace-nowrap">Wood-Fired · Brooklyn</p>
          <span className="h-px w-8 bg-gold/50 md:w-12" />
        </div>

        <p className="animate-fade-up animation-delay-600 mt-6 font-display text-lg italic text-cream/70 md:text-xl">
          Crafted like art. Baked with passion.
        </p>

        <div className="mt-14 h-0.5 w-48 overflow-hidden rounded-full bg-cream/15">
          <div className="animate-progress h-full bg-gold" />
        </div>
      </div>
    </div>
  );
}
