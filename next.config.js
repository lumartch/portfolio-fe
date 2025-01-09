const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
        pathname: "**",
        port: "",
        protocol: "https",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = withVanillaExtract(nextConfig);

const SERVER_URI = "https://api.lumartch.dev";
const FINANCES_URI = "https://finances.apps.lumartch.dev";
const API_PATH = "/api/v1/:path*";

module.exports = {
  async rewrites() {
    return [
      {
        destination: `${SERVER_URI}${API_PATH}`,
        source: API_PATH,
      },
      {
        destination: `${FINANCES_URI}/:path*`,
        source: "/apps/finances/:path*",
      },
    ];
  },
};
