import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import heroPizza from "@/assets/hero-pizza.jpg";
import heroBurger from "@/assets/hero-burger.jpg";
import heroDrinks from "@/assets/hero-drinks.jpg";

interface Slide {
  id: string;
  src: string;
  alt: string;
  eyebrow: string;
}

const SLIDE_DURATION = 6000;

const SLIDES: Slide[] = [
  {
    id: "pizza-oven",
    src: heroPizza,
    alt: "Wood-fired pizza fresh from the oven at Pizza Atelier",
    eyebrow: "Wood-Fired Pizza",
  },
  {
    id: "burger",
    src: heroBurger,
    alt: "Smash burger stacked high with fresh vegetables",
    eyebrow: "Smash Burgers",
  },
  {
    id: "drinks",
    src: heroDrinks,
    alt: "Craft cocktail served at the bar",
    eyebrow: "Craft Drinks",
  },
];

interface HeroSlideshowProps {
  onSlideChange?: (eyebrow: string) => void;
}

export function HeroSlideshow({ onSlideChange }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMotionAllowed(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    onSlideChange?.(SLIDES[index].eyebrow);
  }, [index, onSlideChange]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!motionAllowed) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionAllowed]);

  const goTo = (i: number) => {
    setIndex(i);
    resetTimer();
  };

  const goToOffset = (offset: number) =>
    goTo((index + offset + SLIDES.length) % SLIDES.length);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-charcoal"
      role="region"
      aria-label="Featured dishes and drinks"
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className={`h-full w-full object-cover ${
              motionAllowed ? "animate-ken-burns" : ""
            }`}
          />
        </div>
      ))}

      {/* Prev / next controls */}
      <button
        type="button"
        onClick={() => goToOffset(-1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-cream/30 bg-charcoal/30 p-2 text-cream backdrop-blur-sm transition hover:bg-charcoal/60 sm:flex md:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => goToOffset(1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-cream/30 bg-charcoal/30 p-2 text-cream backdrop-blur-sm transition hover:bg-charcoal/60 sm:flex md:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${slide.eyebrow} slide`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-7 bg-gold" : "w-1.5 bg-cream/50 hover:bg-cream/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
