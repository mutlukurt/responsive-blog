import { getAllPosts } from "@/lib/posts";

const siteUrl = "https://example.com"; // update when deploying

export function buildRssFeed() {
  const posts = getAllPosts();
  const items = posts
    .map((p) => `
  <item>
    <title><![CDATA[${escapeXml(p.title)}]]></title>
    <link>${siteUrl}/blog/${p.slug}</link>
    <guid>${siteUrl}/blog/${p.slug}</guid>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    <description><![CDATA[${p.excerpt}]]></description>
  </item>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Mutlu’s Blog</title>
  <link>${siteUrl}</link>
  <description>Modern, accessible, and fast blog about Design, Frontend, and Productivity.</description>
  ${items}
</channel>
</rss>`;
}

export function buildJsonFeed() {
  const posts = getAllPosts();
  return {
    version: "https://jsonfeed.org/version/1.1",
    title: "Mutlu’s Blog",
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/feed.json`,
    items: posts.map((p) => ({
      id: `${siteUrl}/blog/${p.slug}`,
      url: `${siteUrl}/blog/${p.slug}`,
      title: p.title,
      content_text: p.excerpt,
      date_published: new Date(p.date).toISOString(),
      author: { name: p.author.name },
      tags: p.tags,
    })),
  };
}

function escapeXml(input: string) {
  return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


