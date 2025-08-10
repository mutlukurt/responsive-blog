import { getPostsByCategory, type PostFrontmatter, getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/PostList";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";

export async function generateStaticParams() {
  const categories = Array.from(new Set(getAllPosts().map((p) => p.category)));
  return categories.map((c) => ({ slug: c }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const name = decodeURIComponent(slug);
  const posts: PostFrontmatter[] = getPostsByCategory(name);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Category: {name}</h1>
      {posts.length === 0 ? (
        <p className="text-muted">No posts in this category yet.</p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}


