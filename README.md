# Responsive Blog

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open%20Site-3B82F6?logo=githubpages)](https://mutlukurt.github.io/responsive-blog/)

Live site: https://mutlukurt.github.io/responsive-blog/

## Content Management (local)

All blog content lives in the `content/` folder and images in `public/images/`.

- Edit posts: `content/posts/*.mdx`
  - Frontmatter fields match `content/data/posts.json` entries
  - MDX supports `<Callout />` and `<Figure />` components
- List of posts (cards etc.): `content/data/posts.json`
  - Each object controls metadata used on list pages and cards
  - `cover` should point to an image under `public/images/` (fallback is applied)

Quick steps to add a post:
1. Duplicate any `.mdx` file in `content/posts/` and change its frontmatter.
2. Add a matching entry in `content/data/posts.json` (same `slug`).
3. Drop your cover image into `public/images/` and reference it as `/images/your-file.jpg`.

Design tokens and theme live in `app/globals.css` and can be tweaked without touching components.

## Changelog

- v0.6.0
  - Footer lisans metni: “MIT License” linki eklendi
  - RSS görünürlüğü: Header, Footer ve Mobil menüye `RSS` linki eklendi
  - RSS autodiscovery: `<link rel="alternate" type="application/rss+xml">` head içine eklendi
  - Dev deneyimi: `npm run dev:auto` komutu ile sunucu 3002’de açılır ve tarayıcı otomatik açılır

- v0.5.0
  - Fake auth (login/register) with header integration
  - RSS (`/feed.xml`) and JSON feed (`/feed.json`)
  - Newsletter UI (frontend-only)
  - Image optimizations (blur placeholders, AVIF/WebP)
  - View toggle (Grid/List) and sidebar improvements

- v0.4.0
  - MDX components (Headings, Blockquote, Callout, Figure)
  - Single post page with TOC, Share bar, comments UI
  - SEO metadata per page, robots, sitemap

- v0.3.0
  - Blog list with filters, pagination, search (debounced)
  - Sidebar with popular posts and categories
  - Skeletons and empty states

- v0.2.0
  - Design tokens (light/dark), Theme toggle (persisted)
  - Core components: Header, Footer, Buttons, Inputs, Badge
  - Landing page with HeroFeatured and PostList

- v0.1.0
  - Next.js App Router + TypeScript + Tailwind setup
  - Base file structure and initial content


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
