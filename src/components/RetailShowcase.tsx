import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { retail } from "@/lib/site";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function RetailShowcase() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-navy py-16 text-white md:rounded-[2rem] md:py-24">
        <div className="grid-lines-light absolute inset-0" aria-hidden />
        <div
          className="absolute -bottom-40 -left-20 size-[36rem] rounded-full bg-brand/35 blur-[120px]"
          aria-hidden
        />

        <div className="container-x relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium">
                <span className="size-1.5 rounded-full bg-volt" />
                Our retail division · {retail.label}
              </p>
              <h2 className="display mt-5 max-w-3xl text-[clamp(2rem,4.6vw,4rem)] leading-[1]">
                Every electrical product, <span className="text-volt">ready in stock</span>
              </h2>
              <p className="mt-5 max-w-xl text-white/65">
                Need components, cables or accessories on their own? Safeway Technical Trading supplies
                trusted brands from stock across Abu Dhabi. Browse the full catalogue online.
              </p>
            </Reveal>
            <Reveal delay={100} className="shrink-0">
              <a href={retail.catalogue} {...ext} className="btn btn-light">
                Shop the catalogue
                <span className="chip">
                  <Icon name="arrow" className="size-3.5 -rotate-45" />
                </span>
              </a>
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/10 grid-cols-2 lg:grid-cols-4">
            {retail.categories.map((c, i) => (
              <li key={c.slug} className="bg-navy">
                <a
                  href={c.href}
                  {...ext}
                  className="group flex h-full items-center justify-between gap-3 p-4 transition-colors duration-300 hover:bg-white/[0.06] md:p-6"
                >
                  <span>
                    <span className="block text-xs text-white/40 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1.5 block text-sm leading-snug text-white/90 md:text-base">{c.name}</span>
                  </span>
                  <Icon
                    name="arrow"
                    className="size-4 shrink-0 -rotate-45 text-white/40 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-volt"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
