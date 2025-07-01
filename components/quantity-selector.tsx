"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
  min?: number
  max?: number
  value: number
  onChange: (value: number) => void
}

export function QuantitySelector({ min = 0, max = 10, value, onChange }: QuantitySelectorProps) {
  const increment = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const decrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={decrement}
        disabled={value <= min}
        type="button"
      >
        <Minus className="h-3 w-3" />
        <span className="sr-only">Réduire la quantité</span>
      </Button>
      <div className="flex w-12 items-center justify-center text-center">
        <span className="text-lg font-medium">{value}</span>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={increment}
        disabled={value >= max}
        type="button"
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">Augmenter la quantité</span>
      </Button>
    </div>
  )
}
