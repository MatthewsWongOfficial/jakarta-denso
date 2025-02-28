"use client"

import Image from "next/image"
import Head from "next/head"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"

const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false })
const Footer = dynamic(() => import("../components/Footer"), { ssr: false })
const WhatsAppButton = dynamic(() => import("../components/WhatsAppButton"), { ssr: false })

const SalonMobil = () => {
  const pageTitle = "Salon Mobil Premium Cirebon - Jakarta Intl Denso Cirebon"
  const pageDescription =
    "Layanan salon mobil terbaik di Cirebon. Teknisi berpengalaman, produk berkualitas tinggi, dan hasil yang memuaskan. Booking sekarang untuk tampilan mobil yang menawan!"
  const whatsappNumber = "62819647333"

  // Salon mobil steps
  const salonSteps = [
    {
      title: "Inspeksi Awal",
      description: "Pemeriksaan menyeluruh kondisi eksterior dan interior mobil",
      icon: "🔍",
    },
    {
      title: "Pencucian Eksterior",
      description: "Pencucian menyeluruh menggunakan produk khusus untuk melindungi cat",
      icon: "🚿",
    },
    {
      title: "Detailing Eksterior",
      description: "Polishing dan waxing untuk memberikan kilau maksimal pada body mobil",
      icon: "✨",
    },
    {
      title: "Pembersihan Interior",
      description: "Vakum dan pembersihan menyeluruh pada jok, dashboard, dan karpet",
      icon: "🧹",
    },
    {
      title: "Detailing Interior",
      description: "Perawatan khusus untuk dashboard, trim, dan komponen interior lainnya",
      icon: "🧼",
    },
    {
      title: "Perawatan Kaca",
      description: "Pembersihan dan coating kaca untuk visibilitas optimal dan tahan air",
      icon: "🪟",
    },
    {
      title: "Finishing Touch",
      description: "Pemeriksaan akhir dan sentuhan terakhir untuk hasil sempurna",
      icon: "🏁",
    },
  ]

  // For SEO - structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Jakarta Intl Denso Cirebon - Salon Mobil",
    description: pageDescription,
    image: "/images/Salon-mobil.jpeg",
    telephone: whatsappNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Garuda Raya",
      addressLocality: "Cirebon",
      addressRegion: "Jawa Barat",
      postalCode: "45153",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.7320229,
      longitude: 108.5523164
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "18:00",
    },
    priceRange: "$$",
    serviceType: ["Car Detailing", "Auto Salon"],
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="salon mobil, detailing mobil, perawatan mobil, Cirebon, Jakarta Intl Denso" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="/images/Salon-mobil.jpeg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/images/Salon-mobil.jpeg" />
        <link rel="canonical" href="https://www.jakartaintldenso.com/salon-mobil" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Salon-mobil.jpeg"
            alt="Layanan salon mobil premium di Cirebon"
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Salon Mobil Premium Cirebon
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Kembalikan kilau dan kesegaran mobil Anda dengan layanan salon mobil terbaik di Cirebon.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white text-blue-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:bg-blue-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => (window.location.href = `https://wa.me/${whatsappNumber}`)}
          >
            Booking Sekarang
          </motion.button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/Salon-mobil.jpeg"
                  alt="Layanan salon mobil interior di Jakarta Intl Denso Cirebon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Salon Mobil Terbaik di Cirebon
              </h2>

              <p className="text-base sm:text-lg text-gray-700 mb-4">
                Jakarta Intl Denso Cirebon menawarkan layanan salon mobil premium dengan standar kualitas tertinggi.
                Kami menggunakan produk terbaik dan teknologi modern untuk merawat mobil Anda.
              </p>

              <p className="text-base sm:text-lg text-gray-700 mb-6 md:mb-8">
                Tim profesional kami memiliki pengalaman bertahun-tahun dalam industri detailing mobil, menjamin hasil
                yang memuaskan untuk setiap kendaraan.
              </p>

              <ul className="space-y-3 md:space-y-4">
                {[
                  "Detailing eksterior & interior",
                  "Coating nano-ceramic",
                  "Paint correction",
                  "Leather treatment",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2 flex-shrink-0">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Salon Mobil Process */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Proses Salon Mobil Premium Kami
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-8 md:mb-12 max-w-3xl mx-auto">
            Kami mengikuti 7 langkah sistematis untuk memberikan hasil salon mobil terbaik dan terpercaya
          </p>

          <div className="relative">
            {/* Desktop Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-1 bg-blue-200 transform -translate-x-1/2 z-0"></div>

            {salonSteps.map((step, index) => (
              <div
                key={index}
                className={`relative z-10 mb-12 md:mb-16 lg:mb-0 flex flex-col lg:flex-row items-center lg:items-start ${
                  index % 2 === 0 ? "lg:justify-end" : "lg:justify-start"
                }`}
              >
                {/* Mobile and Tablet Layout */}
                <div className="lg:hidden flex flex-col items-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white rounded-full text-2xl mb-4 shadow-lg">
                    {step.icon}
                  </div>
                  <div className="max-w-md text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div
                  className={`hidden lg:flex ${
                    index % 2 === 0 ? "flex-row-reverse justify-start mr-1/2" : "flex-row justify-end ml-1/2"
                  } items-center w-1/2 mb-16`}
                >
                  <div className={`text-center ${index % 2 === 0 ? "mr-8" : "ml-8"} max-w-xs`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                  <div className="relative">
                    <div className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white rounded-full text-2xl shadow-lg z-10">
                      {step.icon}
                    </div>
                    <div
                      className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-1 bg-blue-200 z-0 ${
                        index % 2 === 0 ? "right-full" : "left-full"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16">
            <button
              className="bg-blue-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              onClick={() => (window.location.href = `https://wa.me/${whatsappNumber}`)}
            >
              Booking Salon Mobil Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Layanan Salon Mobil Unggulan
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-8 md:mb-12 max-w-3xl mx-auto">
            Kami menawarkan berbagai layanan salon mobil premium untuk memenuhi kebutuhan perawatan kendaraan Anda
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Detailing Eksterior",
                description: "Perawatan menyeluruh untuk eksterior mobil Anda",
                icon: "🚗",
                features: ["Paint correction", "Ceramic coating", "Polishing", "Waxing"],
              },
              {
                title: "Detailing Interior",
                description: "Perawatan menyeluruh untuk interior mobil Anda",
                icon: "🧼",
                features: ["Deep cleaning", "Leather treatment", "Odor removal", "Fabric protection"],
              },
              {
                title: "Nano Ceramic Coating",
                description: "Perlindungan jangka panjang untuk cat mobil Anda",
                icon: "🛡️",
                features: ["Tahan gores", "Kilau maksimal", "Perlindungan UV", "Tahan air"],
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition duration-300 h-full flex flex-col"
              >
                <div className="text-3xl sm:text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-700 mb-6">{service.description}</p>
                <ul className="text-left space-y-2 mt-auto">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 text-sm sm:text-base">
                      <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
            Berikan Perawatan Terbaik untuk Mobil Anda
          </h2>
          <p className="text-lg sm:text-xl mb-6 md:mb-10 max-w-3xl mx-auto">
          Rasakan layanan salon mobil terbaik! Hubungi kami sekarang!          </p>
          <button
            className="bg-white text-blue-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:bg-blue-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => (window.location.href = `https://wa.me/${whatsappNumber}`)}
          >
            Hubungi Kami via WhatsApp
          </button>
        </div>
      </section>
{/* Location Section */}
<section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/lokasi-kami.jpeg"
                  alt="Lokasi Jakarta Intl Denso Cirebon di Jl. Garuda Raya"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Lokasi Strategis di Pusat Kota
              </h2>

              <p className="text-base sm:text-lg text-gray-700 mb-6">
                Jakarta Intl Denso Cirebon berlokasi strategis di Jl. Garuda Raya, mudah diakses dari seluruh penjuru
                kota Cirebon.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-blue-600 text-xl mr-3 flex-shrink-0">📍</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Alamat</h4>
                    <p className="text-gray-700">Jl. Garuda Raya No. 2, Cirebon, Jawa Barat 45131</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-blue-600 text-xl mr-3 flex-shrink-0">⏰</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jam Operasional</h4>
                    <p className="text-gray-700">Senin - Minggu: 08.00 - 17.00 WIB</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-blue-600 text-xl mr-3 flex-shrink-0">📱</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Kontak</h4>
                    <p className="text-gray-700">WhatsApp: 0819-647-333</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default SalonMobil
