import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = "https://jakartaintldenso.com"

  // Static pages
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/services", priority: "0.9", changefreq: "weekly" },
    { url: "/price-list", priority: "0.8", changefreq: "weekly" },
    { url: "/kelebihan-kami", priority: "0.8", changefreq: "weekly" },
    { url: "/galeri", priority: "0.7", changefreq: "monthly" },
    { url: "/ulasan", priority: "0.7", changefreq: "monthly" },
    { url: "/contact", priority: "0.9", changefreq: "weekly" },
    { url: "/blogs", priority: "0.8", changefreq: "daily" },
  ]

  // Get blog posts
  const contentDirectory = path.join(process.cwd(), "content")
  const files = await fs.readdir(contentDirectory)
  const blogPosts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      url: `/blogs/${file.replace(".md", "")}`,
      priority: "0.7",
      changefreq: "weekly",
    }))

  // Combine static pages and blog posts
  const allPages = [...staticPages, ...blogPosts]

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>
  `,
    )
    .join("")}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

