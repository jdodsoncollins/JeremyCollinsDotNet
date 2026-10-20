import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website Privacy",
  description: "Analytics choices and privacy for JeremyCollins.net, separate from the privacy policies of Jeremy's apps.",
  alternates: { canonical: "/privacy" },
};

export default function WebsitePrivacy() {
  return <main style={{ maxWidth: "46rem", margin: "4rem auto", padding: "1.5rem", lineHeight: 1.7 }}>
    <Link href="/">Back to JeremyCollins.net</Link>
    <h1>Website privacy</h1>
    <p>This notice applies to JeremyCollins.net, not to the native apps featured here. Each app has its own privacy policy.</p>
    <h2>Optional Google Analytics</h2>
    <p>If you accept analytics, this website loads Google Analytics to measure visits to public pages. Google receives page-view and browser/device information and uses first-party analytics cookies to distinguish visits. The integration does not send URL query strings, URL fragments, full referring URLs, email addresses, or form contents. A small approved list of campaign labels and recognized referring services helps identify traffic sources; unrecognized values are discarded. Authentication callback and token utility routes are excluded. Advertising storage and personalization are disabled.</p>
    <p>No Google Analytics script loads and no Google Analytics requests are sent before you accept. You can decline, or change your choice with the Analytics preferences button. Withdrawing consent clears this site's Google Analytics cookies and reloads the page to stop the tag. Your preference is stored locally in your browser; clearing browser storage resets it.</p>
    <p>Learn more about <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from sites that use its services</a>.</p>
    <h2>Existing site measurements</h2>
    <p>The site also uses Vercel Web Analytics and Speed Insights for website usage and performance measurements. These are separate from optional Google Analytics. See <a href="https://vercel.com/docs/analytics/privacy-policy">Vercel's Web Analytics privacy information</a>.</p>
    <h2>Contact</h2>
    <p>Questions about this website: <a href="mailto:jeremy@jeremycollins.net">jeremy@jeremycollins.net</a>.</p>
  </main>;
}
