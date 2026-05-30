export function AboutSection() {
  const roles = [
    { period: "2021 - present", company: "Webflow", title: "Sr. Software Engineer" },
    { period: "2019 - 2021", company: "MasterClass", title: "Software Engineer" },
    { period: "2017 - 2019", company: "HitRecord", title: "Software Engineer" },
    { period: "2015 - 2017", company: "Event Farm", title: "Front-End Engineer" },
  ];

  return (
    <section id="about" className="py-20 border-t border-border/50">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section label */}
        <div className="mb-10 hacf-streak">
          <span className="font-mono text-xs text-neon-cyan tracking-[0.25em] uppercase">
            About
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3">
            <span className="text-foreground hacf-flare">Who I</span>{" "}
            <span
              className="hacf-flare"
              style={{
                WebkitTextStroke: "1px #ff6688",
                color: "transparent",
              }}
            >
              Am
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bio */}
          <div className="space-y-4 font-mono text-sm text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a product engineer with a full-stack background and a
              strong lean toward the front end. I enjoy working at the
              intersection of design and engineering, writing the kind of code
              that shapes what a product feels like to use.
            </p>
            <p>
              I care about the craft: performance, accessibility, and the small
              details that make interfaces feel responsive and alive. I like
              working on teams where product thinking and technical depth go
              hand in hand.
            </p>
            <p>
              Outside of work I build iOS apps. Codable is a Safari extension
              that brings web developer tools (element inspector, console, and
              more) to mobile browsers.
            </p>
          </div>

          {/* Timeline */}
          <div>
            <p className="font-mono text-xs text-primary tracking-[0.2em] uppercase mb-6">
              Experience
            </p>
            <ol className="space-y-5">
              {roles.map((role, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                    {i < roles.length - 1 && (
                      <span className="flex-1 w-px bg-border/50 mt-2" />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="font-mono text-[10px] text-muted-foreground/50 tracking-wider uppercase mb-0.5">
                      {role.period}
                    </p>
                    <p className="font-display text-sm font-bold text-foreground">
                      {role.company}
                    </p>
                    <p className="font-mono text-xs text-neon-cyan mt-0.5">
                      {role.title}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mt-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
