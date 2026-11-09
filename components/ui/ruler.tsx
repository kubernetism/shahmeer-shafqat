import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type RulerProps = {
  className?: string;
  /** Fade the ends so the scale dissolves into the layout. */
  fade?: "both" | "left" | "right" | "none";
  /** Slide the scale as the page scrolls, like turning a focus ring. */
  scrub?: boolean;
  /** Draw a focus index (a short accent needle) at this position, 0-100. */
  index?: number;
  style?: CSSProperties;
};

const fades = {
  both: "[mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]",
  left: "[mask-image:linear-gradient(to_right,transparent,#000_18%)]",
  right: "[mask-image:linear-gradient(to_right,#000_70%,transparent)]",
  none: "",
} as const;

/**
 * The lens distance-scale motif: minor, mid and major ticks on a baseline.
 * Colour comes from `currentColor`, height from the className (default h-6).
 */
export function Ruler({ className, fade = "none", scrub = true, index, style }: RulerProps) {
  // cn() does not merge conflicting utilities, so only apply the default height when none is given.
  const hasHeight = /(^|\s)([\w-]+:)?h-/.test(className ?? "");
  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-clip", !hasHeight && "h-6", fades[fade], className)}
      style={style}
    >
      <div
        className="ruler-track absolute inset-y-0 left-0 w-[calc(100%+90px)]"
        {...(scrub ? { "data-ruler-scrub": "" } : null)}
      />
      {index !== undefined ? (
        <span
          className="absolute inset-y-0 w-[2px] rounded-full bg-magenta shadow-[0_0_12px_var(--color-magenta)]"
          style={{ left: `${index}%` }}
        />
      ) : null}
    </div>
  );
}
