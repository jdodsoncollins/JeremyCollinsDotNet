import Image from "next/image";
import styles from "@/app/app-pages.module.css";

export type AppScreenshotData = {
  src: string;
  alt: string;
  label: string;
  width?: number;
  height?: number;
  device?: string;
};

export function AppScreenshot({
  shot,
  priority = false,
  sizes = "(max-width: 600px) 82vw, (max-width: 1000px) 42vw, 320px",
}: {
  shot: AppScreenshotData;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={styles.screenshot} data-device={shot.device}>
      <a
        href={shot.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open full-size ${shot.label} screenshot`}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width ?? 1206}
          height={shot.height ?? 2622}
          sizes={sizes}
          priority={priority}
        />
      </a>
      <figcaption>{shot.label}</figcaption>
    </figure>
  );
}
