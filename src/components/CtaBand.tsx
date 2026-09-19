import Link from "next/link";
import Icon from "@/components/Icon";
import ParallaxImage from "@/components/motion/ParallaxImage";
import { company } from "@/lib/site";

export default function CtaBand({ image }: { image: string }) {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <ParallaxImage
        src={image}
        alt=""
        className="flex min-h-[32rem] items-end rounded-[1.75rem] md:min-h-[38rem] md:rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/45 to-navy/10" />
        <div className="container-x relative pb-8 md:pb-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-volt" />
                From design to commissioning
              </p>
              <h2 className="display mt-5 max-w-3xl text-[clamp(2.2rem,5.4vw,5rem)] leading-[0.98] text-white">
                Let&apos;s build smarter electrical systems together
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-light">
                Request a quote
                <span className="chip">
                  <Icon name="arrow" className="size-3.5" />
                </span>
              </Link>
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-light backdrop-blur"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </ParallaxImage>
    </section>
  );
}
