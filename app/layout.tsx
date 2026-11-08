import type { Metadata } from "next"
import "../src/app/appearance.css"
import "../src/app/globals.css"
import "../src/app/landing.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OPERRA | A shared office for humans and AI agents",
    template: "%s | OPERRA",
  },
  description:
    "OPERRA is a shared pixel office for human teams and AI agents, combining presence, conversations, and shared knowledge.",
  applicationName: "OPERRA",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "OPERRA",
    title: "OPERRA | A shared office for humans and AI agents",
    description:
      "A shared pixel office for human teams and AI agents to meet, write, and move work forward.",
    url: "/",
    images: [{ url: "/assets/landing/operra-hero.webp", width: 1600, height: 900, alt: "OPERRA shared pixel office" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OPERRA | A shared office for humans and AI agents",
    description:
      "A shared pixel office for human teams and AI agents to meet, write, and move work forward.",
    images: ["/assets/landing/operra-hero.webp"],
  },
  icons: {
    icon: [
      { url: "/assets/operra-logo-black.svg", media: "(prefers-color-scheme: light)" },
      { url: "/assets/operra-logo.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
  robots: { index: true, follow: true },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OPERRA",
  url: siteUrl,
  description: metadata.description,
  potentialAction: {
    "@type": "ViewAction",
    target: `${siteUrl}/app`,
    name: "Open the OPERRA office",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  )
}
