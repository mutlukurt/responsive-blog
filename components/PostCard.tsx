"use client";
import { ImageWithFallback as Image } from "@/components/ImageWithFallback";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { formatDate, cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
  author: { name: string; avatar: string };
};

export function PostCard({ post, className, isEager = false }: { post: Post; className?: string; isEager?: boolean }) {
  const shouldAnimate = false; // Disable list item fade/slide animations to avoid flash perception

  return (
    <motion.article
      initial={false}
      whileInView={undefined}
      viewport={undefined}
      transition={undefined}
      style={{ contentVisibility: "auto" }}
      className={cn(
        "group overflow-hidden rounded-2xl bg-surface border border-border shadow-sm hover:shadow-lg transition will-change-transform",
        className
      )}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-[url('/images/placeholder.svg')] bg-cover bg-center">
          <Image
            src={post.cover}
            alt=""
            fill
            className="object-cover transform-gpu [animation:none]"
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            // Eager load first items above the fold to avoid placeholder swap flash on first paint
            priority={isEager}
          />
          <div className="absolute top-3 left-3">
            <Badge>{post.category}</Badge>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-base sm:text-lg font-semibold line-clamp-2 group-hover:underline">
            {post.title}
          </h3>
          <p className="mt-2 text-sm sm:text-[0.95rem] text-muted line-clamp-3 min-h-[3.5rem]">{post.excerpt}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted">
            <Image
              src={post.author.avatar}
              alt=""
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="sr-only">Author</span>
            <span>{post.author.name}</span>
            <span aria-hidden>•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>•</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}


