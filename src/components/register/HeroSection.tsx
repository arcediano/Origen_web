// components/register/HeroSection.tsx
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Clock, ShieldCheck, Globe, Leaf, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const stats = [
    { 
      value: '15%', 
      label: 'Comisión plataforma', 
      icon: TrendingUp, 
      sublabel: 'Solo cuando vendes'
    },
    { 
      value: '24-48h', 
      label: 'Aprobación inicial', 
      icon: Clock, 
      sublabel: 'Rápido y sencillo'
    },
    { 
      value: '0€', 
      label: 'Sin cuota de entrada', 
      icon: ShieldCheck, 
      sublabel: 'Sin costes fijos'
    },
    { 
      value: 'España', 
      label: 'Cobertura nacional', 
      icon: Globe, 
      sublabel: 'Llega a todo el país'
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background con imagen real de productor auténtico */}
      <div className="absolute inset-0">
        {/* Imagen de fondo auténtica - Productor local */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Agricultor cosechando productos frescos directamente de la tierra"
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="100vw"
            style={{ objectPosition: 'center 30%' }}
          />
        </div>
        
        {/* Sistema de overlay orgánico con máscara radial */}
        <div className="absolute inset-0 z-10">
          {/* Capa 1: Sombreado radial para profundidad */}
          <div 
            className="absolute inset-0" 
            style={{
              background: 'radial-gradient(ellipse at 20% 50%, rgba(27, 67, 50, 0.85) 0%, rgba(27, 67, 50, 0.7) 40%, rgba(27, 67, 50, 0.4) 70%, transparent 100%)'
            }}
          />
          
          {/* Capa 2: Degradado lineal suave para transición inferior */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-2/5"
            style={{
              background: 'linear-gradient(to top, rgba(241, 250, 238, 1) 0%, rgba(241, 250, 238, 0.8) 15%, rgba(241, 250, 238, 0.4) 40%, transparent 70%)'
            }}
          />
          
          {/* Capa 3: Vignette sutil en los bordes */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(27, 67, 50, 0.2) 100%)'
            }}
          />
          
          {/* Capa 4: Toque de color natural en esquinas */}
          <div className="absolute top-0 left-0 w-1/2 h-1/2 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-origen-pradera rounded-full blur-3xl" />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
            {/* Columna izquierda - Contenido principal */}
            <div className="flex-1 w-full lg:w-8/12">
              <div className="inline-flex items-center gap-2 md:gap-3 bg-white/20 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 mb-6 md:mb-8 border border-white/30 max-w-max shadow-lg">
                <div className="flex items-center gap-1 md:gap-2">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-origen-menta" />
                  <span className="text-xs md:text-sm font-semibold text-white">Programa de apoyo exclusivo para productores</span>
                </div>
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-origen-menta" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight tracking-tight text-white drop-shadow-lg">
                Conecta tu<span className="text-origen-menta block drop-shadow-xl">pasión con</span>
                <span className="text-origen-menta drop-shadow-xl">quien la valora</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-white/95 mb-8 md:mb-10 max-w-2xl leading-relaxed drop-shadow-md">
                Únete al marketplace que une productores locales españoles con consumidores 
                conscientes. Más que una plataforma, somos una comunidad que valora la 
                autenticidad, calidad y transparencia.
              </p>
              
              {/* Stats en 2 columnas */}
              <div className="mb-8 md:mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="group">
                        <div className="bg-white/20 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/30 group-hover:border-origen-menta transition-all duration-300 h-full hover:shadow-xl hover:scale-[1.02]">
                          <div className="flex items-start gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br from-origen-menta/50 to-origen-pradera/50 flex items-center justify-center flex-shrink-0 shadow-lg">
                              <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 drop-shadow-sm">
                                {stat.value}
                              </div>
                              <div className="text-sm md:text-base font-semibold text-white/95 mb-1">
                                {stat.label}
                              </div>
                              <div className="text-xs md:text-sm text-white/80">
                                {stat.sublabel}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* CTA principal */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                <Button 
                  size="lg"
                  className="bg-origen-menta hover:bg-origen-menta/90 text-white text-base md:text-lg px-8 md:px-12 py-6 md:py-7 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto font-semibold"
                  onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="flex items-center justify-center gap-2 md:gap-3">
                    Empezar ahora
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                  </span>
                </Button>
                
                <div className="flex items-center gap-3 text-white/95">
                  <div className="flex -space-x-2 md:-space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/30 border-2 border-origen-menta/50 flex items-center justify-center shadow-lg">
                        <Leaf className="w-4 h-4 md:w-5 md:h-5 text-origen-menta" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base font-bold drop-shadow-sm">
                      +500 productores
                    </span>
                    <span className="text-xs md:text-sm text-white/80">
                      ya confían en Origen
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Columna derecha - Tarjeta de registro */}
            <div className="flex-1 w-full lg:w-4/12 mt-8 lg:mt-0">
              <div className="relative">
                {/* Tarjeta de registro simulada */}
                <div className="relative bg-white/25 backdrop-blur-xl border border-white/40 rounded-3xl p-6 md:p-8 lg:p-9 shadow-2xl">
                  <div className="text-center mb-6 md:mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 bg-gradient-to-br from-origen-menta to-origen-pradera rounded-full mb-4 md:mb-5 shadow-xl mx-auto">
                      <div className="relative">
                        <Leaf className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 text-white" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full bg-white flex items-center justify-center shadow-md">
                          <span className="text-origen-bosque text-xs font-bold">✓</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-2xl font-bold mb-2 md:mb-3 text-white drop-shadow-sm">Registro simplificado</h3>
                    <p className="text-white/90 text-sm md:text-base">Todo en menos de 5 minutos</p>
                  </div>
                  
                  {/* Simulación de pasos del formulario */}
                  <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                    {['Nombre del negocio', 'Tipo de productos', 'Ubicación', 'Categoría'].map((step, i) => (
                      <div key={i} className="relative">
                        <div className="bg-white/20 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/30 hover:border-origen-menta/50 transition-colors">
                          <div className="flex items-center justify-between mb-1 md:mb-2">
                            <span className="text-xs md:text-sm font-medium text-white/90 truncate pr-2">{step}</span>
                            {i < 2 && (
                              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-origen-menta flex items-center justify-center flex-shrink-0 shadow-md">
                                <CheckCircle className="w-2 h-2 md:w-3 md:h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="h-1.5 md:h-2 bg-white/25 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-origen-menta to-origen-pradera rounded-full transition-all duration-500" 
                              style={{ width: i === 0 ? '100%' : i === 1 ? '80%' : i === 2 ? '60%' : '40%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Resumen de comisión */}
                  <div className="bg-gradient-to-r from-white/25 to-white/15 rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/30">
                    <div className="flex flex-col items-center justify-between gap-3 md:gap-4">
                      <div className="text-center">
                        <p className="text-white/70 text-xs md:text-sm mb-1">Comisión por venta</p>
                        <p className="text-2xl md:text-3xl font-bold text-white">15%</p>
                        <p className="text-white/70 text-xs md:text-sm mt-1">Solo cuando vendes</p>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-origen-menta">
                        <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="font-semibold text-sm md:text-base">Sin costes ocultos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicador de scroll para móvil */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 lg:hidden animate-bounce z-40">
        <div className="flex flex-col items-center text-white">
          <span className="text-xs mb-1 font-medium drop-shadow-md">Desplázate</span>
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center p-1 shadow-lg">
            <div className="w-1 h-3 bg-white/80 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}