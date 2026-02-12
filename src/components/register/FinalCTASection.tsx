// components/register/FinalCTASection.tsx
/**
 * Sección Final CTA - Contacto y soporte (VERSIÓN CORREGIDA)
 * @version 1.2.0 - Correcciones según Manual de Marca v1.0
 * @description Última llamada a la acción con fondo claro para mejor legibilidad
 * @author Equipo de Desarrollo Origen
 * @updated Marzo 2026
 * 
 * @important CAMBIO CRÍTICO: Fondo claro en lugar de oscuro
 * @reason Manual de Marca Sección 3.3 especifica contraste adecuado
 * @note Botones ahora sobre fondo claro con colores accesibles
 */

'use client';

import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, Mail, HelpCircle, Shield, Clock, Users } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-origen-crema via-white to-origen-crema overflow-hidden">
      {/* Elementos decorativos sutiles */}
      <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-origen-pradera/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-origen-menta/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            {/* Badge según Manual de Marca - Fondo claro, texto oscuro */}
            <div className="inline-flex items-center gap-2 bg-origen-pradera/10 text-origen-bosque rounded-full px-4 py-2 md:px-6 md:py-3 mb-6 md:mb-8 border border-origen-pradera/30">
              <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-origen-pradera" />
              <span className="text-sm md:text-base font-medium">
                ¿Necesitas ayuda personalizada? Estamos aquí para ti
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-origen-bosque mb-6 md:mb-8">
              ¿Tienes dudas sobre el proceso?
              <span className="block text-origen-pradera mt-2 md:mt-4">Habla con nuestro equipo</span>
            </h2>
            
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nuestros especialistas en productores locales te guiarán en cada paso, 
              desde el registro hasta tu primera venta. Respuesta garantizada en menos de 24h.
            </p>
          </div>
          
          {/* Estadísticas de soporte */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-4 text-center border border-origen-pastel shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-origen-pradera mb-1">24h</div>
              <div className="text-xs md:text-sm text-gray-600">Respuesta máxima</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-origen-pastel shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-origen-pradera mb-1">98%</div>
              <div className="text-xs md:text-sm text-gray-600">Satisfacción</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-origen-pastel shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-origen-pradera mb-1">ES/EN</div>
              <div className="text-xs md:text-sm text-gray-600">Idiomas soporte</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-origen-pastel shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-origen-pradera mb-1">5★</div>
              <div className="text-xs md:text-sm text-gray-600">Valoración</div>
            </div>
          </div>
          
          {/* Opciones de contacto - Tarjetas claras sobre fondo claro */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 hover:border-origen-pradera transition-colors shadow-lg hover:shadow-xl">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-origen-pradera to-origen-hoja flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <MessageSquare className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-center text-origen-bosque">
                Chat en vivo
              </h3>
              <p className="text-gray-600 text-sm md:text-base text-center mb-4 md:mb-6">
                Respuesta instantánea de L-V 9:00-18:00
              </p>
              <div className="text-center">
                <span className="text-xs md:text-sm bg-origen-pradera text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-medium">
                  Disponible ahora
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 hover:border-origen-pradera transition-colors shadow-lg hover:shadow-xl">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-origen-pradera to-origen-hoja flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <Phone className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-center text-origen-bosque">
                Teléfono directo
              </h3>
              <p className="text-gray-700 text-center mb-1 md:mb-2 font-medium">+34 900 123 456</p>
              <p className="text-gray-500 text-xs md:text-sm text-center">
                Lunes a viernes: 9:00-18:00
              </p>
              <p className="text-gray-400 text-xs text-center mt-1">
                Coste llamada nacional
              </p>
            </div>
            
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 hover:border-origen-pradera transition-colors shadow-lg hover:shadow-xl">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-origen-pradera to-origen-hoja flex items-center justify-center mb-4 md:mb-6 mx-auto">
                <Mail className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-center text-origen-bosque">
                Email prioritario
              </h3>
              <p className="text-gray-700 text-center mb-1 md:mb-2 font-medium">soporte@origen.es</p>
              <p className="text-gray-500 text-xs md:text-sm text-center">
                Respuesta en menos de 24h
              </p>
              <p className="text-gray-400 text-xs text-center mt-1">
                7 días a la semana
              </p>
            </div>
          </div>
          
          {/* CTA final - Con fondo claro */}
          <div className="text-center">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-2xl mx-auto mb-6 md:mb-8 border border-origen-pradera/30 shadow-lg">
              <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                ¿Prefieres explorar por tu cuenta? Tenemos recursos detallados
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-origen-pradera text-origen-pradera hover:bg-origen-pradera/10 px-4 md:px-8 py-3 md:py-6 text-sm md:text-base"
                >
                  Ver preguntas frecuentes
                </Button>
                
                {/* 
                  Botón primario - Verde Bosque sobre fondo claro 
                  Manual de Marca: Verde Bosque (#1B4332) con texto blanco
                  Contraste: 10.5:1 (WCAG AAA) ✓
                */}
                <Button 
                  size="lg" 
                  className="bg-origen-bosque hover:bg-origen-pino text-white px-4 md:px-8 py-3 md:py-6 text-sm md:text-base"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Contactar con soporte
                  </span>
                </Button>
              </div>
            </div>
            
            {/* Información legal */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-gray-500 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-origen-pradera" />
                <span>Datos protegidos LOPD/RGPD</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-origen-pradera" />
                <span>Respuesta garantizada 24h</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 text-origen-pradera" />
                <span>Equipo especializado en productores</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}