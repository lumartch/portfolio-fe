/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig

const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;
const API_PATH = '/api/v1/:path*';
module.exports = {
  async rewrites() {
    return [
      {
        source: API_PATH,
        destination: `${SERVER_URI}${API_PATH}`,
      },
    ]
  },
}