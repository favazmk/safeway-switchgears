"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** How far the image drifts (percent of its height) */
  amount?: number;
  children?: React.ReactNode;
};

/** Rounded image that drifts and settles from a slight zoom as it scrolls through. */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority,
  amount = 12,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const img = ref.current?.querySelector("img");
      if (!img) return;
      gsap.fromTo(
        img,
        { yPercent: -amount / 2, scale: 1.18 },
        {
          yPercent: amount / 2,
          scale: 1.05,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      {children}
    </div>
  );
}
