import { getAllPosts, getAllPages } from "@/lib/mdx"

export async function GET() {
  const posts = getAllPosts()
  const pages = getAllPages()

  const baseUrl = "https://jeremycollins.net"

  const staticPages = [
    { url: "/", lastmod: new Date().toISOString(), priority: 1.0 },
    { url: "/blog", lastmod: new Date().toISOString(), priority: 0.8 },
  ]

  const postUrls = posts.map((post) => ({
    url: `/blog/${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
    priority: 0.7,
  }))

  const pageUrls = pages.map((page) => ({
    url: `/${page.slug}`,
    lastmod: new Date().toISOString(),
    priority: 0.6,
  }))

  const allUrls = [...staticPages, ...postUrls, ...pageUrls]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    ({ url, lastmod, priority }) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
    },
  })
}
