import type { Metadata, Viewport } from "next"
import { IBM_Plex_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "JeremyCollins.net",
    template: "%s | JeremyCollins.net",
  },
  description: "Jeremy Collins' web presence",
  metadataBase: new URL("https://jeremycollins.net"),
  openGraph: {
    title: "JeremyCollins.net",
    description: "Jeremy Collins' web presence",
    url: "https://jeremycollins.net",
    siteName: "JeremyCollins.net",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className={`${ibmPlexSans.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider>
          <div className="max-w-2xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
