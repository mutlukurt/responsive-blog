"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Search } from "@/components/Search";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";
import { AuthButton } from "@/components/AuthButton";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <nav
        className="absolute inset-x-0 top-0 rounded-b-2xl bg-surface border-b border-border p-4 pb-6"
        aria-label="Mobile"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="font-bold">Menu</span>
          <button aria-label="Close" onClick={onClose} className="p-2 rounded-lg hover:bg-background">
            <X size={18} />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <Search
            placeholder="Search posts…"
            onSubmit={(q) => { onClose(); router.push(`/blog?q=${encodeURIComponent(q)}`); }}
          />
          <ThemeToggle />
        </div>
        <ul className="mt-3 space-y-2 text-base">
          <li><Link className="block rounded-lg px-2 py-2 hover:bg-background" href="/">Home</Link></li>
          <li><Link className="block rounded-lg px-2 py-2 hover:bg-background" href="/blog">Blog</Link></li>
          <li><Link className="block rounded-lg px-2 py-2 hover:bg-background" href="/categories/design">Categories</Link></li>
          <li><Link className="block rounded-lg px-2 py-2 hover:bg-background" href="/about">About</Link></li>
          <li><Link className="block rounded-lg px-2 py-2 hover:bg-background" href="/contact">Contact</Link></li>
          <li><Link className="block rounded-lg px-2 py-2 hover:bg-background" href="/feed.xml" target="_blank" rel="noopener noreferrer">RSS</Link></li>
        </ul>
        <div className="mt-4">
          <AuthButton />
        </div>
      </nav>
    </div>
  );
}


