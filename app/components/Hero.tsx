import Head from "next/head";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <Head>
        <title>Bengkel AC Mobil & Perawatan Mobil Terpercaya di Cirebon</title>
        <meta name="description" content="Bengkel terbaik di Cirebon untuk AC mobil dan perawatan mobil. Layanan berkualitas dengan pengalaman lebih dari 20 tahun." />
        <meta name="keywords" content="Bengkel Terbaik Cirebon, Cuci Mobil Cirebon, Bengkel AC Cirebon, Perawatan Mobil Cirebon" />
        <meta name="author" content="Bengkel AC Cirebon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="preload" href="/images/2022-09-07.jpg" as="image" />
      </Head>

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/2022-09-07.avif"
            alt="Bengkel AC Mobil"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="/images/2022-09-07-blur.avif"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-blue-900/50"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="space-y-8 max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              BENGKEL AC MOBIL & PERAWATAN MOBIL TERPERCAYA DI CIREBON
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 font-medium tracking-wide">
              <span className="inline-block">20+ Tahun Pengalaman</span>
              <span className="mx-4 text-blue-400">|</span>
              <span className="inline-block">Est. 2004</span>
            </p>

            <div className="flex justify-center">
              <Link
                href="#services"
                className="group inline-flex items-center px-8 py-4 
                           text-lg font-semibold
                           rounded-full
                           bg-blue-600 hover:bg-blue-700
                           border-2 border-blue-400/30
                           text-white
                           transition-all duration-300
                           hover:scale-105
                           hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
              >
                <span className="flex items-center">
                  Lihat Layanan Kami
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>
    </>
  );
}