"use client";

import { forwardRef, useEffect, useMemo, useState } from "react";

type Props = {
  placeholder?: string;
  onSubmit?: (query: string) => void;
  defaultValue?: string;
};

export const Search = forwardRef<HTMLInputElement, Props>(
  ({ placeholder = "Search…", onSubmit, defaultValue }, ref) => {
    const [value, setValue] = useState(defaultValue ?? "");

    useEffect(() => {
      setValue(defaultValue ?? "");
    }, [defaultValue]);

    const handle = useMemo(
      () =>
        (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          onSubmit?.(value.trim());
        },
      [onSubmit, value]
    );

    return (
      <form onSubmit={handle} role="search" className="relative">
        <input
          ref={ref}
          id="site-search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="h-9 w-48 md:w-64 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-1 placeholder:text-muted"
          aria-label="Search posts"
        />
      </form>
    );
  }
);
Search.displayName = "Search";


