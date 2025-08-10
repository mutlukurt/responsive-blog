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

  return (
    <div
      className="contents"
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
          "object-cover transform-gpu opacity-100 will-change-transform transition-opacity transition-transform duration-[500ms] md:duration-[700ms] ease-out [animation:none]",
          hovered && "scale-[1.06] md:scale-[1.08]",
          className
        )}
      />
    </div>
  );
}


