import { Suspense, lazy } from "react";

const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
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
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Navbar />
        <Hero />
        <Services />
        <PriceList />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </Suspense>
    </main>
  );
}
