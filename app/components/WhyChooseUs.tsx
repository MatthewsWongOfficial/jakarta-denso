"use client"

import { Award, ThumbsUp, DollarSign, MapPin } from "lucide-react"
import { motion } from "framer-motion"

const alasanMemilih = [
  {
    icon: Award,
    title: "Profesional & Berpengalaman",
    description: "Teknisi kami ahli dalam perawatan mobil sejak tahun 2004.",
  },
  {
    icon: ThumbsUp,
    title: "Pelayanan Terbaik",
    description: "Kami mengutamakan kepuasan pelanggan dengan hasil cuci dan poles berkualitas tinggi.",
  },
  {
    icon: DollarSign,
    title: "Harga Bersaing",
    description: "Harga yang kompetitif dengan hasil maksimal untuk mobil Anda.",
  },
  {
    icon: MapPin,
    title: "Lokasi Strategis",
    description: "Bengkel kami mudah diakses di Jl. Garuda Raya No 2-4, Cirebon.",
  },
]

const videoPortofolio = [
  "/videos/video-bengkel.mp4",
  "/videos/video-bengkel2.mp4"
]

export default function KelebihanKami() {
  return (
    <section id="kelebihan-kami" className="seksi-kelebihan py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="latar-belakang absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-50/50 to-white/50"></div>
      
      <div className="kontainer-utama container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="kepala-seksi text-center mb-20">
          <h2 className="judul-utama text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Mengapa Memilih Kami?
          </h2>
          <div className="garis-judul h-2 w-32 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
        </div>

        <div className="konten-utama grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Videos Section */}
          <div className="bagian-video flex justify-center gap-8 md:gap-12">
            {videoPortofolio.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="pembungkus-video relative p-[2px] rounded-3xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 shadow-xl"
              >
                <div className="efek-blur absolute inset-0 blur-xl bg-gradient-to-br from-blue-500/50 to-blue-600/50 -z-10"></div>
                <div className="video-konten relative bg-white rounded-3xl overflow-hidden aspect-[9/16] w-48 md:w-72 lg:w-80">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="video-tampilan w-full h-full object-cover"
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reasons Grid */}
          <div className="daftar-alasan grid sm:grid-cols-2 gap-8">
            {alasanMemilih.map((alasan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="item-alasan group"
              >
                <div className="kartu-alasan bg-white rounded-2xl p-6 h-full border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="ikon-pembungkus mb-6 relative">
                    <div className="efek-blur-ikon absolute inset-0 bg-blue-500/10 blur-xl rounded-full"></div>
                    <div className="ikon-konten relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 w-16 h-16 flex items-center justify-center">
                      <alasan.icon className="ikon-alasan h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="judul-alasan text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {alasan.title}
                  </h3>
                  <p className="deskripsi-alasan text-gray-600 leading-relaxed">
                    {alasan.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}