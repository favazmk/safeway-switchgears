"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import Icon from "@/components/Icon";

export type Milestone = { icon: string; title: string; body: string };

type Props = { items: Milestone[]; eyebrow: string; title: React.ReactNode; intro?: string };

/**
 * A power line winds down the section like a road; a pulse of current
 * travels along it with scroll and switches on each milestone it reaches.
 */
export default function PowerLine({ items, eyebrow, title, intro }: Props) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0, mobile: false });

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      setSize({ w, h: e.contentRect.height, mobile: w < 768 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Winding path through the stage
  const d = (() => {
    const { w, h, mobile } = size;
    if (!w || !h) return "";
    if (mobile) return `M 20 0 L 20 ${h}`;
    const cx = w / 2;
    const amp = Math.min(90, w * 0.07);
    const turns = items.length;
    let path = `M ${cx} 0`;
    for (let y = 8; y <= h; y += 8) {
      const x = cx + Math.sin((y / h) * Math.PI * turns) * amp;
      path += ` L ${x.toFixed(1)} ${y}`;
    }
    return path;
  })();

  useGSAP(
    () => {
      if (!d) return;
      const q = gsap.utils.selector(root);
      const path = root.current?.querySelector<SVGPathElement>(".pl-path");
      const dot = q(".pl-dot")[0];
      if (!path || !dot) return;
      const len = path.getTotalLength();
      const nodes = q(".pl-item");

      if (prefersReducedMotion()) {
        gsap.set(path, { strokeDasharray: "none" });
        nodes.forEach((n) => n.classList.add("is-on"));
        gsap.set(dot, { opacity: 0 });
        return;
      }

      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      const st = ScrollTrigger.create({
        trigger: stage.current,
        start: "top 65%",
        end: "bottom 65%",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(path, { strokeDashoffset: len * (1 - p) });
          const pt = path.getPointAtLength(len * p);
          gsap.set(dot, { x: pt.x, y: pt.y, opacity: p > 0 ? 1 : 0 });
          nodes.forEach((n, i) => n.classList.toggle("is-on", p >= (i + 0.35) / items.length));
        },
      });
      return () => st.kill();
    },
    { scope: root, dependencies: [d], revertOnUpdate: true },
  );

  return (
    <section ref={root} className="relative bg-white py-20 md:py-32" aria-labelledby="pl-title">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="label justify-center">{eyebrow}</p>
          <h2 id="pl-title" className="display mt-4 text-[clamp(2rem,5vw,4.5rem)] leading-[0.98] text-ink">
            {title}
          </h2>
          {intro && <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">{intro}</p>}
        </div>

        <div ref={stage} className="relative mt-14 md:mt-20">
          {/* Line */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <path d={d} fill="none" stroke="#e2e8f0" strokeWidth="2" />
            <path className="pl-path" d={d} fill="none" stroke="#1b6fd0" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <div
            className="pl-dot pointer-events-none absolute top-0 left-0 z-10 -mt-3 -ml-3 size-6 rounded-full bg-volt opacity-0 shadow-[0_0_0_6px_rgb(79_179_255/0.25),0_0_30px_8px_rgb(79_179_255/0.7)]"
            aria-hidden
          />

          <ol className="relative">
            {items.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={m.title}
                  className={`pl-item group flex min-h-[12rem] items-center py-6 pl-14 md:min-h-[15rem] md:pl-0 ${
                    right ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  <div
                    className={`w-full max-w-md rounded-[1.75rem] border border-line bg-white p-6 transition-all duration-700 md:w-[42%] md:p-8 [.is-on_&]:border-brand/30 [.is-on_&]:shadow-[0_30px_60px_-35px_rgb(27_111_208/0.5)] ${
                      right ? "md:text-left" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-full bg-cloud text-muted transition-colors duration-500 group-[.is-on]:bg-brand group-[.is-on]:text-white">
                        <Icon name={m.icon} className="size-5" />
                      </span>
                      <span className="text-sm text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="display mt-5 text-2xl leading-tight text-muted transition-colors duration-500 group-[.is-on]:text-ink md:text-3xl">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-ink-soft">{m.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
