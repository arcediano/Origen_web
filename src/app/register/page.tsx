// app/register/page.tsx
/**
 * Landing Page de Registro - Origen Marketplace
 * @route /register
 * @description Landing page completa para captar vendedores con formulario integrado
 */

import { SimpleRegistration } from '@/components/forms/SimpleRegistration';
import { HeroSection } from '@/components/register/HeroSection';
import { BenefitsSection } from '@/components/register/BenefitsSection';
import { ProcessSection } from '@/components/register/ProcessSection';
import { TestimonialsSection } from '@/components/register/TestimonialsSection';
import { FinalCTASection } from '@/components/register/FinalCTASection';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Primera impresión impactante */}
      <HeroSection />
      
      {/* Benefits Section - Razones para unirse */}
      <BenefitsSection />
      
      {/* Process Section - Cómo funciona */}
      <ProcessSection />
      
      {/* Testimonials Section - Social proof */}
      <TestimonialsSection />
      
      {/* Form Section - Llamada a la acción principal */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-origen-crema to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <SimpleRegistration />
          </div>
        </div>
      </section>
      
      {/* Final CTA Section - Soporte y preguntas frecuentes */}
      <FinalCTASection />
      
      {/* Footer informativo */}
      <footer className="bg-origen-bosque text-white py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <p className="text-white/80 text-sm md:text-base mb-3 md:mb-4">
              Origen Marketplace - Conectando productores locales con consumidores conscientes
            </p>
            <p className="text-white/60 text-xs md:text-sm">
              © 2026 Origen. Todos los derechos reservados. | 
              <a href="/privacidad" className="ml-2 hover:text-white transition-colors">Política de Privacidad</a> | 
              <a href="/cookies" className="ml-2 hover:text-white transition-colors">Cookies</a> | 
              <a href="/aviso-legal" className="ml-2 hover:text-white transition-colors">Aviso Legal</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}