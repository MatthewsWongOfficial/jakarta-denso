"use client"

import { Suspense, useState, useEffect, useCallback, useMemo } from "react"
import { Analytics } from "@vercel/analytics/react"
import dynamic from "next/dynamic"
import { useInView } from "react-intersection-observer"
import { usePathname } from "next/navigation"

// Critical path components loaded immediately
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Loading from "./loading" // Import the Next.js loading component

// Hash to section ID mapping for consistency
const HASH_TO_ID_MAP: Record<string, string> = {
  services: "services",
  // "price-list": "price-list", // Removed
  "kelebihan-kami": "kelebihan-kami",
  galeri: "galeri",
  ulasan: "ulasan",
  contact: "contact",
  beranda: "", // Added beranda mapping to empty string for top of page
}

// Lazy load components with Next.js suspense boundaries
const Services = dynamic(() => import("./components/Services"), {
  loading: () => <Loading />,
  ssr: true,
})

// PriceList component is completely removed
// const PriceList = dynamic(() => import("./components/PriceList"), {
//   loading: () => <Loading />,
//   ssr: true,
// })

const WhyChooseUs = dynamic(() => import("./components/WhyChooseUs"), {
  loading: () => <Loading />,
  ssr: true,
})

const Gallery = dynamic(() => import("./components/Gallery"), {
  loading: () => <Loading />,
  ssr: true,
})

const Testimonials = dynamic(() => import("./components/Testimonials"), {
  loading: () => <Loading />,
  ssr: true,
})

const BlogsPreview = dynamic(() => import("./components/BlogPreview"), {
  loading: () => <Loading />,
  ssr: true,
})

const Contact = dynamic(() => import("./components/Contact"), {
  loading: () => <Loading />,
  ssr: true,
})

const Footer = dynamic(() => import("./components/Footer"), {
  loading: () => <Loading />,
  ssr: true,
})

// Pure client component with enhanced loading strategy
const WhatsAppButton = dynamic(() => import("./components/WhatsAppButton"), {
  ssr: false,
  loading: () => null,
})

// Define the type for requestIdleCallback
// type IdleRequestCallback = (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void

