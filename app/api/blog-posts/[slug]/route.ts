import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { NextRequest, NextResponse } from 'next/server';

// Type Definitions
type BlogPostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: string;
  tags: string[];
  keywords: string[];
  lastModified: string;
  readingTime: string;
  canonical: string;
  metaTitle: string;
  metaDescription: string;
};

type SEOMetaTags = {
  title: string;
  description: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  canonical: string;
  keywords: string;
  author: string;
  publishedTime: string;
  modifiedTime: string;
};

type BlogSEO = {
  structuredData: string;
  metaTags: SEOMetaTags;
};

type BlogPost = {
  frontmatter: BlogPostFrontmatter;
  content: MDXRemoteSerializeResult;
  seo: BlogSEO;
};

type SchemaAuthor = {
  '@type': 'Person';
  name: string;
};

type SchemaBlogPosting = {
  '@context': 'https://schema.org';
  '@type': 'BlogPosting';
  headline: string;
  image: readonly string[];
  datePublished: string;
  dateModified: string;
  author: SchemaAuthor;
  description: string;
  keywords: string;
  url: string;
};

// Utility Functions
const calculateReadingTime = (content: string): string => {
  const WORDS_PER_MINUTE = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return `${minutes} min read`;
};

const generateStructuredData = (
  frontmatter: BlogPostFrontmatter
): SchemaBlogPosting => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: frontmatter.title,
  image: [frontmatter.coverImage],
  datePublished: frontmatter.date,
  dateModified: frontmatter.lastModified,
  author: {
    '@type': 'Person',
    name: frontmatter.author,
  },
  description: frontmatter.excerpt,
  keywords: frontmatter.keywords.join(', '),
  url: frontmatter.canonical,
});

// Custom Error Class
class BlogError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly code: string = 'BLOG_ERROR'
  ) {
    super(message);
    this.name = 'BlogError';
  }
}

// Route Handler
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  try {
    const { slug } = await context.params;

    if (!slug) {
      throw new BlogError('Invalid slug provided', 400, 'INVALID_SLUG');
    }

    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-]/g, '');
    const filePath = path.join(process.cwd(), 'content', `${sanitizedSlug}.md`);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jakartaintldenso.com';

    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      if (!content) {
        throw new BlogError('Empty content', 400, 'EMPTY_CONTENT');
      }

      const defaultDate = new Date().toISOString().split('T')[0];

      const frontmatter: BlogPostFrontmatter = {
        title: String(data.title || 'Untitled Blog Post'),
        date: String(data.date || defaultDate),
        excerpt: String(data.excerpt || 'This is a sample blog post.'),
        coverImage: String(data.coverImage || '/default-cover-image.svg'),
        category: String(data.category || 'General'),
        author: String(data.author || 'Unknown Author'),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        keywords: Array.isArray(data.keywords)
          ? data.keywords.map(String)
          : ['blog'],
        lastModified: String(data.lastModified || defaultDate),
        readingTime: calculateReadingTime(content),
        canonical: `${baseUrl}/blogs/${sanitizedSlug}`,
        metaTitle: String(data.metaTitle || data.title || 'Untitled Blog Post'),
        metaDescription: String(
          data.metaDescription ||
            data.excerpt ||
            'This is a sample blog post.'
        ),
      };

      const mdxSource = await serialize(content);
      const structuredData = generateStructuredData(frontmatter);

      const seo: BlogSEO = {
        structuredData: JSON.stringify(structuredData),
        metaTags: {
          title: frontmatter.metaTitle,
          description: frontmatter.metaDescription,
          ogImage: frontmatter.coverImage,
          ogType: 'article',
          twitterCard: 'summary_large_image',
          canonical: frontmatter.canonical,
          keywords: frontmatter.keywords.join(', '),
          author: frontmatter.author,
          publishedTime: frontmatter.date,
          modifiedTime: frontmatter.lastModified,
        },
      };

      const post: BlogPost = {
        frontmatter,
        content: mdxSource,
        seo,
      };

      return NextResponse.json(post, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
        },
      });
    } catch (error) {
      if (error instanceof BlogError) {
        throw error;
      }
      throw new BlogError(
        'Post not found or could not be processed',
        404,
        'POST_NOT_FOUND'
      );
    }
  } catch (error) {
    const blogError =
      error instanceof BlogError
        ? error
        : new BlogError('Internal Server Error', 500, 'INTERNAL_ERROR');

    console.error(`${blogError.code}: ${blogError.message}`);
    return NextResponse.json(
      {
        error: blogError.message,
        code: blogError.code,
      },
      { status: blogError.statusCode }
    );
  }
}
