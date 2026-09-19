"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const CHIPS = [
  { label: "Up to 2500A", cls: "left-[4%] top-[12%]" },
  { label: "Form 4b Type 6", cls: "right-[5%] top-[18%]" },
  { label: "IP31 – IP65", cls: "left-[10%] bottom-[14%] hidden sm:block" },
];

/** Product line-up that rises into place, with spec chips floating at different depths. */
export default function ProductStage() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(ref);
      gsap.from(q(".ps-lineup"), { y: 90, opacity: 0, duration: 1.5, ease: "expo.out", delay: 0.15 });
      gsap.from(q(".ps-chip"), { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.12, delay: 0.5 });
      gsap.to(q(".ps-lineup"), {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
      q(".ps-chip").forEach((el, i) =>
        gsap.to(el, {
          yPercent: -60 - i * 40,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        }),
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="grid-lines relative flex aspect-[4/3] items-end justify-center overflow-hidden rounded-[1.75rem] bg-cloud px-[4%] sm:aspect-[16/9] md:rounded-[2rem] lg:aspect-[21/9]"
    >
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-mist to-transparent" />
      <div className="ps-lineup relative mb-[3%] h-[82%] w-full">
        <Image
          src="/images/products/lineup.webp"
          alt="Safeway switchgear and control panel line-up"
          fill
          priority
          sizes="(min-width: 1024px) 80vw, 95vw"
          className="object-contain object-bottom drop-shadow-[0_40px_40px_rgb(11_21_38/0.16)]"
        />
      </div>
      {CHIPS.map((c) => (
        <span
          key={c.label}
          className={`ps-chip absolute rounded-full bg-white px-3.5 py-2 text-xs font-medium text-ink shadow-[0_12px_30px_-12px_rgb(11_21_38/0.3)] sm:text-sm ${c.cls}`}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}
