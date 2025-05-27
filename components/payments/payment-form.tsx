"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Lock, Shield, Apple, Smartphone, Wallet } from "lucide-react"

interface PaymentMethod {
  id: string
  type: "card" | "apple_pay" | "google_pay" | "paypal"
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

interface PaymentFormProps {
  amount: number
  currency?: string
  description: string
  onPaymentSuccess?: (paymentId: string) => void
  onPaymentError?: (error: string) => void
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    type: "card",
    name: "Credit or Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express",
  },
  {
    id: "apple_pay",
    type: "apple_pay",
    name: "Apple Pay",
    icon: Apple,
    description: "Pay with Touch ID or Face ID",
  },
  {
    id: "google_pay",
    type: "google_pay",
    name: "Google Pay",
    icon: Smartphone,
    description: "Pay with your Google account",
  },
  {
    id: "paypal",
    type: "paypal",
    name: "PayPal",
    icon: Wallet,
    description: "Pay with your PayPal account",
  },
]

export function PaymentForm({
  amount,
  currency = "USD",
  description,
  onPaymentSuccess,
  onPaymentError,
}: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  })
  const [billingAddress, setBillingAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "US",
  })
  const [saveCard, setSaveCard] = useState(false)

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setCardDetails((prev) => ({ ...prev, number: formatted }))
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value)
    setCardDetails((prev) => ({ ...prev, expiry: formatted }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simulate successful payment
      const paymentId = `pi_${Math.random().toString(36).substr(2, 9)}`
      onPaymentSuccess?.(paymentId)
    } catch (error) {
      onPaymentError?.("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const getCardBrand = (number: string) => {
    const cleanNumber = number.replace(/\s/g, "")
    if (cleanNumber.startsWith("4")) return "visa"
    if (cleanNumber.startsWith("5") || cleanNumber.startsWith("2")) return "mastercard"
    if (cleanNumber.startsWith("3")) return "amex"
    return "unknown"
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount / 100)
  }

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Secure Payment
          </CardTitle>
          <CardDescription>Your payment information is encrypted and secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-300">{description}</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{formatAmount(amount, currency)}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-300">Processing fee</span>
            <span className="text-slate-900 dark:text-white">{formatAmount(Math.round(amount * 0.029), currency)}</span>
          </div>
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>{formatAmount(amount + Math.round(amount * 0.029), currency)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Choose how you'd like to pay</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-3">
                <RadioGroupItem value={method.id} id={method.id} />
                <Label
                  htmlFor={method.id}
                  className="flex items-center gap-3 cursor-pointer flex-1 p-3 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <method.icon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-slate-500">{method.description}</div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Card Details Form */}
      {selectedMethod === "card" && (
        <Card>
          <CardHeader>
            <CardTitle>Card Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <div className="relative">
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  className="pr-12"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {getCardBrand(cardDetails.number) === "visa" && (
                    <div className="text-xs font-bold text-blue-600">VISA</div>
                  )}
                  {getCardBrand(cardDetails.number) === "mastercard" && (
                    <div className="text-xs font-bold text-red-600">MC</div>
                  )}
                  {getCardBrand(cardDetails.number) === "amex" && (
                    <div className="text-xs font-bold text-green-600">AMEX</div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={handleExpiryChange}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cardDetails.cvc}
                  onChange={(e) => setCardDetails((prev) => ({ ...prev, cvc: e.target.value }))}
                  maxLength={4}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardholder-name">Cardholder Name</Label>
              <Input
                id="cardholder-name"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => setCardDetails((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="save-card"
                checked={saveCard}
                onCheckedChange={(checked) => setSaveCard(checked === true)}
              />
              <Label htmlFor="save-card" className="text-sm">
                Save this card for future payments
              </Label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing Address */}
      {selectedMethod === "card" && (
        <Card>
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="123 Main Street"
                value={billingAddress.line1}
                onChange={(e) => setBillingAddress((prev) => ({ ...prev, line1: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  value={billingAddress.city}
                  onChange={(e) => setBillingAddress((prev) => ({ ...prev, city: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="NY"
                  value={billingAddress.state}
                  onChange={(e) => setBillingAddress((prev) => ({ ...prev, state: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="postal-code">Postal Code</Label>
              <Input
                id="postal-code"
                placeholder="10001"
                value={billingAddress.postal_code}
                onChange={(e) => setBillingAddress((prev) => ({ ...prev, postal_code: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Notice */}
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-green-600" />
            <div className="text-sm">
              <div className="font-medium text-green-800 dark:text-green-300">Secure Payment</div>
              <div className="text-green-700 dark:text-green-400">
                Your payment is protected by 256-bit SSL encryption and PCI DSS compliance.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Button */}
      <Button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing Payment...
          </div>
        ) : (
          `Pay ${formatAmount(amount + Math.round(amount * 0.029), currency)}`
        )}
      </Button>
    </div>
  )
}
