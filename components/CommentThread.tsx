"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

type Comment = {
  id: string;
  author: string;
  text: string;
  likes: number;
  replies: Comment[];
};

export function CommentThread() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState("");

  const addComment = () => {
    if (!draft.trim()) return;
    setComments((prev) => [
      {
        id: Math.random().toString(36).slice(2),
        author: "You",
        text: draft.trim(),
        likes: 0,
        replies: [],
      },
      ...prev,
    ]);
    setDraft("");
  };

  const likeComment = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)));
  };

  const replyToComment = (id: string, text: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, replies: [{ id: Math.random().toString(36).slice(2), author: "You", text, likes: 0, replies: [] }, ...c.replies] }
          : c
      )
    );
  };

  return (
    <section aria-label="Comments" className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a comment…"
          aria-label="Write a comment"
        />
        <Button onClick={addComment}>Post</Button>
      </div>
      <ul className="space-y-4">
        {comments.length === 0 ? (
          <li className="text-muted text-sm">Be the first to comment.</li>
        ) : (
          comments.map((c) => (
            <li key={c.id} className="rounded-2xl border border-border p-4 bg-surface">
              <div className="text-sm">
                <span className="font-medium">{c.author}</span>
              </div>
              <p className="mt-1 text-sm">{c.text}</p>
              <div className="mt-2 flex items-center gap-3 text-xs">
                <button className="hover:underline" onClick={() => likeComment(c.id)}>Like ({c.likes})</button>
                <details>
                  <summary className="cursor-pointer select-none hover:underline">Reply</summary>
                  <ReplyForm onSubmit={(text) => replyToComment(c.id, text)} />
                </details>
              </div>
              {c.replies.length > 0 && (
                <ul className="mt-3 space-y-3 border-l border-border pl-4">
                  {c.replies.map((r) => (
                    <li key={r.id} className="text-sm">
                      <span className="font-medium">{r.author}</span> {r.text}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

function ReplyForm({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <form
      className="mt-2 flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!value.trim()) return;
        onSubmit(value.trim());
        setValue("");
      }}
    >
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Reply…" />
      <Button type="submit" variant="outline">
        Reply
      </Button>
    </form>
  );
}


