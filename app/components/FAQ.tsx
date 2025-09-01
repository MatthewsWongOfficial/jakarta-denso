"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, MessageCircleQuestion } from "lucide-react"

// FAQ data structure with question and answer
interface FaqItem {
  id: string
  question: string
  answer: string
}

// FAQ data in Indonesian
const faqData = [
  {
    id: "faq-1",
    question: "Berapa lama waktu yang dibutuhkan untuk mencuci mobil?",
    answer: "Layanan cuci mobil standar kami membutuhkan waktu sekitar 45-60 menit. Untuk layanan premium seperti poles dan waxing, waktu yang dibutuhkan sekitar 2-3 jam tergantung jenis kendaraan dan kondisinya."
  },
  {
    id: "faq-2",
    question: "Apakah perlu reservasi terlebih dahulu?",
    answer: "Untuk layanan standar, Anda bisa langsung datang ke bengkel kami tanpa reservasi. Namun, untuk layanan premium seperti poles dan detailing, kami sangat menyarankan untuk melakukan reservasi terlebih dahulu."
  },
  {
    id: "faq-3",
    question: "Produk apa yang digunakan untuk mencuci dan merawat mobil?",
    answer: "Kami hanya menggunakan produk perawatan mobil berkualitas tinggi yang aman untuk cat kendaraan Anda. Semua bahan kami dijamin ramah lingkungan dan tidak merusak lapisan cat mobil."
  },
  {
    id: "faq-4",
    question: "Apakah ada garansi untuk layanan poles dan detailing?",
    answer: "Ya, layanan poles dan detailing kami memiliki garansi kepuasan. Jika dalam 48 jam setelah layanan Anda menemukan hasil yang kurang memuaskan, kami akan memperbaikinya tanpa biaya tambahan."
  },
  {
    id: "faq-5",
    question: "Bagaimana cara menjaga hasil poles agar tahan lama?",
    answer: "Untuk menjaga hasil poles tetap optimal, hindari mencuci mobil dalam 7 hari pertama setelah poles. Gunakan shampo mobil dengan pH seimbang dan parkirlah di tempat teduh bila memungkinkan."
  },
  {
    id: "faq-6",
    question: "Apakah ada layanan antar-jemput kendaraan?",
    answer: "Ya, kami menyediakan layanan antar-jemput untuk pelanggan dalam radius 10 km dari bengkel kami dengan biaya tambahan yang terjangkau. Untuk layanan premium seperti detailing dan poles, layanan ini gratis."
  },
  {
    id: "faq-7",
    question: "Di mana lokasi bengkel AC Mobil Cirebon?",
    answer: "Lokasi kami sangat strategis, hanya 5 menit dari Cirebon Super Block Mall (CSB Mall) dan 5 menit dari Grage Mall. Anda dapat menemukan kami di Google Maps dengan mencari 'Jakarta Int'l Denso Cirebon'."
  },
  {
    id: "faq-8",
    question: "Apakah Jakarta Int'l Denso menggunakan air PDAM?",
    answer: "Ya, kami menggunakan air PDAM untuk mencuci kendaraan Anda. Penggunaan air PDAM menjamin kebersihan dan kualitas air yang digunakan, sehingga aman untuk cat kendaraan Anda."
  },
  {
    id: "faq-9",
    question: "Apa saja layanan yang tersedia di Jakarta Int'l Denso Cirebon?",
    answer: "Kami menyediakan berbagai layanan perawatan mobil termasuk servis AC mobil, cuci mobil, poles, waxing, detailing interior dan eksterior, ganti oli, tune-up mesin, dan lainnya."
  },
  {
    id: "faq-10",
    question: "Berapa biaya servis AC mobil di Jakarta Int'l Denso Cirebon?",
    answer: "Biaya servis AC mobil kami mulai dari Rp 250.000 tergantung jenis kendaraan dan permasalahan yang dihadapi. Layanan dasar meliputi pengecekan sistem, isi freon, dan pembersihan filter."
  },
  {
    id: "faq-11",
    question: "Apakah Jakarta Int'l Denso Cirebon buka pada hari libur?",
    answer: "Ya, kami buka setiap hari termasuk hari libur dan akhir pekan dari pukul 08.00 hingga 17.00 WIB. Pada hari besar tertentu, jam operasional kami mungkin berubah."
  },
  {
    id: "faq-12",
    question: "Berapa lama waktu yang dibutuhkan untuk servis AC mobil?",
    answer: "Waktu servis AC mobil berkisar antara 1-3 jam tergantung pada jenis kendaraan dan permasalahan yang dihadapi. Pengecekan dan isi freon biasanya membutuhkan waktu sekitar 1 jam."
  },
  {
    id: "faq-13",
    question: "Apakah ada garansi untuk servis AC mobil?",
    answer: "Ya, kami memberikan garansi untuk setiap layanan servis AC mobil. Garansi berlaku selama 1 bulan untuk isi freon dan 3 bulan untuk penggantian komponen."
  },
  {
    id: "faq-14",
    question: "Apakah Jakarta Int'l Denso Cirebon menerima pembayaran non-tunai?",
    answer: "Ya, kami menerima berbagai metode pembayaran termasuk tunai, kartu debit/kredit, transfer bank, dan dompet digital seperti OVO, GoPay, dan DANA."
  },
  {
    id: "faq-15",
    question: "Seberapa sering sebaiknya saya melakukan servis AC mobil?",
    answer: "Untuk menjaga performa optimal, kami menyarankan servis AC setiap 6 bulan sekali atau setiap 10.000 km, tergantung mana yang lebih dulu tercapai."
  },
  {
    id: "faq-16",
    question: "Bagaimana cara mengetahui AC mobil saya perlu diservis?",
    answer: "Tanda-tanda AC mobil perlu diservis antara lain udara tidak dingin, bau tidak sedap, suara berisik, atau adanya embun berlebih pada kaca mobil saat AC dinyalakan."
  },
  {
    id: "faq-17",
    question: "Apa keuntungan menggunakan layanan detailing mobil?",
    answer: "Detailing mobil membantu menjaga kebersihan dan tampilan kendaraan dengan lebih optimal dibanding cuci biasa. Ini termasuk pembersihan mendalam interior dan eksterior, serta perlindungan tambahan terhadap cat mobil."
  },
  {
    id: "faq-18",
    question: "Apakah detailing mobil aman untuk kendaraan saya?",
    answer: "Ya, detailing mobil menggunakan produk berkualitas tinggi yang aman untuk cat dan interior kendaraan. Kami memastikan setiap langkah dilakukan dengan hati-hati untuk menjaga keawetan mobil Anda."
  },
  {
    id: "faq-19",
    question: "Bagaimana cara merawat interior mobil agar tetap bersih?",
    answer: "Gunakan vacuum secara rutin untuk membersihkan debu, hindari makan dan minum di dalam mobil, serta gunakan pembersih interior berkualitas untuk menjaga kebersihan jok dan dashboard."
  },
  {
    id: "faq-20",
    question: "Apakah Jakarta Int'l Denso Cirebon melayani perawatan mobil premium dan sport?",
    answer: "Ya, kami memiliki pengalaman menangani berbagai jenis kendaraan, termasuk mobil premium dan sport. Kami menggunakan produk perawatan khusus untuk menjaga kualitas dan performa kendaraan Anda."
  }
]

