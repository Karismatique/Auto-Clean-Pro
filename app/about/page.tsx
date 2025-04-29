import AboutSection from "@/components/about/AboutSection"
import FaqAccordion from "@/components/about/FaqAccordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "À Propos - Auto Clean Pro",
  description: "Découvrez notre mission et nos valeurs",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <AboutSection />
      <FaqAccordion />
    </div>
  )
}
