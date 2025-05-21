/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
  output: 'standalone',
  staticPageGenerationTimeout: 120,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  generateStaticParams: async () => {
    return []
  }
}

export default nextConfig
