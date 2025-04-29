"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

type Language = "fr" | "en"

type Translations = {
  [key: string]: {
    fr: string
    en: string
  }
}

// Sample translations
const translations: Translations = {
  welcome: {
    fr: "Bienvenue chez Auto Clean Pro",
    en: "Welcome to Auto Clean Pro",
  },
  bookNow: {
    fr: "Réserver Maintenant",
    en: "Book Now",
  },
  interior: {
    fr: "Intérieur",
    en: "Interior",
  },
  exterior: {
    fr: "Extérieur",
    en: "Exterior",
  },
  complete: {
    fr: "Complet",
    en: "Complete",
  },
  about: {
    fr: "À Propos",
    en: "About",
  },
  reviews: {
    fr: "Avis",
    en: "Reviews",
  },
  blog: {
    fr: "Blog",
    en: "Blog",
  },
  booking: {
    fr: "Réservation",
    en: "Booking",
  },
  home: {
    fr: "Accueil",
    en: "Home",
  },
  contact: {
    fr: "Contact",
    en: "Contact",
  },
  login: {
    fr: "Connexion",
    en: "Login",
  },
  signup: {
    fr: "S'inscrire",
    en: "Sign Up",
  },
  leadingService: {
    fr: "Le leader du nettoyage auto en France",
    en: "The leading car cleaning service in France",
  },
  ourServices: {
    fr: "Nos Services",
    en: "Our Services",
  },
  ourLocations: {
    fr: "Nos Agences",
    en: "Our Locations",
  },
  interiorDesc: {
    fr: "Nettoyage complet de l'habitacle, sièges, tapis et surfaces",
    en: "Complete cleaning of the cabin, seats, carpets and surfaces",
  },
  exteriorDesc: {
    fr: "Lavage, polissage et protection de la carrosserie",
    en: "Washing, polishing and protection of the bodywork",
  },
  completeDesc: {
    fr: "Service complet intérieur et extérieur pour une voiture comme neuve",
    en: "Complete interior and exterior service for a car like new",
  },
  selectAgency: {
    fr: "Sélectionnez une agence",
    en: "Select an agency",
  },
  selectService: {
    fr: "Sélectionnez un service",
    en: "Select a service",
  },
  selectDate: {
    fr: "Sélectionnez une date",
    en: "Select a date",
  },
  additionalOptions: {
    fr: "Options supplémentaires",
    en: "Additional options",
  },
  waxing: {
    fr: "Cirage",
    en: "Waxing",
  },
  engineCleaning: {
    fr: "Nettoyage moteur",
    en: "Engine cleaning",
  },
  disinfection: {
    fr: "Désinfection",
    en: "Disinfection",
  },
  vehicleDetails: {
    fr: "Détails du véhicule",
    en: "Vehicle details",
  },
  make: {
    fr: "Marque",
    en: "Make",
  },
  model: {
    fr: "Modèle",
    en: "Model",
  },
  licensePlate: {
    fr: "Plaque d'immatriculation",
    en: "License plate",
  },
  vehicleType: {
    fr: "Type de véhicule",
    en: "Vehicle type",
  },
  sedan: {
    fr: "Berline",
    en: "Sedan",
  },
  suv: {
    fr: "SUV",
    en: "SUV",
  },
  totalPrice: {
    fr: "Prix total",
    en: "Total price",
  },
  payNow: {
    fr: "Payer maintenant",
    en: "Pay now",
  },
  yourInformation: {
    fr: "Vos informations",
    en: "Your information",
  },
  name: {
    fr: "Nom",
    en: "Name",
  },
  email: {
    fr: "Email",
    en: "Email",
  },
  phone: {
    fr: "Téléphone",
    en: "Phone",
  },
  password: {
    fr: "Mot de passe",
    en: "Password",
  },
  submit: {
    fr: "Soumettre",
    en: "Submit",
  },
  ourMission: {
    fr: "Notre Mission",
    en: "Our Mission",
  },
  ourValues: {
    fr: "Nos Valeurs",
    en: "Our Values",
  },
  ourTeam: {
    fr: "Notre Équipe",
    en: "Our Team",
  },
  faq: {
    fr: "Questions Fréquentes",
    en: "Frequently Asked Questions",
  },
  customerReviews: {
    fr: "Avis Clients",
    en: "Customer Reviews",
  },
  shareExperience: {
    fr: "Partagez votre expérience",
    en: "Share your experience",
  },
  rating: {
    fr: "Évaluation",
    en: "Rating",
  },
  comment: {
    fr: "Commentaire",
    en: "Comment",
  },
  uploadPhoto: {
    fr: "Télécharger une photo",
    en: "Upload a photo",
  },
  latestArticles: {
    fr: "Derniers Articles",
    en: "Latest Articles",
  },
  readMore: {
    fr: "Lire plus",
    en: "Read more",
  },
  newsletter: {
    fr: "Newsletter",
    en: "Newsletter",
  },
  subscribeNewsletter: {
    fr: "Abonnez-vous à notre newsletter",
    en: "Subscribe to our newsletter",
  },
  subscribe: {
    fr: "S'abonner",
    en: "Subscribe",
  },
  followUs: {
    fr: "Suivez-nous",
    en: "Follow us",
  },
  allRightsReserved: {
    fr: "Tous droits réservés",
    en: "All rights reserved",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language]
    }
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
