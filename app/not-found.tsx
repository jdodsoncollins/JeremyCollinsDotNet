import Link from "next/link";
import { CircuitBackground } from "@/components/circuit-background";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <CircuitBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center px-6 py-32">
          <section className="w-full max-w-2xl border border-border bg-card p-8 md:p-12">
            <p className="text-sm text-muted-foreground">
              404
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
              Nothing here
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              This page moved, or it never shipped. Everything else is still up.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center px-4 py-2 border border-border text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Back home
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
