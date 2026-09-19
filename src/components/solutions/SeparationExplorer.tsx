"use client";

import { useState } from "react";

const FORMS = [
  {
    id: "2b",
    label: "Form 2b",
    title: "Busbars separated",
    body: "Busbars are separated from the functional units, and the terminals for external conductors are separated from the busbars.",
    points: ["Busbar chamber isolated", "Terminals separated from busbars", "Economical, compact assemblies"],
  },
  {
    id: "3b",
    label: "Form 3b",
    title: "Functional units separated",
    body: "Adds separation between each functional unit, with terminals separated from the functional units and from the busbars.",
    points: ["Each unit in its own compartment", "Work on one circuit, others stay live", "Terminals away from busbars"],
  },
  {
    id: "4b",
    label: "Form 4b Type 6",
    title: "Full compartmentalisation",
    body: "Every functional unit and its outgoing terminals sit in their own separate compartments, with rigid barriers around the busbars. Our highest level of internal separation.",
    points: ["Separate terminal compartment per unit", "Rigid barriers around busbars", "Maximum safety & service continuity"],
  },
] as const;

type FormId = (typeof FORMS)[number]["id"];

/** Interactive diagram showing how internal separation changes between forms. */
export default function SeparationExplorer() {
  const [form, setForm] = useState<FormId>("4b");
  const active = FORMS.find((f) => f.id === form)!;
  const level = form === "2b" ? 1 : form === "3b" ? 2 : 3;

  const on = (min: number) => (level >= min ? 1 : 0);
  const units = [0, 1, 2, 3];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
      <div>
        <div role="tablist" aria-label="Forms of separation" className="inline-flex flex-wrap gap-1 rounded-full bg-cloud p-1">
          {FORMS.map((f) => (
            <button
              key={f.id}
              role="tab"
              type="button"
              aria-selected={form === f.id}
              aria-controls="form-panel"
              onClick={() => setForm(f.id)}
              className={`rounded-full px-4 py-2.5 text-sm transition-all duration-300 sm:px-5 ${
                form === f.id ? "bg-brand text-white shadow-[0_8px_20px_-8px_rgb(27_111_208/0.7)]" : "text-ink-soft hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div id="form-panel" role="tabpanel" className="mt-8 min-h-[15rem]" key={form}>
          <h3 className="display animate-[fadeUp_.6s_var(--ease-out-expo)_both] text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.05] text-ink">
            {active.title}
          </h3>
          <p className="mt-4 max-w-lg animate-[fadeUp_.6s_.06s_var(--ease-out-expo)_both] text-ink-soft">{active.body}</p>
          <ul className="mt-6 space-y-2.5">
            {active.points.map((p, i) => (
              <li
                key={p}
                className="flex animate-[fadeUp_.6s_var(--ease-out-expo)_both] items-center gap-3 text-ink"
                style={{ animationDelay: `${0.12 + i * 0.06}s` }}
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-mist text-brand">
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Diagram */}
      <div className="grid-lines relative rounded-[1.75rem] bg-cloud p-5 sm:p-8">
        <svg viewBox="0 0 420 460" className="mx-auto block h-auto w-full max-w-[26rem]" role="img" aria-label={`${active.label} internal separation diagram`}>
          {/* cabinet */}
          <rect x="10" y="10" width="400" height="440" rx="14" fill="#fff" stroke="#c9d4e1" strokeWidth="2" />

          {/* busbar chamber */}
          <rect x="24" y="24" width="372" height="70" rx="8" fill="#f6e7da" />
          {[44, 58, 72].map((y) => (
            <rect key={y} x="44" y={y} width="332" height="7" rx="2" fill="#c77b43" />
          ))}
          <text x="34" y="89" fontSize="10" fill="#8f4f23" fontFamily="Inter, sans-serif">BUSBARS</text>

          {/* functional units */}
          {units.map((u) => {
            const y = 110 + u * 82;
            return (
              <g key={u}>
                <rect
                  x="24"
                  y={y}
                  width="250"
                  height="72"
                  rx="8"
                  fill={level >= 2 ? "#e6f0fb" : "#eef3f8"}
                  style={{ transition: "fill .5s" }}
                />
                <rect x="44" y={y + 16} width="46" height="40" rx="5" fill="#fff" stroke="#c9d4e1" />
                <rect x="60" y={y + 26} width="14" height="20" rx="2" fill="#1d2a3d" />
                <rect x="104" y={y + 22} width="150" height="8" rx="4" fill="#d3dbe5" />
                <rect x="104" y={y + 40} width="100" height="8" rx="4" fill="#d3dbe5" />
                {/* terminals */}
                <rect
                  x="290"
                  y={y}
                  width="106"
                  height="72"
                  rx="8"
                  fill={level >= 3 ? "#dbeafb" : "#f4f7fb"}
                  style={{ transition: "fill .5s" }}
                />
                {[0, 1, 2, 3].map((t) => (
                  <rect key={t} x={306 + t * 20} y={y + 24} width="12" height="24" rx="2" fill={t % 2 ? "#1b6fd0" : "#9aa8b8"} />
                ))}
              </g>
            );
          })}
          <text x="300" y="448" fontSize="10" fill="#8793a5" fontFamily="Inter, sans-serif">TERMINALS</text>

          {/* Partitions (animated in by form) */}
          <g stroke="#1b6fd0" strokeWidth="4" strokeLinecap="round" style={{ transition: "opacity .5s" }}>
            {/* busbars ↔ units & terminals (2b+) */}
            <line x1="20" y1="102" x2="400" y2="102" style={{ opacity: on(1), transition: "opacity .5s" }} />
            {/* units ↔ units (3b+) */}
            {[1, 2, 3].map((u) => (
              <line
                key={u}
                x1="20"
                y1={106 + u * 82 - 5}
                x2="278"
                y2={106 + u * 82 - 5}
                style={{ opacity: on(2), transition: "opacity .5s", transitionDelay: `${u * 0.07}s` }}
              />
            ))}
            {/* units ↔ terminals column (3b+) */}
            <line x1="282" y1="106" x2="282" y2="442" style={{ opacity: on(2), transition: "opacity .5s" }} />
            {/* terminals ↔ terminals (4b) */}
            {[1, 2, 3].map((u) => (
              <line
                key={`t${u}`}
                x1="286"
                y1={106 + u * 82 - 5}
                x2="400"
                y2={106 + u * 82 - 5}
                style={{ opacity: on(3), transition: "opacity .5s", transitionDelay: `${0.15 + u * 0.07}s` }}
              />
            ))}
          </g>
        </svg>

        <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-ink-soft">
          <li className="flex items-center gap-2">
            <span className="h-1 w-5 rounded bg-brand" /> Separation barrier
          </li>
          <li className="flex items-center gap-2">
            <span className="size-3 rounded bg-[#e6f0fb] ring-1 ring-line" /> Separated compartment
          </li>
        </ul>
      </div>
    </div>
  );
}
