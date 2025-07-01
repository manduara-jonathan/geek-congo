"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download } from "lucide-react"
import { useCartStore } from "@/lib/store"

export default function GaleriePage() {
  const { clearCart } = useCartStore()

  const handleBuyTickets = () => {
    clearCart()
    window.location.href = "/"
  }

  const affiches = [
    {
      src: "/affiches/affiche-principale.jpg",
      title: "Affiche Principale",
      description: "L'affiche officielle du festival avec toutes les informations essentielles",
      date: "12 Juillet 2025",
      details: "Samedi de 10h à 20h - Ngaliema, Kinshasa",
    },
    {
      src: "/affiches/affiche-activites.jpg",
      title: "Programme d'Activités",
      description: "Découvrez toutes les activités prévues lors du festival",
      activities: ["Stands & Jeux vidéos", "Karaoké & Expérience culinaire", "Cosplay & Expo", "Mix DJ K-Pop"],
    },
    {
      src: "/affiches/affiche-stand.jpg",
      title: "Stands d'Exposition",
      description: "Réservez votre stand d'exposition pour présenter vos créations",
      price: "40$",
      note: "Réservation jusqu'au 06 juillet uniquement",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-red-500/20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-white hover:text-red-400 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Galerie d'Affiches</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez l'univers visuel du festival Otaku Geek Congo à travers nos affiches officielles
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {affiches.map((affiche, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden">
              <div className="relative group">
                <Image
                  src={affiche.src || "/placeholder.svg"}
                  alt={affiche.title}
                  width={600}
                  height={800}
                  className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Button
                  size="sm"
                  className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{affiche.title}</h3>
                <p className="text-gray-300 mb-4">{affiche.description}</p>

                {affiche.date && (
                  <div className="mb-2">
                    <span className="text-red-400 font-semibold">📅 {affiche.date}</span>
                    <p className="text-sm text-gray-400">{affiche.details}</p>
                  </div>
                )}

                {affiche.activities && (
                  <div className="mb-2">
                    <span className="text-red-400 font-semibold">🎯 Activités :</span>
                    <ul className="text-sm text-gray-300 mt-1">
                      {affiche.activities.map((activity, i) => (
                        <li key={i}>• {activity}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {affiche.price && (
                  <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Prix : {affiche.price}</span>
                    </div>
                    <p className="text-xs text-gray-300 mt-1">{affiche.note}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3" onClick={handleBuyTickets}>
            Acheter mes billets maintenant
          </Button>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-black/50 border-t border-red-500/20 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image src="/logo-ogc.png" alt="Otaku Geek Congo Logo" width={40} height={40} className="rounded" />
                <div>
                  <h3 className="text-white font-bold">Otaku Geek Congo</h3>
                  <p className="text-gray-400 text-sm">Festival de culture pop</p>
                </div>
              </div>
              <p className="text-gray-300">
                Le rendez-vous incontournable des passionnés d'anime, manga et gaming en RDC.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>📧 Otakugeekcongo@gmail.com</p>
                <p>📱 +243 820 599 547</p>
                <p>📍 Kinshasa, RDC</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
              <div className="space-y-2 text-gray-300">
                <p>Facebook: @otakugeekcongo</p>
                <p>Instagram: @otakugeekcongo</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Otaku Geek Congo. Tous droits réservés.</p>
            <p className="text-sm mt-2">
              Conçu par{" "}
              <a
                href="mailto:manduarajonathan.m@gmail.com"
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Jonathan Manduara
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
