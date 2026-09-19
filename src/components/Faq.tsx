"use client";

import { useState } from "react";
import { faqs } from "@/lib/site";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <ul className="divide-y divide-line border-y border-line">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                className="flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
              >
                <span className={`text-lg transition-colors md:text-xl ${isOpen ? "text-ink" : "text-ink-soft"}`}>
                  {f.q}
                </span>
                <span
                  className={`relative grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                    isOpen ? "bg-brand text-white" : "bg-cloud text-ink"
                  }`}
                  aria-hidden
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span
                    className={`absolute h-3.5 w-px bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={`faq-${i}`}
              className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <p className="overflow-hidden pr-14 text-ink-soft">
                <span className="block pb-6">{f.a}</span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
