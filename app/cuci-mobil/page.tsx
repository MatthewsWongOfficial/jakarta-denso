"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Head from "next/head"
import dynamic from "next/dynamic"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false })
const Footer = dynamic(() => import("../components/Footer"), { ssr: false })
const WhatsAppButton = dynamic(() => import("../components/WhatsAppButton"), { ssr: false })

const CuciMobilCirebon: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const pageTitle = "Cuci Mobil Premium & Servis AC Mobil Cirebon - Jakarta Intl Denso Cirebon"
  const pageDescription =
    "Pionir cuci mobil & servis AC di Cirebon sejak 2004. Teknisi profesional, air PDAM berkualitas, dan lokasi strategis di Jl. Garuda Raya. Booking sekarang untuk pelayanan terbaik!"
  const whatsappNumber = "6281964733"

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Jakarta Intl Denso Cirebon",
    description: pageDescription,
    founder: "Jakarta Intl Denso",
    foundingDate: "2004",
    image: "/images/lokasi-kami.jpeg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Garuda Raya No 2-4",
      addressLocality: "Cirebon",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-6.7320",
      longitude: "108.5523",
    },
    areaServed: "Cirebon",
    serviceType: ["Car Wash", "AC Service"],
    openingHours: "Mo-Su 08:00-17:00",
    priceRange: "$$",
  }

  // const fadeInUp = {
  //   hidden: { opacity: 0, y: 1 },
  //   visible: { opacity: 1, y: 0.1, transition: { duration: 0 } },
  // }

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="cuci mobil Cirebon, servis AC mobil Cirebon, bengkel AC mobil Cirebon, cuci mobil premium Cirebon, Jakarta Intl Denso, cuci mobil air PDAM, poles mobil Cirebon, perawatan mobil Cirebon"
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/lokasi-kami.jpeg" />
        <meta property="og:url" content="https://jakartaintldenso.com/cuci-mobil" />
        <link rel="canonical" href="https://jakartaintldenso.com/cuci-mobil" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
      
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Pionir Cuci Mobil Premium
              <br className="hidden md:block" /> di Cirebon Sejak 2004
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Percayakan perawatan mobil Anda kepada yang terpercaya. Teknisi profesional dengan pengalaman 20+ tahun
              dalam industri otomotif.
            </p>
            <motion.a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Booking Sekarang
            </motion.a>
          </motion.div>
        </section>

        {/* About Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" animate={controls} className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-8">
                Kami adalah <span className="text-blue-600">Pionir Cuci Mobil Cirebon</span>
              </h2>
              <div className="prose prose-lg mx-auto">
                <p className="mb-6">
                  Sejak 2004, <strong className="text-blue-600">Jakarta Intl Denso Cirebon</strong> telah menjadi nama
                  yang dipercaya dalam industri perawatan kendaraan di Cirebon. Kami bangga menjadi
                  <span className="bg-yellow-200 px-1">pelopor layanan cuci mobil premium</span> yang menghadirkan
                  standar baru dalam kebersihan dan perawatan kendaraan.
                </p>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Layanan Kami yang Beragam</h3>
                <p className="mb-6">
                  Servis kami beragam, mulai dari <strong>cuci mobil salju profesional</strong>,
                  <strong>cuci motor premium</strong>, hingga <strong>servis AC mobil</strong> yang komprehensif. Setiap
                  layanan dirancang untuk memberikan hasil terbaik dan kepuasan maksimal bagi pelanggan kami.
                </p>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Keunggulan Kami</h3>
                <p>Di bidang ini, kami berpengalaman dan terbaik dalam:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>
                    <strong>Berpengalaman</strong> Kami selalu berkomitmen untuk membuat pengalaman terbaik dan memberikan servis terbaik kepada pelanggan kami . 
                  </li>
                  <li>
                    <strong>Tim Ahli:</strong> Teknisi berpengalaman dengan pengetahuan mendalam tentang berbagai jenis
                    kendaraan.
                  </li>
                  <li>
                    <strong>Layanan Personalisasi:</strong> Menyesuaikan perawatan dengan kebutuhan spesifik setiap
                    kendaraan.
                  </li>
                  <li>
                    <strong>Komitmen Kualitas:</strong> Standar tinggi dalam setiap aspek layanan kami.
                  </li>
                </ul>
                <p className="text-lg font-semibold text-blue-600">
                  Percayakan kendaraan Anda kepada yang terbaik. Jakarta Intl Denso Cirebon - Mitra tepercaya untuk
                  perawatan kendaraan Anda sejak 2004.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white" ref={ref}>
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-12"
              initial="hidden"
              animate={controls}
            >
              Layanan Cuci Mobil Premium Kami
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="hidden"
              animate={controls}
            >
              {[
                {
                  title: "Cuci Motor Salju Premium",
                  description: "Teknologi snow wash dengan busa salju berlimpah untuk pembersihan menyeluruh.",
                  icon: "🏍️",
                  image: "/images/cuci-mobil-13.jpeg?height=200&width=300",
                },
                {
                  title: "Cuci Mobil Salju Profesional",
                  description: "Teknologi snow wash terkini untuk hasil pembersihan sempurna dan kilau alami.",
                  icon: "🚗",
                  image: "/placeholder.svg?height=200&width=300",
                },
                {
                  title: "Cuci Mobil Aneka Rasa",
                  description: "Paket cuci premium dengan pilihan wangi sesuai preferensi Anda.",
                  icon: "🌈",
                  image: "/placeholder.svg?height=200&width=300",
                },
                {
                  title: "Cuci Wetlook Eksklusif",
                  description: "Hasil akhir wetlook mengkilap dengan produk khusus tahan lama.",
                  icon: "✨",
                  image: "/placeholder.svg?height=200&width=300",
                },
                {
                  title: "Doorsmeer T6 Spesial",
                  description: "Layanan doorsmeer premium dengan teknik dan produk khusus T6.",
                  icon: "🚪",
                  image: "/images/cuci-mobil-13.jpeg?height=200&width=300",
                },
                {
                  title: "Servis AC Mobil",
                  description: "Perawatan dan perbaikan AC mobil oleh teknisi berpengalaman.",
                  icon: "❄️",
                  image: "/placeholder.svg?height=200&width=300",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                >
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-700">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-black mb-6"
              initial="hidden"
              animate={controls}
            >
              Percayakan Mobil Anda Kepada Ahlinya
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              initial="hidden"
              animate={controls}
            >
              19 tahun melayani Cirebon dengan kualitas terbaik. Jadwalkan cuci mobil Anda sekarang!
            </motion.p>
            <motion.a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial="hidden"
              animate={controls}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Hubungi via WhatsApp
            </motion.a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default CuciMobilCirebon

