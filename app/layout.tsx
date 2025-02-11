import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Bengkel Terbaik Cirebon - Jakarta Int'l Denso | Spesialis AC Mobil",
  description: "Jakarta Int'l Denso - Bengkel terpercaya di Cirebon dengan layanan lengkap: service AC mobil, cuci mobil, detailing & poles. Rating 4.9/5 dari 200+ pelanggan. Teknisi berpengalaman.",
  keywords: "bengkel terbaik cirebon, bengkel ac cirebon, jakarta international denso, bengkel mobil cirebon, service ac mobil cirebon, cuci mobil cirebon",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://jakartaintldenso.com/",
    "url": "https://jakartaintldenso.com",
    "name": "Jakarta Int'l Denso Cirebon",
    "description": metadata.description,
    "publisher": {
      "@id": "https://jakartaintldenso.com/"
    }
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": "https://jakartaintldenso.com/",
    "name": "Jakarta Int'l Denso Cirebon",
    "legalName": "Jakarta International Denso",
    "url": "https://jakartaintldenso.com",
    "logo": {
      "@type": "ImageObject",
      "@id": "https://jakartaintldenso.com/",
      "url": "https://jakartaintldenso.com/images/Cuci-mobil.jpeg",
      "contentUrl": "https://jakartaintldenso.com/images/og-image.jpg",
      "caption": "Logo Jakarta Int'l Denso Cirebon",
      "inLanguage": "id-ID"
    },
    "image": {
      "@id": "https://jakartaintldenso.com/images/Cuci-mobil.jpeg"
    },
    "foundingDate": "2004",
    "founders": [{
      "@type": "Person",
      "name": "Haji Slamet"
    }],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Garuda No 2",
      "addressLocality": "Cirebon",
      "addressRegion": "Jawa Barat",
      "postalCode": "45131",
      "addressCountry": "ID"
    },
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+62819647333",
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": ["id", "en"]
    }]
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "CarWash"],
    "@id": "https://jakartaintldenso.com/#local",
    "name": "Jakarta Int'l Denso Cirebon",
    "alternateName": "Bengkel AC Mobil Terbaik Cirebon",
    "description": metadata.description,
    "url": "https://jakartaintldenso.com",
    "telephone": "+62819647333",
    "priceRange": "$$",
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
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "18:00"
    }, {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "09:00",
      "closes": "16:00"
    }],
    "department": [{
      "@type": "AutoRepair",
      "name": "Service AC Mobil",
      "description": "Spesialis service dan perbaikan AC mobil semua merk"
    }, {
      "@type": "CarWash",
      "name": "Cuci & Salon Mobil",
      "description": "Layanan cuci mobil premium dan salon mobil profesional"
    }],
    "review": [{
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Ahmad Subarjo"
      },
      "datePublished": "2024-01-15",
      "reviewBody": "Bengkel terbaik di Cirebon, pelayanan ramah dan profesional"
    }],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "218",
      "bestRating": "5",
      "worstRating": "3"
    },
    "areaServed": [{
      "@type": "City",
      "name": "Cirebon"
    }, {
      "@type": "City",
      "name": "Kuningan"
    }, {
      "@type": "City",
      "name": "Indramayu"
    }]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Apa saja layanan bengkel Jakarta Int'l Denso Cirebon?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kami menyediakan layanan lengkap meliputi service AC mobil, cuci mobil, salon mobil, poles mobil, dan detailing mobil dengan teknisi berpengalaman."
      }
    }, {
      "@type": "Question",
      "name": "Berapa lama waktu service AC mobil di Jakarta Int'l Denso?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Waktu service AC mobil bervariasi tergantung kerusakan, mulai dari 1-3 jam untuk perawatan rutin hingga 1 hari untuk perbaikan kompressor."
      }
    }, {
      "@type": "Question",
      "name": "Apakah Jakarta Int'l Denso buka hari Minggu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, kami buka setiap hari Minggu dari jam 09:00 sampai 16:00 WIB."
      }
    }]
  }

  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        
        {/* Advanced SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="language" content="Indonesian" />
        <meta name="revisit-after" content="7 days" />
        <meta name="geo.region" content="ID-JB" />
        <meta name="geo.placename" content="Cirebon" />
        <meta name="geo.position" content="-6.732022;108.552316" />
        <meta name="ICBM" content="-6.732022, 108.552316" />

        <link rel="canonical" href="https://jakartaintldenso.com" />
        
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}