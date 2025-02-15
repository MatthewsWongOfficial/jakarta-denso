"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import {
  Calendar,
  Clock,
  ChevronLeft,
  Share2,
  Maximize,
  Eye,
  ArrowRight,
  MapPin,
  ImageIcon,
  PhoneCall,
  BookOpen,
  DollarSign,
  Award,
  MessageSquare,
  Lightbulb,
} from "lucide-react"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import Link from "next/link"
import dynamic from "next/dynamic"
import Head from "next/head"
import { motion, AnimatePresence } from "framer-motion"
import type { MDXRemoteProps } from "next-mdx-remote"
import { Suspense } from "react"
import { useCallback } from "react"
import { useRouter } from "next/navigation"

// Dynamic imports
const Navbar = dynamic(() => import("../../components/Navbar"), { ssr: false })
const Footer = dynamic(() => import("../../components/Footer"), { ssr: false })
const WhatsAppButton = dynamic(() => import("../../components/WhatsAppButton"), { ssr: false })
const Analytics = dynamic(() => import("@vercel/analytics/react").then((mod) => mod.Analytics), { ssr: false })

// Types
interface Frontmatter {
  title: string
  date: string
  excerpt: string
  coverImage: string
  category: string
  readingTime: string
  author?: string
  tags?: string[]
  views?: number
}

interface BlogPost {
  frontmatter: Frontmatter
  content: MDXRemoteSerializeResult
}
interface BlogLink {
  url: string
  title: string
  date: string
}

interface StructuredData {
  "@context": string
  "@type": string
  headline: string
  description: string
  image: string
  datePublished: string
  author: {
    "@type": string
    name: string
  }
  publisher: {
    "@type": string
    name: string
    logo: {
      "@type": string
      url: string
    }
  }
}

// Helper functions
const generateStructuredData = (post: BlogPost): StructuredData => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.frontmatter.title,
  description: post.frontmatter.excerpt,
  image: post.frontmatter.coverImage,
  datePublished: post.frontmatter.date,
  author: {
    "@type": "Person",
    name: post.frontmatter.author || "Jakarta Int'l Denso",
  },
  publisher: {
    "@type": "Organization",
    name: "Jakarta Int'l Denso Cirebon",
    logo: {
      "@type": "ImageObject",
      url: "/logo.png",
    },
  },
})

