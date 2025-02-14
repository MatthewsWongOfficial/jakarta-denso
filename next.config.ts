import type { NextConfig } from "next";
import crypto from "crypto";


const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  output: "standalone",

  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
    turbo: {
      rules: {
        "*.mdx": ["@mdx-js/loader"],
      },
    },
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["https://jakartaintldenso.com"],
    },
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  images: {
    domains: ["jakartaintldenso.com"],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },

  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 10000,
        maxSize: 80000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            chunks: "all",
            name: "framework",
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module: { size: () => number; identifier: () => string }): boolean {
              return module.size() > 40000 && /node_modules[/\\]/.test(module.identifier());
            },
            name(module: { identifier: () => string }): string {
              return `lib-${module
                .identifier()
                .split("/")
                .reduceRight((item) => item)}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: "commons",
            minChunks: 2,
            priority: 20,
          },
          shared: {
            name(module: unknown, chunks: Array<{ name: string }>): string {
              return crypto
                .createHash("sha1")
                .update(chunks.reduce((acc: string, chunk) => acc + chunk.name, ""))
                .digest("hex")
                .substring(0, 8);
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      };

      config.optimization.moduleIds = "deterministic";
      config.optimization.chunkIds = "deterministic";
    }

    return config;
  },

  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-DNS-Prefetch-Control", value: "on" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "X-Robots-Tag", value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
        { key: "Link", value: '<https://jakartaintldenso.com>; rel="canonical"' },
      ],
    },
    {
      source: "/blogs/:slug",
      headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
    },
    {
      source: "/(.*).js",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    },
    {
      source: "/(.*).css",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    },
    {
      source: "/images/(.*)",
      headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
    },
  ],

  redirects: async () => [
    {
      source: "/sitemap.xml",
      destination: "/api/sitemap",
      permanent: true,
    },
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
  ],

  env: {
    NEXT_PUBLIC_APP_URL: "https://jakartaintldenso.com",
  },
  serverExternalPackages: ["sharp", "svgo"],
};

export default nextConfig;