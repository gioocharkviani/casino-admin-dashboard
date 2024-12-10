/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "stage.nuxgame.com",
        hostname: "fungamess.games",
      },
    ],
  },
};

export default nextConfig;
