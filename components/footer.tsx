export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground font-mono">
            <span className="text-neon-green">&copy;</span> {new Date().getFullYear()}{" "}
            <span className="text-foreground">Jeremy Collins</span>
          </div>
          <p className="text-xs text-muted-foreground/60 font-mono">
            <span className="text-circuit">{"</"}</span>
            <span className="text-neon-green">built_with</span>
            <span className="text-circuit">{">"}</span>{" "}
            Next.js + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
