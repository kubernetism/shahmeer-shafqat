import Image from "next/image";
import { contact, footer, nav, sessionTypes, site } from "@/content/site";
import { ArrowAction } from "@/components/ui/arrow-action";
import { container } from "@/components/ui/eyebrow";
import { Ruler } from "@/components/ui/ruler";
import { ContactForm } from "@/components/contact-form";
import { cn } from "@/lib/cn";

/* Contact and footer share one full-bleed photo, as in the design. */
export function ContactAndFooter() {
  return (
    <div data-on-dark className="relative isolate overflow-clip bg-night text-white">
      <Image
        src={contact.background.src}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: contact.background.focus }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(18_16_22/0.62),rgb(18_16_22/0.5)_35%,rgb(18_16_22/0.82)_75%,rgb(18_16_22/0.95))]"
      />

      <section id="contact" aria-labelledby="contact-title" className="pt-24 md:pt-36">
        <div className={cn(container, "grid gap-12 lg:grid-cols-12 lg:gap-8")}>
          <div className="lg:col-span-6" data-reveal>
            <h2
              id="contact-title"
              className="max-w-[14ch] text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[1.0] font-medium tracking-[-0.045em] text-balance"
            >
              {contact.headline}
            </h2>
            <p className="mt-5 max-w-[38ch] text-base leading-relaxed text-white/75">
              Weddings, pre-wedding sessions, portraits and campaigns. Tell me about your day and I&apos;ll come back with
              availability and options.
            </p>

            {/* WhatsApp is the recommended first step; the form is the alternative. */}
            <div className="mt-10 max-w-md rounded-card bg-white/8 p-5 ring-1 ring-white/15 backdrop-blur-md sm:p-6">
              <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-white/70 uppercase">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-[#25D366] shadow-[0_0_10px_#25D366]" />
                {contact.whatsappNote}
              </p>
              <a
                href={site.phone.tel}
                className="mt-3 block text-[clamp(1.6rem,3vw,2.25rem)] leading-none font-medium tracking-[-0.03em] tabular-nums hover:underline"
              >
                {site.whatsapp.display}
              </a>
              <ArrowAction href={site.whatsapp.url} tone="light" icon="whatsapp" size="lg" className="mt-5">
                Chat on WhatsApp
              </ArrowAction>
            </div>
            <p className="mt-5 text-sm text-white/65">
              Prefer Instagram?{" "}
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                Message {site.instagram.handle}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>

          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <div className="rounded-card bg-paper p-5 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-8">
              <p className="mb-4 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">Or use the form</p>
              <h3 className="text-[clamp(1.35rem,2.4vw,2rem)] leading-tight font-medium tracking-[-0.035em]">
                {contact.formTitle}
              </h3>
              <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-muted">{contact.intro}</p>
              {site.email ? (
                <p className="mt-2 text-sm text-muted">
                  Or email{" "}
                  <a href={`mailto:${site.email}`} className="font-medium text-ink underline underline-offset-4">
                    {site.email}
                  </a>
                </p>
              ) : null}
              <ContactForm sessionTypes={sessionTypes} whatsappNumber={site.whatsapp.number} />
            </div>
          </div>
        </div>
      </section>

      <footer className={cn(container, "pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] md:pt-36")}>
        <Ruler className="h-8 text-white/35" fade="right" scrub={false} />
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 lg:col-span-5">
            <p className="text-lg font-semibold tracking-[-0.02em]">{site.name}</p>
            <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-white/70">{footer.tagline}</p>
          </div>
          <FooterColumn title="Links" items={footer.links} className="lg:col-span-2 lg:col-start-7" />
          <FooterColumn title="Services" items={footer.services} className="lg:col-span-2" />
          <div className="lg:col-span-2">
            <p className="font-mono text-[10px] tracking-[0.14em] text-white/50 uppercase">Contact</p>
            <ul className="mt-4 grid gap-2.5 text-[15px]">
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Instagram
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={site.whatsapp.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={site.phone.tel} className="whitespace-nowrap tabular-nums hover:underline">
                  {site.phone.display}
                </a>
              </li>
              {site.email ? (
                <li>
                  <a href={`mailto:${site.email}`} className="hover:underline">
                    Email
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-white/55">
          <p>
            © {site.copyrightYear} {site.name} · {site.brand}
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#top" className="text-white/80 hover:text-white">
                  Back to top ↑
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({
  title,
  items,
  className,
}: {
  title: string;
  items: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-[10px] tracking-[0.14em] text-white/50 uppercase">{title}</p>
      <ul className="mt-4 grid gap-2.5 text-[15px]">
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="hover:underline">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
