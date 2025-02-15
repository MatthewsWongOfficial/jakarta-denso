"use client"

import { Suspense, useState, useEffect, useCallback, useMemo } from "react"
import { Analytics } from "@vercel/analytics/react"
import dynamic from "next/dynamic"
import { useInView } from "react-intersection-observer"

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

// Define component paths map for type safety and reusability
const COMPONENT_PATHS = {
  Services: "./components/Services",
  PriceList: "./components/PriceList",
  WhyChooseUs: "./components/WhyChooseUs",
  Gallery: "./components/Gallery",
  Testimonials: "./components/Testimonials",
  BlogsPreview: "./components/BlogPreview",
  Contact: "./components/Contact",
  Footer: "./components/Footer",
} as const

// Type-safe dynamic import with correct typing
const dynamicImport = (componentPath: string, height: string) => {
  // Using require to avoid the Module not found error
  return dynamic(() => {
    switch(componentPath) {
      case COMPONENT_PATHS.Services:
        return import(COMPONENT_PATHS.Services)
      case COMPONENT_PATHS.PriceList:
        return import(COMPONENT_PATHS.PriceList)
      case COMPONENT_PATHS.WhyChooseUs:
        return import(COMPONENT_PATHS.WhyChooseUs)
      case COMPONENT_PATHS.Gallery:
        return import(COMPONENT_PATHS.Gallery)
      case COMPONENT_PATHS.Testimonials:
        return import(COMPONENT_PATHS.Testimonials)
      case COMPONENT_PATHS.BlogsPreview:
        return import(COMPONENT_PATHS.BlogsPreview)
      case COMPONENT_PATHS.Contact:
        return import(COMPONENT_PATHS.Contact)
      case COMPONENT_PATHS.Footer:
        return import(COMPONENT_PATHS.Footer)
      default:
        throw new Error(`Unknown component path: ${componentPath}`)
    }
  }, {
    loading: () => <LoadingState height={height} />,
    ssr: true,
  })
}

// Pre-cached critical components with parallel routes
const Services = dynamicImport(COMPONENT_PATHS.Services, "400px")
const PriceList = dynamicImport(COMPONENT_PATHS.PriceList, "400px")

// Performance-optimized non-critical components
const WhyChooseUs = dynamicImport(COMPONENT_PATHS.WhyChooseUs, "400px")
const Gallery = dynamicImport(COMPONENT_PATHS.Gallery, "500px")
const Testimonials = dynamicImport(COMPONENT_PATHS.Testimonials, "400px")
const BlogsPreview = dynamicImport(COMPONENT_PATHS.BlogsPreview, "400px")
const Contact = dynamicImport(COMPONENT_PATHS.Contact, "300px")
const Footer = dynamicImport(COMPONENT_PATHS.Footer, "200px")

// Pure client component with enhanced loading strategy
const WhatsAppButton = dynamic(() => import("./components/WhatsAppButton"), {
  ssr: false,
  loading: () => null,
})

// Define hash to section ID mapping for consistency
const HASH_TO_ID_MAP: Record<string, string> = {
  "services": "services",
  "price-list": "price-list",
  "kelebihan-kami": "kelebihan-kami",
  "galeri": "galeri",
  "ulasan": "ulasan",
  "contact": "contact",
} as const

