"use client";

import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

export const Toaster = () => (
  <SonnerToaster
    position="top-center"
    richColors
    theme="system"
    expand
    closeButton
  />
);

export const toast = sonnerToast;


