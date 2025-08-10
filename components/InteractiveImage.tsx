"use client";

import { ImageWithFallback as Image } from "@/components/ImageWithFallback";
import type { ImageProps } from "next/image";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export type InteractiveImageProps = ImageProps & {
  className?: string;
};

export function InteractiveImage({ className, ...rest }: InteractiveImageProps) {
  const [hovered, setHovered] = useState(false);

  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback(() => setHovered(false), []);

  const zoomTargetClass = "[--zoom-to:1.08] md:[--zoom-to:1.12]";

  return (
    <div
      className={zoomTargetClass}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onTouchStart={onEnter}
      onTouchEnd={onLeave}
      onTouchCancel={onLeave}
      onMouseDown={onEnter}
      onMouseUp={onLeave}
    >
      <Image
        {...rest}
        className={cn(
          "object-cover transform-gpu opacity-100 will-change-transform [animation-duration:1600ms] md:[animation-duration:2200ms] [animation-timing-function:cubic-bezier(0.2,0.8,0.2,1)]",
          hovered ? "animate-[zoom-in-slow_forwards]" : "animate-[zoom-out-slow_forwards]",
          className
        )}
      />
    </div>
  );
}


