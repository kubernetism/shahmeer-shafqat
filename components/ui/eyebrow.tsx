import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared page gutter and max width. */
export const container = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 xl:px-12";

/** Small uppercase section label ("ABOUT" in the design). */
export function Eyebrow({
  as: Tag = "p",
  id,
  children,
  className,
}: {
  as?: ElementType;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag id={id} className={cn("flex items-center gap-2.5 text-[13px] font-medium tracking-[0.06em] uppercase", className)}>
      <span aria-hidden="true" className="h-px w-5 bg-current opacity-50" />
      {children}
    </Tag>
  );
}
