"use client"

import { useEffect, useState, Suspense } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Calendar, Clock, ChevronLeft } from "lucide-react"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import Link from "next/link"
import dynamic from "next/dynamic"

const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false })
const Footer = dynamic(() => import("../components/Footer"), { ssr: false })
const WhatsAppButton = dynamic(() => import("../components/WhatsAppButton"), { ssr: false })
const Analytics = dynamic(() => import("@vercel/analytics/react").then((mod) => mod.Analytics), { ssr: false })

interface BlogPost {
  frontmatter: {
    title: string
    date: string
    excerpt: string
    coverImage: string
    category: string
    readingTime: string
  }
  content: MDXRemoteSerializeResult
}

export default function BlogPost() {
  const { slug } = useParams() as { slug: string }
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/blog-posts/${slug}`)
        if (!res.ok) throw new Error("Failed to fetch post")
        const data = await res.json()
        setPost(data)
      } catch {
        setError("An error occurred while fetching the post")
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
            <p className="text-xl text-gray-600">{error || "Post not found"}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <article className="pt-24 bg-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30"></div>
          <div className="relative h-[500px] w-full">
            <Image
              src={post.frontmatter.coverImage || "/placeholder.svg"}
              alt={post.frontmatter.title}
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 py-12 -mt-32 relative z-10">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <Link href="/blogs" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Blog
              </Link>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
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
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.frontmatter.title}
              </h1>

              <div className="prose prose-lg max-w-none">
                <MDXRemote
                  {...post.content}
                  components={{
                    h1: (props) => <h1 {...props} className="text-3xl font-bold mt-8 mb-4" />,
                    h2: (props) => <h2 {...props} className="text-2xl font-semibold mt-6 mb-3" />,
                    h3: (props) => <h3 {...props} className="text-xl font-semibold mt-4 mb-2" />,
                    p: (props) => <p {...props} className="mb-4 leading-relaxed" />,
                    ul: (props) => <ul {...props} className="list-disc pl-6 mb-4" />,
                    ol: (props) => <ol {...props} className="list-decimal pl-6 mb-4" />,
                    li: (props) => <li {...props} className="mb-2" />,
                    blockquote: (props) => (
                      <blockquote {...props} className="border-l-4 border-blue-500 pl-4 italic my-4" />
                    ),
                    code: (props) => <code {...props} className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm" />,
                    pre: (props) => <pre {...props} className="bg-gray-100 rounded p-4 overflow-x-auto my-4" />,
                    img: (props) => (
                      <Image
                        src={props.src || "/placeholder.svg"}
                        alt={props.alt || ""}
                        width={800}
                        height={500}
                        className="rounded-lg shadow-md my-6"
                        loading="lazy"
                      />
                    ),
                    a: (props) => <a {...props} className="text-blue-600 hover:text-blue-800 underline" />,
                    table: (props) => (
                      <div className="overflow-x-auto my-6">
                        <table {...props} className="min-w-full divide-y divide-gray-200" />
                      </div>
                    ),
                    th: (props) => (
                      <th
                        {...props}
                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      />
                    ),
                    td: (props) => <td {...props} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" />,
                  }}
                />
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
      <Analytics />
    </div>
  )
}
