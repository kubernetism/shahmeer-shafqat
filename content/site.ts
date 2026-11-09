/**
 * All copy and data for the site lives here.
 *
 * Anything marked `TODO: confirm with client` is a placeholder. Replace it
 * before launch. Photos are imported statically so Next.js knows their size
 * and can generate blur placeholders.
 */
import type {
  BlogPost,
  Film,
  NavItem,
  Photo,
  PortfolioCategory,
  PortfolioItem,
  Service,
  SessionType,
  Stat,
} from "./types";

import heroImage from "@/public/images/hero.webp";
import aboutSilhouette from "@/public/images/about/shah-meer-silhouette.webp";

import campaignRanaBoutique from "@/public/images/work/campaign-rana-boutique.webp";
import campaignCoutureDetail01 from "@/public/images/work/campaign-couture-detail-01.webp";
import campaignCoutureDetail02 from "@/public/images/work/campaign-couture-detail-02.webp";
import campaignCoutureTrain from "@/public/images/work/campaign-couture-train.webp";
import campaignRedGownCourtyard from "@/public/images/work/campaign-red-gown-courtyard.webp";
import campaignSapphireTrain from "@/public/images/work/campaign-sapphire-train.webp";
import campaignPlumLehenga from "@/public/images/work/campaign-plum-lehenga.webp";
import coupleStaircaseTwirl from "@/public/images/work/couple-staircase-twirl.webp";
import coupleGoldLehenga from "@/public/images/work/couple-gold-lehenga.webp";
import coupleDuskTerrace from "@/public/images/work/couple-dusk-terrace.webp";
import coupleNightArrival from "@/public/images/work/couple-night-arrival.webp";
import coupleNightWalk from "@/public/images/work/couple-night-walk.webp";
import portraitSilverWoodenDoor from "@/public/images/work/portrait-silver-wooden-door.webp";
import portraitSilverCloseup from "@/public/images/work/portrait-silver-closeup.webp";
import portraitSilverBalcony from "@/public/images/work/portrait-silver-balcony.webp";
import portraitSilverDoorway from "@/public/images/work/portrait-silver-doorway.webp";
import portraitCrimsonStairs from "@/public/images/work/portrait-crimson-stairs.webp";
import portraitCrimsonSalon from "@/public/images/work/portrait-crimson-salon.webp";
import portraitMonochromeDoorway from "@/public/images/work/portrait-monochrome-doorway.webp";
import portraitCrimsonStaircaseSeated from "@/public/images/work/portrait-crimson-staircase-seated.webp";
import portraitCrimsonRailing from "@/public/images/work/portrait-crimson-railing.webp";
import bridalGildedArcade from "@/public/images/work/bridal-gilded-arcade.webp";
import bridalBalconyGlow from "@/public/images/work/bridal-balcony-glow.webp";
import bridalBrickArch from "@/public/images/work/bridal-brick-arch.webp";
import bridalHeritageCourtyard from "@/public/images/work/bridal-heritage-courtyard.webp";
import bridalGardenTerrace from "@/public/images/work/bridal-garden-terrace.webp";
import bridalDoorwayLight from "@/public/images/work/bridal-doorway-light.webp";
import bridalFortWall from "@/public/images/work/bridal-fort-wall.webp";
import bridalPavilionSeated from "@/public/images/work/bridal-pavilion-seated.webp";
import bridalPavilionBlue from "@/public/images/work/bridal-pavilion-blue.webp";
import bridalPavilionSpread from "@/public/images/work/bridal-pavilion-spread.webp";
import bridalPavilionWide from "@/public/images/work/bridal-pavilion-wide.webp";
import bridalPavilionStanding from "@/public/images/work/bridal-pavilion-standing.webp";
import bridalPavilionProfile from "@/public/images/work/bridal-pavilion-profile.webp";
import bridalLanternsFull from "@/public/images/work/bridal-lanterns-full.webp";
import bridalLanternsHenna from "@/public/images/work/bridal-lanterns-henna.webp";
import bridalLanternsGlow from "@/public/images/work/bridal-lanterns-glow.webp";
import bridalLanternsPose from "@/public/images/work/bridal-lanterns-pose.webp";
import bridalLanternsDance from "@/public/images/work/bridal-lanterns-dance.webp";
import bridalLanternWall from "@/public/images/work/bridal-lantern-wall.webp";
import bridalWhiteWallSmile from "@/public/images/work/bridal-white-wall-smile.webp";
import bridalMeadowCloseup from "@/public/images/work/bridal-meadow-closeup.webp";
import bridalColonnade from "@/public/images/work/bridal-colonnade.webp";
import bridalPalmGarden from "@/public/images/work/bridal-palm-garden.webp";
import bridalPalmCloseup from "@/public/images/work/bridal-palm-closeup.webp";
import bridalWhitePavilionSeated from "@/public/images/work/bridal-white-pavilion-seated.webp";
import bridalWhitePavilionTwirl from "@/public/images/work/bridal-white-pavilion-twirl.webp";
import bridalRedReverie from "@/public/images/work/bridal-red-reverie.webp";
import bridalJaaliSmile from "@/public/images/work/bridal-jaali-smile.webp";
import bridalWhiteArchSmile from "@/public/images/work/bridal-white-arch-smile.webp";
import bridalTealThrone from "@/public/images/work/bridal-teal-throne.webp";

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

