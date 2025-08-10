"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", isLoading, disabled, children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-accent-1 disabled:opacity-60 disabled:cursor-not-allowed";
    const variants: Record<Variant, string> = {
      primary: "bg-[--accent-2] text-white hover:brightness-95 shadow-sm hover:shadow-md px-4 py-2",
      outline: "border border-border bg-transparent hover:bg-background px-4 py-2",
      ghost: "hover:bg-background px-3 py-2",
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";


