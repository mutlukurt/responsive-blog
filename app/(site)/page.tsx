import { HeroFeatured } from "@/components/HeroFeatured";
import { PostList } from "@/components/PostList";
import { getAllPosts, type PostFrontmatter } from "@/lib/posts";

export default function LandingPage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest: PostFrontmatter[] = posts
    .filter((p) => p.slug !== featured.slug)
    .slice(0, 6);
  return (
    <div className="space-y-10">
      <HeroFeatured
        post={{ slug: featured.slug, title: featured.title, excerpt: featured.excerpt, cover: featured.cover }}
      />
      <section aria-labelledby="recent-posts">
        <div className="flex items-center justify-between mb-4">
          <h2 id="recent-posts" className="text-xl font-bold">Featured posts</h2>
        </div>
        <PostList posts={rest} />
      </section>
    </div>
  );
}


