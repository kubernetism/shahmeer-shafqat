import type { StaticImageData } from "next/image";

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position for crops, e.g. "50% 30%". Defaults to centre. */
  focus?: string;
};

export type NavItem = { label: string; href: `#${string}` };

export type Stat = { value: string; label: string; photo: Photo };

export type PortfolioCategory = "bridal" | "couples" | "portraits" | "campaigns";

export type PortfolioItem = Photo & {
  id: string;
  title: string;
  category: PortfolioCategory;
};

/**
 * Where a film plays from. Add one to a film and its card becomes playable.
 * - youtube: the video id (the part after `v=`), e.g. "dQw4w9WgXcQ"
 * - vimeo:   the numeric id, e.g. "76979871"
 * - mp4:     a URL or a path under /public, e.g. "/films/showreel.mp4"
 */
export type FilmSource =
  | { provider: "youtube"; id: string }
  | { provider: "vimeo"; id: string }
  | { provider: "mp4"; src: string };

export type Film = {
  id: string;
  title: string;
  /** Short line under the title, e.g. "Baraat & Walima · Lahore". */
  subtitle: string;
  year: string;
  /** "mm:ss". Optional until the edit is final. */
  duration?: string;
  poster: Photo;
  /** `null` = not published yet. The card shows "Coming soon" and no play button. */
  video: FilmSource | null;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  includes: string[];
  photo: Photo;
};

export type BlogPost = {
  id: string;
  title: string;
  category: string;
  /** ISO date, e.g. "2026-10-04". */
  date: string;
  photo: Photo;
  /** Leave undefined until the post exists; the card then renders without a link. */
  href?: string;
};

export type SessionType = { value: string; label: string };