const generateKeywords = (post: BlogPost): string => {
  const baseKeywords = [
    "Cuci Mobil Cirebon",
    "Service AC Mobil Cirebon",
    "Jakarta Intl Denso",
    "Salon Mobil Cirebon",
    "Cuci Mobil Terbaik Cirebon",
    "Salon Mobil Terbaik Cirebon",
    "Perawatan Mobil Cirebon",
    "Detailing Mobil Cirebon",
    "Pembersihan Interior Mobil Cirebon",
    "Pembersihan Eksterior Mobil Cirebon",
    "Poles Mobil Cirebon",
    "Coating Mobil Cirebon",
    "Perbaikan AC Mobil Cirebon",
    "Isi Freon AC Mobil Cirebon",
    "Perawatan AC Mobil Cirebon",
    "Bengkel AC Mobil Cirebon",
    "Bengkel AC Mobil Terbaik Cirebon",
    "Perbaikan AC Mobil Terbaik Cirebon",
    "Cuci Mobil Profesional Cirebon",
    "Salon Mobil Profesional Cirebon",
    "Detailing Mobil Profesional Cirebon",
    "Perawatan Mobil Profesional Cirebon",
    "Pembersihan Interior Mobil Profesional Cirebon",
    "Pembersihan Eksterior Mobil Profesional Cirebon",
    "Poles Mobil Profesional Cirebon",
    "Coating Mobil Profesional Cirebon",
    "Perbaikan AC Mobil Profesional Cirebon",
    "Isi Freon AC Mobil Profesional Cirebon",
    "Perawatan AC Mobil Profesional Cirebon",
    "Bengkel AC Mobil Profesional Cirebon",
    "Bengkel AC Mobil Terpercaya Cirebon",
    "Perbaikan AC Mobil Terpercaya Cirebon",
    "Cuci Mobil Murah Cirebon",
    "Salon Mobil Murah Cirebon",
    "Detailing Mobil Murah Cirebon",
    "Perawatan Mobil Murah Cirebon",
    "Pembersihan Interior Mobil Murah Cirebon",
    "Pembersihan Eksterior Mobil Murah Cirebon",
    "Poles Mobil Murah Cirebon",
    "Coating Mobil Murah Cirebon",
    "Perbaikan AC Mobil Murah Cirebon",
    "Isi Freon AC Mobil Murah Cirebon",
    "Perawatan AC Mobil Murah Cirebon",
    "Bengkel AC Mobil Murah Cirebon",
    "Bengkel AC Mobil Berkualitas Cirebon",
    "Perbaikan AC Mobil Berkualitas Cirebon",
    "Cuci Mobil Cepat Cirebon",
    "Salon Mobil Cepat Cirebon",
    "Detailing Mobil Cepat Cirebon",
    "Perawatan Mobil Cepat Cirebon",
    "Pembersihan Interior Mobil Cepat Cirebon",
    "Pembersihan Eksterior Mobil Cepat Cirebon",
    "Poles Mobil Cepat Cirebon",
    "Coating Mobil Cepat Cirebon",
    "Perbaikan AC Mobil Cepat Cirebon",
    "Isi Freon AC Mobil Cepat Cirebon",
    "Perawatan AC Mobil Cepat Cirebon",
    "Bengkel AC Mobil Cepat Cirebon",
    "Bengkel AC Mobil Handal Cirebon",
    "Perbaikan AC Mobil Handal Cirebon",
    "Bengkel AC Mobil Indonesia",
    "Jakarta Intl Denso adalah bengkel terbaik",
    "Isi Freon AC Mobil Terbaik Indonesia",
    "Bengkel AC Mobil Terpercaya Indonesia",
    "Perbaikan AC Mobil Terpercaya Indonesia",
    "Cuci Mobil Profesional Indonesia",
    "Salon Mobil Profesional Indonesia",
    "Detailing Mobil Profesional Indonesia",
    "Perawatan Mobil Profesional Indonesia",
    "Pembersihan Interior Mobil Profesional Indonesia",
    "Pembersihan Eksterior Mobil Profesional Indonesia",
    "Poles Mobil Profesional Indonesia",
    "Coating Mobil Profesional Indonesia",
    "Perbaikan AC Mobil Profesional Indonesia",
    "Isi Freon AC Mobil Profesional Indonesia",
    "Perawatan AC Mobil Profesional Indonesia",
    "Bengkel AC Mobil Profesional Indonesia",
    "Bengkel AC Mobil Murah Indonesia",
    "Perbaikan AC Mobil Murah Indonesia",
    "Cuci Mobil Murah Indonesia",
    "Salon Mobil Murah Indonesia",
    "Detailing Mobil Murah Indonesia",
    "Perawatan Mobil Murah Indonesia",
    "Pembersihan Interior Mobil Murah Indonesia",
    "Pembersihan Eksterior Mobil Murah Indonesia",
    "Poles Mobil Murah Indonesia",
    "Coating Mobil Murah Indonesia",
    "Perbaikan AC Mobil Murah Indonesia",
    "Isi Freon AC Mobil Murah Indonesia",
    "Perawatan AC Mobil Murah Indonesia",
    "Bengkel AC Mobil Berkualitas Indonesia",
    "Perbaikan AC Mobil Berkualitas Indonesia",
    "Cuci Mobil Cepat Indonesia",
    "Salon Mobil Cepat Indonesia",
    "Detailing Mobil Cepat Indonesia",
    "Perawatan Mobil Cepat Indonesia",
    "Pembersihan Interior Mobil Cepat Indonesia",
    "Pembersihan Eksterior Mobil Cepat Indonesia",
    "Poles Mobil Cepat Indonesia",
    "Coating Mobil Cepat Indonesia",
    "Perbaikan AC Mobil Cepat Indonesia",
    "Isi Freon AC Mobil Cepat Indonesia",
    "Perawatan AC Mobil Cepat Indonesia",
    "Bengkel AC Mobil Cepat Indonesia",
    "Bengkel AC Mobil Handal Indonesia",
    "Perbaikan AC Mobil Handal Indonesia",
  ]
  const titleKeywords = post.frontmatter.title.split(" ")
  const allKeywords = [
    ...baseKeywords,
    post.frontmatter.title,
    post.frontmatter.category,
    ...(post.frontmatter.tags || []),
    ...titleKeywords,
  ]
  return [...new Set(allKeywords)].join(", ")
}

