import type React from "react";

/** Joins truthy class names. Small on purpose: the project has no class-merging needs. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-10-04" -> "Oct 4, 2026". Fixed locale and UTC so server and client agree. */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

/** Inline style for the `--delay` custom property used by the CSS entrance animations. */
export function delay(ms: number): React.CSSProperties {
  return { "--delay": `${ms}ms` } as React.CSSProperties;
}
