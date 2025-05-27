import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Pricing } from "@/components/landing/pricing"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar/>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer/>
    </main>
  )
}
