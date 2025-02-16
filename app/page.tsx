"use client"

import { Suspense, useState, useEffect, useCallback, useMemo } from "react"
import { Analytics } from "@vercel/analytics/react"
import dynamic from "next/dynamic"
import { useInView } from "react-intersection-observer"
import { useRouter, usePathname } from "next/navigation"

// Critical path components loaded immediately
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"

// Type-safe loading state component with skeleton animation
const LoadingState = ({ height }: { height: string }) => (
  <div
    className="w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg 
               animate-pulse opacity-0 transition-opacity duration-300
               skeleton-loading"
    style={{ minHeight: height }}
    role="progressbar"
    aria-busy="true"
  />
)

// Global loading indicator 
const GlobalLoading = () => (
  <div 
    className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center transition-opacity duration-300"
    role="alert"
    aria-busy="true"
  >
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
)

// Eager load components needed for hash navigation
const preloadComponents = () => {
  if (typeof window !== "undefined" && window.location.hash) {
    const hash = window.location.hash.substring(1)
    if (hash === "services" || hash === "price-list") {
      import("./components/Services")
      import("./components/PriceList")
    } else if (hash === "kelebihan-kami" || hash === "galeri") {
      import("./components/WhyChooseUs")
      import("./components/Gallery")
    } else if (hash === "ulasan" || hash === "contact") {
      import("./components/BlogPreview")
      import("./components/Contact")
      import("./components/Footer")
    }
  }
}

// Direct dynamic imports with proper loading states
const Services = dynamic(() => import("./components/Services"), {
  loading: () => <LoadingState height="400px" />,
  ssr: true,
})

const PriceList = dynamic(() => import("./components/PriceList"), {
  loading: () => <LoadingState height="400px" />,
  ssr: true,
})

const WhyChooseUs = dynamic(() => import("./components/WhyChooseUs"), {
  loading: () => <LoadingState height="400px" />,
  ssr: true,
})

const Gallery = dynamic(() => import("./components/Gallery"), {
  loading: () => <LoadingState height="500px" />,
  ssr: true,
})

const Testimonials = dynamic(() => import("./components/Testimonials"), {
  loading: () => <LoadingState height="400px" />,
  ssr: true,
})

const BlogsPreview = dynamic(() => import("./components/BlogPreview"), {
  loading: () => <LoadingState height="400px" />,
  ssr: true,
})

const Contact = dynamic(() => import("./components/Contact"), {
  loading: () => <LoadingState height="300px" />,
  ssr: true,
})

const Footer = dynamic(() => import("./components/Footer"), {
  loading: () => <LoadingState height="200px" />,
  ssr: true,
})

// Pure client component with enhanced loading strategy
const WhatsAppButton = dynamic(() => import("./components/WhatsAppButton"), {
  ssr: false,
  loading: () => null,
})

