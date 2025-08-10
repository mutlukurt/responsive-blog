"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search } from "@/components/Search";
import { CommandPalette } from "@/components/CommandPalette";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { MobileMenu } from "@/components/MobileMenu";
import { AuthButton } from "@/components/AuthButton";

export function Header() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen((v) => !v);
      }
      if (e.key === "/") {
        const active = document.activeElement as HTMLElement | null;
        const tag = active?.tagName?.toLowerCase();
        if (tag !== "input" && tag !== "textarea") {
          e.preventDefault();
          searchRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b",
        "bg-surface/80 backdrop-blur supports-[backdrop-filter]:bg-surface/60",
        "border-border"
      )}
      role="banner"
    >
      <div className="mx-auto max-w-7xl flex items-center gap-3 sm:gap-4 px-3 sm:px-6 lg:px-8 h-16">
        <Link href="/" className="font-bold text-lg tracking-tight hover:underline">
          Mutlu’s Blog
        </Link>
        <nav aria-label="Main" className="ml-auto hidden md:flex items-center gap-6">
          <Link className="hover:underline" href="/">Home</Link>
          <Link className="hover:underline" href="/blog">Blog</Link>
          <Link className="hover:underline" href="/categories/design">Categories</Link>
          <Link className="hover:underline" href="/about">About</Link>
          <Link className="hover:underline" href="/contact">Contact</Link>
          <Link className="hover:underline" href="/feed.xml" target="_blank" rel="noopener noreferrer">RSS</Link>
        </nav>
        <div className="ml-auto md:ml-0 hidden sm:flex items-center gap-3">
          <Search ref={searchRef} placeholder="Search posts… (/ to focus)" onSubmit={(q) => router.push(`/blog?q=${encodeURIComponent(q)}`)} />
          <ThemeToggle />
          <AuthButton />
        </div>
        <button className="sm:hidden ml-auto inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border" aria-label="Open menu" onClick={() => setIsPaletteOpen(true)}>
          <Menu size={18} />
        </button>
      </div>
      <CommandPalette open={isPaletteOpen} onOpenChange={setIsPaletteOpen} />
      <MobileMenu open={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </header>
  );
}


