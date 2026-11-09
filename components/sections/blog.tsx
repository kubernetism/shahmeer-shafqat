import Image from "next/image";
import { blog, posts } from "@/content/site";
import type { BlogPost } from "@/content/types";
import { ArrowAction } from "@/components/ui/arrow-action";
import { container } from "@/components/ui/eyebrow";
import { Ruler } from "@/components/ui/ruler";
import { cn, formatDate } from "@/lib/cn";

export function Blog() {
  const [lead, ...others] = posts;
  return (
    <section id="blog" aria-labelledby="blog-title" className="py-24 md:py-36">
      <div className={container}>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div className="max-w-xl">
            <h2 id="blog-title" className="text-[clamp(2.5rem,5vw,4rem)] leading-[0.98] font-medium tracking-[-0.045em]">
              {blog.title}
            </h2>
            <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-muted text-pretty">{blog.intro}</p>
          </div>
          <Ruler className="hidden h-10 min-w-48 flex-1 text-ink/25 md:block" fade="left" />
        </div>

        <div className="mt-12 grid gap-x-4 gap-y-10 md:mt-16 lg:grid-cols-12">
          {lead ? <PostCard post={lead} className="lg:col-span-6" imageClass="aspect-[4/3] lg:aspect-[5/4]" lead /> : null}
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-4 lg:col-span-6 lg:grid-rows-[auto_1fr]">
            {others.map((post) => (
              <PostCard key={post.id} post={post} imageClass="aspect-[11/12]" />
            ))}
            <div className="col-span-2 flex items-end justify-end">
              <ArrowAction href={blog.more.href}>{blog.more.label}</ArrowAction>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PostCard({
  post,
  className,
  imageClass,
  lead = false,
}: {
  post: BlogPost;
  className?: string;
  imageClass: string;
  lead?: boolean;
}) {
  const title = (
    <h3
      className={cn(
        "mt-2 font-medium tracking-[-0.025em] text-pretty",
        lead ? "text-[clamp(1.25rem,2vw,1.6rem)] leading-tight" : "text-base leading-snug sm:text-lg",
      )}
    >
      {post.href ? (
        <a href={post.href} className="after:absolute after:inset-0">
          {post.title}
        </a>
      ) : (
        post.title
      )}
    </h3>
  );

  return (
    <article className={cn("group relative min-w-0", className)} data-reveal>
      <div className={cn("relative overflow-hidden rounded-tile bg-mist", imageClass)}>
        <Image
          src={post.photo.src}
          alt={post.photo.alt}
          fill
          placeholder="blur"
          sizes={lead ? "(min-width: 1024px) 48vw, 100vw" : "(min-width: 1024px) 24vw, 50vw"}
          className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
          style={{ objectPosition: post.photo.focus }}
        />
      </div>
      <p className="mt-4 font-mono text-[11px] tracking-[0.08em] text-muted">
        {post.category}, <time dateTime={post.date}>{formatDate(post.date)}</time>
      </p>
      {title}
    </article>
  );
}
