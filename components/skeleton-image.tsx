"use client";

import { useState } from "react";
import Image from "next/image";

interface SkeletonImageProps {
  src: string;
  alt: string;
}

export function SkeletonImage({ src, alt }: SkeletonImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Skeleton */}
      <div
        className={`absolute inset-0 z-10 bg-zinc-800 transition-opacity duration-300 ${
          isLoaded
            ? "pointer-events-none opacity-0"
            : "animate-pulse opacity-100"
        }`}
      />

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-contain transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        priority
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
}
