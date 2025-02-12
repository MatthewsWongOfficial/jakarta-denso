import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Content-Type",
            value: "image/x-icon",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400, immutable",
          },
        ],
      },
      {
        source: "/site.webmanifest",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
        permanent: true,
      },
      // Section redirects
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
        source: "/contact",
        destination: "/#contact",
        permanent: true,
      },
    ];
  },

  // Fixed rewrites with correct interface
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: []
    };
  },
};

export default nextConfig;