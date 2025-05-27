"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, User, MapPin, CreditCard, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { PaymentForm } from "../payments/payment-form"

interface Professional {
  id: string
  name: string
  title: string
  avatar: string
  rating: number
  location: string
  services: Service[]
}

interface Service {
  id: string
  name: string
  duration: number
  price: number
  description: string
}

interface TimeSlot {
  time: string
  available: boolean
}

const mockProfessional: Professional = {
  id: "1",
  name: "Dr. Sarah Wilson",
  title: "Licensed Therapist",
  avatar: "/placeholder.svg?height=80&width=80",
  rating: 4.9,
  location: "Downtown Medical Center",
  services: [
    {
      id: "1",
      name: "Initial Consultation",
      duration: 60,
      price: 15000, // Price in cents
      description: "Comprehensive assessment and treatment planning",
    },
    {
      id: "2",
      name: "Follow-up Session",
      duration: 45,
      price: 12000, // Price in cents
      description: "Regular therapy session",
    },
    {
      id: "3",
      name: "Group Session",
      duration: 90,
      price: 8000, // Price in cents
      description: "Group therapy session",
    },
  ],
}

const mockTimeSlots: TimeSlot[] = [
  { time: "09:00", available: true },
  { time: "09:30", available: false },
  { time: "10:00", available: true },
  { time: "10:30", available: true },
  { time: "11:00", available: false },
  { time: "11:30", available: true },
  { time: "14:00", available: true },
  { time: "14:30", available: true },
  { time: "15:00", available: false },
  { time: "15:30", available: true },
  { time: "16:00", available: true },
]

export function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState<"service" | "datetime" | "details" | "payment" | "confirmation">("service")
  const [bookingDetails, setBookingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  })

  const generateCalendarDays = () => {
    const today = new Date()
    const days = []

    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push(date)
    }

    return days
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSameDate = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString()
  }

  const handleNext = () => {
    switch (step) {
      case "service":
        setStep("datetime")
        break
      case "datetime":
        setStep("details")
        break
      case "details":
        setStep("payment")
        break
      case "payment":
        setStep("confirmation")
        break
    }
  }

  const handlePaymentSuccess = (paymentId: string) => {
    console.log("Payment successful:", paymentId)
    setStep("confirmation")
  }

  const handlePaymentError = (error: string) => {
    console.error("Payment failed:", error)
    // Handle payment error (show toast, etc.)
  }

  const canProceed = () => {
    switch (step) {
      case "service":
        return selectedService !== null
      case "datetime":
        return selectedDate !== null && selectedTime !== null
      case "details":
        return bookingDetails.firstName && bookingDetails.lastName && bookingDetails.email
      case "payment":
        return true
      default:
        return false
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Professional Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mockProfessional.avatar || "/placeholder.svg"} alt={mockProfessional.name} />
              <AvatarFallback>
                {mockProfessional.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{mockProfessional.name}</h2>
              <p className="text-slate-600 dark:text-slate-300">{mockProfessional.title}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium">{mockProfessional.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                  <MapPin className="h-4 w-4" />
                  {mockProfessional.location}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {[
              { key: "service", label: "Service", icon: User },
              { key: "datetime", label: "Date & Time", icon: Calendar },
              { key: "details", label: "Details", icon: User },
              { key: "payment", label: "Payment", icon: CreditCard },
              { key: "confirmation", label: "Confirmation", icon: Check },
            ].map((stepItem, index) => {
              const isActive = step === stepItem.key
              const isCompleted =
                ["service", "datetime", "details", "payment"].indexOf(step) >
                ["service", "datetime", "details", "payment"].indexOf(stepItem.key)

              return (
                <div key={stepItem.key} className="flex items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                      isActive
                        ? "border-blue-600 bg-blue-600 text-white"
                        : isCompleted
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-slate-300 text-slate-400",
                    )}
                  >
                    <stepItem.icon className="h-4 w-4" />
                  </div>
                  <span
                    className={cn(
                      "ml-2 text-sm font-medium",
                      isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-slate-400",
                    )}
                  >
                    {stepItem.label}
                  </span>
                  {index < 4 && (
                    <div className={cn("w-12 h-0.5 mx-4", isCompleted ? "bg-green-600" : "bg-slate-300")} />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {step === "service" && "Select a Service"}
            {step === "datetime" && "Choose Date & Time"}
            {step === "details" && "Your Information"}
            {step === "payment" && "Payment Details"}
            {step === "confirmation" && "Booking Confirmed"}
          </CardTitle>
          <CardDescription>
            {step === "service" && "Choose the service you would like to book"}
            {step === "datetime" && "Pick your preferred date and time"}
            {step === "details" && "Please provide your contact information"}
            {step === "payment" && "Complete your booking payment"}
            {step === "confirmation" && "Your appointment has been successfully booked"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === "service" && (
            <div className="grid gap-4">
              {mockProfessional.services.map((service) => (
                <div
                  key={service.id}
                  className={cn(
                    "p-4 rounded-lg border-2 cursor-pointer transition-colors",
                    selectedService?.id === service.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-slate-200 hover:border-slate-300 dark:border-slate-700",
                  )}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{service.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{service.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {service.duration} min
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(service.price)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === "datetime" && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Date Selection */}
              <div>
                <Label className="text-base font-medium mb-4 block">Select Date</Label>
                <div className="grid grid-cols-2 gap-2">
                  {generateCalendarDays().map((date, index) => (
                    <Button
                      key={index}
                      variant={isSameDate(date, selectedDate) ? "default" : "outline"}
                      className="h-auto p-3 flex flex-col items-center"
                      onClick={() => setSelectedDate(date)}
                    >
                      <span className="text-xs opacity-75">
                        {isToday(date) ? "Today" : formatDate(date).split(" ")[0]}
                      </span>
                      <span className="text-lg font-semibold">{date.getDate()}</span>
                      <span className="text-xs opacity-75">{formatDate(date).split(" ").slice(1).join(" ")}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <Label className="text-base font-medium mb-4 block">Select Time</Label>
                <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                  {mockTimeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      disabled={!slot.available}
                      className="h-12"
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === "details" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={bookingDetails.firstName}
                    onChange={(e) => setBookingDetails((prev) => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={bookingDetails.lastName}
                    onChange={(e) => setBookingDetails((prev) => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingDetails.email}
                    onChange={(e) => setBookingDetails((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingDetails.phone}
                    onChange={(e) => setBookingDetails((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={bookingDetails.notes}
                  onChange={(e) => setBookingDetails((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional information or special requests..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {step === "payment" && selectedService && (
            <PaymentForm
              amount={selectedService.price}
              description={`${selectedService.name} with ${mockProfessional.name}`}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          )}

          {step === "confirmation" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Your appointment has been successfully booked. You will receive a confirmation email shortly.
              </p>

              <Card className="max-w-md mx-auto">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Appointment ID:</span>
                    <span className="font-mono">#BK-2024-001</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span>{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span>
                      {formatDate(selectedDate)} at {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Professional:</span>
                    <span>{mockProfessional.name}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total Paid:</span>
                    <span>{selectedService && formatCurrency(selectedService.price)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>

        {step !== "confirmation" && step !== "payment" && (
          <div className="flex justify-between p-6 border-t">
            <Button
              variant="outline"
              onClick={() => {
                const steps = ["service", "datetime", "details", "payment"]
                const currentIndex = steps.indexOf(step)
                if (currentIndex > 0) {
                  setStep(steps[currentIndex - 1] as any)
                }
              }}
              disabled={step === "service"}
            >
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Continue
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
