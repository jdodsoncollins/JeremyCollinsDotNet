"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
]

const externalLinks = [
  { name: "Github", href: "https://github.com/jdodsoncollins" },
]

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  return (
    <header className="mb-12">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-heading no-underline hover:opacity-80 transition-opacity"
          aria-label="JeremyCollins.net - Back to home"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className={`w-12 h-12 ${mounted && isDark ? "invert" : ""}`}
            priority
          />
          <h1 className="text-xl md:text-2xl font-normal text-heading m-0">
            JeremyCollins.net
          </h1>
        </Link>

        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          {mounted && (isDark ? (
            <Sun className="w-5 h-5 text-secondary" />
          ) : (
            <Moon className="w-5 h-5 text-secondary" />
          ))}
        </button>
      </div>

      <nav className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-b border-border pb-4">
        <div className="flex items-center gap-4 md:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-secondary hover:text-heading transition-colors text-sm md:text-base"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {externalLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-heading transition-colors text-sm md:text-base"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
