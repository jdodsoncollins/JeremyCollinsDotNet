import type { Metadata, Viewport } from "next";
import { Space_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Jeremy Collins | Software Developer",
  description:
    "Full-stack software developer focused on front-end web development and product engineering.",
  keywords: ["software developer", "web developer", "front-end", "product engineer"],
  authors: [{ name: "Jeremy Collins" }],
  openGraph: {
    title: "Jeremy Collins | Software Developer",
    description:
      "Full-stack software developer focused on front-end web development and product engineering.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Jeremy Collins | Software Developer",
    description:
      "Full-stack software developer focused on front-end web development and product engineering.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${orbitron.variable} bg-background`}>
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