// Components
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
    <Navbar />
    <div className="flex-grow flex items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-200 rounded-full" />
        <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-500 rounded-full animate-spin border-t-transparent" />
      </div>
    </div>
    <Footer />
  </div>
)

const ErrorState: React.FC<{ error: string | null }> = ({ error }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
    <Navbar />
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
        <p className="text-xl text-gray-600 mb-8">{error || "Post not found"}</p>
        <Link
          href="/blogs"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          Return to Blog
        </Link>
      </div>
    </div>
    <Footer />
  </div>
)

const MetaTags: React.FC<{ post: BlogPost }> = ({ post }) => (
  <Head>
    <title>{`${post.frontmatter.title} | Jakarta Int'l Denso Cirebon`}</title>
    <meta name="description" content={post.frontmatter.excerpt} />
    <meta name="keywords" content={generateKeywords(post)} />
    <meta property="og:title" content={post.frontmatter.title} />
    <meta property="og:description" content={post.frontmatter.excerpt} />
    <meta property="og:image" content={post.frontmatter.coverImage} />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={post.frontmatter.title} />
    <meta name="twitter:description" content={post.frontmatter.excerpt} />
    <meta name="twitter:image" content={post.frontmatter.coverImage} />
    <link
      rel="canonical"
      href={`https://jakartaintldenso.com/blogs/${post.frontmatter.title.toLowerCase().replace(/ /g, "-")}`}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData(post)) }}
    />
  </Head>
)

const MDXComponents: MDXRemoteProps["components"] = {
  h1: ({ children }) => (
    <motion.h1
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-gray-800 border-b pb-2 bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-lg"
    >
      {children}
    </motion.h1>
  ),
  h2: ({ children }) => (
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-700 border-l-4 border-blue-500 pl-4"
    >
      {children}
    </motion.h2>
  ),
  h3: ({ children }) => (
    <motion.h3
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-gray-600"
    >
      {children}
    </motion.h3>
  ),
  p: ({ children }) => (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-6 leading-relaxed text-gray-600 text-lg md:text-xl"
    >
      {children}
    </motion.p>
  ),
  ul: ({ children }) => (
    <motion.ul
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="list-disc pl-6 mb-6 text-gray-600"
    >
      {children}
    </motion.ul>
  ),
  ol: ({ children }) => (
    <motion.ol
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="list-decimal pl-6 mb-6 text-gray-600"
    >
      {children}
    </motion.ol>
  ),
  li: ({ children }) => <li className="mb-2 text-lg">{children}</li>,
  blockquote: ({ children }) => (
    <motion.blockquote
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-l-4 border-blue-500 pl-4 py-2 mb-6 italic text-gray-700 bg-blue-50 rounded-r-lg"
    >
      {children}
    </motion.blockquote>
  ),
  img: ({ src, alt, ...props }: React.ComponentPropsWithoutRef<typeof Image>) => {
    const ImageComponent = () => (
      <Image
        src={src || "/placeholder.svg"}
        alt={alt || ""}
        width={800}
        height={500}
        className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 object-cover"
        {...props}
      />
    )

    return (
      <>
        {/* This comment forces a line break in MDX */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="my-8"
        >
          <figure>
            <ImageComponent />
            {alt && <figcaption className="text-center text-sm text-gray-500 mt-2">{alt}</figcaption>}
          </figure>
        </motion.div>
        {/* This comment forces a line break in MDX */}
      </>
    )
  },
  a: ({ href, children }) => (
    <Link href={href || "#"} className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200">
      {children}
    </Link>
  ),
  Tip: ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-lg my-8 border-l-4 border-green-500 shadow-md"
    >
      <div className="flex items-center gap-3">
        <Lightbulb className="w-6 h-6 text-green-500" />
        <span className="font-semibold text-green-700">Tip:</span>
      </div>
      <div className="mt-2 text-green-700">{children}</div>
    </motion.div>
  ),
  Highlight: ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg my-8 shadow-md border-t-4 border-purple-500"
    >
      <div className="text-purple-800">{children}</div>
    </motion.div>
  ),
}

