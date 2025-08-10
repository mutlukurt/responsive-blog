"use client";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function ContactPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">Contact</h1>
      <form className="mt-6 max-w-lg space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <Input id="name" name="name" required className="mt-1" />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <Input id="email" name="email" type="email" required className="mt-1" />
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium">Message</label>
          <textarea id="message" name="message" rows={5} className="mt-1 h-auto w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-accent-1"></textarea>
        </div>
        <Button type="submit">Send</Button>
      </form>
    </section>
  );
}


