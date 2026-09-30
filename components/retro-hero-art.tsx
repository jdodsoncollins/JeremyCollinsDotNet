import { SpriteHeroArt, type HeroSpriteConfig } from "@/components/sprite-hero-art";

const CONFIG: HeroSpriteConfig = {
  era: "1990s",
  sheets: { idle: "/hero/hero-1990s-v2-idle.webp", petting: "/hero/hero-1990s-v2-interaction.webp" },
  poster: "/hero/hero-1990s-v2-still.webp",
  width: 320, height: 280,
  frameCount: 6, columns: 3, rows: 2,
  frameMs: { idle: 400, petting: 200 },
};

export function RetroHeroArt() {
  return <SpriteHeroArt config={CONFIG} />;
}
