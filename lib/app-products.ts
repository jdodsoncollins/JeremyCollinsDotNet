import media from "@/lib/app-store-media.json";
import duoMedia from "@/lib/duo-media.json";

const codableLabels = ["Elements", "Console", "Responsive design", "Page source", "Network", "Resources", "Scratchpad", "Safari extension"];
const taktungLabels = ["Production", "Visual comparison", "Status widgets", "Activity widgets", "Field Log", "Appearance", "Production inspection", "Project tools"];
const tabforgeLabels = ["Programming keyboard", "Indentation", "Terminal controls", "Keyboard themes", "Adaptive layouts", "Open source"];
const paperLabels = ["Folding workspace", "Guided lessons", "Guidebook", "Free Fold and library"];

export const APP_PRODUCTS = {
  codable: {
    name: "Codable",
    minimumOS: "26.4",
    subtitle: "iPhone & iPad / Safari web developer tools",
    description: "Inspect a page where it runs. Explore the DOM, edit styles, run JavaScript, and follow network requests right in Safari. Test a responsive layout in Resize, or try an idea in Scratchpad on your iPhone or iPad.",
    icon: media.codable.icon.src,
    href: media.codable.appStore,
    hrefLabel: "View in App Store",
    detailHref: "/codable",
    features: ["Safari element inspector and DOM tree", "Console with JavaScript execution", "Network and resource inspection", "Responsive viewport testing", "JavaScript Scratchpad", "Optional on-device Apple Intelligence", "Page source and live style editing", "iPhone and iPad layouts"],
    screenshots: media.codable.screenshots.map((shot, i) => ({ src: shot.src, width: shot.width, height: shot.height, label: codableLabels[i], alt: `Codable App Store screenshot: ${codableLabels[i]}` })),
  },
  taktung: {
    name: "Taktung",
    minimumOS: "27",
    subtitle: "iPhone & iPad / Vercel deployment status",
    description: "Check what is live, compare the change, and follow a build from your iPhone or iPad. Taktung brings Vercel production status, logs, Home Screen widgets, and a local Field Log together, with a confirmation before redeploy, promote, or rollback actions.",
    icon: media.taktung.icon.src,
    href: media.taktung.appStore,
    hrefLabel: "View in App Store",
    detailHref: "/taktung",
    features: ["Production status and searchable build logs", "Real page captures and visual comparisons", "Home Screen status and activity widgets", "Searchable local Field Log and saved baselines", "Confirmed redeploy, promote, and rollback", "Project tools and environment names", "Siri and Shortcuts integration", "Direct Vercel connection; token in Keychain"],
    screenshots: media.taktung.screenshots.map((shot, i) => ({ src: shot.src, width: shot.width, height: shot.height, label: taktungLabels[i], alt: `Taktung App Store screenshot: ${taktungLabels[i]}` })),
  },
  tabforge: {
    name: "TabForge",
    minimumOS: "27",
    subtitle: "iPhone & iPad / Programming keyboard",
    description: "Keep braces, brackets, Tab, and your saved snippets beside the letter keys. TabForge is an open-source programming keyboard with indentation, cursor controls, and layouts that leave room for your work. No Full Access required.",
    icon: media.tabforge.icon.src,
    href: media.tabforge.appStore,
    hrefLabel: "View in App Store",
    detailHref: "/tabforge",
    duoScreenshots: duoMedia.tabforge.screenshots,
    features: ["Programming punctuation within reach", "Tab, two-space, and four-space indentation", "Cursor arrows and supported terminal controls", "Saved snippets and language suggestions", "Light, dark, and code color palettes", "Phone, landscape, and iPad layouts", "Syntax-highlighted companion playground", "MIT licensed; no keystroke logging or transmission"],
    screenshots: media.tabforge.screenshots.map((shot, i) => ({ src: shot.src, width: shot.width, height: shot.height, label: tabforgeLabels[i], alt: `TabForge App Store screenshot: ${tabforgeLabels[i]}` })),
  },
  paperAndGrain: {
    name: "Paper & Grain",
    minimumOS: "26",
    subtitle: "iPhone & iPad / Origami puzzles and Free Fold",
    description: "A quiet place to make something from a sheet of paper. Follow eight short origami lessons, or fold, cut, and draw your own ideas in Free Fold. Warm wood, softly textured paper, and no timer to hurry you along.",
    icon: media.paperAndGrain.icon.src,
    href: media.paperAndGrain.appStore,
    hrefLabel: "View in App Store",
    detailHref: "/paper-and-grain",
    duoScreenshots: duoMedia.paperAndGrain.screenshots,
    features: ["Eight guided origami lessons", "Free Fold with a blank sheet", "Paper that bends and settles as you fold", "Cut shapes and add pencil lines", "Step-by-step diagrams and Guidebook", "Zoom, turn, and inspect your work in 3D", "Save editable sheets; undo and redo", "Free to play, with no timer or losing"],
    screenshots: media.paperAndGrain.screenshots.map((shot, i) => ({ src: shot.src, width: shot.width, height: shot.height, label: paperLabels[i], alt: `Paper & Grain App Store screenshot: ${paperLabels[i]}` })),
  },
};
