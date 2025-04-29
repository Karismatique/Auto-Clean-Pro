"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "../LanguageContext"
import { Mail } from "lucide-react"

export default function NewsletterSignup() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the email to a server
    console.log({ email })

    // Reset form
    setEmail("")

    // Show confirmation (placeholder)
    alert("Merci pour votre inscription à notre newsletter !")
  }

  return (
    <div className="bg-[#1E3A8A] text-white rounded-lg shadow-md p-8">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
          <h3 className="text-2xl font-bold mb-2">{t("subscribeNewsletter")}</h3>
          <p className="text-blue-100">
            Recevez nos derniers conseils, promotions et actualités directement dans votre boîte mail.
          </p>
        </div>
        <div className="md:w-1/3">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("email")}
                  className="w-full pl-10 pr-3 py-2 rounded-md text-gray-900 focus:ring-[#10B981] focus:border-[#10B981]"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#10B981] hover:bg-[#0d9669] text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                {t("subscribe")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
