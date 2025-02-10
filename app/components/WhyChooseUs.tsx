"use client"

import React, { useEffect, useRef, useCallback, useState } from "react"
import { Award, ThumbsUp, Droplet, MapPin, X, Maximize2, Minimize2 } from "lucide-react"
import { motion } from "framer-motion"

interface VideoData {
  url: string
}

interface AlasanData {
  icon: React.ElementType
  title: string
  description: string
}

// Rest of the interfaces and constants remain the same...
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

// VideoModal component remains the same...
const VideoModal = ({ 
  isOpen, 
  onClose, 
  videoUrl 
}: { 
  isOpen: boolean
  onClose: () => void
  videoUrl: string 
}) => {
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalVideoRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-4xl bg-black rounded-lg overflow-hidden">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button 
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors"
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5 text-white" />
            ) : (
              <Maximize2 className="h-5 w-5 text-white" />
            )}
          </button>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>
        <video
          ref={modalVideoRef}
          src={videoUrl}
          className="w-full aspect-video object-contain"
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>
  )
}

// VideoThumbnail component remains the same...
const VideoThumbnail = ({ 
  videoUrl, 
  onOpenModal 
}: { 
  videoUrl: string
  onOpenModal: () => void
}) => {
  const thumbnailVideoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    if (thumbnailVideoRef.current) {
      thumbnailVideoRef.current.load()
      thumbnailVideoRef.current.preload = "metadata"
    }
  }, [videoUrl])

  return (
    <div 
      onClick={onOpenModal}
      className="cursor-pointer group relative bg-white rounded-3xl overflow-hidden aspect-[9/16] w-full"
    >
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
        <Maximize2 className="w-12 h-12 text-white" />
      </div>
      <video
        ref={thumbnailVideoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        muted
        playsInline
        loop
        poster={videoUrl + '?thumb=1'}
      />
    </div>
  )
}

const KelebihanKami: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const thumbnailObserver = useRef<IntersectionObserver | null>(null)
  // Fixed type definition for refs array
  const thumbnailRefs = useRef<Array<HTMLDivElement | null>>([])

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const container = entry.target as HTMLDivElement
      const video = container.querySelector('video')
      if (entry.isIntersecting && video) {
        video.play().catch(() => {
          console.log('Autoplay prevented')
        })
      } else if (video) {
        video.pause()
      }
    })
  }, [])

  useEffect(() => {
    thumbnailObserver.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
      rootMargin: '50px'
    })

    thumbnailRefs.current.forEach((ref) => {
      if (ref) thumbnailObserver.current?.observe(ref)
    })

    return () => {
      thumbnailObserver.current?.disconnect()
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group w-1/2"
                ref={el => {
                  thumbnailRefs.current[index] = el
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-blue-600/50 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 shadow-xl">
                  <VideoThumbnail
                    videoUrl={video.url}
                    onOpenModal={() => setSelectedVideo(video.url)}
                  />
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

      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo}
        />
      )}
    </section>
  )
}

export default KelebihanKami