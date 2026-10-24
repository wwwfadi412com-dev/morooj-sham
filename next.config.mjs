/**
 * Static export so the site can be hosted on any static host (GitHub Pages
 * now, a paid server/CDN later). NEXT_PUBLIC_BASE_PATH is "/morooj-sham" on
 * GitHub Pages project sites and empty on a custom domain.
 * @type {import('next').NextConfig}
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // No image optimisation server on static hosting; Unsplash URLs already carry w/q params.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
