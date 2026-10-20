"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AppArrow } from "@/components/app-icons";
import styles from "@/app/app-pages.module.css";

type Tool = { name: string; title: string; description: string; src: string; alt: string; width?: number; height?: number };

export function AppToolExplorer({ tools }: { tools: Tool[] }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const tool = tools[selected];

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % tools.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + tools.length) % tools.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tools.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    buttons.current[next]?.focus();
  }

  return (
    <div className={styles.explorer}>
      <div className={styles.explorerTabs} role="tablist" aria-label="Codable tools">
        {tools.map((item, index) => (
          <button key={item.name} ref={(node) => { buttons.current[index] = node; }} role="tab" id={`${id}-tab-${index}`} aria-selected={selected === index} aria-controls={`${id}-panel`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => navigate(event, index)}>
            <span className={styles.tabNumber} aria-hidden="true">0{index + 1}</span>{item.name}<span className={styles.tabArrow} aria-hidden="true"><AppArrow /></span>
          </button>
        ))}
      </div>
      <div className={styles.explorerPanel} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${selected}`} tabIndex={0}>
        <div className={styles.explorerDescription}><h3>{tool.title}</h3><p>{tool.description}</p><a href={tool.src} target="_blank" rel="noopener noreferrer">View full screenshot <span aria-hidden="true"><AppArrow /></span></a></div>
        <div className={styles.explorerImage}><Image key={tool.src} src={tool.src} width={tool.width ?? 1206} height={tool.height ?? 2622} sizes="(max-width: 700px) 65vw, 280px" alt={tool.alt} /></div>
      </div>
    </div>
  );
}
