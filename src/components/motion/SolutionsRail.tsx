"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import Icon from "@/components/Icon";
import { products } from "@/lib/site";

/**
 * "Our solutions": giant type drifts sideways while product cards travel
 * horizontally through a pinned viewport (desktop). On touch/small screens
 * the cards become a native swipe carousel.
 */
export default function SolutionsRail() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const track = q(".sr-track")[0] as HTMLElement;
      const mm = gsap.matchMedia();

      // Giant words drift in opposite directions on every screen size
      gsap.fromTo(
        q(".sr-giant-a"),
        { xPercent: 8 },
        {
          xPercent: -28,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      mm.add("(min-width: 1024px)", () => {
        const distance = () => track.scrollWidth - window.innerWidth + 80;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: q(".sr-pin")[0],
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        const bar = q(".sr-progress")[0];
        ScrollTrigger.create({
          trigger: q(".sr-pin")[0],
          start: "top top",
          end: () => `+=${distance()}`,
          onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-white" aria-labelledby="sr-title">
      <div className="sr-pin relative flex min-h-svh flex-col justify-center py-20 lg:h-svh lg:py-0">
        {/* Giant drifting words */}
        <div className="pointer-events-none select-none" aria-hidden>
          <p className="sr-giant-a display text-[clamp(4.5rem,min(17vw,26svh),17rem)] leading-[0.85] font-semibold tracking-[-0.06em] whitespace-nowrap text-mist">
            Our solutions · Our solutions
          </p>
        </div>

        <div className="container-x relative -mt-[clamp(2.2rem,min(6vw,9svh),6rem)] flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label">LV switchgear & products</p>
            <h2 id="sr-title" className="display mt-3 max-w-xl text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] text-ink">
              Panels for every point of the network
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden h-px w-40 bg-line lg:block">
              <div className="sr-progress h-full origin-left scale-x-0 bg-brand" />
            </div>
            <Link href="/products" className="btn btn-ghost">
              All products
              <span className="chip">
                <Icon name="arrow" className="size-3.5" />
              </span>
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 overflow-x-auto overscroll-x-contain lg:mt-[min(2.5rem,4svh)] [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          <ul data-hscroll className="sr-track flex w-max snap-x snap-mandatory items-stretch gap-4 px-4 sm:px-6 lg:snap-none lg:gap-5 lg:px-10">
            {products.map((p, i) => (
              <li key={p.code} className="flex snap-start">
                <Link
                  href={`/products#${p.code.toLowerCase()}`}
                  className="group flex h-full w-[78vw] max-w-[22rem] flex-col overflow-hidden rounded-[1.75rem] bg-cloud transition-colors duration-500 hover:bg-mist lg:h-[clamp(21rem,calc(100svh-19rem),30rem)] lg:w-[23rem]"
                >
                  <div className="relative m-2 aspect-[4/3] shrink-0 overflow-hidden rounded-[1.4rem] bg-white lg:aspect-auto lg:min-h-0 lg:flex-1">
                    <Image
                      src={p.installed}
                      alt={`${p.title} installed on site`}
                      fill
                      sizes="(min-width: 1024px) 368px, 78vw"
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
                      {String(i + 1).padStart(2, "0")} · {p.code}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-4 px-5 pt-3 pb-5">
                    <div>
                      <h3 className="display text-xl leading-tight text-ink">{p.title}</h3>
                      <p className="mt-1.5 text-sm text-ink-soft">{p.detail}</p>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-ink transition-all duration-500 group-hover:-rotate-45 group-hover:bg-brand group-hover:text-white">
                      <Icon name="arrow" className="size-4" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
