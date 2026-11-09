"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { PortfolioCategory, PortfolioItem } from "@/content/types";
import { Lightbox } from "@/components/lightbox";
import { cn, delay } from "@/lib/cn";

type Filter = PortfolioCategory | "all";

/** Photos shown before "Show all". Keeps the one-page scroll manageable. */
const INITIAL_COUNT = 12;

type Props = {
  items: PortfolioItem[];
  categories: { value: Filter; label: string }[];
};

export function PortfolioGallery({ items, categories }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Tiles reveal on scroll at first; after a filter change they re-enter with a stagger instead.
  const [hasFiltered, setHasFiltered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  // `matching` drives the lightbox (it pages through every match); `visible` is what the grid shows.
  const matching = filter === "all" ? items : items.filter((item) => item.category === filter);
  const visible = expanded ? matching : matching.slice(0, INITIAL_COUNT);
  const hiddenCount = matching.length - visible.length;
  const labelFor = (item: PortfolioItem) => categories.find((c) => c.value === item.category)?.label ?? "";
  const countFor = (value: Filter) => (value === "all" ? items.length : items.filter((i) => i.category === value).length);

  return (
    <>
      <div className="-mx-5 overflow-x-auto px-5 no-scrollbar sm:mx-0 sm:px-0">
        <div role="group" aria-label="Filter photos by category" className="flex w-max gap-2">
          {categories.map((category) => {
            const active = filter === category.value;
            return (
              <button
                key={category.value}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(category.value);
                  setHasFiltered(true);
                  setExpanded(false);
                }}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-300",
                  active ? "bg-ink text-paper" : "bg-paper text-ink ring-1 ring-line hover:ring-ink/40",
                )}
              >
                {category.label}
                <span className={cn("font-mono text-[10px] tabular-nums", active ? "text-paper/60" : "text-muted")}>
                  {countFor(category.value)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {matching.length} photos
      </p>

      <ul ref={listRef} className="mt-8 columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-4">
        {visible.map((item, i) => (
          <li
            key={`${filter}-${item.id}`}
            className={cn("masonry-item mb-3 md:mb-4", hasFiltered && "anim-tile")}
            style={hasFiltered ? delay(Math.min(i, 12) * 40) : undefined}
            {...(hasFiltered ? null : { "data-reveal": "" })}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block w-full overflow-hidden rounded-tile bg-line text-left"
              aria-label={`Open photo: ${item.title}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                placeholder="blur"
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="h-auto w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-3 pt-12 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-4 sm:pt-16"
              >
                <span className="grid gap-1">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-white/70 uppercase">{labelFor(item)}</span>
                  <span className="text-sm font-medium tracking-[-0.01em] sm:text-base">{item.title}</span>
                </span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur-md">
                  <svg viewBox="0 0 16 16" width="13" height="13" fill="none">
                    <path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {hiddenCount > 0 ? (
        <div className="mt-6 flex justify-center md:mt-10">
          <button
            type="button"
            onClick={() => {
              setExpanded(true);
              // The button disappears; move focus to the first newly shown photo.
              requestAnimationFrame(() => listRef.current?.querySelectorAll("button")[INITIAL_COUNT]?.focus());
            }}
            className="inline-flex h-12 items-center gap-3 rounded-full bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-violet"
          >
            Show all {matching.length} photos
            <span className="font-mono text-[11px] text-paper/60 tabular-nums">+{hiddenCount}</span>
          </button>
        </div>
      ) : null}

      <Lightbox
        items={matching}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
        categoryLabel={labelFor}
      />
    </>
  );
}
