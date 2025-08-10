import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Author = { name: string; avatar: string };
export type PostFrontmatter = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
  author: Author;
  featured?: boolean;
};

export type PostWithContent = PostFrontmatter & { content: string };

const CONTENT_DIR = path.join(process.cwd(), "content");
const POSTS_DIR = path.join(CONTENT_DIR, "posts");
const DATA_DIR = path.join(CONTENT_DIR, "data");

export function getAllPosts(): PostFrontmatter[] {
  const jsonPath = path.join(DATA_DIR, "posts.json");
  const raw = fs.readFileSync(jsonPath, "utf8");
  const posts = JSON.parse(raw) as PostFrontmatter[];
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) return null;
  const raw = fs.readFileSync(mdxPath, "utf8");
  const { data, content } = matter(raw);
  // Prefer metadata from posts.json when available for consistency in lists
  const inList = getAllPosts().find((p) => p.slug === slug);
  return { ...(inList ?? (data as PostFrontmatter)), slug, content };
}

export function getPostsByCategory(category: string): PostFrontmatter[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}

export function searchPosts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return getAllPosts();
  return getAllPosts().filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });
}

export function getCategoriesWithCounts() {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  for (const p of posts) {
    map.set(p.category, (map.get(p.category) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
}


