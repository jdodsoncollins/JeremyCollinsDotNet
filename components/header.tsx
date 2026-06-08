import Link from "next/link";
import { EraLogo } from "@/components/era-logo";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60 transition-all duration-300">
      <nav
        className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity"
          aria-label="Jeremy Collins home"
        >
          <EraLogo />
        </Link>
        <ThemeSwitcher />
        <div className="flex items-center gap-4 md:gap-6">
          <a
            href="/#projects"
            className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors tracking-wide"
          >
            Projects
          </a>
          <a
            href="https://github.com/jdodsoncollins"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-neon-magenta transition-colors tracking-wide"
          >
            GitHub
          </a>
          <a
            href="mailto:jeremy@jeremycollins.net"
            className="text-sm text-muted-foreground hover:text-neon-green transition-colors tracking-wide"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
