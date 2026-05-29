import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const POSTS_PATH = path.join(process.cwd(), "content/posts")
const PAGES_PATH = path.join(process.cwd(), "content/pages")

export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  readingTime: string
}

export interface Post extends PostMeta {
  content: string
}

export interface PageMeta {
  slug: string
  title: string
}

export interface Page extends PageMeta {
  content: string
}

function getExcerpt(content: string, maxLength = 160): string {
  // Remove MDX/JSX components and markdown syntax
  const cleaned = content
    .replace(/<[^>]+>/g, "") // Remove HTML/JSX tags
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Convert links to text
    .replace(/#{1,6}\s+/g, "") // Remove headers
    .replace(/[*_`~]/g, "") // Remove emphasis markers
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim()

  if (cleaned.length <= maxLength) return cleaned
  return cleaned.slice(0, maxLength).trim() + "..."
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_PATH)) {
    return []
  }

  const postDirs = fs.readdirSync(POSTS_PATH)

  const posts = postDirs
    .map((dir) => {
      const filePath = path.join(POSTS_PATH, dir, "index.mdx")
      if (!fs.existsSync(filePath)) return null

      const source = fs.readFileSync(filePath, "utf-8")
      const { data, content } = matter(source)
      const stats = readingTime(content)

      return {
        slug: dir,
        title: data.title || dir,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        tags: data.tags || [],
        excerpt: data.excerpt || getExcerpt(content),
        readingTime: stats.text,
      }
    })
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_PATH, slug, "index.mdx")

  if (!fs.existsSync(filePath)) {
    return null
  }

  const source = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(source)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title || slug,
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    tags: data.tags || [],
    excerpt: data.excerpt || getExcerpt(content),
    readingTime: stats.text,
    content,
  }
}

export function getAllPages(): PageMeta[] {
  if (!fs.existsSync(PAGES_PATH)) {
    return []
  }

  const pageDirs = fs.readdirSync(PAGES_PATH)

  return pageDirs
    .map((dir) => {
      const filePath = path.join(PAGES_PATH, dir, "index.mdx")
      if (!fs.existsSync(filePath)) return null

      const source = fs.readFileSync(filePath, "utf-8")
      const { data } = matter(source)

      return {
        slug: data.slug?.replace(/^\//, "") || dir,
        title: data.title || dir,
      }
    })
    .filter((page): page is PageMeta => page !== null)
}

export function getPageBySlug(slug: string): Page | null {
  if (!fs.existsSync(PAGES_PATH)) {
    return null
  }

  const pageDirs = fs.readdirSync(PAGES_PATH)

  for (const dir of pageDirs) {
    const filePath = path.join(PAGES_PATH, dir, "index.mdx")
    if (!fs.existsSync(filePath)) continue

    const source = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(source)

    const pageSlug = data.slug?.replace(/^\//, "") || dir

    if (pageSlug === slug) {
      return {
        slug: pageSlug,
        title: data.title || dir,
        content,
      }
    }
  }

  return null
}

export function getPostImagePath(slug: string, imageName: string): string {
  return `/content/posts/${slug}/${imageName}`
}

export function getPageImagePath(slug: string, imageName: string): string {
  return `/content/pages/${slug}/${imageName}`
}
