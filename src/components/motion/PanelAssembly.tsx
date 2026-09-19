"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const STEPS = [
  {
    title: "Enclosure",
    body: "Electrogalvanized steel, GRP, aluminium or stainless steel. Floor or wall mounted, IP31 to IP65.",
  },
  {
    title: "Internal separation",
    body: "Form 2b, Form 3b and Form 4b Type 6 compartments that protect people and keep systems running.",
  },
  {
    title: "Copper busbar system",
    body: "Busbars rated up to 2500A with 36kA, 50kA and 65kA short-circuit ratings.",
  },
  {
    title: "Protection devices",
    body: "Breakers and switching devices from ABB, Schneider Electric, Siemens, Eaton and more.",
  },
  {
    title: "Wiring & control",
    body: "PLC, VFD and conventional control circuits for pumps, fans, AHU and FAHU applications.",
  },
  {
    title: "Tested & energised",
    body: "Built to IEC 61439-1 & 2 and ready for TAQA, DEWA and FEWA approvals.",
  },
];

const MCB_COLS = 14;

export default function PanelAssembly() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const setActive = (i: number) => {
        q(".pa-step").forEach((el, k) => el.classList.toggle("is-active", k === i));
        q(".pa-step-m").forEach((el, k) => el.classList.toggle("is-active", k === i));
        const counter = q(".pa-counter")[0];
        if (counter) counter.textContent = String(i + 1).padStart(2, "0");
      };

      if (prefersReducedMotion()) {
        gsap.set(q(".pa-door"), { rotateY: 0 });
        setActive(STEPS.length - 1);
        return;
      }

      // Initial (disassembled) state
      gsap.set(q(".pa-frame"), { opacity: 0, scale: 0.92, transformOrigin: "50% 100%" });
      gsap.set(q(".pa-outline"), { strokeDasharray: 2600, strokeDashoffset: 2600 });
      gsap.set(q(".pa-plate"), { opacity: 0, y: -60 });
      gsap.set(q(".pa-rail"), { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(q(".pa-bar"), { x: 520, opacity: 0 });
      gsap.set(q(".pa-dropper"), { scaleY: 0, transformOrigin: "50% 0%" });
      gsap.set(q(".pa-mccb"), { y: -260, opacity: 0 });
      gsap.set(q(".pa-mcb"), { y: -30, opacity: 0 });
      gsap.set(q(".pa-duct"), { opacity: 0 });
      gsap.set(q(".pa-wire"), { strokeDasharray: 160, strokeDashoffset: 160 });
      gsap.set(q(".pa-term"), { opacity: 0, y: 20 });
      gsap.set(q(".pa-door"), { rotateY: -112, opacity: 0 });
      gsap.set(q(".pa-knob"), { attr: { transform: "rotate(-45 417 205)" } });
      gsap.set(q(".pa-lamp-on"), { opacity: 0 });
      gsap.set(q(".pa-screen-on"), { opacity: 0 });
      gsap.set(q(".pa-halo"), { opacity: 0, scale: 0.6 });
      gsap.set(q(".pa-energy"), { strokeDashoffset: 900, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 5}`,
          scrub: 0.8,
          pin: q(".pa-pin")[0],
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length))),
        },
      });

      // 01 Enclosure
      tl.to(q(".pa-frame"), { opacity: 1, scale: 1, duration: 1 })
        .to(q(".pa-outline"), { strokeDashoffset: 0, duration: 1.2, ease: "none" }, "<")
        // 02 Separation / mounting plate
        .to(q(".pa-plate"), { opacity: 1, y: 0, duration: 1 })
        .to(q(".pa-rail"), { scaleX: 1, duration: 0.8, stagger: 0.15 }, "-=0.4")
        // 03 Busbars
        .to(q(".pa-bar"), { x: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" })
        .to(q(".pa-dropper"), { scaleY: 1, duration: 0.6, stagger: 0.05 }, "-=0.3")
        // 04 Protection devices
        .to(q(".pa-mccb"), { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: "back.out(1.1)" })
        .to(q(".pa-mcb"), { y: 0, opacity: 1, duration: 0.5, stagger: 0.025 }, "-=0.2")
        // 05 Wiring
        .to(q(".pa-duct"), { opacity: 1, duration: 0.5 })
        .to(q(".pa-wire"), { strokeDashoffset: 0, duration: 1.2, stagger: 0.04, ease: "none" }, "<")
        .to(q(".pa-term"), { opacity: 1, y: 0, duration: 0.5, stagger: 0.03 }, "-=0.8")
        // 06 Door closes, switch on, energise
        .to(q(".pa-door"), { opacity: 1, duration: 0.15 })
        .to(q(".pa-door"), { rotateY: 0, duration: 1.4, ease: "power2.inOut" }, "<")
        .to(q(".pa-knob"), { attr: { transform: "rotate(45 417 205)" }, duration: 0.5, ease: "back.out(2)" })
        .to(q(".pa-lamp-on"), { opacity: 1, duration: 0.3, stagger: 0.1 })
        .to(q(".pa-screen-on"), { opacity: 1, duration: 0.4 }, "<")
        .to(q(".pa-halo"), { opacity: 1, scale: 1, duration: 0.8 }, "<")
        .to(q(".pa-energy"), { opacity: 1, strokeDashoffset: 0, duration: 1, ease: "none" }, "<0.1");
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-white" aria-labelledby="pa-title">
      <div className="pa-pin relative flex h-svh flex-col overflow-hidden">
        <div className="container-x grid h-full grid-rows-[auto_1fr_auto] gap-4 pt-24 pb-3 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-1 lg:items-center lg:gap-12 lg:pt-20 lg:pb-8">
          {/* Copy */}
          <div className="lg:self-center">
            <p className="label">How a Safeway panel is built</p>
            <h2
              id="pa-title"
              className="display mt-3 text-[clamp(1.9rem,4.4vw,3.9rem)] leading-[1] text-ink"
            >
              Engineered layer by layer, <span className="text-brand">built to last.</span>
            </h2>

            {/* Desktop step list */}
            <ol className="mt-10 hidden space-y-1 lg:block">
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className="pa-step group relative rounded-2xl px-5 py-3.5 transition-colors duration-500 [&.is-active]:bg-cloud"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="w-6 text-sm text-muted tabular-nums transition-colors group-[.is-active]:text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="display text-xl text-muted transition-colors duration-500 group-[.is-active]:text-ink">
                        {s.title}
                      </p>
                      <p className="grid grid-rows-[0fr] text-sm text-ink-soft opacity-0 transition-all duration-500 group-[.is-active]:grid-rows-[1fr] group-[.is-active]:opacity-100">
                        <span className="overflow-hidden">
                          <span className="block pt-1.5">{s.body}</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Panel stage */}
          <div className="relative min-h-0">
            <div className="grid-lines relative mx-auto flex h-full max-h-[76svh] w-full items-center justify-center overflow-hidden rounded-[2rem] bg-cloud lg:aspect-[5/6] lg:h-auto">
              <PanelSvgStage />
              <span className="absolute top-4 left-5 text-xs tracking-[0.1em] text-muted uppercase">
                Step <span className="pa-counter text-ink tabular-nums">01</span> / 06
              </span>
              <span className="absolute top-4 right-5 text-xs tracking-[0.1em] text-muted uppercase">
                LV Switchgear
              </span>
            </div>
          </div>

          {/* Mobile active step */}
          <div className="relative h-32 pr-16 lg:hidden">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="pa-step-m absolute inset-0 translate-y-2 opacity-0 transition-all duration-500 [&.is-active]:translate-y-0 [&.is-active]:opacity-100"
              >
                <p className="display text-xl text-ink">
                  <span className="mr-2 text-sm text-brand tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelSvgStage() {
  // Busbar dropper x positions
  const droppers = [150, 240, 330, 420];
  return (
    <div className="relative h-[92%] [perspective:1600px]">
      {/* Halo when energised */}
      <div className="pa-halo absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,rgb(79_179_255/0.45),transparent_62%)]" />

      <svg viewBox="0 0 600 820" className="relative h-full w-auto overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="pa-steel" x1="0" x2="1">
            <stop offset="0" stopColor="#e9eef4" />
            <stop offset="0.5" stopColor="#f7f9fc" />
            <stop offset="1" stopColor="#dfe6ee" />
          </linearGradient>
          <linearGradient id="pa-copper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0b684" />
            <stop offset="0.45" stopColor="#c77b43" />
            <stop offset="1" stopColor="#8f4f23" />
          </linearGradient>
          <linearGradient id="pa-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1b6fd0" />
            <stop offset="1" stopColor="#0d3a78" />
          </linearGradient>
          <filter id="pa-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Floor shadow */}
        <ellipse cx="300" cy="800" rx="270" ry="16" fill="#0b1526" opacity="0.08" />

        {/* Energy flowing out to the site */}
        <path
          className="pa-energy"
          d="M300 790 C 300 810, 420 812, 600 812"
          fill="none"
          stroke="#4fb3ff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="900"
          filter="url(#pa-glow)"
        />

        {/* 01 Frame */}
        <g className="pa-frame">
          <rect x="54" y="24" width="492" height="748" rx="12" fill="url(#pa-steel)" />
          <rect
            className="pa-outline"
            x="54"
            y="24"
            width="492"
            height="748"
            rx="12"
            fill="none"
            stroke="#b9c6d6"
            strokeWidth="2"
          />
          <rect x="54" y="760" width="492" height="28" rx="4" fill="#1d2a3d" />
          <rect x="70" y="40" width="460" height="704" rx="6" fill="#d8e0ea" />
        </g>

        {/* 02 Mounting plate + DIN rails */}
        <g className="pa-plate">
          <rect x="86" y="56" width="428" height="672" rx="4" fill="#f8fafc" stroke="#dbe3ec" />
          {[358, 476, 626].map((y) => (
            <rect key={y} className="pa-rail" x="104" y={y} width="392" height="8" rx="1.5" fill="#c3ceda" />
          ))}
        </g>

        {/* 03 Busbars */}
        <g>
          {[88, 110, 132].map((y) => (
            <rect
              key={y}
              className="pa-bar"
              x="104"
              y={y}
              width="392"
              height="12"
              rx="2"
              fill="url(#pa-copper)"
            />
          ))}
          {droppers.map((x) => (
            <rect key={x} className="pa-dropper" x={x} y="144" width="10" height="46" fill="url(#pa-copper)" />
          ))}
          {/* insulators */}
          {[128, 472].map((x) => (
            <rect key={x} className="pa-bar" x={x} y="80" width="14" height="72" rx="3" fill="#2a3a52" opacity="0.9" />
          ))}
        </g>

        {/* 04 MCCBs */}
        {droppers.map((x, i) => (
          <g key={x} className="pa-mccb">
            <rect x={x - 32} y="190" width="74" height="98" rx="6" fill="#ffffff" stroke="#cfd8e3" />
            <rect x={x - 32} y="190" width="74" height="16" rx="6" fill={i === 0 ? "#1b6fd0" : "#e3e9f1"} />
            <rect x={x - 6} y="228" width="22" height="34" rx="3" fill="#1d2a3d" />
            <rect x={x - 2} y={i % 2 ? 232 : 244} width="14" height="14" rx="2" fill="#f2f5f9" />
          </g>
        ))}

        {/* 04b MCB rows */}
        {[366, 484].map((rowY) =>
          Array.from({ length: MCB_COLS }).map((_, i) => {
            const x = 110 + i * 27.5;
            return (
              <g key={`${rowY}-${i}`} className="pa-mcb">
                <rect x={x} y={rowY - 34} width="24" height="78" rx="3" fill="#ffffff" stroke="#d3dbe5" />
                <rect x={x + 7} y={rowY - 4} width="10" height="16" rx="2" fill={i % 5 === 0 ? "#1b6fd0" : "#2a3a52"} />
              </g>
            );
          }),
        )}

        {/* 05 Ducts, wires, terminals */}
        <rect className="pa-duct" x="104" y="298" width="392" height="14" rx="2" fill="#aab7c6" />
        <rect className="pa-duct" x="104" y="420" width="392" height="12" rx="2" fill="#c3ceda" />
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 124 + i * 32;
          const color = i % 3 === 0 ? "#1b6fd0" : i % 3 === 1 ? "#1d2a3d" : "#4fb3ff";
          return (
            <path
              key={i}
              className="pa-wire"
              d={`M${x} 530 C ${x} 560, ${x + 14} 590, ${x + 8} 640`}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
        {Array.from({ length: 16 }).map((_, i) => (
          <g key={i} className="pa-term">
            <rect x={112 + i * 24} y="636" width="18" height="46" rx="2" fill="#dfe6ee" stroke="#c7d1dd" />
            <rect x={116 + i * 24} y="642" width="10" height="8" rx="1" fill={i % 4 === 0 ? "#f59e0b" : "#1b6fd0"} />
          </g>
        ))}
        <rect className="pa-duct" x="104" y="696" width="392" height="16" rx="2" fill="#aab7c6" />
      </svg>

      {/* 06 Door (HTML layer so it can swing in 3D) */}
      <div
        className="pa-door absolute inset-y-0 left-1/2 aspect-[600/820] h-full -translate-x-1/2"
        style={{ transformOrigin: "9% 50%", transformStyle: "preserve-3d" }}
      >
        <svg viewBox="0 0 600 820" className="h-full w-full overflow-visible" aria-hidden>
          <g>
            <rect x="60" y="30" width="480" height="734" rx="10" fill="url(#pa-steel)" stroke="#b9c6d6" strokeWidth="2" />
            <rect x="60" y="30" width="480" height="734" rx="10" fill="#ffffff" opacity="0.25" />
            {/* hinges */}
            {[120, 400, 680].map((y) => (
              <rect key={y} x="54" y={y} width="12" height="40" rx="3" fill="#9aa8b8" />
            ))}
            {/* nameplate */}
            <rect x="96" y="66" width="150" height="34" rx="5" fill="#0b1526" />
            <text x="112" y="89" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="600" fill="#fff" letterSpacing="1.5">
              SAFEWAY
            </text>
            <circle cx="232" cy="83" r="4" fill="#4fb3ff" />
            <rect x="380" y="66" width="124" height="34" rx="5" fill="#e3e9f1" />
            <text x="394" y="88" fontFamily="Inter, sans-serif" fontSize="13" fill="#46546a" letterSpacing="1">
              MDB · 2500A
            </text>

            {/* HMI screen */}
            <rect x="96" y="140" width="190" height="130" rx="8" fill="#16243a" />
            <rect className="pa-screen-on" x="104" y="148" width="174" height="114" rx="4" fill="url(#pa-screen)" />
            <g className="pa-screen-on" stroke="#a8dcff" strokeWidth="2" fill="none" opacity="0.9">
              <path d="M116 236 L146 214 L170 226 L204 186 L232 200 L264 170" />
              <path d="M116 170 H176 M116 184 H152" strokeWidth="3" />
            </g>

            {/* Rotary isolator */}
            <rect x="330" y="140" width="174" height="130" rx="10" fill="#1d2a3d" />
            <circle cx="417" cy="205" r="46" fill="#f59e0b" />
            <circle cx="417" cy="205" r="34" fill="#1d2a3d" />
            <text x="346" y="162" fontFamily="Inter, sans-serif" fontSize="11" fill="#9fb0c4">OFF</text>
            <text x="474" y="162" fontFamily="Inter, sans-serif" fontSize="11" fill="#9fb0c4">ON</text>
            <g className="pa-knob" transform="rotate(45 417 205)">
              <rect x="407" y="163" width="20" height="84" rx="10" fill="#e7ecf2" />
              <circle cx="417" cy="172" r="4" fill="#1b6fd0" />
            </g>

            {/* Indicator lamps */}
            {[
              { cx: 130, on: "#22c55e" },
              { cx: 190, on: "#f59e0b" },
              { cx: 250, on: "#ef4444" },
            ].map((l) => (
              <g key={l.cx}>
                <circle cx={l.cx} cy="330" r="18" fill="#2a3a52" />
                <circle className="pa-lamp-on" cx={l.cx} cy="330" r="14" fill={l.on} filter="url(#pa-glow)" />
              </g>
            ))}

            {/* Meters */}
            {[330, 420].map((x) => (
              <g key={x}>
                <rect x={x} y="300" width="80" height="60" rx="6" fill="#ffffff" stroke="#cfd8e3" />
                <path d={`M${x + 14} 344 A 26 26 0 0 1 ${x + 66} 344`} fill="none" stroke="#c3ceda" strokeWidth="3" />
                <path className="pa-screen-on" d={`M${x + 40} 344 L${x + 58} 322`} stroke="#1b6fd0" strokeWidth="3" strokeLinecap="round" />
              </g>
            ))}

            {/* Vents */}
            {Array.from({ length: 7 }).map((_, i) => (
              <rect key={i} x="96" y={420 + i * 16} width="408" height="6" rx="3" fill="#d3dbe5" />
            ))}

            {/* Handle */}
            <rect x="500" y="560" width="16" height="96" rx="8" fill="#1d2a3d" />
            <rect x="96" y="620" width="120" height="70" rx="6" fill="#eef3f8" stroke="#d3dbe5" />
            <path d="M112 640 H198 M112 656 H176 M112 672 H188" stroke="#b9c6d6" strokeWidth="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}
