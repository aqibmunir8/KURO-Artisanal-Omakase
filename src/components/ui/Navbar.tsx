"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { SoundController } from "./SoundController";
import { Menu, X, Calendar } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { RESTAURANT_INFO } from "@/data/restaurantData";

interface NavbarProps {
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Philosophy", href: "#philosophy" },
    { label: "Tasting Menu", href: "#menu" },
    { label: "The Craft", href: "#craft" },
    { label: "Ambience", href: "#ambience" },
    { label: "Location", href: "#location" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    sound.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#08080A]/85 backdrop-blur-xl border-b border-white/[0.06] py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onMouseEnter={() => sound.playHover()}
            className="group flex items-center gap-3 text-zinc-100"
          >
            <div className="w-8 h-8 rounded-full border border-gold-400/40 flex items-center justify-center bg-surface-100/50 group-hover:border-gold-300 transition-colors">
              <span className="text-xs font-serif text-gold-300">黒</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.25em] font-light uppercase text-zinc-100 group-hover:text-gold-200 transition-colors">
                {RESTAURANT_INFO.name}
              </span>
              <span className="text-[8px] font-sans tracking-[0.25em] uppercase text-zinc-400">
                New York · Omakase
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => sound.playHover()}
                className="text-xs font-sans uppercase tracking-[0.2em] text-zinc-400 hover:text-gold-200 transition-colors duration-200 py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Area: Audio & Reservation CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <SoundController />

            <button
              onClick={() => {
                sound.playChime();
                onOpenReservation();
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor-text="Book"
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500/20 via-gold-400/30 to-ember/20 hover:from-gold-500/40 hover:to-ember/40 border border-gold-400/50 hover:border-gold-300 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            >
              <span className="relative z-10 flex items-center gap-2 text-xs font-sans uppercase tracking-[0.18em] font-semibold text-gold-100">
                <Calendar className="w-3.5 h-3.5 text-gold-300" />
                Reserve Seat
              </span>
              <div className="absolute inset-0 bg-gold-shimmer translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-3">
            <SoundController />
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle navigation menu"
              className="p-2 text-zinc-300 hover:text-gold-300 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[65px] z-30 bg-[#08080A]/95 backdrop-blur-2xl border-b border-white/[0.08] p-6 sm:hidden flex flex-col gap-5"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-serif uppercase tracking-[0.2em] text-zinc-300 hover:text-gold-300 py-2 border-b border-white/[0.04]"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                sound.playChime();
                onOpenReservation();
              }}
              className="mt-2 w-full py-3.5 rounded-full bg-gold-500/20 border border-gold-400/60 text-gold-200 font-sans text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-gold-400" />
              Reserve a Counter Seat
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
