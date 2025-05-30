import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useGetServicesQuery } from "../../../features/api/professionalApi";
import { useCreateBookingMutation } from "../../../features/api/bookingApi";
import { useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { ClientLayout } from "@/components/layouts/ClientLayout";

const ServiceCard = ({
  service,
  onBook,
}: {
  service: any;
  onBook: (service: any) => void;
}) => (
  <div className="bg-white shadow rounded-lg p-6">
    <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
    <p className="mt-2 text-sm text-gray-500">{service.description}</p>
    <div className="mt-4 space-y-2">
      <div className="flex items-center text-sm text-gray-500">
        <ClockIcon className="h-5 w-5 mr-2" />
        <span>{service.duration} minutes</span>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <CurrencyDollarIcon className="h-5 w-5 mr-2" />
        <span>${service.price}</span>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <UserIcon className="h-5 w-5 mr-2" />
        <span>{service.professionalName}</span>
      </div>
    </div>
    <button
      onClick={() => onBook(service)}
      className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Book Now
    </button>
  </div>
);

const BookingModal = ({
  service,
  onClose,
  onSubmit,
}: {
  service: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      serviceId: service.id,
      professionalId: service.professionalId,
      date,
      startTime: `${date}T${time}`,
      notes,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Book {service.name}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BookService = () => {
  const router = useRouter();
  const { data: services, isLoading, error } = useGetServicesQuery();
  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleBook = async (bookingData: any) => {
    try {
      await createBooking(bookingData).unwrap();
      setSelectedService(null);
      router.push("/client/bookings");
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  if (isLoading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>Error loading services</div>;
  }

  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Book a Service
          </h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services?.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={() => setSelectedService(service)}
              />
            ))}
          </div>

          {selectedService && (
            <BookingModal
              service={selectedService}
              onClose={() => setSelectedService(null)}
              onSubmit={handleBook}
            />
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default function BookServicePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookService />
    </Suspense>
  );
}
