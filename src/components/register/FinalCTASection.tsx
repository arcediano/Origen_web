// components/register/FinalCTASection.tsx
'use client';

import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, Mail, HelpCircle } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-r from-origen-bosque to-origen-pino text-white overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-origen-menta/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-origen-pradera/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 mb-6 md:mb-8 border border-white/30">
              <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-origen-menta" />
              <span className="text-sm md:text-base font-medium">¿Necesitas ayuda? Estamos aquí para ti</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
              ¿Tienes dudas sobre el proceso?
              <span className="block text-origen-menta mt-2 md:mt-4">Estamos aquí para ayudarte</span>
            </h2>
            
            <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Nuestro equipo de especialistas está disponible para resolver todas tus preguntas 
              y guiarte en cada paso del proceso de registro y configuración.
            </p>
          </div>
          
          {/* Opciones de contacto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 hover:border-origen-menta transition-colors">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-origen-menta to-origen-pradera flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <MessageSquare className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-center">Chat en vivo</h3>
              <p className="text-white/80 text-sm md:text-base text-center mb-4 md:mb-6">
                Respuesta instantánea durante horario comercial
              </p>
              <div className="text-center">
                <span className="text-xs md:text-sm bg-origen-menta text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-medium">
                  Disponible ahora
                </span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 hover:border-origen-menta transition-colors">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-origen-menta to-origen-pradera flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <Phone className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-center">Teléfono</h3>
              <p className="text-white/80 text-center mb-1 md:mb-2">+34 900 123 456</p>
              <p className="text-white/60 text-xs md:text-sm text-center">
                L-V: 9:00-18:00
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 hover:border-origen-menta transition-colors">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-origen-menta to-origen-pradera flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <Mail className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-center">Email</h3>
              <p className="text-white/80 text-center mb-1 md:mb-2">soporte@origen.es</p>
              <p className="text-white/60 text-xs md:text-sm text-center">
                Respuesta en menos de 24h
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-2xl mx-auto mb-6 md:mb-8 border border-white/10">
              <p className="text-base md:text-lg text-white/90 mb-4 md:mb-6">
                ¿Prefieres explorar por tu cuenta? Consulta nuestras preguntas frecuentes
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10 px-4 md:px-8 py-3 md:py-6 text-sm md:text-base"
                >
                  Ver preguntas frecuentes
                </Button>
                <Button 
                  size="lg" 
                  className="bg-origen-menta hover:bg-origen-menta/90 text-white px-4 md:px-8 py-3 md:py-6 text-sm md:text-base"
                >
                  Contactar con soporte
                </Button>
              </div>
            </div>
            
            <p className="text-white/60 text-xs md:text-sm">
              Todos los datos están protegidos según la LOPD y RGPD
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}