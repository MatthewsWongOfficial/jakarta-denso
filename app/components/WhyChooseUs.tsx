"use client"

import React, { useEffect, useRef, useCallback } from "react"
import { Award, ThumbsUp, Droplet, MapPin } from "lucide-react"
import { motion } from "framer-motion"

interface VideoData {
  url: string
}

interface AlasanData {
  icon: React.ElementType
  title: string
  description: string
}

const alasanMemilih: AlasanData[] = [
  { icon: Award, title: "Profesional & Berpengalaman", description: "Teknisi kami ahli dalam perawatan mobil sejak tahun 2004." },
  { icon: ThumbsUp, title: "Pelayanan Terbaik", description: "Kami mengutamakan kepuasan pelanggan dengan hasil cuci dan poles berkualitas tinggi." },
  { icon: Droplet, title: "Cuci Mobil dengan Air PDAM Berkualitas", description: "Kami menggunakan air PDAM berkualitas untuk mencuci mobil Anda, memastikan hasil bersih tanpa bercak." },
  { icon: MapPin, title: "Lokasi Strategis", description: "Bengkel kami mudah diakses di Jl. Garuda Raya No 2-4, Cirebon." }
]

const videoPortofolio: VideoData[] = [
  { url: "/videos/video-bengkel.mp4" },
  { url: "/videos/video-bengkel2.mp4" }
]

const KelebihanKami: React.FC = () => {
  // ✅ Correctly typed useRef with HTMLVideoElement[]
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const video = entry.target as HTMLVideoElement
      if (entry.isIntersecting && video.dataset.src) {
        video.src = video.dataset.src // Lazy-load video source
        video.play()
      } else {
        video.pause()
      }
    })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 })

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video)
    })

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video)
      })
      observer.disconnect()
    }
  }, [handleIntersection])

  return (
    <section id="kelebihan-kami" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            Mengapa Memilih Kami?
          </h2>
          <div className="relative">
            <div className="h-2 w-32 md:w-40 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full" />
            <div className="absolute top-0 h-2 w-32 md:w-40 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full blur-xl opacity-50 left-1/2 transform -translate-x-1/2" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="flex flex-row justify-center gap-4 sm:gap-6 w-full">
            {videoPortofolio.map((video, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }} className="relative group w-1/2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-blue-600/50 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 shadow-xl">
                  <div className="relative bg-white rounded-3xl overflow-hidden aspect-[9/16] w-full">
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[index] = el
                      }}
                      data-src={video.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {alasanMemilih.map((alasan, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="group">
                <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full group-hover:bg-blue-500/20 transition-colors" />
                    <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 w-14 h-14 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <alasan.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {alasan.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">{alasan.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default KelebihanKami
