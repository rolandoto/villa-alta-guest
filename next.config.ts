import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/gallery",
        destination: "/galeria",
        permanent: true,
      },
      {
        source: "/book",
        destination: "/contacto",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
