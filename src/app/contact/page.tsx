import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import EnquiryForm from "@/components/EnquiryForm";
import { company, locations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Safeway Electric Switchgear Trading LLC, Musaffah Industrial M13, Abu Dhabi. Call +971 2 876 4882 or email switchgear@safewaytechnical.com.",
};

export default function ContactPage() {
  const main = locations[0];
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-x">
          <Reveal>
            <p className="label">Contact</p>
            <h1 className="display mt-5 max-w-5xl text-[clamp(2.6rem,7.2vw,6.6rem)] leading-[0.94] text-ink">
              Let&apos;s power your <span className="text-brand">next project</span>
            </h1>
          </Reveal>

          <div className="mt-12 grid gap-3 md:mt-16 md:grid-cols-3">
            <Reveal>
              <a
                href={company.phones[0].href}
                className="group flex h-full flex-col justify-between gap-10 rounded-[1.75rem] bg-cloud p-7 transition-colors duration-500 hover:bg-mist"
              >
                <span className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-white text-brand">
                    <Icon name="phone" className="size-5" />
                  </span>
                  <Icon name="arrow" className="size-5 -rotate-45 text-muted transition group-hover:rotate-0 group-hover:text-brand" />
                </span>
                <span>
                  <span className="block text-sm text-muted">Call us</span>
                  <span className="display mt-1 block text-2xl text-ink">{company.phones[0].label}</span>
                  <span className="block text-ink-soft">{company.phones[1].label}</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={80}>
              <a
                href={`mailto:${company.email}`}
                className="group flex h-full flex-col justify-between gap-10 rounded-[1.75rem] bg-cloud p-7 transition-colors duration-500 hover:bg-mist"
              >
                <span className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-white text-brand">
                    <Icon name="mail" className="size-5" />
                  </span>
                  <Icon name="arrow" className="size-5 -rotate-45 text-muted transition group-hover:rotate-0 group-hover:text-brand" />
                </span>
                <span>
                  <span className="block text-sm text-muted">Email us</span>
                  <span className="display mt-1 block text-xl text-ink [overflow-wrap:anywhere] lg:text-2xl">
                    {company.email}
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={160}>
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[1.75rem] bg-brand p-7 text-white"
              >
                <span className="grid-lines-light absolute inset-0" aria-hidden />
                <span className="relative flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full bg-white/15">
                    <Icon name="phone" className="size-5" />
                  </span>
                  <Icon name="arrow" className="size-5 -rotate-45 text-white/70 transition group-hover:rotate-0 group-hover:text-white" />
                </span>
                <span className="relative">
                  <span className="block text-sm text-white/70">Fastest response</span>
                  <span className="display mt-1 block text-2xl">Chat on WhatsApp</span>
                  <span className="block text-white/75">Share drawings & BOQs instantly</span>
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Form + main office */}
      <section className="bg-cloud py-20 md:py-28">
        <div className="container-x grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <Reveal className="rounded-[1.75rem] bg-white p-6 md:p-10">
            <p className="label">Request a quote</p>
            <h2 className="display mt-4 text-[clamp(2rem,4vw,3.4rem)] leading-[1] text-ink">Tell us what you need</h2>
            <p className="mt-3 mb-8 max-w-md text-ink-soft">
              Share your requirements and our technical team will get back to you with the right solution.
            </p>
            <EnquiryForm />
          </Reveal>

          <Reveal delay={120} className="flex flex-col overflow-hidden rounded-[1.75rem] bg-white">
            <iframe
              title="Safeway Electric Switchgear location map"
              src={`https://maps.google.com/maps?q=${main.lat},${main.lng}&z=16&output=embed`}
              className="aspect-[4/3] w-full border-0 grayscale-[0.3] lg:aspect-auto lg:flex-1"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-6 md:p-8">
              <p className="label">{main.kind}</p>
              <h3 className="display mt-3 text-2xl text-ink md:text-3xl">{main.name}</h3>
              <ul className="mt-5 space-y-3 text-ink-soft">
                <li className="flex gap-3">
                  <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-brand" />
                  <span>{main.address.join(", ")}</span>
                </li>
                <li className="flex gap-3">
                  <Icon name="phone" className="mt-0.5 size-5 shrink-0 text-brand" />
                  <span>
                    {main.phones.map((p, i) => (
                      <a key={p.href} href={p.href} className="hover:text-brand">
                        {i > 0 && ", "}
                        {p.label}
                      </a>
                    ))}
                  </span>
                </li>
              </ul>
              <a href={main.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-7">
                Get directions
                <span className="chip">
                  <Icon name="arrow" className="size-3.5" />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Retail division */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="label">Our retail division</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.6vw,4rem)] leading-[1] text-ink">
              Safeway Technical Trading Company
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Visit our retail showrooms in Musaffah for electrical products and accessories.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {locations.slice(1).map((l, i) => (
              <Reveal key={l.name} delay={i * 100} className="overflow-hidden rounded-[1.75rem] bg-cloud p-2">
                <iframe
                  title={`${l.name} map`}
                  src={`https://maps.google.com/maps?q=${l.lat},${l.lng}&z=16&output=embed`}
                  className="aspect-[16/9] w-full rounded-[1.4rem] border-0 grayscale-[0.3]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="p-5 md:p-6">
                  <p className="label">{l.kind}</p>
                  <h3 className="display mt-3 text-2xl text-ink">{l.name}</h3>
                  <p className="mt-4 flex gap-3 text-ink-soft">
                    <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-brand" />
                    {l.address.join(", ")}
                  </p>
                  <p className="mt-2 flex gap-3 text-ink-soft">
                    <Icon name="phone" className="mt-0.5 size-5 shrink-0 text-brand" />
                    <span>
                      {l.phones.map((p, j) => (
                        <a key={p.href} href={p.href} className="hover:text-brand">
                          {j > 0 && ", "}
                          {p.label}
                        </a>
                      ))}
                    </span>
                  </p>
                  <a href={l.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6 bg-white">
                    Get directions
                    <span className="chip">
                      <Icon name="arrow" className="size-3.5" />
                    </span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
