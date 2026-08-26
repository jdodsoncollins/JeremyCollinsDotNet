import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jeremycollins.net"),
  title: {
    default: "Jeremy Collins",
    template: "%s | Jeremy Collins",
  },
  description:
    "Software engineer at Webflow in Los Angeles. Makes Codable, Safari-native web developer tools for iOS.",
  keywords: [
    "Jeremy Collins",
    "software engineer",
    "Webflow",
    "Codable",
    "iOS developer tools",
    "Safari",
  ],
  authors: [{ name: "Jeremy Collins", url: "https://jeremycollins.net" }],
  creator: "Jeremy Collins",
  publisher: "Jeremy Collins",
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
    title: "Jeremy Collins",
    description:
      "Software engineer at Webflow in Los Angeles. Makes Codable, Safari developer tools for iOS.",
    url: "https://jeremycollins.net",
    siteName: "JeremyCollins.net",
    type: "profile",
    locale: "en_US",
    firstName: "Jeremy",
    lastName: "Collins",
    images: [
      {
        url: "/logo.png",
        width: 600,
        height: 600,
        alt: "Jeremy Collins",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Jeremy Collins",
    creator: "jdodsoncollins",
    description:
      "Software engineer at Webflow in Los Angeles. Makes Codable, Safari developer tools for iOS.",
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
    const themes = ["1980s", "1990s", "2000s", "modern"];
    const saved = window.localStorage.getItem(key);
    const theme = themes.includes(saved || "")
      ? saved
      : themes[Math.floor(Math.random() * themes.length)];

    document.documentElement.dataset.era = theme || "1980s";
  } catch {
    document.documentElement.dataset.era = "1980s";
  }

  try {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        for (const reg of regs) reg.unregister();
      });
    }
    if (window.caches) {
      caches.keys().then((keys) => {
        for (const key of keys) caches.delete(key);
      });
    }
  } catch {}
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
      className={`${ibmPlexSans.variable} ${spaceMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
        <div className="hacf-scanlines" aria-hidden="true" />
        <div className="hacf-grain" aria-hidden="true" />
        <Analytics />
      </body>
    </html>
  );
}
