import React from "react";
import { Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Jakarta Intl Denso Cirebon</h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Bengkel AC Mobil & Perawatan Mobil Terpercaya di Cirebon sejak 2004. 
              Kami menyediakan layanan berkualitas tinggi dengan harga terbaik.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Hubungi Kami</h3>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-400" aria-hidden="true" />
              <span className="hover:text-blue-400 transition-colors">
                (0231) 205148
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-400" aria-hidden="true" />
              <address className="not-italic">
                Jl. Garuda Raya No 2-4 Cirebon
              </address>
            </div>
          </div>

          {/* Google Maps */}
          <div className="w-full h-full min-h-[300px] rounded-3xl overflow-hidden relative bg-gradient-to-r from-blue-500 to-blue-600 p-1">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.41563466146!2d108.55457877511101!3d-6.719028993276872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee2706f072381%3A0xa508c7af4ac76e3d!2sJakarta%20Int&#39;l%20Denso%20CarWash!5e0!3m2!1sen!2sid!4v1739173434526!5m2!1sen!2sid"
              className="w-full h-full rounded-2xl"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Jakarta Intl Denso Cirebon. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;