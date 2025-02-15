"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Head from "next/head"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"

const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false })
const Footer = dynamic(() => import("../components/Footer"), { ssr: false })
const WhatsAppButton = dynamic(() => import("../components/WhatsAppButton"), { ssr: false })

const CuciMobilCirebon: React.FC = () => {
  // Properly initialize state
  const [setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    // Ensure setIsLoaded is a function
    if (typeof setIsLoaded === "function") {
      setIsLoaded(true)
    }
  }, [])

  const pageTitle = "Cuci Mobil Premium & Servis AC Mobil Cirebon - Jakarta Intl Denso Cirebon"
  const pageDescription =
    "Pionir cuci mobil & servis AC di Cirebon sejak 2004. Teknisi profesional, air PDAM berkualitas, dan lokasi strategis di Jl. Garuda Raya. Booking sekarang untuk pelayanan terbaik!"
  const whatsappNumber = "6281964733"

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="cuci mobil cirebon, servis ac mobil cirebon, perawatan mobil cirebon, cuci mobil premium cirebon" />
        <meta name="author" content="Jakarta Intl Denso Cirebon" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://www.jakartaintldensocirebon.com" />
      </Head>

      <Navbar />

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-24 md:py-36 text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/lokasi-kami.jpeg"
              alt="Jakarta Intl Denso - Pionir Cuci Mobil Cirebon"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60"></div>
          </div>

          <motion.div
            className="container mx-auto px-4 text-center relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Pionir Cuci Mobil Premium di Cirebon Sejak 2004
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Percayakan perawatan mobil Anda kepada teknisi profesional dengan pengalaman 20+ tahun dalam industri otomotif.
            </p>
            <motion.a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Booking Sekarang
            </motion.a>
          </motion.div>
        </section>

        {/* About Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6">
                Kami adalah <span className="text-blue-600">Pionir Cuci Mobil Cirebon</span>
              </h2>
              <p className="text-lg mb-4">
                Sejak 2004, <strong className="text-blue-600">Jakarta Intl Denso Cirebon</strong> telah menjadi nama yang dipercaya dalam industri perawatan kendaraan di Cirebon.
              </p>
              <p className="text-lg">
                Kami menawarkan layanan terbaik dengan tim profesional, penggunaan air PDAM berkualitas, dan lokasi strategis.
              </p>
            </div>
            <div className="relative w-full h-80">
              <Image src="/images/Cuci-mobil.jpeg" alt="Servis Mobil" fill className="object-cover rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        {/* Daily Car Wash Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
            <div className="relative w-full h-80">
              <Image 
                src="/images/eksterior2.jpeg" 
                alt="Cuci Mobil Cirebon - Layanan Terbaik" 
                fill 
                className="object-cover rounded-lg shadow-lg" 
                priority 
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6">
                Layanan Cuci Mobil Terbaik di Cirebon
              </h2>
              <p className="text-lg mb-4">
                Setiap hari, kami rata-rata mencuci <strong className="text-blue-600">50 mobil</strong> dengan standar kualitas tertinggi. Kami menjamin kepuasan pelanggan dengan layanan cuci mobil yang cepat, bersih, dan ramah lingkungan.
              </p>
              <p className="text-lg">
                Dengan pengalaman lebih dari 20 tahun, kami memahami betul kebutuhan perawatan mobil Anda. Teknisi kami yang profesional menggunakan peralatan modern dan air PDAM berkualitas untuk memberikan hasil terbaik.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default CuciMobilCirebon