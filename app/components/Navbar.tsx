"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, ChevronDown, Car, SprayCanIcon as Spray, PenToolIcon as Tool } from "lucide-react"

interface NavItem {
  name: string
  href: string
  hasDropdown?: boolean
}

interface ServiceItem {
  name: string
  href: string
  icon: React.ElementType
  description: string
}

const serviceItems: ServiceItem[] = [
  {
    name: "Cuci Mobil",
    href: "/cuci-mobil",
    icon: Car,
    description: "Layanan cuci mobil premium dengan teknologi snow wash",
  },
  {
    name: "Salon Mobil",
    href: "/salon-mobil",
    icon: Spray,
    description: "Perawatan eksterior & interior untuk tampilan maksimal",
  },
  {
    name: "Service AC & Mesin",
    href: "/service-ac-dan-mesin",
    icon: Tool,
    description: "Perbaikan dan perawatan AC & mesin oleh teknisi ahli",
  },
]

const navItems: NavItem[] = [
  { name: "Beranda", href: "/" },
  { name: "Layanan", href: "/#services", hasDropdown: true },
  { name: "Harga", href: "/#price-list" },
  { name: "Kelebihan Kami", href: "/#kelebihan-kami" },
  { name: "Galeri", href: "/#galeri" },
  { name: "Ulasan", href: "/#ulasan" },
  { name: "Blog", href: "/#BlogPreview" },
  { name: "Kontak", href: "/#contact" },
]

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [isServiceOpen, setIsServiceOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const isBlogPage = pathname?.startsWith("/blogs")
  const isHomePage = pathname === "/"

  // Track if we need to fix scroll on next render
  const needsScrollFix = useRef<boolean>(false)

  // Handle scroll events and outside clicks
  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServiceOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    // Check initial scroll position
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle route changes
  useEffect(() => {
    if (pathname === "/") {
      // If navigating to home, ensure scrolling is enabled
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""

      // Scroll to top if coming from another page
      if (needsScrollFix.current) {
        window.scrollTo(0, 0)
        needsScrollFix.current = false
      }
    }
  }, [pathname])

  // Ensure scrolling is enabled on mount
  useEffect(() => {
    document.body.style.overflow = ""
    document.documentElement.style.overflow = ""
  }, [])

  const getNavHref = useCallback(
    (item: NavItem): string => {
      if (isBlogPage && item.href.startsWith("/#")) {
        return `/${item.href.slice(2)}`
      }
      return item.href
    },
    [isBlogPage],
  )

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      setIsOpen(false)
      setIsServiceOpen(false)

      if (href === "/" && pathname !== "/") {
        // Navigating to home from another page
        needsScrollFix.current = true
        router.push(href)
      } else if (href === "/" && pathname === "/") {
        // Already on home page, scroll to top and refresh if needed
        window.scrollTo(0, 0)
        // Optional: Add refresh logic here if needed
        router.refresh()
      } else if (href.includes("#") && (pathname === "/" || (isBlogPage && href.startsWith("/")))) {
        // Handle anchor links
        const id = href.split("#")[1]
        scrollToElement(id)
        if (pathname === "/") {
          window.history.pushState({}, "", `/#${id}`)
        } else if (isBlogPage) {
          window.history.pushState({}, "", `/${id}`)
        }
      } else {
        // Regular navigation
        router.push(href)
      }
    },
    [router, pathname, isBlogPage],
  )

  const handleServiceItemClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      setIsServiceOpen(false)
      setIsOpen(false)
      router.push(href)
    },
    [router],
  )

  const useScrolledStyle = scrolled || isBlogPage || !isHomePage

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        useScrolledStyle ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20">
              <Image src="/images/logo.avif" alt="Jakarta Intl Denso Logo" fill className="object-contain" priority />
            </div>
            <span
              className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                useScrolledStyle ? "text-blue-900" : "text-white"
              }`}
            >
              Jakarta Intl Denso
            </span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative" ref={item.hasDropdown ? dropdownRef : null}>
                  {item.hasDropdown ? (
                    <button
                      onClick={() => setIsServiceOpen(!isServiceOpen)}
                      onMouseEnter={() => setIsServiceOpen(true)}
                      className={`group inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        useScrolledStyle
                          ? "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                          : "text-white hover:bg-white/20"
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          isServiceOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={getNavHref(item)}
                      onClick={(e) => handleNavClick(e, getNavHref(item))}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        useScrolledStyle
                          ? "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                          : "text-white hover:bg-white/20"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Desktop Mega Dropdown */}
                  {item.hasDropdown && isServiceOpen && (
                    <div
                      className="absolute left-0 mt-2 w-[500px] bg-white rounded-xl shadow-xl p-4 grid grid-cols-1 gap-4"
                      onMouseLeave={() => setIsServiceOpen(false)}
                    >
                      {serviceItems.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          onClick={(e) => handleServiceItemClick(e, service.href)}
                          className="flex items-start space-x-4 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                        >
                          <service.icon className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{service.name}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="https://wa.me/+62819647333"
                target="_blank"
                rel="noopener noreferrer"
                className={`ml-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 
                  ${
                    useScrolledStyle
                      ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                      : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
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
              useScrolledStyle ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/20"
            }`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div>
                    {/* Mobile dropdown button */}
                    <button
                      onClick={() => setIsServiceOpen(!isServiceOpen)}
                      className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200"
                    >
                      {item.name}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          isServiceOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    
                    {/* Mobile service items */}
                    {isServiceOpen && (
                      <div className="pl-4 space-y-2 mt-2">
                        {serviceItems.map((service) => (
                          <Link
                            key={service.name}
                            href={service.href}
                            onClick={(e) => handleServiceItemClick(e, service.href)}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                          >
                            <service.icon className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-gray-900">{service.name}</h3>
                              <p className="text-sm text-gray-600">{service.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={getNavHref(item)}
                    onClick={(e) => handleNavClick(e, getNavHref(item))}
                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="https://wa.me/+62819647333"
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