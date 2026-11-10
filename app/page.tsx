import { nav, services, site } from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Portfolio } from "@/components/sections/portfolio";
import { Films } from "@/components/sections/films";
import { Services } from "@/components/sections/services";
import { Cta } from "@/components/sections/cta";
import { Blog } from "@/components/sections/blog";
import { ContactAndFooter } from "@/components/sections/contact";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { CreditMarquee } from "@/components/credit-marquee";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-tile bg-paper px-4 py-3 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <CreditMarquee />
      <SiteHeader nav={nav} email={site.email} instagram={site.instagram} whatsapp={site.whatsapp} />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Portfolio />
        <Films />
        <Services services={services} />
        <Cta />
        <Blog />
      </main>
      <ContactAndFooter />
      <WhatsAppFloat href={site.whatsapp.url} />
    </>
  );
}
