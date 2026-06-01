import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CircuitBackground } from "@/components/circuit-background";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Codable Privacy Policy",
  description: "Privacy policy for Codable, Jeremy Collins' iOS Safari web developer tools app.",
  alternates: {
    canonical: "/codable-privacy-policy",
  },
  openGraph: {
    title: "Codable Privacy Policy",
    description: "Privacy policy for Codable, an iOS Safari web developer tools app.",
    url: "/codable-privacy-policy",
    type: "article",
  },
};

export default function CodablePrivacyPolicy() {
  return (
    <div className="relative min-h-screen">
      <CircuitBackground />
      <div className="relative z-10">
        <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Page header */}
          <div className="mb-12">
            <span className="text-neon-cyan font-mono text-sm tracking-wider">
              {"// LEGAL"}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-2">
              <span className="text-foreground">Codable</span>{" "}
              <span className="text-neon-green">Privacy Policy</span>
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              Effective date: June 1, 2026
            </p>
          </div>

          {/* Content */}
          <article className="prose prose-invert max-w-none overflow-hidden">
            <div className="space-y-10 text-muted-foreground p-8 md:p-10 lg:p-12">
              <p className="leading-relaxed">
                Codable is a free mobile application for loading and inspecting
                web pages and URI-based content. This Privacy Policy explains
                what the app does, what it does not do, and how network activity
                is handled when you choose to load a URI.
              </p>

              <p className="leading-relaxed">
                Codable is provided as-is, without monetization, advertising,
                analytics, tracking, account creation, or paid services. The app
                does not sell data, share user data, or use third-party tracking
                systems.
              </p>

              <p className="leading-relaxed">
                No external code is downloaded by Codable itself. No information
                entered into the app is broadcast or uploaded by Codable to
                online services, except for network requests made to the URI or
                URIs that you choose to load.
              </p>

              {/* Definitions */}
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
                      Service means the Codable mobile application.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-neon-cyan text-sm mb-1">
                      User-Selected URI
                    </h3>
                    <p className="text-sm leading-relaxed">
                      User-Selected URI means a URL or URI that you enter,
                      select, open, or otherwise choose to load in Codable.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-neon-cyan text-sm mb-1">
                      Third-Party System
                    </h3>
                    <p className="text-sm leading-relaxed">
                      Third-Party System means a server, host, website, API, or
                      other online system controlled by someone other than
                      Codable.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information Collection */}
              <section className="border-l-2 border-neon-magenta pl-6">
                <h2 className="font-display text-xl text-foreground mb-4">
                  Information Collection and Use
                </h2>

                <div className="space-y-4 text-sm leading-relaxed">
                  <p>
                    Codable does not collect personal information. The app does
                    not include analytics SDKs, advertising SDKs, tracking
                    pixels, remote configuration systems, or account systems.
                  </p>

                  <p>
                    Codable is not monetized. It is provided free of charge and
                    does not use user data for advertising, profiling, resale, or
                    cross-app tracking.
                  </p>

                  <p>
                    Codable may make network requests when you choose to load a
                    URI. Those requests are sent to the host or hosts associated
                    with the URI you selected. Any information transmitted as a
                    result of loading that URI is between your device and the
                    systems required to load that URI.
                  </p>

                  <p>
                    Codable does not upload, broadcast, retain, or forward the
                    information you enter into the app to unrelated third-party
                    systems. If a user-selected URI points to a third-party
                    system, that system may receive the information necessary to
                    handle the request, according to its own behavior and
                    policies.
                  </p>
                </div>
              </section>

              {/* External Code */}
              <section className="border-l-2 border-neon-green pl-6">
                <h2 className="font-display text-xl text-foreground mb-4">
                  External Code and Remote Content
                </h2>

                <div className="space-y-4 text-sm leading-relaxed">
                  <p>
                    Codable does not download external code to change its own
                    behavior. The installed app contains the app code used to
                    provide the Service.
                  </p>

                  <p>
                    Web pages and URI-based resources that you choose to load may
                    include scripts, assets, cookies, redirects, or other remote
                    content controlled by the relevant site or service. Codable
                    does not add third-party tracking code to those requests.
                  </p>
                </div>
              </section>

              {/* As-Is */}
              <section className="border-l-2 border-neon-magenta pl-6">
                <h2 className="font-display text-xl text-foreground mb-4">
                  As-Is Availability
                </h2>

                <p className="text-sm leading-relaxed">
                  Codable is provided as-is and without any guarantee of
                  availability, compatibility, data recovery, or continued
                  support.
                </p>
              </section>

              {/* Changes */}
              <section className="border-l-2 border-neon-cyan pl-6">
                <h2 className="font-display text-xl text-foreground mb-4">
                  Changes to This Privacy Policy
                </h2>

                <p className="text-sm leading-relaxed">
                  This Privacy Policy may be updated from time to time. Updates
                  will be posted on this page with a revised effective date.
                </p>
              </section>

              {/* Contact */}
              <section className="border border-border bg-card/30 p-6 mt-8">
                <h2 className="font-display text-xl text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="text-sm leading-relaxed">
                  If you have any questions about this Privacy Policy, please
                  contact{" "}
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
