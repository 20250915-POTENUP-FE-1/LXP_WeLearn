import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false, // ✅ StrictMode 비활성화

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'minji-test-3rd-lxp1.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'http',
        hostname: 'example.com',
      },
    ],
  },
}

export default nextConfig
