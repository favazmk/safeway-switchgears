"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, nav } from "@/lib/site";
import Icon from "@/components/Icon";

export default function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  // Hide while scrolling down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 ease-out-expo sm:px-5 sm:pt-4 ${
        hidden && !open ? "-translate-y-[120%]" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-[88rem] rounded-[1.6rem] border border-white/60 bg-white/80 shadow-[0_10px_40px_-18px_rgb(11_21_38/0.35)] backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between gap-4 pr-2 pl-4 sm:pl-5">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Safeway home">
            <Image
              src="/images/logo-mark-color.png"
              alt=""
              width={264}
              height={232}
              priority
              className="h-8 w-auto"
            />
            <span className="leading-none">
              <span className="display block text-[1.35rem] font-semibold tracking-[-0.04em] text-ink">
                Safeway
              </span>
              <span className="mt-1 block text-[0.56rem] font-medium tracking-[0.14em] text-muted uppercase">
                Electric Switchgear
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-[0.92rem] transition-colors ${
                  isActive(item.href)
                    ? "bg-mist font-medium text-brand"
                    : "text-ink-soft hover:bg-cloud hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={company.phones[0].href}
              className="hidden px-3 text-sm text-ink-soft transition-colors hover:text-brand xl:block"
            >
              {company.phones[0].label}
            </a>
            <Link href="/contact" className="btn btn-dark hidden py-2.5 text-sm sm:inline-flex">
              Get a quote
              <span className="chip">
                <Icon name="arrow" className="size-3.5" />
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpenOn(open ? null : pathname)}
              className="grid size-12 place-items-center rounded-full bg-cloud text-ink lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${
                    open ? "top-[5px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${
                    open ? "top-[5px] -rotate-45" : "top-[10px]"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={`grid transition-[grid-template-rows] duration-500 ease-out-expo lg:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <nav className="overflow-hidden" aria-label="Mobile">
            <ul className="border-t border-line px-3 pt-2 pb-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`display flex items-center justify-between rounded-2xl px-3 py-3.5 text-2xl ${
                      isActive(item.href) ? "text-brand" : "text-ink"
                    }`}
                  >
                    {item.label}
                    <Icon name="arrow" className="size-5 text-muted" />
                  </Link>
                </li>
              ))}
              <li className="mt-2 grid grid-cols-2 gap-2">
                <Link href="/contact" className="btn btn-primary">
                  Get a quote
                </Link>
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  WhatsApp
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
