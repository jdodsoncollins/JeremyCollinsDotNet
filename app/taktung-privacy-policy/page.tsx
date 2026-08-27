import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CircuitBackground } from "@/components/circuit-background";
import type { Metadata } from "next";
import { taktungPrivacyJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Taktung Privacy Policy",
  description:
    "Privacy policy for Taktung, Jeremy Collins' Vercel operations app for iOS. No ads, analytics, or tracking.",
  alternates: {
    canonical: "/taktung-privacy-policy",
  },
  openGraph: {
    title: "Taktung Privacy Policy",
    description:
      "Privacy policy for Taktung, a Vercel operations app with no tracking.",
    url: "/taktung-privacy-policy",
    type: "article",
  },
};

export default function TaktungPrivacyPolicy() {
  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(taktungPrivacyJsonLd) }}
      />
      <CircuitBackground />
      <div className="relative z-10">
        <Header />
      <main className="pt-32 md:pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Taktung Privacy Policy
            </h1>
            <p className="text-muted-foreground text-sm">
              Effective date: August 27, 2026
            </p>
          </div>

          <article className="prose prose-invert max-w-none overflow-hidden">
            <div className="space-y-10 text-muted-foreground p-8 md:p-10 lg:p-12">
              <p className="leading-relaxed">
                Taktung is a mobile application for operating Vercel sites from
                your phone. This Privacy Policy explains what the app does, what
                it does not do, and how network activity is handled when you
                connect to Vercel.
              </p>

              <p className="leading-relaxed">
                Taktung is an independent app. It is not affiliated with,
                endorsed by, sponsored by, or otherwise connected to Vercel,
                Inc. in any way. Vercel is a trademark of its owner.
              </p>

              <p className="leading-relaxed">
                Taktung is provided as-is, without monetization, advertising,
                analytics, tracking, Taktung account creation, or paid services.
                The app does not sell data, share user data, or use third-party
                tracking systems.
              </p>

              <p className="leading-relaxed">
                No external code is downloaded by Taktung itself. No information
                entered into the app is broadcast or uploaded by Taktung to
                online services, except for network requests Taktung makes to
                Vercel when you sign in or run an operation you chose.
              </p>

              <section className="border-l-2 border-neon-green pl-6">
                <h2 className="font-display text-xl text-foreground mb-4">
                  Definitions
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-mono text-neon-cyan text-sm mb-1">
                      Service
                    </h3>
                    <p className="text-sm leading-relaxed">
                      Service means the Taktung mobile application.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-neon-cyan text-sm mb-1">
                      Vercel Connection
                    </h3>
                    <p className="text-sm leading-relaxed">
                      Vercel Connection means the Vercel OAuth sign-in or
                      personal access token you provide so Taktung can call the
                      Vercel API on your behalf.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-neon-cyan text-sm mb-1">
                      Third-Party System
                    </h3>
                    <p className="text-sm leading-relaxed">
                      Third-Party System means a server, host, website, API, or
                      other online system controlled by someone other than
                      Taktung, including Vercel.
                    </p>
                  </div>
                </div>
              </section>

              <section className="border-l-2 border-neon-magenta pl-6">
                <h2 className="font-display text-xl text-foreground mb-4">
                  Information Collection and Use
                </h2>

                <div className="space-y-4 text-sm leading-relaxed">
                  <p>
                    Taktung does not collect personal information onto servers
                    it operates. The app does not include analytics SDKs,
                    advertising SDKs, tracking pixels, crash-reporting SDKs,
                    remote configuration systems, or Taktung account systems.
                  </p>

                  <p>
                    Taktung is not monetized. It is provided free of charge and
                    does not use user data for advertising, profiling, resale, or
                    cross-app tracking.
                  </p>

                  <p>
                    Taktung may make network requests when you sign in or when
                    you choose an operation in the app. Those requests are sent
                    directly from your device to Vercel. Any information
                    transmitted as a result is between your device and Vercel,
                    according to Vercel&apos;s own behavior and policies.
                  </p>

                  <p>
                    Credentials stay in the platform Secure Store on the device.
                    Project snapshots, site selections, and activity metadata
                    stay in local app storage. Environment variable values are
                    excluded from the UI, cache, and activity history. Taktung
                    does not upload, broadcast, retain, or forward that
                    information to unrelated third-party systems.
                  </p>
                </div>
              </section>

              <section className="border-l-2 border-neon-green pl-6">
                <h2 className="font-display text-xl text-foreground mb-4">
                  External Code and Remote Content
                </h2>

                <div className="space-y-4 text-sm leading-relaxed">
                  <p>
                    Taktung does not download external code to change its own
                    behavior. The installed app contains the app code used to
                    provide the Service.
                  </p>

                  <p>
                    Signing in with Vercel OAuth uses the system browser, and
                    Vercel responses may include content controlled by Vercel.
                    Taktung does not add third-party tracking code to those
                    requests. Search that uses Apple Intelligence, when
                    available, runs on the device.
                  </p>
                </div>
              </section>

              <section className="border-l-2 border-neon-magenta pl-6">
                <h2 className="font-display text-xl text-foreground mb-4">
                  As-Is Availability
                </h2>

                <p className="text-sm leading-relaxed">
                  Taktung is provided as-is and without any guarantee of
                  availability, compatibility, data recovery, or continued
                  support.
                </p>
              </section>

              <section className="border-l-2 border-neon-cyan pl-6">
                <h2 className="font-display text-xl text-foreground mb-4">
                  Changes to This Privacy Policy
                </h2>

                <p className="text-sm leading-relaxed">
                  This Privacy Policy may be updated from time to time. Updates
                  will be posted on this page with a revised effective date.
                </p>
              </section>

              <section className="border border-border bg-card/30 p-6 mt-8">
                <h2 className="font-display text-xl text-foreground mb-4">
                  Contact
                </h2>
                <p className="text-sm leading-relaxed">
                  Questions about this policy:{" "}
                  <a
                    href="mailto:jeremy@jeremycollins.net"
                    className="text-neon-green hover:underline"
                  >
                    jeremy@jeremycollins.net
                  </a>
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
