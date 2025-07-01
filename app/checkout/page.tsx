"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CreditCard, Smartphone, CheckCircle2, Loader2, ExternalLink } from "lucide-react"
import { QuantitySelector } from "@/components/quantity-selector"
import { useCartStore, ticketTypes } from "@/lib/store"
import { generateLygosPaymentUrl, generateOrderId, type LygosPaymentData } from "@/lib/lygos-payment"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const preselectedTicketId = searchParams.get("ticket") ? Number.parseInt(searchParams.get("ticket")!) : null

  const { items, updateQuantity, getTotal, getQuantity, clearCart } = useCartStore()
  const [activeTab, setActiveTab] = useState("panier")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "mobile",
  })

  // Handle preselected ticket
  useEffect(() => {
    if (preselectedTicketId && getQuantity(preselectedTicketId) === 0) {
      updateQuantity(preselectedTicketId, 1)
    }
  }, [preselectedTicketId, getQuantity, updateQuantity])

  const handleQuantityChange = useCallback(
    (ticketId: number, quantity: number) => {
      updateQuantity(ticketId, quantity)
    },
    [updateQuantity],
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      if (formData.paymentMethod === "mobile") {
        // Redirection vers Lygos pour le paiement mobile money
        const orderId = generateOrderId()
        const ticketNames = items
          .map((item) => {
            const ticket = ticketTypes.find((t) => t.id === item.ticketId)
            return `${ticket?.name} x${item.quantity}`
          })
          .join(", ")

        const paymentData: LygosPaymentData = {
          amount: getTotal(),
          currency: "USD",
          description: `Billets OGC Festival - ${ticketNames}`,
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          orderId: orderId,
        }

        const lygosUrl = generateLygosPaymentUrl(paymentData)

        // Sauvegarder les données de commande dans le localStorage pour la page de succès
        localStorage.setItem(
          "ogc-order",
          JSON.stringify({
            orderId,
            items,
            total: getTotal(),
            customerInfo: formData,
            timestamp: Date.now(),
          }),
        )

        // Rediriger vers Lygos
        window.location.href = lygosUrl
        return
      } else {
        // Simulation pour le paiement par carte
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsProcessing(false)
        setIsComplete(true)
      }
    } catch (error) {
      console.error("Erreur lors du paiement:", error)
      setIsProcessing(false)
      // Ici vous pourriez afficher un message d'erreur à l'utilisateur
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price)
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-slate-800/50 border-slate-700 backdrop-blur-sm text-white">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 p-2 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Paiement réussi !</CardTitle>
              <CardDescription className="text-gray-300">
                Votre commande a été confirmée et vos billets ont été réservés.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-slate-700/50 p-4">
                <h3 className="font-medium mb-2">Récapitulatif de la commande</h3>
                <div className="space-y-2">
                  {items.map((item) => {
                    const ticket = ticketTypes.find((t) => t.id === item.ticketId)!
                    return (
                      <div key={item.ticketId} className="flex justify-between">
                        <span>
                          {ticket.name} × {item.quantity}
                        </span>
                        <span>
                          {formatPrice(ticket.price * item.quantity)} {ticket.currency}
                        </span>
                      </div>
                    )
                  })}
                  <Separator className="my-2 bg-slate-600" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(getTotal())} $</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Instructions</h3>
                <p className="text-gray-300 text-sm">
                  Vous recevrez un email de confirmation avec vos billets électroniques à l'adresse {formData.email}.
                  Veuillez présenter ces billets (imprimés ou sur votre téléphone) à l'entrée du festival.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/" className="w-full">
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => clearCart()}>
                  Retour à l'accueil
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/" className="text-white hover:text-red-400 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
                <TabsTrigger value="panier" className="data-[state=active]:bg-red-600">
                  Panier ({totalItems})
                </TabsTrigger>
                <TabsTrigger value="paiement" className="data-[state=active]:bg-red-600" disabled={totalItems === 0}>
                  Paiement
                </TabsTrigger>
              </TabsList>

              <TabsContent value="panier" className="mt-4">
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm text-white">
                  <CardHeader>
                    <CardTitle>Sélection des billets</CardTitle>
                    <CardDescription className="text-gray-300">
                      Choisissez le type et le nombre de billets que vous souhaitez acheter
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ticketTypes.map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50">
                        <div className="flex-1">
                          <h3 className="font-medium">{ticket.name}</h3>
                          <p className="text-sm text-gray-300">{ticket.description}</p>
                          <p className="font-bold mt-1">
                            {formatPrice(ticket.price)} {ticket.currency}
                          </p>
                        </div>
                        <div className="ml-4">
                          <QuantitySelector
                            value={getQuantity(ticket.id)}
                            onChange={(quantity) => handleQuantityChange(ticket.id, quantity)}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700"
                      disabled={totalItems === 0}
                      onClick={() => setActiveTab("paiement")}
                    >
                      Continuer vers le paiement ({totalItems} billet{totalItems > 1 ? "s" : ""})
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="paiement" className="mt-4">
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm text-white">
                  <CardHeader>
                    <CardTitle>Informations de paiement</CardTitle>
                    <CardDescription className="text-gray-300">
                      Remplissez vos informations et choisissez votre méthode de paiement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="fullName">Nom complet</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            placeholder="Votre nom complet"
                            required
                            className="bg-slate-700/50 border-slate-600 text-white"
                            value={formData.fullName}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="votre@email.com"
                            required
                            className="bg-slate-700/50 border-slate-600 text-white"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="+243 XXX XXX XXX"
                            required
                            className="bg-slate-700/50 border-slate-600 text-white"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Méthode de paiement</Label>
                        <RadioGroup
                          value={formData.paymentMethod}
                          onValueChange={handlePaymentMethodChange}
                          className="mt-2 space-y-3"
                        >
                          <div className="flex items-center space-x-2 rounded-lg border border-slate-600 p-3 cursor-pointer hover:bg-slate-700/30">
                            <RadioGroupItem value="mobile" id="mobile" />
                            <Label htmlFor="mobile" className="flex items-center cursor-pointer flex-1">
                              <Smartphone className="mr-2 h-5 w-5 text-red-400" />
                              <div className="flex-1">
                                <div>Mobile Money via Lygos</div>
                                <div className="text-xs text-gray-400">M-Pesa, Orange Money, Airtel Money</div>
                              </div>
                              <ExternalLink className="h-4 w-4 text-gray-400" />
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2 rounded-lg border border-slate-600 p-3 cursor-pointer hover:bg-slate-700/30">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center cursor-pointer">
                              <CreditCard className="mr-2 h-5 w-5 text-red-400" />
                              Carte bancaire
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isProcessing}>
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {formData.paymentMethod === "mobile"
                              ? "Redirection vers Lygos..."
                              : "Traitement en cours..."}
                          </>
                        ) : (
                          <>
                            {formData.paymentMethod === "mobile" ? (
                              <>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Payer {formatPrice(getTotal())} $ via Lygos
                              </>
                            ) : (
                              `Payer ${formatPrice(getTotal())} $`
                            )}
                          </>
                        )}
                      </Button>

                      {formData.paymentMethod === "mobile" && (
                        <div className="text-xs text-gray-400 text-center">
                          Vous serez redirigé vers la plateforme sécurisée Lygos pour finaliser votre paiement
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full lg:w-1/3">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm text-white sticky top-4">
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {totalItems === 0 ? (
                  <p className="text-gray-300">Votre panier est vide</p>
                ) : (
                  <>
                    {items.map((item) => {
                      const ticket = ticketTypes.find((t) => t.id === item.ticketId)!
                      return (
                        <div key={item.ticketId} className="flex justify-between">
                          <span>
                            {ticket.name} × {item.quantity}
                          </span>
                          <span>
                            {formatPrice(ticket.price * item.quantity)} {ticket.currency}
                          </span>
                        </div>
                      )
                    })}
                    <Separator className="my-2 bg-slate-600" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(getTotal())} $</span>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <div className="w-full text-center text-sm text-gray-300">
                  <div className="flex justify-center mb-2">
                    <Image src="/logo-ogc.png" alt="Otaku Geek Congo Logo" width={40} height={40} className="rounded" />
                  </div>
                  <p>Otaku Geek Congo Festival</p>
                  <p>15-16 Février 2025</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
