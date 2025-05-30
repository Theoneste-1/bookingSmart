'client'
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetBookingByIdQuery } from "../../../../features/api/bookingApi";
import { useCancelBookingMutation } from "../../../../features/api/clientApi";
import { BookingStatus } from "../../../../features/api/bookingApi";
import { format } from "date-fns";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { ClientLayout } from "@/components/layouts/ClientLayout";

const statusColors = {
  [BookingStatus.PENDING]: "bg-yellow-100 text-yellow-800",
  [BookingStatus.CONFIRMED]: "bg-green-100 text-green-800",
  [BookingStatus.CANCELLED]: "bg-red-100 text-red-800",
  [BookingStatus.COMPLETED]: "bg-blue-100 text-blue-800",
  [BookingStatus.NO_SHOW]: "bg-gray-100 text-gray-800",
};

const BookingDetails = ({ id }: { id: string }) => {
  const router = useRouter();
  const {
    data: booking,
    isLoading,
    error,
  } = useGetBookingByIdQuery(Number(id));
  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await cancelBooking(Number(id)).unwrap();
        router.push("/client/bookings");
      } catch (err) {
        console.error("Failed to cancel booking:", err);
      }
    }
  };

  if (isLoading) {
    return <div>Loading booking details...</div>;
  }

  if (error || !booking) {
    return <div>Error loading booking details</div>;
  }

  return (
    <ClientLayout>
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Booking Details
            </h1>
            <Link
              href="/client/bookings"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              ← Back to Bookings
            </Link>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    Booking #{booking.id}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {format(new Date(booking.date), "MMMM d, yyyy")} at{" "}
                    {format(new Date(booking.startTime), "h:mm a")}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    statusColors[booking.status]
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>

            <div className="px-6 py-5 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Service</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {booking.serviceName}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Professional
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {booking.professionalName}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Duration
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {booking.duration} minutes
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Price</h3>
                  <p className="mt-1 text-sm text-gray-900">${booking.price}</p>
                </div>
              </div>

              {booking.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                  <p className="mt-1 text-sm text-gray-900">{booking.notes}</p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-end space-x-3">
                  {booking.status === BookingStatus.PENDING && (
                    <button
                      onClick={handleCancel}
                      disabled={isCancelling}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      {isCancelling ? "Cancelling..." : "Cancel Booking"}
                    </button>
                  )}
                  {booking.status === BookingStatus.COMPLETED && (
                    <Link
                      href={`/client/reviews/new?bookingId=${booking.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Write a Review
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default function BookingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingDetails id={params.id} />
    </Suspense>
  );
}
