"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/sound";

export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            sound.playChime();
            onComplete?.();
          }, 400);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 2;
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: ["polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"],
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#08080A] text-zinc-100 overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-radial-dark pointer-events-none" />

          {/* Central Monogram */}
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative mb-6"
            >
              {/* Gold Crest Ring */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-gold-400/30 flex items-center justify-center relative">
                <div className="absolute inset-1 rounded-full border border-dashed border-gold-400/20 animate-spin-slow" />
                <span className="text-4xl sm:text-5xl font-serif text-gold-300 select-none drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  黒
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.45em" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-xl sm:text-2xl font-serif font-light text-zinc-100 tracking-[0.45em] uppercase text-center mb-1"
            >
              KURO
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-[10px] sm:text-xs font-sans tracking-[0.3em] uppercase text-zinc-400 mb-8"
            >
              Omakase &amp; Fire Craft
            </motion.p>

            {/* Progress Bar & Percentage */}
            <div className="w-48 sm:w-64 flex flex-col items-center gap-3">
              <div className="w-full h-[2px] bg-zinc-800/80 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 via-gold-300 to-ember"
                  style={{ width: `${percent}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between w-full text-[10px] font-sans tracking-widest text-zinc-500">
                <span>NEW YORK</span>
                <span className="text-gold-300 font-mono">{percent}%</span>
                <span>TOKYO</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
