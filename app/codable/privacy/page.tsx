import type { Metadata } from "next";
import { AppDocument } from "@/components/app-document";
import { privacyJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Codable Privacy Policy",
  description:
    "Privacy policy for Codable, Jeremy Collins' free iOS Safari web developer tools app. No ads, analytics, or tracking.",
  alternates: {
    canonical: "/codable/privacy",
  },
  openGraph: {
    title: "Codable Privacy Policy",
    description:
      "Privacy policy for Codable, a free iOS Safari web developer tools app with no tracking.",
    url: "/codable/privacy",
    type: "article",
  },
};

export default function CodablePrivacyPolicy() {
  return (
    <AppDocument
      app="codable"
      title="Codable Privacy Policy"
      effectiveDate="October 21, 2026"
      jsonLd={privacyJsonLd}
    >
      <div>
        <p>
          Codable is a free mobile application for loading and inspecting web
          pages and URI-based content. This Privacy Policy explains what the app
          does, what it does not do, and how network activity is handled when
          you choose to load a URI.
        </p>

        <p>
          Codable is free to use and is provided as-is, without advertising,
          analytics, tracking, or account creation. Optional one-time tips through
          Apple’s App Store support development and unlock no features. The app
          does not sell data or use third-party tracking systems.
        </p>

        <p>
          Codable does not download external code to change its own behavior.
          Inspection and Scratchpad content is not uploaded to a developer
          service. Network requests go to the sites you choose to load; optional
          Tip Jar purchases use Apple’s StoreKit services as described below.
        </p>

        {/* Definitions */}
        <section>
          <h2>Definitions</h2>

          <div>
            <div>
              <h3>Service</h3>
              <p>Service means the Codable mobile application.</p>
            </div>

            <div>
              <h3>User-Selected URI</h3>
              <p>
                User-Selected URI means a URL or URI that you enter, select,
                open, or otherwise choose to load in Codable.
              </p>
            </div>

            <div>
              <h3>Third-Party System</h3>
              <p>
                Third-Party System means a server, host, website, API, or other
                online system controlled by someone other than Codable.
              </p>
            </div>
          </div>
        </section>

        {/* Information Collection */}
        <section>
          <h2>Information Collection and Use</h2>

          <div>
            <p>
              Codable does not collect personal information. The app does not
              include analytics SDKs, advertising SDKs, tracking pixels, remote
              configuration systems, or account systems.
            </p>

            <p>
              All Codable features remain free. Tips are optional, repeatable
              one-time purchases, not subscriptions. Codable does not use user
              data for advertising, profiling, resale, or cross-app tracking.
            </p>

            <p>
              Codable may make network requests when you choose to load a URI.
              Those requests are sent to the host or hosts associated with the
              URI you selected. Any information transmitted as a result of
              loading that URI is between your device and the systems required
              to load that URI.
            </p>

            <p>
              Codable does not upload, broadcast, retain, or forward the
              information you enter into the app to unrelated third-party
              systems. If a user-selected URI points to a third-party system,
              that system may receive the information necessary to handle the
              request, according to its own behavior and policies.
            </p>
          </div>
        </section>

        <section>
          <h2>Optional Tip Jar and Apple Payments</h2>
          <p>
            Apple handles account and payment information under its own privacy
            policy. Codable does not receive payment-card details and has no
            purchase account, developer payment server, or third-party payment
            SDK. Tips do not unlock features or create a subscription.
          </p>
          <p>
            Codable processes verified StoreKit transaction results on the
            device. It keeps only a bounded set of transaction identifiers in
            memory to prevent duplicate processing. It does not save receipts,
            purchase history, or tip totals, or send transaction information to
            a developer server or analytics provider. Apple’s transaction records
            remain under Apple’s control.
          </p>
        </section>

        {/* External Code */}
        <section>
          <h2>External Code and Remote Content</h2>

          <div>
            <p>
              Codable does not download external code to change its own
              behavior. The installed app contains the app code used to provide
              the Service.
            </p>

            <p>
              Web pages and URI-based resources that you choose to load may
              include scripts, assets, cookies, redirects, or other remote
              content controlled by the relevant site or service. Codable does
              not add third-party tracking code to those requests.
            </p>
          </div>
        </section>

        {/* As-Is */}
        <section>
          <h2>As-Is Availability</h2>

          <p>
            Codable is provided as-is and without any guarantee of availability,
            compatibility, data recovery, or continued support.
          </p>
        </section>

        {/* Changes */}
        <section>
          <h2>Changes to This Privacy Policy</h2>

          <p>
            This Privacy Policy may be updated from time to time. Updates will
            be posted on this page with a revised effective date.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2>Contact</h2>
          <p>
            Questions about this policy:{" "}
            <a href="mailto:jeremy@jeremycollins.net">
              jeremy@jeremycollins.net
            </a>
          </p>
        </section>
      </div>
    </AppDocument>
  );
}
