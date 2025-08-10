"use client";
import { PostCard } from "@/components/PostCard";
import type { PostFrontmatter } from "@/lib/posts";
import { ViewToggle } from "@/components/ViewToggle";
import { useSearchParams } from "next/navigation";

export function PostList({ posts }: { posts: PostFrontmatter[] }) {
  const sp = useSearchParams();
  const view = (sp.get("view") ?? "grid") as "grid" | "list";
  return (
    <div className="space-y-4" style={{ containIntrinsicSize: "1px 1000px" }}>
      <div className="flex items-center justify-end">
        <ViewToggle />
      </div>
      <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "grid grid-cols-1 gap-4"}>
        {posts.map((p, i) => (
          <PostCard key={p.slug} post={p} isEager={i < 6} />
        ))}
      </div>
    </div>
  );
}


