import type { Metadata } from "next";
import Link from "next/link";
import { AppDocument } from "@/components/app-document";
import { paperAndGrainPrivacyJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Paper & Grain Privacy Policy",
  description:
    "How Paper & Grain handles local paper creations, optional tips through Apple, image sharing, and support requests. The app has no ads, analytics, accounts, or tracking.",
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
    <AppDocument
      app="paperAndGrain"
      title="Paper &amp; Grain Privacy Policy"
      effectiveDate="October 21, 2026"
      jsonLd={paperAndGrainPrivacyJsonLd}
      headerContent={
        <p>
          <Link href="/paper-and-grain/support">Paper &amp; Grain support</Link>
        </p>
      }
    >
      <div>
        <p>
          Paper &amp; Grain is Jeremy Collins&apos; free paper-folding game for
          iPhone and iPad. This policy explains how the app handles your paper
          creations and other information.
        </p>
        <p>
          The app has no accounts, advertising, or subscriptions. Its optional
          Tip Jar uses Apple&apos;s StoreKit service. It contains no advertising
          or analytics SDKs. It does not track you across apps or websites, sell
          your information, or send your creations to a developer-operated
          server.
        </p>

        <section>
          <h2>Information on your device</h2>
          <div>
            <p>
              Paper &amp; Grain stores your saved papers, folds, cuts, drawings,
              lesson progress, and save dates in local app storage on your
              device. It also remembers which paper was open so you can return
              to it. The paper workshop and bundled lessons work offline.
            </p>
            <p>
              Paper &amp; Grain does not provide its own cloud synchronization.
              Depending on your system settings, your device&apos;s backup
              services may include app data. Their providers manage those
              backups.
            </p>
            <p>
              The app does not read your contacts, location, microphone, camera,
              or photo library. It processes touch input and supported
              device-fold information on your device to control the paper.
            </p>
          </div>
        </section>

        <section>
          <h2>Optional tips through Apple</h2>
          <div>
            <p>
              Tip Jar offers five optional, one-time tips through Apple&apos;s
              StoreKit service. You can tip more than once. Tips do not unlock
              features or start a subscription. Every lesson and Free Fold
              remain free.
            </p>
            <p>
              Apple presents the purchase confirmation and handles payment
              through its own network, account, and payment services. Paper
              &amp; Grain receives product and transaction results on your
              device to display localized prices, handle cancellation or pending
              approval, verify completed tips, and finish transactions.
            </p>
            <p>
              The app keeps a limited set of recent transaction identifiers in
              memory to avoid handling the same purchase twice. It does not
              save receipts, a tip total, or a purchase history in app
              preferences or files. It has no purchase backend and does not
              upload transaction details to the developer or an analytics
              service.
            </p>
            <p>
              Your papers, drawings, and lesson progress are not sent to
              StoreKit. Apple maintains its own transaction records.
              Apple&apos;s handling of account, payment, and purchase
              information is described in{" "}
              <a href="https://www.apple.com/legal/privacy/data/en/app-store/">
                App Store &amp; Privacy
              </a>
              .
            </p>
          </div>
        </section>

        <section>
          <h2>Sharing your paper</h2>
          <div>
            <p>
              Sharing is optional. When you choose to share, the app creates a
              temporary image and opens the system share sheet. You decide
              whether to save the image or send it to another app or recipient.
              The developer receives the image only if you choose to send it to
              them.
            </p>
            <p>
              An app or service you select may process the shared image under
              its own privacy policy. Copies you save or share outside Paper
              &amp; Grain are managed separately from the app&apos;s local
              papers.
            </p>
          </div>
        </section>

        <section>
          <h2>External links</h2>
          <p>
            Opening Support, Privacy policy, or Other Apps is your choice.
            These links open a website or the App Store, which processes
            requests under its own policy. Paper &amp; Grain does not attach
            your papers or drawings to these links.
          </p>
        </section>

        <section>
          <h2>Diagnostics and Apple services</h2>
          <p>
            Paper &amp; Grain does not run its own analytics or diagnostic
            upload service. It may record technical error messages in your
            device&apos;s system log. Apple may process App Store, backup, or
            diagnostic information under Apple&apos;s policies and your device
            settings.
          </p>
        </section>

        <section>
          <h2>Contacting support</h2>
          <p>
            If you email support, the developer receives your email address,
            message, and any attachments you choose to include. The developer
            uses this information and keeps it as needed to answer your request
            and resolve the issue. You can request deletion of support
            correspondence by contacting the same address.
          </p>
        </section>

        <section>
          <h2>Removing information</h2>
          <p>
            There is no Paper &amp; Grain account or developer-hosted copy of
            your saved papers to delete. Deleting the app removes its local app
            data from your device. Copies in system backups, exported images,
            and information shared with other apps or recipients must be managed
            separately through those services. Contact support if you need help
            understanding these choices.
          </p>
        </section>

        <section>
          <h2>This website</h2>
          <p>
            This policy describes the installed app. The website hosting this
            page uses Simple Analytics, Vercel Web Analytics, and Speed Insights
            to understand website visits and performance. The Paper &amp; Grain
            app does not include these services. Opening a web page sends a
            request to the website&apos;s hosting service.
          </p>
        </section>

        <section>
          <h2>Changes to this policy</h2>
          <p>
            Any updates will appear on this page with a revised effective date.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For privacy questions or support, email{" "}
            <a href="mailto:jeremy@jeremycollins.net">
              jeremy@jeremycollins.net
            </a>
            .
          </p>
        </section>
      </div>
    </AppDocument>
  );
}
