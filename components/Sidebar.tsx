import Link from "next/link";

type Post = {
  slug: string; title: string; excerpt: string; cover: string; date: string;
  readTime: number; category: string; tags: string[]; author: { name: string; avatar: string };
};

export function Sidebar({ posts }: { posts: Post[] }) {
  const popular = posts.slice(0, 5);
  const counts = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1; return acc;
  }, {});
  const categories = Object.entries(counts).map(([name, count]) => ({ name, count }));
  return (
    <aside className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold">Popular</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {popular.map((p) => (
            <li key={p.slug}>
              <Link className="hover:underline" href={`/blog/${p.slug}`}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-sm font-semibold">Categories</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {categories.map((c) => (
            <li key={c.name} className="flex items-center justify-between">
              <Link className="hover:underline" href={`/categories/${encodeURIComponent(c.name)}`}>{c.name}</Link>
              <span className="text-muted">{c.count}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}


