import { AppointmentBooking } from "@/components/calendar/appointment-booking"

interface BookingPageProps {
  params: {
    professionalId: string
  }
}

export default function BookingPage({ params }: BookingPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Book Appointment</h1>
        <p className="text-slate-600 dark:text-slate-300">Schedule your appointment with a professional</p>
      </div>

      <AppointmentBooking />
    </div>
  )
}
