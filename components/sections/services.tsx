"use client";

import Image from "next/image";
import { useState } from "react";
import type { Service } from "@/content/types";
import { ArrowAction } from "@/components/ui/arrow-action";
import { Eyebrow, container } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

/*
 * "Events" in the nav. On large screens a sticky photo follows the row you
 * hover or focus; on smaller screens each row carries its own thumbnail.
 */
export function Services({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);

  return (
    <section id="services" aria-labelledby="services-title" className="py-24 md:py-36">
      <div className={cn(container, "grid gap-12 lg:grid-cols-12 lg:gap-8")}>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Eyebrow className="text-muted">Events &amp; services</Eyebrow>
            <h2
              id="services-title"
              className="mt-6 text-[clamp(2.75rem,6vw,4.75rem)] leading-[0.95] font-medium tracking-[-0.05em]"
            >
              What I cover
            </h2>
            <div className="relative mt-10 hidden aspect-[4/5] w-full max-w-md overflow-hidden rounded-card bg-mist lg:block">
              {services.map((service, i) => (
                <Image
                  key={service.id}
                  src={service.photo.src}
                  alt={i === active ? service.photo.alt : ""}
                  aria-hidden={i === active ? undefined : true}
                  fill
                  sizes="(min-width: 1440px) 448px, 36vw"
                  className={cn(
                    "object-cover transition-[opacity,scale] duration-700 ease-out-expo",
                    i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                  )}
                  style={{ objectPosition: service.photo.focus }}
                />
              ))}
              <span className="absolute bottom-4 left-4 rounded-full bg-black/45 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-white uppercase backdrop-blur-md">
                {services[active]?.title}
              </span>
            </div>
          </div>
        </div>

        <ul className="lg:col-span-7 lg:pt-24">
          {services.map((service, i) => {
            const isActive = i === active;
            return (
              <li
                key={service.id}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group border-t border-line py-7 last:border-b md:py-9"
              >
                <div className="flex gap-5">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-tile bg-mist sm:size-24 lg:hidden">
                    <Image
                      src={service.photo.src}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                      style={{ objectPosition: service.photo.focus }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-6">
                      <h3
                        className={cn(
                          "text-[clamp(1.75rem,4vw,3.25rem)] leading-none font-medium tracking-[-0.045em] transition-colors duration-500",
                          isActive ? "text-ink" : "text-ink lg:text-ink/50",
                        )}
                      >
                        {service.title}
                      </h3>
                      <div className="hidden shrink-0 sm:block">
                        <ArrowAction href="#contact">
                          Enquire<span className="sr-only"> about {service.title}</span>
                        </ArrowAction>
                      </div>
                    </div>
                    <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted text-pretty">{service.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${service.title} includes`}>
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-mist px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-ink/80 uppercase"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium underline decoration-line underline-offset-4 sm:hidden"
                    >
                      Enquire<span className="sr-only"> about {service.title}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
