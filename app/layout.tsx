import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/prism.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/Toast";
import { Analytics } from "@/components/Analytics";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: {
    default: "Mutlu’s Blog",
    template: "%s | Mutlu’s Blog",
  },
  description:
    "Modern, accessible, and fast blog about Design, Frontend, and Productivity.",
  keywords: [
    "blog",
    "frontend",
    "design",
    "productivity",
    "react",
    "nextjs",
  ],
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
      "application/json": "/feed.json",
    },
  },
  other: {
    // Autodiscovery for RSS in classic user agents
    "link:alternate:rss": "<link rel=\"alternate\" type=\"application/rss+xml\" title=\"RSS\" href=\"/feed.xml\" />",
  },
  openGraph: {
    type: "website",
    title: "Mutlu’s Blog",
    description:
      "Modern, accessible, and fast blog about Design, Frontend, and Productivity.",
    url: "https://example.com",
    images: [
      {
        url: "/images/placeholder.svg",
        width: 1200,
        height: 630,
        alt: "Mutlu’s Blog Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mutlu’s Blog",
    description:
      "Modern, accessible, and fast blog about Design, Frontend, and Productivity.",
    images: ["/images/placeholder.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <a
          href="#content"
          className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:outline-none focus:ring-2 focus:ring-accent-1 bg-surface text-text px-3 py-2 rounded-lg"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
