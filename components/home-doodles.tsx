import styles from "@/app/home.module.css";

export function CatTracks() {
  return (
    <div className={styles.catTracks} aria-hidden="true">
      {[0, 1, 2, 3].map(step => (
        <svg key={step} viewBox="0 0 32 36" fill="currentColor">
          <ellipse cx="6" cy="13" rx="3.4" ry="5" transform="rotate(-25 6 13)" />
          <ellipse cx="13" cy="7" rx="3.3" ry="5" transform="rotate(-8 13 7)" />
          <ellipse cx="22" cy="8" rx="3.3" ry="5" transform="rotate(12 22 8)" />
          <ellipse cx="28" cy="16" rx="3.2" ry="4.6" transform="rotate(30 28 16)" />
          <path d="M7 27c0-4 4-6 6-9 2-2 5-2 7 1 2 3 6 5 6 9 0 6-6 4-10 4-5 0-9 1-9-5Z" />
        </svg>
      ))}
    </div>
  );
}

export function PageTabs() {
  return <div className={styles.pageTabs} aria-hidden="true">{[0, 1, 2, 3, 4].map(tab => <span key={tab} />)}</div>;
}
