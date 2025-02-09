'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

interface NavItem {
  name: string
  href: string
}

const navItems: NavItem[] = [
  { name: 'Beranda', href: '#' },
  { name: 'Layanan', href: '#services' },
  { name: 'Harga', href: '#price-list' },
  { name: 'Kelebihan Kami', href: '#kelebihan-kami' },
  { name: 'Galeri', href: '#galeri' },
  { name: 'Ulasan', href: '#ulasan' },
  { name: 'Kontak', href: '#contact' },
]

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [scrolled, setScrolled] = React.useState<boolean>(false)

  React.useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20">
              <Image
                src="/images/logo-jid.png"
                alt="Jakarta Intl Denso Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                scrolled ? 'text-blue-900' : 'text-white'
              }`}
            >
              Jakarta Intl Denso
            </span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    scrolled
                      ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="https://wa.me/+62819647333"
                target="_blank"
                rel="noopener noreferrer"
                className={`ml-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 
                  ${
                    scrolled
                      ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
                      : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
                  } text-white shadow-lg hover:shadow-xl`}
              >
                Hubungi Kami
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden inline-flex items-center justify-center p-2 rounded-lg ${
              scrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/20'
            }`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="https://wa.me/+6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 mt-2 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-lg text-center transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
