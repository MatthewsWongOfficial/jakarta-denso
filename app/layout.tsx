import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import type React from "react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bengkel AC Mobil Terbaik Cirebon - Jakarta Int'l Denso",
  description:
    "Jakarta Int'l Denso - Bengkel terpercaya di Cirebon dengan layanan lengkap: service AC mobil, cuci mobil, detailing & poles. Rating 4.4/5 dari 200+ pelanggan. Teknisi berpengalaman.",
  keywords:
    "bengkel terbaik cirebon, bengkel ac cirebon, jakarta international denso, bengkel mobil cirebon, service ac mobil cirebon, cuci mobil cirebon, detailing mobil cirebon, poles mobil cirebon, perbaikan ac mobil cirebon, bengkel ac mobil terbaik cirebon, cuci mobil profesional cirebon, salon mobil cirebon, perawatan mobil cirebon, freon ac mobil cirebon, kompresor ac mobil cirebon, servis ac mobil pantura, bengkel resmi denso cirebon, teknisi ac mobil berpengalaman, ganti freon ac mobil cirebon, harga service ac mobil cirebon, bengkel ac mobil terdekat, ahli ac mobil cirebon, isi freon ac mobil cirebon, montir ac mobil cirebon, jasa perbaikan ac mobil, cleaning evaporator ac mobil, bengkel ac mobil bergaransi cirebon, sparepart ac mobil asli denso",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://jakartaintldenso.com/",
  url: "https://jakartaintldenso.com",
  name: "Jakarta Int'l Denso Cirebon",
  description: metadata.description,
  publisher: {
    "@id": "https://jakartaintldenso.com/",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["AutoRepair", "CarWash"],
  "@id": "https://jakartaintldenso.com/#local",
  name: "Jakarta Int'l Denso Cirebon",
  alternateName: "Bengkel AC Mobil Terbaik Cirebon",
  description: metadata.description,
  url: "https://jakartaintldenso.com",
  telephone: "+62819647333",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Garuda No 2",
    addressLocality: "Cirebon",
    addressRegion: "Jawa Barat",
    postalCode: "45131",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-6.732022",
    longitude: "108.552316",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "08:00",
      closes: "16:00",
    },
  ],
  department: [
    {
      "@type": "AutoRepair",
      name: "Service AC Mobil",
      description: "Spesialis service dan perbaikan AC mobil semua merk",
    },
    {
      "@type": "CarWash",
      name: "Cuci & Salon Mobil",
      description: "Layanan cuci mobil premium dan salon mobil profesional",
    },
  ],
  review: [
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Bagas Anindito",
      },
      datePublished: "2022-01-15",
      reviewBody:
        "Tempat cuci mobil terbaik di Cirebon, pelayanannya sangat baik dan mobil bersih luar & dalam. Terdapat pelayanan yang lain seperti Service AC, Custom Jok, Ganti Oli dll . Berlokasi strategis di tengah kota Cirebon tepatnya di Jalan Ampera di pertigaan. ang paling saya suka disini terdapat 2 jenis hidrolik, yang standar alias yang hanya menyangga bagian tengah mobil, dan ada yang menyangga ban mobil nya juga sehingga kaki-kaki mobil tidak cepat rusak",
    },
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Aditya Rifki Satria",
      },
      datePublished: "2020-01-15",
      reviewBody:
        "Cuci mobil paling juara, dengan harga yg worth it, terjangkau. Bisa mendapat kebersihan maksimal luar dalam, ya meski tempatnya selalu penuh dan saya nunggu dari jam set9 pagi baru selesai jam 11 siang. Tapi saya puas akan hasilnya.. oiya saya betah nunggu karena tempatnya enak, bisa ngopi juga, juara pokoknya disini pelayananya ",
    },
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Matthews Wong",
      },
      datePublished: "2024-01-15",
      reviewBody:
        "Jakarta International Denso merupakan pilihan tepat bagi Anda yang sedang mencari jasa cuci mobil terbaik di Cirebon dan memuaskan di Cirebon. Dengan pengalaman bertahun-tahun dalam industri ini, mereka telah membuktikan diri sebagai salah satu penyedia layanan cuci mobil terpercaya yang tidak hanya mengutamakan kebersihan kendaraan, tetapi juga memberikan pelayanan pelanggan yang luar biasa.Kebersihan dan Kualitas: Tidak ada yang lebih memuaskan daripada melihat mobil bersih dan berkilau setelah menjalani layanan cuci. Jakarta International Denso Cirebon sangat memahami pentingnya kebersihan kendaraan bagi para pelanggannya. Tim profesional mereka dilengkapi dengan pengetahuan dan peralatan modern untuk membersihkan mobil dengan sangat hati-hati. Mereka menggunakan produk pembersih berkualitas tinggi yang aman untuk cat dan permukaan kendaraan, sehingga Anda dapat yakin bahwa mobil Anda akan kembali dalam kondisi prima setelah proses cuci selesai",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "160",
    bestRating: "5",
    worstRating: "3",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Cirebon",
    },
    {
      "@type": "City",
      name: "Kuningan",
    },
    {
      "@type": "City",
      name: "Indramayu",
    },
  ],
  sameAs: [
    "https://www.instagram.com/jakarta_intl_denso",
    "https://www.tiktok.com/@jakdenso",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apa saja layanan bengkel Jakarta Int'l Denso Cirebon?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kami menyediakan layanan lengkap meliputi service AC mobil, cuci mobil, salon mobil, poles mobil, dan detailing mobil dengan teknisi berpengalaman.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa lama waktu service AC mobil di Jakarta Int'l Denso?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Waktu service AC mobil bervariasi tergantung kerusakan, mulai dari 1-3 jam untuk perawatan rutin hingga 1 hari untuk perbaikan kompresor.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Jakarta Int'l Denso buka hari Minggu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, kami buka setiap hari Minggu dari jam 09:00 sampai 16:00 WIB.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content="https://jakartaintldenso.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://jakartaintldenso.com/android-chrome-512x512.png" />
        <meta property="og:site_name" content="Jakarta Int'l Denso Cirebon" />
        <meta property="og:locale" content="id_ID" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="https://jakartaintldenso.com/android-chrome-512x512.png" />
        <meta name="twitter:site" content="@jakartaintldenso" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>
      
      <body className={inter.className}>{children}
      <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FRX906FRWV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FRX906FRWV');
          `}
        </Script>
        {children}
        </body>
    </html>
  );
}

