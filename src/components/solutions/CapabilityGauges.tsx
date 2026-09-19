"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Bento of animated gauges for the key electrical ratings. */
export default function CapabilityGauges() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      if (prefersReducedMotion()) return;
      const st = { trigger: ref.current, start: "top 75%", once: true };

      gsap.from(q(".cg-amp-fill"), { scaleX: 0, duration: 1.8, ease: "power3.out", scrollTrigger: st });
      const amp = { v: 0 };
      gsap.to(amp, {
        v: 2500,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: st,
        onUpdate: () => {
          const el = q(".cg-amp-num")[0];
          if (el) el.textContent = Math.round(amp.v).toLocaleString("en-US");
        },
      });
      gsap.from(q(".cg-ka-bar"), { scaleY: 0, duration: 1.2, stagger: 0.18, ease: "power3.out", scrollTrigger: st });
      gsap.from(q(".cg-ip"), { opacity: 0.25, y: 12, duration: 0.6, stagger: 0.2, ease: "power2.out", scrollTrigger: st });
      gsap.from(q(".cg-temp-fill"), { scaleY: 0, duration: 1.6, ease: "power3.out", scrollTrigger: st });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
      {/* Amps */}
      <div className="relative overflow-hidden rounded-[1.75rem] bg-brand p-6 text-white sm:col-span-2 md:p-8 lg:col-span-7">
        <div className="grid-lines-light absolute inset-0" aria-hidden />
        <div className="relative">
          <p className="text-sm text-white/75">Panel ratings up to</p>
          <p className="display mt-2 text-[clamp(3.2rem,8vw,6.5rem)] leading-none">
            <span className="cg-amp-num tabular-nums">2,500</span>
            <span className="text-white/60">A</span>
          </p>
          <div className="mt-8">
            <div className="h-3 overflow-hidden rounded-full bg-white/15">
              <div className="cg-amp-fill live-wire-host relative h-full origin-left rounded-full bg-white">
                <span className="live-wire absolute inset-0 opacity-70" />
              </div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-white/60 tabular-nums">
              <span>0A</span>
              <span>630A</span>
              <span>1250A</span>
              <span>2500A</span>
            </div>
          </div>
        </div>
      </div>

      {/* kA */}
      <div className="rounded-[1.75rem] bg-navy p-6 text-white md:p-8 lg:col-span-5">
        <p className="text-sm text-white/70">Short-circuit ratings</p>
        <div className="mt-6 flex h-36 items-end gap-3 sm:gap-4">
          {[
            { v: 36, h: "55%" },
            { v: 50, h: "77%" },
            { v: 65, h: "100%" },
          ].map((b) => (
            <div key={b.v} className="flex h-full flex-1 flex-col justify-end">
              <div
                className="cg-ka-bar relative origin-bottom rounded-t-xl bg-gradient-to-t from-brand to-volt"
                style={{ height: b.h }}
              >
                <span className="display absolute inset-x-0 top-2 text-center text-lg">{b.v}</span>
              </div>
              <span className="mt-2 text-center text-xs text-white/60">kA</span>
            </div>
          ))}
        </div>
      </div>

      {/* IP */}
      <div className="rounded-[1.75rem] bg-cloud p-6 md:p-8 lg:col-span-7">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm text-ink-soft">Ingress protection</p>
          <p className="text-xs text-muted">Dust & water protection increases →</p>
        </div>
        <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {["IP31", "IP41", "IP54", "IP65"].map((ip, i) => (
            <li
              key={ip}
              className="cg-ip rounded-2xl bg-white p-4"
              style={{ boxShadow: `inset 0 -${4 + i * 3}px 0 0 rgb(27 111 208 / ${0.25 + i * 0.25})` }}
            >
              <p className="display text-2xl text-ink">{ip}</p>
              <p className="mt-1 text-xs text-ink-soft">{["Indoor", "Indoor, dusty", "Dust & splash", "Dust-tight & jets"][i]}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Temperature */}
      <div className="flex items-center justify-between gap-6 rounded-[1.75rem] border border-line bg-white p-6 md:p-8 sm:col-span-2 lg:col-span-5">
        <div>
          <p className="text-sm text-ink-soft">Rated ambient temperature</p>
          <p className="display mt-2 text-[clamp(3rem,6vw,4.8rem)] leading-none text-ink">
            50<span className="text-muted">°C</span>
          </p>
          <p className="mt-3 max-w-[16rem] text-sm text-ink-soft">Built for UAE conditions, indoors and out.</p>
        </div>
        <div className="relative h-36 w-10 shrink-0 rounded-full bg-cloud p-1.5" aria-hidden>
          <div className="cg-temp-fill absolute inset-x-1.5 bottom-1.5 top-[18%] origin-bottom rounded-full bg-gradient-to-t from-[#f59e0b] to-[#ef4444]" />
        </div>
      </div>
    </div>
  );
}
