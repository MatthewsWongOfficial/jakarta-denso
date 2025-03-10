"use client"

import Image from "next/image"
import Head from "next/head"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"

const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false })
const Footer = dynamic(() => import("../components/Footer"), { ssr: false })
const WhatsAppButton = dynamic(() => import("../components/WhatsAppButton"), { ssr: false })

// export const metadata: Metadata = {
//   title: "Cuci Mobil Premium & Servis AC Mobil Cirebon - Jakarta Intl Denso Cirebon",
//   description:
//     "Pionir cuci mobil & servis AC di Cirebon sejak 2004. Layanan cuci mobil murah, cuci mobil terbaik dengan teknisi profesional, air PDAM berkualitas, dan lokasi strategis di Jl. Garuda Raya.",
//   keywords:
//     "cuci mobil cirebon, cuci mobil murah, cuci mobil terbaik, servis ac mobil cirebon, jakarta intl denso, cuci mobil premium, cuci mobil profesional, cuci mobil berkualitas, cuci mobil hidrolik, cuci mobil snow wash",
//   openGraph: {
//     title: "Cuci Mobil Premium & Servis AC Mobil Cirebon - Jakarta Intl Denso",
//     description:
//       "Pionir cuci mobil & servis AC di Cirebon sejak 2004. Layanan cuci mobil murah dan terbaik dengan teknisi profesional.",
//     images: [
//       {
//         url: "/images/blog-cuci-mobil.jpeg",
//         width: 1200,
//         height: 630,
//         alt: "Cuci Mobil Premium Cirebon",
//       },
//     ],
//     locale: "id_ID",
//     type: "website",
//   },
// }

