"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Icon from "@/components/Icon";

/**
 * Scroll-scrubbed cinematic hero.
 *
 * The film (switchgear interior → door closes → switch ON → current races
 * along the cables → darkness → factory lights up) is exported as a WebP
 * frame sequence under /public/hero/{desktop|mobile}/ with a manifest.json.
 * Frames are painted to a <canvas> according to scroll progress, which is
 * far smoother than seeking a <video> element.
 */

type Manifest = {
  frames: number;
  desktop: { dir: string; width: number; height: number };
  mobile: { dir: string; width: number; height: number };
  ext: string;
  poster: string;
};

type Beat = {
  from: number;
  to: number;
  eyebrow: string;
  title: string;
  body?: string;
  align: "left" | "right" | "center";
};

const BEATS: Beat[] = [
  {
    from: 0,
    to: 0.15,
    eyebrow: "Safeway Electric Switchgear Trading LLC",
    title: "Powering reliability",
    body: "Precision-built LV switchgear and control panels, engineered in Abu Dhabi since 1998.",
    align: "left",
  },
  {
    from: 0.2,
    to: 0.33,
    eyebrow: "Built to IEC 61439",
    title: "Sealed. Secured. Switched on.",
    body: "Form 4b Type 6 assemblies up to 2500A, approved by TAQA, DEWA and FEWA.",
    align: "right",
  },
  {
    from: 0.4,
    to: 0.58,
    eyebrow: "Power in motion",
    title: "From the panel to every circuit",
    body: "36kA to 65kA fault ratings, delivering safe, uninterrupted power where it matters.",
    align: "left",
  },
  {
    from: 0.66,
    to: 0.76,
    eyebrow: "When the lights have to stay on",
    title: "Trusted in the dark",
    align: "center",
  },
];

const FINAL_FROM = 0.84;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedMotion = () => window.matchMedia(REDUCED_QUERY).matches;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

function beatOpacity(p: number, from: number, to: number) {
  const fade = Math.min(0.035, (to - from) / 3);
  if (p < from || p > to) return 0;
  // The opening beat is fully visible at the top of the page (it holds the H1).
  if (p < from + fade) return from === 0 ? 1 : (p - from) / fade;
  if (p > to - fade) return (to - p) / fade;
  return 1;
}

