/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/placeholder/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Allow cross-origin requests in development from network IPs
  allowedDevOrigins: [
    '192.168.1.183',
    '192.168.*.*',
    '10.*.*.*',
    '172.16.*.*',
    '172.17.*.*',
    '172.18.*.*',
    '172.19.*.*',
    '172.20.*.*',
    '172.21.*.*',
    '172.22.*.*',
    '172.23.*.*',
    '172.24.*.*',
    '172.25.*.*',
    '172.26.*.*',
    '172.27.*.*',
    '172.28.*.*',
    '172.29.*.*',
    '172.30.*.*',
    '172.31.*.*'
  ],
  async rewrites() {
    return [
      {
        source: '/campaign/:slug',
  destination: '/campaign/[id]',
      },
    ];
  },
};

module.exports = nextConfig;