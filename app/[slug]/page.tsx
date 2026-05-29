import { notFound } from "next/navigation"
import { getAllPages, getPageBySlug } from "@/lib/mdx"
import { compileMDX } from "@/lib/mdx-compile"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const pages = getAllPages()
  return pages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getPageBySlug(slug)

  if (!page) {
    return { title: "Page Not Found" }
  }

  return {
    title: page.title,
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  const Content = await compileMDX(page.content)

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-heading mb-4">
          {page.title}
        </h1>
      </header>

      <div className="prose">
        <Content />
      </div>
    </article>
  )
}
