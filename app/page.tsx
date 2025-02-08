import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Services from "./components/Services"
import PriceList from "./components/PriceList"
import WhyChooseUs from "./components/WhyChooseUs"
import Gallery from "./components/Gallery"
import Testimonials from "./components/Testimonials"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import WhatsAppButton from "./components/WhatsAppButton"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
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
    </main>
  )
}

