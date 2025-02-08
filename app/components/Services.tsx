import { Car, SprayCanIcon as Spray, PenToolIcon as Tool } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Cuci Mobil",
    icon: Car,
    items: ["Cuci Motor Salju", "Cuci Mobil Salju", "Cuci Mobil Aneka Rasa", "Cuci Wetlook", "Doorsmeer T6"],
    image: "/service-carwash.jpg",
  },
  {
    title: "Salon Mobil / Motor",
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
    image: "/service-detailing.jpg",
  },
  {
    title: "Service Mesin Mobil",
    icon: Tool,
    items: ["Isi Gas Nitrogen", "Charge ACCU", "Tambal Ban TUBLES"],
    image: "/service-mechanic.jpg",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            LAYANAN KAMI
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group backdrop-blur-lg bg-white/80 border border-gray-200 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-72">
                <Image 
                  src={service.image || "/placeholder.svg"} 
                  alt={service.title} 
                  layout="fill" 
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-700/30 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center space-x-3">
                      <service.icon className="h-8 w-8 text-blue-500" />
                      <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Items */}
              <div className="p-6">
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex} 
                      className="flex items-center text-gray-700 hover:text-blue-500 transition-colors duration-200"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-3"></div>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
