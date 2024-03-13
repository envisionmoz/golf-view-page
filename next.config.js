const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["unsplash.com", "example.com"],
  },
};

module.exports = withNextIntl(nextConfig);
