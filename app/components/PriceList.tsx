"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronDown } from "lucide-react"

const priceCategories = [
  {
    name: "Cuci Mobil",
    icon: "🚗",
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
    icon: "✨",
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
    icon: "⚙️",
    items: [
      { name: "Isi Gas Nitrogen", price: "Rp 10.000 / Ban" },
      { name: "Charge ACCU", price: "Rp 15.000" },
      { name: "Tambal Ban TUBLES", price: "Rp 25.000" },
      { name: "Service AC Mobil", price: "Rp 600.000" },
      { name: "Ganti Filter Kabin", price: "Rp 75.000- 100.000" },
      { name: "Perbaikan AC Mobil", price: "Sesuai jenis mobil & kondisi" },
      { name: "Ganti Sparepart AC", price: "Sesuai jenis mobil & kondisi" },
    ],
  },
]

export default function PriceList() {
  const [activeCategory, setActiveCategory] = useState(priceCategories[0].name)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section id="price-list" className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Enhanced Header with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            DAFTAR HARGA
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Improved Mobile Dropdown */}
        <div className="md:hidden mb-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-between transform transition-all duration-200 hover:shadow-xl active:scale-95"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{priceCategories.find(cat => cat.name === activeCategory)?.icon}</span>
              <span className="font-semibold text-lg text-white">{activeCategory}</span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-white" />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute z-20 left-4 right-4 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
              >
                {priceCategories.map((category) => (
                  <motion.button
                    key={category.name}
                    onClick={() => {
                      setActiveCategory(category.name)
                      setIsOpen(false)
                    }}
                    className={`w-full px-6 py-4 flex items-center space-x-3 ${
                      activeCategory === category.name
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Desktop Category Buttons */}
        <div className="hidden md:flex justify-center mb-12 flex-wrap gap-4">
          {priceCategories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`relative px-8 py-4 rounded-xl transition-all duration-300 text-lg font-bold ${
                activeCategory === category.name
                  ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:shadow-md border border-gray-200"
              }`}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Enhanced Price Table with Better Visual Hierarchy */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative p-[2px] rounded-3xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600"
          >
            <div className="absolute inset-0 blur-xl bg-gradient-to-br from-blue-500/50 to-blue-600/50 -z-10"></div>
            
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-white">
                      <th className="text-left py-6 px-6 md:px-8 text-gray-800 text-lg md:text-xl font-bold">Layanan</th>
                      <th className="text-right py-6 px-6 md:px-8 text-gray-800 text-lg md:text-xl font-bold">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceCategories
                      .find((category) => category.name === activeCategory)
                      ?.items.map((item, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="border-t border-gray-100 hover:bg-blue-50/50 transition-colors group"
                        >
                          <td className="py-4 md:py-6 px-6 md:px-8">
                            <div className="flex items-center space-x-2">
                              <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="text-blue-500"
                              >
                                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </motion.div>
                              <span className="text-base md:text-lg text-gray-800 font-medium">{item.name}</span>
                            </div>
                          </td>
                          <td className="text-right py-4 md:py-6 px-6 md:px-8">
                            <span className="text-base md:text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                              {item.price}
                            </span>
                          </td>
                        </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}