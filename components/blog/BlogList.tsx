"use client"

import { useLanguage } from "../LanguageContext"
import Link from "next/link"
import Image from "next/image"

export default function BlogList() {
  const { t } = useLanguage()

  // Sample blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Comment garder l'intérieur de votre voiture propre entre les lavages",
      excerpt: "Découvrez nos astuces pour maintenir la propreté de l'habitacle de votre véhicule au quotidien.",
      date: "12 avril 2023",
      category: "Conseils",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Les avantages d'un polissage professionnel pour votre carrosserie",
      excerpt:
        "Le polissage ne sert pas qu'à faire briller votre voiture, il protège aussi la peinture. Voici pourquoi c'est essentiel.",
      date: "28 mars 2023",
      category: "Services",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Nettoyage écologique : nos engagements pour l'environnement",
      excerpt:
        "Chez Auto Clean Pro, nous utilisons des produits respectueux de l'environnement. Découvrez notre démarche éco-responsable.",
      date: "15 mars 2023",
      category: "Environnement",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 4,
      title: "Comment choisir le bon type de lavage pour votre véhicule",
      excerpt: "Intérieur, extérieur ou complet ? Découvrez quel service correspond le mieux à vos besoins.",
      date: "2 mars 2023",
      category: "Guide",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 5,
      title: "Préparation esthétique avant la vente : maximisez la valeur de votre voiture",
      excerpt:
        "Un véhicule propre et bien entretenu se vend mieux et plus cher. Nos conseils pour une préparation optimale.",
      date: "18 février 2023",
      category: "Conseils",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 6,
      title: "Les erreurs à éviter lors du lavage de votre voiture",
      excerpt:
        "Certaines pratiques peuvent endommager la peinture ou l'intérieur de votre véhicule. Voici comment les éviter.",
      date: "5 février 2023",
      category: "Conseils",
      imageUrl: "/placeholder.svg",
    },
  ]

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image src={post.imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              <div className="absolute top-4 left-4">
                <span className="bg-[#1E3A8A] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">{post.date}</div>
              <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              <Link href="#" className="text-[#1E3A8A] font-medium hover:underline">
                {t("readMore")} →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
            &laquo; Précédent
          </button>
          <button className="px-3 py-2 rounded-md bg-[#1E3A8A] text-white">1</button>
          <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
          <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
          <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
            Suivant &raquo;
          </button>
        </nav>
      </div>
    </div>
  )
}
