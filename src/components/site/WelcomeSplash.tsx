import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export function WelcomeSplash({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto-dismiss after 4 seconds
    const timer = setTimeout(() => {
      handleDismiss();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-charcoal transition-opacity duration-700 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-charcoal/95" />

      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gold/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <div className="mb-8 inline-block animate-fade-up">
          <span className="font-logo text-6xl font-semibold tracking-wide text-cream md:text-7xl">
            Pizza <span className="text-gold">Atelier</span>
          </span>
        </div>

        {/* Tagline */}
        <div className="animate-fade-up animation-delay-200 mb-12 max-w-md space-y-3">
          <p className="eyebrow">Crafted Like Art</p>
          <h1 className="font-display text-2xl font-bold leading-tight text-cream md:text-3xl">
            Baked with Passion
          </h1>
          <p className="text-sm text-cream/70">
            Wood-fired pizzas, smash burgers, and craft flavors made by hand with authentic ingredients and traditional technique.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="animate-fade-up animation-delay-400 mt-8 cursor-pointer transition-opacity hover:opacity-70"
          onClick={handleDismiss}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-gold/60">Scroll to Enter</span>
            <ChevronDown className="h-5 w-5 animate-bounce text-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
