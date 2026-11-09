"use client";

import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/content/types";
import { cn, delay } from "@/lib/cn";
import { Ruler } from "@/components/ui/ruler";
import { ArrowAction } from "@/components/ui/arrow-action";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

/**
 * Fixed header: transparent over the hero, a frosted dark bar once the page
 * scrolls. On small screens the links move into a full-screen menu built on
 * <dialog>, which gives focus trapping and Escape for free.
 */
type SiteHeaderProps = {
  nav: NavItem[];
  /** Optional until the client has an inbox. */
  email?: string;
  instagram: { handle: string; url: string };
  whatsapp: { display: string; url: string; number: string };
};

export function SiteHeader({ nav, email, instagram, whatsapp }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry?.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const openMenu = () => menuRef.current?.showModal();
  const closeMenu = () => menuRef.current?.close();

  return (
    <>
      {/* Anything above this line counts as "at the top". */}
      <div ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24" />

      <header
        data-on-dark
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-white transition-[background-color,backdrop-filter,box-shadow] duration-500",
          scrolled
            ? "bg-ink/72 shadow-[0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-xl backdrop-saturate-150"
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "anim-fade-up mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 transition-[height] duration-500 sm:px-8 xl:px-12",
            scrolled ? "h-16" : "h-18 sm:h-20",
          )}
          style={delay(100)}
        >
          <div className="flex items-center gap-10">
            <a href="#top" className="flex items-baseline gap-2 text-[15px] font-semibold tracking-[-0.02em]">
              <span>Shah Meer</span>
              <span className="hidden font-mono text-[10px] font-normal tracking-[0.14em] text-white/60 uppercase sm:inline">
                Photo · Film
              </span>
            </a>
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-7 text-sm font-medium">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="relative py-2 text-white/85 transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-out-expo hover:text-white hover:after:scale-x-100"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <a
            href={whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 text-[13px] font-semibold tracking-[0.02em] text-white uppercase underline-offset-4 hover:underline lg:flex"
          >
            <WhatsAppIcon size={16} className="text-[#25D366]" />
            <span>
              WhatsApp <span className="tabular-nums">{whatsapp.display}</span>
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>

          <button
            type="button"
            onClick={openMenu}
            className="inline-flex h-10 items-center gap-2.5 rounded-tile bg-white/12 px-3.5 text-sm font-medium ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/20 lg:hidden"
            aria-haspopup="dialog"
          >
            <span aria-hidden="true" className="flex w-4 flex-col gap-[5px]">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-2/3 bg-current" />
            </span>
            Menu
          </button>
        </div>
      </header>

      <dialog
        ref={menuRef}
        data-lock-scroll
        data-on-dark
        aria-label="Site menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-white open:flex"
      >
        <div className="anim-fade relative flex w-full flex-col overflow-y-auto bg-[linear-gradient(160deg,var(--color-violet-deep),var(--color-violet-bright)_45%,var(--color-violet-low))] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8">
          <div className="grain pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay" aria-hidden="true" />
          <div className="relative flex h-18 items-center justify-between sm:h-20">
            <span className="text-[15px] font-semibold tracking-[-0.02em]">Shah Meer</span>
            <button
              type="button"
              onClick={closeMenu}
              autoFocus
              className="inline-flex h-10 items-center gap-2 rounded-tile bg-white/12 px-3.5 text-sm font-medium ring-1 ring-white/25 hover:bg-white/20"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                <path d="m3.5 3.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Close
            </button>
          </div>

          <nav aria-label="Mobile" className="relative mt-8 flex-1">
            <ul className="flex flex-col">
              {[...nav, { label: "Contact", href: "#contact" as const }].map((item, i) => (
                <li key={item.href} className="border-b border-white/15 first:border-t">
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="anim-fade-up flex items-baseline justify-between py-4 text-[clamp(2rem,9vw,3rem)] leading-none font-medium tracking-[-0.04em]"
                    style={delay(120 + i * 50)}
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-base text-white/50">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative mt-10 grid gap-5">
            <ArrowAction href={whatsapp.url} tone="light" icon="whatsapp" size="lg" className="justify-self-start">
              Chat on WhatsApp
            </ArrowAction>
            <Ruler className="text-white/50" fade="right" scrub={false} index={38} />
            <div className="flex flex-wrap items-end justify-between gap-4 text-sm">
              {email ? (
                <a href={`mailto:${email}`} className="font-semibold tracking-[0.02em] uppercase">
                  {email}
                </a>
              ) : (
                <a href={`tel:+${whatsapp.number}`} className="font-semibold tracking-[0.02em] tabular-nums">
                  {whatsapp.display}
                </a>
              )}
              <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="text-white/80">
                Instagram {instagram.handle}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
