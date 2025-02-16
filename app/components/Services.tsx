import { Car, SprayCanIcon as Spray, PenToolIcon as Tool } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const services = [
  {
    title: "Cuci Mobil",
    icon: Car,
    items: ["Cuci Motor Salju", "Cuci Mobil Salju", "Cuci Mobil Aneka Rasa", "Cuci Wetlook", "Doorsmeer T6"],
    image: "/images/cuci-mobil12.jpeg",
    link: "/cuci-mobil",
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
      "Paket Salon Komplit",
    ],
    image: "/images/Salon-mobil.jpeg",
    link: "/salon-mobil",
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
      "Pembersihan Evaporator",
      "Perbaikan Kebocoran AC",
    ],
    image: "/images/AC-Mobil.jpeg",
    link: "/service-ac-dan-mesin",
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-32 bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-40"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">LAYANAN KAMI</h2>
          <div className="h-2 w-32 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-[2px] rounded-2xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-400 transition-all duration-300"
            >
              <div className="absolute inset-0 blur-xl bg-gradient-to-br from-blue-500/50 to-blue-600/50 -z-10"></div>

              <div className="relative h-full bg-white rounded-2xl overflow-hidden flex flex-col">
                {/* Image Container */}
                <div className="relative h-80">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="transition-transform duration-500 object-cover"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center space-x-4">
                        <service.icon className="h-10 w-10 text-blue-400" />
                        <h3 className="text-3xl font-bold text-white">{service.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Service Items */}
                <div className="p-8 flex-grow">
                  <ul className="space-y-4">
                    {service.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-300"
                      >
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 mr-4"></div>
                        <span className="text-lg font-semibold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fixed Link button */}
                <div className="px-8 pb-8">
                  <Link
                    href={service.link}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    Lihat selengkapnya
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

