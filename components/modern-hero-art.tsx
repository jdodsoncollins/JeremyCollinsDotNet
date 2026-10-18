import { SpriteHeroArt, type HeroSpriteConfig } from "@/components/sprite-hero-art";

const CONFIG: HeroSpriteConfig = {
  era: "modern",
  sheets: { idle: "/hero/hero-modern-v4-idle.webp", petting: "/hero/hero-modern-v4-petting.webp" },
  poster: "/hero/hero-modern-v4-still.webp",
  width: 600, height: 560,
  frameCount: 64, columns: 8, rows: 8,
  frameMs: { idle: 50, petting: 25 },
};

export function ModernHeroArt() {
  return <SpriteHeroArt config={CONFIG} />;
}
