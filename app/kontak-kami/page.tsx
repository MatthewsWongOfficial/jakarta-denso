"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, type FC, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  MapPin, 
  Instagram, 
  Mail, 
  Clock, 
  ArrowRight, 
  AlertTriangle,
  Car,
  Wrench,
  Shield,
  CheckCircle,
  Star,
  MessageSquare,
  Truck,
  Zap,
  Settings,
  Award,
  Users
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

interface SocialButtonProps {
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel: string;
}

const SocialButton: FC<SocialButtonProps> = ({ href, className = "", children, ariaLabel }) => {
  return (
    <Link
      href={href}
      className={`group flex items-center justify-between gap-3 px-6 py-4 rounded-xl text-white font-medium transition-all duration-500 hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <div className="flex items-center gap-3">{children}</div>
      <ArrowRight
        className="h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-500"
        aria-hidden="true"
      />
    </Link>
  );
};

interface ContactCardProps {
  icon: ReactNode;
  title: string;
  content: string;
  subContent?: string;
  className?: string;
  onClick?: () => void;
}

const ContactCard: FC<ContactCardProps> = ({ icon, title, content, subContent, className = "", onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-500" />
      <div className="relative p-6 bg-white rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 border border-gray-100 group-hover:border-blue-200">
        <div className="flex items-start gap-4">
          <div
            className={`text-blue-600 transform transition-all duration-500 ${isHovered ? "scale-125 rotate-12" : ""}`}
            aria-hidden="true"
          >
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-600 font-medium">{content}</p>
            {subContent && <p className="text-gray-500 text-sm mt-1">{subContent}</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Contact: FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const businessName = "Jakarta Int'l Denso Cirebon";
  const businessDescription = "Layanan cuci mobil, service AC mobil, dan perawatan mobil terbaik di Cirebon";
  const phoneNumber = "0819-647-333";
  const address = "Jl. Garuda Raya No 2-4, Cirebon, Jawa Barat";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: businessName,
    description: businessDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Garuda Raya No 2-4",
      addressLocality: "Cirebon",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    telephone: phoneNumber,
    openingHours: "Mo-Su 08:00-17:00",
    image: "https://www.jakartaintldenso.com/images/owner.jpeg",
    url: "https://www.jakartaintldenso.com",
    sameAs: ["https://www.instagram.com/jakarta_intl_denso", "https://www.tiktok.com/@jakartaintldensocirebon"],
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative min-h-screen overflow-hidden">
        {/* Background Design */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50"></div>

        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#27398f]/20 via-blue-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#ed3f36]/15 via-red-400/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">


          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20 space-y-8"
          >
            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
              <div className="bg-gradient-to-r from-[#27398f] to-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                <Phone className="w-4 h-4 inline mr-2" />
                Hubungi Kami Sekarang
              </div>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold text-sm shadow-lg">
                <CheckCircle className="w-4 h-4" />
                <span>Buka Setiap Hari</span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] text-balance">
              <span className="bg-gradient-to-r from-[#27398f] via-blue-600 to-indigo-700 bg-clip-text text-transparent">
                HUBUNGI KAMI
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Jakarta Intl Denso Cirebon
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tim profesional kami siap membantu Anda 24/7 untuk semua kebutuhan perawatan kendaraan. 
              Dari layanan darurat hingga perawatan rutin, kami selalu siap melayani.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
            {/* Owner Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 flex justify-center"
            >
              <div className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 w-80">
                <div className="aspect-[3/4] relative">
                  <Image
                    src="/images/owner.jpeg"
                    alt="Suminto Wijaya - Owner Jakarta Int'l Denso Cirebon"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    sizes="320px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="relative backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/10 bg-black/30">
                      <h2 className="text-xl font-bold mb-1">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">
                          Suminto Wijaya
                        </span>
                      </h2>
                      <p className="text-blue-200 font-medium text-sm">
                        Owner Jakarta Intl Denso
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span className="text-blue-100 text-xs">20+ Tahun Pengalaman</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Contact Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <ContactCard
                  icon={<Phone className="h-8 w-8" />}
                  title="Hubungi Kami"
                  content={phoneNumber}
                  subContent="Response Cepat & Terpercaya"
                  onClick={() => window.open(`tel:+62${phoneNumber.replace(/[^0-9]/g, "")}`)}
                />
                <ContactCard
                  icon={<MapPin className="h-8 w-8" />}
                  title="Lokasi Bengkel"
                  content={address}
                  subContent="Strategis di Pusat Kota Cirebon"
                  onClick={() => window.open("https://maps.app.goo.gl/JZNqYpwmLeQSpXpHA")}
                />
                <ContactCard
                  icon={<MessageSquare className="h-8 w-8" />}
                  title="Konsultasi Gratis"
                  content="WhatsApp & Telepon"
                  subContent="Tanya jawab seputar service mobil"
                />
                <ContactCard
                  icon={<Clock className="h-8 w-8" />}
                  title="Jam Operasional"
                  content="Senin - Minggu"
                  subContent="08:00 - 21:00 WIB"
                />
              </div>

              {/* Social Media Buttons */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hubungi Kami Via:</h3>
                
                <SocialButton
                  href={`https://wa.me/62${phoneNumber.replace(/[^0-9]/g, "")}`}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-green-500/20"
                  ariaLabel="Hubungi kami melalui WhatsApp"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  <span>WhatsApp - Chat Langsung</span>
                </SocialButton>

                <SocialButton
                  href="https://www.instagram.com/jakarta_intl_denso"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-500/20"
                  ariaLabel="Kunjungi Instagram kami"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                  <span>Instagram - Lihat Portfolio</span>
                </SocialButton>

                <SocialButton
                  href="https://www.tiktok.com/@jakartaintldensocirebon"
                  className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black shadow-lg hover:shadow-gray-500/20"
                  ariaLabel="Kunjungi TikTok kami"
                >
                  <Image
                    src="/images/tiktok-social.png"
                    alt="TikTok"
                    width={20}
                    height={20}
                    className="brightness-0 invert"
                  />
                  <span>TikTok - Video Tutorial</span>
                </SocialButton>
              </div>
            </motion.div>
          </div>

          {/* Services Quick Access */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#27398f] to-blue-600 bg-clip-text text-transparent">
                  Layanan Unggulan
                </span>
                <span className="text-gray-800"> Kami</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hubungi kami sekarang untuk mendapatkan layanan terbaik
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Service AC Mobil",
                  description: "Teknisi berpengalaman 20+ tahun",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: <Car className="w-8 h-8" />,
                  title: "Cuci Mobil Premium",
                  description: "Snow wash dengan hasil maksimal",
                  color: "from-green-500 to-emerald-600"
                },
                {
                  icon: <Truck className="w-8 h-8" />,
                  title: "Derek Darurat",
                  description: "24/7 untuk wilayah Cirebon-Kuningan",
                  color: "from-red-500 to-red-600"
                },
                {
                  icon: <Wrench className="w-8 h-8" />,
                  title: "Service Umum",
                  description: "Oli, tune up, dan perawatan rutin",
                  color: "from-purple-500 to-purple-600"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${service.color} rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-500`} />
                  <div className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-blue-200">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Main CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Butuh Bantuan Segera? Hubungi Kami Sekarang!
              </h2>
              <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">Jakarta Intl Denso</strong> - Solusi Terpercaya untuk Semua Kebutuhan Kendaraan Anda
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-4xl mx-auto">
                🔧 <strong>Service AC Mobil Expert</strong> - Teknisi berpengalaman dengan spare part original<br />
                🚗 <strong>Cuci Mobil Premium</strong> - Hasil bersih maksimal dengan teknik profesional<br />
                🛡️ <strong>Garansi Berkualitas</strong> - Kepuasan pelanggan adalah prioritas utama kami<br />
                📍 <strong>Lokasi Strategis</strong> - Mudah dijangkau di pusat kota Cirebon
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href={`tel:+62${phoneNumber.replace(/[^0-9]/g, "")}`}
                  className="group inline-flex items-center justify-center px-8 py-4
                    bg-gradient-to-r from-[#27398f] via-blue-600 to-blue-700 text-white font-bold rounded-xl
                    shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Hubungi: {phoneNumber}
                </Link>

                <Link
                  href={`https://wa.me/62${phoneNumber.replace(/[^0-9]/g, "")}`}
                  className="group inline-flex items-center justify-center px-8 py-4
                    bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl
                    shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <MessageSquare className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  WhatsApp Chat
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">4.8★</div>
                  <div className="text-gray-400 text-sm">Rating Google</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">1000+</div>
                  <div className="text-gray-400 text-sm">Pelanggan Puas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">20+</div>
                  <div className="text-gray-400 text-sm">Tahun Pengalaman</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-gray-400 text-sm">Layanan Darurat</div>
                </div>
              </div>
            </div>

            {/* Location and Hours */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  Lokasi Bengkel
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  <strong>Jl. Garuda Raya No 2-4</strong><br />
                  Cirebon, Jawa Barat<br />
                  (Strategis di pusat kota, mudah dijangkau)
                </p>
                <Link
                  href="https://maps.app.goo.gl/JZNqYpwmLeQSpXpHA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Lihat di Google Maps
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                  Jam Operasional
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Senin - Minggu</span>
                    <span className="font-medium">08:00 - 21:00 WIB</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Buka setiap hari untuk melayani kebutuhan kendaraan Anda
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info Footer */}
            <div className="text-center text-gray-600 space-y-2 pt-8">
              <p className="text-sm">
                <strong className="text-[#27398f]">Jakarta Intl Denso Cirebon</strong> - Bengkel AC Mobil & Cuci Mobil Terpercaya #1 di Cirebon
              </p>
              <p className="text-sm">
                📍 Jl. Garuda Raya No 2-4, Cirebon | 📞 {phoneNumber} | ⏰ 08:00 - 21:00 WIB
              </p>
              <p className="text-sm text-blue-600 font-medium">
                💬 Konsultasi Gratis Sebelum Service | 🔧 Teknisi Berpengalaman 20+ Tahun
              </p>
            </div>
          </motion.div>
        </div>

        {/* Decorative Wave */}
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
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
};

export default Contact;