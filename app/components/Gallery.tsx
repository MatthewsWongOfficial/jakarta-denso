"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Head from "next/head"

const galleryImages = [
  {
    src: "/images/proses-cuci.jpeg",
    title: "Proses Cuci Mobil Premium di Cirebon",
    category: "Cuci Mobil Cirebon",
    alt: "Layanan cuci mobil premium di Cirebon",
  },
  {
    src: "/images/Poles-Mobil.jpeg",
    title: "Detail Poles Professional di Cirebon",
    category: "Salon Mobil Cirebon",
    alt: "Poles mobil profesional di Cirebon",
  },
  {
    src: "/images/ekterior.jpeg",
    title: "Eksterior Bersih Maksimal - Cuci Mobil Cirebon",
    category: "Salon Mobil Cirebon",
    alt: "Hasil cuci mobil eksterior bersih di Cirebon",
  },
  {
    src: "/images/eksterior2.jpeg",
    title: "Eksterior Mengkilap - Poles Mobil Cirebon",
    category: "Poles Mobil Cirebon",
    alt: "Hasil poles mobil eksterior mengkilap di Cirebon",
  },
  {
    src: "/images/Jok-mobil.jpeg",
    title: "Cover Jok Mobil Paten / Semi Paten di Cirebon",
    category: "Aksesoris Mobil Cirebon",
    alt: "Layanan pemasangan cover jok mobil di Cirebon",
  },
  {
    src: "/images/Parfum-mobil.jpeg",
    title: "Parfum Mobil Berkualitas di Cirebon",
    category: "Aksesoris Mobil Cirebon",
    alt: "Parfum mobil berkualitas tersedia di Cirebon",
  },
  {
    src: "/images/purging.jpeg",
    title: "Purging Diesel - Perawatan Mobil di Cirebon",
    category: "Perawatan Mobil Cirebon",
    alt: "Layanan purging diesel untuk perawatan mobil di Cirebon",
  },
  {
    src: "/images/velg.jpeg",
    title: "Velg Mobil Berkualitas di Cirebon",
    category: "Aksesoris Mobil Cirebon",
    alt: "Pilihan velg mobil berkualitas di Cirebon",
  },
  {
    src: "/images/lokasi-kami.jpeg",
    title: "Lokasi Bengkel Cuci dan AC Mobil di Cirebon",
    category: "Galeri Bengkel Cirebon",
    alt: "Lokasi bengkel cuci dan AC mobil di Cirebon",
  },
]

export default function GaleriKami() {
  const pageTitle = "Galeri Layanan Cuci Mobil dan AC Mobil di Cirebon"
  const pageDescription =
    "Lihat galeri layanan cuci mobil premium dan perawatan AC mobil di Cirebon. Kami menyediakan layanan berkualitas untuk kendaraan Anda."

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="Cuci Mobil Cirebon, AC Mobil Cirebon, Poles Mobil Cirebon, Salon Mobil Cirebon, Perawatan Mobil Cirebon"
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <link rel="canonical" href="https://www.jakartaintldenso.com/galeri" />
      </Head>

      <section id="galeri" className="seksi-galeri py-24 bg-white relative">
        <div className="latar-belakang absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30"></div>

        <div className="kontainer-galeri container mx-auto px-4 relative z-10">
          <div className="kepala-galeri text-center mb-20 relative">
            <h1 className="judul-galeri text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight relative z-10">
              Galeri Layanan Kami
            </h1>
            <div className="absolute inset-x-0 bottom-2 h-10 bg-gradient-to-t from-white to-transparent"></div>
            <div className="garis-judul h-2 w-32 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid-galeri grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="item-galeri group relative p-[2px] rounded-3xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="efek-blur absolute inset-0 blur-xl bg-gradient-to-br from-blue-500/50 to-blue-600/50 -z-10"></div>

                <div className="konten-gambar relative bg-white rounded-3xl overflow-hidden">
                  <div className="aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] relative">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="gambar-galeri object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="overlay-galeri absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent">
                      <div className="info-galeri absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 transition-transform duration-300">
                        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
                        <p className="kategori-galeri text-blue-400 text-sm font-medium mb-2 relative z-10">
                          {image.category}
                        </p>
                        <h2 className="judul-gambar text-white text-xl font-bold relative z-10">{image.title}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

