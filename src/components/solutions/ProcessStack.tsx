"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const STEPS = [
  {
    title: "Consult & select",
    body: "We review drawings, single-line diagrams and BOQs with contractors and consultants, and select the right components for the job.",
    image: "/images/solutions/process-consult.jpg",
    tags: ["Drawings & BOQ review", "Component selection"],
  },
  {
    title: "Engineer & build",
    body: "Panels are assembled with components from leading brands, to the rating, separation form and IP rating your project needs.",
    image: "/images/solutions/process-build.jpg",
    tags: ["Busbar systems", "Up to 2500A"],
  },
  {
    title: "Verify & approve",
    body: "Assemblies are built to IEC 61439-1 & 2 and prepared for TAQA (ADDC & AADC), DEWA and FEWA requirements.",
    image: "/images/solutions/process-test.jpg",
    tags: ["IEC 61439", "Authority requirements"],
  },
  {
    title: "Deliver & support",
    body: "On-time delivery to site, with technical support through commissioning and after-sales service long after handover.",
    image: "/images/solutions/process-deliver.jpg",
    tags: ["On-time delivery", "After-sales service"],
  },
];

/** Sticky cards that stack on top of each other while scrolling. */
export default function ProcessStack() {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".ps-card", ref.current);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const st = { trigger: next, start: "top bottom", end: "top 25%", scrub: true };
          gsap.to(card.querySelector(".ps-inner"), { scale: 0.95, ease: "none", scrollTrigger: st });
          gsap.to(card.querySelector(".ps-dim"), { opacity: 1, ease: "none", scrollTrigger: st });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative">
      {STEPS.map((s, i) => (
        <li
          key={s.title}
          className="ps-card pb-4 md:sticky md:top-[var(--ps-top)] md:pb-6"
          style={{ ["--ps-top" as string]: `calc(6rem + ${i * 0.55}rem)` }}
        >
          <div className="ps-inner relative grid origin-top overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[0_30px_60px_-45px_rgb(11_21_38/0.45)] md:grid-cols-[1fr_1.05fr]">
            <div className="ps-dim pointer-events-none absolute inset-0 z-10 bg-cloud/85 opacity-0" aria-hidden />
            <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 md:p-10">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-mist px-3 py-1 text-sm font-medium text-brand tabular-nums">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-muted tabular-nums">
                  {i + 1} / {STEPS.length}
                </span>
              </div>
              <div>
                <h3 className="display text-[clamp(1.8rem,3.4vw,2.9rem)] leading-[1.02] text-ink">{s.title}</h3>
                <p className="mt-4 max-w-md text-ink-soft">{s.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[24rem]">
              <Image src={s.image} alt={s.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
