module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    backendUrl: process.env.BACKEND_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/:path*'
      }
    ]
  },
  images: {
    domains: ['localhost'],
  },
}
