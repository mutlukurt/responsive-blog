"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { useState } from "react";

export function BlogFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");

  const update = useDebouncedCallback((q: string, cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (q) params.set("q", q); else params.delete("q");
    if (cat && cat !== "all") params.set("category", cat); else params.delete("category");
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="space-y-3">
      <label htmlFor="q" className="text-sm font-medium">Search</label>
      <Input
        id="q"
        value={value}
        onChange={(e) => { setValue(e.target.value); update(e.target.value, category); }}
        placeholder="Search posts…"
      />
      <label htmlFor="category" className="text-sm font-medium">Category</label>
      <Select
        id="category"
        value={category}
        onChange={(e) => { setCategory(e.target.value); update(value, e.target.value); }}
      >
        <option value="all">All</option>
        <option value="Design">Design</option>
        <option value="Frontend">Frontend</option>
        <option value="Productivity">Productivity</option>
      </Select>
    </div>
  );
}


