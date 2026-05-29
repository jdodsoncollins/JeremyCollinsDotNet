import Link from "next/link"
import { getAllPosts } from "@/lib/mdx"
import { format } from "date-fns"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts by Jeremy Collins",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div>
      <h1 className="text-3xl font-bold text-heading mb-8">Blog</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-xl font-medium text-heading group-hover:text-accent transition-colors mb-1">
                {post.title}
              </h2>
              <div className="flex items-center gap-3 text-sm text-secondary mb-2">
                <time>{format(new Date(post.date), "MMMM d, yyyy")}</time>
                <span>&middot;</span>
                <span>{post.readingTime}</span>
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-muted text-secondary px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-secondary">No posts yet.</p>
      )}
    </div>
  )
}
