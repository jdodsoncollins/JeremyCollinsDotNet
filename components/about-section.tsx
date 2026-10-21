import Link from "next/link";
import { AppArrow } from "@/components/app-icons";
import styles from "@/app/home.module.css";

const roles = [
  {
    period: "2022 — present",
    company: "Webflow",
    title: "Sr. Software Engineer",
  },
  { period: "2022", company: "MasterClass", title: "Software Engineer" },
  { period: "2019 — 2022", company: "HitRecord", title: "Senior Developer" },
  { period: "2018", company: "Plink", title: "Software Engineer" },
  { period: "2015 — 2018", company: "Event Farm", title: "Front-End Engineer" },
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
          engineering better.
        </p>
        <p>
          These days I spend a lot of time with agents and automation, so I can
          take on bigger systems without doing every step by hand.
        </p>
        <p>
          I try a lot of new tools. The web still matters to me as an open
          platform with portable standards and room for independent software.
        </p>
        <p>
          Outside of work, I hike, parent, read a lot, and build other apps and
          sites.
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
                <h3>{role.company}</h3>
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
