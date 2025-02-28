import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { LRUCache } from 'lru-cache';

// Cache configuration with increased size and TTL for better performance
const cache = new LRUCache<string, BlogPost>({
  max: 200,
  ttl: 1000 * 60 * 60 * 24, // 24 hours
});

// Zod schemas for runtime type validation
const FrontmatterSchema = z.object({
  title: z.string().default('Blog Post Jakarta Intl Denso Cirebon , Spesialis AC Mobil Cirebon'),
  date: z.string().default(() => new Date().toISOString().split('T')[0]),
  excerpt: z.string().default('Jakarta Intl Denso Cirebon , Tempat Cuci Mobil Terbaik di Cirebon dan Spesialis AC Mobil di Cirebon'),
  coverImage: z.string().default('/images/2022-09-07.avif'),
  category: z.string().default('Automotif Cirebon'),
  author: z.string().default('Tim Jakarta Intl Denso Cirebon'),
  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default(['blog']),
  lastModified: z.string().default(() => new Date().toISOString().split('T')[0]),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  readingTime: z.string().optional(),
  canonical: z.string().optional(),
});

// Types derived from Zod schemas
type Frontmatter = z.infer<typeof FrontmatterSchema>;

interface BlogPost {
  frontmatter: Frontmatter;
  content: MDXRemoteSerializeResult;
  seo: {
    structuredData: string;
    metaTags: {
      title: string;
      description: string;
      ogImage: string;
      ogType: 'article';
      twitterCard: 'summary_large_image';
      canonical: string;
      keywords: string;
      author: string;
      publishedTime: string;
      modifiedTime: string;
    };
  };
}

class BlogError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly code: string = 'BLOG_ERROR'
  ) {
    super(message);
    this.name = 'BlogError';
    Object.setPrototypeOf(this, BlogError.prototype);
  }
}

// Performance optimization: Use a more efficient reading time calculation
const calculateReadingTime = (content: string): string => {
  const WORDS_PER_MINUTE = 200;
  const wordCount = content.split(/\s+/).length;
  return `${Math.ceil(wordCount / WORDS_PER_MINUTE)} min read`;
};

// Memoized structured data generator
const memoizedStructuredData = (() => {
  const structuredDataCache = new Map();
  
  return (frontmatter: Frontmatter, url: string) => {
    const cacheKey = `${url}-${frontmatter.lastModified}`;
    
    if (structuredDataCache.has(cacheKey)) {
      return structuredDataCache.get(cacheKey);
    }
    
    const data = {
      '@context': 'https://schema.org' as const,
      '@type': 'BlogPosting' as const,
      headline: frontmatter.title,
      image: [frontmatter.coverImage],
      datePublished: frontmatter.date,
      dateModified: frontmatter.lastModified,
      author: {
        '@type': 'Person' as const,
        name: frontmatter.author,
      },
      description: frontmatter.excerpt,
      keywords: frontmatter.keywords.join(', '),
      url,
    };
    
    structuredDataCache.set(cacheKey, data);
    return data;
  };
})();

async function getPostFromFile(slug: string, baseUrl: string): Promise<BlogPost> {
  try {
    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-]/g, '');
    const filePath = path.join(process.cwd(), 'content', `${sanitizedSlug}.md`);
    
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    if (!content) {
      throw new BlogError('Empty content', 400, 'EMPTY_CONTENT');
    }

    const canonicalUrl = `${baseUrl}/blogs/${sanitizedSlug}`;

    // Parse and validate frontmatter with additional computed fields
    const parsedFrontmatter = FrontmatterSchema.parse({
      ...data,
      metaTitle: data.metaTitle || data.title,
      metaDescription: data.metaDescription || data.excerpt,
      readingTime: calculateReadingTime(content),
      canonical: canonicalUrl,
    });
    
    const mdxSource = await serialize(content, {
      parseFrontmatter: false,
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
      },
    });

    const structuredData = memoizedStructuredData(parsedFrontmatter, canonicalUrl);

    return {
      frontmatter: parsedFrontmatter,
      content: mdxSource,
      seo: {
        structuredData: JSON.stringify(structuredData),
        metaTags: {
          title: parsedFrontmatter.metaTitle || parsedFrontmatter.title,
          description: parsedFrontmatter.metaDescription || parsedFrontmatter.excerpt,
          ogImage: parsedFrontmatter.coverImage,
          ogType: 'article',
          twitterCard: 'summary_large_image',
          canonical: canonicalUrl,
          keywords: parsedFrontmatter.keywords.join(', '),
          author: parsedFrontmatter.author,
          publishedTime: parsedFrontmatter.date,
          modifiedTime: parsedFrontmatter.lastModified,
        },
      },
    };
  } catch (error) {
    console.error(`Error processing post ${slug}:`, error);
    throw error;
  }
}

// Fixed route handler: Using proper NextJS App Router pattern with async access to params
export async function GET(
  request: NextRequest,
  context: { params: Record<string, string | string[]> }
): Promise<NextResponse> {
  try {
    // Correctly await and access the slug parameter
    const params = context.params;
    const slugParam = params?.slug;
    
    // Handle both string and string[] cases
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    
    if (!slug) {
      throw new BlogError('Invalid slug provided', 400, 'INVALID_SLUG');
    }
    
    const baseUrl = 'https://jakartaintldenso.com';

    // Check cache first for better performance
    const cachedPost = cache.get(slug);
    if (cachedPost) {
      return NextResponse.json(cachedPost, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200',
        },
      });
    }

    const post = await getPostFromFile(slug, baseUrl);
    
    // Store in cache
    cache.set(slug, post);

    return NextResponse.json(post, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    if (error instanceof BlogError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}