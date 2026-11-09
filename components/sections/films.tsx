import { films } from "@/content/site";
import type { Film, FilmSource } from "@/content/types";
import { Eyebrow, container } from "@/components/ui/eyebrow";
import { Ruler } from "@/components/ui/ruler";
import { FilmFrame } from "@/components/film-frame";
import { PlayableFilm } from "@/components/playable-film";

/* Films are edited in content/site.ts: set `video` on a film to make it playable. */
export function Films() {
  const [showreel, ...rest] = films;
  return (
    <section
      id="films"
      data-on-dark
      aria-labelledby="films-title"
      className="relative overflow-clip bg-night py-24 text-white md:py-32"
    >
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow className="text-white/60">Films</Eyebrow>
            <h2
              id="films-title"
              className="mt-6 text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.05em]"
            >
              Showreel &amp; films
            </h2>
          </div>
          <p className="max-w-[46ch] text-base leading-relaxed text-white/65 text-pretty md:text-lg lg:col-span-5 lg:pb-2">
            Every wedding has its own rhythm. The films keep the music, the vows and the laughter, cut together the way you
            remember the day.
          </p>
        </div>

        {showreel ? (
          <div className="mt-12 md:mt-16" data-reveal>
            <FilmCard film={showreel} featured />
          </div>
        ) : null}

        <Ruler className="mt-10 h-6 text-white/35" fade="both" index={50} />

        {rest.length > 0 ? (
          <ul className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
            {rest.map((film) => (
              <li key={film.id} className="w-[80%] shrink-0 snap-start sm:w-auto">
                <FilmCard film={film} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

function FilmCard({ film, featured = false }: { film: Film; featured?: boolean }) {
  if (hasVideo(film)) return <PlayableFilm film={film} featured={featured} />;
  return (
    <div>
      <FilmFrame film={film} featured={featured} />
    </div>
  );
}

function hasVideo(film: Film): film is Film & { video: FilmSource } {
  return film.video !== null;
}
