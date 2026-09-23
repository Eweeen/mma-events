import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["192.168.1.185"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ufc.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pflmma-prod.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.kswmma.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hexagonemma.fr",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cagewarriors.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.aresfighting.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
