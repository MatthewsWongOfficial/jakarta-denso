"use client";
import React from 'react';
import Image from "next/image";
import Head from "next/head";
import dynamic from 'next/dynamic';

// Dynamically import components with SSR disabled
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });
const WhatsAppButton = dynamic(() => import("../components/WhatsAppButton"), { ssr: false });

const SalonMobilCirebon: React.FC = () => {
  const pageTitle = "Salon Mobil Premium Terbaik di Cirebon - Jakarta Intl Denso Cirebon";
  const pageDescription = "Dapatkan perawatan mobil premium di Cirebon dengan layanan salon mobil terbaik. Kami menggunakan produk berkualitas tinggi dan teknisi berpengalaman untuk membuat mobil Anda terlihat seperti baru.";
  const whatsappNumber = "6281964733";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="Salon Mobil Cirebon, Perawatan Mobil Premium, Detailing Mobil, Salon Mobil Terbaik Cirebon" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/salon-mobil.jpeg" />
        <link rel="canonical" href="https://jakartaintldenso.com/salon-mobil" />
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
            src="/images/salon-mobil.jpeg"
            alt="Salon Mobil Cirebon"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-blue-600/50"></div> {/* 50% translucent blue overlay */}
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Salon Mobil Premium Terbaik di Cirebon
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Dapatkan perawatan mobil premium berkualitas tinggi untuk mobil Anda di Jakarta Intl Denso Cirebon.
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
                src="/images/proses-salon.jpeg"
                alt="Proses Salon Mobil Premium di Cirebon"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Text Section */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Mengapa Memilih Layanan Salon Mobil Kami?
              </h2>
              <p className="text-gray-700 mb-6">
                Di Jakarta Intl Denso Cirebon, kami menawarkan layanan salon mobil premium dengan standar tertinggi. Kami menggunakan produk berkualitas tinggi dan teknisi berpengalaman untuk membuat mobil Anda terlihat seperti baru.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li className="mb-2">Menggunakan produk perawatan mobil premium.</li>
                <li className="mb-2">Dilakukan oleh teknisi terlatih dan berpengalaman.</li>
                <li className="mb-2">Proses salon yang cepat dan efisien.</li>
                <li className="mb-2">Hasil perawatan yang tahan lama.</li>
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
            Siap Membuat Mobil Anda Terlihat Seperti Baru?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Hubungi kami sekarang untuk mendapatkan layanan salon mobil premium terbaik di Cirebon. Jadwalkan kunjungan Anda hari ini!
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

export default SalonMobilCirebon;