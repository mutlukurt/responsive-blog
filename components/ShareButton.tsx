"use client";

import { Button } from "@/components/Button";
import { toast } from "@/components/Toast";

export function ShareButton() {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          toast.success("Link copied to clipboard");
        } catch {
          toast.error("Could not copy link");
        }
      }}
    >
      Share
    </Button>
  );
}


