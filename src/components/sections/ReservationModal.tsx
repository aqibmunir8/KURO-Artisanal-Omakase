"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RESTAURANT_INFO } from "@/data/restaurantData";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import {
  X,
  Calendar,
  Users,
  Clock,
  Wine,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Flame,
  Download,
  Trash2,
  BookmarkCheck,
} from "lucide-react";
import { useLocalData } from "@/context/LocalDataContext";
import { Reservation } from "@/lib/localStore";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { activeReservation, addReservation, cancelActiveReservation, guestProfile } =
    useLocalData();

  const [viewMode, setViewMode] = useState<"book" | "manage">("book");
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [experience, setExperience] = useState<"counter" | "private">("counter");
  const [partySize, setPartySize] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>("2026-09-12");
  const [selectedTime, setSelectedTime] = useState<string>("5:30 PM");
  const [pairingTier, setPairingTier] = useState<"none" | "reserve" | "rare">("reserve");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [latestBooking, setLatestBooking] = useState<Reservation | null>(null);

  // Initialize form with saved local profile
  useEffect(() => {
    if (guestProfile) {
      if (guestProfile.name && !guestName) setGuestName(guestProfile.name);
      if (guestProfile.email && !guestEmail) setGuestEmail(guestProfile.email);
      if (guestProfile.phone && !guestPhone) setGuestPhone(guestProfile.phone);
      if (guestProfile.dietaryNotes && !dietaryNotes) setDietaryNotes(guestProfile.dietaryNotes);
      if (guestProfile.preferredPairing) setPairingTier(guestProfile.preferredPairing);
    }
  }, [guestProfile]);

  useEffect(() => {
    if (activeReservation) {
      setViewMode("manage");
    } else {
      setViewMode("book");
    }
  }, [activeReservation, isOpen]);

  if (!isOpen) return null;

  const datesList = [
    { label: "Fri, Sep 12", val: "2026-09-12", available: true },
    { label: "Sat, Sep 13", val: "2026-09-13", available: true },
    { label: "Sun, Sep 14", val: "2026-09-14", available: true },
    { label: "Tue, Sep 16", val: "2026-09-16", available: true },
    { label: "Wed, Sep 17", val: "2026-09-17", available: true },
    { label: "Thu, Sep 18", val: "2026-09-18", available: true },
  ];

  const timesList = [
    { time: "5:30 PM", label: "Twilight Seating", left: 2 },
    { time: "8:30 PM", label: "Evening Seating", left: 4 },
  ];

  const calculateTotal = () => {
    let perPerson = RESTAURANT_INFO.pricing.omakasePrice;
    if (pairingTier === "reserve") perPerson += RESTAURANT_INFO.pricing.reservePairing;
    if (pairingTier === "rare") perPerson += RESTAURANT_INFO.pricing.rareSakePairing;
    return perPerson * partySize;
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;

    sound.playChime();

    const created = addReservation({
      guestName,
      guestEmail,
      guestPhone,
      experience,
      partySize,
      date: selectedDate,
      time: selectedTime,
      pairingTier,
      dietaryNotes,
      totalAmount: calculateTotal(),
    });

    setLatestBooking(created);
    setStep(4);

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#FBF5E6", "#FF5E36", "#FFFFFF"],
      });
    } catch {
      // Confetti fallback
    }
  };

  const downloadCalendarEvent = (res: Reservation) => {
    sound.playClick();
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//KURO Omakase//Reservation//EN
BEGIN:VEVENT
SUMMARY:KURO Omakase Reservation (${res.confirmationCode})
DESCRIPTION:12-Seat Artisanal Omakase & Fire Craft at KURO.\\nParty Size: ${res.partySize} guests\\nConfirmation: ${res.confirmationCode}\\nAddress: 484 Broome St, SoHo, NY
LOCATION:484 Broome Street, New York, NY 10013
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `KURO-Reservation-${res.confirmationCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-surface-100 rounded-3xl border border-gold-400/40 shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-6 sm:p-10 z-10 my-8 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            aria-label="Close reservation modal"
            className="absolute top-5 right-5 p-2 rounded-full bg-surface-50 hover:bg-surface-200 text-zinc-400 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Active Reservation Management View */}
          {viewMode === "manage" && activeReservation && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-serif text-gold-300">黒 KURO</span>
                <span className="text-zinc-600">/</span>
                <span className="text-xs font-sans uppercase tracking-widest text-gold-400 font-semibold flex items-center gap-1">
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  Active VIP Reservation
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-b from-surface-200 to-surface-100 border border-gold-400/40 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-gold-400/20 text-gold-200 text-[10px] font-mono tracking-widest border-b border-l border-gold-400/30 rounded-bl-xl">
                  {activeReservation.confirmationCode}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-gold-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-zinc-100">
                      {activeReservation.experience === "counter"
                        ? "Chef's 18-Course Omakase Counter"
                        : "Private Salon Dining"}
                    </h3>
                    <p className="text-xs font-sans text-zinc-400">
                      Reserved for <span className="text-gold-200 font-semibold">{activeReservation.guestName}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/[0.08] text-xs font-sans">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 block">Date</span>
                    <span className="text-zinc-200 font-medium">{activeReservation.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 block">Seating</span>
                    <span className="text-zinc-200 font-medium">{activeReservation.time}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 block">Party</span>
                    <span className="text-zinc-200 font-medium">{activeReservation.partySize} Guests</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 block">Pairing</span>
                    <span className="text-gold-300 font-medium capitalize">{activeReservation.pairingTier}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 block">Total</span>
                    <span className="text-gold-300 font-medium">${activeReservation.totalAmount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 block">Status</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Confirmed
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => downloadCalendarEvent(activeReservation)}
                  className="flex-1 py-3 rounded-xl bg-gold-500/20 border border-gold-400/40 text-gold-200 font-sans text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:bg-gold-500/30 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Add to Calendar (.ics)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    if (confirm("Are you sure you wish to cancel this reservation?")) {
                      cancelActiveReservation(activeReservation.id);
                      setViewMode("book");
                      setStep(1);
                    }
                  }}
                  className="py-3 px-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 font-sans text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Cancel Reservation
                </button>
              </div>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setViewMode("book");
                    setStep(1);
                  }}
                  className="text-xs font-sans text-zinc-400 hover:text-gold-300 underline"
                >
                  Book an additional seating →
                </button>
              </div>
            </div>
          )}

          {/* Stepper Header for Booking */}
          {viewMode === "book" && (
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xs font-serif text-gold-300">黒 KURO</span>
              <span className="text-zinc-600">/</span>
              <span className="text-xs font-sans uppercase tracking-widest text-zinc-400">
                {step === 4 ? "Confirmed" : `Step ${step} of 3`}
              </span>
            </div>
          )}

          {/* Step 1: Experience & Party Size */}
          {viewMode === "book" && step === 1 && (
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif text-zinc-100 mb-2">
                Select Your Experience
              </h3>
              <p className="text-xs font-sans text-zinc-400 mb-6">
                Intimate 12-seat cedar counter omakase or private salon dining.
              </p>

              {/* Experience Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div
                  onClick={() => {
                    sound.playClick();
                    setExperience("counter");
                  }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    experience === "counter"
                      ? "bg-gold-500/15 border-gold-400/60 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                      : "bg-surface-200/60 border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Flame className="w-5 h-5 text-gold-300" />
                    <span className="text-xs font-serif text-gold-300 font-semibold">
                      ${RESTAURANT_INFO.pricing.omakasePrice}/pp
                    </span>
                  </div>
                  <h4 className="text-sm font-serif text-zinc-100 font-medium mb-1">
                    Chef's Omakase Counter
                  </h4>
                  <p className="text-[11px] font-sans text-zinc-400 leading-relaxed">
                    Front-row seat to the Binchotan fire craft. 18 courses served piece-by-piece.
                  </p>
                </div>

                <div
                  onClick={() => {
                    sound.playClick();
                    setExperience("private");
                  }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    experience === "private"
                      ? "bg-gold-500/15 border-gold-400/60 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                      : "bg-surface-200/60 border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Sparkles className="w-5 h-5 text-gold-300" />
                    <span className="text-xs font-serif text-gold-300 font-semibold">
                      Custom Bespoke
                    </span>
                  </div>
                  <h4 className="text-sm font-serif text-zinc-100 font-medium mb-1">
                    Private Dining Salon
                  </h4>
                  <p className="text-[11px] font-sans text-zinc-400 leading-relaxed">
                    Exclusive salon for 6 to 10 guests with dedicated sommelier &amp; custom courses.
                  </p>
                </div>
              </div>

              {/* Party Size Selector */}
              <div className="mb-8">
                <label className="text-xs font-sans uppercase tracking-widest text-zinc-400 block mb-3">
                  Number of Guests (Max 6 at Counter)
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setPartySize(num);
                      }}
                      className={`flex-1 py-3 rounded-xl text-xs font-sans font-semibold transition-all ${
                        partySize === num
                          ? "bg-gold-400 text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                          : "bg-surface-200 border border-white/[0.08] text-zinc-300 hover:border-white/20"
                      }`}
                    >
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setStep(2);
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-ember text-black font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Continue to Date &amp; Time →
              </button>
            </div>
          )}

          {/* Step 2: Date & Seating Selection */}
          {viewMode === "book" && step === 2 && (
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif text-zinc-100 mb-2">
                Select Date &amp; Seating
              </h3>
              <p className="text-xs font-sans text-zinc-400 mb-6">
                Two seatings nightly. Doors open 15 minutes prior to seating time.
              </p>

              {/* Date Pills */}
              <div className="mb-6">
                <label className="text-xs font-sans uppercase tracking-widest text-zinc-400 block mb-3">
                  Available Dates
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {datesList.map((d) => (
                    <button
                      key={d.val}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedDate(d.val);
                      }}
                      className={`p-3 rounded-xl text-xs font-sans text-left transition-all ${
                        selectedDate === d.val
                          ? "bg-gold-500/20 border border-gold-400/60 text-gold-200"
                          : "bg-surface-200/70 border border-white/[0.06] text-zinc-300 hover:border-white/20"
                      }`}
                    >
                      <span className="block font-medium">{d.label}</span>
                      <span className="text-[10px] text-zinc-500">Available</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <label className="text-xs font-sans uppercase tracking-widest text-zinc-400 block mb-3">
                  Seating Time
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {timesList.map((t) => (
                    <button
                      key={t.time}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedTime(t.time);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedTime === t.time
                          ? "bg-gold-500/20 border-gold-400/60 text-gold-200"
                          : "bg-surface-200/70 border-white/[0.06] text-zinc-300 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-serif font-semibold">{t.time}</span>
                        <span className="text-[10px] text-ember uppercase tracking-wider">
                          {t.left} seats left
                        </span>
                      </div>
                      <span className="text-[11px] font-sans text-zinc-400">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Beverage Pairing Tier */}
              <div className="mb-8">
                <label className="text-xs font-sans uppercase tracking-widest text-zinc-400 block mb-3">
                  Beverage Pairing Program
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setPairingTier("none");
                    }}
                    className={`p-3 rounded-xl text-xs font-sans transition-all text-center ${
                      pairingTier === "none"
                        ? "bg-gold-500/20 border border-gold-400/60 text-gold-200"
                        : "bg-surface-200/70 border border-white/[0.06] text-zinc-400"
                    }`}
                  >
                    <span className="block font-medium">A La Carte</span>
                    <span className="text-[10px] text-zinc-500">Order on arrival</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setPairingTier("reserve");
                    }}
                    className={`p-3 rounded-xl text-xs font-sans transition-all text-center ${
                      pairingTier === "reserve"
                        ? "bg-gold-500/20 border border-gold-400/60 text-gold-200"
                        : "bg-surface-200/70 border border-white/[0.06] text-zinc-400"
                    }`}
                  >
                    <span className="block font-medium">Reserve Pairing</span>
                    <span className="text-[10px] text-gold-300">+${RESTAURANT_INFO.pricing.reservePairing}/pp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setPairingTier("rare");
                    }}
                    className={`p-3 rounded-xl text-xs font-sans transition-all text-center ${
                      pairingTier === "rare"
                        ? "bg-gold-500/20 border border-gold-400/60 text-gold-200"
                        : "bg-surface-200/70 border border-white/[0.06] text-zinc-400"
                    }`}
                  >
                    <span className="block font-medium">Grand Cru Sake</span>
                    <span className="text-[10px] text-gold-300">+${RESTAURANT_INFO.pricing.rareSakePairing}/pp</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setStep(1);
                  }}
                  className="w-1/3 py-4 rounded-xl bg-surface-200 border border-white/10 text-zinc-300 font-sans text-xs uppercase tracking-[0.2em]"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setStep(3);
                  }}
                  className="w-2/3 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-black font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  Guest Details →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Guest Details & Confirmation */}
          {viewMode === "book" && step === 3 && (
            <form onSubmit={handleComplete}>
              <h3 className="text-2xl sm:text-3xl font-serif text-zinc-100 mb-2">
                Guest Information
              </h3>
              <p className="text-xs font-sans text-zinc-400 mb-6">
                Your VIP concierge confirmation will be securely remembered locally.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-sans uppercase tracking-widest text-zinc-400 block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Sterling Alexander"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-white/10 text-zinc-100 text-xs focus:outline-none focus:border-gold-400/60 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-sans uppercase tracking-widest text-zinc-400 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@luxury.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-white/10 text-zinc-100 text-xs focus:outline-none focus:border-gold-400/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-sans uppercase tracking-widest text-zinc-400 block mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (212) 555-0199"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-white/10 text-zinc-100 text-xs focus:outline-none focus:border-gold-400/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-sans uppercase tracking-widest text-zinc-400 block mb-1.5">
                    Dietary Restrictions / Allergies
                  </label>
                  <input
                    type="text"
                    placeholder="Please specify any shellfish, mushroom, or soy sensitivities..."
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-200 border border-white/10 text-zinc-100 text-xs focus:outline-none focus:border-gold-400/60 transition-colors"
                  />
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 rounded-xl bg-surface-200/80 border border-gold-400/20 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-serif text-zinc-200 block">
                    {partySize} Guests · {selectedDate} · {selectedTime}
                  </span>
                  <span className="text-[10px] font-sans text-zinc-400">
                    {experience === "counter" ? "Chef's Omakase Counter" : "Private Dining Salon"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-sans text-zinc-400 uppercase tracking-widest block">
                    Estimated Total
                  </span>
                  <span className="text-base font-serif text-gold-300 font-bold">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setStep(2);
                  }}
                  className="w-1/3 py-4 rounded-xl bg-surface-200 border border-white/10 text-zinc-300 font-sans text-xs uppercase tracking-[0.2em]"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-4 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-ember text-black font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:scale-[1.02] transition-transform"
                >
                  Confirm VIP Reservation
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Success Confirmation */}
          {viewMode === "book" && step === 4 && latestBooking && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-400/60 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <CheckCircle2 className="w-8 h-8 text-gold-300" />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-surface-200 border border-gold-400/30 text-gold-300 text-xs font-mono mb-3">
                Confirmation #{latestBooking.confirmationCode}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-zinc-100 mb-2">
                Reservation Request Secured
              </h3>

              <p className="text-xs sm:text-sm font-sans text-zinc-300 max-w-md mx-auto mb-6 leading-relaxed">
                Thank you, <span className="text-gold-200 font-semibold">{latestBooking.guestName}</span>. Your {latestBooking.partySize}-guest reservation for{" "}
                <span className="text-gold-200 font-semibold">{latestBooking.date}</span> at{" "}
                <span className="text-gold-200 font-semibold">{latestBooking.time}</span> is stored in your local session.
              </p>

              <div className="flex justify-center gap-3 mb-8">
                <button
                  type="button"
                  onClick={() => downloadCalendarEvent(latestBooking)}
                  className="px-5 py-2.5 rounded-full bg-gold-500/20 hover:bg-gold-500/30 border border-gold-400/40 text-gold-200 text-xs font-sans uppercase tracking-wider flex items-center gap-2 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  Add to Calendar
                </button>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                  setStep(1);
                }}
                className="px-8 py-3.5 rounded-full bg-surface-200 hover:bg-surface-50 border border-white/10 text-zinc-200 font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all"
              >
                Return to Experience
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
