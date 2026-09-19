import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CtaBand from "@/components/CtaBand";
import ParallaxImage from "@/components/motion/ParallaxImage";
import CapabilityGauges from "@/components/solutions/CapabilityGauges";
import SeparationExplorer from "@/components/solutions/SeparationExplorer";
import EnclosureExplorer from "@/components/solutions/EnclosureExplorer";
import ProcessStack from "@/components/solutions/ProcessStack";
import { specs } from "@/lib/site";

export const metadata: Metadata = {
  title: "LV Switchgear & Control Gear Solutions",
  description:
    "IEC 61439 LV switchgear up to 2500A and 65kA, IP31–IP65, Form 2b to Form 4b Type 6, approved by TAQA (ADDC & AADC), DEWA and FEWA. Panel building in Abu Dhabi.",
};

const approvals = ["IEC 61439-1 & 2", "IEC 61921", "TAQA", "ADDC", "AADC", "DEWA", "FEWA"];

export default function SolutionsPage() {
  return (
    <>
      {/* Split hero */}
      <section className="bg-white pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-12">
          <div className="flex flex-col justify-between gap-10 lg:py-6">
            <Reveal>
              <p className="label">LV switchgear & control gear solutions</p>
              <h1 className="display mt-5 text-[clamp(2.5rem,6.4vw,6rem)] leading-[0.95] text-ink">
                Engineered for the <span className="text-brand">demands</span> of every site
              </h1>
              <p className="mt-6 max-w-lg text-lg text-ink-soft">
                Low-voltage switchgear and control gear assemblies built to IEC 61439, configured around
                your ratings, separation, enclosure and cable entry.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-dark">
                  Discuss your project
                  <span className="chip">
                    <Icon name="arrow" className="size-3.5" />
                  </span>
                </Link>
                <a href="#specs" className="btn btn-ghost">
                  Full specifications
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="text-sm text-muted">Standards & authorities</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {approvals.map((a) => (
                  <li key={a} className="rounded-full bg-cloud px-3.5 py-2 text-sm font-medium text-ink">
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={80} className="relative">
            <ParallaxImage
              src="/images/solutions/hero.jpg"
              alt="Installed switchgear line-up in an electrical room"
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/5] rounded-[1.75rem] sm:aspect-[16/12] md:rounded-[2rem] lg:aspect-auto lg:h-full lg:min-h-[38rem]"
            />
            <div className="absolute right-4 bottom-4 left-4 flex flex-col gap-3 rounded-[1.4rem] bg-white/90 p-4 backdrop-blur-md sm:right-auto sm:max-w-xs sm:p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Icon name="shield" className="size-5" />
                </span>
                <p className="text-sm leading-snug text-ink">
                  Form 2b to <strong className="font-semibold">Form 4b Type 6</strong> internal separation
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capability gauges */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="container-x">
          <Reveal className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label">Ratings</p>
              <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,4.4vw,3.8rem)] leading-[1] text-ink">
                Performance you can specify
              </h2>
            </div>
            <p className="max-w-sm text-ink-soft">The key ratings behind every Safeway assembly.</p>
          </Reveal>
          <CapabilityGauges />
        </div>
      </section>

      {/* Forms of separation */}
      <section className="bg-cloud py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mb-10 max-w-2xl md:mb-14">
            <p className="label">Forms of separation</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.8rem)] leading-[1] text-ink">
              See how each form protects people and power
            </h2>
          </Reveal>
          <div className="rounded-[2rem] bg-white p-5 sm:p-8 md:p-12">
            <SeparationExplorer />
          </div>
        </div>
      </section>

      {/* Enclosures */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label">Enclosures</p>
              <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,4.4vw,3.8rem)] leading-[1] text-ink">
                The right enclosure for the environment
              </h2>
            </div>
            <p className="max-w-sm text-ink-soft">Floor or wall mounted, with top and bottom cable entry and front or rear access on request.</p>
          </Reveal>
          <EnclosureExplorer />
        </div>
      </section>

      {/* Process */}
      <section className="bg-cloud py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mb-10 max-w-2xl md:mb-14">
            <p className="label">How we work</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.8rem)] leading-[1] text-ink">
              From design to commissioning
            </h2>
          </Reveal>
          <ProcessStack />
        </div>
      </section>

      {/* Specs list */}
      <section id="specs" className="scroll-mt-24 bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label">Specifications</p>
              <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,4.4vw,3.8rem)] leading-[1] text-ink">
                Everything at a glance
              </h2>
            </div>
            <Link href="/contact" className="btn btn-ghost self-start md:self-auto">
              Request a quote
              <span className="chip">
                <Icon name="arrow" className="size-3.5" />
              </span>
            </Link>
          </Reveal>

          <ul className="mt-12 border-t border-line">
            {specs.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={30}
                className="group grid gap-4 border-b border-line py-6 transition-colors duration-500 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.6fr)_auto] md:items-center md:gap-6 md:px-4 md:hover:bg-cloud"
              >
                <span className="hidden text-sm text-muted tabular-nums md:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display flex items-center gap-3 text-xl text-ink md:text-2xl">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cloud text-brand md:hidden">
                    <Icon name={s.icon} className="size-5" />
                  </span>
                  {s.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <li key={item} className="rounded-full border border-line bg-white px-3 py-1.5 text-sm text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="hidden size-11 place-items-center rounded-full bg-cloud text-brand transition-all duration-500 group-hover:bg-brand group-hover:text-white md:grid">
                  <Icon name={s.icon} className="size-5" />
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand image="/images/cta/solutions.jpg" />
    </>
  );
}
