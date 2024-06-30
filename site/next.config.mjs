/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // output: 'standalone'
  output: 'export',
  distDir: 'dist',
  basePath: '/scffld-registry',
};

export default nextConfig;
