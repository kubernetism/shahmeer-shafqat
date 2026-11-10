import Image from "next/image";
import { hero, site } from "@/content/site";
import { ArrowAction } from "@/components/ui/arrow-action";
import { Ruler } from "@/components/ui/ruler";
import { cn, delay } from "@/lib/cn";

/*
 * Layout
 * - xl and up: the photo is pinned to the right at full hero height; the
 *   sampled violet fills the rest, so ultra-wide screens just get more violet.
 *   Copy sits in the empty left 40% of the photo.
 * - below xl: the photo stacks on top (cropped toward both faces on phones),
 *   fades into the violet, and the copy follows underneath.
 * The faces sit in the upper half of the photo, so the wordmark stays in the
 * bottom band and the floating card sits on the shoulder area.
 */
export function Hero() {
  return (
    <section
      id="top"
      data-on-dark
      aria-labelledby="hero-title"
      className="relative isolate overflow-clip bg-[#552789] text-white xl:h-[clamp(720px,calc(100svh-var(--credit-strip-h)),1000px)] xl:bg-[linear-gradient(to_bottom,#4f1f88_0%,#6724c0_25%,#6221b5_50%,#581ba3_75%,#552789_100%)]"
    >
      {/* Photo */}
      <div
        className={cn(
          "relative aspect-[4/5] w-full sm:aspect-[16/10] md:aspect-[1672/941]",
          "xl:absolute xl:inset-y-0 xl:right-0 xl:aspect-[1672/941] xl:h-full xl:w-auto",
          "xl:[mask-image:linear-gradient(to_right,transparent,#000_16%)]",
        )}
      >
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          loading="eager"
          fetchPriority="high"
          quality={85}
          placeholder="blur"
          sizes="(min-width: 1280px) 1780px, (min-width: 768px) 100vw, (min-width: 640px) 160vw, 222vw"
          className="anim-settle object-cover object-[77%_0%] sm:object-[72%_0%] md:object-center"
        />
        {/* Fade into the violet below the photo when stacked. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/5 bg-[linear-gradient(to_bottom,transparent,rgb(85_39_137/0.75)_55%,#552789_96%)] xl:hidden"
        />
        {/* Soft shade at the very bottom so the wordmark reads on the bright table. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-[38%] bg-[linear-gradient(to_bottom,transparent,rgb(40_12_70/0.55))] xl:block"
        />

        {/* Floating card, positioned in photo coordinates so it never drifts onto a face. */}
        <HeroCard className="anim-card absolute top-[56%] right-[3.5%] hidden w-[13%] min-w-44 xl:block" />
      </div>

      {/* Magenta glow under the stacked copy (phones and tablets). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[radial-gradient(70%_60%_at_80%_100%,rgb(193_59_216/0.35),transparent)] xl:hidden"
      />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 z-[1] opacity-[0.06] mix-blend-overlay" />

      {/* Copy */}
      <div className="relative z-[2] xl:absolute xl:inset-0">
        <div className="mx-auto flex h-full max-w-[1440px] flex-col px-5 sm:px-8 xl:px-12">
          <div className="-mt-20 sm:-mt-32 md:-mt-36 xl:mt-0 xl:pt-[clamp(8.5rem,24vh,14rem)]">
            <p
              className="anim-fade-up mb-5 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] text-white/80 uppercase"
              style={delay(250)}
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-magenta shadow-[0_0_10px_var(--color-magenta)]" />
              {hero.eyebrow}
            </p>
            <h1
              id="hero-title"
              className="max-w-[11ch] text-[clamp(2.75rem,10.5vw,4.25rem)] leading-[0.98] font-medium tracking-[-0.045em] text-balance md:max-w-[12ch] md:text-[clamp(3.5rem,7vw,4.75rem)] xl:text-[clamp(3.5rem,4.5vw,5.25rem)]"
            >
              {hero.headline.map((line, i) => (
                <span key={line} className="-mb-[0.08em] block overflow-clip pb-[0.08em]">
                  <span className="anim-rise block" style={delay(300 + i * 90)}>
                    {line}{" "}
                  </span>
                </span>
              ))}
            </h1>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-6 xl:hidden">
              <ArrowAction href={hero.cta.href} tone="light" className="anim-fade-up" style={delay(650)}>
                {hero.cta.label}
              </ArrowAction>
              <HeroCard className="anim-card block w-36 sm:w-44" eager />
            </div>
          </div>

          <p
            className="anim-fade-up mt-6 hidden max-w-[40ch] text-sm leading-relaxed text-white/75 xl:block"
            style={delay(700)}
          >
            {site.location}
          </p>

          {/* Bottom band: lens scale + name */}
          <div className="mt-10 xl:mt-auto">
            <Ruler
              className="anim-draw h-7 text-white/70 xl:h-9"
              fade="none"
              index={34}
              style={delay(500)}
            />
            <div className="relative mt-3 [container-type:inline-size] xl:mt-4">
              <p
                aria-hidden="true"
                className="anim-wordmark wordmark-fill -mb-[0.19em] text-center leading-[0.8] font-bold tracking-[-0.065em] whitespace-nowrap sm:text-left"
                style={delay(350)}
              >
                <span className="text-[38.4cqw] sm:hidden">{site.wordmark.short}</span>
                <span className="hidden text-[18.25cqw] sm:inline">{site.wordmark.full}</span>
              </p>
              <div className="absolute top-[30%] left-[25.5%] hidden xl:block">
                <ArrowAction href={hero.cta.href} tone="light" className="anim-fade-up" style={delay(900)}>
                  {hero.cta.label}
                </ArrowAction>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** `eager` for the stacked (phone/tablet) instance, which is above the fold there. */
function HeroCard({ className, eager = false }: { className?: string; eager?: boolean }) {
  const { card } = hero;
  return (
    <a
      href="#portfolio"
      aria-label={`${card.label}: see wedding work in the portfolio`}
      className={cn("group", className)}
      style={delay(800)}
    >
      <span className="relative block aspect-[3/2] -rotate-2 overflow-hidden rounded-card shadow-[0_24px_60px_-20px_rgb(20_0_40/0.7)] ring-1 ring-white/45 transition-transform duration-700 ease-out-expo group-hover:rotate-0 group-hover:scale-[1.03]">
        <Image
          src={card.photo.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 240px, 180px"
          loading={eager ? "eager" : undefined}
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
          style={{ objectPosition: card.photo.focus }}
        />
        <span className="absolute inset-0 bg-gradient-to-tr from-violet-deep/55 via-transparent to-transparent" />
        <span className="absolute bottom-2.5 left-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
          {card.label}
        </span>
        <span className="absolute top-2.5 right-2.5 grid size-6 place-items-center rounded-full bg-white/20 text-[11px] backdrop-blur-md">
          ↗
        </span>
      </span>
    </a>
  );
}
