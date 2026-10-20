import Image from "next/image";
import Link from "next/link";
import { APP_PRODUCTS } from "@/lib/app-products";
import { AppArrow } from "@/components/app-icons";
import styles from "@/app/home.module.css";

const projects = [
  { app: APP_PRODUCTS.tabforge, kind: "tabforge", title: "A code keyboard for iPhone and iPad", description: "Braces, brackets, Tab, and terminal controls within reach. Indent a line, insert a snippet, and keep writing in the app you’re already using.", features: ["Code & terminal layouts", "Indentation & snippets", "No Full Access required"], shots: [0, 3] },
  { app: APP_PRODUCTS.paperAndGrain, kind: "paper", title: "Fold, cut, and draw on paper", description: "A quiet paper workshop with eight guided lessons and room to explore. Turn your sheet, try a crease, or make something of your own. There’s no timer.", features: ["Eight guided lessons", "Free Fold & saved papers", "Undo, redo & try again"], shots: [0, 2] },
  { app: APP_PRODUCTS.codable, kind: "codable", title: "Inspect the web in Safari", description: "Explore the DOM, edit CSS, and run JavaScript in the live page. Follow requests and test responsive layouts, right on your iPhone or iPad.", features: ["Elements & live styles", "JavaScript console", "Network & responsive testing"], shots: [0, 1] },
  { app: APP_PRODUCTS.taktung, kind: "taktung", title: "Inspect your Vercel deployments", description: "See what’s live, read build logs, and compare real page captures. Keep deployment evidence in a local Field Log, with status widgets on your Home Screen.", features: ["Production status & logs", "Visual comparisons", "Home Screen widgets"], shots: [0, 2] },
] as const;

export function ProjectsSection() {
  return (
    <section id="projects" className={styles.projects} aria-labelledby="apps-title">
      <div className={styles.sectionHeading} data-home-reveal>
        <div><h2 id="apps-title">Side projects</h2></div>
      </div>
      <div className={styles.projectList}>
        {projects.map(({ app, kind, title, description, features, shots }) => (
          <article key={app.name} className={`${styles.project} ${styles[kind]}`} data-home-reveal>
            <div className={styles.projectCopy}>
              <div className={styles.appBrand}><Image src={app.icon} width={50} height={50} alt="" /><h3><Link href={app.detailHref}>{app.name}</Link></h3></div>
              <h4>{title}</h4>
              <p className={styles.projectDescription}>{description}</p>
              <ul className={styles.features}>{features.map(feature => <li key={feature}>{feature}</li>)}</ul>
              <p className={styles.freeNote}>Free to use. No ads, tracking, subscriptions, or in-app purchases.</p>
              <div className={styles.projectActions}>
                <Link href={app.detailHref} className={styles.readMore} aria-label={"Read more about " + app.name}>Read more <AppArrow direction="right" /></Link>
                <a href={app.href} target="_blank" rel="noopener noreferrer">View in App Store <AppArrow /></a>
              </div>
            </div>
            <div className={styles.projectArt}>
              <div className={styles.screens}>
                {shots.map((index, i) => {
                  const shot = app.screenshots[index];
                  return <a key={shot.src} href={shot.src} target="_blank" rel="noopener noreferrer" className={i === 1 ? styles.secondScreen : undefined} aria-label={"View " + app.name + " " + shot.label + " screenshot"}><Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(max-width: 600px) 38vw, (max-width: 1000px) 30vw, 235px" /><span>{shot.label}</span></a>;
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
