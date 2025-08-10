"use client";

import { Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { toast } from "@/components/Toast";
import { useEffect, useState } from "react";

export function ShareBar({ title }: { title: string }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  if (!url) return null;
  const text = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(url);
  return (
    <div className="flex items-center gap-3 text-sm">
      <a
        className="inline-flex items-center gap-1 hover:underline"
        aria-label="Share on Twitter"
        href={`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`}
        target="_blank"
      >
        <Twitter size={16} /> Twitter
      </a>
      <a
        className="inline-flex items-center gap-1 hover:underline"
        aria-label="Share on LinkedIn"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
        target="_blank"
      >
        <Linkedin size={16} /> LinkedIn
      </a>
      <button
        type="button"
        className="inline-flex items-center gap-1 hover:underline"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            toast.success("Link copied");
          } catch {}
        }}
      >
        <LinkIcon size={16} /> Copy link
      </button>
    </div>
  );
}


