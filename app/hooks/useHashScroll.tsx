"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useHashScroll = () => {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.substring(1); // Get the hash without "#"
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100); // Delay to allow rendering
      }
    };

    // Handle direct page loads with a hash (e.g., /about#services)
    if (window.location.hash) {
      scrollToHash();
    }

    // Listen for hash changes (for internal anchor links)
    const onHashChange = () => {
      scrollToHash();
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname]); // Runs when pathname changes
};
