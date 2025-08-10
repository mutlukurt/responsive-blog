"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  // Ensure system preference respected and persisted
  useEffect(() => {
    // no-op, but guarantees client mount for class switching before paint
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}


