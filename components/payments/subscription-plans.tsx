"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Star, Zap, Crown } from "lucide-react"

interface Plan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  popular?: boolean
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Up to 50 bookings/month",
      "Basic calendar integration",
      "Email notifications",
      "Mobile app access",
      "Basic analytics",
      "Standard support",
    ],
    icon: Star,
    color: "text-blue-600",
  },
  {
    id: "professional",
    name: "Professional",
    description: "For growing businesses",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Unlimited bookings",
      "Advanced calendar features",
      "SMS & email notifications",
      "Payment processing",
      "Client management CRM",
      "Custom branding",
      "Advanced analytics",
      "Priority support",
      "API access",
    ],
    popular: true,
    icon: Zap,
    color: "text-purple-600",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Everything in Professional",
      "Multi-location support",
      "Team management",
      "Advanced API access",
      "Custom integrations",
      "White-label solution",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom reporting",
      "Advanced security",
    ],
    icon: Crown,
    color: "text-orange-600",
  },
]

export function SubscriptionPlans() {
  const [isYearly, setIsYearly] = useState(false)
  const [currentPlan, setCurrentPlan] = useState("professional")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getPrice = (plan: Plan) => {
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice
  }

  const getSavings = (plan: Plan) => {
    if (plan.monthlyPrice === 0) return 0
    const yearlyTotal = plan.monthlyPrice * 12
    const savings = yearlyTotal - plan.yearlyPrice
    return Math.round((savings / yearlyTotal) * 100)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Choose Your Plan</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">Select the perfect plan for your business needs</p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span
            className={`text-sm ${!isYearly ? "font-medium text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}
          >
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span
            className={`text-sm ${isYearly ? "font-medium text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}
          >
            Yearly
          </span>
          {isYearly && (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Save up to 20%</Badge>
          )}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.id
          const price = getPrice(plan)
          const savings = getSavings(plan)

          return (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-purple-500 shadow-xl scale-105"
                  : isCurrentPlan
                    ? "border-2 border-blue-500"
                    : "border border-slate-200 dark:border-slate-700 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}

              {isCurrentPlan && (
                <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-sm font-medium">
                  Current Plan
                </div>
              )}

              <CardHeader className={plan.popular || isCurrentPlan ? "pt-12" : ""}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800`}>
                    <plan.icon className={`h-6 w-6 ${plan.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                      {price === 0 ? "Free" : formatPrice(price)}
                    </span>
                    {price > 0 && (
                      <span className="text-slate-600 dark:text-slate-300">/{isYearly ? "year" : "month"}</span>
                    )}
                  </div>

                  {isYearly && savings > 0 && (
                    <div className="text-sm text-green-600 dark:text-green-400">
                      Save {savings}% with yearly billing
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      : isCurrentPlan
                        ? "bg-slate-600 hover:bg-slate-700"
                        : ""
                  }`}
                  variant={plan.popular ? "default" : isCurrentPlan ? "default" : "outline"}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? "Current Plan" : plan.monthlyPrice === 0 ? "Get Started" : "Upgrade Now"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-2">Can I change plans anytime?</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-2">What payment methods do you accept?</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                We accept all major credit cards, PayPal, and bank transfers for annual plans.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-2">Is there a free trial?</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Yes, all paid plans come with a 14-day free trial. No credit card required.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-slate-900 dark:text-white mb-2">Can I cancel anytime?</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Absolutely. You can cancel your subscription at any time with no cancellation fees.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
