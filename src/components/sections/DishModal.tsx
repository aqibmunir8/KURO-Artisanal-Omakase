"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/data/restaurantData";
import { AssetImage } from "@/components/ui/AssetImage";
import { sound } from "@/lib/sound";
import { X, Wine, Sparkles, MapPin, CheckCircle2, Bookmark } from "lucide-react";
import { useLocalData } from "@/context/LocalDataContext";

interface DishModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onOpenReservation: () => void;
}

export const DishModal: React.FC<DishModalProps> = ({ dish, onClose, onOpenReservation }) => {
  const { isFavorite, toggleFavorite } = useLocalData();

  if (!dish) return null;

  const favorited = isFavorite(dish.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface-100 rounded-3xl border border-gold-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 grid grid-cols-1 md:grid-cols-12 overflow-hidden"
        >
          {/* Top Actions: Bookmark & Close */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                toggleFavorite(dish.id);
              }}
              aria-label="Save dish to favorites"
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                favorited
                  ? "bg-gold-500 text-black shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                  : "bg-black/60 hover:bg-black text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              <Bookmark className={`w-5 h-5 ${favorited ? "fill-black" : ""}`} />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              aria-label="Close dish details modal"
              className="p-2 rounded-full bg-black/60 hover:bg-black text-zinc-400 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image Showcase Column */}
          <div className="md:col-span-6 relative aspect-square md:aspect-auto min-h-[280px] md:min-h-[440px]">
            <AssetImage
              imageKey={dish.imageKey}
              fallbackUrl={dish.fallbackImage}
              alt={dish.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-100 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-surface-100" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-gold-400/30 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-gold-300" />
              <span className="text-[10px] font-sans uppercase tracking-widest text-gold-200">
                Course {dish.courseNumber} of 18
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-japanese text-gold-300">
                  {dish.japaneseName}
                </span>
                <span className="text-[11px] font-sans uppercase tracking-widest text-zinc-400">
                  {dish.tags.join(" · ")}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-zinc-100 mb-4">
                {dish.name}
              </h3>

              <p className="text-sm font-sans text-zinc-300 leading-relaxed mb-6">
                {dish.description}
              </p>

              {/* Provenance Origin */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-surface-200/80 border border-white/[0.05] mb-5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-widest text-zinc-500 block">
                    Provenance / Catch Region
                  </span>
                  <span className="text-xs font-sans text-zinc-200 font-medium">
                    {dish.provenance}
                  </span>
                </div>
              </div>

              {/* Ingredients Tags */}
              <div className="mb-5">
                <span className="text-[10px] font-sans uppercase tracking-widest text-zinc-500 block mb-2">
                  Artisanal Ingredients
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {dish.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-50 border border-white/[0.06] text-[11px] font-sans text-zinc-300"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-gold-400" />
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sommelier Pairing Note */}
              {dish.pairingNote && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-gold-500/[0.07] border border-gold-400/20 mb-6">
                  <Wine className="w-4 h-4 text-gold-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-widest text-gold-300 block">
                      Sommelier Pairing
                    </span>
                    <span className="text-xs font-sans text-gold-100">
                      {dish.pairingNote}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom CTA */}
            <button
              onClick={() => {
                onClose();
                sound.playChime();
                onOpenReservation();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
            >
              Reserve Experience For This Menu
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
