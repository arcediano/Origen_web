// components/register/ProcessSection.tsx
/**
 * Sección de Proceso - Paso a paso del registro
 * @version 1.1.0 - Correcciones de accesibilidad aplicadas
 * @description Muestra el proceso en 4 pasos claros para nuevos vendedores
 * @author Equipo de Desarrollo Origen
 * @updated Marzo 2026
 * 
 * @important Botón principal actualizado para cumplir contraste WCAG AA
 * @note El degradado Menta-Pradera solo para elementos grandes con texto blanco
 */

'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, FileText, Users, Settings, Package } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    { 
      number: 1, 
      title: 'Registro simple', 
      description: 'Formulario rápido de 5 minutos',
      icon: FileText,
      color: 'bg-origen-menta/20', // Fondo con opacidad
      iconColor: 'text-origen-menta' // Icono color completo
    },
    { 
      number: 2, 
      title: 'Revisión personal', 
      description: 'Nuestro equipo evalúa tu perfil',
      icon: Users,
      color: 'bg-origen-pradera/20',
      iconColor: 'text-origen-pradera'
    },
    { 
      number: 3, 
      title: 'Configuración', 
      description: 'Completas tu tienda online',
      icon: Settings,
      color: 'bg-origen-hoja/20',
      iconColor: 'text-origen-hoja'
    },
    { 
      number: 4, 
      title: '¡Primera venta!', 
      description: 'Empiezas a vender y crecer',
      icon: Package,
      color: 'bg-origen-pino/20',
      iconColor: 'text-origen-pino'
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-origen-crema">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-origen-bosque mb-4 md:mb-6">
            Un camino claro hacia
            <span className="block text-origen-pradera">tu éxito online</span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Desde tu registro hasta tu primera venta, te acompañamos en cada paso 
            con herramientas simples y soporte personalizado.
          </p>
        </div>
        
        <div className="relative">
          {/* Línea de progresión decorativa */}
          <div className="hidden lg:block absolute left-0 right-0 top-16 h-2 bg-gradient-to-r from-origen-menta via-origen-pradera to-origen-hoja rounded-full opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-origen-menta to-origen-hoja rounded-full animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="group relative">
                  <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg md:shadow-xl border border-gray-200 hover:border-origen-pradera hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2">
                    <div className="relative mb-4 md:mb-6">
                      <div className="absolute -top-2 -right-2">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-md md:shadow-lg flex items-center justify-center border border-origen-crema">
                          <span className="text-xs md:text-sm font-bold text-origen-bosque">0{step.number}</span>
                        </div>
                      </div>
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 ${step.color}`}>
                        <Icon className={`w-8 h-8 md:w-10 md:h-10 ${step.iconColor}`} />
                      </div>
                    </div>
                    
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-origen-bosque mb-2 md:mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base text-center mb-4 md:mb-6">
                      {step.description}
                    </p>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 text-xs md:text-sm font-medium px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-origen-crema border border-origen-pradera/30">
                        {index === 0 ? (
                          <>
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-origen-pradera" />
                            <span className="text-origen-pradera">Empieza aquí</span>
                          </>
                        ) : (
                          <span className="text-gray-500">{index === 3 ? '¡Objetivo!' : 'Paso siguiente'}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 md:w-6 md:h-6 bg-white border-2 border-origen-pradera rounded-full flex items-center justify-center">
                        <ArrowRight className="w-2 h-2 md:w-3 md:h-3 text-origen-pradera" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-origen-crema to-white rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-2xl mx-auto border border-origen-pradera/30 mb-6 md:mb-8">
            <p className="text-lg md:text-xl text-origen-bosque mb-3 md:mb-4 font-semibold">
              ¿Listo para dar el primer paso?
            </p>
            <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
              Completa el formulario de registro y nuestro equipo contactará contigo 
              para ayudarte con la configuración inicial.
            </p>
          </div>
          
          {/* 
            Botón CTA Principal - CORREGIDO
            @important Cambiado de degradado Menta-Pradera a Verde Bosque sólido
            @reason Contraste Menta con texto blanco: 2.9:1 (solo para elementos grandes)
            @solution Verde Bosque con texto blanco: 10.5:1 (WCAG AAA ✓)
          */}
          <Button 
            size="lg"
            className="bg-origen-bosque hover:bg-origen-pino text-white px-8 md:px-12 py-4 md:py-6 text-base md:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 font-semibold"
            onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="flex items-center gap-2 md:gap-3">
              Completar registro ahora
              <ArrowRight className="w-4 h-4 md:w-6 md:h-6" />
            </span>
          </Button>
          
          {/* Nota de accesibilidad (opcional para desarrollo) */}
          <p className="mt-4 text-xs text-gray-500 hidden lg:block">
            ✓ Contraste: 10.5:1 (WCAG AAA) | ✓ Texto legible: 18px+ | ✓ Color accesible
          </p>
        </div>
      </div>
    </section>
  );
}