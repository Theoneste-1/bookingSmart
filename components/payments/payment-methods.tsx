"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Plus, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SavedCard {
  id: string
  brand: string
  last4: string
  expMonth: number
  expYear: number
  isDefault: boolean
}

const mockSavedCards: SavedCard[] = [
  {
    id: "pm_1234567890",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
  },
  {
    id: "pm_0987654321",
    brand: "mastercard",
    last4: "5555",
    expMonth: 8,
    expYear: 2026,
    isDefault: false,
  },
]

export function PaymentMethods() {
  const [savedCards, setSavedCards] = useState<SavedCard[]>(mockSavedCards)

  const getBrandIcon = (brand: string) => {
    switch (brand) {
      case "visa":
        return "💳"
      case "mastercard":
        return "💳"
      case "amex":
        return "💳"
      default:
        return "💳"
    }
  }

  const getBrandName = (brand: string) => {
    switch (brand) {
      case "visa":
        return "Visa"
      case "mastercard":
        return "Mastercard"
      case "amex":
        return "American Express"
      default:
        return brand.charAt(0).toUpperCase() + brand.slice(1)
    }
  }

  const setDefaultCard = (cardId: string) => {
    setSavedCards((prev) =>
      prev.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      })),
    )
  }

  const removeCard = (cardId: string) => {
    setSavedCards((prev) => prev.filter((card) => card.id !== cardId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Methods</h2>
          <p className="text-slate-600 dark:text-slate-300">Manage your saved payment methods</p>
        </div>

        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      {/* Saved Cards */}
      <div className="grid gap-4">
        {savedCards.map((card) => (
          <Card key={card.id} className="relative">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <CreditCard className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {getBrandName(card.brand)} •••• {card.last4}
                      </span>
                      {card.isDefault && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Default
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Expires {card.expMonth.toString().padStart(2, "0")}/{card.expYear}
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!card.isDefault && (
                      <DropdownMenuItem onClick={() => setDefaultCard(card.id)}>Set as Default</DropdownMenuItem>
                    )}
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => removeCard(card.id)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {savedCards.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <CreditCard className="h-12 w-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No payment methods</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">Add a payment method to get started</p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
