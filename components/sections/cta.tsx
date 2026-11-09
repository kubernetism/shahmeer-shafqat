import Image from "next/image";
import { cta } from "@/content/site";
import type { Photo } from "@/content/types";
import { ArrowAction } from "@/components/ui/arrow-action";
import { container } from "@/components/ui/eyebrow";
import { Ruler } from "@/components/ui/ruler";
import { cn } from "@/lib/cn";

export function Cta() {
  const [left, right] = cta.photos;
  return (
    <section data-on-dark aria-labelledby="cta-title" className="overflow-clip bg-night pt-6 pb-16 text-white md:pt-8 md:pb-20">
      <div className={cn(container, "grid gap-10 md:grid-cols-[1fr_1.35fr_1fr] md:items-center md:gap-8")}>
        <div className="grid grid-cols-2 gap-3 md:contents">
          <CtaPhoto photo={left} className="md:order-1" />
          <CtaPhoto photo={right} className="md:order-3" />
        </div>

        <div className="text-center md:order-2" data-reveal>
          <h2
            id="cta-title"
            className="text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.045em] text-balance"
          >
            {cta.headline.map((line) => (
              <span key={line} className="block">
                {line}{" "}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-5 max-w-[40ch] text-sm leading-relaxed text-white/60 md:text-base">{cta.body}</p>
          <ArrowAction href={cta.button.href} tone="light" icon="whatsapp" className="mt-8">
            {cta.button.label}
          </ArrowAction>
        </div>
      </div>

      <div className={cn(container, "mt-12 md:mt-16")}>
        <Ruler className="h-12 text-white/30 md:h-16" fade="both" />
      </div>
    </section>
  );
}

function CtaPhoto({ photo, className }: { photo: Photo; className?: string }) {
  return (
    <div className={cn("group relative aspect-[4/5] overflow-hidden rounded-tile bg-night-2 md:aspect-[3/4]", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        placeholder="blur"
        sizes="(min-width: 768px) 26vw, 50vw"
        className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.05]"
        style={{ objectPosition: photo.focus }}
      />
    </div>
  );
}
