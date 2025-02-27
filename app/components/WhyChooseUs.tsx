"use client"

import type React from "react"
import { useEffect, useRef, useCallback, useState } from "react"
import { Award, ThumbsUp, Droplet, MapPin, Play } from "lucide-react"
import { motion } from "framer-motion"

interface VideoData {
  url: string
  lowResUrl?: string // Added for low resolution version
}

interface AlasanData {
  icon: React.ElementType
  title: string
  description: string
}

const alasanMemilih: AlasanData[] = [
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
    icon: Droplet,
    title: "Cuci Mobil dengan Air PDAM Berkualitas",
    description:
      "Kami menggunakan air PDAM berkualitas untuk mencuci mobil Anda, memastikan hasil bersih tanpa bercak.",
  },
  {
    icon: MapPin,
    title: "Lokasi Strategis",
    description: "Bengkel kami mudah diakses di Jl. Garuda Raya No 2-4, Cirebon.",
  },
]

// Updated with low-res versions
const videoPortofolio: VideoData[] = [
  { 
    url: "/videos/video-bengkel.mp4", 
    lowResUrl: "/videos/video-bengkel.mp4" // Path to low-res version
  }, 
  { 
    url: "/videos/video-bengkel2.mp4",
    lowResUrl: "/videos/video-bengkel2.mp4" // Path to low-res version
  }
]

// Improved video thumbnail with smooth fullscreen transition and low-res autoplay
const VideoThumbnail = ({ videoUrl, lowResUrl }: { videoUrl: string, lowResUrl?: string }) => {
  const thumbnailVideoRef = useRef<HTMLVideoElement>(null)
  const fullVideoRef = useRef<HTMLVideoElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const actualLowResUrl = lowResUrl || videoUrl // Use main URL if no low-res version provided

  // Function to open video in fullscreen with smooth transition
  const openFullscreenVideo = () => {
    const video = fullVideoRef.current
    
    if (video) {
      // Start transition
      setIsTransitioning(true)
      
      // Set up the video - use full resolution for fullscreen viewing
      video.src = videoUrl
      video.style.display = "block"
      video.style.opacity = "0"
      
      // Delay to allow for smooth appearance
      setTimeout(() => {
        if (video) {
          video.style.opacity = "1"
          
          // Play and go fullscreen
          video.play().then(() => {
            video.requestFullscreen().catch(err => {
              console.error("Fullscreen request failed:", err)
              // Still show video even if fullscreen fails
              setIsTransitioning(false)
            })
          }).catch(err => {
            console.error("Play failed:", err)
            setIsTransitioning(false)
          })
        }
      }, 50)
    }
  }

  // Handle exiting fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      const video = fullVideoRef.current
      if (!document.fullscreenElement && video) {
        // Fade out
        video.style.opacity = "0"
        
        // Wait for fade out before hiding
        setTimeout(() => {
          if (video) {
            video.pause()
            video.style.display = "none"
            video.src = ""
            setIsTransitioning(false)
          }
        }, 300)
      } else if (document.fullscreenElement && video) {
        setIsTransitioning(false)
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Configure the thumbnail video with low-res version for autoplay
  useEffect(() => {
    if (thumbnailVideoRef.current) {
      // Use the low-res URL for the thumbnail
      thumbnailVideoRef.current.src = actualLowResUrl
      thumbnailVideoRef.current.load()
      thumbnailVideoRef.current.preload = "auto" // Changed from "metadata" to "auto"
      
      // Set to low resolution using video attributes
      thumbnailVideoRef.current.width = 320 // Low width
      thumbnailVideoRef.current.height = 180 // Low height
      
      // Add other optimizations
      thumbnailVideoRef.current.setAttribute('playsinline', '')
      thumbnailVideoRef.current.setAttribute('muted', '')
      thumbnailVideoRef.current.setAttribute('loop', '')
      
      // Auto-try to play
      const playPromise = thumbnailVideoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented initially:", error)
        })
      }
    }
  }, [actualLowResUrl])

  return (
    <>
      {/* Overlay for transitions */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"></div>
      )}
      
      {/* Hidden video element for fullscreen playback */}
      <video 
        ref={fullVideoRef} 
        className="fixed inset-0 w-full h-full object-contain z-50 hidden transition-opacity duration-300 ease-in-out"
        controls
        playsInline
      />
      
      {/* Clickable thumbnail */}
      <div
        onClick={openFullscreenVideo}
        className="cursor-pointer group relative bg-white rounded-3xl overflow-hidden aspect-[9/16] w-full"
      >
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
          <div className="bg-blue-600/90 rounded-full p-4 transform group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-white fill-current" />
          </div>
        </div>
        <video
          ref={thumbnailVideoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
          poster={videoUrl + "?thumb=1"}
        />
      </div>
    </>
  )
}

const KelebihanKami: React.FC = () => {
  const thumbnailObserver = useRef<IntersectionObserver | null>(null)
  const thumbnailRefs = useRef<Array<HTMLDivElement | null>>([])

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const container = entry.target as HTMLDivElement
      const video = container.querySelector("video")
      if (entry.isIntersecting && video instanceof HTMLVideoElement) {
        video.play().catch(() => {
          console.log("Autoplay prevented")
        })
      } else if (video instanceof HTMLVideoElement) {
        video.pause()
      }
    })
  }, [])

  useEffect(() => {
    thumbnailObserver.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
      rootMargin: "50px",
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
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
                ref={(el) => {
                  thumbnailRefs.current[index] = el
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-blue-600/50 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 shadow-xl">
                  <VideoThumbnail videoUrl={video.url} lowResUrl={video.lowResUrl} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {alasanMemilih.map((alasan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
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