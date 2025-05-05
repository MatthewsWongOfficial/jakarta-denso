"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HomeIcon, ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="relative mb-8">
          <Image src="/404.svg" alt="404 Illustration" width={300} height={300} className="mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Halo Pelanggan JID</h1>
        <p className="text-xl text-gray-600 mb-8">Sepertinya Anda salah halaman. Ayo kembali ke halaman utama!</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="default" size="lg" asChild>
            <Link href="/" className="flex items-center gap-2">
              <HomeIcon className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
          </Button>

          <Button variant="outline" size="lg" onClick={() => window.history.back()} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Halaman Sebelumnya
          </Button>
        </div>
      </div>
    </div>
  )
}
