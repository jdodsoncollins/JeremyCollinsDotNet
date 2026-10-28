import Link from "next/link";
import { AppArrow } from "@/components/app-icons";
import styles from "@/app/home.module.css";

const roles = [
  {
    period: "2022 — present",
    company: "Webflow",
    title: "Sr. Software Engineer",
    href: "https://webflow.com",
  },
  {
    period: "2022",
    company: "MasterClass",
    title: "Senior Software Engineer",
    href: "https://www.masterclass.com",
  },
  {
    period: "2019 — 2022",
    company: "HitRecord",
    title: "Senior Developer",
    href: "https://hitrecord.org",
  },
  {
    period: "2018",
    company: "Plink",
    title: "Software Engineer",
    href: "https://www.plink.ai",
  },
  {
    period: "2015 — 2018",
    company: "Event Farm",
    title: "Front-End Engineer",
    href: "https://www.eventfarm.com/",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className={styles.about}
      aria-labelledby="about-title"
      data-home-about
    >
      <div className={styles.aboutCopy}>
        <h2 id="about-title">About me</h2>
        <p>
          I like working on products where knowing the business makes the
          engineering better. At Webflow I work on growth, owning experiments
          from rollout plan to analysis, and the work has added up to millions
          in new revenue, from usage-based billing to Webflow's first AI
          features in 2023.
        </p>
        <p>
          These days I spend a lot of time with agents and automation, so I can
          take on bigger systems without doing every step by hand. On the side
          I design, build, and ship my own iOS apps, start to finish.
        </p>
        <p>
          I try a lot of new tools, and the web still matters to me as an open
          platform with portable standards and room for independent software.
          Outside of work, I hike, parent, and read a lot.
        </p>
        <Link href="/resume" className={styles.resumeLink}>
          View my resume <AppArrow />
        </Link>
      </div>
      <div className={styles.experience}>
        <h3 className={styles.experienceTitle}>Experience</h3>
        <ol>
          {roles.map((role) => (
            <li key={role.company} data-home-step>
              <div>
                <h3>
                  {role.href ? (
                    <a
                      href={role.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {role.company}
                    </a>
                  ) : (
                    role.company
                  )}
                </h3>
                <p>{role.title}</p>
              </div>
              <span>{role.period}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
