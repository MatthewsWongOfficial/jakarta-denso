import { Award, ThumbsUp, DollarSign, MapPin } from "lucide-react"

const reasons = [
  {
    icon: Award,
    title: "Profesional & Berpengalaman",
    description: "Teknisi kami ahli dalam perawatan mobil sejak tahun 2004.",
  },
  {
    icon: ThumbsUp,
    title: "Pelayanan Terbaik",
    description: "Kami mengutamakan kepuasan pelanggan dengan hasil cuci dan poles berkualitas tinggi.",
  },
  {
    icon: DollarSign,
    title: "Harga Bersaing",
    description: "Harga yang kompetitif dengan hasil maksimal untuk mobil Anda.",
  },
  {
    icon: MapPin,
    title: "Lokasi Strategis",
    description: "Bengkel kami mudah diakses di Jl. Garuda Raya No 2-4, Cirebon.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Mengapa Memilih Kami?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-full p-4 inline-block mb-4">
                <reason.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

