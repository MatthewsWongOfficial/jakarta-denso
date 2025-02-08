"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Pelanggan Setia",
    content:
      "Saya sudah menjadi pelanggan Jakarta Int'l Denso Cirebon selama bertahun-tahun. Layanan mereka selalu memuaskan dan harganya terjangkau.",
  },
  {
    name: "Siti Rahayu",
    role: "Pengusaha",
    content:
      "Bengkel ini sangat profesional. Mereka selalu memberikan saran yang tepat untuk perawatan mobil saya. Sangat direkomendasikan!",
  },
  {
    name: "Agus Pratama",
    role: "Sopir Taksi",
    content:
      "Sebagai sopir taksi, saya membutuhkan perawatan mobil yang cepat dan berkualitas. Jakarta Int'l Denso Cirebon selalu bisa diandalkan.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Apa Kata Pelanggan Kami</h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 relative">
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="text-center">
              <p className="text-lg mb-4">"{testimonials[currentIndex].content}"</p>
              <p className="font-semibold">{testimonials[currentIndex].name}</p>
              <p className="text-gray-600">{testimonials[currentIndex].role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

