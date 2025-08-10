"use client";
import { ImageWithFallback as Image } from "@/components/ImageWithFallback";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";

export function HeroFeatured({
  post,
}: {
  post: { slug: string; title: string; excerpt: string; cover: string };
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-md">
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <motion.div
          initial={false}
          animate={undefined}
          transition={undefined}
          className="p-5 sm:p-8 md:p-10 lg:p-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-muted leading-relaxed max-w-prose">
            {post.excerpt}
          </p>
          <div className="mt-6 flex gap-3">
            <Link href={`/blog/${post.slug}`}>
              <Button variant="primary">Read the article</Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline">Browse all posts</Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={false}
          animate={undefined}
          transition={undefined}
          className="relative min-h-64 bg-[url('/images/placeholder.svg')] bg-cover bg-center"
        >
          <Image
            src={post.cover}
            alt=""
            fill
            className="object-cover opacity-100 transition-opacity duration-200 ease-out motion-reduce:transition-none hover:opacity-95 focus-within:opacity-95 active:opacity-95"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}


