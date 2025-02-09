import { Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold mb-4 gradient-text">Jakarta Intl Denso Cirebon</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Bengkel AC Mobil & Perawatan Mobil Terpercaya di Cirebon sejak 2004. Kami menyediakan layanan berkualitas
              tinggi dengan harga terjangkau.
            </p>
            <div className="flex items-center mb-2 text-gray-300 hover:text-white transition-colors">
              <Phone className="h-5 w-5 mr-2" />
              <Link href="tel:+62231205148">(0231) 205148</Link>
            </div>
            <div className="flex items-center text-gray-300 hover:text-white transition-colors">
              <MapPin className="h-5 w-5 mr-2" />
              <Link href="https://goo.gl/maps/your-google-maps-link" target="_blank" rel="noopener noreferrer">
                Jl. Garuda Raya No 2-4 Cirebon
              </Link>
            </div>
          </div>
          <div className="h-96 md:h-[450px] w-full rounded-lg overflow-hidden shadow-2xl border-4 border-white/10 transition-transform hover:scale-[1.02] duration-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.4156780673343!2d108.5545787754873!3d-6.719023665694443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee2706f072381%3A0xa508c7af4ac76e3d!2sJakarta%20Int&#39;l%20Denso%20CarWash!5e0!3m2!1sen!2sid!4v1739012215233!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Jakarta Intl Denso Cirebon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

