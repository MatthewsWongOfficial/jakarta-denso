"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronDown } from "lucide-react"

// Types
interface ServiceItem {
  name: string
  price: string
  description: string
  keywords: string[]
}

interface PriceCategory {
  name: string
  icon: string
  description: string
  items: ServiceItem[]
}

// SEO-optimized price data with Indonesian copywriting
const priceCategories: PriceCategory[] = [
  {
    name: "Cuci Mobil",
    icon: "🚗",
    description: "Layanan cuci mobil terbaik di Cirebon dengan teknologi modern dan peralatan premium",
    items: [
      {
        name: "Cuci Motor Salju",
        price: "Rp 25.000",
        description:
          "Layanan cuci motor premium menggunakan teknologi snow wash yang membersihkan hingga ke sela-sela motor. Tim profesional kami menggunakan bahan pembersih berkualitas tinggi untuk hasil maksimal.",
        keywords: ["cuci motor cirebon", "snow wash cirebon", "cuci motor snow wash", "cuci kendaraan cirebon"],
      },
      {
        name: "Cuci Mobil Salju",
        price: "Rp 55.000",
        description:
          "Bengkel cuci mobil terpercaya dengan teknologi snow wash terbaru. Kami menggunakan foam snow premium yang aman untuk semua jenis cat mobil.",
        keywords: ["cuci mobil cirebon", "snow wash mobil", "bengkel cuci mobil", "cuci mobil murah cirebon"],
      },
      {
        name: "Cuci Mobil Aneka Rasa",
        price: "Rp 60.000",
        description:
          "Jasa cuci mobil premium dengan pilihan wangi eksklusif. Proses pencucian detail menggunakan shampoo mobil premium dan wax pelindung.",
        keywords: ["cuci mobil premium cirebon", "cuci mobil wangi", "salon mobil cirebon", "detailing mobil cirebon"],
      },
      {
        name: "Cuci Wetlook",
        price: "Rp 200.000",
        description:
          "Spesialis wetlook mobil terbaik. Menggunakan coating wetlook premium dengan hasil mengkilap tahan lama. Dilengkapi garansi hasil dan free konsultasi perawatan mobil.",
        keywords: ["wetlook mobil cirebon", "coating mobil cirebon", "poles mobil cirebon", "detailing mobil cirebon"],
      },
      {
        name: "Doorsmeer T6",
        price: "Rp 20.000",
        description:
          "Layanan doorsmeer profesional khusus perawatan karet dan pintu mobil. Menggunakan silikon T6 premium dengan hasil tahan lama.",
        keywords: ["doorsmeer cirebon", "perawatan mobil cirebon", "doorsmeer murah", "bengkel mobil cirebon"],
      },
    ],
  },
  {
    name: "Salon Mobil / Motor",
    icon: "✨",
    description: "Jasa salon dan poles kendaraan profesional di Cirebon dengan teknisi berpengalaman",
    items: [
      {
        name: "Poles Motor",
        price: "Rp 50.000",
        description:
          "Ahli poles motor dengan pengalaman 10+ tahun. Menggunakan compound dan poles premium untuk hasil mengkilap maksimal. Melayani semua jenis motor dengan garansi hasil.",
        keywords: ["poles motor cirebon", "salon motor cirebon", "bengkel motor cirebon", "poles motor murah"],
      },
      {
        name: "Poles Jamur Kaca",
        price: "Rp 150.000",
        description:
          "Spesialis treatment jamur kaca mobil dengan teknologi nano coating. Menghilangkan jamur dan bercak membandel permanen. Garansi hasil dan gratis konsultasi.",
        keywords: ["poles kaca mobil cirebon", "treatment jamur kaca", "bengkel kaca mobil", "nano coating cirebon"],
      },
      {
        name: "Poles Baret Wiper",
        price: "Rp 250.000",
        description:
          "Layanan khusus menghilangkan baret wiper pada kaca mobil. Menggunakan teknik poles presisi dan bahan premium untuk hasil optimal.",
        keywords: ["poles baret wiper", "treatment kaca mobil", "poles kaca cirebon", "perawatan kaca mobil"],
      },
      {
        name: "Poles Body Exterior",
        price: "Mulai dari Rp 400.000",
        description:
          "Jasa poles body mobil profesional dengan hasil premium. Menggunakan compound dan coating import untuk hasil maksimal. Dilengkapi garansi hasil dan gratis konsultasi.",
        keywords: ["poles mobil cirebon", "salon mobil cirebon", "detailing mobil", "coating mobil cirebon"],
      },
      {
        name: "Salon Interior",
        price: "Mulai dari Rp 400.000",
        description:
          "Layanan pembersihan dan perawatan interior mobil menyeluruh. Menggunakan produk pembersih khusus dan teknik detailing profesional untuk hasil maksimal.",
        keywords: ["salon interior mobil", "detailing interior", "cuci jok mobil", "pembersihan dashboard"],
      },
      {
        name: "Poles Mesin",
        price: "Mulai dari Rp 150.000",
        description:
          "Jasa poles dan pembersihan mesin mobil. Mengembalikan kilau komponen mesin dan melindungi dari korosi. Menggunakan produk khusus yang aman untuk semua jenis mesin.",
        keywords: ["poles mesin mobil", "pembersihan mesin", "detailing mesin", "perawatan mesin mobil"],
      },
      {
        name: "Paket Salon Komplit",
        price: "Mulai dari Rp 700.000",
        description:
          "Paket lengkap salon mobil meliputi exterior, interior, dan mesin. Perawatan menyeluruh untuk tampilan mobil seperti baru. Termasuk coating dan perlindungan ekstra.",
        keywords: ["salon mobil komplit", "detailing mobil full", "paket salon mobil", "perawatan mobil menyeluruh"],
      },
    ],
  },
  {
    name: "Service AC Mobil",
    icon: "❄️",
    description: "Bengkel specialist AC mobil terpercaya di Cirebon dengan teknisi bersertifikat",
    items: [
      {
        name: "Service AC",
        price: "Rp 600.000",
        description:
          "Bengkel AC mobil terpercaya dengan teknisi bersertifikat. Menangani AC tidak dingin, bocor, berisik, dan masalah AC lainnya. Menggunakan spare part original dan alat diagnosa digital.",
        keywords: ["service ac mobil cirebon", "bengkel ac cirebon", "perbaikan ac mobil", "ac mobil bermasalah"],
      },
      {
        name: "Ganti Freon AC",
        price: "Rp 350.000",
        description:
          "Layanan isi freon AC mobil dengan freon berkualitas R134a dan R1234yf. Pengisian menggunakan alat digital untuk hasil presisi. Garansi dingin dan konsultasi gratis.",
        keywords: ["isi freon cirebon", "ganti freon ac", "service ac mobil", "bengkel ac cirebon"],
      },
      {
        name: "Perbaikan AC",
        price: "Sesuai kondisi Mobil",
        description:
          "Specialist perbaikan AC mobil menangani segala kerusakan. Tim teknisi berpengalaman dengan peralatan modern. Menggunakan spare part original dengan garansi service.",
        keywords: ["service ac mobil cirebon", "bengkel ac terdekat", "perbaikan ac mobil", "teknisi ac mobil"],
      },
    ],
  },
  {
    name: "Service Mesin Mobil",
    icon: "🔧",
    description: "Layanan perawatan dan perbaikan mesin mobil oleh teknisi ahli di Cirebon",
    items: [
      {
        name: "Isi Gas Nitrogen",
        price: "Rp 10.000 / Ban",
        description:
          "Layanan pengisian gas nitrogen untuk ban mobil. Meningkatkan performa dan umur ban, serta menghemat bahan bakar. Pengisian presisi dengan alat modern.",
        keywords: ["isi nitrogen cirebon", "gas ban mobil", "perawatan ban", "bengkel ban cirebon"],
      },
      {
        name: "Charge ACCU",
        price: "Rp 15.000",
        description:
          "Jasa pengisian ulang aki mobil dengan alat charger modern. Memperpanjang umur aki dan memastikan performa optimal. Termasuk cek kondisi aki gratis.",
        keywords: ["charge aki cirebon", "service aki mobil", "bengkel aki", "aki mobil drop"],
      },
      {
        name: "Tambal Ban TUBLES",
        price: "Rp 25.000",
        description:
          "Layanan tambal ban tubeless profesional. Menggunakan material kualitas tinggi untuk hasil tahan lama. Proses cepat dan garansi tidak bocor.",
        keywords: ["tambal ban tubeless", "service ban cirebon", "bengkel ban 24 jam", "perbaikan ban mobil"],
      },
      {
        name: "Purging Diesel",
        price: "Mulai dari Rp 300.000",
        description:
          "Layanan pembersihan sistem bahan bakar diesel. Mengatasi masalah performa mesin dan konsumsi BBM berlebih. Menggunakan cairan pembersih khusus dan alat diagnostik modern.",
        keywords: ["purging diesel cirebon", "service mesin diesel", "pembersihan injector", "bengkel diesel"],
      },
    ],
  },
]

