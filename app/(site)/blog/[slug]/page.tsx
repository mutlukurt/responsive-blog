import { notFound } from "next/navigation";
import { getAdjacentPosts, getPostBySlug, getAllPosts } from "@/lib/posts";
import { buildPostMeta } from "@/lib/seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import { ImageWithFallback as Image } from "@/components/ImageWithFallback";
import Link from "next/link";
import { TableOfContents } from "@/components/TableOfContents";
import { CommentThread } from "@/components/CommentThread";
import { ShareButton } from "@/components/ShareButton";
import { ShareBar } from "@/components/ShareBar";
import { mdxComponents } from "@/components/MDXComponents";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildPostMeta({
    title: post.title,
    description: post.excerpt,
    cover: post.cover,
    url: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();
  const { prev, next } = getAdjacentPosts(slug);

  const components = { ...mdxComponents };

  return (
    <article className="mx-auto max-w-3xl">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <p className="text-muted">{post.excerpt}</p>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-[url('/images/placeholder.svg')] bg-cover bg-center">
          <Image src={post.cover} alt="" fill className="object-cover [animation:none]" priority />
        </div>
      </header>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">
        <div className="prose prose-neutral dark:prose-invert">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }], rehypePrism],
              },
            }}
            components={components}
          />
          <div className="mt-8 flex items-center justify-between">
            <ShareBar title={post.title} />
            <ShareButton />
          </div>
          <div className="mt-12">
            <CommentThread />
          </div>
        </div>
        <aside>
          <TableOfContents />
        </aside>
      </div>

      <nav aria-label="Next/previous" className="mt-12 grid grid-cols-2 gap-4">
        <div>
          {prev && (
            <Link className="block rounded-lg border border-border p-4 hover:bg-background" href={`/blog/${prev.slug}`}>
              ← {prev.title}
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link className="block rounded-lg border border-border p-4 hover:bg-background" href={`/blog/${next.slug}`}>
              {next.title} →
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}



