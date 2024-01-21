/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'i.ytimg.com',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
