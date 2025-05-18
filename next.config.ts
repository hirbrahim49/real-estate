import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['picsum.photos', 'res.cloudinary.com'],
  },
  env: {
    // Google Sheets
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_SPREADSHEET_ID: process.env.GOOGLE_SPREADSHEET_ID,
    
    // Cloudinary
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  },
  async rewrites() {
    return process.env.NODE_ENV === 'development'
      ? [{
          source: '/api/:path*',
          destination: 'http://localhost:3001/api/:path*',
        }]
      : [];
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'hostelhub-seven.vercel.app',
        'hostelhub.shop',
        'https://hostelhub-seven.vercel.app',
        'https://hostelhub.shop'
      ],
    },
  },
  // Optional: If using ISR (Incremental Static Regeneration)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig;