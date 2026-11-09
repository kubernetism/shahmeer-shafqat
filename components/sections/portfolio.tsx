import { portfolio, portfolioCategories, site } from "@/content/site";
import { Eyebrow, container } from "@/components/ui/eyebrow";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { cn } from "@/lib/cn";

export function Portfolio() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="bg-mist py-24 md:py-32">
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow className="text-muted">Portfolio</Eyebrow>
            <h2
              id="portfolio-title"
              className="mt-6 text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.05em]"
            >
              Selected work
              <sup className="ml-2 align-super font-mono text-[0.22em] font-normal tracking-normal text-muted tabular-nums">
                ({portfolio.length})
              </sup>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="max-w-[46ch] text-base leading-relaxed text-muted text-pretty md:text-lg">
              Baraats, nikkahs, walimas and the quiet portraits in between, plus campaigns for designers and boutiques.
              Tap any photo to see it full screen.
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-4 inline-flex items-center gap-2 text-sm font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-ink",
              )}
            >
              More on Instagram {site.instagram.handle}
              <span className="sr-only"> (opens in a new tab)</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <PortfolioGallery items={portfolio} categories={portfolioCategories} />
        </div>
      </div>
    </section>
  );
}
