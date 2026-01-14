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
      <footer className="py-12 bg-slate-900 border-t border-slate-800 text-center">
        <div className="container mx-auto px-6">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Custom Spark. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
