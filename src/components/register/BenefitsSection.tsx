// components/register/BenefitsSection.tsx
'use client';

import { Users, Shield, Truck, Target, Package, Award, CheckCircle } from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      icon: Users,
      title: 'Comunidad comprometida',
      description: 'Llega a miles de consumidores que valoran productos locales y de calidad.',
      features: ['Clientes conscientes', 'Reseñas auténticas', 'Comunidad activa']
    },
    {
      icon: Shield,
      title: 'Protección total',
      description: 'Pagos seguros con Stripe y políticas claras que te respaldan.',
      features: ['Pagos seguros', 'Protección contra fraude', 'Seguro de envío']
    },
    {
      icon: Truck,
      title: 'Logística simplificada',
      description: 'Sistema de envíos integrado y herramientas de gestión de pedidos.',
      features: ['Envíos automatizados', 'Seguimiento en tiempo real', 'Gestiona múltiples carriers']
    },
    {
      icon: Target,
      title: 'Visibilidad garantizada',
      description: 'Posicionamiento en marketplace y campañas de marketing conjunto.',
      features: ['SEO optimizado', 'Campañas promocionales', 'Presencia en redes']
    },
    {
      icon: Package,
      title: 'Control completo',
      description: 'Gestiona inventario, precios y disponibilidad en tiempo real.',
      features: ['Dashboard intuitivo', 'Alertas de stock', 'Estadísticas detalladas']
    },
    {
      icon: Award,
      title: 'Sello de calidad',
      description: 'Certificación Origen que valida la autenticidad de tus productos.',
      features: ['Sello verificable', 'Confianza del cliente', 'Diferenciación']
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-origen-menta/10 to-origen-pradera/10 text-origen-bosque rounded-full px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-6">
            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-origen-menta" />
            <span className="text-sm md:text-base font-semibold">Todo lo que necesitas en un solo lugar</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-origen-bosque mb-4 md:mb-6">
            ¿Por qué vender en Origen?
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ofrecemos herramientas integrales y soporte dedicado para hacer crecer 
            tu negocio local de forma sostenible
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-origen-menta/5 to-origen-pradera/5 rounded-2xl md:rounded-3xl transform group-hover:scale-[1.02] transition-transform duration-300"></div>
                <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-200 group-hover:border-origen-menta group-hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-origen-menta/20 to-origen-pradera/20 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-origen-bosque" />
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-origen-bosque mb-3 md:mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                    {benefit.description}
                  </p>
                  
                  <div className="space-y-2 md:space-y-3">
                    {benefit.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 md:gap-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-origen-menta/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-2 h-2 md:w-3 md:h-3 text-origen-menta" />
                        </div>
                        <span className="text-xs md:text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Sección de resumen */}
        <div className="mt-12 md:mt-16 lg:mt-20 pt-8 md:pt-12 lg:pt-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-origen-crema to-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-origen-pradera/30">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-origen-menta mb-2 md:mb-3">15%</div>
                  <h4 className="font-bold text-origen-bosque text-sm md:text-base mb-1 md:mb-2">Comisión única</h4>
                  <p className="text-gray-600 text-xs md:text-sm">Solo pagas cuando vendes</p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-origen-menta mb-2 md:mb-3">0€</div>
                  <h4 className="font-bold text-origen-bosque text-sm md:text-base mb-1 md:mb-2">Sin costes fijos</h4>
                  <p className="text-gray-600 text-xs md:text-sm">No hay cuotas mensuales</p>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-origen-menta mb-2 md:mb-3">24h</div>
                  <h4 className="font-bold text-origen-bosque text-sm md:text-base mb-1 md:mb-2">Soporte prioritario</h4>
                  <p className="text-gray-600 text-xs md:text-sm">Respuesta en menos de 24h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}