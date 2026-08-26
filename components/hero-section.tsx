import { ModernDesktopIcons } from "@/components/circuit-background";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-start md:items-center pt-32 md:pt-20">
      <ModernDesktopIcons />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-20 w-full">
        <h1 className="font-display font-bold leading-[0.92] mb-10 text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground">
          Jeremy
          <span className="block">Collins</span>
        </h1>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View projects
            <span className="opacity-60">→</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-16">
          <a
            href="mailto:jeremy@jeremycollins.net"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            Email
          </a>
          <a
            href="https://github.com/jdodsoncollins"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/jeremycollinsnet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
