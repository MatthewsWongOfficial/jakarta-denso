"use client";

import Image from "next/image";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/62819647333"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 
        transform-gpu
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
            loading="lazy"
          />
        </div>
      </div>
    </a>
  );
}