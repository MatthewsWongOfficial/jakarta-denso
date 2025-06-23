"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {/* Google Maps Section */}
      <div className="flex items-center gap-3 group">
        <span className={`text-sm font-semibold text-slate-800 bg-gradient-to-r from-white to-gray-50 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-xl border border-white/20
          ${showText ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          relative overflow-hidden
          transition-all duration-500 ease-out
          transform ${showText ? 'translate-x-0' : 'translate-x-2 group-hover:translate-x-0'}`}>
          Kunjugi Kami
        </span>
       <a
  href="https://g.co/kgs/EjRq4kU"
  target="_blank"
  rel="noopener noreferrer"
  className="relative w-16 h-16 transform-gpu
    hover:scale-105 
    active:scale-95
    transition-transform duration-200
    rounded-full
    will-change-transform"
  aria-label="Open in Google Maps"
>
  {/* Shadow element */}
  <div className="absolute inset-0 rounded-full bg-black/20 blur-md transform-gpu translate-y-1" />
  
  {/* Image container */}
  <div className="relative w-full h-full rounded-full bg-white/5 transform-gpu">
    <Image
      src="/images/gmaps-logo.png"
      alt="Google Maps"
      fill
      sizes="64px"
      className="object-contain transform-gpu"
    />
  </div>
</a>

      </div>

      {/* WhatsApp Button */}
      <div className="flex items-center gap-3 group">
        <span className={`text-sm font-semibold text-slate-800 bg-gradient-to-r from-white to-gray-50 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-xl border border-white/20
          ${showText ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          relative overflow-hidden
          transition-all duration-500 ease-out
          transform ${showText ? 'translate-x-0' : 'translate-x-2 group-hover:translate-x-0'}`}>
          Hubungi Kami
        </span>
        <a
          href="https://wa.me/62819647333"
          target="_blank"
          rel="noopener noreferrer"
          className="transform-gpu
            hover:scale-105 
            active:scale-95
            transition-transform duration-200
            rounded-full
            will-change-transform"
          aria-label="Chat on WhatsApp"
        >
          <div className="relative w-16 h-16">
            {/* Shadow element */}
            <div className="absolute inset-0 rounded-full bg-black/20 blur-md transform-gpu translate-y-1" />
            
            {/* Image container */}
            <div className="relative w-full h-full rounded-full bg-white/5 transform-gpu">
              <Image
                src="/images/whatsapp.svg"
                alt=""
                fill
                sizes="64px"
                className="object-contain transform-gpu"
                priority
              />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}