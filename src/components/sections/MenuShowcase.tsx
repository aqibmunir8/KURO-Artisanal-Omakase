"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_ITEMS, MenuItem, RESTAURANT_INFO } from "@/data/restaurantData";
import { AssetImage } from "@/components/ui/AssetImage";
import { sound } from "@/lib/sound";
import { Sparkles, Eye, Flame, Wine, Utensils } from "lucide-react";

interface MenuShowcaseProps {
  onSelectDish: (dish: MenuItem) => void;
  onOpenReservation: () => void;
}

export const MenuShowcase: React.FC<MenuShowcaseProps> = ({
  onSelectDish,
  onOpenReservation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<"tasting" | "beverage">("tasting");

  const filteredItems = MENU_ITEMS.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <section id="menu" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-100 border border-gold-400/20 mb-4">
          <Utensils className="w-3.5 h-3.5 text-gold-300" />
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-300 font-medium">
            Sensory Journey
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-zinc-100 tracking-tight mb-4">
          The 18-Course Omakase
        </h2>

        <p className="max-w-2xl text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed mb-8">
          A progression of cold water delicacies and high-heat charcoal sears calibrated to order. Served exclusively at our 12-seat cedar counter.
        </p>

        {/* Pricing Summary Strip */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 rounded-2xl bg-surface-100/80 border border-white/[0.08] backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-sans uppercase tracking-widest text-zinc-400">Grand Tasting:</span>
            <span className="text-sm font-serif text-gold-300 font-semibold">${RESTAURANT_INFO.pricing.omakasePrice}</span>
          </div>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-sans uppercase tracking-widest text-zinc-400">Reserve Wine &amp; Sake:</span>
            <span className="text-sm font-serif text-gold-300 font-semibold">+${RESTAURANT_INFO.pricing.reservePairing}</span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex justify-center mb-12 relative z-10">
        <div className="inline-flex p-1.5 rounded-full bg-surface-100/90 border border-white/[0.08] backdrop-blur-md">
          <button
            onClick={() => {
              sound.playClick();
              setSelectedCategory("tasting");
            }}
            onMouseEnter={() => sound.playHover()}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-sans uppercase tracking-[0.18em] transition-all duration-300 ${
              selectedCategory === "tasting"
                ? "bg-gold-500/25 text-gold-200 border border-gold-400/40 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Culinary Courses
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setSelectedCategory("beverage");
            }}
            onMouseEnter={() => sound.playHover()}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-sans uppercase tracking-[0.18em] transition-all duration-300 ${
              selectedCategory === "beverage"
                ? "bg-gold-500/25 text-gold-200 border border-gold-400/40 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Wine className="w-3.5 h-3.5" />
            Rare Sake &amp; Spirits
          </button>
        </div>
      </div>

      {/* Dishes Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((dish) => (
            <motion.div
              layout
              key={dish.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => {
                sound.playClick();
                onSelectDish(dish);
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor-text="Inspect"
              className="group relative rounded-2xl bg-surface-100/70 border border-white/[0.08] hover:border-gold-400/50 overflow-hidden cursor-pointer backdrop-blur-md transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col"
            >
              {/* Dish Image Box */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <AssetImage
                  imageKey={dish.imageKey}
                  fallbackUrl={dish.fallbackImage}
                  alt={dish.name}
                  className="group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-surface-100 via-transparent to-transparent pointer-events-none" />

                {/* Course Badge */}
                <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  <Sparkles className="w-3 h-3 text-gold-300" />
                  <span className="text-[9px] font-sans uppercase tracking-widest text-gold-200 font-medium">
                    {dish.category === "tasting"
                      ? `Course ${dish.courseNumber}`
                      : `$${dish.price}`}
                  </span>
                </div>

                {/* Inspect Overlay Trigger */}
                <div className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gold-300">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Dish Content Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-japanese text-gold-300">
                      {dish.japaneseName}
                    </span>
                    <span className="text-[10px] font-sans tracking-widest uppercase text-zinc-400">
                      {dish.provenance.split(",")[0]}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-zinc-100 group-hover:text-gold-200 transition-colors mb-2.5">
                    {dish.name}
                  </h3>

                  <p className="text-xs font-sans text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {dish.description}
                  </p>
                </div>

                {/* Footer Meta */}
                <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {dish.tags.slice(0, 2).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-sans uppercase tracking-widest px-2 py-0.5 rounded bg-surface-50 text-zinc-400 border border-white/[0.04]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] font-sans uppercase tracking-widest text-gold-400 group-hover:underline flex items-center gap-1">
                    Details →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Reservation Push Box */}
      <div className="mt-16 text-center">
        <button
          onClick={() => {
            sound.playChime();
            onOpenReservation();
          }}
          onMouseEnter={() => sound.playHover()}
          className="px-8 py-3.5 rounded-full bg-surface-100 hover:bg-surface-50 border border-gold-400/40 hover:border-gold-300 text-gold-200 font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        >
          Book Your 18-Course Experience
        </button>
      </div>
    </section>
  );
};
