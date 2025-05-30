export interface Appointment {
  id: number;
  clientId: number;
  professionalId: number;
  serviceId: number;
  date: string;
  startTime: string;
  endTime: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  notes: string;
  price: number;
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  bookingId: number;
  clientId: number;
  professionalId: number;
  rating: number;
  comment: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: number;
  appointmentId: number;
  amount: number;
  currency: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
  professionalId: number;
  clientId: number;
}
