import { Suspense, lazy } from "react";
import { Analytics } from '@vercel/analytics/next';
import Navbar from "./components/Navbar"; 
import Hero from "./components/Hero";  // Load Hero immediately

const Services = lazy(() => import("./components/Services"));
const PriceList = lazy(() => import("./components/PriceList"));
const WhyChooseUs = lazy(() => import("./components/WhyChooseUs"));
const Gallery = lazy(() => import("./components/Gallery"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const WhatsAppButton = lazy(() => import("./components/WhatsAppButton"));

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />  {/* Hero loads instantly */}

      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Services />
        <PriceList />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </Suspense>

      <Analytics />
    </main>
  );
}
