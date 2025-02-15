"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Head from "next/head"
import { X } from "lucide-react"

interface GalleryImage {
  src: string
  title: string
  category: string
  alt: string
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
]

const GallerySkeleton: React.FC = () => (
  <div className="bg-white rounded-3xl overflow-hidden">
    <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse" />
    <div className="p-4">
      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
    </div>
  </div>
)

const GaleriKami: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({})

  const handleImageLoad = useCallback((src: string) => {
    setLoadingStates((prev) => ({ ...prev, [src]: true }))
  }, [])

  const closeModal = useCallback((): void => {
    setSelectedImage(null)
    document.body.style.overflow = "unset"
  }, [])

  const openModal = useCallback((image: GalleryImage): void => {
    setSelectedImage(image)
    document.body.style.overflow = "hidden"
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "Escape") closeModal()
        if (e.key === "ArrowRight") {
          const currentIndex = galleryImages.findIndex((img) => img.src === selectedImage.src)
          const nextImage = galleryImages[currentIndex + 1]
          if (nextImage) setSelectedImage(nextImage)
        }
        if (e.key === "ArrowLeft") {
          const currentIndex = galleryImages.findIndex((img) => img.src === selectedImage.src)
          const prevImage = galleryImages[currentIndex - 1]
          if (prevImage) setSelectedImage(prevImage)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, closeModal])

  return (
    <>
      <Head>
        <title>Galeri Layanan Cuci & Service Mobil</title>
        <meta
          name="description"
          content="Galeri layanan Jakarta Intl Denso Cirebon: cuci mobil premium, poles profesional, service AC, dan perawatan kendaraan lengkap oleh teknisi berpengalaman."
        />
        <meta
          name="keywords"
          content="cuci mobil Cirebon, poles mobil Cirebon, service AC mobil Cirebon, bengkel mobil Cirebon, Jakarta Intl Denso"
        />
        <meta property="og:title" content="Jakarta Intl Denso Cirebon - Galeri Layanan" />
        <meta
          property="og:description"
          content="Lihat galeri layanan kami: cuci mobil premium, poles profesional, dan perawatan kendaraan lengkap di Cirebon."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta name="robots" content="index, follow" />
      </Head>

      <section id="galeri" className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight relative z-10">
              Galeri Layanan Kami
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Temukan layanan berkualitas Jakarta Intl Denso Cirebon: cuci mobil premium, poles profesional, dan
              perawatan kendaraan lengkap
            </p>
            <div className="absolute inset-x-0 bottom-2 h-10 bg-gradient-to-t from-white to-transparent"></div>
            <div className="h-2 w-32 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-[2px] rounded-3xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 shadow-lg transition-all duration-300"
                onClick={() => openModal(image)}
              >
                <div className="absolute inset-0 blur-xl bg-gradient-to-br from-blue-500/50 to-blue-600/50 -z-10"></div>
                {!loadingStates[image.src] && <GallerySkeleton />}
                <div
                  className={`aspect-[4/3] relative rounded-3xl overflow-hidden ${!loadingStates[image.src] ? "invisible" : ""}`}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 scale-105"
                    loading="lazy"
                    onLoadingComplete={() => handleImageLoad(image.src)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-blue-400 text-sm font-medium mb-1">{image.category}</p>
                      <h2 className="text-white text-lg font-bold line-clamp-2">{image.title}</h2>
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="aspect-[4/3] relative">
                  <Image
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    priority
                  />
                </div>

                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
                  <p className="text-blue-600 text-sm">{selectedImage.category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}

export default GaleriKami

