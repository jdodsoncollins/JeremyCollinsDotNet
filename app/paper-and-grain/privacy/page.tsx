import type { Metadata } from "next";
import Link from "next/link";
import { CircuitBackground } from "@/components/circuit-background";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { paperAndGrainPrivacyJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Paper & Grain Privacy Policy",
  description:
    "How Paper & Grain handles local paper creations, optional image sharing, and support requests. The app has no ads, analytics, accounts, or tracking.",
  alternates: { canonical: "/paper-and-grain/privacy" },
  openGraph: {
    title: "Paper & Grain Privacy Policy",
    description:
      "Privacy policy for Jeremy Collins' free paper-folding game for iPhone and iPad.",
    url: "/paper-and-grain/privacy",
    type: "article",
  },
};

export default function PaperAndGrainPrivacyPolicy() {
  return (
    <div className="relative min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(paperAndGrainPrivacyJsonLd) }} />
      <CircuitBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-32 md:pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-12">
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Paper &amp; Grain Privacy Policy
              </h1>
              <p className="text-muted-foreground text-sm">
                Effective date: October 18, 2026
              </p>
              <p className="mt-4 text-sm">
                <Link href="/paper-and-grain" className="text-neon-green hover:underline">
                  Paper &amp; Grain support
                </Link>
              </p>
            </div>

            <article className="prose prose-invert max-w-none overflow-hidden">
              <div className="space-y-10 text-muted-foreground p-8 md:p-10 lg:p-12">
                <p className="leading-relaxed">
                  Paper &amp; Grain is Jeremy Collins&apos; free paper-folding
                  game for iPhone and iPad. This policy explains how the app
                  handles your paper creations and other information.
                </p>
                <p className="leading-relaxed">
                  The app has no accounts, advertising, subscriptions, or in-app
                  purchases. It contains no advertising or analytics SDKs. It
                  does not track you across apps or websites, sell your
                  information, or send your creations to a developer-operated
                  server.
                </p>

                <section className="border-l-2 border-neon-green pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">
                    Information on your device
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      Paper &amp; Grain stores your saved papers, folds, cuts,
                      drawings, lesson progress, and save dates in local app
                      storage on your device. It also remembers which paper was
                      open so you can return to it. The paper workshop and
                      bundled lessons work offline.
                    </p>
                    <p>
                      Paper &amp; Grain does not provide its own cloud
                      synchronization. Depending on your system settings, your
                      device&apos;s backup services may include app data. Their
                      providers manage those backups.
                    </p>
                    <p>
                      The app does not read your contacts, location, microphone,
                      camera, or photo library. It processes touch input and
                      supported device-fold information on your device to
                      control the paper.
                    </p>
                  </div>
                </section>

                <section className="border-l-2 border-neon-magenta pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">
                    Sharing your paper
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      Sharing is optional. When you choose to share, the app
                      creates a temporary image and opens the system share
                      sheet. You decide whether to save the image or send it to
                      another app or recipient. The developer receives the
                      image only if you choose to send it to them.
                    </p>
                    <p>
                      An app or service you select may process the shared image
                      under its own privacy policy. Copies you save or share
                      outside Paper &amp; Grain are managed separately from the
                      app&apos;s local papers.
                    </p>
                  </div>
                </section>

                <section className="border-l-2 border-neon-cyan pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">
                    Diagnostics and Apple services
                  </h2>
                  <p className="text-sm leading-relaxed">
                    Paper &amp; Grain does not run its own analytics or
                    diagnostic upload service. It may record technical error
                    messages in your device&apos;s system log. Apple may process
                    App Store, backup, or diagnostic information under
                    Apple&apos;s policies and your device settings.
                  </p>
                </section>

                <section className="border-l-2 border-neon-green pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">
                    Contacting support
                  </h2>
                  <p className="text-sm leading-relaxed">
                    If you email support, the developer receives your email
                    address, message, and any attachments you choose to include.
                    The developer uses this information and keeps it as needed
                    to answer your request and resolve the issue. You can request
                    deletion of support correspondence by contacting the same
                    address.
                  </p>
                </section>

                <section className="border-l-2 border-neon-magenta pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">
                    Removing information
                  </h2>
                  <p className="text-sm leading-relaxed">
                    There is no Paper &amp; Grain account or developer-hosted
                    copy of your saved papers to delete. Deleting the app removes
                    its local app data from your device. Copies in system
                    backups, exported images, and information shared with other
                    apps or recipients must be managed separately through those
                    services. Contact support if you need help understanding
                    these choices.
                  </p>
                </section>

                <section className="border-l-2 border-neon-cyan pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">
                    This website
                  </h2>
                  <p className="text-sm leading-relaxed">
                    This policy describes the installed app. The website
                    hosting this page uses Vercel Web Analytics and Speed
                    Insights to understand website visits and performance.
                    The Paper &amp; Grain app does not include these services.
                    Opening a web page sends a request to the
                    website&apos;s hosting service.
                  </p>
                </section>

                <section className="border-l-2 border-neon-green pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">
                    Changes to this policy
                  </h2>
                  <p className="text-sm leading-relaxed">
                    Any updates will appear on this page with a revised
                    effective date.
                  </p>
                </section>

                <section className="border border-border bg-card/30 p-6">
                  <h2 className="font-display text-xl text-foreground mb-4">
                    Contact
                  </h2>
                  <p className="text-sm leading-relaxed">
                    For privacy questions or support, email {" "}
                    <a href="mailto:jeremy@jeremycollins.net" className="text-neon-green hover:underline break-words">
                      jeremy@jeremycollins.net
                    </a>.
                  </p>
                </section>
              </div>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
