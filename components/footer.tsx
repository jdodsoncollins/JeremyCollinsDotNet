import { AppArrow } from "@/components/app-icons";
import homeStyles from "@/app/home.module.css";
import siteStyles from "@/app/site-pages.module.css";

export function Footer({ home = false }: { home?: boolean }) {
  const styles = home ? homeStyles : siteStyles;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} Jeremy Collins</span>
        <a href="mailto:jeremy@jeremycollins.net">jeremy@jeremycollins.net</a>
        <div>
          <a
            href="https://github.com/jdodsoncollins"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <AppArrow />
          </a>
          <a
            href="https://linkedin.com/in/jeremycollinsnet"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <AppArrow />
          </a>
        </div>
      </div>
    </footer>
  );
}