export default function Home() {
  const [mounted, setMounted] = useState(false)

  // Function to load a component by its path - memoized to prevent recreation
  const loadComponent = useCallback((path: string) => {
    switch(path) {
      case COMPONENT_PATHS.Services:
        return import(COMPONENT_PATHS.Services).catch(() => null)
      case COMPONENT_PATHS.PriceList:
        return import(COMPONENT_PATHS.PriceList).catch(() => null)
      case COMPONENT_PATHS.WhyChooseUs:
        return import(COMPONENT_PATHS.WhyChooseUs).catch(() => null)
      case COMPONENT_PATHS.Gallery:
        return import(COMPONENT_PATHS.Gallery).catch(() => null)
      case COMPONENT_PATHS.BlogsPreview:
        return import(COMPONENT_PATHS.BlogsPreview).catch(() => null)
      case COMPONENT_PATHS.Contact:
        return import(COMPONENT_PATHS.Contact).catch(() => null)
      default:
        return Promise.resolve(null)
    }
  }, [])

  // Critical CSS variables for layout stability - set only once
  useEffect(() => {
    if (document.documentElement.hasAttribute('data-css-vars-set')) return;
    
    const root = document.documentElement
    root.style.setProperty("--container-padding", "1rem")
    root.style.setProperty("--hero-height", "80vh")
    root.style.setProperty("--section-spacing", "4rem")
    root.setAttribute('data-css-vars-set', 'true')
    setMounted(true)
  }, [])

  // Scroll to hash function - extracted for reuse
  const scrollToHash = useCallback((hash: string) => {
    if (!hash) return;
    
    // Remove the # if it exists
    const cleanHash = hash.startsWith('#') ? hash.substring(1) : hash;
    
    // Look up the section ID in our mapping or use the hash directly
    const id = HASH_TO_ID_MAP[cleanHash] || cleanHash;
    
    const element = document.getElementById(id);
    if (element) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  // Enhanced hash navigation with smoother transitions
  useEffect(() => {
    if (!mounted) return;

    // Initial hash handling
    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (hash) {
        // We need a small delay to ensure the DOM is fully rendered
        setTimeout(() => scrollToHash(hash), 100);
      }
    };

    // Handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        scrollToHash(hash);
      }
    };

    // Initial check
    handleInitialHash();

    // Listen for changes
    window.addEventListener("hashchange", handleHashChange);
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [mounted, scrollToHash]);

  // Component mapping for preloading
  const hashToComponentMap = useMemo(() => ({
    "services": COMPONENT_PATHS.Services,
    "price-list": COMPONENT_PATHS.PriceList,
    "kelebihan-kami": COMPONENT_PATHS.WhyChooseUs,
    "galeri": COMPONENT_PATHS.Gallery,
    "ulasan": COMPONENT_PATHS.BlogsPreview,
    "contact": COMPONENT_PATHS.Contact,
  }), []);

  // Smart preloading with improved prioritization
  const preloadComponentByHash = useCallback(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;
    if (!hash) return;
    
    const cleanHash = hash.startsWith('#') ? hash.substring(1) : hash;
    const componentPath = hashToComponentMap[cleanHash];
    
    if (componentPath) {
      loadComponent(componentPath);
    }
  }, [loadComponent, hashToComponentMap]);

  // Optimized preloading with improved error handling
  useEffect(() => {
    if (!mounted) return;

    // Preload component based on current hash
    preloadComponentByHash();

    // Using intersection observer for priority-based preloading
    const preloadBasedOnVisibility = () => {
      // Create an observer that preloads components when they're close to viewport
      const preloadObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              const componentPath = hashToComponentMap[id];
              if (componentPath) {
                loadComponent(componentPath);
              }
              preloadObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '500px 0px' }
      );
      
      // Observe all section containers
      Object.keys(hashToComponentMap).forEach(id => {
        const element = document.getElementById(id);
        if (element) preloadObserver.observe(element);
      });
      
      return () => preloadObserver.disconnect();
    };
    
    // Start visibility-based preloading
    const cleanup = preloadBasedOnVisibility();
    
    // Also handle hash changes
    window.addEventListener("hashchange", preloadComponentByHash);
    return () => {
      window.removeEventListener("hashchange", preloadComponentByHash);
      cleanup();
    };
  }, [mounted, preloadComponentByHash, loadComponent, hashToComponentMap]);

  // Optimized intersection observer with better thresholds
  const observerOptions = useMemo(
    () => ({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: "200px 0px",
    }),
    []
  );

  const [servicesRef, servicesInView] = useInView(observerOptions);
  const [midSectionRef, midSectionInView] = useInView(observerOptions);
  const [bottomSectionRef, bottomSectionInView] = useInView(observerOptions);

  // Delayed WhatsApp button with priority handling
  const [shouldLoadWhatsApp, setShouldLoadWhatsApp] = useState(false);

  useEffect(() => {
    if (!mounted) return;

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => setShouldLoadWhatsApp(true), { timeout: 3000 });
    } else {
      setTimeout(() => setShouldLoadWhatsApp(true), 3000);
    }
  }, [mounted]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      <div ref={servicesRef} id="services">
        {mounted && servicesInView && (
          <Suspense fallback={<LoadingState height="600px" />}>
            <section 
              className="content-visibility-auto" 
              style={{ contain: 'content', containIntrinsicSize: '1px 600px' }}
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
        {mounted && midSectionInView && (
          <Suspense fallback={<LoadingState height="900px" />}>
            <section 
              className="content-visibility-auto"
              style={{ contain: 'content', containIntrinsicSize: '1px 900px' }}
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
        {mounted && bottomSectionInView && (
          <Suspense fallback={<LoadingState height="1100px" />}>
            <section 
              className="content-visibility-auto"
              style={{ contain: 'content', containIntrinsicSize: '1px 1100px' }}
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