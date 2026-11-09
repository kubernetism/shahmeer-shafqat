"use client";

import { useRef, useState } from "react";
import type { Film, FilmSource } from "@/content/types";
import { FilmFrame } from "@/components/film-frame";

/**
 * A film card that opens a player in a modal dialog. Only rendered for films
 * that have a `video` source; the player mounts on open, so nothing is
 * downloaded from YouTube/Vimeo until the visitor asks for it.
 */
export function PlayableFilm({ film, featured = false }: { film: Film & { video: FilmSource }; featured?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          dialogRef.current?.showModal();
        }}
        className="group block w-full text-left"
        aria-label={`Play film: ${film.title}`}
      >
        <FilmFrame film={film} featured={featured} />
      </button>

      <dialog
        ref={dialogRef}
        data-lock-scroll
        data-on-dark
        aria-label={`${film.title} (video)`}
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-white open:flex"
      >
        <div className="anim-fade flex w-full flex-col items-center justify-center gap-4 bg-[rgb(10_8_14/0.96)] px-4 py-6">
          <div className="flex w-full max-w-6xl items-center justify-between">
            <p className="text-lg font-medium tracking-[-0.02em]">{film.title}</p>
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              className="inline-flex h-10 items-center gap-2 rounded-tile bg-white/10 px-3.5 text-sm font-medium ring-1 ring-white/20 hover:bg-white/20"
            >
              Close
            </button>
          </div>
          <div className="relative aspect-video w-full max-w-6xl overflow-hidden rounded-card bg-black">
            {open ? <Player source={film.video} title={film.title} /> : null}
          </div>
        </div>
      </dialog>
    </>
  );
}

function Player({ source, title }: { source: FilmSource; title: string }) {
  switch (source.provider) {
    case "youtube":
      return (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(source.id)}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      );
    case "vimeo":
      return (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://player.vimeo.com/video/${encodeURIComponent(source.id)}?autoplay=1&dnt=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    case "mp4":
      return <video className="absolute inset-0 size-full" src={source.src} controls autoPlay playsInline />;
    default: {
      const exhaustive: never = source;
      return exhaustive;
    }
  }
}
