import { Phone, Mail, MapPin } from "lucide-react"

export default function Contact() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Hubungi Kami</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Telepon</h3>
            <p>(0231) 205148</p>
          </div>
          <div className="text-center">
            <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p>info@jakartaintldenso.com</p>
          </div>
          <div className="text-center">
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Alamat</h3>
            <p>Jl. Garuda Raya No 2-4 Cirebon</p>
          </div>
        </div>
      </div>
    </section>
  )
}

