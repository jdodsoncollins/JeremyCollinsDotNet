import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CircuitBackground } from "@/components/circuit-background";
import { tabforgePrivacyJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "TabForge Privacy Policy",
  description: "Privacy policy for TabForge: Code Keyboard. Learn about keyboard-local settings and snippets, no Full Access request, separate playground drafts, and on-device voice recognition.",
  alternates: { canonical: "/tabforge-privacy-policy" },
  openGraph: {
    title: "TabForge Privacy Policy",
    description: "How TabForge handles typing context, local storage, keyboard permissions, and on-device voice recognition.",
    url: "/tabforge-privacy-policy",
    type: "article",
  },
};

export default function TabForgePrivacyPolicy() {
  return (
    <div className="relative min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tabforgePrivacyJsonLd) }} />
      <CircuitBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-32 md:pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-12"><h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">TabForge Privacy Policy</h1><p className="text-muted-foreground text-sm">Effective date: October 18, 2026</p></div>
            <article className="prose prose-invert max-w-none overflow-hidden">
              <div className="space-y-10 text-muted-foreground p-8 md:p-10 lg:p-12">
                <p className="leading-relaxed">TabForge: Code Keyboard is a keyboard extension and companion app for programming, scripting, terminals, and remote desktops on iPhone and iPad. This policy explains the information TabForge uses while you type, what it stores locally, and how its optional features work.</p>
                <p className="leading-relaxed">TabForge&apos;s app and keyboard contain no analytics, advertising, account system, application networking service, or automatic diagnostic uploader. The keyboard does not transmit keystrokes, surrounding text, snippets, swipe gestures, or spelling requests to a TabForge server. The code is available for inspection under the repository&apos;s <a href="https://github.com/jdodsoncollins/TabForge/blob/main/LICENSE" className="text-neon-green hover:underline" target="_blank" rel="noopener noreferrer">MIT license</a>.</p>
                <p className="text-sm leading-relaxed">This policy covers the app and keyboard extension. It does not describe this website, the apps you type into, terminal or remote-desktop services, Apple system features, external websites, or device backup providers, which have their own data practices.</p>

                <section className="border-l-2 border-neon-green pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">Typing Context and Information Held in Memory</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>iOS and the host app may expose limited text and field information to the keyboard through Apple&apos;s UITextDocumentProxy interface. TabForge uses that context on the device for editing, indentation, completions, cursor movement, and optional spelling correction. Host apps can limit or withhold context. TabForge does not build a keystroke history or save the host document.</p>
                    <p>The optional, experimental swipe recognizer uses an included coding vocabulary. Gesture traces and alternatives are temporary; they are not uploaded or used to train a model. Swipe recognition is off by default.</p>
                    <p>Optional English prose correction uses Apple&apos;s UITextChecker on the device. When enabled, it can request Apple&apos;s supplementary keyboard lexicon, which may include names and text shortcuts. A bounded set is held in memory to avoid correcting those words; TabForge does not save or log the lexicon.</p>
                    <p>Correction state, spelling resources, swipe traces, repeat tasks, and held-key state are released when the keyboard is dismissed or receives a memory warning. Normal operating-system memory management still applies; this is not a guarantee of secure memory erasure.</p>
                  </div>
                </section>

                <section className="border-l-2 border-neon-magenta pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">Information Saved on Your Device</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>TabForge deliberately saves the following information in local preferences storage:</p>
                    <ul className="list-disc pl-5 space-y-2"><li><strong className="text-foreground">Keyboard preferences:</strong> layout, profile, theme, and editing choices in the keyboard extension&apos;s local UserDefaults.</li><li><strong className="text-foreground">Custom snippets:</strong> text you choose to save for insertion later, stored with the keyboard extension&apos;s preferences.</li><li><strong className="text-foreground">Playground draft:</strong> the companion app&apos;s editor content in the app&apos;s separate local UserDefaults, so it can be restored between launches.</li></ul>
                    <p>The saved playground draft is separate from the keyboard&apos;s temporary typing context. Text entered or inserted into the playground is saved, including a voice transcript after you choose to insert it.</p>
                    <p>The companion&apos;s keyboard and layout previews use a separate, in-memory set of settings and snippets. Preview changes are discarded when that app process ends. They do not configure the installed keyboard and are not saved as companion keyboard preferences. The playground draft remains saved independently.</p>
                    <p>Do not put secrets in drafts or snippets.</p>
                    <p>These records use the iOS application sandbox and the device&apos;s normal storage protections. TabForge does not add separate encryption or password protection to drafts, snippets, or preferences. Device backups and operating-system retention rules may apply.</p>
                  </div>
                </section>

                <section className="border-l-2 border-neon-cyan pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">Managing and Deleting Local Data</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>Resetting keyboard preferences in the keyboard clears its current settings and custom snippets. It does not clear the playground draft; delete or replace the playground text separately.</p>
                    <p>The update retains an existing keyboard-local settings record when one is present. It does not read, import, or erase an older App Group record or the companion app&apos;s old keyboard preferences. Settings or snippets that existed only in those old locations are not automatically transferred.</p>
                    <p>Those legacy records may remain under iOS storage and backup rules; removing the sharing capability is not a guarantee of erasure. Removing the app and keyboard removes their installed containers subject to iOS behavior; backups may retain earlier data.</p>
                  </div>
                </section>

                <section className="border-l-2 border-neon-green pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">No Full Access or Shared Container</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>This version does not request keyboard Full Access and does not configure an App Group. Keyboard settings and custom snippets are managed from the keyboard&apos;s gear menu and saved in its own container. The companion app does not read, write, or synchronize those records.</p>
                    <p>Snippet names and text are edited in the keyboard&apos;s own settings interface. An unfinished snippet edit stays in memory until saved or cancelled; editing a snippet does not type its draft into the host app. The keyboard inserts a saved snippet into the host only when the user selects it for insertion.</p>
                  </div>
                </section>

                <section className="border-l-2 border-neon-magenta pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">Voice Input, Dictation, and Writing Tools</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>The keyboard extension does not record microphone audio. System dictation remains available where iOS provides it, and you can switch to the Apple keyboard.</p>
                    <p>The companion app&apos;s <strong className="text-foreground">Voice to code</strong> feature starts only after a user action and requests microphone and Speech Recognition permissions. It requires on-device English recognition. If that capability or language support is unavailable, TabForge does not fall back to cloud recognition.</p>
                    <p>Audio buffers are passed to Apple&apos;s on-device Speech service; TabForge does not write recordings to a file. The transcript remains in the voice view until you dismiss it or insert it into the saved playground draft. Recording is cancelled when the view is dismissed, the app enters the background, or a relevant audio interruption occurs.</p>
                    <p>Apple controls system Dictation and Writing Tools. Their availability and data handling depend on Apple&apos;s services and your system settings, rather than TabForge&apos;s on-device voice implementation. Review Apple&apos;s disclosures before invoking those features with sensitive material.</p>
                  </div>
                </section>

                <section className="border-l-2 border-neon-cyan pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">Other Apps, Sharing, and External Links</h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>When you use the keyboard extension, TabForge inserts text into the selected host app. That app may store or transmit it, including to a remote terminal or desktop. TabForge cannot control the recipient&apos;s processing. iOS uses the system keyboard in secure/password and phone fields, and apps may decline third-party keyboards.</p>
                    <p>The playground&apos;s <strong className="text-foreground">Share code</strong> action sends the current draft to the system share sheet only when you choose it. The destination you select receives the text and handles it under its own policies. Review the draft and recipient before sharing.</p>
                    <p>Opening a repository or other external link is a user-initiated action handled by the system or browser. The destination receives an ordinary web request under its own privacy policy. TabForge does not attach typing context to these links. Licenses and notices are bundled and read locally.</p>
                    <p>The keyboard extension does not launch the companion app. Configure the installed keyboard from its gear menu. The companion app contains setup and compatibility information, source/privacy links, credits, and licenses; it does not contain controls for the installed keyboard.</p>
                  </div>
                </section>

                <section className="border-l-2 border-neon-green pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">Diagnostics and Reports</h2>
                  <div className="space-y-4 text-sm leading-relaxed"><p>TabForge contains no typed-text logging or automatic diagnostic uploader. Apple may provide crash reports, TestFlight feedback, and device diagnostics according to your system and testing choices. The project does not intentionally add document text to those reports.</p><p>If you choose to submit a bug report, any screenshots, logs, or other information you include are shared by your action. Use synthetic examples and check screenshots and logs before sharing. For a suspected vulnerability, follow the <a href="https://github.com/jdodsoncollins/TabForge/blob/main/SECURITY.md" className="text-neon-green hover:underline" target="_blank" rel="noopener noreferrer">TabForge security policy</a> and avoid including private typing in a public issue.</p></div>
                </section>

                <section className="border-l-2 border-neon-magenta pl-6"><h2 className="font-display text-xl text-foreground mb-4">Availability and Policy Updates</h2><div className="space-y-4 text-sm leading-relaxed"><p>TabForge is provided as-is, without a guarantee of availability, compatibility, data recovery, or continued support.</p><p>This policy must be updated when the app changes its permissions, storage, dependencies, or data flow. Updates will appear on this page with a revised effective date. The app&apos;s <a href="https://github.com/jdodsoncollins/TabForge/blob/main/PRIVACY.md" className="text-neon-green hover:underline" target="_blank" rel="noopener noreferrer">privacy and data-handling documentation</a> and <a href="https://github.com/jdodsoncollins/TabForge" className="text-neon-green hover:underline" target="_blank" rel="noopener noreferrer">public source code</a> provide implementation details and license notices.</p></div></section>

                <section className="border border-border bg-card/30 p-6 mt-8"><h2 className="font-display text-xl text-foreground mb-4">Contact</h2><p className="text-sm leading-relaxed">For questions about this policy, contact <a href="mailto:jeremy@jeremycollins.net" className="text-neon-green hover:underline">jeremy@jeremycollins.net</a>.</p></section>
              </div>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
