"use client"

import { useState } from "react"
import { useLanguage } from "../LanguageContext"
import { MapPin } from "lucide-react"

export default function AgencyMap() {
  const { t } = useLanguage()
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null)

  // Sample agency data
  const agencies: Agency[] = [
    {
      id: 1,
      name: "Paris",
      address: "123 Avenue des Champs-Élysées, 75008 Paris",
      hours: "Lun-Ven: 8h-19h, Sam: 9h-18h, Dim: 10h-16h",
      lat: 48.8566,
      lng: 2.3522,
    },
    {
      id: 2,
      name: "Lyon",
      address: "45 Rue de la République, 69002 Lyon",
      hours: "Lun-Ven: 8h-19h, Sam: 9h-18h, Dim: 10h-16h",
      lat: 45.764,
      lng: 4.8357,
    },
    {
      id: 3,
      name: "Marseille",
      address: "56 La Canebière, 13001 Marseille",
      hours: "Lun-Ven: 8h-19h, Sam: 9h-18h, Dim: 10h-16h",
      lat: 43.2965,
      lng: 5.3698,
    },
    {
      id: 4,
      name: "Bordeaux",
      address: "12 Cours de l'Intendance, 33000 Bordeaux",
      hours: "Lun-Ven: 8h-19h, Sam: 9h-18h, Dim: 10h-16h",
      lat: 44.8378,
      lng: -0.5792,
    },
    {
      id: 5,
      name: "Toulouse",
      address: "34 Rue d'Alsace-Lorraine, 31000 Toulouse",
      hours: "Lun-Ven: 8h-19h, Sam: 9h-18h, Dim: 10h-16h",
      lat: 43.6047,
      lng: 1.4442,
    },
    {
      id: 6,
      name: "Nantes",
      address: "4 Place Royale, 44000 Nantes",
      hours: "Lun-Ven: 8h-19h, Sam: 9h-18h, Dim: 10h-16h",
      lat: 47.2184,
      lng: -1.5536,
    },
    {
      id: 7,
      name: "Rennes",
      address: "22 Rue de Nemours, 35000 Rennes",
      hours: "Lun-Ven: 8h-19h, Sam: 9h-18h, Dim: 10h-16h",
      lat: 48.1173,
      lng: -1.6778,
    },
    {
      id: 8,
      name: "Monaco",
      address: "15 Boulevard des Moulins, 98000 Monaco",
      hours: "Lun-Ven: 8h-19h, Sam: 9h-18h, Dim: 10h-16h",
      lat: 43.7384,
      lng: 7.4246,
    },
    {
      id: 9,
      name: "Brest",
      address: "65 Rue de Siam, 29200 Brest",
      hours: "Lun-Ven: 8h-19h, Sam: 9h-18h, Dim: 10h-16h",
      lat: 48.3904,
      lng: -4.4861,
    },
    {
      id: 10,
      name: "Rouen",
      address: "89 Rue du Gros-Horloge, 76000 Rouen",
      hours: "Lun-Ven: 8h-19h, Sam: 9h-18h, Dim: 10h-16h",
      lat: 49.4431,
      lng: 1.0993,
    },
  ]

  const handleAgencyClick = (agency: Agency) => {
    setSelectedAgency(agency)
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t("ourLocations")}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agency List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Nos Agences</h3>
            <ul className="space-y-2">
              {agencies.map((agency) => (
                <li key={agency.id}>
                  <button
                    onClick={() => handleAgencyClick(agency)}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      selectedAgency?.id === agency.id ? "bg-[#1E3A8A] text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{agency.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-gray-200 rounded-lg h-[400px] flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-gray-500 mb-2">Google Maps API Integration Placeholder</p>
                <p className="text-sm text-gray-400">This would display an interactive map with all agency locations</p>
              </div>
            </div>

            {/* Selected Agency Details */}
            {selectedAgency && (
              <div className="mt-4 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-2">{selectedAgency.name}</h3>
                <p className="mb-2">{selectedAgency.address}</p>
                <p className="text-gray-600">{selectedAgency.hours}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Type definition
type Agency = {
  id: number
  name: string
  address: string
  hours: string
  lat: number
  lng: number
}
