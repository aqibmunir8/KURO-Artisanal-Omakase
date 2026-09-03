"use client";

import React, { useState, useEffect } from "react";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { sound } from "@/lib/sound";
import { MapPin, Phone, Mail, Clock, Sparkles, Send, Check } from "lucide-react";

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  const [nyTime, setNyTime] = useState("");
  const [tokyoTime, setTokyoTime] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setNyTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setTokyoTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Tokyo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    sound.playChime();
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer id="location" className="relative bg-[#060608] border-t border-white/[0.08] pt-24 pb-12 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-radial-dark opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Top Highlight Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-surface-100/50 border border-gold-400/20 backdrop-blur-xl mb-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-200 border border-white/10 mb-3">
              <Sparkles className="w-3 h-3 text-gold-300" />
              <span className="text-[10px] font-sans uppercase tracking-widest text-gold-200">
                12 Exclusive Seats Nightly
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-zinc-100">
              Experience the Charcoal Alchemy
            </h3>
            <p className="text-xs font-sans text-zinc-400 mt-1 max-w-md">
              Bookings open on the 1st of each month for the subsequent 30-day dining cycle.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playChime();
              onOpenReservation();
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor-text="Reserve"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-ember text-black font-sans text-xs uppercase tracking-[0.25em] font-bold shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:scale-105 transition-all duration-300 shrink-0"
          >
            Reserve Your Counter Seat
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          {/* Brand & World Clocks Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full border border-gold-400/40 flex items-center justify-center bg-surface-100">
                  <span className="text-sm font-serif text-gold-300">黒</span>
                </div>
                <div>
                  <span className="font-serif text-xl tracking-[0.25em] uppercase text-zinc-100">
                    {RESTAURANT_INFO.name}
                  </span>
                  <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-zinc-500 block">
                    Artisanal Omakase
                  </span>
                </div>
              </div>

              <p className="text-xs font-sans text-zinc-400 leading-relaxed max-w-sm mb-6">
                An unhurried ritual of Kishu Binchotan charcoal, Japanese lineage fish, and 12-seat hospitality.
              </p>
            </div>

            {/* Dual Timezone Live Clock Display */}
            <div className="p-4 rounded-2xl bg-surface-100/60 border border-white/[0.05] flex items-center justify-around text-center">
              <div>
                <span className="text-[9px] font-sans uppercase tracking-widest text-zinc-500 block mb-1">
                  NEW YORK (EST)
                </span>
                <span className="text-sm font-mono text-zinc-200">{nyTime || "12:00:00 PM"}</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <span className="text-[9px] font-sans uppercase tracking-widest text-zinc-500 block mb-1">
                  TOKYO (JST)
                </span>
                <span className="text-sm font-mono text-gold-300">{tokyoTime || "01:00:00 AM"}</span>
              </div>
            </div>
          </div>

          {/* Location & Seating Hours */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-xs font-sans uppercase tracking-[0.25em] text-gold-300 font-semibold">
              Location &amp; Hours
            </h4>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
              <div>
                <span className="text-xs font-sans text-zinc-200 block font-medium">
                  {RESTAURANT_INFO.location.address}
                </span>
                <span className="text-[11px] font-sans text-zinc-400 block">
                  {RESTAURANT_INFO.location.city}
                </span>
                <span className="text-[10px] font-mono text-zinc-600 block mt-0.5">
                  {RESTAURANT_INFO.location.coordinates}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
              <div>
                <span className="text-xs font-sans text-zinc-200 block font-medium">
                  Two Seatings Nightly: {RESTAURANT_INFO.hours.firstSeating} &amp; {RESTAURANT_INFO.hours.secondSeating}
                </span>
                <span className="text-[11px] font-sans text-zinc-400 block">
                  {RESTAURANT_INFO.hours.days}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
              <div>
                <span className="text-xs font-sans text-zinc-200 block font-medium">
                  Private Salon Concierge:
                </span>
                <a
                  href="mailto:concierge@kuro-omakase.com"
                  className="text-[11px] font-sans text-gold-300 hover:underline"
                >
                  concierge@kuro-omakase.com
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter & Private Dining Inquiries */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-sans uppercase tracking-[0.25em] text-gold-300 font-semibold">
              Private Allocation Journal
            </h4>
            <p className="text-xs font-sans text-zinc-400 leading-relaxed">
              Receive private invitations to seasonal rare sake releases and priority counter openings.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter VIP email..."
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-100 border border-white/10 text-xs text-zinc-100 focus:outline-none focus:border-gold-400/50 pr-12 placeholder:text-zinc-600"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-gold-500/20 hover:bg-gold-500/30 text-gold-200 transition-colors flex items-center justify-center"
              >
                {subscribed ? <Check className="w-4 h-4 text-emerald-400" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>

            {subscribed && (
              <p className="text-[11px] font-sans text-emerald-400">
                You have been registered for private priority allocations.
              </p>
            )}

            <div className="pt-2 text-[10px] font-sans text-zinc-500 space-y-1">
              <p>• Dress Code: Elegant Evening Attire required.</p>
              <p>• Corkage: $150 per 720ml bottle (maximum 2 bottles).</p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Attribution */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-zinc-500">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_INFO.name} Omakase Inc. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms of Reservation</span>
            <span className="text-gold-400/80 font-serif">10K Awwwards-Tier Build</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
