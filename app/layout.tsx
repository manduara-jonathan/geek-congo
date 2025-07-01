import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Otaku Geek Congo - Festival de Culture Pop",
  description:
    "Le plus grand festival de culture pop japonaise en République Démocratique du Congo. Anime, manga, gaming et cosplay.",
  keywords: "otaku, geek, congo, festival, anime, manga, cosplay, gaming, kinshasa",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
