"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Star, Ticket, Clock, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

// Composant de chargement pour les images
function ImageWithFallback({ src, alt, ...props }: any) {
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      {...props}
    />
  )
}

export default function HomePage() {
  const ticketTypes = [
    {
      id: 1,
      name: "Pass Standard",
      price: "5",
      currency: "$",
      description: "Accès complet pour une journée",
      features: ["Accès à tous les stands", "Concours cosplay", "Projections anime"],
      popular: false,
      image: "/billets/billet-standard.png",
      chariowUrl: "https://jbyhqwlt.mychariow.com/prd_4h0biy",
    },
    {
      id: 2,
      name: "Pass VIP",
      price: "10",
      currency: "$",
      description: "Accès complet pour tout le weekend + avantages VIP",
      features: [
        "Accès à tous les stands",
        "Concours cosplay",
        "Projections anime",
        "Boissons incluses",
        "Repas inclus",
        "Goodies exclusifs",
      ],
      popular: true,
      image: "/billets/billet-vip.png",
      chariowUrl: "https://jbyhqwlt.mychariow.com/prd_7qw58u",
    },
    {
      id: 3,
      name: "Pass Stand Expo",
      price: "40",
      currency: "$",
      description: "Expérience premium complète avec stand d'exposition",
      features: [
        "Accès prioritaire",
        "Zone VIP",
        "Stand d'exposition personnalisé",
        "Goodies premium",
        "Photo avec les invités",
        "Catégories : Merch, FanArt, Doujinshi, Cosplay, Articles",
      ],
      popular: false,
      image: "/billets/billet-stand-expo.png",
      chariowUrl: "https://jbyhqwlt.mychariow.com/prd_kb6jyl",
    },
  ]

  const handleTicketPurchase = (chariowUrl: string) => {
    window.open(chariowUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-red-500/20 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ImageWithFallback
              src="/logo-ogc.png"
              alt="Otaku Geek Congo Logo - Festival de Culture Pop Japonaise en RDC"
              width={60}
              height={60}
              className="rounded-lg"
              priority
            />
            <div>
              <h1 className="text-xl font-bold text-white">OGC Festival</h1>
              <p className="text-sm text-gray-300">Otaku Geek Congo</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6" role="navigation" aria-label="Navigation principale">
            <Link href="#accueil" className="text-white hover:text-red-400 transition-colors">
              Accueil
            </Link>
            <Link href="#billets" className="text-white hover:text-red-400 transition-colors">
              Billets
            </Link>
            <Link href="#programme" className="text-white hover:text-red-400 transition-colors">
              Programme
            </Link>
            <Link href="/galerie" className="text-white hover:text-red-400 transition-colors">
              Galerie
            </Link>
            <Link href="#contact" className="text-white hover:text-red-400 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <ImageWithFallback
              src="/logo-ogc.png"
              alt="Otaku Geek Congo Festival - Le plus grand festival de culture pop japonaise en RDC"
              width={300}
              height={300}
              className="mx-auto mb-8"
              priority
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            OTAKU GEEK
            <span className="text-red-500 block">CONGO</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            🎌 Le plus grand festival de culture pop japonaise en République Démocratique du Congo 🇨🇩
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-white">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-400" />
              <span>12 Juillet 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-400" />
              <span>Cave de Bacchus - Ngaliema, Kinshasa</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-red-400" />
              <span>2000+ participants attendus</span>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
            onClick={() => document.getElementById("billets")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Acheter des billets pour le festival Otaku Geek Congo"
          >
            <Ticket className="w-5 h-5 mr-2" />
            Acheter mes billets dès 5$
          </Button>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="billets" className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Choisissez votre pass</h2>
            <p className="text-gray-300 text-lg">💳 Paiement sécurisé via Chariow - Billets dès 5$ seulement!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ticketTypes.map((ticket) => (
              <Card
                key={ticket.id}
                className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300 ${ticket.popular ? "ring-2 ring-red-500" : ""}`}
              >
                {ticket.popular && (
                  <Badge className="absolute top-4 left-4 bg-red-600 text-white z-10">
                    <Star className="w-3 h-3 mr-1" />
                    Populaire
                  </Badge>
                )}

                {/* Ticket Image */}
                <div className="relative">
                  <Suspense fallback={<div className="w-full h-64 bg-gray-700 animate-pulse" />}>
                    <ImageWithFallback
                      src={ticket.image || "/placeholder.svg"}
                      alt={`Billet ${ticket.name} - Festival Otaku Geek Congo ${ticket.price}${ticket.currency}`}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                  </Suspense>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-1">{ticket.name}</h3>
                    <div className="text-2xl font-bold text-red-400">
                      {ticket.price} <span className="text-lg text-gray-400">{ticket.currency}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-300 mb-4">{ticket.description}</p>

                  <ul className="space-y-2 mb-6">
                    {ticket.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300 text-sm">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${ticket.popular ? "bg-red-600 hover:bg-red-700" : "bg-slate-700 hover:bg-slate-600"} text-white`}
                    onClick={() => handleTicketPurchase(ticket.chariowUrl)}
                    aria-label={`Acheter le billet ${ticket.name} pour ${ticket.price}${ticket.currency}`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Acheter {ticket.price}$ via Chariow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment Info */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="bg-blue-900/20 border-blue-500/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">💳 Paiement 100% Sécurisé</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-white">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="bg-white rounded-lg p-2">
                    <span className="text-blue-600 font-bold text-lg">CHARIOW</span>
                  </div>
                  <div className="text-gray-300">
                    <p>Plateforme de paiement sécurisée certifiée</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  🔒 Tous les paiements sont traités de manière sécurisée via Chariow. Vous serez redirigé vers leur
                  plateforme pour finaliser votre achat en toute sécurité.
                </p>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h3 className="font-semibold text-blue-400 mb-2">💳 Moyens de paiement acceptés</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Mobile Money (M-Pesa, Orange Money, Airtel Money)</li>
                      <li>• Cartes bancaires Visa/Mastercard</li>
                      <li>• Virements bancaires</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-400 mb-2">📧 Après votre achat</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Confirmation par email immédiate</li>
                      <li>• Billet électronique joint</li>
                      <li>• Support client 24/7 disponible</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event Details */}
          <div className="mt-8 max-w-4xl mx-auto">
            <Card className="bg-red-900/20 border-red-500/30 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">📅 Informations de l'événement</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6 text-white">
                <div>
                  <h3 className="font-semibold text-red-400 mb-2">📅 Date & Horaires</h3>
                  <p>Samedi 12 Juillet 2025</p>
                  <p>De 10h00 à 20h00 (10 heures de festival!)</p>
                </div>
                <div>
                  <h3 className="font-semibold text-red-400 mb-2">📍 Lieu</h3>
                  <p>Cave de Bacchus</p>
                  <p>C/Ngaliema Q/Ancien combattant</p>
                  <p>Av/Mosawa - Arrêt deuxième avenue</p>
                  <p>Kinshasa, République Démocratique du Congo 🇨🇩</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Preview */}
      <section id="programme" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">🎯 Programme du Festival</h2>
            <p className="text-gray-300 text-lg">
              Découvrez les activités qui vous attendent lors de cette journée exceptionnelle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-red-400" />
                  Concours Cosplay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">🏆 Défilez dans vos plus beaux costumes et gagnez des prix incroyables</p>
                <div className="flex items-center mt-3 text-sm text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  Samedi 14h-17h
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Star className="w-5 h-5 mr-2 text-red-400" />
                  Projections Anime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">📺 Découvrez les derniers animes et films d'animation japonais</p>
                <div className="flex items-center mt-3 text-sm text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  En continu toute la journée
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-red-400" />
                  Gaming Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">🎮 Tournois de jeux vidéo, rétrogaming et découverte de nouveautés</p>
                <div className="flex items-center mt-3 text-sm text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  Tout le weekend
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Star className="w-5 h-5 mr-2 text-red-400" />
                  Stands & Expo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">🛍️ Artistes locaux, marchands et expositions thématiques</p>
                <div className="flex items-center mt-3 text-sm text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  Tout le weekend
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">🎨 Affiches du Festival</h2>
            <p className="text-gray-300 text-lg">Découvrez l'univers visuel de l'Otaku Geek Congo</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <Suspense fallback={<div className="w-full h-80 bg-gray-700 animate-pulse" />}>
                  <ImageWithFallback
                    src="/affiches/affiche-principale.jpg"
                    alt="Affiche principale du festival Otaku Geek Congo 2025 - Culture Pop Japonaise Kinshasa"
                    width={400}
                    height={600}
                    className="w-full h-80 object-cover"
                  />
                </Suspense>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-semibold">Affiche Principale</p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <Suspense fallback={<div className="w-full h-80 bg-gray-700 animate-pulse" />}>
                  <ImageWithFallback
                    src="/affiches/affiche-activites.jpg"
                    alt="Programme d'activités festival Otaku Geek Congo - Anime Manga Gaming Cosplay"
                    width={400}
                    height={600}
                    className="w-full h-80 object-cover"
                  />
                </Suspense>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-semibold">Programme d'Activités</p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <Suspense fallback={<div className="w-full h-80 bg-gray-700 animate-pulse" />}>
                  <ImageWithFallback
                    src="/affiches/affiche-stand.jpg"
                    alt="Stands d'exposition festival Otaku Geek Congo - Réservation stand expo"
                    width={400}
                    height={600}
                    className="w-full h-80 object-cover"
                  />
                </Suspense>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-semibold">Stands d'Exposition</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/20">
              <div className="text-red-400">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold text-lg">💼 Pass Stand Expo - 40$</h3>
                <p className="text-gray-300 text-sm">Réservez votre stand d'exposition avec accès premium</p>
                <p className="text-red-400 font-semibold">Catégories : Merch, FanArt, Doujinshi, Cosplay, Articles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black/50 border-t border-red-500/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <ImageWithFallback
                  src="/logo-ogc.png"
                  alt="Otaku Geek Congo Logo"
                  width={40}
                  height={40}
                  className="rounded"
                />
                <div>
                  <h3 className="text-white font-bold">Otaku Geek Congo</h3>
                  <p className="text-gray-400 text-sm">Festival de culture pop</p>
                </div>
              </div>
              <p className="text-gray-300">
                🎌 Le rendez-vous incontournable des passionnés d'anime, manga et gaming en RDC.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">📞 Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>
                  📧{" "}
                  <a href="mailto:Otakugeekcongo@gmail.com" className="hover:text-red-400">
                    Otakugeekcongo@gmail.com
                  </a>
                </p>
                <p>
                  📱{" "}
                  <a href="tel:+243820599547" className="hover:text-red-400">
                    +243 820 599 547
                  </a>
                </p>
                <p>📍 Kinshasa, République Démocratique du Congo 🇨🇩</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">📱 Suivez-nous</h4>
              <div className="space-y-2 text-gray-300">
                <p>
                  Facebook:{" "}
                  <a href="#" className="hover:text-red-400">
                    @otakugeekcongo
                  </a>
                </p>
                <p>
                  Instagram:{" "}
                  <a href="#" className="hover:text-red-400">
                    @otakugeekcongo
                  </a>
                </p>
                <p>
                  TikTok:{" "}
                  <a href="#" className="hover:text-red-400">
                    @otakugeekcongo
                  </a>
                </p>
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
