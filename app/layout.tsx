import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Otaku Geek Congo - Festival de Culture Pop #1 en RDC",
    template: "%s | Otaku Geek Congo Festival",
  },
  description:
    "🎌 Le plus grand festival de culture pop japonaise en République Démocratique du Congo. Anime, manga, gaming, cosplay à Kinshasa. Billets dès 5$ - 12 Juillet 2025",
  keywords: [
    "otaku geek congo",
    "festival anime kinshasa",
    "manga congo rdc",
    "cosplay kinshasa",
    "gaming festival congo",
    "culture pop japonaise rdc",
    "anime convention kinshasa",
    "festival geek congo",
    "otaku congo",
    "anime kinshasa 2025",
    "manga festival rdc",
    "cosplay competition congo",
    "japanese culture kinshasa",
    "geek culture rdc",
  ],
  authors: [{ name: "Jonathan Manduara", url: "mailto:manduarajonathan.m@gmail.com" }],
  creator: "Jonathan Manduara",
  publisher: "Otaku Geek Congo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://otaku-geek-congo.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "fr-CD": "/fr",
      fr: "/fr",
    },
  },
  openGraph: {
    title: "Otaku Geek Congo - Festival de Culture Pop #1 en RDC",
    description:
      "🎌 Le plus grand festival de culture pop japonaise en RDC. Anime, manga, gaming, cosplay à Kinshasa. Billets dès 5$ - 12 Juillet 2025",
    url: "https://otaku-geek-congo.vercel.app",
    siteName: "Otaku Geek Congo Festival",
    images: [
      {
        url: "/logo-ogc.png",
        width: 1200,
        height: 630,
        alt: "Otaku Geek Congo Festival - Culture Pop Japonaise en RDC",
      },
    ],
    locale: "fr_CD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Otaku Geek Congo - Festival de Culture Pop #1 en RDC",
    description:
      "🎌 Le plus grand festival de culture pop japonaise en RDC. Anime, manga, gaming, cosplay à Kinshasa. Billets dès 5$ - 12 Juillet 2025",
    images: ["/logo-ogc.png"],
    creator: "@otakugeekcongo",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "entertainment",
  classification: "Festival, Culture Pop, Anime, Manga, Gaming, Cosplay",
  generator: "Next.js",
  applicationName: "Otaku Geek Congo Festival",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dc2626" },
    { media: "(prefers-color-scheme: dark)", color: "#dc2626" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: "/logo-ogc.png",
    shortcut: "/logo-ogc.png",
    apple: "/logo-ogc.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo-ogc.png",
    },
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr-CD" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://jbyhqwlt.mychariow.com" />
        <meta name="geo.region" content="CD-KN" />
        <meta name="geo.placename" content="Kinshasa" />
        <meta name="geo.position" content="-4.4419;15.2663" />
        <meta name="ICBM" content="-4.4419, 15.2663" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Otaku Geek Congo Festival 2025",
              description: "Le plus grand festival de culture pop japonaise en République Démocratique du Congo",
              image: "https://otaku-geek-congo.vercel.app/logo-ogc.png",
              startDate: "2025-07-12T10:00:00+01:00",
              endDate: "2025-07-12T20:00:00+01:00",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "Cave de Bacchus",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "C/Ngaliema Q/Ancien combattant, Av/Mosawa - Arrêt deuxième avenue",
                  addressLocality: "Kinshasa",
                  addressCountry: "CD",
                },
              },
              organizer: {
                "@type": "Organization",
                name: "Otaku Geek Congo",
                email: "Otakugeekcongo@gmail.com",
                telephone: "+243820599547",
              },
              offers: [
                {
                  "@type": "Offer",
                  name: "Pass Standard",
                  price: "5",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://jbyhqwlt.mychariow.com/prd_4h0biy",
                },
                {
                  "@type": "Offer",
                  name: "Pass VIP",
                  price: "10",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://jbyhqwlt.mychariow.com/prd_7qw58u",
                },
                {
                  "@type": "Offer",
                  name: "Pass Stand Expo",
                  price: "40",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://jbyhqwlt.mychariow.com/prd_kb6jyl",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
