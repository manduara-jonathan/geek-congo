export interface ChariowPaymentLinks {
  [key: number]: string
}

export const chariowLinks: ChariowPaymentLinks = {
  1: "https://jbyhqwlt.mychariow.com/prd_4h0biy", // Pass Standard
  2: "https://jbyhqwlt.mychariow.com/prd_7qw58u", // Pass VIP
  3: "https://jbyhqwlt.mychariow.com/prd_kb6jyl", // Pass Stand Expo
}

export function getChariowPaymentUrl(ticketId: number): string {
  return chariowLinks[ticketId] || ""
}

export function redirectToChariowPayment(ticketId: number): void {
  const url = getChariowPaymentUrl(ticketId)
  if (url) {
    window.open(url, "_blank")
  }
}
