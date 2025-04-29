"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "./LanguageContext"
import { Menu, X, Globe, User } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr")
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#1E3A8A]">Auto Clean Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-[#1E3A8A] font-medium">
              {t("home")}
            </Link>
            <Link href="/booking" className="text-gray-700 hover:text-[#1E3A8A] font-medium">
              {t("booking")}
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#1E3A8A] font-medium">
              {t("about")}
            </Link>
            <Link href="/reviews" className="text-gray-700 hover:text-[#1E3A8A] font-medium">
              {t("reviews")}
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-[#1E3A8A] font-medium">
              {t("blog")}
            </Link>

            {/* Language Toggle */}
            <button onClick={toggleLanguage} className="flex items-center text-gray-700 hover:text-[#1E3A8A]">
              <Globe className="h-5 w-5 mr-1" />
              <span className="uppercase">{language}</span>
            </button>

            {/* Account */}
            <Link
              href="#"
              className="flex items-center bg-[#1E3A8A] text-white px-4 py-2 rounded-md hover:bg-[#152a66] transition-colors"
            >
              <User className="h-4 w-4 mr-1" />
              <span>{t("login")}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleLanguage} className="text-gray-700 hover:text-[#1E3A8A] mr-4">
              <Globe className="h-6 w-6" />
            </button>
            <button onClick={toggleMenu} className="text-gray-700 hover:text-[#1E3A8A]">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-gray-700 hover:text-[#1E3A8A] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              href="/booking"
              className="block text-gray-700 hover:text-[#1E3A8A] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("booking")}
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 hover:text-[#1E3A8A] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("about")}
            </Link>
            <Link
              href="/reviews"
              className="block text-gray-700 hover:text-[#1E3A8A] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("reviews")}
            </Link>
            <Link
              href="/blog"
              className="block text-gray-700 hover:text-[#1E3A8A] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("blog")}
            </Link>
            <Link
              href="#"
              className="block text-gray-700 hover:text-[#1E3A8A] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("login")} / {t("signup")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
