import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Define types for frontmatter content
type Frontmatter = Record<string, string>;

// Simple function to extract frontmatter from markdown
async function extractFrontmatter(content: string): Promise<Frontmatter> {
  try {
    const match = /^---\n([\s\S]*?)\n---/.exec(content);
    if (!match) return {};
    
    const frontmatterBlock = match[1];
    const frontmatter: Frontmatter = {};
    
    frontmatterBlock.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        const value = valueParts.join(':').trim();
        // Remove quotes if they exist
        frontmatter[key.trim()] = value.replace(/^['"](.*)['"]$/, '$1');
      }
    });
    
    return frontmatter;
  } catch (error) {
    console.error("Error parsing frontmatter:", error);
    return {};
  }
}

interface PageInfo {
  url: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
  featuredImage?: string;
  hasImages?: boolean;
}

export async function GET(): Promise<NextResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jakartaintldenso.com";

    // Static pages with more detailed configuration
    const staticPages: PageInfo[] = [
      { url: "/", priority: "1.0", changefreq: "daily", lastmod: new Date().toISOString().split('T')[0] },
      { url: "/services", priority: "0.9", changefreq: "weekly", lastmod: "2024-02-01" },
      { url: "/price-list", priority: "0.8", changefreq: "weekly", lastmod: "2024-02-01" },
      { url: "/kelebihan-kami", priority: "0.8", changefreq: "weekly", lastmod: "2024-01-15" },
      { url: "/galeri", priority: "0.7", changefreq: "monthly", lastmod: "2024-01-10", hasImages: true },
      { url: "/ulasan", priority: "0.7", changefreq: "monthly", lastmod: "2024-01-05" },
      { url: "/contact", priority: "0.9", changefreq: "weekly", lastmod: "2024-01-01" },
      { url: "/blogs", priority: "0.8", changefreq: "daily", lastmod: new Date().toISOString().split('T')[0] },
    ];

    // Get blog posts with error handling
    const contentDirectory = path.join(process.cwd(), "content");
    let files: string[] = [];
    try {
      files = await fs.readdir(contentDirectory);
    } catch (error) {
      console.error("Error reading content directory:", error);
      // Continue with just static pages if content directory cannot be read
    }

    // Process blog posts with metadata extraction
    const blogPosts: PageInfo[] = await Promise.all(
      files
        .filter((file) => file.endsWith(".md"))
        .map(async (file) => {
          const filePath = path.join(contentDirectory, file);
          const slug = file.replace(".md", "");
          
          try {
            // Get file stats for last modification date
            const stats = await fs.stat(filePath);
            const lastmod = stats.mtime.toISOString().split('T')[0];
            
            // Try to parse frontmatter for additional metadata
            let featuredImage: string | undefined = undefined;
            try {
              const content = await fs.readFile(filePath, 'utf8');
              const frontmatter = await extractFrontmatter(content);
              featuredImage = frontmatter.featuredImage;
            } catch {
              // Silently fail if we can't parse frontmatter
            }

            return {
              url: `/blogs/${slug}`,
              priority: "0.7",
              changefreq: "weekly",
              lastmod,
              ...(featuredImage && { featuredImage }),
            };
          } catch (error) {
            console.error(`Error processing blog post ${file}:`, error);
            // Return basic info if we can't get detailed metadata
            return {
              url: `/blogs/${slug}`,
              priority: "0.7",
              changefreq: "weekly",
            };
          }
        })
    );

    // Combine static pages and blog posts
    const allPages: PageInfo[] = [...staticPages, ...blogPosts];

    // Generate sitemap XML with image support
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    ${page.featuredImage ? `
    <image:image>
      <image:loc>${baseUrl}${page.featuredImage}</image:loc>
    </image:image>` : ''}
    ${page.hasImages ? `
    <image:image>
      <image:loc>${baseUrl}${page.url}/gallery-preview.jpg</image:loc>
    </image:image>` : ''}
  </url>`
    )
    .join("")}
</urlset>`;

    // Add caching headers
    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    
    // Return a minimal valid sitemap in case of error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jakartaintldenso.com/</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
</urlset>`;
    
    return new NextResponse(fallbackSitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
      status: 500,
    });
  }
}