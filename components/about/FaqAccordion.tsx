"use client"

import { useState } from "react"
import { useLanguage } from "../LanguageContext"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FaqAccordion() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs = [
    {
      question: "Combien de temps dure un nettoyage complet ?",
      answer:
        "Un nettoyage complet (intérieur et extérieur) prend généralement entre 2 et 3 heures, selon la taille et l'état du véhicule. Nous vous recommandons de prévoir suffisamment de temps ou d'utiliser notre service de voiturier dans certaines agences.",
    },
    {
      question: "Quels produits utilisez-vous ?",
      answer:
        "Nous utilisons exclusivement des produits de haute qualité, respectueux de l'environnement et sans danger pour les surfaces de votre véhicule. Nos produits sont spécialement formulés pour nettoyer en profondeur tout en préservant les matériaux.",
    },
    {
      question: "Puis-je attendre pendant que ma voiture est nettoyée ?",
      answer:
        "Absolument ! Toutes nos agences disposent d'espaces d'attente confortables avec Wi-Fi gratuit, café et rafraîchissements. Certaines de nos agences proposent également un service de navette pour vous déposer à proximité pendant le nettoyage.",
    },
    {
      question: "Comment puis-je payer pour vos services ?",
      answer:
        "Nous acceptons les paiements par carte bancaire, espèces, et dans certaines agences, les chèques. Vous pouvez également payer en ligne lors de votre réservation. Pour les clients réguliers, nous proposons des forfaits et des cartes de fidélité avec des réductions.",
    },
    {
      question: "Proposez-vous des services pour les flottes d'entreprise ?",
      answer:
        "Oui, nous avons des programmes spéciaux pour les entreprises avec des flottes de véhicules. Nous offrons des tarifs préférentiels, des horaires flexibles et même des services sur site pour les grandes flottes. Contactez notre service commercial pour plus d'informations.",
    },
    {
      question: "Que faire si je ne suis pas satisfait du service ?",
      answer:
        "Votre satisfaction est notre priorité absolue. Si vous n'êtes pas entièrement satisfait de nos services, veuillez nous en informer immédiatement et nous ferons tout notre possible pour rectifier la situation. Nous offrons une garantie de satisfaction sur tous nos services.",
    },
  ]

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-8 text-center">{t("faq")}</h2>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 last:border-b-0">
            <button
              onClick={() => toggleAccordion(index)}
              className="flex justify-between items-center w-full py-4 px-2 text-left focus:outline-none"
            >
              <span className="font-medium text-lg">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-[#1E3A8A]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#1E3A8A]" />
              )}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96 pb-4" : "max-h-0"
              }`}
            >
              <p className="px-2 text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
