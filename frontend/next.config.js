/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true
  }
};

export default nextConfig;