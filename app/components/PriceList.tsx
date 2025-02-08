"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const priceCategories = [
  {
    name: "Cuci Mobil",
    items: [
      { name: "Cuci Motor Salju", price: "Rp 25.000" },
      { name: "Cuci Mobil Salju", price: "Rp 55.000" },
      { name: "Cuci Mobil Aneka Rasa", price: "Rp 60.000" },
      { name: "Cuci Wetlook", price: "Rp 200.000" },
      { name: "Doorsmeer T6", price: "Rp 20.000" },
    ],
  },
  {
    name: "Salon Mobil / Motor",
    items: [
      { name: "Poles Motor", price: "Rp 50.000" },
      { name: "Poles Jamur Kaca", price: "Rp 150.000" },
      { name: "Poles Baret Wiper", price: "Rp 250.000" },
      { name: "Poles Body Exterior", price: "Mulai dari Rp 400.000" },
      { name: "Salon Interior", price: "Mulai dari Rp 400.000" },
      { name: "Poles Mesin", price: "Mulai dari Rp 150.000" },
      { name: "Paket Salon Komplit", price: "Mulai dari Rp 700.000" },
    ],
  },
  {
    name: "Service Mesin Mobil",
    items: [
      { name: "Isi Gas Nitrogen", price: "Rp 10.000 / Ban" },
      { name: "Charge ACCU", price: "Rp 15.000" },
      { name: "Tambal Ban TUBLES", price: "Rp 25.000" },
    ],
  },
]

export default function PriceList() {
  const [activeCategory, setActiveCategory] = useState(priceCategories[0].name)

  return (
    <section id="price-list" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 gradient-text">DAFTAR HARGA</h2>
        <div className="flex justify-center mb-8 flex-wrap">
          {priceCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-6 py-3 m-2 rounded-full transition-all duration-300 text-lg font-semibold ${
                activeCategory === category.name
                  ? "bg-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl p-6 max-w-3xl mx-auto"
          >
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-gray-700 font-bold">Layanan</th>
                  <th className="text-right py-3 px-4 text-gray-700 font-bold">Harga</th>
                </tr>
              </thead>
              <tbody>
                {priceCategories
                  .find((category) => category.name === activeCategory)
                  ?.items.map((item, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-gray-800">{item.name}</td>
                      <td className="text-right py-3 px-4 text-gray-800 font-semibold">{item.price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

