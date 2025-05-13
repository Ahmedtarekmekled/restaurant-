/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "encrypted-tbn0.gstatic.com",
      "buyfromlebanon.com",
      "placehold.co",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true, // This will bypass the image optimization API completely
  },
};

module.exports = nextConfig;
