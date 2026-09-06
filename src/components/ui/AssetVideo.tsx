"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { AssetImage } from "./AssetImage";

interface AssetVideoProps {
  videoKey: string;
  fallbackImage: string;
  alt: string;
  className?: string;
  overlayOpacity?: number;
}

export const AssetVideo: React.FC<AssetVideoProps> = ({
  videoKey,
  fallbackImage,
  alt,
  className,
  overlayOpacity = 0.5,
}) => {
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check readyState on mount and handle autoplay policies
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    if (video.readyState >= 2) {
      setVideoLoaded(true);
    }
  }, [videoKey]);

  // IntersectionObserver to pause heavy rendering when out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Ambient Ember & Charcoal Particle Canvas Animation (Runs only when in viewport)
  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxLife: number;
      life: number;
      color: string;
    }

    const particles: Particle[] = [];
    const count = 28;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        speedY: -(Math.random() * 0.4 + 0.2),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        maxLife: Math.random() * 200 + 100,
        life: Math.random() * 100,
        color: Math.random() > 0.4 ? "#D4AF37" : "#FF5E36",
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.life++;

        if (p.life > p.maxLife || p.y < 0) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.life = 0;
        }

        const alpha = p.opacity * Math.sin((p.life / p.maxLife) * Math.PI);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isVisible]);

  const markLoaded = () => setVideoLoaded(true);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden bg-background will-change-transform", className)}
      style={{ transform: "translateZ(0)" }}
    >
      {/* Background Poster Image (always mounted underneath for instant visual fidelity) */}
      <AssetImage
        imageKey={videoKey}
        fallbackUrl={fallbackImage}
        alt={alt}
        priority
        className="absolute inset-0 w-full h-full object-cover transform scale-105"
      />

      {/* Background Video */}
      {videoAvailable && (
        <video
          ref={videoRef}
          src={`/assets/${videoKey}.mp4`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onLoadedData={markLoaded}
          onLoadedMetadata={markLoaded}
          onCanPlay={markLoaded}
          onPlaying={markLoaded}
          onError={() => setVideoAvailable(false)}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
            videoLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
        />
      )}

      {/* Ambient Ember Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
      />

      {/* Cinematic Vignette Overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(8,8,10,${overlayOpacity * 0.4}) 0%, rgba(8,8,10,${overlayOpacity + 0.35}) 80%, rgba(8,8,10,0.98) 100%)`,
        }}
      />
    </div>
  );
};
