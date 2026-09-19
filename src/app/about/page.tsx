import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CtaBand from "@/components/CtaBand";
import FillText from "@/components/motion/FillText";
import DriftText from "@/components/motion/DriftText";
import { brands, mission } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Safeway Electric Switchgear Trading LLC builds on the Safeway Technical Trading legacy established in 1998, specialising in LV switchgear panel building in Abu Dhabi, UAE.",
};

const milestones = [
  {
    year: "1998",
    title: "Safeway Technical Trading Co. LLC is founded",
    body: "The Safeway name is established in Abu Dhabi, supplying electrical products to the UAE market.",
  },
  {
    year: "28 years",
    title: "A name built on trust",
    body: "Quality, trust and on-time delivery for contractors and industries across the UAE and the Middle East.",
  },
  {
    year: "Today",
    title: "Safeway Electric Switchgear Trading LLC",
    body: "A dedicated panel building and switchgear trading division focused on control panels and power distribution.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Safeway"
        title={
          <>
            Quality, trust & <span className="text-brand">on-time delivery</span>
          </>
        }
        intro="For over 28 years, the Safeway name has stood for dependable electrical solutions across the UAE and the Middle East."
        image="/images/about/workshop.jpg"
        imageAlt="Technicians assembling switchgear panels in the Safeway workshop"
        chips={["Est. 1998", "Musaffah, Abu Dhabi", "Panel building & trading"]}
      />

      {/* Story */}
      <section className="bg-white py-20 md:py-32">
        <div className="container-x grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <Reveal>
            <p className="label">Our story</p>
          </Reveal>
          <div>
            <FillText
              as="p"
              className="display text-[clamp(1.7rem,3.8vw,3.4rem)] leading-[1.08]"
              segments={[
                "Building on the legacy of Safeway Technical Trading Company LLC, we were formed to specialise in",
                { icon: "shield" },
                "safe and reliable switchgear panel building",
                { img: "/images/about/technician.jpg", alt: "Technician wiring breakers" },
                "for the UAE.",
              ]}
            />
            <div className="mt-12 grid gap-8 text-ink-soft md:grid-cols-2 md:gap-12">
              <Reveal>
                <p>
                  As a dedicated panel building and switchgear trading division, we focus on delivering a
                  complete range of control panels, power distribution solutions, and accessories from
                  leading international brands.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <p>
                  We combine 28+ years of market experience with a specialised team to provide technical
                  support, fast deliveries, and solutions tailored for commercial, industrial, and
                  residential projects.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <DriftText text="Quality products · Reliable service · Customer satisfaction ·" className="text-[clamp(4rem,12vw,11rem)] text-mist" />

      {/* Timeline */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <ol className="grid gap-4 md:grid-cols-3">
            {milestones.map((m, i) => (
              <Reveal
                as="li"
                key={m.year}
                delay={i * 110}
                className="relative flex flex-col justify-between gap-16 rounded-[1.75rem] bg-cloud p-7 md:min-h-[22rem] md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted tabular-nums">0{i + 1}</span>
                  <span className="relative h-px flex-1 overflow-hidden bg-line mx-4">
                    <span className="live-wire absolute inset-0" style={{ animationDelay: `${i * 0.6}s` }} />
                  </span>
                  <Icon name={i === 2 ? "bolt" : "clock"} className="size-5 text-brand" />
                </div>
                <div>
                  <p className="display text-[clamp(2.6rem,5vw,4.2rem)] leading-none text-brand">{m.year}</p>
                  <h2 className="display mt-4 text-2xl leading-tight text-ink">{m.title}</h2>
                  <p className="mt-2 text-ink-soft">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Vision & Mission bento */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="container-x">
          <Reveal className="mb-10 max-w-2xl md:mb-14">
            <p className="label">Vision & mission</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.6vw,4rem)] leading-[1] text-ink">
              Powering the future of UAE infrastructure
            </h2>
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-12">
            <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-brand p-7 text-white md:p-10 lg:col-span-7 lg:row-span-2">
              <div className="grid-lines-light absolute inset-0" aria-hidden />
              <div className="absolute -right-24 -bottom-24 size-80 rounded-full bg-volt/40 blur-3xl" aria-hidden />
              <div className="relative flex h-full flex-col justify-between gap-16">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-white/15">
                    <Icon name="eye" className="size-5" />
                  </span>
                  <span className="text-sm tracking-[0.08em] text-white/75 uppercase">Our vision</span>
                </div>
                <div>
                  <p className="display text-[clamp(1.8rem,3.4vw,3.1rem)] leading-[1.05]">
                    To be the UAE&apos;s preferred specialist for electrical switchgear solutions,
                    recognised for safety, quality, and technical expertise.
                  </p>
                  <p className="mt-6 max-w-lg text-white/75">
                    We aim to power the future of infrastructure with dependable products and service that
                    exceed expectations.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100} className="relative min-h-[18rem] overflow-hidden rounded-[1.75rem] lg:col-span-5">
              <Image
                src="/images/about/quality.jpg"
                alt="Engineer inspecting a finished switchgear panel"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
              {mission.map((m, i) => (
                <Reveal key={m.title} delay={i * 80} className="rounded-[1.75rem] bg-cloud p-6">
                  <span className="text-sm text-brand tabular-nums">0{i + 1}</span>
                  <h3 className="display mt-3 text-xl text-ink">{m.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{m.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands grid */}
      <section className="bg-cloud py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal className="max-w-2xl">
              <p className="label">Our trusted brands</p>
              <h2 className="display mt-4 text-[clamp(2rem,4.6vw,4rem)] leading-[1] text-ink">
                Partnered with global leaders
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Link href="/products" className="btn btn-ghost bg-white">
                View products
                <span className="chip">
                  <Icon name="arrow" className="size-3.5" />
                </span>
              </Link>
            </Reveal>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((b, i) => (
              <Reveal
                as="li"
                key={b.slug}
                delay={(i % 6) * 50}
                className="grid h-24 place-items-center rounded-2xl bg-white px-5 transition-transform duration-500 hover:-translate-y-1 md:h-28"
              >
                <Image
                  src={`/images/brands/${b.slug}.png`}
                  alt={b.name}
                  width={220}
                  height={120}
                  className="max-h-11 w-auto object-contain"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="h-3 bg-white sm:h-5" />
      <CtaBand image="/images/cta/about.jpg" />
    </>
  );
}
