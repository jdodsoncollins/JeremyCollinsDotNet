import Link from "next/link"
import { getAllPosts } from "@/lib/mdx"
import { format } from "date-fns"

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5)

  return (
    <div>
      {/* Hero Section */}
      <section className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-heading mb-4">
          Hi, I&apos;m Jeremy
        </h2>
        <p className="text-lg md:text-xl text-foreground mb-2">
          A dad, cat person, and forever a script kiddie.
        </p>
        <p className="text-lg md:text-xl text-foreground">
          Also a software developer using primarily{" "}
          <span className="inline-block">
            <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-1 rounded">
              JavaScript
            </span>
          </span>
          ,{" "}
          <span className="inline-block">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-1 rounded">
              Ruby
            </span>
          </span>
          , and{" "}
          <span className="inline-block">
            <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-1 rounded">
              Swift
            </span>
          </span>
          .
        </p>
      </section>

      {/* Contact/Accounts Section */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold text-heading mb-4">
          You May Also Find Me Via...
        </h3>
        <ul className="space-y-2 text-foreground">
          <li>
            <a
              href="mailto:jeremy@jeremycollins.net"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              Email
            </a>{" "}
            -- I do actually check email.
          </li>
          <li>
            <a
              href="https://github.com/jdodsoncollins"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              GitHub
            </a>{" "}
            -- Though please bear in mind most work of mine is closed-source.
          </li>
          <li>
            <a
              href="https://twitter.com/jollins"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              Twitter
            </a>{" "}
            -- I rarely tweet but use my long follow list as a news/commentary feed, as well as a surprisingly good developer learning resource.
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/jeremy-collins-37807911/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              LinkedIn
            </a>{" "}
            -- Kept up to date; consider this my online resume.
          </li>
          <li>
            <a
              href="https://www.goodreads.com/user/show/25277306-jeremy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              Goodreads
            </a>{" "}
            -- These are my recent audiobook listens mostly.
          </li>
        </ul>
      </section>

      {/* Latest Posts Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-heading">Latest Posts</h3>
          <Link
            href="/blog"
            className="text-accent hover:text-accent/80 transition-colors text-sm"
          >
            Read all posts
          </Link>
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <h4 className="text-lg font-medium text-heading group-hover:text-accent transition-colors">
                  {post.title}
                </h4>
                <time className="text-sm text-secondary">
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
