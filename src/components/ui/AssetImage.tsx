"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AssetImageProps {
  imageKey: string;
  fallbackUrl?: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

export const AssetImage: React.FC<AssetImageProps> = ({
  imageKey,
  fallbackUrl,
  alt,
  fill = true,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}) => {
  const resolvedPath =
    fallbackUrl && fallbackUrl.startsWith("/")
      ? fallbackUrl
      : `/assets/${imageKey}.jpg`;

  const [src, setSrc] = useState<string>(resolvedPath);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const targetPath =
      fallbackUrl && fallbackUrl.startsWith("/")
        ? fallbackUrl
        : `/assets/${imageKey}.jpg`;
    setSrc(targetPath);
  }, [imageKey, fallbackUrl]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-100",
        fill ? "w-full h-full" : "",
        className
      )}
    >
      {/* Luxury Skeleton Screen with Shimmer Effect */}
      <div
        className={cn(
          "absolute inset-0 z-10 bg-surface-100 transition-opacity duration-700 pointer-events-none overflow-hidden",
          loaded ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-surface-200 via-surface-50 to-surface-200 animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(212,175,55,0.08)_50%,transparent_100%)] animate-shimmer [background-size:200%_100%]" />
      </div>

      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        quality={quality}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition-all duration-700 ease-out",
          loaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm"
        )}
      />
    </div>
  );
};

