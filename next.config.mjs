/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "heucweqplwpswrlbexez.supabase.co",
      },
    ],
  },
};

export default nextConfig;
