export function AboutSection() {
  const roles = [
    { period: "2022 - present", company: "Webflow", title: "Sr. Software Engineer" },
    { period: "2022", company: "MasterClass", title: "Software Engineer" },
    { period: "2019 - 2022", company: "HitRecord", title: "Senior Developer" },
    { period: "2018", company: "Plink", title: "Software Engineer" },
    { period: "2015 - 2018", company: "Event Farm", title: "Front-End Engineer" },
  ];

  return (
    <section id="about" className="py-20 border-t border-border/50 scroll-mt-32 md:scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">

        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Currently
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>
              I like working on products where knowing the business makes the
              engineering better.
            </p>
            <p>
              These days I spend a lot of time with agents and automation, so I
              can take on bigger systems without doing every step by hand.
            </p>
            <p>
              I try a lot of new tools. The web still matters to me as an open
              platform with portable standards and room for independent
              software.
            </p>
            <p>
              Outside of work I build iOS apps. Codable brings web developer
              tools to mobile Safari. It has no monetization or tracking. I
              published it because I think these tools should exist on a phone.
            </p>
          </div>

          {/* Timeline */}
          <div>
            <p className="text-xs text-muted-foreground mb-6">
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
                    <p className="text-[11px] text-muted-foreground mb-0.5">
                      {role.period}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {role.company}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {role.title}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
