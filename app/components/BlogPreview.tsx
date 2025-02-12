"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface BlogPost {
  slug: string
  frontmatter: {
    title: string
    date: string
    excerpt: string
    coverImage: string
    category: string
  }
}

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog-posts")
        if (!res.ok) throw new Error("Failed to fetch posts")
        const data = await res.json()
        setPosts(data.slice(0, 6))
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section id="BlogPreview" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 relative"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight relative z-10 leading-tight">
            Blog <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Terbaru</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full transform transition-all duration-300 hover:scale-110"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative p-[2px] rounded-3xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 blur-xl bg-gradient-to-br from-blue-500/50 to-blue-600/50 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Link href={`/blogs/${post.slug}`} className="block">
                <div className="relative bg-white rounded-3xl overflow-hidden">
                  <div className="aspect-[16/10] sm:aspect-[4/3] relative">
                    <Image
                      src={post.frontmatter.coverImage || "/placeholder.svg"}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent transition-all duration-300 group-hover:from-gray-900/95">
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block px-3 py-1 text-xs sm:text-sm text-blue-400 font-semibold bg-blue-950/30 rounded-full mb-2 backdrop-blur-sm">
                          {post.frontmatter.category}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mb-2 line-clamp-2">
                          {post.frontmatter.title}
                        </h3>
                        <div className="flex items-center text-xs sm:text-sm text-gray-300 mt-2 opacity-90">
                          <Calendar className="h-4 w-4 mr-2" />
                          <time dateTime={post.frontmatter.date}>
                            {new Date(post.frontmatter.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-7 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
          >
            <Link href="/blogs" className="flex items-center gap-2">
              <span>Lihat semua blog kami</span>
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}