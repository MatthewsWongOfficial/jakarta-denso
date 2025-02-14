"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const useHashScroll = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.substring(1); // Remove "#"
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 200); // Slight delay to ensure rendering
      }
    };

    // Handle direct page loads with hash (e.g., /about#services)
    setTimeout(scrollToHash, 300); // Delay to wait for component mount

    // Listen for hash changes (for internal links)
    const onHashChange = () => scrollToHash();
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname, searchParams]); // Re-run when navigating
};
