/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "stage.nuxgame.com",
      },
    ],
  },
};

export default nextConfig;
