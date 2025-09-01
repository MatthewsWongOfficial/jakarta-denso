"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, Award, MapPin, Phone, Users, Clock, Shield, Star } from "lucide-react"
import Link from "next/link"

const ExperienceCounter = () => {
  const [count, setCount] = useState(0)
  const targetCount = 20

  useEffect(() => {
    const timer = setInterval(() => {
      if (count < targetCount) {
        setCount((prevCount) => prevCount + 1)
      }
    }, 80)

    return () => clearInterval(timer)
  }, [count])

  return (
    <div
      className="inline-flex items-center gap-3 px-6 py-3 
      bg-gradient-to-r from-[#ed3f36] to-[#ff4757] text-white rounded-full font-semibold text-sm
      shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <Clock className="w-4 h-4" />
      <span>{count}+ Tahun Melayani Cirebon</span>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Primary gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#27398f]/20 via-blue-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#ed3f36]/15 via-red-400/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>

      {/* Geometric gradient shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-[#27398f]/10 to-blue-500/5 rotate-45 rounded-lg"></div>
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-tr from-[#ed3f36]/10 to-red-500/5 rotate-12 rounded-lg"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex items-start gap-4 flex-wrap">
              <div className="bg-gradient-to-r from-[#27398f] to-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                <Shield className="w-3 h-3 inline mr-1" />
                Bengkel Terpercaya #1
              </div>
              <ExperienceCounter />
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-balance">
                <span className="bg-gradient-to-r from-[#27398f] via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Bengkel AC Mobil
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                  Terpercaya di Cirebon
                </span>
              </h1>

              <div className="flex items-center gap-3 bg-gradient-to-r from-[#ed3f36]/10 to-red-500/5 px-4 py-3 rounded-xl border border-red-200/50">
                <div className="bg-gradient-to-r from-[#ed3f36] to-red-500 p-2 rounded-full">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-[#ed3f36] text-lg">Melayani Seluruh Cirebon</div>
                  <div className="text-sm text-gray-600">Kuningan, Indramayu & Sekitarnya</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-gray-700 leading-relaxed">
                <span className="font-bold text-[#27398f]">Spesialis AC mobil terpercaya</span> dengan pengalaman 20+
                tahun melayani Cirebon. Dari AC tidak dingin hingga perawatan rutin, kami berkomitmen memberikan solusi
                terbaik untuk kendaraan Anda.
              </p>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-yellow-600 font-medium">
                  <Star className="w-4 h-4 fill-current" />
                  <span>4.7/5 Rating Pelanggan</span>
                </div>
                <div className="flex items-center gap-1 text-green-600 font-medium">
                  <Shield className="w-4 h-4" />
                  <span>Garansi Resmi</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="group p-5 bg-gradient-to-br from-white to-blue-50/50 rounded-xl border border-blue-200/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-r from-[#27398f] to-blue-600 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-bold text-gray-800">Diagnosa Gratis</div>
                </div>
                <div className="text-sm text-gray-600">Pemeriksaan menyeluruh tanpa biaya untuk semua jenis mobil</div>
              </div>

              <div className="group p-5 bg-gradient-to-br from-white to-red-50/50 rounded-xl border border-red-200/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-r from-[#ed3f36] to-red-500 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-bold text-gray-800">Teknisi Berpengalaman</div>
                </div>
                <div className="text-sm text-gray-600">Tim ahli berpengalaman 10+ tahun dengan keahlian terpercaya</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href="tel:+62819647333"
                className="group inline-flex items-center justify-center px-8 py-4 
                  bg-gradient-to-r from-[#ed3f36] via-red-500 to-[#ed3f36] text-white font-bold rounded-xl
                  shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300
                  bg-size-200 hover:bg-pos-100"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Hubungi Sekarang - Gratis Konsultasi!
              </Link>

              <Link
                href="#layanan"
                className="inline-flex items-center justify-center px-8 py-4 
                  bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 hover:border-[#27398f] 
                  text-gray-700 hover:text-[#27398f] font-semibold rounded-xl 
                  shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Lihat Semua Layanan
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent">
              <div className="text-center group">
                <div className="font-bold text-3xl bg-gradient-to-r from-[#27398f] to-blue-600 bg-clip-text text-transparent">
                  2000+
                </div>
                <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                  Mobil Diperbaiki
                </div>
              </div>
              <div className="text-center group">
                <div className="font-bold text-3xl bg-gradient-to-r from-[#ed3f36] to-red-500 bg-clip-text text-transparent">
                  98%
                </div>
                <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                  Kepuasan Pelanggan
                </div>
              </div>
              <div className="text-center group">
                <div className="font-bold text-3xl bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Siap Melayani</div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Image */}
          <div className="relative lg:h-[600px] mt-8 lg:mt-0">
            <div className="relative h-80 sm:h-96 lg:h-full rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <Image
                src="/images/jakartaintldenso-cover.jpg"
                alt="Bengkel AC mobil terpercaya di Cirebon - Teknisi profesional sedang memperbaiki sistem AC kendaraan"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                quality={95}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Enhanced overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#27398f]/10 to-transparent"></div>

              <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/20">
                <h3 className="font-bold text-gray-800 mb-1 text-base sm:text-lg">Bengkel Terpercaya Cirebon</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                  Fasilitas modern dengan peralatan canggih
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-green-600 font-bold text-xs sm:text-sm">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
                    Buka Hari Ini
                  </span>
                  <span className="text-gray-500 font-medium text-xs sm:text-sm">08:00 - 17:00</span>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl animate-bounce">
              <Award className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>

            <div className="hidden sm:block absolute top-1/3 -left-6 lg:-left-8 bg-gradient-to-br from-white to-blue-50 p-4 lg:p-5 rounded-xl lg:rounded-2xl shadow-xl border border-blue-200/50 hover:scale-110 transition-transform duration-300">
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#27398f] to-blue-600 bg-clip-text text-transparent">
                4.7★
              </div>
              <div className="text-xs text-gray-600 font-medium">Rating Google</div>
              <div className="text-xs text-gray-500">170+ Review</div>
            </div>

            <div className="hidden sm:block absolute bottom-1/3 -right-6 lg:-right-8 bg-gradient-to-br from-[#27398f] to-blue-700 text-white p-4 lg:p-5 rounded-xl lg:rounded-2xl shadow-xl hover:scale-110 transition-transform duration-300">
              <div className="text-xl lg:text-2xl font-bold">20+</div>
              <div className="text-xs opacity-90">Tahun</div>
              <div className="text-xs opacity-90">Pengalaman</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 fill-white opacity-90" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="50%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path fill="url(#waveGradient)" d="M0,120 C150,100 350,0 600,20 C850,40 1050,100 1200,80 L1200,120 Z"></path>
        </svg>
      </div>
    </section>
  )
}
