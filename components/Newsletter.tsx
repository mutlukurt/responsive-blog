"use client";

import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { toast } from "@/components/Toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-lg font-semibold">Subscribe for updates</h2>
      <p className="text-sm text-muted">Monthly digest of new posts. No spam.</p>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email");
            return;
          }
          toast.success("Subscribed! (demo)");
          setEmail("");
        }}
      >
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </section>
  );
}


