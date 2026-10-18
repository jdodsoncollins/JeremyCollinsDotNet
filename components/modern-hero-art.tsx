import { SpriteHeroArt, type HeroSpriteConfig } from "@/components/sprite-hero-art";

const CONFIG: HeroSpriteConfig = {
  era: "modern",
  sheets: { idle: "/hero/hero-modern-v3-idle.webp", petting: "/hero/hero-modern-v3-petting.webp" },
  poster: "/hero/hero-modern-v3-still.webp",
  width: 600, height: 560,
  frameCount: 16, columns: 4, rows: 4,
  frameMs: { idle: 200, petting: 100 },
};

export function ModernHeroArt() {
  return <SpriteHeroArt config={CONFIG} />;
}
