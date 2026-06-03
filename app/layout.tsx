import type { Metadata, Viewport } from "next";
import { Space_Mono, Orbitron } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jeremycollins.net"),
  title: {
    default: "Jeremy Collins | Product Engineer",
    template: "%s | Jeremy Collins",
  },
  description:
    "Jeremy Collins is a product engineer with a full-stack background, focused on web products, agentic tooling, automation, and independent iOS software.",
  keywords: [
    "Jeremy Collins",
    "product engineer",
    "software engineer",
    "web developer",
    "agentic tooling",
    "automation",
    "Codable",
    "iOS developer tools",
  ],
  authors: [{ name: "Jeremy Collins" }],
  creator: "Jeremy Collins",
  publisher: "Jeremy Collins",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Jeremy Collins | Product Engineer",
    description:
      "Product engineer focused on web products, agentic tooling, automation, and independent iOS software.",
    url: "/",
    siteName: "JeremyCollins.net",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 600,
        height: 600,
        alt: "Jeremy Collins logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Jeremy Collins | Product Engineer",
    description:
      "Product engineer focused on web products, agentic tooling, automation, and independent iOS software.",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0608",
  width: "device-width",
  initialScale: 1,
};

const themeInitScript = `
(() => {
  try {
    const key = "jeremycollins-theme-era";
    const themes = ["1980s", "1990s", "2000s"];
    const saved = window.localStorage.getItem(key);
    const theme = themes.includes(saved || "")
      ? saved
      : themes[Math.floor(Math.random() * themes.length)];

    document.documentElement.dataset.era = theme || "1980s";
  } catch {
    document.documentElement.dataset.era = "1980s";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-era="1980s"
      suppressHydrationWarning
      className={`${spaceMono.variable} ${orbitron.variable} bg-background`}
    >
      <body className="font-mono antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
        {/* HACF-inspired overlay effects */}
        <div className="hacf-scanlines" aria-hidden="true" />
        <div className="hacf-grain" aria-hidden="true" />
        <div className="hacf-sweep-line" aria-hidden="true" />
        <div className="hacf-sweep-line-2" aria-hidden="true" />
        <Analytics />
      </body>
    </html>
  );
}
