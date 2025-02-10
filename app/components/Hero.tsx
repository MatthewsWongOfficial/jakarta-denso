"use client";
import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ExperienceBanner = () => {
  const [count, setCount] = useState(0);
  const targetCount = 20;

  useEffect(() => {
    const timer = setInterval(() => {
      if (count < targetCount) {
        setCount(prevCount => prevCount + 1);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="inline-flex items-center justify-center 
      bg-white/10 
      px-6 py-2 
      rounded-full 
      shadow-lg 
      drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)]
      space-x-4
      text-xl sm:text-2xl md:text-3xl
      backdrop-blur-sm">
      <span className="bg-gradient-to-r from-white to-gray-300 
        bg-clip-text text-transparent 
        font-bold tracking-wide">
        {count}+ Tahun Pengalaman
      </span>
      <span className="w-[3px] h-8 bg-white/50 opacity-70 select-none"></span>
      <span className="bg-gradient-to-r from-white to-gray-300 
        bg-clip-text text-transparent 
        font-bold tracking-wide">
        Sejak 2004
      </span>
    </div>
  );
};

export default function Hero() {
  return (
    <>
      <Head>
        <title>Bengkel AC Mobil & Perawatan Mobil Terpercaya di Cirebon</title>
        <meta name="description" content="Bengkel terbaik di Cirebon untuk AC mobil dan perawatan mobil. Layanan berkualitas dengan pengalaman lebih dari 20 tahun." />
        <meta name="keywords" content="Bengkel Terbaik Cirebon, Cuci Mobil Cirebon, Bengkel AC Cirebon, Perawatan Mobil Cirebon" />
        <meta name="author" content="Bengkel AC Cirebon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="preload" href="/images/2022-09-07.jpg" as="image" />
      </Head>

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/2022-09-07.avif"
            alt="Bengkel AC Mobil"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="/images/2022-09-07-blur.avif"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-800/20 to-blue-700/10 opacity-90"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="space-y-8 max-w-5xl mx-auto">
            <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]
              font-extrabold text-white leading-tight
              text-center break-words
              drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]
              max-w-4xl mx-auto">
              BENGKEL AC MOBIL & <br className="hidden sm:block" />
              PERAWATAN MOBIL TERPERCAYA DI CIREBON
            </h1>

            <ExperienceBanner />

            <div className="flex justify-center">
              <Link
                href="#services"
                className="group inline-flex items-center px-8 py-4
                  text-lg font-semibold
                  rounded-full
                  bg-blue-600 hover:bg-blue-700
                  border-2 border-blue-400/30
                  text-white
                  transition-all duration-300
                  hover:scale-105
                  hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
              >
                <span className="flex items-center">
                  Lihat Layanan Kami
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>
    </>
  );
}