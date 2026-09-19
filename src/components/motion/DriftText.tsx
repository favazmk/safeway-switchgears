"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Oversized line of type that slides sideways as the page scrolls. */
export default function DriftText({
  text,
  className = "",
  from = 10,
  to = -30,
}: {
  text: string;
  className?: string;
  from?: number;
  to?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current!.firstElementChild,
        { xPercent: from },
        {
          xPercent: to,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="overflow-hidden select-none" aria-hidden>
      <p className={`display leading-[0.85] font-semibold tracking-[-0.06em] whitespace-nowrap ${className}`}>
        {text}
      </p>
    </div>
  );
}
