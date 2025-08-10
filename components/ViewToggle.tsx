"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function ViewToggle() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const view = (searchParams.get("view") ?? "grid") as "grid" | "list";

  function setView(next: "grid" | "list") {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "grid") params.delete("view"); else params.set("view", next);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-surface p-1">
      <button
        type="button"
        onClick={() => setView("grid")}
        className={cn(
          "px-3 py-1.5 text-sm rounded-md",
          view === "grid" ? "bg-background" : "hover:bg-background"
        )}
        aria-pressed={view === "grid"}
      >
        Grid
      </button>
      <button
        type="button"
        onClick={() => setView("list")}
        className={cn(
          "px-3 py-1.5 text-sm rounded-md",
          view === "list" ? "bg-background" : "hover:bg-background"
        )}
        aria-pressed={view === "list"}
      >
        List
      </button>
    </div>
  );
}


