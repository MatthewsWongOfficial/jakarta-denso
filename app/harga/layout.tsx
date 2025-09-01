import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Daftar Harga Layanan Cuci Mobil & Service AC Cirebon | Bengkel Terpercaya",
  description:
    "Daftar harga lengkap layanan cuci mobil, salon mobil, service AC, dan perawatan mesin di Cirebon. Harga terjangkau, kualitas premium, teknisi berpengalaman. Hubungi sekarang!",
  keywords: [
    "cuci mobil cirebon",
    "service ac mobil cirebon",
    "salon mobil cirebon",
    "bengkel mobil cirebon",
    "poles mobil cirebon",
    "snow wash cirebon",
    "wetlook mobil cirebon",
    "detailing mobil cirebon",
    "harga cuci mobil cirebon",
    "bengkel ac cirebon",
  ],
  authors: [{ name: "Bengkel Cirebon" }],
  creator: "Bengkel Cirebon",
  publisher: "Bengkel Cirebon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bengkel-cirebon.com"),
  alternates: {
    canonical: "/price-list",
  },
  openGraph: {
    title: "Daftar Harga Layanan Cuci Mobil & Service AC Cirebon",
    description:
      "Layanan cuci mobil, salon mobil, service AC terbaik di Cirebon dengan harga terjangkau. Snow wash, wetlook, poles mobil profesional.",
    url: "/price-list",
    siteName: "Bengkel Cirebon",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-price-list.jpg",
        width: 1200,
        height: 630,
        alt: "Daftar Harga Layanan Bengkel Cirebon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daftar Harga Layanan Cuci Mobil & Service AC Cirebon",
    description: "Layanan cuci mobil, salon mobil, service AC terbaik di Cirebon dengan harga terjangkau.",
    images: ["/og-price-list.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function PriceListLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Structured Data for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Bengkel Cirebon",
            description: "Layanan cuci mobil, salon mobil, service AC, dan perawatan kendaraan terbaik di Cirebon",
            url: "https://bengkel-cirebon.com",
            telephone: "+62-xxx-xxxx-xxxx",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Jl. Raya Cirebon",
              addressLocality: "Cirebon",
              addressRegion: "Jawa Barat",
              postalCode: "45111",
              addressCountry: "ID",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -6.7063,
              longitude: 108.5571,
            },
            openingHours: "Mo-Su 08:00-17:00",
            priceRange: "Rp 10.000 - Rp 700.000",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.4",
              reviewCount: "140",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Layanan Bengkel Cirebon",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Cuci Mobil Snow Wash",
                    description: "Layanan cuci mobil premium dengan teknologi snow wash",
                  },
                  price: "55000",
                  priceCurrency: "IDR",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Service AC Mobil",
                    description: "Perbaikan dan perawatan AC mobil oleh teknisi berpengalaman",
                  },
                  price: "600000",
                  priceCurrency: "IDR",
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  )
}
