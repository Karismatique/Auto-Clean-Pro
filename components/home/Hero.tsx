"use client"

import Link from "next/link"
import { useLanguage } from "../LanguageContext"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <div
      className="relative h-[80vh] min-h-[600px] bg-cover bg-center"
      style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t("welcome")}</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">{t("leadingService")}</p>
        <Link
          href="/booking"
          className="bg-[#10B981] hover:bg-[#0d9669] text-white font-bold py-3 px-8 rounded-md text-lg transition-colors duration-300"
        >
          {t("bookNow")}
        </Link>
      </div>
    </div>
  )
}
