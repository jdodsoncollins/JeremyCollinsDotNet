import styles from "@/app/home.module.css";

const placements = {
  projects: styles.forestOpening,
  middle: styles.forestMiddle,
  floor: styles.forestFloor,
};

export function HomeLandscape({
  placement,
}: {
  placement: keyof typeof placements;
}) {
  return (
    <div
      className={`${styles.forestScene} ${placements[placement]}`}
      data-home-scene={placement}
      aria-hidden="true"
    >
      <div className={styles.forestImage} data-home-landscape />
      <div className={styles.forestGlow} data-home-glow />
    </div>
  );
}
