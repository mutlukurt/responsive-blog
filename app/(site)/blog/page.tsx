import Link from "next/link";
import { getAllPosts, searchPosts, type PostFrontmatter } from "@/lib/posts";
import { PostList } from "@/components/PostList";
import { Sidebar } from "@/components/Sidebar";
import { Pagination } from "@/components/Pagination";
import { BlogFilters } from "@/components/BlogFilters";
import { EmptyState } from "@/components/EmptyState";
import { Newsletter } from "@/components/Newsletter";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export const dynamic = "force-static";

export default async function BlogIndex({ searchParams }: Props) {
  const sp = await searchParams;
  const q = (sp.q as string) ?? "";
  const category = (sp.category as string) ?? "all";
  const page = Number(sp.page ?? 1);
  const PAGE_SIZE = 6;

  let posts: PostFrontmatter[] = q ? searchPosts(q) : getAllPosts();
  if (category !== "all") {
    posts = posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const paged = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
      <section className="space-y-6">
        <h1 className="text-2xl font-bold">All Posts</h1>
        {paged.length === 0 ? <EmptyState title="No results" description="Try a different search or category." /> : <PostList posts={paged} />}
        <Pagination
          page={page}
          totalPages={totalPages}
          hrefFor={(p) => `/blog?${new URLSearchParams({ q, category, page: String(p) }).toString()}`}
        />
      </section>
      <aside className="space-y-8" aria-label="Sidebar">
        <BlogFilters />
        <Sidebar posts={getAllPosts()} />
        <Newsletter />
      </aside>
    </div>
  );
}


