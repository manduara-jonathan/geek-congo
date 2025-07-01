"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useCartStore, ticketTypes } from "@/lib/store"

export default function PaymentSuccessPage() {
  const [orderData, setOrderData] = useState<any>(null)
  const { clearCart } = useCartStore()

  useEffect(() => {
    // Récupérer les données de commande depuis le localStorage
    const savedOrder = localStorage.getItem("ogc-order")
    if (savedOrder) {
      const order = JSON.parse(savedOrder)
      setOrderData(order)
      // Nettoyer le localStorage et le panier
      localStorage.removeItem("ogc-order")
      clearCart()
    }
  }, [clearCart])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price)
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-slate-800/50 border-slate-700 backdrop-blur-sm text-white">
            <CardContent className="text-center py-12">
              <p className="text-gray-300">Chargement des informations de commande...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

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
              Votre paiement via Lygos a été confirmé et vos billets ont été réservés.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-slate-700/50 p-4">
              <h3 className="font-medium mb-2">Détails de la commande</h3>
              <div className="text-sm text-gray-300 mb-3">
                <p>
                  <strong>Numéro de commande:</strong> {orderData.orderId}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(orderData.timestamp).toLocaleDateString("fr-FR")}
                </p>
                <p className="text-yellow-300 text-sm">
                  Si vous avez rencontré un problème technique, n'hésitez pas à nous contacter à
                  Otakugeekcongo@gmail.com
                </p>
              </div>
              <div className="space-y-2">
                {orderData.items.map((item: any) => {
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
                  <span>Total payé</span>
                  <span>{formatPrice(orderData.total)} $</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-900/30 border border-blue-500/30 p-4">
              <h3 className="font-medium mb-2 text-blue-300">Informations importantes</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Vous recevrez un email de confirmation à Otakugeekcongo@gmail.com</li>
                <li>• Vos billets électroniques seront joints à cet email</li>
                <li>• Présentez vos billets (imprimés ou sur téléphone) à l'entrée</li>
                <li>• Conservez votre numéro de commande pour toute question</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Link href="/" className="flex-1">
              <Button className="w-full bg-red-600 hover:bg-red-700">Retour à l'accueil</Button>
            </Link>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => window.print()}>
              Imprimer le reçu
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
