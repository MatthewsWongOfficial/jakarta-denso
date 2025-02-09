import React from "react";
import { Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Jakarta Intl Denso Cirebon</h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Bengkel AC Mobil & Perawatan Mobil Terpercaya di Cirebon sejak 2004. 
              Kami menyediakan layanan berkualitas tinggi dengan harga terjangkau.
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
