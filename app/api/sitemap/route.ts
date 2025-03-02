import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Define types
interface Frontmatter {
  [key: string]: string;
}

interface PageInfo {
  url: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
  featuredImage?: string;
  hasImages?: boolean;
}

const GALLERY_IMAGE_PATHS = [
  "/images/og-image.jpg",
  "/images/proses-cuci.jpeg",
  "/images/Poles-Mobil.jpeg",
  "/images/ekterior.jpeg",
  "/images/eksterior2.jpeg",
  "/images/Jok-mobil.jpeg",
  "/images/Parfum-mobil.jpeg",
  "/images/purging.jpeg",
  "/images/velg.jpeg",
  "/images/lokasi-kami.jpeg",
];


// Extract frontmatter from markdown
async function extractFrontmatter(content: string): Promise<Frontmatter> {
  try {
    const match = /^---\n([\s\S]*?)\n---/.exec(content);
    if (!match) return {};

    const frontmatterBlock = match[1];
    const frontmatter: Frontmatter = {};

    frontmatterBlock.split("\n").forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length) {
        const value = valueParts.join(":").trim();
        frontmatter[key.trim()] = value.replace(/^['"](.*)['"]$/, "$1");
      }
    });

    return frontmatter;
  } catch (error) {
    console.error("Error parsing frontmatter:", error);
    return {};
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jakartaintldenso.com";

    const staticPages: PageInfo[] = [
      { url: "/", priority: "1.0", changefreq: "daily", lastmod: new Date().toISOString().split("T")[0] },
      { url: "/#services", priority: "0.9", changefreq: "weekly", lastmod: "2025-02-01" },
      { url: "/#price-list", priority: "0.8", changefreq: "weekly", lastmod: "2025-02-01" },
      { url: "/#kelebihan-kami", priority: "0.8", changefreq: "weekly", lastmod: "2025-02-15" },
      { url: "/#galeri", priority: "0.7", changefreq: "monthly", lastmod: "2025-02-10", hasImages: true },
      { url: "/#ulasan", priority: "0.7", changefreq: "monthly", lastmod: "2025-02-05" },
      { url: "/#BlogPreview", priority: "0.7", changefreq: "monthly", lastmod: "2025-02-05" },
      { url: "/#contact", priority: "0.9", changefreq: "weekly", lastmod: "2025-02-02" },
      { url: "/cuci-mobil-terbaik-cirebon", priority: "0.9", changefreq: "weekly", lastmod: "2025-02-02" },
      { url: "/salon-mobil-terbaik-cirebon", priority: "0.9", changefreq: "weekly", lastmod: "2025-02-02" },
      { url: "/service-ac-dan-mesin-terbaik-cirebon", priority: "0.9", changefreq: "weekly", lastmod: "2025-02-02" },
      { url: "/blogs", priority: "1.0", changefreq: "daily", lastmod: "2025-02-15" },
    ];

    const contentDirectory = path.join(process.cwd(), "content");
    let files: string[] = [];
    try {
      files = await fs.readdir(contentDirectory);
    } catch (error) {
      console.error("Error reading content directory:", error);
    }

    const blogPosts: PageInfo[] = await Promise.all(
      files.filter((file) => file.endsWith(".md")).map(async (file) => {
        const filePath = path.join(contentDirectory, file);
        const slug = file.replace(".md", "");

        try {
          const stats = await fs.stat(filePath);
          const lastmod = stats.mtime.toISOString().split("T")[0];
          let featuredImage: string | undefined = undefined;

          try {
            const content = await fs.readFile(filePath, "utf8");
            const frontmatter = await extractFrontmatter(content);
            featuredImage = frontmatter.featuredImage;
          } catch {}

          return { url: `/blogs/${slug}`, priority: "0.7", changefreq: "weekly", lastmod, ...(featuredImage && { featuredImage }) };
        } catch (error) {
          console.error(`Error processing blog post ${file}:`, error);
          return { url: `/blogs/${slug}`, priority: "0.7", changefreq: "weekly" };
        }
      })
    );

    const allPages: PageInfo[] = [...staticPages, ...blogPosts];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${allPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""}
    ${page.featuredImage ? `
    <image:image>
      <image:loc>${baseUrl}${page.featuredImage}</image:loc>
    </image:image>` : ""}
    ${page.hasImages ? GALLERY_IMAGE_PATHS.map(imgPath => `
    <image:image>
      <image:loc>${baseUrl}${imgPath}</image:loc>
    </image:image>`).join('') : ""}
  </url>`
    )
    .join("")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);

    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jakartaintldenso.com/</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
</urlset>`;

    return new NextResponse(fallbackSitemap, {
      headers: { "Content-Type": "application/xml" },
      status: 500,
    });
  }
}