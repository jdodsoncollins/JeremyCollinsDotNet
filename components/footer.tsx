"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <span suppressHydrationWarning>{year ?? new Date().getFullYear()}</span>
            {" "}Jeremy Collins
          </div>
          <p className="text-xs text-muted-foreground">
            A small personal one-pager. Might as well make it fun.
          </p>
        </div>
      </div>
    </footer>
  );
}
