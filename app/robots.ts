import type { MetadataRoute } from "next";

const publicRules = {
  allow: "/",
  disallow: ["/oauth", "/mobileflow-callback", "/mobileflow-token"],
};

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...publicRules },
      { userAgent: "GPTBot", ...publicRules },
      { userAgent: "OAI-SearchBot", ...publicRules },
      { userAgent: "ChatGPT-User", ...publicRules },
      { userAgent: "Google-Extended", ...publicRules },
      { userAgent: "Google-CloudVertexBot", ...publicRules },
      { userAgent: "ClaudeBot", ...publicRules },
      { userAgent: "Claude-SearchBot", ...publicRules },
      { userAgent: "Claude-User", ...publicRules },
      { userAgent: "anthropic-ai", ...publicRules },
      { userAgent: "PerplexityBot", ...publicRules },
      { userAgent: "Perplexity-User", ...publicRules },
      { userAgent: "Applebot-Extended", ...publicRules },
      { userAgent: "Amazonbot", ...publicRules },
      { userAgent: "CCBot", ...publicRules },
      { userAgent: "Bytespider", ...publicRules },
    ],
    sitemap: "https://jeremycollins.net/sitemap.xml",
    host: "https://jeremycollins.net",
  };
}
