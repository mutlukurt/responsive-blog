import { cn } from "@/lib/utils";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-[--accent-1]/10 text-[--accent-1] px-2 py-0.5 text-xs font-medium", className)}>
      {children}
    </span>
  );
}


