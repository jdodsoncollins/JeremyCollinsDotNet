import type { MDXComponents } from "mdx/types"

import Link from "next/link"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-semibold text-heading mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-heading mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-heading mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium text-heading mt-4 mb-2">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base font-medium text-heading mt-4 mb-2">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-sm font-medium uppercase tracking-wide text-heading mt-4 mb-2">{children}</h6>
    ),
    p: ({ children }) => (
      <p className="my-4 leading-relaxed">{children}</p>
    ),
    a: ({ href, children }) => {
      const isExternal = href?.startsWith("http")
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
          >
            {children}
          </a>
        )
      }
      return (
        <Link
          href={href || "#"}
          className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors"
        >
          {children}
        </Link>
      )
    },
    ul: ({ children }) => (
      <ul className="my-4 pl-6 list-disc space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 pl-6 list-decimal space-y-1">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-border pl-4 italic text-secondary my-4">
        {children}
      </blockquote>
    ),
    pre: ({ children }) => (
      <pre className="bg-muted rounded-lg p-4 overflow-x-auto my-4 text-sm">
        {children}
      </pre>
    ),
    code: ({ children, className }) => {
      // Block code (inside pre) vs inline code
      if (className) {
        return <code className={className}>{children}</code>
      }
      return (
        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      )
    },
    img: ({ src, alt }) => {
      if (!src) return null
      // Use standard img for MDX content to avoid path resolution issues
      return (
        <span className="block my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || ""}
            className="rounded-lg max-w-full h-auto"
            loading="lazy"
          />
        </span>
      )
    },
    hr: () => <hr className="border-border my-8" />,
    table: ({ children }) => (
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-border px-3 py-2 text-left bg-muted font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-border px-3 py-2 text-left">{children}</td>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-heading">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    ...components,
  }
}
