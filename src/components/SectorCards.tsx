import Image from "next/image";
import { sectors } from "@/lib/site";
import Reveal from "@/components/Reveal";

/** Tall image cards; on desktop the hovered card widens. */
export default function SectorCards() {
  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
      <ul className="flex w-max snap-x snap-mandatory gap-3 sm:grid sm:w-auto sm:grid-cols-2 lg:flex lg:h-[34rem] lg:gap-4">
        {sectors.map((s, i) => (
          <Reveal
            as="li"
            key={s.title}
            delay={i * 90}
            className="group relative h-[26rem] w-[72vw] shrink-0 snap-start overflow-hidden rounded-[1.75rem] sm:h-[28rem] sm:w-auto lg:h-full lg:flex-1 lg:transition-[flex-grow] lg:duration-700 lg:ease-out-expo lg:hover:grow-[1.8]"
          >
            <Image
              src={s.image}
              alt={`${s.title} projects`}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 72vw"
              className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
            <span className="absolute top-4 left-4 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-ink backdrop-blur">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h3 className="display text-3xl">{s.title}</h3>
              <p className="mt-1 text-sm text-white/75">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
