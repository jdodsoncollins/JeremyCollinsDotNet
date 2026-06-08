import Link from "next/link";
import { CircuitBackground } from "@/components/circuit-background";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <CircuitBackground />
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center px-6 py-32">
          <section className="w-full max-w-2xl border border-border/70 bg-card/80 p-8 shadow-2xl backdrop-blur-sm md:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
              404
            </p>
            <h1 className="mt-4 font-display text-4xl font-black leading-tight text-foreground md:text-6xl">
              Page Not Found
            </h1>
            <p className="mt-5 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
              This route does not exist, moved, or never shipped. The rest of
              the site is still available.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 border border-primary px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Return Home
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
