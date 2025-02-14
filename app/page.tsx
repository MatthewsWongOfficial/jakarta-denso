'use client';

import { Suspense, useState, useEffect, useCallback } from "react";
import { Analytics } from '@vercel/analytics/next';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';

// Critical path components loaded immediately
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Type-safe loading state component
interface LoadingStateProps {
  height: string;
}

const LoadingState = ({ height }: LoadingStateProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`
        min-h-[${height}] 
        bg-gradient-to-r from-gray-100 to-gray-200 
        rounded-lg 
        transition-opacity duration-300
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      style={{
        backgroundSize: '200% 100%',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}
      role="progressbar"
      aria-busy="true"
    />
  );
};

// Type-safe dynamic imports
const Services = dynamic(
  () => import("./components/Services"),
  {
    loading: () => <LoadingState height="400px" />,
    ssr: true
  }
);

const PriceList = dynamic(
  () => import("./components/PriceList"),
  {
    loading: () => <LoadingState height="400px" />,
    ssr: true
  }
);

const WhyChooseUs = dynamic(
  () => import("./components/WhyChooseUs"),
  {
    loading: () => <LoadingState height="400px" />,
    ssr: true
  }
);

const Gallery = dynamic(
  () => import("./components/Gallery"),
  {
    loading: () => <LoadingState height="500px" />
  }
);

const Testimonials = dynamic(
  () => import("./components/Testimonials"),
  {
    loading: () => <LoadingState height="400px" />
  }
);

const BlogsPreview = dynamic(
  () => import("./components/BlogPreview"),
  {
    loading: () => <LoadingState height="400px" />
  }
);

const Contact = dynamic(
  () => import("./components/Contact"),
  {
    loading: () => <LoadingState height="300px" />
  }
);

const Footer = dynamic(
  () => import("./components/Footer"),
  {
    loading: () => <LoadingState height="200px" />
  }
);

// Client-side only component
const WhatsAppButton = dynamic(
  () => import("./components/WhatsAppButton"),
  {
    ssr: false,
    loading: () => null
  }
);

export default function Home() {
  // Performance monitoring
  const measurePerformance = useCallback(() => {
    if (typeof window !== 'undefined') {
      const paintMetrics = performance.getEntriesByType('paint');
      const navigationMetrics = performance.getEntriesByType('navigation');
      
      console.debug('Paint Metrics:', paintMetrics);
      console.debug('Navigation Metrics:', navigationMetrics);
    }
  }, []);

  // Optimized intersection observer setup
  const observerOptions = {
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px 0px'
  };

  const [servicesRef, servicesInView] = useInView(observerOptions);
  const [midSectionRef, midSectionInView] = useInView(observerOptions);
  const [bottomSectionRef, bottomSectionInView] = useInView(observerOptions);

  // Optimized state management
  const [shouldLoadWhatsApp, setShouldLoadWhatsApp] = useState(false);

  // Advanced component preloading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      measurePerformance();

      // Preload high-priority components
      const preloadComponents = async () => {
        try {
          await Promise.all([
            import("./components/Services"),
            import("./components/PriceList")
          ].map(p => p.catch(() => null)));
          
          console.debug('High priority components preloaded');
        } catch (error) {
          console.warn('Preloading failed:', error);
        }
      };

      // Use requestIdleCallback if available
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => preloadComponents(), { timeout: 2000 });
      } else {
        setTimeout(preloadComponents, 1000);
      }

      // Delayed WhatsApp button loading
      const timer = setTimeout(() => {
        setShouldLoadWhatsApp(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [measurePerformance]);

  return (
    <main className="min-h-screen bg-white">
      {/* Critical path - immediate load */}
      <Navbar />
      <Hero />

      {/* Priority 1: Above fold content */}
      <div ref={servicesRef}>
        {servicesInView && (
          <Suspense fallback={<LoadingState height="600px" />}>
            <section className="content-visibility-auto">
              <Services />
              <PriceList />
            </section>
          </Suspense>
        )}
      </div>

      {/* Priority 2: Mid-page content */}
      <div ref={midSectionRef}>
        {midSectionInView && (
          <Suspense fallback={<LoadingState height="900px" />}>
            <section className="content-visibility-auto">
              <WhyChooseUs />
              <Gallery />
            </section>
          </Suspense>
        )}
      </div>

      {/* Priority 3: Below fold content */}
      <div ref={bottomSectionRef}>
        {bottomSectionInView && (
          <Suspense fallback={<LoadingState height="1100px" />}>
            <section className="content-visibility-auto">
              <Testimonials />
              <BlogsPreview />
              <Contact />
              <Footer />
            </section>
          </Suspense>
        )}
      </div>

      {/* Optimized WhatsApp button */}
      {shouldLoadWhatsApp && (
        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>
      )}

      <Analytics />
    </main>
  );
}