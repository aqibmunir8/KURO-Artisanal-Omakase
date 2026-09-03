"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PHILOSOPHY_PILLARS } from "@/data/restaurantData";
import { AssetImage } from "@/components/ui/AssetImage";
import { sound } from "@/lib/sound";
import { Flame, Waves, HeartHandshake } from "lucide-react";

export const Philosophy: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Flame className="w-4 h-4 text-ember" />;
      case 1:
        return <Waves className="w-4 h-4 text-sky-400" />;
      default:
        return <HeartHandshake className="w-4 h-4 text-gold-300" />;
    }
  };

  const currentPillar = PHILOSOPHY_PILLARS[activeTab];

  return (
    <section id="philosophy" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-100 border border-gold-400/20 mb-4">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-300 font-medium">
            Our Foundation
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-zinc-100 tracking-tight mb-4">
          The Three Sacred Pillars
        </h2>
        <p className="max-w-xl text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed">
          An uncompromising devotion to ancient fire mastery, neurological fish aging, and single-guest intimacy.
        </p>
      </div>

      {/* Interactive Tabs Selector */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 rounded-full bg-surface-100/90 border border-white/[0.08] backdrop-blur-md">
          {PHILOSOPHY_PILLARS.map((pillar, idx) => (
            <button
              key={pillar.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(idx);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs font-sans uppercase tracking-[0.18em] transition-all duration-300 ${
                activeTab === idx
                  ? "bg-gradient-to-r from-gold-500/25 to-gold-400/10 text-gold-200 border border-gold-400/40 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {getIcon(idx)}
              <span className="hidden sm:inline">{pillar.title}</span>
              <span className="sm:hidden">{pillar.kanji}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Showcase Card */}
      <div className="relative rounded-3xl bg-surface-100/60 border border-white/[0.08] overflow-hidden backdrop-blur-xl p-8 sm:p-12 lg:p-16">
        {/* Background Kanji Watermark */}
        <div className="absolute right-6 -bottom-10 text-[180px] sm:text-[240px] font-japanese font-black text-white/[0.02] select-none pointer-events-none">
          {currentPillar.kanji}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPillar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          >
            {/* Visual Image Column */}
            <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <AssetImage
                imageKey={currentPillar.imageKey}
                fallbackUrl={currentPillar.fallbackImage}
                alt={currentPillar.title}
                className="group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-sans tracking-widest text-zinc-300">
                <span className="text-gold-300">PILLAR {currentPillar.number}</span>
                <span className="text-zinc-400 text-[11px]">{currentPillar.subtitle}</span>
              </div>
            </div>

            {/* Narrative Text Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-japanese text-gold-300">
                  {currentPillar.kanji}
                </span>
                <span className="text-xs font-sans tracking-[0.3em] uppercase text-zinc-500">
                  // {currentPillar.subtitle}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif text-zinc-100 tracking-wide mb-6">
                {currentPillar.title}
              </h3>

              <p className="text-sm sm:text-base font-sans text-zinc-300 leading-relaxed mb-6">
                {currentPillar.description}
              </p>

              <div className="p-4 sm:p-5 rounded-xl bg-surface-200/80 border border-white/[0.05]">
                <p className="text-xs font-sans text-zinc-400 leading-relaxed italic">
                  "{currentPillar.detail}"
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
