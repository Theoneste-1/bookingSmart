import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "Up to 50 bookings/month",
      "Basic calendar integration",
      "Email notifications",
      "Mobile app access",
      "Basic analytics",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Professional",
    price: "$29",
    description: "For growing businesses",
    features: [
      "Unlimited bookings",
      "Advanced calendar features",
      "SMS & email notifications",
      "Payment processing",
      "Client management CRM",
      "Custom branding",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Start Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For large organizations",
    features: [
      "Everything in Professional",
      "Multi-location support",
      "Team management",
      "API access",
      "Custom integrations",
      "White-label solution",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Choose the perfect plan for your business. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden ${plan.popular ? "border-2 border-blue-500 shadow-xl" : "border border-slate-200 dark:border-slate-700"}`}
            >
              {plan.popular && (
                <Badge className="absolute right-4 top-4 bg-gradient-to-r from-blue-600 to-purple-600">
                  <Star className="mr-1 h-3 w-3" />
                  Most Popular
                </Badge>
              )}

              <CardHeader className="pb-8">
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">{plan.name}</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                  {plan.price !== "Free" && <span className="text-slate-600 dark:text-slate-300">/month</span>}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full ${plan.popular ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link href="/signup">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
