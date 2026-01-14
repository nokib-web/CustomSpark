import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import AboutSection from "@/components/landing/AboutSection";
import ProductsShowcase from "@/components/landing/ProductsShowcase";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import StatsSection from "@/components/landing/StatsSection";
import CTASection from "@/components/landing/CTASection";
import ContactSection from "@/components/landing/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ProductsShowcase />
      <StatsSection />
      <TestimonialsSection />
      <ContactSection />
      <CTASection />

      {/* Scroll to top button or similar could go here */}
    </main>
  );
}
