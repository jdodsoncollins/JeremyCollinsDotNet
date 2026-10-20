import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website Privacy",
  description: "Privacy for JeremyCollins.net, separate from the privacy policies of Jeremy's apps.",
  alternates: { canonical: "/privacy" },
};

export default function WebsitePrivacy() {
  return <main style={{ maxWidth: "46rem", margin: "4rem auto", padding: "1.5rem", lineHeight: 1.7 }}>
    <Link href="/">Back to JeremyCollins.net</Link>
    <h1>Website privacy</h1>
    <p>This notice applies to JeremyCollins.net, not to the native apps featured here. Each app has its own privacy policy.</p>
    <h2>Website usage and performance</h2>
    <p>The site uses Vercel Web Analytics and Speed Insights for website usage and performance measurements. See <a href="https://vercel.com/docs/analytics/privacy-policy">Vercel's Web Analytics privacy information</a>.</p>
    <h2>Contact</h2>
    <p>Questions about this website: <a href="mailto:jeremy@jeremycollins.net">jeremy@jeremycollins.net</a>.</p>
  </main>;
}
