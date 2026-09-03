"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AssetImageProps {
  imageKey: string;
  fallbackUrl: string;
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
  quality = 90,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}) => {
  const [src, setSrc] = useState<string>(fallbackUrl);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Attempt to test if local asset exists
    const localPath = `/assets/${imageKey}.jpg`;
    const img = new window.Image();
    img.src = localPath;
    img.onload = () => {
      setSrc(localPath);
    };
    img.onerror = () => {
      // Keep fallback URL
      setSrc(fallbackUrl);
    };
  }, [imageKey, fallbackUrl]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-100",
        fill ? "w-full h-full" : "",
        className
      )}
    >
      {/* Skeleton Shimmer */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-surface-100 via-surface-50 to-surface-100 animate-shimmer transition-opacity duration-700 pointer-events-none z-0",
          loaded ? "opacity-0" : "opacity-100"
        )}
      />

      <Image
        src={hasError ? fallbackUrl : src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        quality={quality}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setHasError(true);
          setSrc(fallbackUrl);
          setLoaded(true);
        }}
        className={cn(
          "object-cover transition-all duration-1000 ease-out",
          loaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm"
        )}
      />
    </div>
  );
};
