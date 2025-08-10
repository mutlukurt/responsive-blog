import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

export function H1(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 {...props} className={cn("mt-8 scroll-mt-24 text-3xl font-bold", props.className)} />;
}
export function H2(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 id={slugify(props.children)} {...props} className={cn("mt-10 scroll-mt-24 text-2xl font-bold", props.className)} />;
}
export function H3(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 id={slugify(props.children)} {...props} className={cn("mt-8 scroll-mt-24 text-xl font-semibold", props.className)} />;
}

export function Blockquote(props: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      {...props}
      className={cn("border-l-4 border-[--accent-1] pl-4 italic text-muted", props.className)}
    />
  );
}

export function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      {...props}
      className={cn(
        "rounded-2xl border border-border bg-[color:oklch(98%_0.01_0)/0.6] dark:bg-[color:oklch(15%_0.02_257)/0.6] p-4 overflow-x-auto",
        props.className
      )}
    />
  );
}

export function Code(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      {...props}
      className={cn(
        "rounded-md bg-black/5 dark:bg-white/10 px-1.5 py-0.5 text-[0.95em]",
        props.className
      )}
    />
  );
}

export function Callout({ type = "info", children }: { type?: "info" | "warning" | "success"; children: React.ReactNode }) {
  const colors = {
    info: "border-[--accent-1]/40 bg-[--accent-1]/5",
    warning: "border-[#f59e0b]/40 bg-[#f59e0b]/5",
    success: "border-[#10b981]/40 bg-[#10b981]/5",
  } as const;
  return (
    <div className={cn("my-4 rounded-xl border p-3 text-sm", colors[type])}>{children}</div>
  );
}

export function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-6">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  blockquote: Blockquote,
  pre: Pre,
  code: Code,
  Callout,
  Figure,
};

function slugify(children: React.ReactNode | undefined) {
  if (!children) return undefined;
  const text = Array.isArray(children) ? children.join(" ") : String(children);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}


