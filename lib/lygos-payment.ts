export interface LygosPaymentData {
  amount: number
  currency: string
  description: string
  customerName: string
  customerEmail: string
  customerPhone: string
  orderId: string
}

export function generateLygosPaymentUrl(paymentData: LygosPaymentData): string {
  // URL de base de Lygos (remplacez par l'URL réelle de production)
  const baseUrl = "https://pay.lygos.cd/payment"

  // Paramètres de paiement
  const params = new URLSearchParams({
    amount: paymentData.amount.toString(),
    currency: paymentData.currency,
    description: paymentData.description,
    customer_name: paymentData.customerName,
    customer_email: paymentData.customerEmail,
    customer_phone: paymentData.customerPhone,
    order_id: paymentData.orderId,
    // URL de retour après paiement (à adapter selon votre domaine)
    return_url: `${window.location.origin}/checkout/success`,
    cancel_url: `${window.location.origin}/checkout/cancel`,
  })

  return `${baseUrl}?${params.toString()}`
}

export function generateOrderId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `OGC-${timestamp}-${random}`
}
