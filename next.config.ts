import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 이미지 도메인 설정 (remotePatterns 사용)
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
