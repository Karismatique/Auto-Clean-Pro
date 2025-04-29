"use client"

import { useLanguage } from "../LanguageContext"
import { Star, User } from "lucide-react"
import Image from "next/image"

export default function ReviewGrid() {
  const { t } = useLanguage()

  // Sample review data
  const reviews = [
    {
      id: 1,
      name: "Sophie Martin",
      rating: 5,
      date: "15/03/2023",
      comment:
        "Service impeccable ! Ma voiture n'a jamais été aussi propre. Le personnel est très professionnel et attentif aux détails.",
      hasImage: true,
      verified: true,
    },
    {
      id: 2,
      name: "Thomas Dubois",
      rating: 4,
      date: "02/02/2023",
      comment: "Très satisfait du nettoyage intérieur. Le service était rapide et efficace. Je recommande !",
      hasImage: false,
      verified: true,
    },
    {
      id: 3,
      name: "Marie Leroy",
      rating: 5,
      date: "18/01/2023",
      comment:
        "J'utilise Auto Clean Pro depuis des années et je n'ai jamais été déçue. Le service premium vaut vraiment le prix.",
      hasImage: true,
      verified: true,
    },
    {
      id: 4,
      name: "Pierre Moreau",
      rating: 3,
      date: "05/12/2022",
      comment: "Service correct mais j'ai dû attendre plus longtemps que prévu. Le résultat final était bon cependant.",
      hasImage: false,
      verified: false,
    },
    {
      id: 5,
      name: "Camille Bernard",
      rating: 5,
      date: "22/11/2022",
      comment:
        "Excellente expérience ! Le personnel est aimable et le travail est minutieux. Ma voiture semble neuve !",
      hasImage: true,
      verified: true,
    },
    {
      id: 6,
      name: "Lucas Petit",
      rating: 4,
      date: "10/10/2022",
      comment: "Bon rapport qualité-prix. J'apprécie particulièrement le service de prise en charge à domicile.",
      hasImage: false,
      verified: true,
    },
  ]

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star key={index} className={`h-5 w-5 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Review Header */}
          <div className="p-4 border-b">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">{review.name}</h3>
                  <div className="flex items-center">
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded mr-2">Vérifié</span>
                    )}
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex">{renderStars(review.rating)}</div>
            </div>
          </div>

          {/* Review Content */}
          <div className="p-4">
            <p className="text-gray-600 mb-4">{review.comment}</p>

            {/* Review Image (if available) */}
            {review.hasImage && (
              <div className="mt-2 rounded-md overflow-hidden">
                <Image
                  src="/placeholder.svg"
                  alt="Review photo"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
