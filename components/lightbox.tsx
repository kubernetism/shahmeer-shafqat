"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { PortfolioItem } from "@/content/types";

type LightboxProps = {
  items: PortfolioItem[];
  /** Index into `items`, or null when closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  categoryLabel: (item: PortfolioItem) => string;
};

const SWIPE_THRESHOLD = 48;

/**
 * Full-screen photo viewer on a native modal <dialog>: focus is trapped,
 * Escape closes it and focus returns to the tile that opened it.
 * Arrow keys and horizontal swipes move between photos.
 */
export function Lightbox({ items, index, onIndexChange, onClose, categoryLabel }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerStartX = useRef<number | null>(null);
  const isOpen = index !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const count = items.length;
  const item = index !== null ? items[index] : undefined;
  const go = (step: number) => {
    if (index === null || count === 0) return;
    onIndexChange((index + step + count) % count);
  };

  const neighbours =
    index !== null && count > 1
      ? [items[(index + 1) % count], items[(index - 1 + count) % count]].filter(
          (n): n is PortfolioItem => n !== undefined,
        )
      : [];

  return (
    <dialog
      ref={dialogRef}
      data-lock-scroll
      data-on-dark
      aria-label="Photo viewer"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        }
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-white open:flex"
    >
      <div className="anim-fade flex w-full flex-col bg-[rgb(10_8_14/0.96)] backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 sm:px-6">
          <p className="font-mono text-xs tracking-[0.14em] text-white/70 tabular-nums" aria-live="polite">
            {index !== null ? (
              <>
                <span className="text-white">{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden="true"> / </span>
                <span className="sr-only"> of </span>
                {String(count).padStart(2, "0")}
              </>
            ) : null}
          </p>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="inline-flex h-10 items-center gap-2 rounded-tile bg-white/10 px-3.5 text-sm font-medium ring-1 ring-white/20 transition-colors hover:bg-white/20"
          >
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="m3.5 3.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Close
          </button>
        </div>

        <div
          className="relative min-h-0 flex-1 touch-pan-y select-none"
          onPointerDown={(event) => {
            pointerStartX.current = event.clientX;
          }}
          onPointerUp={(event) => {
            const start = pointerStartX.current;
            pointerStartX.current = null;
            if (start === null) return;
            const delta = event.clientX - start;
            if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
          }}
        >
          {item ? (
            <figure key={item.id} className="anim-lightbox absolute inset-0 mx-4 sm:mx-20">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                placeholder="blur"
                className="object-contain"
                draggable={false}
              />
            </figure>
          ) : null}

          {count > 1 ? (
            <>
              <NavButton direction="previous" onClick={() => go(-1)} />
              <NavButton direction="next" onClick={() => go(1)} />
            </>
          ) : null}

          {/* Warm the cache for the neighbouring photos. */}
          <div hidden>
            {neighbours.map((n) => (
              <Image key={n.id} src={n.src} alt="" width={10} height={10} sizes="100vw" loading="eager" />
            ))}
          </div>
        </div>

        <div className="flex min-h-16 flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
          {item ? (
            <>
              <p className="text-lg font-medium tracking-[-0.02em]">{item.title}</p>
              <p className="font-mono text-[11px] tracking-[0.14em] text-white/60 uppercase">
                {categoryLabel(item)} · Weddings by Meer
              </p>
            </>
          ) : null}
        </div>
      </div>
    </dialog>
  );
}

function NavButton({ direction, onClick }: { direction: "previous" | "next"; onClick: () => void }) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Next photo" : "Previous photo"}
      className={`absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white/25 ${isNext ? "right-3 sm:right-5" : "left-3 sm:left-5"}`}
    >
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={isNext ? "" : "rotate-180"}>
        <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