// Accordion Item Component
const AccordionItem = ({
  faq,
  isOpen,
  onClick,
}: {
  faq: FaqItem
  isOpen: boolean
  onClick: () => void
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number>(0)

  // Update content height when content changes or when isOpen changes
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [faq.answer, isOpen])

  return (
    <div className="border-b border-blue-100">
      <button
        className="flex justify-between items-center w-full py-5 px-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-inset rounded-md group"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`content-${faq.id}`}
      >
        <span className="text-base sm:text-lg md:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 pr-2">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center justify-center bg-blue-50 group-hover:bg-blue-100 rounded-full w-8 h-8 min-w-[2rem] flex-shrink-0 transition-colors duration-200"
        >
          <ChevronDown className="w-5 h-5 text-blue-600" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`content-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: contentHeight,
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.2, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: "easeIn" },
                opacity: { duration: 0.2 },
              },
            }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="p-4 pt-0 pb-6 text-gray-600 leading-relaxed bg-white">
              <p>{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Main FAQ Component
const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>("faq-1") // Set first item open by default
  const [showAll, setShowAll] = useState<boolean>(false)

  const handleToggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id)
  }

  // Display only first 10 FAQs if showAll is false
  const visibleFaqs = showAll ? faqData : faqData.slice(0, 10)

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-block bg-blue-100 p-2 px-4 rounded-full mb-4">
            <div className="flex items-center space-x-2">
              <MessageCircleQuestion className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium text-sm">Informasi Pelayanan</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 tracking-tight leading-tight">
            Pertanyaan yang Sering Ditanyakan
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Temukan jawaban atas pertanyaan umum tentang layanan kami. Jika Anda memiliki pertanyaan lain, jangan ragu
            untuk menghubungi tim layanan pelanggan kami.
          </p>

          <div className="relative mt-6">
            <div className="h-2 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full" />
            <div className="absolute top-0 h-2 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full blur-xl opacity-50 left-1/2 transform -translate-x-1/2" />
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-50"
          >
            {visibleFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                faq={faq}
                isOpen={openIndex === faq.id}
                onClick={() => handleToggle(faq.id)}
              />
            ))}
          </motion.div>

          {faqData.length > 10 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {showAll ? "Tampilkan Lebih Sedikit" : "Tampilkan Semua FAQ"}
                <motion.div animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }} className="ml-2">
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-10"
          >
            <p className="text-gray-600 mb-4">Masih punya pertanyaan?</p>
            <a
              href="https://wa.me/62819647333"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-full transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-off-2 shadow-md hover:shadow-lg"
            >
              Hubungi Kami
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 -ml-20 sm:-ml-40 -mt-20 sm:-mt-40 w-40 sm:w-80 h-40 sm:h-80 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-0 right-0 -mr-20 sm:-mr-40 -mb-20 sm:-mb-40 w-40 sm:w-80 h-40 sm:h-80 bg-blue-100 rounded-full opacity-20 blur-3xl" />
    </section>
  )
}

export default FAQSection

