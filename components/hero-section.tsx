import { HeroCtas } from "@/components/hero-ctas";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-start md:items-center pt-32 md:pt-20">
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 md:py-20 w-full">
        <h1 className="font-display font-bold leading-[0.92] mb-10 text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground">
          Jeremy
          <span className="block">Collins</span>
        </h1>

        <HeroCtas>
          <div className="hero-cta-primary">
            <a
              href="#projects"
              aria-label="View projects"
              className="hero-cta hero-cta-projects inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <span className="hero-cta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="8" height="8" rx="1.7" />
                  <rect x="13" y="3" width="8" height="8" rx="1.7" />
                  <rect x="3" y="13" width="8" height="8" rx="1.7" />
                  <rect x="13" y="13" width="8" height="8" rx="1.7" />
                </svg>
              </span>
              <span className="hero-cta-long">
                View projects
                <span className="hero-cta-arrow opacity-60"> →</span>
              </span>
              <span className="hero-cta-short">Projects</span>
            </a>
          </div>

          <div className="hero-cta-secondary">
            <a
              href="mailto:jeremy@jeremycollins.net"
              aria-label="Email"
              className="hero-cta hero-cta-email inline-flex items-center gap-2 px-4 py-2 border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <span className="hero-cta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
                  <path d="M4.2 7.4 12 13l7.8-5.6" />
                </svg>
              </span>
              <span className="hero-cta-long">Email</span>
              <span className="hero-cta-short">Mail</span>
            </a>
            <a
              href="https://github.com/jdodsoncollins"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta hero-cta-github inline-flex items-center gap-2 px-4 py-2 border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <span className="hero-cta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .3C5.37.3 0 5.67 0 12.3c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.67 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12.01 12.01 0 0 0 24 12.3C24 5.67 18.63.3 12 .3z" />
                </svg>
              </span>
              <span className="hero-cta-long">GitHub</span>
              <span className="hero-cta-short">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/jeremycollinsnet"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta hero-cta-linkedin inline-flex items-center gap-2 px-4 py-2 border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <span className="hero-cta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.54 8.5H4.1V20h2.44V8.5zM5.32 3.5A1.62 1.62 0 1 0 5.33 6.74 1.62 1.62 0 0 0 5.32 3.5zM20 20h-2.43v-5.57c0-1.76-.63-2.96-2.2-2.96-1.2 0-1.91.81-2.23 1.59-.11.28-.14.66-.14 1.05V20H10.56s.04-9.3 0-10.27h2.43v1.46c.32-.5 1.42-1.7 3.47-1.7 2.53 0 4.54 1.66 4.54 5.22V20z" />
                </svg>
              </span>
              <span className="hero-cta-long">LinkedIn</span>
              <span className="hero-cta-short">LinkedIn</span>
            </a>
          </div>
        </HeroCtas>
      </div>
    </section>
  );
}
