import type { Metadata } from "next";
import Link from "next/link";
import { CircuitBackground } from "@/components/circuit-background";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Paper & Grain Support",
  description:
    "Get started with Paper & Grain, a free, relaxing paper-folding game for iPhone and iPad. Gesture help, saved-paper recovery, compatibility, and support.",
  alternates: { canonical: "/paper-and-grain" },
  openGraph: {
    title: "Paper & Grain Support",
    description:
      "A quiet workshop for folding, cutting, and drawing on paper. Help for Jeremy Collins' free iPhone and iPad game.",
    url: "/paper-and-grain",
    type: "website",
  },
};

export default function PaperAndGrainSupport() {
  return (
    <div className="relative min-h-screen">
      <CircuitBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-32 md:pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-12">
              <p className="font-mono text-neon-cyan text-sm mb-3">
                A quiet workshop in paper
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Paper &amp; Grain support
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                Fold a sheet, cut it, draw on it, or turn it over. Follow a
                lesson or explore Free Fold at your own pace. There is no
                timer, and you cannot lose.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                Paper &amp; Grain is free for iPhone and iPad running iOS or
                iPadOS 26 or later. Its layouts and folding interactions are
                designed for iPhone Duo. There are no accounts, ads,
                subscriptions, or in-app purchases.
              </p>
            </div>

            <article className="prose prose-invert max-w-none overflow-hidden">
              <div className="space-y-10 text-muted-foreground p-8 md:p-10 lg:p-12">
                <section className="border-l-2 border-neon-green pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">
                    Where to begin
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      Start with First Fold, the suggested lesson on the main
                      menu. The lesson pages and Guidebook take you through one
                      movement at a time. You can revisit any of the eight
                      included lessons or choose Free Fold to work on your own
                      paper.
                    </p>
                    <p>
                      Drag the controls card up to read more of a lesson, or
                      down to give the paper more room. You can open the
                      Guidebook while you work.
                    </p>
                  </div>
                </section>

                <section className="border-l-2 border-neon-magenta pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">
                    Move the view and fold the paper
                  </h2>
                  <ul className="space-y-3 text-sm leading-relaxed list-disc pl-5">
                    <li>
                      Place two fingers on the wood. Pinch to zoom, slide both
                      fingers in the same direction to change the perspective,
                      or twist to rotate. You can rotate all the way around to
                      see the underside.
                    </li>
                    <li>
                      Drag one finger on the wood to position the paper across
                      the fold guide.
                    </li>
                    <li>
                      Pinch on the paper to fold or unfold. Let the fold
                      settle before starting the next crease.
                    </li>
                    <li>
                      In Position, pull one of the original sheet corners inward
                      to curl it, then release to settle a fold. To cancel the
                      curl, move back toward the corner where you started.
                    </li>
                    <li>
                      On a supported Duo, line up the paper with the center
                      guide before folding the device. Device folding requires
                      iOS 27.1 or later. Touch gestures are also available.
                    </li>
                  </ul>
                </section>

                <section className="border-l-2 border-neon-cyan pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">
                    Bring the paper back into view
                  </h2>
                  <p className="text-sm leading-relaxed">
                    Choose Center &amp; top view if the paper moves off screen
                    or becomes difficult to see. It centers the paper and
                    restores a view from above without undoing your folds. Use
                    Undo and Redo to change the paper itself.
                  </p>
                </section>

                <section className="border-l-2 border-neon-green pl-6">
                  <h2 className="font-display text-xl text-foreground mb-4">
                    Saved papers and sharing
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      The app saves completed edits on your device. Open Gallery
                      to return to a saved paper. If a save fails, keep the
                      current paper open and retry the save. If an
                      earlier save can be recovered, the app offers Open earlier
                      save.
                    </p>
                    <p>
                      Sharing starts with an image preview. Choose Share image
                      to open the system share sheet and select a destination.
                      Cancelling leaves your paper unchanged.
                    </p>
                    <p>
                      The workshop and bundled lessons work offline. The app
                      does not provide cloud sync. Exported images and system
                      backups are separate from your local gallery.
                    </p>
                  </div>
                </section>

                <section className="border border-border bg-card/30 p-6">
                  <h2 className="font-display text-xl text-foreground mb-4">
                    Contact Jeremy
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      <a href="mailto:jeremy@jeremycollins.net?subject=Paper%20%26%20Grain%20support" className="text-neon-green hover:underline break-words">
                        Email jeremy@jeremycollins.net
                      </a>{" "}
                      with your app version, device model, iOS or iPadOS version,
                      and the steps that led to the issue. A screenshot or short
                      recording can help explain a gesture problem.
                    </p>
                    <p>
                      <Link href="/paper-and-grain-privacy-policy" className="text-neon-green hover:underline">
                        Read the Paper &amp; Grain privacy policy
                      </Link>.
                    </p>
                  </div>
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