export const site = {
  name: "Shah Meer Shafqat",
  brand: "Weddings by Meer",
  role: "Wedding photographer & filmmaker",
  /** The giant name across the bottom of the hero. `short` is used on phones. */
  wordmark: { full: "SHAH MEER", short: "MEER" },
  url: "https://shahmeershafqat.com", // TODO: confirm with client (final domain)
  location: "Based in Pakistan · Travels for weddings", // TODO: confirm with client (city)
  /** No inbox yet. Set this (e.g. "hello@shahmeershafqat.com") and email links appear in the menu, contact card and footer. */
  email: undefined as string | undefined,
  /** Confirmed by the client. WhatsApp is the recommended way to get in touch. */
  phone: { display: "+92 312 2211268", tel: "tel:+923122211268" },
  whatsapp: {
    display: "+92 312 2211268",
    /** Digits only, international format, for wa.me links. */
    number: "923122211268",
    /** wa.me link with a pre-filled first message. */
    url: `https://wa.me/923122211268?text=${encodeURIComponent("Hi Shah Meer, I'd like to enquire about a shoot.")}`,
  },
  instagram: {
    handle: "@weddingsbymeer",
    url: "https://www.instagram.com/weddingsbymeer/",
  },
  copyrightYear: 2026,
  seo: {
    title: "Shah Meer Shafqat · Wedding Photographer & Filmmaker",
    description:
      "Wedding photography and films by Shah Meer Shafqat (Weddings by Meer): baraat, nikkah, walima, pre-wedding, bridal portraits and brand campaigns.",
  },
} as const;

export const nav: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Films", href: "#films" },
  { label: "Events", href: "#services" },
  { label: "Blog", href: "#blog" },
];

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Wedding photographer & filmmaker",
  headline: ["Capturing", "stories that", "last a lifetime"],
  cta: { label: "View Portfolio", href: "#portfolio" },
  image: {
    src: heroImage,
    alt: "Shah Meer Shafqat: photography and videography",
  } satisfies Photo,
  card: {
    label: "Wedding",
    photo: {
      src: bridalLanternsFull,
      alt: "Bride in a red lehenga in front of glowing lantern-lit arches at night",
      focus: "50% 35%",
    } satisfies Photo,
  },
};

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  // TODO: confirm with client (bio copy)
  statement:
    "Photography captures emotions beyond beautiful pictures. Whether it is a baraat, a quiet nikkah, a family portrait or a brand campaign,",
  statementMuted:
    "I focus on genuine moments that reflect who you are, and turn them into memories that last.",
  signature: "Shah Meer Shafqat, founder of Weddings by Meer",
  cta: { label: "Learn More", href: "#services" },
  photo: {
    src: aboutSilhouette,
    alt: "A photographer in silhouette raising a telephoto lens against a bright sky",
  } satisfies Photo,
};