// Main component
const BlogPost: React.FC = () => {
  const { slug } = useParams() as { slug: string }
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const [recentPosts] = useState<BlogLink[]>([])
  const router = useRouter()

  const handleScroll = useCallback((): void => {
    setIsScrolled(window.scrollY > 100)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const fetchPost = async (): Promise<void> => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/blog-posts/${slug}`)
        if (!res.ok) throw new Error("Failed to fetch post")
        const data = await res.json()
        setPost(data)
      } catch (err) {
        setError("An error occurred while fetching the post")
        console.error("Error fetching post:", err)
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  const handleShare = useCallback(async (): Promise<void> => {
    try {
      if (navigator.share && post) {
        await navigator.share({
          title: post.frontmatter.title,
          text: post.frontmatter.excerpt,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert("Link copied to clipboard!")
      }
    } catch (err) {
      console.error("Error sharing:", err)
    }
  }, [post])

  const toggleFullScreen = useCallback(async (): Promise<void> => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
        setIsFullScreen(true)
      } else if (document.exitFullscreen) {
        await document.exitFullscreen()
        setIsFullScreen(false)
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err)
    }
  }, [])

  const handleNavigation = useCallback(
    (href: string) => {
      // Check if the href is for the home page
      if (href === '/') {
        router.push(href);
      } else {
        // For other pages, navigate to the home page with the hash fragment
        router.push(`/#${href.substring(1)}`);
      }
    },
    [router]
  );

  const scrollToSection = useCallback((hash: string) => {
    const targetElement = document.getElementById(hash)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const hash = window.location.hash.substring(1)
        setTimeout(() => scrollToSection(hash), 0)
      }
    }

    handleHashChange() // Handle initial load
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [scrollToSection])

  useEffect(() => {
    // This effect runs after the component mounts or updates
    if (window.location.hash) {
      const id = window.location.hash.substring(1) // Remove the '#' character
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  useEffect(() => {
    //This is removed because of the new useEffect above
    // const scrollTarget = localStorage.getItem("scrollTarget")
    // if (scrollTarget) {
    //   const element = document.getElementById(scrollTarget)
    //   if (element) {
    //     setTimeout(() => {
    //       element.scrollIntoView({ behavior: "smooth" })
    //       localStorage.removeItem("scrollTarget")
    //     }, 100)
    //   }
    // }
  }, [])

  if (isLoading) return <LoadingSpinner />
  if (error || !post) return <ErrorState error={error} />

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col ${
        isFullScreen ? "h-screen" : ""
      }`}
    >
      <MetaTags post={post} />
      <Navbar />

      <main className="flex-grow">
        <article className="pt-16 bg-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`relative ${isFullScreen ? "h-[30vh]" : "h-[40vh] md:h-[50vh] lg:h-[60vh]"} w-full`}
          >
            <Image
              src={post.frontmatter.coverImage || "/placeholder.svg"}
              alt={post.frontmatter.title}
              layout="fill"
              objectFit="cover"
              priority
              className="transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
          </motion.div>

          <div className="container mx-auto px-4 py-8 -mt-32 relative z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-12"
            >
              <nav className="flex items-center justify-between mb-8">
                <Link
                  href="/blogs"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Back to Blog
                </Link>

                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    aria-label="Share post"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleFullScreen}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    aria-label="Toggle fullscreen"
                  >
                    <Maximize className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>
              </nav>

              <header className="mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
                >
                  {post.frontmatter.title}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-b border-gray-200 pb-6"
                >
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <time dateTime={post.frontmatter.date}>
                      {new Date(post.frontmatter.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{post.frontmatter.readingTime}</span>
                  </div>
                  {post.frontmatter.views !== undefined && (
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      <span>{post.frontmatter.views} views</span>
                    </div>
                  )}
                </motion.div>
              </header>

              <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-blue-600 hover:prose-a:text-blue-800">
                <MDXRemote {...post.content} components={MDXComponents} />
              </div>
              {/* Add Indonesian SEO Backlinks Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <div className="space-y-8">
                  {/* Main Navigation Links */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Jelajahi Layanan Kami</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        {
                          href: "/services",
                          icon: BookOpen,
                          title: "Layanan",
                          description: "Service AC & Salon Mobil",
                          bgClass: "bg-blue-50",
                          hoverClass: "hover:bg-blue-100",
                          iconBgClass: "bg-blue-500",
                          textClass: "text-blue-900",
                          descClass: "text-blue-600",
                        },
                        {
                          href: "/price-list",
                          icon: DollarSign,
                          title: "Harga",
                          description: "Daftar Harga Layanan",
                          bgClass: "bg-green-50",
                          hoverClass: "hover:bg-green-100",
                          iconBgClass: "bg-green-500",
                          textClass: "text-green-900",
                          descClass: "text-green-600",
                        },
                        {
                          href: "/kelebihan-kami",
                          icon: Award,
                          title: "Keunggulan",
                          description: "Mengapa Memilih Kami",
                          bgClass: "bg-purple-50",
                          hoverClass: "hover:bg-purple-100",
                          iconBgClass: "bg-purple-500",
                          textClass: "text-purple-900",
                          descClass: "text-purple-600",
                        },
                        {
                          href: "/galeri",
                          icon: ImageIcon,
                          title: "Galeri",
                          description: "Portofolio Pekerjaan",
                          bgClass: "bg-orange-50",
                          hoverClass: "hover:bg-orange-100",
                          iconBgClass: "bg-orange-500",
                          textClass: "text-orange-900",
                          descClass: "text-orange-600",
                        },
                        {
                          href: "/ulasan",
                          icon: MessageSquare,
                          title: "Ulasan",
                          description: "Testimoni Pelanggan",
                          bgClass: "bg-pink-50",
                          hoverClass: "hover:bg-pink-100",
                          iconBgClass: "bg-pink-500",
                          textClass: "text-pink-900",
                          descClass: "text-pink-600",
                        },
                        {
                          href: "/contact",
                          icon: PhoneCall,
                          title: "Kontak",
                          description: "Hubungi Kami",
                          bgClass: "bg-red-50",
                          hoverClass: "hover:bg-red-100",
                          iconBgClass: "bg-red-500",
                          textClass: "text-red-900",
                          descClass: "text-red-600",
                        },
                      ].map((item) => (
                        <button
                          key={item.href}
                          onClick={() => handleNavigation(item.href)}
                          className={`group flex items-center p-4 ${item.bgClass} rounded-xl ${item.hoverClass} transition-all duration-300`}
                        >
                          <div
                            className={`flex-shrink-0 w-10 h-10 ${item.iconBgClass} rounded-lg flex items-center justify-center`}
                          >
                            <item.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <p className={`font-medium ${item.textClass}`}>{item.title}</p>
                            <p className={`text-sm ${item.descClass}`}>{item.description}</p>
                          </div>
                          <ArrowRight
                            className={`w-4 h-4 ml-auto ${item.descClass} opacity-0 group-hover:opacity-100 transition-opacity`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Blog Posts */}
                  {recentPosts.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Artikel Terkait</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recentPosts.map((post) => (
                          <Link
                            key={post.url}
                            href={post.url}
                            className="group p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                          >
                            <p className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600">
                              {post.title}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                              {new Date(post.date).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Service Area */}
                  <div className="bg-gray-50 rounded-xl p-4 mt-6">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <p className="text-sm">
                        Jadi tunggu apalagi? Segera kunjungi <strong>Jakarta Intl Denso Cirebon</strong>! Bagi Anda yang
                        berada di sekitar Cirebon, seperti <strong>Indramayu</strong>, <strong>Majalengka</strong>, dan
                        seluruh kecamatan di Cirebon, silakan datang ke lokasi kami. Konsultasikan dan service mobil
                        Anda di tempat terbaik untuk perawatan <strong>AC mobil</strong> dan layanan perawatan mobil
                        lainnya. Kami spesialis AC mobil dan siap memberikan solusi terbaik untuk kendaraan Anda!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-12 pt-6 border-t border-gray-200"
                >
                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </article>
      </main>

      {/* Floating Share Button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Share post"
            >
              <Share2 className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      <Suspense fallback={null}>
        <WhatsAppButton />
        <Analytics />
      </Suspense>
    </div>
  )
}

export default BlogPost

