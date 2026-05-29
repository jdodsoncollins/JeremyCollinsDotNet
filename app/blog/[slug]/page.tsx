import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/mdx"
import { format } from "date-fns"
import { compileMDX } from "@/lib/mdx-compile"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const Content = await compileMDX(post.content)

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-heading mb-4 text-balance">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-secondary">
          <time>{format(new Date(post.date), "MMMM d, yyyy")}</time>
          <span>&middot;</span>
          <span>{post.readingTime}</span>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
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
      </header>

      <div className="prose">
        <Content />
      </div>
    </article>
  )
}
