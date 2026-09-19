"use client";

import Image from "next/image";
import { useRef, type ElementType } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import Icon from "@/components/Icon";

export type FillSegment = string | { img: string; alt?: string } | { icon: string };

type Props = {
  segments: FillSegment[];
  as?: ElementType;
  className?: string;
  /** Final word colour */
  to?: string;
};

/** Heading whose words fill in with colour as it scrolls through the viewport. */
export default function FillText({ segments, as: Tag = "p", className = "", to = "#0b1526" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      if (prefersReducedMotion()) {
        gsap.set(q(".fill-word"), { color: to });
        return;
      }
      gsap.to(q(".fill-word"), {
        color: to,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 42%", scrub: true },
      });
      gsap.from(q(".fill-pill"), {
        scale: 0.4,
        opacity: 0,
        rotate: -8,
        ease: "back.out(1.6)",
        stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: "top 78%", end: "bottom 55%", scrub: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {segments.map((seg, i) => {
        if (typeof seg === "string") {
          return seg
            .split(" ")
            .filter(Boolean)
            .map((w, j) => (
              <span key={`${i}-${j}`} className="fill-word">
                {w}{" "}
              </span>
            ));
        }
        if ("img" in seg) {
          return (
            <span
              key={i}
              className="fill-pill relative mr-[0.25em] inline-block h-[0.82em] w-[1.9em] translate-y-[0.08em] overflow-hidden rounded-full align-baseline"
            >
              <Image src={seg.img} alt={seg.alt ?? ""} fill sizes="160px" className="object-cover" />
            </span>
          );
        }
        return (
          <span
            key={i}
            className="fill-pill mr-[0.25em] inline-grid h-[0.82em] w-[1.3em] translate-y-[0.08em] place-items-center rounded-full bg-brand align-baseline text-white"
          >
            <Icon name={seg.icon} className="size-[0.5em]" />
          </span>
        );
      })}
    </Tag>
  );
}
