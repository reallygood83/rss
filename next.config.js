/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: [],
  },
  async rewrites() {
    return [
      // RSSHub API 경로를 백엔드로 리다이렉트
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      {
        source: '/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  // 빌드시 정적 파일 처리
  output: 'export',
  // 클라이언트 측과 서버 측 모두 빌드
  trailingSlash: false,
};

module.exports = nextConfig;