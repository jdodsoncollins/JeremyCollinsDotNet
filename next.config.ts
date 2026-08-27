import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/takt-privacy-policy", destination: "/taktung-privacy-policy", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/projects", destination: "/", permanent: true },
      { source: "/uses", destination: "/", permanent: true },
      { source: "/tags", destination: "/", permanent: true },
      { source: "/tags/:path*", destination: "/", permanent: true },
      { source: "/rss.xml", destination: "/", permanent: true },
      { source: "/offline-plugin-app-shell-fallback", destination: "/", permanent: true },
      { source: "/sitemap/sitemap-index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/sitemap/sitemap-0.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/using-a-raspberry-pi-as-a-nas-mac-os-time-machine", destination: "/", permanent: true },
      { source: "/codable-1-1-update", destination: "/", permanent: true },
      { source: "/codable-1-5-update", destination: "/", permanent: true },
      { source: "/recommended-reading-the-impostors-handbook", destination: "/", permanent: true },
      { source: "/ionic-and-swift-view-demo-i-os-project-published", destination: "/", permanent: true },
      { source: "/now-listed-on-uses-tech", destination: "/", permanent: true },
      { source: "/unable-to-scroll-in-modal-in-safari", destination: "/", permanent: true },
      {
        source: "/%F0%9F%8E%89-codable-web-development-tools-for-i-os-released",
        destination: "/",
        permanent: true,
      },
      {
        source: "/%F0%9F%9A%80-welcome-to-the-new-jeremy-collins-net",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/llms.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
    ];
  },
};

export default nextConfig;
