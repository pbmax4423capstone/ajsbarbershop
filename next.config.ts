import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // basePath must match your GitHub repository name exactly.
  // Example: if your repo is github.com/username/ajs-barbershop-web, use '/ajs-barbershop-web'
  // Leave empty string '' if deploying to a root domain (e.g. username.github.io)
  basePath: '/ajsbarbershop',
}

export default nextConfig
