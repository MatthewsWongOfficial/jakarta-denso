import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Jakarta Int'l Denso Cirebon - Bengkel dan Salon Mobil Terbaik di Cirebon",
  description:
    "Jakarta Int'l Denso Cirebon menghadirkan layanan perawatan mobil dan salon mobil terbaik di Cirebon sejak 2004. Cuci mobil, poles, salon interior, dan layanan lainnya dengan harga terjangkau.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

