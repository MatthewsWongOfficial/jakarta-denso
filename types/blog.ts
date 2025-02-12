// types/blog.ts
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface BlogPostFrontmatter {
  title: string
  date: string
  excerpt: string
  coverImage: string
  category: string
  author?: string
  tags?: string[]
  keywords?: string[]
  lastModified?: string
  readingTime?: string
  canonical?: string
  metaTitle?: string
  metaDescription?: string
}

export interface StructuredData {
  "@context": "https://schema.org"
  "@type": "BlogPosting"
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  author: {
    "@type": "Person"
    name: string
  }
  publisher: {
    "@type": "Organization"
    name: string
    logo: {
      "@type": "ImageObject"
      url: string
    }
  }
  mainEntityOfPage: {
    "@type": "WebPage"
    "@id": string
  }
  keywords: string
}

export interface SEOMetaTags {
  title: string
  description: string
  ogImage: string
  canonical: string
  keywords: string
  author: string
}

export interface BlogSEO {
  structuredData: StructuredData
  metaTags: SEOMetaTags
}

export interface BlogPost {
  frontmatter: BlogPostFrontmatter
  content: MDXRemoteSerializeResult
  seo: BlogSEO
}

export interface BlogListItem {
  slug: string
  frontmatter: BlogPostFrontmatter
  seo: BlogSEO
}