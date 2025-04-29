import BookingForm from "@/components/booking/BookingForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Réservation - Auto Clean Pro",
  description: "Réservez votre service de nettoyage auto",
}

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Réservation</h1>
      <BookingForm />
    </div>
  )
}
