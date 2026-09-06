"use client";

import { useEffect } from "react";

export const ServiceWorkerRegister: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          // Registered
        })
        .catch((err) => {
          // Registration failed (e.g. dev mode or restricted environment)
        });
    }
  }, []);

  return null;
};
