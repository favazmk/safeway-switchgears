import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import { company, locations, nav } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-navy text-white">
        <div className="grid-lines-light absolute inset-0" aria-hidden />
        <div
          className="absolute -top-40 right-0 size-[40rem] rounded-full bg-brand/40 blur-[120px]"
          aria-hidden
        />

        <div className="container-x relative pt-16 md:pt-20">
          <div className="flex flex-col gap-10 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="display text-4xl leading-[1.02] md:text-5xl">
                Powering reliability, <span className="text-volt">distributing trust.</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-light">
                Get a quote
                <span className="chip">
                  <Icon name="arrow" className="size-3.5" />
                </span>
              </Link>
              <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                WhatsApp us
              </a>
            </div>
          </div>

          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.7fr_1fr_1.4fr]">
            <div>
              <Image
                src="/images/logo-white.png"
                alt="Safeway Electric Switchgear Trading LLC"
                width={650}
                height={665}
                className="h-20 w-auto"
              />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
                Building on the Safeway legacy since {company.founded}. LV switchgear and control
                panel solutions for the UAE and the Middle East.
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.12em] text-white/40 uppercase">Pages</p>
              <ul className="mt-4 space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-white/75 transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs tracking-[0.12em] text-white/40 uppercase">Contact</p>
              <ul className="mt-4 space-y-2.5 text-white/75">
                {company.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="transition hover:text-white">
                      {p.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${company.email}`} className="[overflow-wrap:anywhere] transition hover:text-white">
                    {company.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs tracking-[0.12em] text-white/40 uppercase">Locations</p>
              <ul className="mt-4 space-y-4">
                {locations.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block text-sm"
                    >
                      <span className="block text-white/90">{l.kind}</span>
                      <span className="block text-white/50 transition group-hover:text-white">
                        {l.address.join(", ")}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Giant wordmark. pb keeps the "y" descender inside the overflow-hidden box.
            background-clip:text only fills glyphs inside the span's box, and the
            negative tracking ends that box ~0.08em short of the "y" ink, chopping
            its right arm; the padding/negative-margin pair covers that overhang. */}
        <div className="relative overflow-hidden" aria-hidden>
          <p className="display pb-[0.14em] text-center text-[23vw] leading-[0.95] font-semibold tracking-[-0.07em] select-none">
            <span className="-mx-[0.1em] bg-gradient-to-b from-white via-white/80 to-white/0 bg-clip-text px-[0.1em] text-transparent">
              Safeway
            </span>
          </p>
        </div>

        <div className="container-x relative flex flex-col gap-2 border-t border-white/10 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}
          </p>
          <p dir="rtl" lang="ar">
            سيفواي لتجارة مفاتيح الكهربائية ذ.م.م
          </p>
        </div>
      </div>
    </footer>
  );
}
