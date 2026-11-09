import Image from "next/image";
import { about, stats } from "@/content/site";
import { ArrowAction } from "@/components/ui/arrow-action";
import { Eyebrow, container } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-36">
      <div className={cn(container, "grid gap-10 lg:grid-cols-12 lg:gap-8")}>
        <div className="flex flex-col gap-10 lg:col-span-4">
          <Eyebrow as="h2" id="about-title" className="text-muted">
            About
          </Eyebrow>
          <figure className="hidden w-[min(100%,17rem)] lg:block" data-reveal>
            <div className="relative aspect-[3/2] overflow-hidden rounded-tile bg-mist">
              <Image
                src={about.photo.src}
                alt={about.photo.alt}
                fill
                sizes="272px"
                placeholder="blur"
                className="object-cover grayscale"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
              Behind the lens
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-8" data-reveal>
          <p className="text-[clamp(1.7rem,3.2vw,2.6rem)] leading-[1.14] font-medium tracking-[-0.035em] text-pretty">
            {about.statement} <span className="text-subtle">{about.statementMuted}</span>
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ArrowAction href={about.cta.href}>{about.cta.label}</ArrowAction>
            <p className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">{about.signature}</p>
          </div>
        </div>
      </div>

      <div className={cn(container, "mt-20 md:mt-28")}>
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
          {stats.map((stat, i) => (
            <li
              key={stat.label}
              data-reveal
              className={cn(
                "group relative isolate flex flex-col-reverse overflow-hidden rounded-tile bg-mist",
                i === 0 ? "col-span-2 aspect-[16/10] sm:aspect-[2/1] lg:col-span-1 lg:aspect-square" : "aspect-square",
              )}
            >
              <Image
                src={stat.photo.src}
                alt={stat.photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                placeholder="blur"
                className="-z-10 object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.05]"
                style={{ objectPosition: stat.photo.focus }}
              />
              <p className="flex flex-col gap-1 bg-ink/55 px-3 py-3 text-center text-white backdrop-blur-md sm:gap-2 sm:px-4 sm:py-5">
                <span className="text-[clamp(2rem,4.2vw,3.25rem)] leading-none font-medium tracking-[-0.045em] tabular-nums">
                  {stat.value}
                </span>
                <span className="text-xs font-medium tracking-[-0.01em] text-white/90 sm:text-base">{stat.label}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
