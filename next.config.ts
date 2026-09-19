import type { NextConfig } from "next";

// Static export: the site is plain HTML/CSS/JS and can be hosted on any
// web server (Hostinger, cPanel, Vercel, Netlify, S3...).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
