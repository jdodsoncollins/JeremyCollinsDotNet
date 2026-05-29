import RSS from "rss"
import { getAllPosts } from "@/lib/mdx"

export async function GET() {
  const posts = getAllPosts()

  const feed = new RSS({
    title: "JeremyCollins.net",
    description: "Jeremy Collins' web presence",
    site_url: "https://jeremycollins.net",
    feed_url: "https://jeremycollins.net/rss.xml",
    language: "en",
    pubDate: new Date(),
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://jeremycollins.net/blog/${post.slug}`,
      date: new Date(post.date),
      categories: post.tags,
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
    },
  })
}
