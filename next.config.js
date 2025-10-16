/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  compiler: {
    removeConsole: false
  },
  images: { unoptimized: true }
};
module.exports = nextConfig;
