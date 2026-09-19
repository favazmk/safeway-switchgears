"use client";

import Image from "next/image";
import { useState } from "react";

const ENCLOSURES = [
  {
    id: "steel",
    name: "Electrogalvanized sheet steel",
    use: "Indoor plant rooms, electrical rooms and buildings",
    image: "/images/solutions/enclosure-steel.jpg",
  },
  {
    id: "grp",
    name: "Glass reinforced polyester (GRP)",
    use: "Outdoor installations exposed to sun, sand and humidity",
    image: "/images/solutions/enclosure-grp.jpg",
  },
  {
    id: "stainless",
    name: "Stainless steel & aluminium",
    use: "Single and double wall builds for demanding and coastal environments",
    image: "/images/solutions/enclosure-stainless.jpg",
  },
  {
    id: "atex",
    name: "Explosion-proof ATEX rated",
    use: "Hazardous areas where flammable gases or dust may be present",
    image: "/images/solutions/enclosure-atex.jpg",
  },
];

export default function EnclosureExplorer() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
      <ol className="order-2 flex flex-col gap-2 lg:order-1">
        {ENCLOSURES.map((e, i) => {
          const isActive = active === i;
          return (
            <li key={e.id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-pressed={isActive}
                className={`group flex w-full items-start gap-4 rounded-[1.4rem] p-5 text-left transition-colors duration-500 md:p-6 ${
                  isActive ? "bg-navy text-white" : "bg-cloud text-ink hover:bg-mist"
                }`}
              >
                <span className={`mt-1 text-sm tabular-nums ${isActive ? "text-volt" : "text-muted"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="display block text-xl leading-tight md:text-2xl">{e.name}</span>
                  <span className={`mt-1.5 block text-sm ${isActive ? "text-white/70" : "text-ink-soft"}`}>{e.use}</span>
                </span>
                <span
                  className={`mt-1 grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500 ${
                    isActive ? "rotate-0 bg-white text-navy" : "-rotate-45 bg-white text-ink"
                  }`}
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 12h14m-5-5 5 5-5 5" />
                  </svg>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-cloud lg:order-2 lg:aspect-auto lg:min-h-[30rem]">
        {ENCLOSURES.map((e, i) => (
          <Image
            key={e.id}
            src={e.image}
            alt={e.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`object-cover transition-[opacity,transform] duration-700 ease-out-expo ${
              active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/70 to-transparent p-5 pt-16 sm:p-6 sm:pt-20">
          <p className="text-sm text-white/90">
            <span className="mr-2 rounded-full bg-white/15 px-2.5 py-1 text-xs backdrop-blur">Enclosure</span>
            {ENCLOSURES[active].name}
          </p>
        </div>
      </div>
    </div>
  );
}
