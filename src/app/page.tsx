import Link from "next/link";
import ScrollHero from "@/components/ScrollHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import BrandMarquee from "@/components/BrandMarquee";
import SectorCards from "@/components/SectorCards";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import FillText from "@/components/motion/FillText";
import PanelAssembly from "@/components/motion/PanelAssembly";
import SolutionsRail from "@/components/motion/SolutionsRail";
import PowerLine from "@/components/motion/PowerLine";
import Counter from "@/components/motion/Counter";
import { brands, company, milestones } from "@/lib/site";

const stats = [
  { value: 28, suffix: "+", label: "Years of the Safeway name" },
  { value: 2500, suffix: "A", label: "Panel ratings up to" },
  { value: 65, suffix: "kA", label: "Short-circuit rating" },
  { value: brands.length, suffix: "", label: "International brands" },
];

export default function Home() {
  return (
    <>
      <ScrollHero />

      {/* Intro statement */}
      <section className="relative bg-white pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-16">
            <Reveal>
              <p className="label">About Safeway</p>
            </Reveal>
            <div>
              <FillText
                as="h2"
                className="display text-[clamp(1.9rem,4.6vw,4.4rem)] leading-[1.05]"
                segments={[
                  "Since 1998 the Safeway name",
                  { img: "/images/home/pill-skyline.jpg", alt: "Abu Dhabi skyline" },
                  "has stood for quality, trust and on-time delivery. Today we build",
                  { icon: "bolt" },
                  "safe, reliable switchgear",
                  { img: "/images/home/pill-copper.jpg", alt: "Copper busbars" },
                  "for projects across the UAE.",
                ]}
              />
              <Reveal delay={100} className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/about" className="btn btn-dark">
                  Our story
                  <span className="chip">
                    <Icon name="arrow" className="size-3.5" />
                  </span>
                </Link>
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Talk to our team
                </a>
              </Reveal>
            </div>
          </div>

          <ul className="mt-16 grid grid-cols-2 border-t border-line md:mt-24 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                as="li"
                key={s.label}
                delay={i * 80}
                className={`border-line py-7 pr-4 md:py-9 ${i % 2 === 0 ? "border-r" : ""} lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0 ${
                  i < 2 ? "border-b lg:border-b-0" : ""
                } ${i % 2 === 1 ? "pl-4" : ""}`}
              >
                <p className="display text-[clamp(2.4rem,5vw,4rem)] leading-none text-ink">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm text-ink-soft">{s.label}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <PanelAssembly />

      <SolutionsRail />

      <PowerLine
        eyebrow="Why Safeway"
        title={
          <>
            Reliability at every <span className="text-brand">milestone</span>
          </>
        }
        intro="From the first drawing to long after handover, every stage is built around safety, quality and on-time delivery."
        items={milestones}
      />

      {/* Sectors */}
      <section className="bg-cloud py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="label">Sectors</p>
              <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,4.6vw,4rem)] leading-[1] text-ink">
                Solutions tailored to every project
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-sm text-ink-soft">
                Commercial, industrial, residential and infrastructure projects, from single boards to
                complete distribution systems.
              </p>
            </Reveal>
          </div>
          <div className="mt-12">
            <SectorCards />
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="label">Trusted brands</p>
            <h2 className="display mt-4 max-w-xl text-[clamp(2rem,4.2vw,3.6rem)] leading-[1] text-ink">
              Built with components from global leaders
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/products" className="btn btn-ghost">
              Components & accessories
              <span className="chip">
                <Icon name="arrow" className="size-3.5" />
              </span>
            </Link>
          </Reveal>
        </div>
        <BrandMarquee />
      </section>

      {/* FAQ */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="label">FAQ</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.2vw,3.6rem)] leading-[1] text-ink">
              Clear answers before your project begins
            </h2>
            <p className="mt-5 max-w-sm text-ink-soft">
              Can&apos;t find what you need? Our technical team is one message away.
            </p>
            <Link href="/contact" className="btn btn-primary mt-8">
              Ask a question
              <span className="chip">
                <Icon name="arrow" className="size-3.5" />
              </span>
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <Faq />
          </Reveal>
        </div>
      </section>

      <CtaBand image="/images/cta/home.jpg" />
    </>
  );
}
