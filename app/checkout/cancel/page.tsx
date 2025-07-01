"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-slate-800/50 border-slate-700 backdrop-blur-sm text-white">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-100 p-2 flex items-center justify-center">
              <XCircle className="h-10 w-10 text-red-500" />
            </div>
            <CardTitle className="text-2xl">Paiement annulé</CardTitle>
            <CardDescription className="text-gray-300">
              Votre paiement a été annulé. Aucun montant n'a été débité.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300 mb-4">
              Vous pouvez retourner à votre panier pour finaliser votre commande ou continuer à naviguer sur le site.
            </p>
            <div className="rounded-lg bg-yellow-900/30 border border-yellow-500/30 p-4">
              <p className="text-yellow-300 text-sm">
                Si vous avez rencontré un problème technique, n'hésitez pas à nous contacter à Otakugeekcongo@gmail.com
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Link href="/checkout" className="flex-1">
              <Button className="w-full bg-red-600 hover:bg-red-700">Retour au panier</Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Retour à l'accueil
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
