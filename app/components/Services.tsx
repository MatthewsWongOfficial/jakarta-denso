import { Car, SprayCan as Spray, PenTool as Tool } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const services = [
  {
    title: "Cuci Mobil",
    icon: Car,
    items: ["Cuci Motor Salju", "Cuci Mobil Salju", "Cuci Mobil Aneka Rasa", "Cuci Wetlook", "Doorsmeer T6"],
    image: "/images/cuci-mobil12.jpeg",
    link: "/cuci-mobil-terbaik-cirebon",
  },
  {
    title: "Salon Mobil",
    icon: Spray,
    items: [
      "Poles Motor",
      "Poles Jamur Kaca",
      "Poles Baret Wiper",
      "Poles Body Exterior",
      "Salon Interior",
      "Poles Mesin",
    ],
    image: "/images/Salon-mobil.jpeg",
    link: "/salon-mobil-terbaik-cirebon",
  },
  {
    title: "Service AC & Mesin Mobil",
    icon: Tool,
    items: [
      "Isi Gas Nitrogen",
      "Charge ACCU",
      "Tambal Ban TUBLES",
      "Perbaikan AC Mobil",
      "Ganti Sparepart AC",
      "Ganti Filter Kabin",
    ],
    image: "/images/AC-Mobil.jpeg",
    link: "/service-ac-dan-mesin-terbaik-cirebon",
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50"></div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#27398f]/20 via-blue-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#ed3f36]/15 via-red-400/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>

      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-[#27398f]/10 to-blue-500/5 rotate-45 rounded-lg"></div>
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-tr from-[#ed3f36]/10 to-red-500/5 rotate-12 rounded-lg"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-6">
          <div className="bg-gradient-to-r from-[#27398f] to-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg inline-block">
            Layanan Terlengkap
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-balance">
            <span className="bg-gradient-to-r from-[#27398f] via-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Layanan Perawatan
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Kendaraan Terbaik
            </span>
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Solusi lengkap perawatan kendaraan Anda dengan teknologi modern dan teknisi berpengalaman
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div key={index} className="group relative">
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] min-h-[700px] flex flex-col">
                {/* Image takes 70% of the card height */}
                <div className="relative w-full h-80 overflow-hidden flex-shrink-0">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

                  {/* Icon positioned on image */}
                  <div className="absolute top-6 right-6 bg-gradient-to-r from-[#27398f] to-blue-600 p-3 rounded-2xl shadow-xl backdrop-blur-sm">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col">
                  <h3 className="font-bold text-gray-800 text-2xl leading-tight">{service.title}</h3>

                  <div className="space-y-2 flex-grow">
                    {service.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-3 text-base text-gray-700">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#27398f] to-blue-600 rounded-full flex-shrink-0"></div>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={service.link}
                    className="inline-flex items-center justify-center w-full px-6 py-3 mt-auto
                      bg-gradient-to-r from-[#ed3f36] via-red-500 to-[#ed3f36] text-white font-bold rounded-xl
                      shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300
                      bg-size-200 hover:bg-pos-100 text-sm tracking-wide"
                  >
                    Lihat Detail Layanan
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#27398f] to-blue-600 bg-clip-text text-transparent">
              Mau Konsultasi tentang AC Mobil di Cirebon ?
            </h3>
            <p className="text-gray-600">Tim ahli kami siap membantu mengatasi masalah kendaraan Anda</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="tel:+62819647333"
              className="inline-flex items-center justify-center px-8 py-4 
                bg-gradient-to-r from-[#ed3f36] via-red-500 to-[#ed3f36] text-white font-bold rounded-xl
                shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300
                bg-size-200 hover:bg-pos-100"
            >
              Hubungi Sekarang - Gratis Konsultasi!
            </Link>

            <Link
              href="https://www.google.com/maps/place/Jakarta+Int'l+Denso+Cirebon+-+Spesialis+AC+Mobil+dan+Cuci+Mobil/@-6.7190195,108.5545976,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6ee2706f072381:0xa508c7af4ac76e3d!8m2!3d-6.7190248!4d108.5571725!16s%2Fg%2F11bc7m42rv?entry=tts&g_ep=EgoyMDI1MDYxNy4wIPu8ASoASAFQAw%3D%3D&skid=62804207-c286-4fd5-b1db-8c493286d106"
              className="inline-flex items-center justify-center px-8 py-4 
                bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 hover:border-[#27398f] 
                text-gray-700 hover:text-[#27398f] font-semibold rounded-xl 
                shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Kunjungi Bengkel
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
