import type { MetadataRoute } from "next";

const allowAll = {
  allow: "/",
};

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...allowAll },
      { userAgent: "GPTBot", ...allowAll },
      { userAgent: "Google-Extended", ...allowAll },
      { userAgent: "ClaudeBot", ...allowAll },
      { userAgent: "PerplexityBot", ...allowAll },
      { userAgent: "Applebot-Extended", ...allowAll },
    ],
    sitemap: "https://jeremycollins.net/sitemap.xml",
    host: "https://jeremycollins.net",
  };
}
