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
}

export default nextConfig
