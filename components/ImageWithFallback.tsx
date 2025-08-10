"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J2xpbmVhci1ncmFkaWVudCg6YicvPj9zdHlsZT10ZXh0PC9zdmc+";

export function ImageWithFallback(props: ImageProps & { fallbackSrc?: string }) {
  const { src, fallbackSrc = "/images/placeholder.svg", alt, ...rest } = props;
  const [source, setSource] = useState(src);
  return (
    <Image
      {...rest}
      alt={alt}
      src={source}
      onError={() => setSource(fallbackSrc)}
      placeholder={typeof rest.width === "number" && typeof rest.height === "number" && (rest.width >= 40 && rest.height >= 40) ? "blur" : undefined}
      blurDataURL={typeof rest.width === "number" && typeof rest.height === "number" && (rest.width >= 40 && rest.height >= 40) ? BLUR_DATA_URL : undefined}
    />
  );
}


