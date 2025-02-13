"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { X } from "lucide-react";

// Define interface for gallery image data
interface GalleryImage {
  src: string;
  title: string;
  category: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/proses-cuci.jpeg",
    title: "Proses Cuci Mobil Premium",
    category: "Cuci Mobil Cirebon",
    alt: "Layanan cuci mobil premium di Cirebon",
  },
  {
    src: "/images/Poles-Mobil.jpeg",
    title: "Detail Poles Professional",
    category: "Salon Mobil Cirebon",
    alt: "Poles mobil profesional di Cirebon",
  },
  {
    src: "/images/ekterior.jpeg",
    title: "Eksterior Bersih Maksimal",
    category: "Salon Mobil Cirebon", 
    alt: "Hasil cuci mobil eksterior bersih di Cirebon",
  },
  {
    src: "/images/eksterior2.jpeg",
    title: "Eksterior Mengkilap - Hasil Salon Mobil",
    category: "Poles Mobil Cirebon",
    alt: "Hasil poles mobil eksterior mengkilap di Cirebon",
  },
  {
    src: "/images/Jok-mobil.jpeg",
    title: "Cover Jok Mobil Paten / Semi Paten",
    category: "Aksesoris Mobil Cirebon",
    alt: "Layanan pemasangan cover jok mobil di Cirebon",
  },
  {
    src: "/images/Parfum-mobil.jpeg",
    title: "Parfum Mobil Berkualitas",
    category: "Aksesoris Mobil Cirebon",
    alt: "Parfum mobil berkualitas tersedia di Cirebon",
  },
  {
    src: "/images/purging.jpeg",
    title: "Purging Diesel",
    category: "Perawatan Mobil Cirebon",
    alt: "Layanan purging diesel untuk perawatan mobil di Cirebon",
  },
  {
    src: "/images/velg.jpeg",
    title: "Velg Mobil Berkualitas",
    category: "Aksesoris Mobil Cirebon",
    alt: "Pilihan velg mobil berkualitas di Cirebon",
  },
  {
    src: "/images/lokasi-kami.jpeg",
    title: "Lokasi Bengkel JID - Cuci dan AC Mobil di Cirebon",
    category: "Galeri Bengkel Cirebon",
    alt: "Lokasi bengkel cuci dan AC mobil di Cirebon",
  },
];

const GaleriKami: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const pageTitle = "Galeri Layanan Cuci Mobil dan AC Mobil Premium di Cirebon";
  const pageDescription = "Lihat galeri layanan cuci mobil premium dan perawatan AC mobil terbaik di Cirebon. Kami menyediakan layanan berkualitas tinggi untuk kendaraan Anda dengan teknisi berpengalaman.";

  const closeModal = (): void => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const openModal = (image: GalleryImage): void => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="Cuci Mobil Cirebon, AC Mobil Cirebon, Poles Mobil Cirebon, Salon Mobil Cirebon, Perawatan Mobil Cirebon, Bengkel AC Mobil Cirebon" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <link rel="canonical" href="https://jakartaintldenso.com/blogs/cuci-mobil-terbaik-cirebon" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Head>

      <section id="galeri" className="seksi-galeri py-16 md:py-24 bg-white relative">
        <div className="latar-belakang absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30"></div>

        <div className="kontainer-galeri container mx-auto px-4 relative z-10">
          <div className="kepala-galeri text-center mb-12 md:mb-20 relative">
            <h1 className="judul-galeri text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight relative z-10">
              Galeri Layanan Kami
            </h1>
            <div className="absolute inset-x-0 bottom-2 h-10 bg-gradient-to-t from-white to-transparent"></div>
            <div className="garis-judul h-2 w-24 md:w-32 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid-galeri grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="item-galeri group relative p-[2px] rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openModal(image)}
              >
                <div className="efek-blur absolute inset-0 blur-xl bg-gradient-to-br from-blue-500/50 to-blue-600/50 -z-10"></div>

                <div className="konten-gambar relative bg-white rounded-2xl md:rounded-3xl overflow-hidden">
                  <div className="aspect-square sm:aspect-[4/3] relative">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="gambar-galeri object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    <div className="overlay-galeri absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent">
                      <div className="info-galeri absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-4 transition-transform duration-300">
                        <p className="kategori-galeri text-blue-400 text-xs md:text-sm font-medium mb-2">
                          {image.category}
                        </p>
                        <h2 className="judul-gambar text-white text-base md:text-xl font-bold line-clamp-2">
                          {image.title}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="aspect-[4/3] relative">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    priority
                  />
                </div>

                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-blue-600 text-sm">
                    {selectedImage.category}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default GaleriKami;