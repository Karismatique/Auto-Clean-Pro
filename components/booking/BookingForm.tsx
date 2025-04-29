"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useLanguage } from "../LanguageContext"
import { Calendar, Car, Check } from "lucide-react"

export default function BookingForm() {
  const { t } = useLanguage()

  // Form state
  const [agency, setAgency] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [options, setOptions] = useState<string[]>([])
  const [vehicleMake, setVehicleMake] = useState("")
  const [vehicleModel, setVehicleModel] = useState("")
  const [licensePlate, setLicensePlate] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)

  // Sample data
  const agencies = [
    { id: 1, name: "Paris" },
    { id: 2, name: "Lyon" },
    { id: 3, name: "Marseille" },
    { id: 4, name: "Bordeaux" },
    { id: 5, name: "Toulouse" },
    { id: 6, name: "Nantes" },
    { id: 7, name: "Rennes" },
    { id: 8, name: "Monaco" },
    { id: 9, name: "Brest" },
    { id: 10, name: "Rouen" },
  ]

  const services = [
    { id: "interior", name: t("interior"), basePrice: 80 },
    { id: "exterior", name: t("exterior"), basePrice: 60 },
    { id: "complete", name: t("complete"), basePrice: 120 },
  ]

  const additionalOptions = [
    { id: "waxing", name: t("waxing"), price: 30 },
    { id: "engine", name: t("engineCleaning"), price: 45 },
    { id: "disinfection", name: t("disinfection"), price: 25 },
  ]

  const vehicleTypes = [
    { id: "sedan", name: t("sedan"), multiplier: 1 },
    { id: "suv", name: t("suv"), multiplier: 1.2 },
    { id: "van", name: "Van", multiplier: 1.5 },
    { id: "truck", name: "Truck", multiplier: 1.8 },
  ]

  // Available time slots
  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]

  // Handle option toggle
  const toggleOption = (optionId: string) => {
    setOptions((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]))
  }

  // Calculate total price
  useEffect(() => {
    let price = 0

    // Base price from service
    const selectedService = services.find((s) => s.id === serviceType)
    if (selectedService) {
      price += selectedService.basePrice
    }

    // Add options
    options.forEach((optionId) => {
      const option = additionalOptions.find((o) => o.id === optionId)
      if (option) {
        price += option.price
      }
    })

    // Apply vehicle type multiplier
    const selectedVehicleType = vehicleTypes.find((v) => v.id === vehicleType)
    if (selectedVehicleType && price > 0) {
      price = price * selectedVehicleType.multiplier
    }

    setTotalPrice(Math.round(price))
  }, [serviceType, options, vehicleType])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to a server
    console.log({
      agency,
      serviceType,
      date,
      time,
      options,
      vehicleMake,
      vehicleModel,
      licensePlate,
      vehicleType,
      name,
      email,
      phone,
      totalPrice,
    })

    // Show confirmation (placeholder)
    alert("Votre réservation a été confirmée!")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Agency Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("selectAgency")}</label>
            <select
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
              required
            >
              <option value="">-- {t("selectAgency")} --</option>
              {agencies.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("selectService")}</label>
            <div className="space-y-2">
              {services.map((service) => (
                <label
                  key={service.id}
                  className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="serviceType"
                    value={service.id}
                    checked={serviceType === service.id}
                    onChange={() => setServiceType(service.id)}
                    className="h-4 w-4 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                    required
                  />
                  <span className="ml-2">
                    {service.name} - {service.basePrice}€
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("selectDate")}</label>
            <div className="flex items-center mb-4 border border-gray-300 rounded-md p-3 focus-within:ring-1 focus-within:ring-[#1E3A8A] focus-within:border-[#1E3A8A]">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 outline-none"
                required
              />
            </div>

            {date && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                  required
                >
                  <option value="">-- Sélectionnez une heure --</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Additional Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("additionalOptions")}</label>
            <div className="space-y-2">
              {additionalOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={options.includes(option.id)}
                    onChange={() => toggleOption(option.id)}
                    className="h-4 w-4 text-[#1E3A8A] focus:ring-[#1E3A8A] rounded"
                  />
                  <span className="ml-2">
                    {option.name} - {option.price}€
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Vehicle Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">{t("vehicleDetails")}</h3>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("make")}</label>
                <div className="flex items-center border border-gray-300 rounded-md p-3 focus-within:ring-1 focus-within:ring-[#1E3A8A] focus-within:border-[#1E3A8A]">
                  <Car className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={vehicleMake}
                    onChange={(e) => setVehicleMake(e.target.value)}
                    className="flex-1 outline-none"
                    placeholder="Renault, Peugeot, etc."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("model")}</label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                  placeholder="Clio, 308, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("licensePlate")}</label>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                  placeholder="AB-123-CD"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("vehicleType")}</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                  required
                >
                  <option value="">-- {t("vehicleType")} --</option>
                  {vehicleTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">{t("yourInformation")}</h3>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("name")}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("email")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("phone")}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Price and Submit */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium">{t("totalPrice")}:</span>
              <span className="text-2xl font-bold text-[#1E3A8A]">{totalPrice}€</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E3A8A] hover:bg-[#152a66] text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              <Check className="h-5 w-5 mr-2" />
              {t("payNow")}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
