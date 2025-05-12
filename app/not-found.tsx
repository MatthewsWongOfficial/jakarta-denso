"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HomeIcon } from 'lucide-react'
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="relative mb-8">
          <Image src="/images/logo.avif" alt="404 Invalid Webpage" width={300} height={300} className="mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Halo Pelanggan JID</h1>
        <p className="text-xl text-gray-600 mb-8">Sepertinya Anda salah halaman. Ayo kembali ke halaman utama!</p>
        <div className="flex justify-center">
          <Button 
            variant="default" 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white" 
            asChild
          >
            <Link href="/" className="flex items-center gap-2">
              <HomeIcon className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}