// Define hash to section ID mapping for consistency
const HASH_TO_ID_MAP: Record<string, string> = {
  services: "services",
  "price-list": "price-list",
  "kelebihan-kami": "kelebihan-kami",
  galeri: "galeri",
  ulasan: "ulasan",
  contact: "contact",
} as const

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [allComponentsVisible, setAllComponentsVisible] = useState(false)
  const [initialHashProcessed, setInitialHashProcessed] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  // Trigger preload of components based on initial hash
  useEffect(() => {
    preloadComponents()
  }, [])

  // Critical CSS variables for layout stability - set only once
  useEffect(() => {
    if (document.documentElement.hasAttribute("data-css-vars-set")) return

    const root = document.documentElement
    root.style.setProperty("--container-padding", "1rem")
    root.style.setProperty("--hero-height", "80vh")
    root.style.setProperty("--section-spacing", "4rem")
    root.setAttribute("data-css-vars-set", "true")
    setMounted(true)
  }, [])

  // Show all components immediately if there's a hash in the URL
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      setAllComponentsVisible(true)
    }
  }, [])

  // Scroll to hash function - extracted for reuse
  const scrollToHash = useCallback((hash: string) => {
    if (!hash) return

    // Remove the # if it exists
    const cleanHash = hash.startsWith("#") ? hash.substring(1) : hash

    // Look up the section ID in our mapping or use the hash directly
    const id = HASH_TO_ID_MAP[cleanHash] || cleanHash

    const element = document.getElementById(id)
    if (element) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        // Use native scroll API for better performance
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      })
      return true
    }
    return false
  }, [])

  // Enhanced hash navigation with progressive enhancement
  useEffect(() => {
    if (!mounted || initialHashProcessed) return

    // Initial hash handling with progressive attempts
    const handleInitialHash = () => {
      const hash = window.location.hash
      if (hash) {
        // Show loading state while attempting to scroll
        setIsNavigating(true)
        
        // First quick attempt
        const scrolled = scrollToHash(hash)

        if (!scrolled) {
          // Second attempt after a brief delay
          setTimeout(() => {
            const secondAttempt = scrollToHash(hash)

            if (!secondAttempt) {
              // Final attempt with longer delay
              setTimeout(() => {
                scrollToHash(hash)
                setIsNavigating(false)
              }, 1000)
            } else {
              setIsNavigating(false)
            }
          }, 200)
        } else {
          setIsNavigating(false)
        }

        setInitialHashProcessed(true)
      }
    }

    handleInitialHash()
  }, [mounted, scrollToHash, initialHashProcessed])

  // Handle dynamic hash changes
  useEffect(() => {
    if (!mounted) return

    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        setIsNavigating(true)
        const scrolled = scrollToHash(hash)
        
        // If initial scroll fails, try again after components have loaded
        if (!scrolled) {
          setTimeout(() => {
            scrollToHash(hash)
            setIsNavigating(false)
          }, 500)
        } else {
          setIsNavigating(false)
        }
      }
    }

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [mounted, scrollToHash])

  // Refresh page when navigating back to home route (/)
  useEffect(() => {
    if (!mounted) return
    
    // Using Next.js router to detect path changes
    if (pathname === "/" && typeof window !== "undefined" && !window.location.hash) {
      // Only reload if we weren't already on the homepage or if coming from another page
      if (document.referrer && !document.referrer.includes(window.location.origin + "/")) {
        setIsNavigating(true)
        router.refresh()
        
        // Fallback in case router.refresh() doesn't trigger a full reload
        setTimeout(() => {
          window.location.reload()
        }, 300)
      }
    }
  }, [pathname, mounted, router])

  // Handle browser back button
  useEffect(() => {
    if (!mounted) return
    
    const handlePopState = () => {
      if (pathname === "/" && !window.location.hash) {
        setIsNavigating(true)
        setTimeout(() => {
          router.refresh()
          // Fallback reload if needed
          setTimeout(() => {
            window.location.reload()
          }, 200)
        }, 0)
      }
    }

    window.addEventListener('popstate', handlePopState)
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [mounted, pathname, router])

  // Optimized intersection observer with better thresholds
  const observerOptions = useMemo(
    () => ({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: "200px 0px",
    }),
    []
  )

  const [servicesRef, servicesInView] = useInView(observerOptions)
  const [midSectionRef, midSectionInView] = useInView(observerOptions)
  const [bottomSectionRef, bottomSectionInView] = useInView(observerOptions)

  // Delayed WhatsApp button with priority handling
  const [shouldLoadWhatsApp, setShouldLoadWhatsApp] = useState(false)

  useEffect(() => {
    if (!mounted) return

    const loadWhatsApp = () => setShouldLoadWhatsApp(true)

    if ("requestIdleCallback" in window) {
      // TypeScript-safe way to handle requestIdleCallback
      const requestIdleCallback =
        window.requestIdleCallback ||
        ((cb: IdleRequestCallback, options?: IdleRequestOptions) =>
          setTimeout(cb, options?.timeout || 1))

      requestIdleCallback(loadWhatsApp, { timeout: 3000 })
    } else {
      setTimeout(loadWhatsApp, 3000)
    }
  }, [mounted])

  return (
    <main className="min-h-screen bg-white">
      {isNavigating && <GlobalLoading />}
      
      <Navbar />
      <Hero />

      <div ref={servicesRef} id="services">
        {(mounted && (servicesInView || allComponentsVisible)) && (
          <Suspense fallback={<LoadingState height="600px" />}>
            <section
              className="content-visibility-auto"
              style={{ contain: "content", containIntrinsicSize: "1px 600px" }}
            >
              <Services />
              <div id="price-list">
                <PriceList />
              </div>
            </section>
          </Suspense>
        )}
      </div>

      <div ref={midSectionRef}>
        {(mounted && (midSectionInView || allComponentsVisible)) && (
          <Suspense fallback={<LoadingState height="900px" />}>
            <section
              className="content-visibility-auto"
              style={{ contain: "content", containIntrinsicSize: "1px 900px" }}
            >
              <div id="kelebihan-kami">
                <WhyChooseUs />
              </div>
              <div id="galeri">
                <Gallery />
              </div>
            </section>
          </Suspense>
        )}
      </div>

      <div ref={bottomSectionRef}>
        {(mounted && (bottomSectionInView || allComponentsVisible)) && (
          <Suspense fallback={<LoadingState height="1100px" />}>
            <section
              className="content-visibility-auto"
              style={{ contain: "content", containIntrinsicSize: "1px 1100px" }}
            >
              <Testimonials />
              <div id="ulasan">
                <BlogsPreview />
              </div>
              <div id="contact">
                <Contact />
              </div>
              <Footer />
            </section>
          </Suspense>
        )}
      </div>

      {shouldLoadWhatsApp && mounted && (
        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>
      )}

      <Analytics />
    </main>
  )
}