import { create } from "zustand"
import { persist } from "zustand/middleware"

export type TicketType = {
  id: number
  name: string
  price: number
  currency: string
  description: string
}

export const ticketTypes: TicketType[] = [
  {
    id: 1,
    name: "Pass Standard",
    price: 5,
    currency: "$",
    description: "Accès complet pour une journée",
  },
  {
    id: 2,
    name: "Pass VIP",
    price: 10,
    currency: "$",
    description: "Accès complet pour tout le weekend + avantages VIP",
  },
  {
    id: 3,
    name: "Pass Stand Expo",
    price: 40,
    currency: "$",
    description: "Expérience premium complète avec stand d'exposition",
  },
]

export type CartItem = {
  ticketId: number
  quantity: number
}

type CartState = {
  items: CartItem[]
  updateQuantity: (ticketId: number, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getQuantity: (ticketId: number) => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      updateQuantity: (ticketId, quantity) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex((item) => item.ticketId === ticketId)

          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            return {
              items: state.items.filter((item) => item.ticketId !== ticketId),
            }
          }

          if (existingItemIndex >= 0) {
            // Update existing item
            const newItems = [...state.items]
            newItems[existingItemIndex] = { ...newItems[existingItemIndex], quantity }
            return { items: newItems }
          } else {
            // Add new item
            return {
              items: [...state.items, { ticketId, quantity }],
            }
          }
        })
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => {
          const ticket = ticketTypes.find((t) => t.id === item.ticketId)
          return total + (ticket?.price || 0) * item.quantity
        }, 0)
      },
      getQuantity: (ticketId) => {
        const { items } = get()
        const item = items.find((item) => item.ticketId === ticketId)
        return item?.quantity || 0
      },
    }),
    {
      name: "ogc-cart",
    },
  ),
)
