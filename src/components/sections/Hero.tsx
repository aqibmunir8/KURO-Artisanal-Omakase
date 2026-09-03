"use client";

import React from "react";
import { motion } from "framer-motion";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { sound } from "@/lib/sound";
import { AssetVideo } from "@/components/ui/AssetVideo";
import { ArrowDown, Flame, Sparkles } from "lucide-react";

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const scrollToMenu = () => {
    sound.playClick();
    const el = document.getElementById("menu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Fullscreen Background Cinematic Video / Ambient Fallback */}
      <div className="absolute inset-0 z-0">
        <AssetVideo
          videoKey="hero-bg"
          fallbackImage="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=2000&q=85"
          alt="KURO Omakase Binchotan Charcoal Seared Otoro"
          overlayOpacity={0.65}
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Accolade & Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-100/70 border border-gold-400/30 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(212,175,55,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-300 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] uppercase text-gold-200 font-medium">
            {RESTAURANT_INFO.michelinRating} · SoHo New York
          </span>
        </motion.div>

        {/* Kanji Watermark Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-gold-400/20 text-5xl sm:text-7xl font-serif select-none mb-[-20px] sm:mb-[-30px]"
        >
          一期一会 · 備長炭
        </motion.div>

        {/* Main Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-zinc-100 tracking-[0.08em] uppercase leading-[1.08] mb-6"
        >
          Where Fire <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-ember">
            Meets Transcendence
          </span>
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-2xl text-sm sm:text-base md:text-lg font-sans font-light text-zinc-300/90 leading-relaxed mb-10 tracking-wide"
        >
          {RESTAURANT_INFO.subTagline}
        </motion.p>

        {/* Action Buttons & Real-Time Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <button
            onClick={() => {
              sound.playChime();
              onOpenReservation();
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor-text="Reserve"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-ember hover:from-gold-400 hover:to-ember text-black font-sans text-xs uppercase tracking-[0.25em] font-bold shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2.5"
          >
            <Flame className="w-4 h-4 text-black" />
            Reserve Counter Seat
          </button>

          <button
            onClick={scrollToMenu}
            onMouseEnter={() => sound.playHover()}
            data-cursor-text="Menu"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-surface-100/60 hover:bg-surface-100 border border-white/10 hover:border-gold-400/40 text-zinc-200 font-sans text-xs uppercase tracking-[0.25em] font-medium backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore 18 Courses
          </button>
        </motion.div>

        {/* Key Highlight Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 mt-16 pt-10 border-t border-white/[0.08] w-full max-w-4xl"
        >
          {RESTAURANT_INFO.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl md:text-3xl font-serif text-gold-300 font-normal">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-zinc-400 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollToMenu}
        aria-label="Scroll to menu section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-zinc-400 hover:text-gold-300 transition-colors"
      >
        <span className="text-[9px] font-sans tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.button>
    </section>
  );
};
