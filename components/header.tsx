import Link from "next/link";
import { EraLogo } from "@/components/era-logo";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <nav
        className="max-w-5xl mx-auto px-6 py-3 md:py-4 flex flex-wrap items-center gap-x-4 gap-y-3"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          className="shrink-0 hover:opacity-80 transition-opacity"
          aria-label="Jeremy Collins home"
        >
          <EraLogo />
        </Link>
        <ThemeSwitcher />
        <div className="ml-auto flex items-center gap-3 sm:gap-4 md:gap-6">
          <a
            href="/#projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Projects
          </a>
          <Link
            href="/resume"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Resume
          </Link>
          <a
            href="https://github.com/jdodsoncollins"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:jeremy@jeremycollins.net"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
