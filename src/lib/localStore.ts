"use client";

import { MenuItem, RESTAURANT_INFO, MENU_ITEMS, PHILOSOPHY_PILLARS, TESTIMONIALS } from "@/data/restaurantData";

export interface Reservation {
  id: string;
  confirmationCode: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  experience: "counter" | "private";
  partySize: number;
  date: string;
  time: string;
  pairingTier: "none" | "reserve" | "rare";
  dietaryNotes?: string;
  totalAmount: number;
  status: "confirmed" | "cancelled";
  createdAt: string;
}

export interface GuestProfile {
  name: string;
  email: string;
  phone: string;
  dietaryNotes: string;
  preferredPairing: "none" | "reserve" | "rare";
}

export interface LocalAppData {
  version: number;
  guestProfile: GuestProfile;
  reservations: Reservation[];
  favorites: string[];
  newsletterSubscribed: boolean;
  newsletterEmail?: string;
  restaurantInfo: typeof RESTAURANT_INFO;
  menuItems: MenuItem[];
  lastUpdated: string;
}

const STORAGE_KEY = "kuro_restaurant_data_v1";
const SETTINGS_KEY = "kuro_user_preferences";

const DEFAULT_GUEST_PROFILE: GuestProfile = {
  name: "",
  email: "",
  phone: "",
  dietaryNotes: "",
  preferredPairing: "reserve",
};

export const getDefaultLocalData = (): LocalAppData => ({
  version: 1,
  guestProfile: DEFAULT_GUEST_PROFILE,
  reservations: [],
  favorites: [],
  newsletterSubscribed: false,
  restaurantInfo: RESTAURANT_INFO,
  menuItems: MENU_ITEMS,
  lastUpdated: new Date().toISOString(),
});

/**
 * Safe local storage reader that handles SSR gracefully
 */
export const getLocalData = (): LocalAppData => {
  if (typeof window === "undefined") {
    return getDefaultLocalData();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultLocalData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    const parsed: LocalAppData = JSON.parse(raw);
    // Ensure all critical properties exist with fallbacks
    return {
      version: parsed.version || 1,
      guestProfile: { ...DEFAULT_GUEST_PROFILE, ...(parsed.guestProfile || {}) },
      reservations: Array.isArray(parsed.reservations) ? parsed.reservations : [],
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      newsletterSubscribed: Boolean(parsed.newsletterSubscribed),
      newsletterEmail: parsed.newsletterEmail || "",
      restaurantInfo: parsed.restaurantInfo || RESTAURANT_INFO,
      menuItems: Array.isArray(parsed.menuItems) && parsed.menuItems.length > 0 ? parsed.menuItems : MENU_ITEMS,
      lastUpdated: parsed.lastUpdated || new Date().toISOString(),
    };
  } catch (err) {
    console.warn("Failed to load local data, using defaults", err);
    return getDefaultLocalData();
  }
};

/**
 * Save updated state to local storage and broadcast change event
 */
export const saveLocalData = (data: Partial<LocalAppData>): LocalAppData => {
  if (typeof window === "undefined") {
    return getDefaultLocalData();
  }

  try {
    const current = getLocalData();
    const updated: LocalAppData = {
      ...current,
      ...data,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("kuro_data_changed", { detail: updated }));
    return updated;
  } catch (err) {
    console.error("Failed to save local data", err);
    return getLocalData();
  }
};

/**
 * Reservation operations
 */
export const createReservation = (
  resData: Omit<Reservation, "id" | "confirmationCode" | "status" | "createdAt">
): Reservation => {
  const current = getLocalData();
  const confirmationCode = "KR-" + Math.random().toString(36).substring(2, 7).toUpperCase();
  const newReservation: Reservation = {
    ...resData,
    id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    confirmationCode,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  const updatedReservations = [newReservation, ...current.reservations];

  // Also update guest profile
  const updatedProfile: GuestProfile = {
    name: resData.guestName,
    email: resData.guestEmail,
    phone: resData.guestPhone,
    dietaryNotes: resData.dietaryNotes || current.guestProfile.dietaryNotes,
    preferredPairing: resData.pairingTier,
  };

  saveLocalData({
    reservations: updatedReservations,
    guestProfile: updatedProfile,
  });

  return newReservation;
};

export const cancelReservation = (id: string): void => {
  const current = getLocalData();
  const updated = current.reservations.map((r) =>
    r.id === id ? { ...r, status: "cancelled" as const } : r
  );
  saveLocalData({ reservations: updated });
};

export const toggleFavoriteDish = (dishId: string): boolean => {
  const current = getLocalData();
  const exists = current.favorites.includes(dishId);
  const updatedFavorites = exists
    ? current.favorites.filter((id) => id !== dishId)
    : [...current.favorites, dishId];

  saveLocalData({ favorites: updatedFavorites });
  return !exists;
};

export const saveGuestProfile = (profile: Partial<GuestProfile>): void => {
  const current = getLocalData();
  saveLocalData({
    guestProfile: {
      ...current.guestProfile,
      ...profile,
    },
  });
};

export const saveNewsletterSubscription = (email: string): void => {
  saveLocalData({
    newsletterSubscribed: true,
    newsletterEmail: email,
  });
};
