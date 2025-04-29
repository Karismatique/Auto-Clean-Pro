import Hero from "@/components/home/Hero"
import Services from "@/components/home/Services"
import AgencyMap from "@/components/home/AgencyMap"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Auto Clean Pro - Services de Nettoyage Auto",
  description: "Leader du nettoyage intérieur et extérieur de voitures en France",
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <AgencyMap />
    </div>
  )
}
