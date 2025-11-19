/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Needed for simple local file handling without optimization server
  },
};

export default nextConfig;