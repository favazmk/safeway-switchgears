import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CtaBand from "@/components/CtaBand";
import RetailShowcase from "@/components/RetailShowcase";
import ProductStage from "@/components/motion/ProductStage";
import DriftText from "@/components/motion/DriftText";
import { controlPanels, products } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products: Distribution Boards, MCC, PLC & VFD Panels",
  description:
    "Main and sub main distribution boards, final distribution boards, ATS changeover systems, motor control centers, PLC, VFD, pump and fan control panels, capacitor banks and industrial socket panels.",
};

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-28 md:pt-36">
        <div className="container-x grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
          <Reveal>
            <p className="label">LV switchgear & products</p>
            <h1 className="display mt-5 text-[clamp(2.6rem,7.2vw,6.6rem)] leading-[0.94] text-ink">
              A complete range of <span className="text-brand">panels</span>
            </h1>
          </Reveal>
          <Reveal delay={120} className="lg:pb-3">
            <p className="max-w-md text-lg text-ink-soft">
              From main distribution boards to PLC automation, every panel is built with components from
              the world&apos;s leading electrical brands.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-dark">
                Request a quote
                <span className="chip">
                  <Icon name="arrow" className="size-3.5" />
                </span>
              </Link>
              <a href="#range" className="btn btn-ghost">
                Browse the range
              </a>
            </div>
          </Reveal>
        </div>
        <div className="mt-12 px-3 sm:px-5 md:mt-16">
          <ProductStage />
        </div>
      </section>

      {/* Range */}
      <section id="range" className="scroll-mt-24 bg-white py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="label">Product range</p>
              <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,4.6vw,4rem)] leading-[1] text-ink">
                Power distribution & control
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-sm text-ink-soft">
                Can&apos;t see your exact configuration? We build to your drawings and specifications.
              </p>
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (
              <Reveal
                as="li"
                key={p.code}
                delay={(i % 4) * 70}
                className="group flex scroll-mt-28 flex-col rounded-[1.75rem] bg-cloud p-2 transition-colors duration-500 hover:bg-mist"
              >
                <div id={p.code.toLowerCase()} className="relative aspect-square overflow-hidden rounded-[1.4rem] bg-white">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
                    className="object-contain p-5 transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-cloud px-3 py-1 text-xs font-medium text-ink-soft">
                    {p.code}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-4 pt-4 pb-4">
                  <h3 className="display text-xl leading-tight text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{p.detail}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-full bg-white px-2.5 py-1 text-xs text-ink-soft">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <DriftText text="MCC · PLC · VFD · Pump · Fan · RO ·" className="text-[clamp(4rem,13vw,12rem)] text-mist" />

      {/* Control panels */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="label">Control panel solutions</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.6vw,4rem)] leading-[1] text-ink">
              Automation that keeps systems running
            </h2>
            <p className="mt-6 max-w-md text-lg text-ink-soft">
              PLC-operated and conventional control panels for transfer pumps, booster pumps, swimming
              pools, fan controls, AHU, FAHU and VFD applications.
            </p>
          </Reveal>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {controlPanels.map((c, i) => (
              <Reveal
                as="li"
                key={c.title}
                delay={i * 70}
                className="group flex aspect-square flex-col justify-between rounded-[1.5rem] bg-cloud p-5 transition-colors duration-500 hover:bg-brand"
              >
                <span className="grid size-12 place-items-center rounded-full bg-white text-brand transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
                  <Icon name={c.icon} className="size-6" />
                </span>
                <p className="display text-lg leading-tight text-ink transition-colors duration-500 group-hover:text-white">
                  {c.title}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="h-3 sm:h-5" />
      <RetailShowcase />
      <CtaBand image="/images/cta/products.jpg" />
    </>
  );
}
