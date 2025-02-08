import Image from "next/image"

const galleryImages = [
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=800&width=600",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=800&width=600",
  "/placeholder.svg?height=600&width=800",
  "/placeholder.svg?height=800&width=600",
]

export default function Gallery() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Galeri Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((src, index) => (
            <div key={index} className="relative h-64 overflow-hidden rounded-lg shadow-lg">
              <Image
                src={src || "/placeholder.svg"}
                alt={`Gallery image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

