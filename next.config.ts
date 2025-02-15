import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Enable React Strict Mode for highlighting potential issues
  reactStrictMode: true,

  // Internationalization settings
  i18n: {
    locales: ["id"], // Bahasa Indonesia
    defaultLocale: "id",
  },

  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jakartaintldenso.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 24 hours
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Experimental features - updated for Next.js 15
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "date-fns",
      "lodash",
      "@hookform/resolvers",
      "framer-motion",
    ],
    serverActions: {
      bodySizeLimit: "2mb", // Increase limit for form submissions
    },
  },

  // Custom headers optimized for SEO and reduced security constraints
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" }, // Allow embedding in other sites
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" }, // Better for SEO
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Removed overly strict Permissions-Policy
          // Removed X-XSS-Protection as it's deprecated in modern browsers
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Content-Type", value: "application/xml" }, // Proper content type for sitemaps
          { key: "Cache-Control", value: "public, max-age=3600" }, // Cache for 1 hour, better for crawlers
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: "/services",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/price-list",
        destination: "/#price-list",
        permanent: true,
      },
      {
        source: "/kelebihan-kami",
        destination: "/#kelebihan-kami",
        permanent: true,
      },
      {
        source: "/galeri",
        destination: "/#galeri",
        permanent: true,
      },
      {
        source: "/ulasan",
        destination: "/#ulasan",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/#BlogPreview",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/#contact",
        permanent: true,
      },
    ]
  },

  // Fixed rewrites for sitemap handling and hash fragment support
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      // Handle Instagram UTM parameters without redirecting
      {
        source: "/:path*",
        has: [{ type: "query", key: "utm_source" }],
        destination: "/:path*",
      },
      // Handle hash fragments for home page
      {
        source: "/#:hash",
        destination: "/?hash=:hash",
      },
    ]
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: "https://jakartaintldenso.com",
  },

  // Add Webpack configuration for better performance
  webpack: (config, { dev, isServer }) => {
    // Only run in production and on client-side
    if (!dev && !isServer) {
      // Enable tree-shaking and code splitting
      config.optimization.splitChunks.chunks = "all"

      // Use Terser for better minification
      config.optimization.minimize = true
    }

    return config
  },
}

export default nextConfig

