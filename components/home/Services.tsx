"use client"

import { useLanguage } from "../LanguageContext"
import { Droplet, Brush, Sparkles } from "lucide-react"

export default function Services() {
  const { t } = useLanguage()

  const services = [
    {
      id: 1,
      title: t("interior"),
      description: t("interiorDesc"),
      icon: <Brush className="h-12 w-12 text-[#1E3A8A]" />,
    },
    {
      id: 2,
      title: t("exterior"),
      description: t("exteriorDesc"),
      icon: <Droplet className="h-12 w-12 text-[#1E3A8A]" />,
    },
    {
      id: 3,
      title: t("complete"),
      description: t("completeDesc"),
      icon: <Sparkles className="h-12 w-12 text-[#1E3A8A]" />,
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t("ourServices")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
