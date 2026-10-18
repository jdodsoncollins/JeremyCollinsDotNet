import Image from "next/image";
import Link from "next/link";
import { APP_PRODUCTS } from "@/lib/app-products";
import { AppArrow } from "@/components/app-icons";
import { CatTracks } from "@/components/home-doodles";
import styles from "@/app/home.module.css";

const projects = [
  { app: APP_PRODUCTS.codable, kind: "codable", title: "Safari developer tools", description: "Inspect HTML, edit CSS, run JavaScript, and follow network requests. A web toolkit for iPhone and iPad.", features: ["Elements & styles", "JavaScript console", "Responsive testing"], shots: [0, 1] },
  { app: APP_PRODUCTS.taktung, kind: "taktung", title: "Your Vercel projects, on iOS", description: "Check production status, read build logs, and compare deployments. Keep your sites close, wherever you are.", features: ["Deployment status", "Visual comparisons", "Home Screen widgets"], shots: [0, 2] },
] as const;

export function ProjectsSection() {
  return (
    <section id="projects" className={styles.projects} aria-labelledby="apps-title">
      <div className={styles.sectionHeading}>
        <div><h2 id="apps-title">Side projects</h2></div>
        <CatTracks />
      </div>
      <div className={styles.projectList}>
        {projects.map(({ app, kind, title, description, features, shots }) => (
          <article key={app.name} className={styles.project + " " + (kind === "codable" ? styles.codable : styles.taktung)}>
            <div className={styles.projectCopy}>
              <div className={styles.appBrand}><Image src={app.icon} width={50} height={50} alt="" /><h3><Link href={app.detailHref}>{app.name}</Link></h3></div>
              <h4>{title}</h4>
              <p className={styles.projectDescription}>{description}</p>
              <ul className={styles.features}>{features.map(feature => <li key={feature}><span aria-hidden="true" />{feature}</li>)}</ul>
              <div className={styles.projectActions}>
                <Link href={app.detailHref} className={styles.readMore} aria-label={"Read more about " + app.name}>Read more <AppArrow direction="right" /></Link>
                <a href={app.href} target="_blank" rel="noopener noreferrer">View in App Store <AppArrow /></a>
              </div>
            </div>
            <div className={styles.projectArt}>
              <div className={styles.screens}>
                {shots.map((index, i) => {
                  const shot = app.screenshots[index];
                  return <a key={shot.src} href={shot.src} target="_blank" rel="noopener noreferrer" className={i === 1 ? styles.secondScreen : undefined} aria-label={"View " + app.name + " " + shot.label + " screenshot"}><Image src={shot.src} alt={shot.alt} width={1200} height={2668} sizes="(max-width: 600px) 38vw, (max-width: 1000px) 30vw, 235px" /><span>{shot.label}</span></a>;
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
