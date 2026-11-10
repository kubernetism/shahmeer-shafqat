import { credit } from "@/content/site";
import { cn } from "@/lib/cn";

/*
 * Four identical copies move left by 50% (two copies) per cycle, so the loop
 * lands on an identical frame with no jump, and each half is wide enough to
 * cover ultra-wide screens. Only the first copy is exposed to assistive tech.
 * Motion, hover pause and the static fallback (reduced motion, or keyboard
 * focus on the email link) live in globals.css under "Credit marquee".
 */
const COPIES = [0, 1, 2, 3] as const;

export function CreditMarquee({ className }: { className?: string }) {
  return (
    <div
      data-on-dark
      className={cn(
        "marquee bg-ink font-mono text-[11px] tracking-[0.14em] text-white/65 uppercase",
        className,
      )}
    >
      <div className="marquee-track">
        {COPIES.map((copy) => (
          <CreditCopy key={copy} decorative={copy > 0} />
        ))}
      </div>
    </div>
  );
}

function CreditCopy({ decorative }: { decorative: boolean }) {
  return (
    <p className="marquee-copy" aria-hidden={decorative || undefined}>
      This portfolio is developed by <span className="font-medium text-white">{credit.developer}</span> —{" "}
      {credit.role} · {credit.skills.join(" · ")} — Contact:{" "}
      <a
        href={`mailto:${credit.email}`}
        // Duplicates stay clickable with a pointer (the strip pauses on hover)
        // but drop out of the tab order, since they are hidden from screen readers.
        tabIndex={decorative ? -1 : undefined}
        className="inline-block text-white normal-case underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
      >
        {credit.email}
      </a>
      <span
        aria-hidden="true"
        className="marquee-sep inline-block size-1 rounded-full bg-magenta align-middle shadow-[0_0_8px_var(--color-magenta)]"
      />
    </p>
  );
}
