"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { ArrowRight, Award, MapPin, Phone, Users, Clock } from "lucide-react";
import Link from "next/link";

const ExperienceCounter = () => {
  const [count, setCount] = useState(0);
  const targetCount = 20;

  useEffect(() => {
    const timer = setInterval(() => {
      if (count < targetCount) {
        setCount(prevCount => prevCount + 1);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="inline-flex items-center gap-3 px-5 py-2.5 
      bg-[#ed3f36] text-white rounded-lg font-semibold text-sm
      shadow-md hover:shadow-lg transition-shadow">
      <Clock className="w-4 h-4" />
      <span>{count}+ Tahun Melayani Cirebon</span>
    </div>
  );
};

export default function Hero() {
  return (
    <section className="min-h-screen bg-gray-50 relative overflow-hidden">
      
      {/* Asymmetric Background Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-32 bg-gradient-to-l from-[#27398f]/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-48 bg-gradient-to-tr from-[#ed3f36]/8 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="space-y-8">
            
            {/* Header Badge */}
            <div className="flex items-start gap-4">
              <div className="bg-[#27398f] text-white px-3 py-1 rounded text-xs font-medium uppercase tracking-wide">
                Bengkel Terpercaya
              </div>
              <ExperienceCounter />
            </div>

            {/* Main Headline - More Personal */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1]">
                <span className="text-[#27398f]">AC Mobil Rusak?</span>
                <br />
                <span className="text-gray-800">Kami Solusinya!</span>
              </h1>
              
              <div className="flex items-center gap-2 text-[#ed3f36] font-medium text-lg">
                <MapPin className="w-5 h-5" />
                <span>Melayani Seluruh Cirebon & Sekitarnya</span>
              </div>
            </div>

            {/* Personal Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              Dari AC yang tidak dingin sampai perawatan rutin, kami tangani semua masalah kendaraan Anda. 
              <span className="font-semibold text-gray-800"> Percayakan pada kami untuk performa kendaraan terbaik Anda.</span>
            </p>

            {/* Unique Selling Points */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border-l-4 border-[#27398f] shadow-sm">
                <Users className="w-6 h-6 text-[#27398f] flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-800">Diagnosa Gratis</div>
                  <div className="text-sm text-gray-600">Cek kondisi tanpa biaya</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border-l-4 border-[#ed3f36] shadow-sm">
                <Users className="w-6 h-6 text-[#ed3f36] flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-800">Teknisi Ahli</div>
                  <div className="text-sm text-gray-600">Berpengalaman 10+ tahun</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="tel:+62123456789"
                className="inline-flex items-center justify-center px-8 py-4 
                  bg-[#ed3f36] hover:bg-[#d73530] text-white font-semibold rounded-lg
                  transition-colors shadow-lg hover:shadow-xl transform hover:scale-105
                  transition-all duration-200"
              >
                <Phone className="w-5 h-5 mr-2" />
                Telp Sekarang Juga!
              </Link>
              
              <Link
                href="#layanan"
                className="inline-flex items-center justify-center px-8 py-4 
                  bg-white border-2 border-gray-300 hover:border-[#27398f] text-gray-700 
                  hover:text-[#27398f] font-semibold rounded-lg transition-colors"
              >
                Lihat Semua Layanan
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Trust Elements */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="font-bold text-2xl text-gray-800">2000+</div>
                <div className="text-sm text-gray-600">Mobil Diperbaiki</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-gray-800">98%</div>
                <div className="text-sm text-gray-600">Kepuasan Pelanggan</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-gray-800">24/7</div>
                <div className="text-sm text-gray-600">Siap Melayani</div>
              </div>
            </div>

          </div>

          {/* Right Side - Image */}
          <div className="relative lg:h-[600px]">
            
            {/* Main Workshop Image */}
            <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero.avif"
                alt="Teknisi profesional sedang memperbaiki AC mobil di bengkel kami"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                quality={95}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+I="
                className="object-cover"
              />
              
              {/* Overlay with workshop info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Workshop Info Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-2">Workshop Kami</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Fasilitas lengkap dengan peralatan modern untuk memberikan layanan terbaik
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Buka Hari Ini
                  </span>
                  <span className="text-gray-500">08:00 - 17:00 WIB</span>
                </div>
              </div>
            </div>

            {/* Floating Awards/Certifications */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 p-3 rounded-full shadow-lg">
              <Award className="w-6 h-6" />
            </div>
            
            <div className="absolute top-1/3 -left-6 bg-white p-4 rounded-lg shadow-lg border-l-4 border-[#0e74bc]">
              <div className="text-2xl font-bold text-[#0e74bc]">4.8★</div>
              <div className="text-xs text-gray-600">Rating Google</div>
            </div>

            {/* Experience Badge */}
            <div className="absolute bottom-1/3 -right-6 bg-[#27398f] text-white p-4 rounded-lg shadow-lg">
              <div className="text-xl font-bold">20+</div>
              <div className="text-xs">Tahun</div>
              <div className="text-xs">Pengalaman</div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120 C150,100 350,0 600,20 C850,40 1050,100 1200,80 L1200,120 Z"></path>
        </svg>
      </div>

    </section>
  );
}