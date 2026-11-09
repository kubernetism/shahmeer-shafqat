import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

type Tone = "dark" | "light";

type Common = {
  children: ReactNode;
  /** dark = black label for light backgrounds; light = white label for dark/photo backgrounds. */
  tone?: Tone;
  /** Tile glyph. `whatsapp` turns the tile WhatsApp green with its logo. */
  icon?: "arrow" | "whatsapp";
  size?: "md" | "lg";
  className?: string;
};

type AsLink = Common & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

/**
 * The signature button from the design: a small square arrow tile beside a
 * separate label block. Renders a link when `href` is given, otherwise a button.
 */
export function ArrowAction({ children, tone = "dark", icon = "arrow", size = "md", className, ...rest }: AsLink | AsButton) {
  const classes = cn(
    "group/arrow inline-flex shrink-0 items-stretch gap-1 rounded-tile text-sm font-medium tracking-[-0.01em] select-none",
    "disabled:cursor-not-allowed disabled:opacity-60",
    className,
  );
  const inner = (
    <ArrowInner tone={tone} icon={icon} size={size}>
      {children}
    </ArrowInner>
  );

  if (rest.href !== undefined) {
    const external = /^https?:\/\//.test(rest.href);
    return (
      <a className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)} {...rest}>
        {inner}
        {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  );
}

function ArrowInner({
  tone,
  icon,
  size,
  children,
}: {
  tone: Tone;
  icon: "arrow" | "whatsapp";
  size: "md" | "lg";
  children: ReactNode;
}) {
  const tile =
    icon === "whatsapp"
      ? "bg-[#25D366] text-white group-hover/arrow:bg-[#1da851]"
      : tone === "dark"
      ? "bg-mist text-ink ring-1 ring-ink/8 group-hover/arrow:bg-ink group-hover/arrow:text-paper"
      : "bg-white/12 text-white ring-1 ring-white/25 backdrop-blur-md group-hover/arrow:bg-white group-hover/arrow:text-ink";
  const label =
    tone === "dark"
      ? "bg-ink text-paper group-hover/arrow:bg-violet"
      : "bg-white text-ink group-hover/arrow:bg-mist";

  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "relative grid shrink-0 place-items-center overflow-hidden rounded-tile transition-colors duration-300",
          size === "lg" ? "size-12" : "size-10",
          tile,
        )}
      >
        {icon === "whatsapp" ? (
          <WhatsAppIcon size={size === "lg" ? 22 : 18} className="transition-transform duration-500 ease-out-expo group-hover/arrow:scale-110" />
        ) : (
          <>
            <ArrowGlyph className="transition-transform duration-500 ease-out-expo group-hover/arrow:translate-x-7 group-hover/arrow:-translate-y-7" />
            <ArrowGlyph className="absolute -translate-x-7 translate-y-7 transition-transform duration-500 ease-out-expo group-hover/arrow:translate-0" />
          </>
        )}
      </span>
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-tile whitespace-nowrap transition-colors duration-300",
          size === "lg" ? "h-12 px-5 text-[15px]" : "h-10 px-4",
          label,
        )}
      >
        {children}
      </span>
    </>
  );
}

export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" className={className} aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
