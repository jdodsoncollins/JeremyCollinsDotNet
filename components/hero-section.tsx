export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Terminal-style intro */}
        <div className="mb-8">
          <span className="text-neon-green font-mono text-sm tracking-wider">
            {">"} init_portfolio.exe
          </span>
        </div>

        {/* Name with Y2K styling */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="text-foreground">Jeremy</span>
          <br />
          <span className="text-neon-green neon-glow">Collins</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
          <span className="text-neon-cyan">Full-stack developer</span> with a
          front-end focus. Building for the{" "}
          <span className="text-neon-magenta">open web</span>.
        </p>

        {/* Divider line */}
        <div className="w-32 h-px bg-gradient-to-r from-neon-green via-neon-cyan to-transparent mb-8" />

        {/* Bio content */}
        <div className="space-y-4 text-muted-foreground max-w-2xl">
          <p className="leading-relaxed">
            I&apos;m a{" "}
            <span className="text-foreground">Product Engineer</span> who
            enjoys working at the intersection of design and code. I believe in
            the open web as an essential platform—agnostic of ecosystems, built
            on open standards.
          </p>
          <p className="leading-relaxed">
            Currently focused on{" "}
            <span className="text-neon-cyan">front-end development</span> and{" "}
            <span className="text-neon-green">growth engineering</span>,
            applying domain knowledge to guide what I help build.
          </p>
        </div>

        {/* Experience highlights */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <h2 className="font-mono text-sm text-neon-green mb-6 tracking-wider">
            {"// PREVIOUS_WORK"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Webflow", "MasterClass", "HitRecord", "Event Farm"].map(
              (company) => (
                <div
                  key={company}
                  className="px-4 py-3 border border-border/50 bg-card/50 text-sm text-center hover:border-neon-green/50 hover:bg-card transition-all"
                >
                  {company}
                </div>
              )
            )}
          </div>
        </div>

        {/* Contact links */}
        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="mailto:jeremy@jeremycollins.net"
            className="inline-flex items-center gap-2 px-6 py-3 border border-neon-green text-neon-green hover:bg-neon-green/10 transition-all font-mono text-sm tracking-wide"
          >
            <span>{">"}</span> Contact
          </a>
          <a
            href="https://github.com/jdodsoncollins"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-muted-foreground hover:border-neon-cyan hover:text-neon-cyan transition-all font-mono text-sm tracking-wide"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/jeremycollinsnet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-muted-foreground hover:border-neon-magenta hover:text-neon-magenta transition-all font-mono text-sm tracking-wide"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
