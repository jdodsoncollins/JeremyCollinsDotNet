"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

type EraHeroImageProps = Omit<ComponentPropsWithoutRef<"img">, "src"> & {
  era: "1980s" | "1990s" | "modern";
  src: string;
};

/** Keep the original image geometry without requesting art for a hidden era. */
export function EraHeroImage({ era, src, ...props }: EraHeroImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const sync = () => {
      if (
        document.documentElement.dataset.era === era &&
        image.getAttribute("src") !== src
      ) {
        image.src = src;
      }
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-era"],
    });
    sync();
    return () => observer.disconnect();
  }, [era, src]);

  return (
    <>
      <img ref={imageRef} {...props} />
      {era === "modern" && (
        <noscript>
          <img {...props} src={src} />
        </noscript>
      )}
    </>
  );
}
