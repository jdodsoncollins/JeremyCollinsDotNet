import Image from "next/image";
import Link from "next/link";
import { APP_PRODUCTS } from "@/lib/app-products";
import { AppArrow } from "@/components/app-icons";
import { AppScreenshotGallery } from "@/components/app-screenshot-gallery";
import styles from "@/app/home.module.css";

const projects = [
  { app: APP_PRODUCTS.tabforge, kind: "tabforge", category: "Code keyboard", title: "A code keyboard for iPhone and iPad", description: "Braces, brackets, Tab, and terminal controls beside the letter keys. Keep writing in the app you’re already using, without Full Access.", features: ["Indentation & snippets", "Code & terminal layouts"], shots: [0, 3] },
  { app: APP_PRODUCTS.paperAndGrain, kind: "paper", category: "Paper folding", title: "Fold, cut, and draw on paper", description: "Follow eight guided lessons or explore a blank sheet in Free Fold. Turn your paper, try a crease, and save what you make. There’s no timer.", features: ["Guided lessons & Free Fold", "Undo, redo & saved papers"], shots: [0, 2] },
  { app: APP_PRODUCTS.codable, kind: "codable", category: "Safari tools", title: "Inspect the web in Safari", description: "Explore the live page’s DOM and styles, run JavaScript, and follow network requests. Web developer tools for your iPhone and iPad.", features: ["Elements, console & network", "Responsive viewport testing"], shots: [0, 1] },
  { app: APP_PRODUCTS.taktung, kind: "taktung", category: "Vercel deployments", title: "Inspect your Vercel deployments", description: "See what’s live, read build logs, and compare real page captures. Save deployment evidence in a local Field Log.", features: ["Production checks & comparisons", "Home Screen status widgets"], shots: [0, 2] },
] as const;

export function ProjectsSection() {
  return (
    <section id="projects" className={styles.projects} aria-labelledby="apps-title">
      <div className={styles.sectionHeading} data-home-reveal>
        <div><h2 id="apps-title">Side projects</h2></div>
      </div>
      <nav className={styles.appIndex} aria-label="Jump to an app">
        {projects.map(({ app, kind, category }) => <a key={kind} href={`#app-${kind}`}><span>{app.name}</span><span>{category}</span><AppArrow direction="right" /></a>)}
      </nav>
      <div className={styles.projectList}>
        {projects.map(({ app, kind, title, description, features, shots }) => (
          <article id={`app-${kind}`} key={app.name} className={`${styles.project} ${styles[kind]}`} data-home-reveal>
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
              <AppScreenshotGallery shots={shots.map(index => app.screenshots[index])} appName={app.name} label={`${app.name} preview screenshots`} variant="hero" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
