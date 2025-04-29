import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      'home.title': 'Auto Clean Pro - Lavage Auto',
      'home.welcome': 'Bienvenue chez Auto Clean Pro',
      'home.subtitle': 'Le leader du lavage auto en France',
      'home.bookNow': 'Réserver maintenant',
      'home.services': 'Nos services',
      'home.interior': 'Nettoyage intérieur',
      'home.interiorDesc': 'Nettoyage complet de l’intérieur de votre véhicule.',
      'home.exterior': 'Nettoyage extérieur',
      'home.exteriorDesc': 'Lavage extérieur pour une brillance éclatante.',
      'home.complete': 'Nettoyage complet',
      'home.completeDesc': 'Intérieur et extérieur pour un véhicule impeccable.',
      'home.agencies': 'Nos agences',
      'booking.title': 'Réservation',
      'booking.agency': 'Sélectionner une agence',
      'booking.selectAgency': 'Choisir une agence',
      'booking.cleaningType': 'Type de nettoyage',
      'booking.interior': 'Intérieur',
      'booking.exterior': 'Extérieur',
      'booking.complete': 'Complet',
      'booking.date': 'Date et heure',
      'booking.options': 'Options supplémentaires',
      'booking.wax': 'Cire',
      'booking.engine': 'Nettoyage moteur',
      'booking.disinfection': 'Désinfection',
      'booking.vehicle': 'Véhicule',
      'booking.make': 'Marque',
      'booking.model': 'Modèle',
      'booking.licensePlate': 'Plaque d’immatriculation',
      'booking.sedan': 'Berline',
      'booking.suv': 'SUV',
      'booking.4x4': '4x4',
      'booking.price': 'Prix total',
      'booking.submit': 'Réserver',
      'booking.success': 'Réservation confirmée !',
      'booking.error': 'Erreur lors de la réservation.'
    }
  },
  en: {
    translation: {
      'home.title': 'Auto Clean Pro - Car Wash',
      'home.welcome': 'Welcome to Auto Clean Pro',
      'home.subtitle': 'France’s leading car wash service',
      'home.bookNow': 'Book Now',
      'home.services': 'Our Services',
      'home.interior': 'Interior Cleaning',
      'home.interiorDesc': 'Thorough cleaning of your vehicle’s interior.',
      'home.exterior': 'Exterior Cleaning',
      'home.exteriorDesc': 'Exterior wash for a sparkling shine.',
      'home.complete': 'Complete Cleaning',
      'home.completeDesc': 'Interior and exterior for a pristine vehicle.',
      'home.agencies': 'Our Agencies',
      'booking.title': 'Booking',
      'booking.agency': 'Select an Agency',
      'booking.selectAgency': 'Choose an agency',
      'booking.cleaningType': 'Cleaning Type',
      'booking.interior': 'Interior',
      'booking.exterior': 'Exterior',
      'booking.complete': 'Complete',
      'booking.date': 'Date and Time',
      'booking.options': 'Additional Options',
      'booking.wax': 'Wax',
      'booking.engine': 'Engine Cleaning',
      'booking.disinfection': 'Disinfection',
      'booking.vehicle': 'Vehicle',
      'booking.make': 'Make',
      'booking.model': 'Model',
      'booking.licensePlate': 'License Plate',
      'booking.sedan': 'Sedan',
      'booking.suv': 'SUV',
      'booking.4x4': '4x4',
      'booking.price': 'Total Price',
      'booking.submit': 'Book',
      'booking.success': 'Booking confirmed!',
      'booking.error': 'Error during booking.'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;