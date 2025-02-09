import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Jakarta Int'l Denso Cirebon - Bengkel AC & Cuci Mobil Terbaik di Cirebon",
  description:
    "Jakarta Int'l Denso Cirebon adalah bengkel mobil terbaik di Cirebon. Kami melayani cuci mobil, salon mobil, service AC, poles mobil, detailing, dan ganti oli dengan harga terjangkau.",
  keywords:
    "Bengkel AC Cirebon, Bengkel Mobil Cirebon, Cuci Mobil Cirebon, Salon Mobil Cirebon, Service AC Mobil Cirebon, Bengkel Terbaik Cirebon, Poles Mobil Cirebon, Detailing Mobil Cirebon, Service Mobil Terbaik, Ganti Oli Cirebon, Bengkel AL Cirebon, Perawatan Mobil Cirebon, Cuci Mobil Matic, Service AC Mobil Terbaik, Cuci Mobil Terdekat, Bengkel Cirebon Terpercaya",
  openGraph: {
    title: "Jakarta Int'l Denso Cirebon - Bengkel & Salon Mobil Terbaik",
    description:
      "Bengkel mobil terbaik di Cirebon, melayani service AC, cuci mobil, detailing, dan banyak lagi. Kunjungi lokasi kami sekarang!",
    url: "https://jakartaintldenso.com", // Replace with actual website URL
    type: "website",
    image: "/images/Cuci-mobil.jpeg", // Ensure this file is in public/images/
    location: "https://maps.app.goo.gl/YpXNX5oDLjxaNsCk8",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // JSON-LD structured data for local business SEO (Auto Repair)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair and Carwash",
    "name": "Jakarta Int'l Denso Cirebon",
    "image": "https://jakartaintldenso.com/images/Cuci-mobil.jpeg",
    "url": metadata.openGraph.url,
    "telephone": "+62819647333", // Replace with actual phone number
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
      "latitude": "-6.732022",
      "longitude": "108.552316"
    },
    "hasMap": metadata.openGraph.location,
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "38"
    }
  }

  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content="Jakarta Int'l Denso Cirebon" />
        <meta name="robots" content="index, follow" />
        {/* Canonical URL */}
        <link rel="canonical" href={metadata.openGraph.url} />
        {/* Open Graph Meta Tags for social sharing */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.image} />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="Jakarta Int'l Denso Cirebon" />
        <meta property="og:location" content={metadata.openGraph.location} />
        {/* JSON-LD Schema Markup for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
