"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getQuickLinks } from "@/lib/seo";

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

export function CommandPalette({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
    }
  }, [open]);

  const links = useMemo(() => getQuickLinks(query), [query]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-start pt-24 bg-black/40 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-surface shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 border-b border-border">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            className="w-full bg-transparent outline-none text-sm"
            aria-label="Command palette"
          />
        </div>
        <ul role="listbox" className="max-h-80 overflow-auto py-2">
          {links.length === 0 && (
            <li className="px-4 py-2 text-sm text-muted">No results</li>
          )}
          {links.map((link) => (
            <li key={link.href}>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-background"
                onClick={() => {
                  onOpenChange(false);
                  router.push(link.href);
                }}
              >
                {link.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


