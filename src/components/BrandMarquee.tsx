import Image from "next/image";
import { brands } from "@/lib/site";

export default function BrandMarquee() {
  const row = [...brands, ...brands];
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <ul className="marquee-track flex w-max items-center gap-3">
        {row.map((b, i) => (
          <li
            key={`${b.slug}-${i}`}
            aria-hidden={i >= brands.length}
            className="grid h-20 w-40 shrink-0 place-items-center rounded-2xl bg-cloud px-6 sm:h-24 sm:w-48"
          >
            <Image
              src={`/images/brands/${b.slug}.png`}
              alt={i < brands.length ? b.name : ""}
              width={220}
              height={120}
              className="max-h-10 w-auto object-contain mix-blend-multiply sm:max-h-11"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
