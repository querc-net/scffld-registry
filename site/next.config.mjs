/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // output: 'standalone'
  output: 'export',
  distDir: 'dist',
};

export default nextConfig;
