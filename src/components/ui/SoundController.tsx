"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/sound";
import { motion } from "framer-motion";

export const SoundController: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());

    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        sound.startAmbient();
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("scroll", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggleSound = () => {
    const nextState = sound.toggleMute();
    setIsMuted(nextState);
    if (!nextState) {
      sound.playChime();
    }
  };

  return (
    <button
      onClick={toggleSound}
      onMouseEnter={() => sound.playHover()}
      data-cursor-text={isMuted ? "Unmute" : "Mute"}
      aria-label={isMuted ? "Enable Ambient Audio" : "Mute Ambient Audio"}
      className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-surface-100/80 hover:bg-surface-50 border border-obsidian-border hover:border-gold-400/40 backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
    >
      {/* Equalizer Waveform Bars when sound is active */}
      <div className="flex items-end gap-[2px] h-3.5 w-3.5 pb-0.5 justify-center">
        {!isMuted ? (
          <>
            <motion.span
              animate={{ height: ["30%", "100%", "40%"] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              className="w-[1.5px] bg-gold-400 rounded-full"
            />
            <motion.span
              animate={{ height: ["60%", "30%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
              className="w-[1.5px] bg-gold-300 rounded-full"
            />
            <motion.span
              animate={{ height: ["100%", "50%", "20%"] }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
              className="w-[1.5px] bg-gold-400 rounded-full"
            />
          </>
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-400" />
        )}
      </div>

      <span className="text-[11px] font-sans uppercase tracking-widest text-zinc-400 group-hover:text-gold-200 transition-colors hidden sm:inline-block font-medium">
        {isMuted ? "Sound Off" : "Sound On"}
      </span>
    </button>
  );
};
