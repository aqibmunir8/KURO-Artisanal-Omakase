"use client";

import React, { useState } from "react";
import { Preloader } from "@/components/ui/Preloader";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { MenuShowcase } from "@/components/sections/MenuShowcase";
import { DishModal } from "@/components/sections/DishModal";
import { ChefCraft } from "@/components/sections/ChefCraft";
import { AmbienceGallery } from "@/components/sections/AmbienceGallery";
import { ReservationModal } from "@/components/sections/ReservationModal";
import { Footer } from "@/components/sections/Footer";
import { MenuItem } from "@/data/restaurantData";

export default function Home() {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  return (
    <main className="relative min-h-screen bg-background overflow-hidden selection:bg-gold-500/20">
      {/* Luxury Atmospheric Preloader */}
      <Preloader />

      {/* Global Luxury Header Navigation */}
      <Navbar onOpenReservation={() => setReservationOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenReservation={() => setReservationOpen(true)} />

      {/* The 3 Pillars of Philosophy */}
      <Philosophy />

      {/* 18-Course Omakase Menu Showcase */}
      <MenuShowcase
        onSelectDish={(dish) => setSelectedDish(dish)}
        onOpenReservation={() => setReservationOpen(true)}
      />

      {/* Master Chef & Fire Craft */}
      <ChefCraft />

      {/* Ambience & Press Accolades */}
      <AmbienceGallery />

      {/* Interactive Footer & Location */}
      <Footer onOpenReservation={() => setReservationOpen(true)} />

      {/* Dish Quick-View Modal */}
      <DishModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onOpenReservation={() => setReservationOpen(true)}
      />

      {/* VIP Step-by-Step Reservation Engine */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
    </main>
  );
}
