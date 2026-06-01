export function AboutSection() {
  const roles = [
    { period: "2023 - present", company: "Webflow", title: "Sr. Software Engineer" },
    { period: "2022", company: "MasterClass", title: "Software Engineer" },
    { period: "2019 - 2022", company: "HitRecord", title: "Software Engineer" },
    { period: "2018", company: "Plink", title: "Software Engineer" },
    { period: "2015 - 2018", company: "Event Farm", title: "Front-End Engineer" },
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
            <span
              className="hacf-flare"
              style={{
                WebkitTextStroke: "1px #ff6688",
                color: "transparent",
              }}
            >
              Who I am
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bio */}
          <div className="space-y-4 font-mono text-sm text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a product engineer with a full-stack background. I like
              working on products where understanding the business and market
              makes the engineering work better.
            </p>
            <p>
              My current focus is using agentic tooling and automation to build
              larger, more complex systems with less manual overhead. I care
              about the craft, but I also care about changing the way the work
              gets done.
            </p>
            <p>
              I follow industry shifts closely and try a lot of new products,
              tools, and workflows. The web still matters to me as an open
              platform with portable standards and room for independent
              software.
            </p>
            <p>
              Outside of work I build iOS apps. Codable brings web developer
              tools to mobile Safari. It has no monetization or tracking. I
              published it because I think these tools should exist on mobile
              devices.
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
