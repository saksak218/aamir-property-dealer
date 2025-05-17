/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: {
          subsets: ["latin"],
          display: "swap",
          fallback: ["system-ui", "sans-serif"],
          adjustFontFallback: true,
          timeout: 10000, // Increase timeout to 10 seconds
        },
      },
    ],
  },
};

module.exports = nextConfig;
