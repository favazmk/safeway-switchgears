import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import ParallaxImage from "@/components/motion/ParallaxImage";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  image: string;
  imageAlt: string;
  actions?: ReactNode;
  chips?: string[];
};

export default function PageHero({ eyebrow, title, intro, image, imageAlt, actions, chips }: Props) {
  return (
    <section className="bg-white pt-28 md:pt-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
          <Reveal>
            <p className="label">{eyebrow}</p>
            <h1 className="display mt-5 text-[clamp(2.6rem,7.2vw,6.6rem)] leading-[0.94] text-ink">{title}</h1>
          </Reveal>
          <Reveal delay={120} className="lg:pb-3">
            <p className="max-w-md text-lg text-ink-soft">{intro}</p>
            {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
          </Reveal>
        </div>
      </div>

      <div className="mt-12 px-3 sm:px-5 md:mt-16">
        <ParallaxImage
          src={image}
          alt={imageAlt}
          priority
          className="aspect-[4/5] rounded-[1.75rem] sm:aspect-[16/10] md:rounded-[2rem] lg:aspect-[21/9]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
          {chips && (
            <ul className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2 sm:inset-x-6 sm:bottom-6">
              {chips.map((c) => (
                <li
                  key={c}
                  className="rounded-full bg-white/85 px-3.5 py-1.5 text-sm font-medium text-ink backdrop-blur"
                >
                  {c}
                </li>
              ))}
            </ul>
          )}
        </ParallaxImage>
      </div>
    </section>
  );
}
