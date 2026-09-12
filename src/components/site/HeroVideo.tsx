import { useEffect, useRef, useState } from "react";

import heroPoster from "@/assets/hero-pizza.jpg";
import pizzaClip from "@/assets/pizza.mp4";

/**
 * The source clip runs 36.68s, but the footage fades out at ~32.3s and the last
 * four seconds are the producer's black end card. Loop before the fade so only
 * the pizza footage is ever on screen.
 */
const CLIP_END = 32;

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);

  // A reduced-motion visitor gets the still poster instead of a looping clip.
  useEffect(() => {
    setMotionAllowed(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!motionAllowed || !video) return;

    // Blocked autoplay leaves the poster up, so retry on the first interaction.
    const play = () => video.play().catch(() => {});
    play();

    const events = ["pointerdown", "keydown", "touchstart", "scroll"];
    events.forEach((name) =>
      window.addEventListener(name, play, { passive: true }),
    );

    return () =>
      events.forEach((name) => window.removeEventListener(name, play));
  }, [motionAllowed]);

  const restartBeforeEndCard = () => {
    const video = videoRef.current;
    if (!video || video.currentTime < CLIP_END) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-charcoal">
      <video
        ref={videoRef}
        src={motionAllowed ? pizzaClip : undefined}
        poster={heroPoster}
        className="h-full w-full object-cover"
        preload={motionAllowed ? "auto" : "none"}
        onTimeUpdate={restartBeforeEndCard}
        // Safety net: never let the video come to rest on the end card.
        onEnded={restartBeforeEndCard}
        autoPlay
        muted
        playsInline
        aria-label="Wood-fired pizza being prepared and baked at Pizza Atelier"
      />
    </div>
  );
}
