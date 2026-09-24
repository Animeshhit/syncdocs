import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[{
      hostname:"https",
      pathname:"res.cloudinary.com",
    }]
  },
  reactCompiler: true,
};

export default nextConfig;
