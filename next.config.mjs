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
  serverExternalPackages: [],
  experimental: {
  },
  transpilePackages: [
    '@portabletext/plugin-markdown-shortcuts',
    '@portabletext/plugin-character-pair-decorator',
    '@portabletext/plugin-input-rule',
    '@portabletext/plugin-one-line',
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
}

export default nextConfig