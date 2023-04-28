/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: false,
  i18n,
  images: {
    domains: ["fakestoreapi.com", "mdbcdn.b-cdn.net"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