export default function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finalRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    let raf = 0;
    let manifest: Manifest | null = null;
    let images: (HTMLImageElement | null)[] = [];
    let loaded: boolean[] = [];
    let lastDrawn = -1;
    let progress = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      lastDrawn = -1;
      schedule();
    };

    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const nearestLoaded = (i: number) => {
      if (loaded[i]) return i;
      for (let d = 1; d < loaded.length; d++) {
        if (loaded[i - d]) return i - d;
        if (loaded[i + d]) return i + d;
      }
      return -1;
    };

    const render = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      progress = clamp(-rect.top / Math.max(total, 1));

      if (manifest) {
        const target = Math.round(progress * (manifest.frames - 1));
        const idx = nearestLoaded(target);
        if (idx !== -1 && idx !== lastDrawn && images[idx]) {
          drawCover(images[idx]!);
          lastDrawn = idx;
        }
      }

      BEATS.forEach((b, i) => {
        const el = beatRefs.current[i];
        if (!el) return;
        const o = beatOpacity(progress, b.from, b.to);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${(1 - o) * 24}px, 0)`;
        el.style.visibility = o > 0 ? "visible" : "hidden";
      });

      const f = clamp((progress - FINAL_FROM) / 0.06);
      if (finalRef.current) {
        finalRef.current.style.opacity = String(f);
        finalRef.current.style.transform = `translate3d(0, ${(1 - f) * 30}px, 0)`;
        finalRef.current.style.visibility = f > 0 ? "visible" : "hidden";
      }
      if (hintRef.current) hintRef.current.style.opacity = String(clamp(1 - progress * 25));
      if (meterRef.current) meterRef.current.style.transform = `scaleY(${progress})`;
    };

    function schedule() {
      if (!raf) raf = requestAnimationFrame(render);
    }

    const load = async () => {
      try {
        const res = await fetch("/hero/manifest.json");
        if (!res.ok) throw new Error("no manifest");
        manifest = (await res.json()) as Manifest;
      } catch {
        return; // poster image stays visible
      }
      if (cancelled || !manifest) return;
      const m = manifest;
      const set = window.innerWidth < 768 ? m.mobile : m.desktop;
      images = new Array(m.frames).fill(null);
      loaded = new Array(m.frames).fill(false);

      const src = (i: number) => `${set.dir}${String(i + 1).padStart(4, "0")}.${m.ext}`;
      const loadOne = (i: number) =>
        new Promise<void>((resolve) => {
          if (images[i]) return resolve();
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            loaded[i] = true;
            if (i === 0) setReady(true);
            schedule();
            resolve();
          };
          img.onerror = () => resolve();
          img.src = src(i);
          images[i] = img;
        });

      // Coarse-to-fine: first frame, then every 12th, 6th, 3rd, then all.
      await loadOne(0);
      for (const step of [12, 6, 3, 1]) {
        const batch: number[] = [];
        for (let i = 0; i < m.frames; i += step) if (!images[i]) batch.push(i);
        for (let k = 0; k < batch.length; k += 8) {
          if (cancelled) return;
          await Promise.all(batch.slice(k, k + 8).map(loadOne));
        }
      }
    };

    resize();
    load();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section className="h-svh p-2 sm:p-3">
        <div className="relative isolate flex h-full items-end overflow-hidden rounded-[1.75rem] bg-navy text-white sm:rounded-[2rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero/poster-end.webp" alt="" className="absolute inset-0 -z-10 size-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
          <FinalCopy />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[700svh] bg-white" aria-label="Intro film">
      <div className="sticky top-0 h-svh p-2 sm:p-3">
        <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-navy sm:rounded-[2rem]">
          {/* Poster shown until the first frame is decoded */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/poster.webp"
            alt=""
            fetchPriority="high"
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
              ready ? "opacity-0" : "opacity-100"
            }`}
          />
          <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden />

          {/* Legibility scrims */}
          {/* Copy sits in the lower half, over bright factory lights, so the scrim
              stays dense well up the frame instead of fading out by the middle. */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/95 from-10% via-navy/55 via-45% to-navy/25" />

          {/* Story beats */}
          <div className="absolute inset-0">
            {BEATS.map((b, i) => {
              const Heading = i === 0 ? "h1" : "h2";
              return (
                <div
                  key={b.title}
                  ref={(el) => {
                    beatRefs.current[i] = el;
                  }}
                  style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
                  className={`absolute inset-x-0 bottom-0 px-5 pb-24 will-change-transform text-shadow-lg text-shadow-navy/60 sm:px-8 md:pb-16 lg:px-12 ${
                    b.align === "right"
                      ? "md:left-auto md:max-w-2xl md:text-right"
                      : b.align === "center"
                        ? "md:text-center"
                        : "md:max-w-3xl"
                  }`}
                >
                  <p
                    className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-white backdrop-blur-md`}
                  >
                    <span className="size-1.5 rounded-full bg-volt shadow-[0_0_8px_var(--color-volt)]" />
                    {b.eyebrow}
                  </p>
                  <Heading className="display mt-5 text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] text-white">
                    {b.title}
                  </Heading>
                  {b.body && (
                    <p
                      className={`mt-5 max-w-md text-base text-white/75 md:text-lg ${
                        b.align === "right" ? "md:ml-auto" : b.align === "center" ? "md:mx-auto" : ""
                      }`}
                    >
                      {b.body}
                    </p>
                  )}
                </div>
              );
            })}

            <div ref={finalRef} style={{ opacity: 0, visibility: "hidden" }} className="absolute inset-0 flex items-end">
              <FinalCopy />
            </div>
          </div>

          {/* Progress meter */}
          <div className="absolute top-1/2 right-4 hidden h-40 w-[2px] -translate-y-1/2 overflow-hidden rounded bg-white/15 md:block" aria-hidden>
            <div ref={meterRef} className="h-full w-full origin-top bg-volt" style={{ transform: "scaleY(0)" }} />
          </div>

          {/* Scroll hint */}
          <div
            ref={hintRef}
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-xs text-white/70 md:flex"
            aria-hidden
          >
            Scroll to switch on
            <span className="relative h-9 w-5 rounded-full border border-white/40">
              <span className="absolute top-1.5 left-1/2 h-2 w-0.5 -translate-x-1/2 animate-bounce rounded bg-volt" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCopy() {
  return (
    <div className="w-full px-5 pb-6 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <p className="display max-w-md text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.05] text-white text-shadow-lg text-shadow-navy/60">
          Powering reliability, <span className="text-volt">distributing trust</span> across the UAE since 1998.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/products" className="btn btn-light">
            Explore products
            <span className="chip">
              <Icon name="arrow" className="size-3.5" />
            </span>
          </Link>
          <Link href="/contact" className="btn btn-ghost-light backdrop-blur">
            Get a quote
          </Link>
        </div>
      </div>
      <p
        // At this tight leading the "y" descender hangs ~0.18em below the line box,
        // past the hero's rounded, overflow-hidden frame; pb gives the tail room.
        className="display mt-4 pb-[0.2em] text-center text-[24vw] leading-[0.78] font-semibold tracking-[-0.07em] select-none md:mt-2"
        aria-hidden
      >
        {/* Same fade as the footer wordmark. background-clip:text only fills glyphs
            inside the span's box, and the negative tracking ends that box ~0.08em
            short of the "y" ink, chopping its right arm. Padding widens the painted
            area to cover the overhang; the matching negative margin keeps layout. */}
        <span className="-mx-[0.1em] bg-gradient-to-b from-white via-white/80 to-white/0 bg-clip-text px-[0.1em] text-transparent">
          Safeway
        </span>
      </p>
    </div>
  );
}