// TODO: confirm with client (all three figures are from the design mockup)
export const stats: Stat[] = [
  {
    value: "10+",
    label: "Years of Experience",
    photo: {
      src: bridalLanternsGlow,
      alt: "Bride with henna-painted hands lit by warm lantern bokeh",
      focus: "50% 40%",
    },
  },
  {
    value: "3.1K+",
    label: "Photoshoots Completed",
    photo: {
      src: bridalPavilionBlue,
      alt: "Bride seated in a white marble pavilion against a deep blue evening sky",
      focus: "50% 45%",
    },
  },
  {
    value: "3.5K+",
    label: "Happy Clients",
    photo: {
      src: bridalWhitePavilionSeated,
      alt: "Bride seated on a carved white bench between sheer curtains",
      focus: "50% 55%",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Portfolio                                                           */
/* ------------------------------------------------------------------ */

export const portfolioCategories: { value: PortfolioCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "bridal", label: "Bridal" },
  { value: "couples", label: "Couples" },
  { value: "portraits", label: "Portraits" },
  { value: "campaigns", label: "Campaigns" },
];

// Order is the display order. Mixing aspect ratios keeps the masonry lively.
// TODO: confirm with client (brand/client credits for campaign images)
export const portfolio: PortfolioItem[] = [
  { id: "pavilion-seated", category: "bridal", title: "The marble pavilion", src: bridalPavilionSeated, alt: "Bride in a red and gold lehenga seated under a marble arch at dusk" },
  { id: "couture-train", category: "campaigns", title: "Couture, in motion", src: campaignCoutureTrain, alt: "Bride walking away along a terrace, an embroidered dupatta trailing behind her" },
  { id: "lanterns-henna", category: "bridal", title: "Lantern light", src: bridalLanternsHenna, alt: "Bride lifting her henna-painted hands in warm lantern light" },
  { id: "staircase-twirl", category: "couples", title: "First dance on the stairs", src: coupleStaircaseTwirl, alt: "Groom twirling the bride at the foot of a sweeping marble staircase" },
  { id: "silver-wooden-door", category: "portraits", title: "Silver and timber", src: portraitSilverWoodenDoor, alt: "Woman in a silver embroidered gown in front of weathered wooden doors" },
  { id: "red-reverie", category: "bridal", title: "Reverie", src: bridalRedReverie, alt: "Bride reclining, one hand resting on her head, red lehenga spread around her" },
  { id: "gilded-arcade", category: "bridal", title: "Gilded arcade", src: bridalGildedArcade, alt: "Bride framed by warm-lit columns in a gilded arcade" },
  { id: "rana-boutique", category: "campaigns", title: "Boutique campaign", src: campaignRanaBoutique, alt: "Overhead shot of a model in a red and gold gown fanned out across the floor" },
  { id: "night-walk", category: "couples", title: "After the vows", src: coupleNightWalk, alt: "Couple walking arm in arm outside a glowing house at night" },
  { id: "brick-arch", category: "bridal", title: "Old brick arches", src: bridalBrickArch, alt: "Bride standing beneath weathered brick arches in soft afternoon light" },
  { id: "crimson-stairs", category: "portraits", title: "Crimson", src: portraitCrimsonStairs, alt: "Portrait of a woman in crimson seated on a marble staircase" },
  { id: "sapphire-train", category: "campaigns", title: "Sapphire", src: campaignSapphireTrain, alt: "Model in a sapphire gown with a long train in a villa courtyard" },
  { id: "pavilion-wide", category: "bridal", title: "Blue hour", src: bridalPavilionWide, alt: "Wide view of a bride seated beneath a white pavilion as the sky turns blue" },
  { id: "silver-balcony", category: "portraits", title: "Morning balcony", src: portraitSilverBalcony, alt: "Woman in a pale silver gown leaning on a wooden balcony rail" },
  { id: "palm-garden", category: "bridal", title: "Palm garden", src: bridalPalmGarden, alt: "Bride standing between tall hedges beneath a palm" },
  { id: "dusk-terrace", category: "couples", title: "Dusk terrace", src: coupleDuskTerrace, alt: "Couple standing together on a rooftop terrace at dusk" },
  { id: "white-pavilion-twirl", category: "bridal", title: "The twirl", src: bridalWhitePavilionTwirl, alt: "Bride mid-twirl, her lehenga flaring in a white courtyard" },
  { id: "couture-detail-01", category: "campaigns", title: "Hands and gold", src: campaignCoutureDetail01, alt: "Close-up of hands with rings and bangles resting on a gold embroidered gown" },
  { id: "monochrome-doorway", category: "portraits", title: "Monochrome", src: portraitMonochromeDoorway, alt: "Black and white portrait of a woman standing in an ornate doorway" },
  { id: "lanterns-dance", category: "bridal", title: "Dance of light", src: bridalLanternsDance, alt: "Bride turning gracefully in front of glowing arches at night" },
  { id: "jaali-smile", category: "bridal", title: "Jaali", src: bridalJaaliSmile, alt: "Smiling bride resting her chin on her hand beside a carved white jaali screen" },
  { id: "gold-lehenga", category: "couples", title: "Gold on grey", src: coupleGoldLehenga, alt: "Couple on stone stairs, the bride in a gold embroidered gown" },
  { id: "plum-lehenga", category: "campaigns", title: "Plum and gold", src: campaignPlumLehenga, alt: "Model in a plum lehenga standing before an arched window" },
  { id: "fort-wall", category: "bridal", title: "Fort wall", src: bridalFortWall, alt: "Bride leaning against a sunlit fort wall" },
  { id: "silver-doorway", category: "portraits", title: "The doorway", src: portraitSilverDoorway, alt: "Woman in silver reaching across a carved wooden doorway" },
  { id: "pavilion-profile", category: "bridal", title: "Profile", src: bridalPavilionProfile, alt: "Bride in profile under a marble arch with hills behind" },
  { id: "red-gown-courtyard", category: "campaigns", title: "Courtyard", src: campaignRedGownCourtyard, alt: "Model in a red gown in a classical courtyard with stone urns" },
  { id: "colonnade", category: "bridal", title: "Colonnade", src: bridalColonnade, alt: "Bride standing in a white colonnade with blue doors behind her" },
  { id: "staircase-seated", category: "portraits", title: "Sunday stairs", src: portraitCrimsonStaircaseSeated, alt: "Woman in red seated on a golden marble staircase" },
  { id: "garden-terrace", category: "bridal", title: "Garden terrace", src: bridalGardenTerrace, alt: "Bride on a stone garden terrace in golden light" },
  { id: "balcony-glow", category: "bridal", title: "Balcony glow", src: bridalBalconyGlow, alt: "Bride at a balcony rail, lit by warm evening lights" },
  { id: "couture-detail-02", category: "campaigns", title: "Rings", src: campaignCoutureDetail02, alt: "Close-up of henna-patterned hands adjusting rings" },
  { id: "palm-closeup", category: "bridal", title: "Garden light", src: bridalPalmCloseup, alt: "Close portrait of a bride in a garden with soft green background" },
  { id: "crimson-railing", category: "portraits", title: "Wrought iron", src: portraitCrimsonRailing, alt: "Woman in red beside a wrought-iron railing on a spiral staircase" },
  { id: "teal-throne", category: "bridal", title: "Teal throne", src: bridalTealThrone, alt: "Bride seated on a low throne against a teal carved wall" },
  { id: "meadow-closeup", category: "bridal", title: "Meadow", src: bridalMeadowCloseup, alt: "Smiling bride in a red dupatta in a green meadow at sunset" },
  { id: "lantern-wall", category: "bridal", title: "Lantern wall", src: bridalLanternWall, alt: "Bride standing beside a white wall with a black lantern" },
];

/* ------------------------------------------------------------------ */
/* Films                                                               */
/* ------------------------------------------------------------------ */

/**
 * ADD VIDEO LINKS HERE.
 *
 * Every film starts with `video: null`, which shows the poster with a
 * "Coming soon" label and no play button. To publish one, set `video` to:
 *   { provider: "youtube", id: "VIDEO_ID" }
 *   { provider: "vimeo", id: "123456789" }
 *   { provider: "mp4", src: "/films/showreel.mp4" }   // file in /public/films
 * The first film is the large showreel.
 */
export const films: Film[] = [
  {
    id: "showreel",
    title: "Showreel",
    subtitle: "Weddings, portraits and campaigns",
    year: "2026",
    poster: {
      src: campaignRedGownCourtyard,
      alt: "Film still: a bride in a red gown in a classical courtyard",
      focus: "50% 55%",
    },
    video: null, // TODO: confirm with client (showreel URL)
  },
  {
    id: "evening-reception",
    title: "The evening reception",
    subtitle: "Highlight film",
    year: "2026",
    poster: {
      src: coupleNightArrival,
      alt: "Film still: a couple arriving outside a glowing house at night",
      focus: "50% 38%",
    },
    video: null, // TODO: confirm with client
  },
  {
    id: "marble-pavilion",
    title: "Bridal portraits at the pavilion",
    subtitle: "Bridal film",
    year: "2025",
    poster: {
      src: bridalPavilionStanding,
      alt: "Film still: a bride standing beneath a white marble pavilion",
      focus: "50% 55%",
    },
    video: null, // TODO: confirm with client
  },
  {
    id: "heritage-courtyard",
    title: "Heritage courtyard",
    subtitle: "Pre-wedding film",
    year: "2025",
    poster: {
      src: bridalHeritageCourtyard,
      alt: "Film still: a bride in an old brick courtyard",
      focus: "50% 50%",
    },
    video: null, // TODO: confirm with client
  },
];

/* ------------------------------------------------------------------ */
/* Events & services                                                   */
/* ------------------------------------------------------------------ */

// TODO: confirm with client (service list, descriptions and what is included)
export const services: Service[] = [
  {
    id: "weddings",
    title: "Weddings",
    description: "Baraat, nikkah and walima, from getting ready to the rukhsati, covered calmly and completely.",
    includes: ["Photo & film", "Full-day coverage", "Online gallery"],
    photo: { src: bridalPavilionSpread, alt: "Bride seated with her lehenga spread across marble steps", focus: "50% 60%" },
  },
  {
    id: "pre-wedding",
    title: "Pre-wedding",
    description: "Engagement, mehndi and couple sessions at a place that means something to you.",
    includes: ["Location ideas", "Styling advice", "Edited set"],
    photo: { src: coupleDuskTerrace, alt: "Couple standing close on a terrace at dusk", focus: "50% 40%" },
  },
  {
    id: "portraits",
    title: "Portraits",
    description: "Bridal, family and personal portraits, on location or indoors.",
    includes: ["Bridal", "Family", "Personal"],
    photo: { src: portraitCrimsonSalon, alt: "Portrait of a woman in red seated in a tufted chair", focus: "50% 35%" },
  },
  {
    id: "brand",
    title: "Brand & fashion",
    description: "Campaigns and lookbooks for designers and boutiques, in stills and motion.",
    includes: ["Campaigns", "Lookbooks", "Social content"],
    photo: { src: campaignSapphireTrain, alt: "Model in a sapphire gown with a long train", focus: "50% 40%" },
  },
  {
    id: "films",
    title: "Films",
    description: "Cinematic highlight films and full-length edits of your day.",
    includes: ["Highlight film", "Full edit", "Social teaser"],
    photo: { src: coupleNightArrival, alt: "Couple arriving at a glowing house at night", focus: "50% 38%" },
  },
];

/* ------------------------------------------------------------------ */
/* Call to action                                                      */
/* ------------------------------------------------------------------ */

export const cta = {
  headline: ["Your story", "Captured with", "emotion"],
  body: "Choose your date and the coverage you need. I'll confirm availability and hold the day for you.",
  button: { label: "Chat on WhatsApp", href: site.whatsapp.url },
  photos: [
    { src: bridalWhiteArchSmile, alt: "Smiling bride in red beneath a white arch", focus: "50% 30%" },
    { src: bridalDoorwayLight, alt: "Bride standing in a dark doorway with daylight behind her", focus: "50% 45%" },
  ] satisfies [Photo, Photo],
};

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export const blog = {
  title: "Latest from blog",
  intro: "Notes on planning, light and feeling at ease in front of the camera, from a decade of weddings.",
  more: { label: "More Posts", href: site.instagram.url }, // TODO: point to the blog index once it exists
};

// TODO: confirm with client (placeholder posts; add `href` when real posts exist)
export const posts: BlogPost[] = [
  {
    id: "timeline",
    title: "Planning a wedding-day timeline that leaves room for portraits",
    category: "Weddings",
    date: "2026-10-04",
    photo: { src: coupleGoldLehenga, alt: "Couple on stone stairs, the bride in a gold embroidered gown", focus: "50% 40%" },
  },
  {
    id: "at-ease",
    title: "Five ways to feel at ease in front of the camera",
    category: "Portraits",
    date: "2026-09-18",
    photo: { src: portraitSilverCloseup, alt: "Close portrait of a woman in silver resting her chin on her hand", focus: "50% 30%" },
  },
  {
    id: "golden-hour",
    title: "Golden hour or blue hour: choosing light for bridal portraits",
    category: "Guides",
    date: "2026-08-30",
    photo: { src: bridalWhiteWallSmile, alt: "Bride in red smiling beside a white wall at golden hour", focus: "50% 35%" },
  },
];

/* ------------------------------------------------------------------ */
/* Contact & footer                                                    */
/* ------------------------------------------------------------------ */

export const contact = {
  headline: "Let's Create Something Beautiful Together",
  formTitle: "Send your details",
  intro: "Fill this in and tap Send. WhatsApp opens with everything written out, ready to send.",
  whatsappNote: "Recommended · usually the fastest reply",
  background: {
    src: bridalLanternsPose,
    alt: "Bride raising one hand to her forehead in front of glowing lantern-lit arches",
    focus: "50% 35%",
  } satisfies Photo,
};

export const sessionTypes: SessionType[] = [
  { value: "wedding", label: "Wedding" },
  { value: "pre-wedding", label: "Pre-wedding / engagement" },
  { value: "portraits", label: "Portraits" },
  { value: "brand", label: "Brand / fashion" },
  { value: "film", label: "Film only" },
  { value: "other", label: "Something else" },
];

export const footer = {
  tagline: "Timeless photography and film that celebrates genuine emotion, meaningful connection and unforgettable stories.",
  links: [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Blog", href: "#blog" },
  ],
  services: [
    { label: "Weddings", href: "#services" },
    { label: "Portraits", href: "#services" },
    { label: "Brand & fashion", href: "#services" },
    { label: "Films", href: "#films" },
  ],
};
