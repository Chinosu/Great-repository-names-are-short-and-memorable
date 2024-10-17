/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://events.chinosu.com/:path*', // Proxy to the API
      },
    ];
  },
};

export default nextConfig;