export default function Home() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [allComponentsVisible, setAllComponentsVisible] = useState(false)
  const [initialHashProcessed, setInitialHashProcessed] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [isProgrammaticNavigation, setIsProgrammaticNavigation] = useState(false)

  // Optimized intersection observer with better thresholds
  const observerOptions = useMemo(
    () => ({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: "200px 0px",
    }),
    [],
  )

  const [servicesRef, servicesInView] = useInView(observerOptions)
  const [midSectionRef, midSectionInView] = useInView(observerOptions)
  const [bottomSectionRef, bottomSectionInView] = useInView(observerOptions)
  const [shouldLoadWhatsApp, setShouldLoadWhatsApp] = useState(false)

  // Setup critical CSS variables and mark mounting complete
  useEffect(() => {
    if (document.documentElement.hasAttribute("data-css-vars-set")) {
      setMounted(true)
      return
    }

    const root = document.documentElement
    root.style.setProperty("--container-padding", "1rem")
    root.style.setProperty("--hero-height", "80vh")
    root.style.setProperty("--section-spacing", "4rem")
    root.setAttribute("data-css-vars-set", "true")
    setMounted(true)
  }, [])

  // Fix for navigation from subdir to beranda
  useEffect(() => {
    if (!mounted) return

    // Store current navigation timestamp
    const storeNavTime = () => {
      sessionStorage.setItem("lastNavTime", Date.now().toString())
    }

    // Handle click on beranda link
    const handleBerandaClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (!link) return

      const href = link.getAttribute("href")
      // Check if this is a beranda link
      if (href === "/" || href === "/#beranda" || href === "#beranda") {
        // If we're already on home page just scroll to top
        if (pathname === "/") {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: "smooth" })
          return
        }

        // Coming from subdir - mark as programmatic navigation and store timestamp
        storeNavTime()
        setIsProgrammaticNavigation(true)
      }
    }

    document.addEventListener("click", handleBerandaClick)
    return () => document.removeEventListener("click", handleBerandaClick)
  }, [mounted, pathname])

  // Check if we need to handle a programmatic navigation to beranda
  useEffect(() => {
    if (!mounted || !pathname) return

    const checkProgrammaticNav = () => {
      if (pathname === "/" && !isProgrammaticNavigation) {
        const lastNavTime = sessionStorage.getItem("lastNavTime")
        const currentTime = Date.now()

        if (lastNavTime && currentTime - Number.parseInt(lastNavTime, 10) < 2000) {
          // This is likely a navigation from subdir to beranda that just completed
          // Clear the flag and scroll to top
          sessionStorage.removeItem("lastNavTime")
          window.scrollTo({ top: 0, behavior: "auto" })

          // Enable smooth scrolling again after a short delay
          setTimeout(() => {
            const styleEl = document.createElement("style")
            styleEl.textContent = "html { scroll-behavior: smooth; }"
            document.head.appendChild(styleEl)
          }, 100)
        }
      }
    }

    // Run once on initial mount
    checkProgrammaticNav()

    // And also when isProgrammaticNavigation changes
    if (isProgrammaticNavigation) {
      setIsProgrammaticNavigation(false)
    }
  }, [mounted, pathname, isProgrammaticNavigation])

  // Enhanced scroll to hash function with improved error handling
  const scrollToHash = useCallback((hash: string) => {
    if (!hash) return false

    try {
      // Remove the # if it exists
      const cleanHash = hash.startsWith("#") ? hash.substring(1) : hash

      // Special case for 'beranda' - scroll to top
      if (cleanHash === "beranda") {
        window.scrollTo({ top: 0, behavior: "smooth" })
        return true
      }

      // Look up the section ID in our mapping or use the hash directly
      const id = HASH_TO_ID_MAP[cleanHash] || cleanHash

      // If id is empty string (top of page), scroll to top
      if (id === "") {
        window.scrollTo({ top: 0, behavior: "smooth" })
        return true
      }

      const element = document.getElementById(id)
      if (element) {
        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        })
        return true
      }
      return false
    } catch (error) {
      console.error("Error scrolling to hash:", error)
      return false
    }
  }, [])

  // Handle initial hash on page load
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
      }
      setInitialHashProcessed(true)
    }

    // Short delay to ensure components are mounted
    setTimeout(handleInitialHash, 100)
  }, [mounted, scrollToHash, initialHashProcessed])

  // Handle dynamic hash changes
  useEffect(() => {
    if (!mounted) return

    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        setIsNavigating(true)
        setAllComponentsVisible(true) // Ensure all components load for hash navigation
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
      } else {
        // No hash means we should scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" })
        setIsNavigating(false)
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [mounted, scrollToHash])

  // Handle browser back button and popstate
  useEffect(() => {
    if (!mounted) return

    const handlePopState = () => {
      // When using back button to navigate to home
      if (pathname === "/" && !window.location.hash) {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else if (window.location.hash) {
        // When back button navigates to a hash
        scrollToHash(window.location.hash)
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [mounted, pathname, scrollToHash])

  // Show all components immediately if there's a hash in the URL
  useEffect(() => {
    if (mounted && window.location.hash) {
      setAllComponentsVisible(true)
    }
  }, [mounted])

  // Optimized component preloading strategy
  useEffect(() => {
    if (mounted) {
      // Immediate load for visible sections
      if (window.location.hash) {
        const hash = window.location.hash.substring(1)
        if (hash in HASH_TO_ID_MAP) {
          // Preload components related to the hash
          if (["services"].includes(hash)) {
            import("./components/Services")
          } else if (["kelebihan-kami", "galeri"].includes(hash)) {
            import("./components/WhyChooseUs")
            import("./components/Gallery")
          } else if (["ulasan", "contact"].includes(hash)) {
            import("./components/BlogPreview")
            import("./components/Contact")
            import("./components/Footer")
          }
        }
      }

      // Delayed preload of first sections for better initial performance
      setTimeout(() => {
        import("./components/Services")
      }, 1000)
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    const loadWhatsApp = () => setShouldLoadWhatsApp(true)

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      // Use proper typing for requestIdleCallback
      interface RequestIdleCallbackOptions {
        timeout: number
      }

      interface RequestIdleCallbackDeadline {
        didTimeout: boolean
        timeRemaining: () => number
      }

      type RequestIdleCallbackHandle = number
      type RequestIdleCallbackFn = (deadline: RequestIdleCallbackDeadline) => void

      // Add these to the Window interface
      interface MyWindow extends Window {
        requestIdleCallback: (
          callback: RequestIdleCallbackFn,
          opts?: RequestIdleCallbackOptions,
        ) => RequestIdleCallbackHandle
      }
      // Use the properly typed window
      ;(window as unknown as MyWindow).requestIdleCallback(loadWhatsApp, { timeout: 3000 })
    } else {
      setTimeout(loadWhatsApp, 3000)
    }
  }, [mounted])

  return (
    <main className="min-h-screen bg-white">
      {isNavigating && <Loading />}

      <Navbar />
      <Hero />

      <div ref={servicesRef} id="services">
        {mounted && (servicesInView || allComponentsVisible) && (
          <Suspense fallback={<Loading />}>
            <section
              className="content-visibility-auto"
              style={{ contain: "content", containIntrinsicSize: "1px 600px" }}
            >
              <Services />
              {/* Removed PriceList component here */}
            </section>
          </Suspense>
        )}
      </div>

      <div ref={midSectionRef}>
        {mounted && (midSectionInView || allComponentsVisible) && (
          <Suspense fallback={<Loading />}>
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
        {mounted && (bottomSectionInView || allComponentsVisible) && (
          <Suspense fallback={<Loading />}>
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