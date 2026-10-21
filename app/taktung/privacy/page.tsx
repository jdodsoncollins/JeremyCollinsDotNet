import type { Metadata } from "next";
import { AppDocument } from "@/components/app-document";
import { taktungPrivacyJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Taktung Privacy Policy",
  description:
    "Privacy policy for Taktung, Jeremy Collins' Vercel operations app for iOS. No ads, analytics, or tracking.",
  alternates: {
    canonical: "/taktung/privacy",
  },
  openGraph: {
    title: "Taktung Privacy Policy",
    description:
      "Privacy policy for Taktung, a Vercel operations app with no tracking.",
    url: "/taktung/privacy",
    type: "article",
  },
};

export default function TaktungPrivacyPolicy() {
  return (
    <AppDocument
      app="taktung"
      title="Taktung Privacy Policy"
      effectiveDate="October 21, 2026"
      jsonLd={taktungPrivacyJsonLd}
    >
      <div>
        <p>
          Taktung is a mobile application for operating Vercel sites from your
          phone. This Privacy Policy explains what the app does, what it does
          not do, and how network activity is handled when you connect to
          Vercel or use the optional Tip Jar.
        </p>

        <p>
          Taktung is an independent app. It is not affiliated with, endorsed by,
          sponsored by, or otherwise connected to Vercel, Inc. in any way.
          Vercel is a trademark of its owner.
        </p>

        <p>
          Taktung is provided as-is, without advertising, analytics SDKs,
          tracking, Taktung account creation, or paid feature unlocks. Optional
          tips support its development. The
          app does not sell data, share user data, or use third-party tracking
          systems.
        </p>

        <p>
          No external code is downloaded by Taktung itself. No information
          entered into the app is broadcast or uploaded by Taktung to online
          services, except for network requests Taktung makes to Vercel when you
          sign in or run an operation you chose.
        </p>

        <section>
          <h2>Definitions</h2>

          <div>
            <div>
              <h3>Service</h3>
              <p>Service means the Taktung mobile application.</p>
            </div>

            <div>
              <h3>Vercel Connection</h3>
              <p>
                Vercel Connection means the Vercel OAuth sign-in or personal
                access token you provide so Taktung can call the Vercel API on
                your behalf.
              </p>
            </div>

            <div>
              <h3>Third-Party System</h3>
              <p>
                Third-Party System means a server, host, website, API, or other
                online system controlled by someone other than Taktung,
                including Vercel.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Information Collection and Use</h2>

          <div>
            <p>
              Taktung does not collect personal information onto servers it
              operates. The app does not include analytics SDKs, advertising
              SDKs, tracking pixels, crash-reporting SDKs, remote configuration
              systems, or Taktung account systems.
            </p>

            <p>
              Taktung is free to use. You can choose to send an optional,
              repeatable tip through Apple In-App Purchase. Tips do not unlock
              features or start a subscription. Taktung does not use user data
              for advertising, profiling, resale, or cross-app tracking.
            </p>

            <p>
              When you connect to Vercel or choose a Vercel operation in the
              app, requests are sent directly from your device to Vercel.
              Any information transmitted as a
              result is between your device and Vercel, according to
              Vercel&apos;s own behavior and policies.
            </p>

            <p>
              Credentials stay in the platform Secure Store on the device.
              Project snapshots, site selections, and activity metadata stay in
              local app storage. Environment variable values are excluded from
              the UI, cache, and activity history. Taktung does not upload,
              broadcast, retain, or forward that information to unrelated
              third-party systems.
            </p>
          </div>
        </section>

        <section>
          <h2>Optional Tips</h2>

          <div>
            <p>
              Apple handles payment and App Store account information. Taktung
              receives StoreKit product information and transaction results on
              your device to verify and finish a tip.
            </p>
            <p>
              Taktung does not operate a purchase server, upload transactions,
              link tips to your Vercel account, or save a purchase history or
              tip total. A bounded set of transaction identifiers is kept only
              in memory while the app is running to prevent duplicate handling.
            </p>
            <p>
              Apple retains its own purchase records under{" "}
              <a href="https://www.apple.com/legal/privacy/data/en/app-store/">
                App Store &amp; Privacy
              </a>.
            </p>
          </div>
        </section>

        <section>
          <h2>External Code and Remote Content</h2>

          <div>
            <p>
              Taktung does not download external code to change its own
              behavior. The installed app contains the app code used to provide
              the Service.
            </p>

            <p>
              Signing in with Vercel OAuth uses the system browser, and Vercel
              responses may include content controlled by Vercel. Taktung does
              not add third-party tracking code to those requests. Search that
              uses Apple Intelligence, when available, runs on the device.
            </p>
          </div>
        </section>

        <section>
          <h2>As-Is Availability</h2>

          <p>
            Taktung is provided as-is and without any guarantee of availability,
            compatibility, data recovery, or continued support.
          </p>
        </section>

        <section>
          <h2>Changes to This Privacy Policy</h2>

          <p>
            This Privacy Policy may be updated from time to time. Updates will
            be posted on this page with a revised effective date.
          </p>
        </section>

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
