"use client";

import React from "react";
import { TESTIMONIALS } from "@/data/restaurantData";
import { AssetImage } from "@/components/ui/AssetImage";
import { AssetVideo } from "@/components/ui/AssetVideo";
import { sound } from "@/lib/sound";
import { Star, Quote, Sparkles } from "lucide-react";

export const AmbienceGallery: React.FC = () => {
  const galleryItems = [
    {
      key: "interior-counter",
      isVideo: false,
      fallback: "/assets/interior-counter.jpg",
      title: "The 300-Year Hinoki Counter",
      subtitle: "12 Exclusive Seats",
      span: "col-span-12 md:col-span-7",
    },
    {
      key: "interior-ambient",
      isVideo: true,
      fallback: "/assets/interior-ambient.jpg",
      title: "Atmospheric Sanctuary & Counter",
      subtitle: "Cinematic Room Perspective",
      span: "col-span-12 md:col-span-5",
    },
    {
      key: "craft-smoke",
      isVideo: true,
      fallback: "/assets/craft-smoke.jpg",
      title: "The Binchotan Hearth",
      subtitle: "Far-Infrared Charcoal Sear",
      span: "col-span-12 md:col-span-5",
    },
    {
      key: "cocktail-smoke",
      isVideo: true,
      fallback: "/assets/cocktail-smoke.jpg",
      title: "Smokeworks Mixology & Sake Cellar",
      subtitle: "Rare Vintage Cask Selections",
      span: "col-span-12 md:col-span-7",
    },
  ];

  return (
    <section id="ambience" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-100 border border-gold-400/20 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-gold-300" />
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-300 font-medium">
            Atmosphere &amp; Space
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-zinc-100 tracking-tight mb-4">
          The 12-Seat Sanctuary
        </h2>
        <p className="max-w-xl text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed">
          Designed with charred cedar Shou Sugi Ban, raw granite, and acoustic damping to create an undisturbed sensory haven in the heart of SoHo.
        </p>
      </div>

      {/* Architectural Gallery Grid */}
      <div className="grid grid-cols-12 gap-6 mb-24">
        {galleryItems.map((item, i) => (
          <div
            key={i}
            onMouseEnter={() => sound.playHover()}
            data-cursor-text="View"
            className={`${item.span} relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] group shadow-xl`}
          >
            {item.isVideo ? (
              <AssetVideo
                videoKey={item.key}
                fallbackImage={item.fallback}
                alt={item.title}
                overlayOpacity={0.4}
              />
            ) : (
              <AssetImage
                imageKey={item.key}
                fallbackUrl={item.fallback}
                alt={item.title}
                className="group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity group-hover:opacity-90 pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-20 pointer-events-none">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-gold-300 block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-zinc-100">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Critical Acclaim / Press Testimonials Strip */}
      <div className="pt-16 border-t border-white/[0.08]">
        <div className="text-center mb-12">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-gold-300">
            Critical Acclaim &amp; Distinction
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-2xl bg-surface-100/60 border border-white/[0.06] backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-gold-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-zinc-600" />
                </div>

                <p className="text-xs sm:text-sm font-serif italic text-zinc-300 leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.04] flex flex-col">
                <span className="text-xs font-sans font-semibold text-zinc-100">
                  {t.author}
                </span>
                <span className="text-[11px] font-sans text-zinc-400">
                  {t.title} · <span className="text-gold-300">{t.outlet}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
