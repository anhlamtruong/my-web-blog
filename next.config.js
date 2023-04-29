/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.pixabay.com",
      "lh3.googleusercontent.com",
      "media.graphassets.com",
    ],
  },
  env: {
    NEXTAUTH_URL: "http://localhost:3000",
  },
};

module.exports = nextConfig;
