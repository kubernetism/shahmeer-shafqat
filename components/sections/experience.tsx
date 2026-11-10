import { education, experience, languages, roles, toolkit } from "@/content/site";
import type { Experience as Role, SkillGroup } from "@/content/types";
import { Eyebrow, container } from "@/components/ui/eyebrow";
import { Ruler } from "@/components/ui/ruler";
import { cn } from "@/lib/cn";

/* Roles, toolkit, languages and study are edited in content/site.ts. */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 md:py-36">
      <div className={cn(container, "grid gap-12 lg:grid-cols-12 lg:gap-8")}>
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow className="text-muted">{experience.eyebrow}</Eyebrow>
            <h2
              id="experience-title"
              className="mt-6 max-w-[14ch] text-[clamp(2.5rem,5vw,4rem)] leading-[0.98] font-medium tracking-[-0.05em] text-balance"
            >
              {experience.title}
            </h2>
            <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-muted text-pretty md:text-lg">
              {experience.intro}
            </p>
          </div>
        </div>

        <ol className="lg:col-span-8">
          {roles.map((role, i) => (
            <RoleItem key={role.id} role={role} index={i} />
          ))}
        </ol>
      </div>

      <div className={cn(container, "mt-20 md:mt-28")}>
        <Ruler className="h-6 text-ink/25" fade="both" index={50} />
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-medium tracking-[-0.045em] lg:col-span-4">
            {experience.skillsTitle}
          </h3>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {toolkit.map((group) => (
              <ChipGroup key={group.id} group={group} />
            ))}
            <ChipGroup group={languages} />
            <div data-reveal>
              <h4 className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">{experience.studyLabel}</h4>
              <ul className="mt-4 space-y-3">
                {education.map((item) => (
                  <li key={item.qualification} className="text-base leading-snug">
                    <span className="font-medium">{item.qualification}</span>
                    <span className="block text-sm text-muted">
                      {item.institution} · {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleItem({ role, index }: { role: Role; index: number }) {
  const when = role.period ?? (role.current ? "Current" : undefined);
  return (
    <li data-reveal className="border-t border-line py-8 last:border-b md:py-10">
      <div className="grid gap-5 md:grid-cols-[9.5rem_1fr] md:gap-8">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] text-muted uppercase md:flex-col md:items-start md:gap-2 md:pt-2">
          <span aria-hidden="true" className="text-ink/40 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          {when ? (
            <span className={cn("inline-flex items-center gap-2", role.current && "text-ink")}>
              {role.current ? (
                <span aria-hidden="true" className="size-1.5 rounded-full bg-magenta shadow-[0_0_8px_var(--color-magenta)]" />
              ) : null}
              {when}
            </span>
          ) : null}
        </div>

        <div className="min-w-0">
          <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.05] font-medium tracking-[-0.04em] text-balance">
            {role.role}
          </h3>
          <p className="mt-3 text-base font-medium text-ink">
            {role.organization}
            {role.location ? <span className="font-normal text-muted"> · {role.location}</span> : null}
          </p>
          <ul className="mt-4 max-w-[60ch] space-y-2 text-base leading-relaxed text-muted text-pretty">
            {role.highlights.map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-current opacity-60" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${role.organization}: focus`}>
            {role.focus.map((item) => (
              <li
                key={item}
                className="rounded-full bg-mist px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-ink/80 uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

function ChipGroup({ group }: { group: SkillGroup }) {
  const labelId = `skills-${group.id}`;
  return (
    <div data-reveal>
      <h4 id={labelId} className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
        {group.label}
      </h4>
      <ul aria-labelledby={labelId} className="mt-4 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li key={item} className="rounded-full border border-line px-3.5 py-1.5 text-sm font-medium tracking-[-0.01em]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
