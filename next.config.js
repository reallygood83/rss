/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: [],
  },
  trailingSlash: false,
  output: 'export',
  distDir: 'out',
};

export default nextConfig;