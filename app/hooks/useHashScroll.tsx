"use client";

import { useEffect } from "react";

export const useHashScroll = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash.substring(1);
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
};
