import Head from 'next/head'
import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "Jakarta Int'l Denso Cirebon",
  "image": [
    "https://jakartaintldenso.com/images/og-image.jpg",
    "https://jakartaintldenso.com/images/2022-09-07.jpg"
  ],
  "url": "https://jakartaintldenso.com",
  "telephone": "+62819647333",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Garuda No 2",
    "addressLocality": "Cirebon",
    "addressRegion": "Jawa Barat",
    "postalCode": "45131",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -6.732022,
    "longitude": 108.552316
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$"
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      <Head>
        {/* Primary Meta Tags */}
        <title>Jakarta Int&apos;l Denso Cirebon - Bengkel AC & Cuci Mobil Terbaik di Cirebon</title>
        <meta name="title" content="Jakarta Int'l Denso Cirebon - Bengkel AC & Cuci Mobil Terbaik di Cirebon" />
        <meta name="description" content="Jakarta Int'l Denso Cirebon adalah bengkel mobil terbaik di Cirebon. Kami melayani cuci mobil, salon mobil, service AC, poles mobil, detailing, dan ganti oli dengan harga terjangkau." />
        <meta name="keywords" content="Bengkel AC Cirebon, Bengkel Mobil Cirebon, Cuci Mobil Cirebon, Salon Mobil Cirebon, Service AC Mobil Cirebon, Bengkel Terbaik Cirebon" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jakartaintldenso.com" />
        <meta property="og:title" content="Jakarta Int'l Denso Cirebon - Bengkel & Salon Mobil Terbaik" />
        <meta property="og:description" content="Bengkel mobil terbaik di Cirebon, melayani service AC, cuci mobil, detailing, dan banyak lagi. Kunjungi lokasi kami sekarang!" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="Jakarta Int'l Denso Cirebon" />

        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <meta name="google" content="notranslate" key="notranslate" />
        <meta name="author" content="Jakarta Int'l Denso Cirebon" />
        <link rel="canonical" href="https://jakartaintldenso.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <main>{children}</main>
    </div>
  )
}