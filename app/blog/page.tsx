import BlogList from "@/components/blog/BlogList"
import NewsletterSignup from "@/components/blog/NewsletterSignup"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Auto Clean Pro",
  description: "Conseils et actualités sur le nettoyage automobile",
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Blog</h1>
      <BlogList />
      <div className="mt-16">
        <NewsletterSignup />
      </div>
    </div>
  )
}
