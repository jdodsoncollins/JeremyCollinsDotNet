import type { Metadata } from "next";
import { AppDocument } from "@/components/app-document";
import { tabforgePrivacyJsonLd } from "@/lib/json-ld";
import { TABFORGE_CREDITS, TABFORGE_NOTICES_HREF } from "@/lib/tabforge-credits";

export const metadata: Metadata = {
  title: "TabForge Privacy Policy",
  description:
    "Privacy policy for TabForge: Code Keyboard. TabForge collects no data. Learn what stays on your device, which features are optional, the bundled third-party word lists, and on-device voice recognition.",
  alternates: { canonical: "/tabforge/privacy" },
  openGraph: {
    title: "TabForge Privacy Policy",
    description:
      "TabForge collects no data. How it handles typing context, on-device storage, optional language features, keyboard permissions, and voice recognition.",
    url: "/tabforge/privacy",
    type: "article",
  },
};

export default function TabForgePrivacyPolicy() {
  return (
    <AppDocument
      app="tabforge"
      title="TabForge Privacy Policy"
      effectiveDate="October 27, 2026"
      jsonLd={tabforgePrivacyJsonLd}
    >
      <div>
        <p>
          TabForge: Code Keyboard is a keyboard extension and companion app for
          programming, scripting, terminals, and remote desktops on iPhone and
          iPad. This policy explains the information TabForge uses while you
          type, what it stores locally, and how its optional features work.
        </p>
        <p>
          TabForge&apos;s app and keyboard contain no analytics, advertising,
          account system, TabForge-operated networking service, or automatic
          diagnostic uploader. The optional companion Tip Jar uses Apple&apos;s
          StoreKit service as described below. The keyboard does not transmit keystrokes,
          surrounding text, snippets, swipe gestures, or spelling requests to a
          TabForge server. The code is available for inspection under the
          repository&apos;s{" "}
          <a
            href="https://github.com/jdodsoncollins/TabForge/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
          >
            MIT license
          </a>
          .
        </p>
        <p>
          This policy covers the app and keyboard extension. It does not
          describe this website, the apps you type into, terminal or
          remote-desktop services, Apple system features, external websites, or
          device backup providers, which have their own data practices.
        </p>

        <section>
          <h2>At a Glance</h2>
          <ul>
            <li>
              <strong>Nothing is collected.</strong> TabForge has no servers,
              analytics, advertising, or accounts, and never sends your typing,
              snippets, drafts, or usage information to the developer or third
              parties. Text leaves only through the apps and shares you choose.
              Its App Store privacy label is Data Not Collected.
            </li>
            <li>
              <strong>What is saved stays on your device.</strong> Keyboard
              preferences, custom snippets, the playground draft, and, only if
              you turn on Learn my tap positions, average tap offsets for each
              letter key. Each stays in the keyboard&apos;s or app&apos;s own
              local storage and is never uploaded. Device backups you set up may
              include it.
            </li>
            <li>
              <strong>Language features are optional.</strong> Autocorrect,
              swipe typing, and Learn my tap positions are off until you turn
              them on in the keyboard&apos;s gear menu. Turning off Learn my tap
              positions erases what it learned.
            </li>
            <li>
              <strong>Typing context is temporary.</strong> Text around the
              cursor, the tap points of the word you are typing, and swipe
              traces are used in memory on the device and never saved.
            </li>
            <li>
              <strong>No network service of its own.</strong> The keyboard makes
              no network requests. The companion app uses Apple&apos;s StoreKit
              for the optional Tip Jar, and opens links or shares only when you
              choose.
            </li>
          </ul>
        </section>

        <section>
          <h2>Typing Context and Information Held in Memory</h2>
          <div>
            <p>
              iOS and the host app may expose limited text and field information
              to the keyboard through Apple&apos;s UITextDocumentProxy
              interface. TabForge uses that context on the device for editing,
              indentation, completions, cursor movement, and optional spelling
              correction. Host apps can limit or withhold context. TabForge does
              not build a keystroke history or save the host document.
            </p>
            <p>
              The optional swipe recognizer, autocorrect, and English
              suggestions use fixed English and programming word lists, with
              word frequencies, that are bundled in the app. TabForge does not
              download words or add your typing to these lists. To rank
              corrections, suggestions, and swipe matches, the keyboard also
              reads words from the text the host app exposes around the cursor.
              That list is kept only in memory and never saved. Gesture traces,
              tap points, and alternatives are temporary; they are not uploaded
              or used to train a model. Swipe recognition is experimental and
              off by default.
            </p>
            <p>
              Optional English prose correction, off by default, uses
              Apple&apos;s UITextChecker on the device to decide which words are
              misspelled. Replacements are chosen on the device from the
              bundled word list and nearby document words, weighing where each
              key was tapped. Tap points for the word being typed are held in
              memory until you finish the word and are then discarded. When
              enabled, correction can request Apple&apos;s supplementary
              keyboard lexicon, which may include names and text shortcuts. A
              bounded set is held in memory to avoid correcting those words;
              TabForge does not save or log the lexicon.
            </p>
            <p>
              Correction state, spelling resources, swipe traces, repeat tasks,
              and held-key state are released when the keyboard is dismissed or
              receives a memory warning. Normal operating-system memory
              management still applies; this is not a guarantee of secure memory
              erasure.
            </p>
          </div>
        </section>

        <section>
          <h2>Optional Tap Learning</h2>
          <div>
            <p>
              <strong>Learn my tap positions</strong> is a keyboard option that
              is off by default and available only when autocorrect is on. When
              you turn it on, the keyboard keeps a running average of how far
              your taps land from the center of each letter key, plus a capped
              count of taps per key, and uses it to judge future taps. It learns
              only from words already in its word list that you typed and kept.
            </p>
            <p>
              It stores no letters in order, words, text, or timestamps. The
              averages are saved in the keyboard extension&apos;s local
              UserDefaults, are never uploaded or shared with the companion app,
              and are erased when you turn the option off or reset keyboard
              preferences.
            </p>
            <p>
              Version note: tap-aware correction, word-frequency ranking, and
              Learn my tap positions are new in version 1.0.2. Version 1.0.1 and
              earlier do not use tap points for correction or save tap offsets.
            </p>
          </div>
        </section>

        <section>
          <h2>Information Saved on Your Device</h2>
          <div>
            <p>
              TabForge deliberately saves the following information in local
              preferences storage:
            </p>
            <ul>
              <li>
                <strong>Keyboard preferences:</strong> layout, profile, theme,
                and editing choices in the keyboard extension&apos;s local
                UserDefaults.
              </li>
              <li>
                <strong>Custom snippets:</strong> text you choose to save for
                insertion later, stored with the keyboard extension&apos;s
                preferences.
              </li>
              <li>
                <strong>Learned tap offsets (optional, off by default):</strong>{" "}
                the average tap offset and a capped tap count for each letter
                key, in the keyboard extension&apos;s local UserDefaults, only
                while Learn my tap positions is on.
              </li>
              <li>
                <strong>Playground draft:</strong> the companion app&apos;s
                editor content in the app&apos;s separate local UserDefaults, so
                it can be restored between launches.
              </li>
            </ul>
            <p>
              The saved playground draft is separate from the keyboard&apos;s
              temporary typing context. Text entered or inserted into the
              playground is saved, including a voice transcript after you choose
              to insert it.
            </p>
            <p>
              The companion&apos;s keyboard and layout previews use a separate,
              in-memory set of settings and snippets. Preview changes are
              discarded when that app process ends. They do not configure the
              installed keyboard and are not saved as companion keyboard
              preferences. The playground draft remains saved independently.
            </p>
            <p>Do not put secrets in drafts or snippets.</p>
            <p>
              These records use the iOS application sandbox and the
              device&apos;s normal storage protections. TabForge does not add
              separate encryption or password protection to drafts, snippets, or
              preferences. Device backups and operating-system retention rules
              may apply.
            </p>
          </div>
        </section>

        <section>
          <h2>Managing and Deleting Local Data</h2>
          <div>
            <p>
              Resetting keyboard preferences in the keyboard clears its current
              settings and custom snippets, and turns Learn my tap positions off,
              which erases learned tap offsets. It does not clear the playground
              draft; delete or replace the playground text separately.
            </p>
            <p>
              The update retains an existing keyboard-local settings record when
              one is present. It does not read, import, or erase an older App
              Group record or the companion app&apos;s old keyboard preferences.
              Settings or snippets that existed only in those old locations are
              not automatically transferred.
            </p>
            <p>
              Those legacy records may remain under iOS storage and backup
              rules; removing the sharing capability is not a guarantee of
              erasure. Removing the app and keyboard removes their installed
              containers subject to iOS behavior; backups may retain earlier
              data.
            </p>
          </div>
        </section>

        <section>
          <h2>No Full Access or Shared Container</h2>
          <div>
            <p>
              This version does not request keyboard Full Access and does not
              configure an App Group. Keyboard settings and custom snippets are
              managed from the keyboard&apos;s gear menu and saved in its own
              container. The companion app does not read, write, or synchronize
              those records.
            </p>
            <p>
              Snippet names and text are edited in the keyboard&apos;s own
              settings interface. An unfinished snippet edit stays in memory
              until saved or cancelled; editing a snippet does not type its
              draft into the host app. The keyboard inserts a saved snippet into
              the host only when the user selects it for insertion.
            </p>
          </div>
        </section>

        <section>
          <h2>Voice Input, Dictation, and Writing Tools</h2>
          <div>
            <p>
              The keyboard extension does not record microphone audio. System
              dictation remains available where iOS provides it, and you can
              switch to the Apple keyboard.
            </p>
            <p>
              The companion app&apos;s <strong>Voice to code</strong> feature
              starts only after a user action and requests microphone and Speech
              Recognition permissions. It requires on-device English
              recognition. If that capability or language support is
              unavailable, TabForge does not fall back to cloud recognition.
            </p>
            <p>
              Audio buffers are passed to Apple&apos;s on-device Speech service;
              TabForge does not write recordings to a file. The transcript
              remains in the voice view until you dismiss it or insert it into
              the saved playground draft. Recording is cancelled when the view
              is dismissed, the app enters the background, or a relevant audio
              interruption occurs.
            </p>
            <p>
              Apple controls system Dictation and Writing Tools. Their
              availability and data handling depend on Apple&apos;s services and
              your system settings, rather than TabForge&apos;s on-device voice
              implementation. Review Apple&apos;s disclosures before invoking
              those features with sensitive material.
            </p>
          </div>
        </section>

        <section>
          <h2>Optional Tips through Apple</h2>
          <div>
            <p>
              The companion app&apos;s Tip Jar uses Apple&apos;s StoreKit service
              to load products and process optional, one-time tips. Tips do not
              unlock features or start a subscription. All app and keyboard
              features remain free to use. The keyboard extension has no
              purchase flow and shares no settings, snippets, or typing context
              with the companion app.
            </p>
            <p>
              Apple presents the purchase confirmation and handles payment
              information through its own network, account, and payment
              infrastructure. TabForge receives product and transaction results
              locally to display prices, handle cancellation or pending
              approval, verify completed tips, and finish transactions. It holds
              a bounded set of recent transaction identifiers in memory to avoid
              duplicate acknowledgements. It does not keep receipts, a tip
              total, or a purchase history in app preferences or files.
            </p>
            <p>
              TabForge does not send typing, snippets, playground text, or speech
              to StoreKit. It has no purchase backend, transaction upload,
              analytics service, or TabForge account. Apple maintains its own
              transaction records; not keeping app records does not remove
              Apple&apos;s records. Apple&apos;s handling of account, payment,
              and purchase information is described in{' '}
              <a
                href="https://www.apple.com/legal/privacy/data/en/app-store/"
                target="_blank"
                rel="noopener noreferrer"
              >
                App Store &amp; Privacy
              </a>
              .
            </p>
          </div>
        </section>

        <section>
          <h2>Other Apps, Sharing, and External Links</h2>
          <div>
            <p>
              When you use the keyboard extension, TabForge inserts text into
              the selected host app. That app may store or transmit it,
              including to a remote terminal or desktop. TabForge cannot control
              the recipient&apos;s processing. iOS uses the system keyboard in
              secure/password and phone fields, and apps may decline third-party
              keyboards.
            </p>
            <p>
              The playground&apos;s <strong>Share code</strong> action sends the
              current draft to the system share sheet only when you choose it.
              The destination you select receives the text and handles it under
              its own policies. Review the draft and recipient before sharing.
            </p>
            <p>
              Opening a repository or other external link is a user-initiated
              action handled by the system or browser. The destination receives
              an ordinary web request under its own privacy policy. TabForge
              does not attach typing context to these links. Licenses and
              notices are bundled and read locally.
            </p>
            <p>
              The keyboard extension does not launch the companion app.
              Configure the installed keyboard from its gear menu. The companion
              app contains setup and compatibility information, source/privacy
              links, credits, and licenses; it does not contain controls for the
              installed keyboard.
            </p>
          </div>
        </section>

        <section>
          <h2>Third-Party Resources</h2>
          <div>
            <p>
              TabForge includes no third-party code packages, SDKs, or network
              services. The word lists and theme colors below are bundled as
              static data and used offline on the device; Apple&apos;s frameworks
              come with iOS. Nothing you type is shared with any of these
              projects.
            </p>
            <ul>
              {TABFORGE_CREDITS.map((credit) => (
                <li key={credit.name}>
                  <a href={credit.href} target="_blank" rel="noopener noreferrer">
                    {credit.name}
                  </a>{" "}
                  ({credit.license}): {credit.use}
                </li>
              ))}
            </ul>
            <p>
              The full license texts and data provenance are in TabForge&apos;s{" "}
              <a
                href={TABFORGE_NOTICES_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                third-party notices
              </a>{" "}
              and in the companion app under Licenses &amp; notices.
            </p>
          </div>
        </section>

        <section>
          <h2>Diagnostics and Reports</h2>
          <div>
            <p>
              TabForge contains no typed-text logging or automatic diagnostic
              uploader. Apple may provide crash reports, TestFlight feedback,
              and device diagnostics according to your system and testing
              choices. The project does not intentionally add document text to
              those reports.
            </p>
            <p>
              If you choose to submit a bug report, any screenshots, logs, or
              other information you include are shared by your action. Use
              synthetic examples and check screenshots and logs before sharing.
              For a suspected vulnerability, follow the{" "}
              <a
                href="https://github.com/jdodsoncollins/TabForge/blob/main/SECURITY.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                TabForge security policy
              </a>{" "}
              and avoid including private typing in a public issue.
            </p>
          </div>
        </section>

        <section>
          <h2>Availability and Policy Updates</h2>
          <div>
            <p>
              TabForge is provided as-is, without a guarantee of availability,
              compatibility, data recovery, or continued support.
            </p>
            <p>
              This policy must be updated when the app changes its permissions,
              storage, dependencies, or data flow. Updates will appear on this
              page with a revised effective date. The app&apos;s{" "}
              <a
                href="https://github.com/jdodsoncollins/TabForge/blob/main/PRIVACY.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                privacy and data-handling documentation
              </a>{" "}
              and{" "}
              <a
                href="https://github.com/jdodsoncollins/TabForge"
                target="_blank"
                rel="noopener noreferrer"
              >
                public source code
              </a>{" "}
              provide implementation details and license notices.
            </p>
          </div>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For questions about this policy, contact{" "}
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
