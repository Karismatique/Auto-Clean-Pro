"use client"

import Link from "next/link"
import { useLanguage } from "./LanguageContext"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1E3A8A] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Auto Clean Pro</h3>
            <p className="mb-4">{t("leadingService")}</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#10B981]">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-[#10B981]">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-[#10B981]">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("ourServices")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/booking" className="hover:text-[#10B981]">
                  {t("interior")}
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-[#10B981]">
                  {t("exterior")}
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-[#10B981]">
                  {t("complete")}
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-[#10B981]">
                  {t("waxing")}
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-[#10B981]">
                  {t("engineCleaning")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("contact")}</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>contact@autocleanpro.fr</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1" />
                <span>123 Avenue des Champs-Élysées, 75008 Paris, France</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Horaires</h3>
            <ul className="space-y-2">
              <li>Lundi - Vendredi: 8h - 19h</li>
              <li>Samedi: 9h - 18h</li>
              <li>Dimanche: 10h - 16h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {currentYear} Auto Clean Pro. {t("allRightsReserved")}.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="/privacy" className="hover:text-[#10B981]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#10B981]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
