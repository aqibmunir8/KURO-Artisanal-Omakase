"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import {
  LocalAppData,
  Reservation,
  GuestProfile,
  getLocalData,
  createReservation,
  cancelReservation,
  toggleFavoriteDish,
  saveGuestProfile,
  saveNewsletterSubscription,
  getDefaultLocalData,
} from "@/lib/localStore";
import { MenuItem, RESTAURANT_INFO } from "@/data/restaurantData";

interface LocalDataContextType {
  data: LocalAppData;
  isHydrated: boolean;
  reservations: Reservation[];
  activeReservation: Reservation | null;
  favorites: string[];
  isFavorite: (dishId: string) => boolean;
  toggleFavorite: (dishId: string) => boolean;
  addReservation: (
    resData: Omit<Reservation, "id" | "confirmationCode" | "status" | "createdAt">
  ) => Reservation;
  cancelActiveReservation: (id: string) => void;
  guestProfile: GuestProfile;
  updateGuestProfile: (profile: Partial<GuestProfile>) => void;
  subscribeNewsletter: (email: string) => void;
  menuItems: MenuItem[];
  restaurantInfo: typeof RESTAURANT_INFO;
}

const LocalDataContext = createContext<LocalDataContextType | undefined>(undefined);

export const LocalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<LocalAppData>(getDefaultLocalData());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Initial load from local storage
    const loaded = getLocalData();
    setData(loaded);
    setIsHydrated(true);

    // Listen for cross-component and cross-tab storage changes
    const handleDataChange = (e: Event) => {
      const customEvent = e as CustomEvent<LocalAppData>;
      if (customEvent.detail) {
        setData(customEvent.detail);
      } else {
        setData(getLocalData());
      }
    };

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === "kuro_restaurant_data_v1") {
        setData(getLocalData());
      }
    };

    window.addEventListener("kuro_data_changed", handleDataChange);
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("kuro_data_changed", handleDataChange);
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  const activeReservation = useMemo(() => {
    return data.reservations.find((r) => r.status === "confirmed") || null;
  }, [data.reservations]);

  const isFavorite = (dishId: string) => {
    return data.favorites.includes(dishId);
  };

  const handleToggleFavorite = (dishId: string) => {
    const res = toggleFavoriteDish(dishId);
    setData(getLocalData());
    return res;
  };

  const handleAddReservation = (
    resData: Omit<Reservation, "id" | "confirmationCode" | "status" | "createdAt">
  ) => {
    const created = createReservation(resData);
    setData(getLocalData());
    return created;
  };

  const handleCancelReservation = (id: string) => {
    cancelReservation(id);
    setData(getLocalData());
  };

  const handleUpdateProfile = (profile: Partial<GuestProfile>) => {
    saveGuestProfile(profile);
    setData(getLocalData());
  };

  const handleSubscribeNewsletter = (email: string) => {
    saveNewsletterSubscription(email);
    setData(getLocalData());
  };

  const value: LocalDataContextType = {
    data,
    isHydrated,
    reservations: data.reservations,
    activeReservation,
    favorites: data.favorites,
    isFavorite,
    toggleFavorite: handleToggleFavorite,
    addReservation: handleAddReservation,
    cancelActiveReservation: handleCancelReservation,
    guestProfile: data.guestProfile,
    updateGuestProfile: handleUpdateProfile,
    subscribeNewsletter: handleSubscribeNewsletter,
    menuItems: data.menuItems,
    restaurantInfo: data.restaurantInfo,
  };

  return <LocalDataContext.Provider value={value}>{children}</LocalDataContext.Provider>;
};

export const useLocalData = () => {
  const context = useContext(LocalDataContext);
  if (!context) {
    throw new Error("useLocalData must be used within a LocalDataProvider");
  }
  return context;
};