// Component interfaces
interface CategoryButtonProps {
  category: PriceCategory
  isActive: boolean
  onClick: () => void
}

interface ServiceRowProps {
  item: ServiceItem
  isSelected: boolean
  onClick: () => void
  category: string
}

interface MobileDropdownProps {
  activeCategory: string
  isOpen: boolean
  onToggle: () => void
  onSelect: (category: PriceCategory) => void
}

// Component Implementation
const CategoryButton: React.FC<CategoryButtonProps> = ({ category, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`relative px-8 py-4 rounded-xl transition-all duration-300 text-lg font-bold ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg"
        : "bg-white text-gray-700 hover:shadow-md border border-gray-200"
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="mr-2">{category.icon}</span>
    {category.name}
  </motion.button>
)

const ServiceRow: React.FC<ServiceRowProps> = ({ item, isSelected, onClick  }) => (
  <>
    <motion.tr
      onClick={onClick}
      className="border-t border-gray-100 hover:bg-blue-50/50 transition-colors group cursor-pointer"
    >
      <td className="py-4 md:py-6 px-6 md:px-8">
        <div className="flex items-center space-x-2">
          <motion.div animate={{ rotate: isSelected ? 90 : 0 }} className="text-blue-500">
            <ChevronRight className="w-5 h-5" />
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
    <AnimatePresence>
      {isSelected && (
        <motion.tr
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-blue-50/30"
        >
          <td colSpan={2} className="px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-4"
            >
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    #{keyword.toLowerCase().replace(/ /g, "-")}
                  </span>
                ))}
              </div>
            </motion.div>
          </td>
        </motion.tr>
      )}
    </AnimatePresence>
  </>
)

const MobileDropdown: React.FC<MobileDropdownProps> = ({ activeCategory, isOpen, onToggle, onSelect }) => (
  <div className="md:hidden mb-8">
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-between"
    >
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{priceCategories.find((cat) => cat.name === activeCategory)?.icon}</span>
        <span className="font-semibold text-lg text-white">{activeCategory}</span>
      </div>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
        <ChevronDown className="w-5 h-5 text-white" />
      </motion.div>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute z-20 left-4 right-4 mt-2 bg-white rounded-xl shadow-xl border border-gray-100"
        >
          {priceCategories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => {
                onSelect(category)
                onToggle()
              }}
              className={`w-full px-6 py-4 flex items-center space-x-3 ${
                activeCategory === category.name ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
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
)

const PriceList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(priceCategories[0].name)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null)

  const handleItemClick = (item: ServiceItem) => {
    setSelectedItem(selectedItem?.name === item.name ? null : item)
  }

  const activeCategoryData = priceCategories.find((category) => category.name === activeCategory)

  if (!activeCategoryData) return null

  return (
    <section id="price-list" className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* SEO-optimized Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">DAFTAR HARGA LAYANAN</h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {activeCategoryData.description} dengan harga terjangkau dan kualitas terbaik di Cirebon.
          </p>
          <div className="h-2 w-32 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full" />
        </motion.div>

        <MobileDropdown
          activeCategory={activeCategory}
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          onSelect={(category) => setActiveCategory(category.name)}
        />

        <div className="hidden md:flex justify-center mb-12 flex-wrap gap-4">
          {priceCategories.map((category) => (
            <CategoryButton
              key={category.name}
              category={category}
              isActive={activeCategory === category.name}
              onClick={() => setActiveCategory(category.name)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative p-[2px] rounded-3xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600"
          >
            <div className="absolute inset-0 blur-xl bg-gradient-to-br from-blue-500/50 to-blue-600/50 -z-10" />

            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
              {/* SEO-optimized Table Header */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-white">
                      <th className="text-left py-6 px-6 md:px-8 text-gray-800 text-lg md:text-xl font-bold">
                        Layanan {activeCategory} Cirebon
                      </th>
                      <th className="text-right py-6 px-6 md:px-8 text-gray-800 text-lg md:text-xl font-bold">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeCategoryData.items.map((item) => (
                      <ServiceRow
                        key={item.name}
                        item={item}
                        isSelected={selectedItem?.name === item.name}
                        onClick={() => handleItemClick(item)}
                        category={activeCategory}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* SEO Footer Section */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Temukan layanan {activeCategory.toLowerCase()} terbaik di Cirebon dengan harga terjangkau. Berlokasi
            strategis di pusat Kota Cirebon.
          </p>
          <div className="mt-4 flex justify-center flex-wrap gap-2">
            <span className="text-sm text-blue-600">★★★★★ 4.4/5 - 140+ ulasan Google</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PriceList

