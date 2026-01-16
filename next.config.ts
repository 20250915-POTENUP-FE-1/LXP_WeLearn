import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 이미지 도메인 설정 (remotePatterns 사용)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // 필요에 따라 2mb, 5mb, 50mb 등 가능
    },
  },
}

export default nextConfig
