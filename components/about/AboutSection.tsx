"use client"

import { useLanguage } from "../LanguageContext"
import Image from "next/image"

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <div className="space-y-16">
      {/* Mission */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">{t("ourMission")}</h2>
          <p className="text-gray-600 mb-4">
            Chez Auto Clean Pro, notre mission est de fournir des services de nettoyage automobile de la plus haute
            qualité, en utilisant des produits respectueux de l'environnement et des techniques innovantes pour redonner
            à votre véhicule son éclat d'origine.
          </p>
          <p className="text-gray-600">
            Fondée en 2010, notre entreprise s'est développée dans toute la France avec un engagement inébranlable
            envers l'excellence et la satisfaction du client. Nous croyons qu'un véhicule propre n'est pas seulement
            esthétique, mais contribue également à sa longévité et à votre bien-être.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden">
          <Image src="/placeholder.svg" alt="Notre mission" width={600} height={400} className="w-full h-auto" />
        </div>
      </section>

      {/* Values */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">{t("ourValues")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Qualité</h3>
            <p className="text-gray-600">
              Nous ne faisons jamais de compromis sur la qualité. Chaque véhicule est traité avec le plus grand soin et
              attention aux détails.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Durabilité</h3>
            <p className="text-gray-600">
              Nous utilisons des produits écologiques et des méthodes qui minimisent notre impact sur l'environnement.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-600">
              Nous recherchons constamment de nouvelles technologies et techniques pour améliorer nos services.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">{t("ourTeam")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square relative">
                <Image src="/placeholder.svg" alt={`Team Member ${member}`} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Jean Dupont</h3>
                <p className="text-gray-500 text-sm">
                  Directeur{" "}
                  {member === 1
                    ? "Général"
                    : member === 2
                      ? "Technique"
                      : member === 3
                        ? "Commercial"
                        : "des Opérations"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
