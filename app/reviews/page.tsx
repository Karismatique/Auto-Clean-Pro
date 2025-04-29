import ReviewGrid from "@/components/reviews/ReviewGrid"
import ReviewForm from "@/components/reviews/ReviewForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Avis Clients - Auto Clean Pro",
  description: "Découvrez ce que nos clients disent de nos services",
}

export default function ReviewsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Avis Clients</h1>
      <ReviewGrid />
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Partagez votre expérience</h2>
        <ReviewForm />
      </div>
    </div>
  )
}
