export function getQuickLinks(query: string) {
  const base = [
    { href: "/", title: "Home" },
    { href: "/blog", title: "Blog" },
    { href: "/categories/design", title: "Categories: Design" },
    { href: "/about", title: "About" },
    { href: "/contact", title: "Contact" },
  ];
  const q = query.trim().toLowerCase();
  if (!q) return base;
  return base.filter((l) => l.title.toLowerCase().includes(q));
}

export function buildPostMeta({
  title,
  description,
  cover,
  url,
}: {
  title: string;
  description: string;
  cover?: string;
  url: string;
}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: cover ? [{ url: cover, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: cover ? [cover] : undefined,
    },
  };
}


