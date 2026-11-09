import Image from "next/image";
import type { Film } from "@/content/types";
import { cn } from "@/lib/cn";

/** Poster artwork for a film. Pure markup, shared by the static and playable cards. */
export function FilmFrame({ film, featured = false }: { film: Film; featured?: boolean }) {
  const playable = film.video !== null;
  return (
    <span
      className={cn(
        "relative block overflow-hidden rounded-card bg-night-2",
        featured ? "aspect-[4/5] sm:aspect-video lg:aspect-[21/9]" : "aspect-video",
      )}
    >
      <Image
        src={film.poster.src}
        alt={film.poster.alt}
        fill
        placeholder="blur"
        sizes={featured ? "(min-width: 1440px) 1344px, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw"}
        className={cn(
          "object-cover transition-transform duration-[1.4s] ease-out-expo",
          playable && "group-hover:scale-[1.04]",
          !playable && "saturate-[0.85]",
        )}
        style={{ objectPosition: film.poster.focus }}
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />

      {featured ? (
        /* Viewfinder corners */
        <span aria-hidden="true" className="pointer-events-none absolute inset-3 sm:inset-5">
          <span className="absolute top-0 left-0 size-4 border-t border-l border-white/60 sm:size-6" />
          <span className="absolute top-0 right-0 size-4 border-t border-r border-white/60 sm:size-6" />
          <span className="absolute bottom-0 left-0 size-4 border-b border-l border-white/60 sm:size-6" />
          <span className="absolute right-0 bottom-0 size-4 border-r border-b border-white/60 sm:size-6" />
        </span>
      ) : null}

      {playable ? (
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/15 ring-1 ring-white/40 backdrop-blur-md transition-transform duration-500 ease-out-expo group-hover:scale-110",
            featured ? "size-20 sm:size-24" : "size-14",
          )}
        >
          <svg viewBox="0 0 24 24" className={featured ? "size-7" : "size-5"} fill="currentColor">
            <path d="M8 5.5v13a.5.5 0 0 0 .76.43l10.4-6.5a.5.5 0 0 0 0-.86L8.76 5.07A.5.5 0 0 0 8 5.5Z" />
          </svg>
        </span>
      ) : null}

      <span className={cn("absolute inset-x-0 bottom-0 flex items-end justify-between gap-4", featured ? "p-7 sm:p-10 lg:p-12" : "p-4")}>
        <span className="grid gap-1.5">
          <span className="font-mono text-[10px] tracking-[0.14em] text-white/70 uppercase">
            {film.subtitle} · {film.year}
          </span>
          <span
            className={cn(
              "font-medium tracking-[-0.035em] text-white",
              featured ? "text-[clamp(2rem,5vw,4rem)] leading-none" : "text-lg leading-tight",
            )}
          >
            {film.title}
          </span>
        </span>
        {playable ? (
          film.duration ? <span className="font-mono text-xs text-white/80 tabular-nums">{film.duration}</span> : null
        ) : (
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-white uppercase ring-1 ring-white/20 backdrop-blur-md">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-magenta" />
            Coming soon
          </span>
        )}
      </span>
    </span>
  );
}
