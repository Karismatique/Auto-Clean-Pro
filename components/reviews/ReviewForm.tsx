"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "../LanguageContext"
import { Star, Upload } from "lucide-react"

export default function ReviewForm() {
  const { t } = useLanguage()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the review data to a server
    console.log({ rating, comment, name, email })

    // Reset form
    setRating(0)
    setComment("")
    setName("")
    setEmail("")

    // Show confirmation (placeholder)
    alert("Merci pour votre avis !")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      {/* Rating */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">{t("rating")}</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1 focus:outline-none"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoveredRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-6">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          {t("comment")}
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
          required
        ></textarea>
      </div>

      {/* Photo Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">{t("uploadPhoto")} (optionnel)</label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Glissez-déposez une image ici ou cliquez pour sélectionner</p>
          <input type="file" accept="image/*" className="hidden" id="photo-upload" />
          <label
            htmlFor="photo-upload"
            className="mt-2 inline-block px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md cursor-pointer hover:bg-gray-300"
          >
            Parcourir
          </label>
        </div>
      </div>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {t("name")}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t("email")}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#1E3A8A] hover:bg-[#152a66] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300"
      >
        {t("submit")}
      </button>
    </form>
  )
}
