"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { cn } from "@/lib/cn";

/**
 * Floating "Chat on WhatsApp" button. It stays out of the way over the hero
 * and hides while the contact section (which has its own WhatsApp button) or
 * the footer (WhatsApp link, plus the credit strip it would cover) is on screen. Modal dialogs (lightbox, menu) sit in the top layer above it.
 */
export function WhatsAppFloat({ href }: { href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const contact = document.getElementById("contact");
    const footer = document.getElementById("site-footer");
    if (!hero || !contact || !footer) return;
    const inView = new Map<Element, boolean>([
      [hero, true],
      [contact, false],
      [footer, false],
    ]);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) inView.set(entry.target, entry.isIntersecting);
        setVisible(!inView.get(hero) && !inView.get(contact) && !inView.get(footer));
      },
      // The hero counts as "gone" once its last 20% has scrolled off.
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(hero);
    observer.observe(contact);
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp (opens in a new tab)"
      inert={!visible}
      className={cn(
        "group fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex h-14 items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-10px_rgb(18_140_74/0.7)] ring-1 ring-black/5 transition-[opacity,translate,background-color] duration-500 ease-out-expo hover:bg-[#1da851] sm:right-[max(1.5rem,env(safe-area-inset-right))] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <span className="grid size-14 place-items-center">
        <WhatsAppIcon size={26} />
      </span>
      <span
        aria-hidden="true"
        className="max-w-0 overflow-hidden pr-0 text-sm font-medium whitespace-nowrap transition-[max-width,padding] duration-500 ease-out-expo group-hover:max-w-48 group-hover:pr-5 group-focus-visible:max-w-48 group-focus-visible:pr-5"
      >
        Chat on WhatsApp
      </span>
    </a>
  );
}
