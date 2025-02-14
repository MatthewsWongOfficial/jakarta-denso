"use client";
import React from 'react';
import Image from "next/image";
import Head from "next/head";
import dynamic from 'next/dynamic';

// Dynamically import components with SSR disabled
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });
const WhatsAppButton = dynamic(() => import("../components/WhatsAppButton"), { ssr: false });

const ServiceMesinAC: React.FC = () => {
  const pageTitle = "Layanan Service Mesin dan AC Mobil Terbaik di Cirebon - Jakarta Intl Denso Cirebon";
  const pageDescription = "Dapatkan perawatan dan perbaikan mesin serta AC mobil terbaik di Cirebon. Kami menyediakan layanan isi gas nitrogen, charge accu, tambal ban tubeless, perbaikan AC, ganti sparepart AC, ganti filter kabin, pembersihan evaporator, dan perbaikan kebocoran AC.";
  const whatsappNumber = "6281964733";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="Service Mesin Mobil Cirebon, Service AC Mobil Cirebon, Isi Gas Nitrogen, Charge ACCU, Tambal Ban Tubeless, Perbaikan AC Mobil, Ganti Sparepart AC, Ganti Filter Kabin, Pembersihan Evaporator, Perbaikan Kebocoran AC" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/service-mesin-ac.jpeg" />
        <link rel="canonical" href="https://jakartaintldenso.com/service-mesin-ac" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section relative py-20 md:py-32 text-white">
        {/* Background Image with Blue Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/service-mesin-ac.jpeg"
            alt="Service Mesin dan AC Mobil Cirebon"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-blue-600/50"></div> {/* 50% translucent blue overlay */}
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Layanan Service Mesin dan AC Mobil Terbaik di Cirebon
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Dapatkan perawatan dan perbaikan mesin serta AC mobil berkualitas tinggi di Jakarta Intl Denso Cirebon.
          </p>
          <a
            href="#layanan-kami"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </section>

      {/* Content Section */}
      <section id="layanan-kami" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/service-ac.jpeg"
                alt="Service AC Mobil di Cirebon"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text Section */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Layanan Service Mesin dan AC Mobil Kami
              </h2>
              <p className="text-gray-700 mb-6">
                Di Jakarta Intl Denso Cirebon, kami menyediakan berbagai layanan service mesin dan AC mobil terbaik untuk memastikan kendaraan Anda selalu dalam kondisi prima.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li className="mb-2">Isi Gas Nitrogen</li>
                <li className="mb-2">Charge ACCU</li>
                <li className="mb-2">Tambal Ban Tubeless</li>
                <li className="mb-2">Perbaikan AC Mobil</li>
                <li className="mb-2">Ganti Sparepart AC</li>
                <li className="mb-2">Ganti Filter Kabin</li>
                <li className="mb-2">Pembersihan Evaporator</li>
                <li className="mb-2">Perbaikan Kebocoran AC</li>
              </ul>
              <a
                href="#hubungi-kami"
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Hubungi Kami Sekarang
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Siap Memperbaiki Mesin dan AC Mobil Anda?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Hubungi kami sekarang untuk mendapatkan layanan service mesin dan AC mobil terbaik di Cirebon. Jadwalkan kunjungan Anda hari ini!
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </>
  );
};

export default ServiceMesinAC;