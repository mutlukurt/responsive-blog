"use client";

import { useEffect, useState } from "react";

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<{ id: string; text: string; level: 2 | 3 }[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("article h2, article h3")
    );
    setItems(
      headings.map((h) => ({ id: h.id, text: h.textContent ?? "", level: h.tagName === "H2" ? 2 : 3 }))
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);


  return (
    <nav aria-label="Table of contents" className="sticky top-24 space-y-2">
      <h2 className="text-sm font-semibold">On this page</h2>
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={
                item.id === activeId ? "text-[--accent-1]" : "text-muted hover:text-text"
              }
            >
              {item.level === 3 ? <span className="mr-2" aria-hidden>–</span> : null}
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}


