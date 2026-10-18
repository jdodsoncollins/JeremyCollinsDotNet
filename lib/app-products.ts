import media from "@/lib/app-store-media.json";

const codableLabels = ["Elements", "Console", "Responsive design", "Page source", "Network", "Resources", "Scratchpad", "Safari extension"];
const taktungLabels = ["Production", "Visual comparison", "Status widgets", "Activity widgets", "Field Log", "Appearance", "Site briefing"];

export const APP_PRODUCTS = {
  codable: {
    name: "Codable",
    subtitle: "iPhone & iPad / Safari web developer tools",
    description: "Inspect the web right in Safari. Explore the DOM, edit styles, run JavaScript, and review network activity on iPhone and iPad. Test responsive layouts in Resize or try an idea in Scratchpad, with optional on-device Apple Intelligence on supported devices.",
    icon: media.codable.icon.src,
    href: media.codable.appStore,
    hrefLabel: "View in App Store",
    detailHref: "/codable",
    features: ["Safari element inspector and DOM tree", "Console with JavaScript execution", "Network and resource inspection", "Responsive viewport testing", "JavaScript Scratchpad", "On-device Apple Intelligence assistance", "Page source and live style editing", "iPhone and iPad layouts"],
    screenshots: media.codable.screenshots.map((shot, i) => ({ src: shot.src, label: codableLabels[i], alt: `Codable App Store screenshot: ${codableLabels[i]}` })),
  },
  taktung: {
    name: "Taktung",
    subtitle: "iPhone & iPad / Vercel deployment status",
    description: "Keep your Vercel sites close. Check production status, read build logs, compare real page captures, and save checks and notes in a local Field Log. Home Screen widgets keep recent deployments in view. Review and confirm redeploy, promote, and rollback actions. No ads or tracking. Not affiliated with Vercel.",
    icon: media.taktung.icon.src,
    href: media.taktung.appStore,
    hrefLabel: "View in App Store",
    detailHref: "/taktung",
    features: ["Production status and build logs", "Visual deployment comparisons", "Home Screen status and activity widgets", "Searchable local Field Log", "Confirmed redeploy, promote, and rollback", "Environment names and targets", "Siri and Shortcuts integration", "On-device briefs on supported devices"],
    screenshots: media.taktung.screenshots.map((shot, i) => ({ src: shot.src, label: taktungLabels[i], alt: `Taktung App Store screenshot: ${taktungLabels[i]}` })),
  },
};
