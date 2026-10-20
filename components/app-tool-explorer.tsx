"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AppArrow } from "@/components/app-icons";
import styles from "@/app/app-pages.module.css";

type Tool = {
  name: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export function AppToolExplorer({ tools }: { tools: Tool[] }) {
  const [selected, setSelected] = useState(0);
  const [hasSelected, setHasSelected] = useState(false);
  const id = useId();
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const tool = tools[selected];

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clearFeedback = () => setHasSelected(false);
    const onVisibilityChange = () => {
      if (document.hidden) clearFeedback();
    };
    motion.addEventListener("change", clearFeedback);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      motion.removeEventListener("change", clearFeedback);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  function selectTool(index: number) {
    if (index === selected) return;
    setSelected(index);
    setHasSelected(
      !document.hidden &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % tools.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index - 1 + tools.length) % tools.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tools.length - 1;
    else return;
    event.preventDefault();
    selectTool(next);
    buttons.current[next]?.focus();
  }

  return (
    <div className={styles.explorer}>
      <div
        className={styles.explorerTabs}
        role="tablist"
        aria-label="Codable tools"
      >
        {tools.map((item, index) => (
          <button
            key={item.name}
            ref={(node) => {
              buttons.current[index] = node;
            }}
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={selected === index}
            aria-controls={`${id}-panel`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => selectTool(index)}
            onKeyDown={(event) => navigate(event, index)}
          >
            {item.name}
            <span className={styles.tabArrow} aria-hidden="true">
              <AppArrow />
            </span>
          </button>
        ))}
      </div>
      <div
        className={styles.explorerPanel}
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${selected}`}
        tabIndex={0}
        data-tool-transition={hasSelected ? "true" : undefined}
      >
        <div key={tool.name} className={styles.explorerDescription}>
          <h3>{tool.title}</h3>
          <p>{tool.description}</p>
          <a href={tool.src} target="_blank" rel="noopener noreferrer">
            View full screenshot{" "}
            <span aria-hidden="true">
              <AppArrow />
            </span>
          </a>
        </div>
        <div
          key={tool.src}
          className={styles.explorerImage}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) setHasSelected(false);
          }}
        >
          <Image
            src={tool.src}
            width={tool.width ?? 1206}
            height={tool.height ?? 2622}
            sizes="(max-width: 700px) 65vw, 280px"
            alt={tool.alt}
          />
        </div>
      </div>
    </div>
  );
}