const CuciMobilCirebon = () => {
  const pageTitle = "Cuci Mobil Premium & Servis AC Mobil Cirebon - Jakarta Intl Denso Cirebon"
  const pageDescription =
    "Pionir cuci mobil & servis AC di Cirebon sejak 2004. Layanan cuci mobil murah, cuci mobil terbaik dengan teknisi profesional, air PDAM berkualitas, dan lokasi strategis di Jl. Garuda Raya. Booking sekarang untuk pelayanan terbaik!"
  const whatsappNumber = "62819647333"

  // Car wash steps
  const carWashSteps = [
    {
      title: "Mobil Masuk",
      description: "Mobil memasuki area pencucian dan diperiksa kondisinya oleh teknisi kami",
      icon: "🚗",
    },
    {
      title: "Naik Hidrolik",
      description: "Mobil dinaikkan ke hidrolik untuk memudahkan akses ke semua bagian kendaraan",
      icon: "⬆️",
    },
    {
      title: "Penyemprotan Snow",
      description: "Menggunakan snow foam premium untuk mengangkat kotoran dan debu tanpa merusak cat",
      icon: "❄️",
    },
    {
      title: "Pembersihan Manual",
      description:
        "Proses hand wash dengan kain microfiber untuk hasil yang lebih bersih dan menghilangkan kotoran yang membandel",
      icon: "🧽",
    },
    {
      title: "Pembilasan",
      description: "Menggunakan air PDAM berkualitas untuk membilas semua sisa sabun dengan sempurna",
      icon: "💦",
    },
    {
      title: "Pembersihan Interior",
      description: "Penyedotan debu dan pembersihan dashboard, jok, karpet, dan bagian dalam lainnya",
      icon: "🧹",
    },
    {
      title: "Pengeringan",
      description: "Pengeringan menyeluruh menggunakan kanebo premium untuk hasil akhir yang sempurna tanpa bekas air",
      icon: "✨",
    },
  ]

  // For SEO - structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Jakarta Intl Denso Cirebon",
    description: pageDescription,
    image: "/images/blog-cuci-mobil.jpeg",
    telephone: whatsappNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Garuda Raya",
      addressLocality: "Cirebon",
      addressRegion: "Jawa Barat",
      postalCode: "45153",
      addressCountry: "ID",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "18:00",
    },
    priceRange: "$$",
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="cuci mobil cirebon, cuci mobil murah, cuci mobil terbaik, servis ac mobil cirebon, jakarta intl denso, cuci mobil premium, cuci mobil profesional, cuci mobil berkualitas, cuci mobil hidrolik, cuci mobil snow wash"
        />
        <meta property="og:title" content="Cuci Mobil Premium & Servis AC Mobil Cirebon - Jakarta Intl Denso" />
        <meta
          property="og:description"
          content="Pionir cuci mobil & servis AC di Cirebon sejak 2004. Layanan cuci mobil murah dan terbaik dengan teknisi profesional."
        />
        <meta property="og:image" content="/images/blog-cuci-mobil.jpeg" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="id_ID" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/blog-cuci-mobil.jpeg"
            alt="Layanan cuci mobil premium di Cirebon"
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
            Pionir Cuci Mobil Premium di Cirebon Sejak 2004
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Percayakan perawatan mobil Anda kepada teknisi profesional dengan pengalaman 20+ tahun dalam industri
            otomotif.
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
                  src="/images/cuci-mobil12.jpeg"
                  alt="Sejarah Jakarta Intl Denso Cirebon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Kami adalah Pionir Cuci Mobil Cirebon
              </h2>

              <p className="text-base sm:text-lg text-gray-700 mb-4">
                Sejak 2004, <strong>Jakarta Intl Denso Cirebon</strong> telah menjadi nama yang dipercaya dalam industri
                perawatan kendaraan di Cirebon.
              </p>

              <p className="text-base sm:text-lg text-gray-700 mb-6 md:mb-8">
                Kami menawarkan layanan terbaik dengan tim profesional, penggunaan air PDAM berkualitas, dan lokasi
                strategis di Jl. Garuda Raya, pusat kota Cirebon.
              </p>

              <ul className="space-y-3 md:space-y-4">
                {[
                  "Cuci mobil premium dengan teknisi berpengalaman",
                  "Servis AC mobil oleh teknisi terbaik",
                  "Garansi kepuasan 100% untuk setiap layanan",
                  "Fasilitas tunggu nyaman dengan WiFi gratis",
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

      {/* Daily Car Wash Section */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/blog-cuci-mobil.jpeg"
                  alt="Layanan cuci mobil harian terbaik di Cirebon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Layanan Cuci Mobil Terbaik di Cirebon
              </h2>

              <p className="text-base sm:text-lg text-gray-700 mb-4">
                Setiap hari, kami rata-rata mencuci <strong>50 mobil</strong> dengan standar kualitas tertinggi. Kami
                menjamin kepuasan pelanggan dengan layanan cuci mobil yang cepat, bersih, dan ramah lingkungan.
              </p>

              <p className="text-base sm:text-lg text-gray-700 mb-6 md:mb-8">
                Dengan pengalaman lebih dari 20 tahun, kami memahami betul kebutuhan perawatan mobil Anda. Teknisi kami
                yang profesional menggunakan peralatan modern dan air PDAM berkualitas untuk memberikan hasil terbaik.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { title: "Mobil", value: "50+", suffix: "per hari" },
                  { title: "Pelanggan", value: "10,000+", suffix: "puas" },
                  { title: "Pengalaman", value: "20+", suffix: "tahun" },
                  { title: "Teknisi", value: "18+", suffix: "profesional" },
                ].map((stat, index) => (
                  <div key={index} className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
                    <p className="text-xs sm:text-sm text-gray-600">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.suffix}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Car Wash Process - Clean Uniform Design */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 relative inline-block">
              Proses Cuci Mobil Premium Kami
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-blue-600 rounded-full"></span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mt-6">
              Kami mengikuti 7 langkah sistematis untuk memberikan hasil cuci mobil terbaik dan terpercaya
            </p>
          </div>

          {/* Mobile View (Interactive Timeline) - Unchanged */}
          <div className="lg:hidden">
            <div className="relative px-2">
              {/* Vertical timeline line */}
              <div className="absolute left-8 top-6 bottom-6 w-1 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full"></div>

              <div className="space-y-16">
                {carWashSteps.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Step number bubble */}
                    <div className="absolute left-8 top-4 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-blue-600 rounded-full z-10"></div>

                    {/* Content card with improved text containment */}
                    <div className="ml-16 bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-600 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full text-xl mr-3 flex-shrink-0">
                          {step.icon}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                          {index + 1}. {step.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 break-words">{step.description}</p>

                      {/* Visual indicator for current step */}
                      <div className="w-full h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${((index + 1) / carWashSteps.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop View - Clean Uniform Design */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-lg p-8 relative">
              {/* Progress bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-100 rounded-t-2xl overflow-hidden">
                <div className="h-full bg-blue-600 animate-progressBar"></div>
              </div>

              {/* First row - 3 steps */}
              <div className="grid grid-cols-3 gap-8 mb-10">
                {carWashSteps.slice(0, 3).map((step, index) => (
                  <div key={index} className="relative">
                    <div className="bg-blue-50 rounded-xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:bg-blue-100 flex flex-col">
                      <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                        {index + 1}
                      </div>

                      <div className="flex justify-center mb-5 mt-2">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-md">
                          {step.icon}
                        </div>
                      </div>

                      <h3 className="text-center text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-center text-gray-700">{step.description}</p>
                    </div>

                    {/* Connecting line */}
                    {index < 2 && (
                      <div
                        className="hidden lg:block absolute top-1/2 right-0 w-8 h-1 bg-blue-300"
                        style={{ transform: "translateX(100%)" }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Down arrow */}
              <div className="flex justify-center mb-10">
                <div className="w-1 h-10 bg-blue-300"></div>
              </div>

              {/* Second row - 3 steps */}
              <div className="grid grid-cols-3 gap-8 mb-10">
                {carWashSteps.slice(3, 6).map((step, index) => (
                  <div key={index + 3} className="relative">
                    <div className="bg-blue-50 rounded-xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:bg-blue-100 flex flex-col">
                      <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                        {index + 4}
                      </div>

                      <div className="flex justify-center mb-5 mt-2">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-md">
                          {step.icon}
                        </div>
                      </div>

                      <h3 className="text-center text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-center text-gray-700">{step.description}</p>
                    </div>

                    {/* Connecting line */}
                    {index < 2 && (
                      <div
                        className="hidden lg:block absolute top-1/2 right-0 w-8 h-1 bg-blue-300"
                        style={{ transform: "translateX(100%)" }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Down arrow */}
              <div className="flex justify-center mb-10">
                <div className="w-1 h-10 bg-blue-300"></div>
              </div>

              {/* Final step */}
              <div className="flex justify-center">
                <div className="relative max-w-md w-full">
                  <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                      7
                    </div>

                    <div className="flex justify-center mb-5 mt-2">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-md">
                        {carWashSteps[6].icon}
                      </div>
                    </div>

                    <h3 className="text-center text-xl font-bold mb-3">{carWashSteps[6].title}</h3>
                    <p className="text-center">{carWashSteps[6].description}</p>

                    <div className="mt-4 flex justify-center">
                      <div className="px-4 py-1 bg-white text-blue-600 rounded-full text-sm font-medium">
                        Langkah Final
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animation keyframes */}
          <style jsx>{`
            @keyframes progressBar {
              0% {
                width: 0;
              }
              100% {
                width: 100%;
              }
            }

            .animate-progressBar {
              animation: progressBar 3s ease-out forwards;
            }
          `}</style>

          {/* Call-to-action button */}
          <div className="text-center mt-16">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              onClick={() => (window.location.href = `https://wa.me/${whatsappNumber}`)}
            >
              Booking Cuci Mobil Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Layanan Unggulan Kami
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-8 md:mb-12 max-w-3xl mx-auto">
            Kami menawarkan berbagai layanan perawatan mobil terbaik dengan harga terjangkau dan hasil maksimal
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Cuci Mobil Premium",
                description: "Layanan cuci mobil menyeluruh dengan perhatian pada setiap detail",
                icon: "🚿",
                features: ["Exterior wash", "Interior vacuum", "Tire dressing", "Dashboard polish"],
              },
              {
                title: "Servis AC Mobil",
                description: "Perbaikan dan perawatan sistem AC oleh teknisi berpengalaman",
                icon: "❄️",
                features: ["Isi freon", "Perbaikan kompresor", "Pembersihan evaporator", "Pengecekan kelistrikan"],
              },
              {
                title: "Detailing Mobil",
                description: "Perawatan estetika mobil untuk tampilan sempurna",
                icon: "✨",
                features: ["Polishing", "Coating", "Interior detailing", "Headlight restoration"],
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Siap Untuk Mencoba Layanan Kami?</h2>
          <p className="text-lg sm:text-xl mb-6 md:mb-10 max-w-3xl mx-auto">
            Dapatkan Pengalaman Cuci Mobil Terbaik di Jakarta Intl Denso !
          </p>
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

export default CuciMobilCirebon

