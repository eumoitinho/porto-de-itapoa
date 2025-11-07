import { createRequire } from 'module'
const require = createRequire(import.meta.url)

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
  // Forçar uso do webpack para resolver módulos
  experimental: {
    serverComponentsExternalPackages: [],
  },
  transpilePackages: [
    '@portabletext/plugin-markdown-shortcuts',
    '@portabletext/plugin-character-pair-decorator',
    '@portabletext/plugin-input-rule',
    '@portabletext/plugin-one-line',
  ],
  webpack: (config, { isServer }) => {
    // Configurar fallbacks para o cliente
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    
    // Resolver caminhos absolutos para os módulos do React
    const reactPath = require.resolve('react')
    const reactDomPath = require.resolve('react-dom')
    const jsxRuntimePath = require.resolve('react/jsx-runtime')
    const jsxDevRuntimePath = require.resolve('react/jsx-dev-runtime')
    
    // Garantir que os aliases sejam aplicados ANTES de qualquer outra resolução
    // Usar Object.assign para garantir que os aliases sejam aplicados corretamente
    config.resolve.alias = Object.assign({}, config.resolve.alias || {}, {
      react: reactPath,
      'react-dom': reactDomPath,
      'react/jsx-runtime': jsxRuntimePath,
      'react/jsx-dev-runtime': jsxDevRuntimePath,
    })
    
    // Resolver problema do compiler-runtime do React 19
    try {
      config.resolve.alias['react/compiler-runtime'] = require.resolve('react-compiler-runtime')
    } catch (e) {
      try {
        config.resolve.alias['react/compiler-runtime'] = require.resolve('./lib/react-compiler-runtime-stub.js')
      } catch (e2) {
        // Ignorar se não conseguir resolver
      }
    }
    
    // Garantir que o webpack use os aliases corretamente
    config.resolve.fullySpecified = false
    
    return config
  },
}

export default nextConfig