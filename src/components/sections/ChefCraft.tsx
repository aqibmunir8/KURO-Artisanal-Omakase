"use client";

import React from "react";
import { CHEF_PROFILE, RESTAURANT_INFO } from "@/data/restaurantData";
import { AssetImage } from "@/components/ui/AssetImage";
import { Sparkles, Award, ShieldCheck, Flame } from "lucide-react";

export const ChefCraft: React.FC = () => {
  return (
    <section id="craft" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Master Chef Portrait & Visual */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
            <AssetImage
              imageKey={CHEF_PROFILE.imageKey}
              fallbackUrl={CHEF_PROFILE.fallbackImage}
              alt={CHEF_PROFILE.name}
              className="group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col">
              <span className="text-xl font-japanese text-gold-300">
                {CHEF_PROFILE.japaneseName}
              </span>
              <span className="text-lg font-serif text-zinc-100 tracking-wide">
                {CHEF_PROFILE.name}
              </span>
              <span className="text-xs font-sans uppercase tracking-widest text-zinc-400 mt-1">
                {CHEF_PROFILE.title}
              </span>
            </div>
          </div>

          {/* Floating Gold Experience Badge */}
          <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 p-4 sm:p-5 rounded-2xl bg-surface-100/90 border border-gold-400/40 backdrop-blur-xl shadow-2xl flex items-center gap-3">
            <Award className="w-6 h-6 text-gold-400 shrink-0" />
            <div>
              <span className="text-xs font-serif text-gold-200 block font-semibold">
                24+ Years
              </span>
              <span className="text-[10px] font-sans uppercase tracking-widest text-zinc-400 block">
                Ginza &amp; Tokyo Mastery
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Culinary Philosophy & Metrics */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-100 border border-gold-400/20 mb-4 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold-300 font-medium">
              The Master &amp; The Hearth
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-zinc-100 tracking-tight leading-tight mb-6">
            Charcoal Alchemy &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-ember">
              Ancestral Blade Discipline
            </span>
          </h2>

          <blockquote className="text-base sm:text-lg font-serif italic text-gold-200/90 border-l-2 border-gold-400/40 pl-5 mb-6 leading-relaxed">
            "{CHEF_PROFILE.quote}"
          </blockquote>

          <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed mb-8">
            {CHEF_PROFILE.bio}
          </p>

          {/* Three Key Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/[0.08]">
            <div className="p-4 rounded-xl bg-surface-100/60 border border-white/[0.05] flex items-start gap-3">
              <Flame className="w-5 h-5 text-ember shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-sans uppercase tracking-widest text-zinc-200 font-semibold mb-1">
                  1,000°C Binchotan Sear
                </h4>
                <p className="text-[11px] font-sans text-zinc-400 leading-relaxed">
                  Pure far-infrared radiation that locks in delicate ocean sweetness in 0.8 seconds.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-100/60 border border-white/[0.05] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-sans uppercase tracking-widest text-zinc-200 font-semibold mb-1">
                  12-Guest Exclusivity
                </h4>
                <p className="text-[11px] font-sans text-zinc-400 leading-relaxed">
                  Every dish is presented directly into the guest's hands at its optimal thermal peak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
