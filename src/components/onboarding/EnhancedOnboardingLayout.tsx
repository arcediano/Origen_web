// 📁 /src/components/onboarding/EnhancedOnboardingLayout.tsx
/**
 * Layout principal del onboarding - Diseño premium estilo SimpleRegistration
 * @component
 * @version 6.0.0
 * @description Layout limpio, profesional, con cards y badges de paso
 * @author Equipo de Diseño Origen
 */

'use client';

import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Shield,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Clock,
  Leaf
} from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
}

interface EnhancedOnboardingLayoutProps {
  steps: Step[];
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onComplete: () => void;
  children: ReactNode;
  isSubmitting?: boolean;
  isValid?: boolean;
}

export function EnhancedOnboardingLayout({
  steps,
  currentStep,
  onNext,
  onBack,
  onComplete,
  children,
  isSubmitting = false,
  isValid = true,
}: EnhancedOnboardingLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];
  const totalSteps = steps.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [currentStep, isMobileMenuOpen, isMobile]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-origen-crema/30">
      {/* ====================================================================
          HEADER - Mismo estilo que SimpleRegistration (fondo blanco, sombra sutil)
      ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo y progreso */}
            <div className="flex items-center gap-4">
              <Logo size="sm" variant="dark" className="hidden sm:flex" />
              <Logo size="sm" variant="dark" showText={false} className="sm:hidden" />
              
              <div className="hidden md:flex items-center gap-4">
                <div className="w-32">
                  <Progress 
                    value={progress} 
                    variant="leaf"
                    size="sm"
                    showLabel={false}
                    className="bg-origen-pastel"
                  />
                </div>
                <Badge variant="outline" size="sm" className="text-origen-bosque">
                  Paso {currentStep + 1} de {totalSteps}
                </Badge>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-origen-bosque"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex text-origen-bosque"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Ayuda
              </Button>
            </div>
          </div>

          {/* Barra de progreso móvil */}
          <div className="md:hidden mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-origen-oscuro">
                Progreso: {Math.round(progress)}%
              </span>
              <span className="text-xs text-origen-hoja">
                {currentStep + 1}/{totalSteps}
              </span>
            </div>
            <Progress 
              value={progress} 
              variant="leaf"
              size="sm"
              showLabel={false}
              className="bg-origen-pastel"
            />
          </div>
        </div>
      </header>

      {/* ====================================================================
          CONTENIDO PRINCIPAL
      ==================================================================== */}
      <main className="pt-20 lg:pt-24 min-h-screen">
        <div className="flex flex-col lg:flex-row">
          
          {/* ====================================================================
              SIDEBAR - Desktop - Card estilo SimpleRegistration
          ==================================================================== */}
          <aside className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-24 p-6">
              <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                {/* Header con gradiente sutil */}
                <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-origen-crema/50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-origen-bosque flex items-center justify-center shadow-sm">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-origen-bosque">
                        Tu viaje en Origen
                      </h3>
                      <p className="text-sm text-origen-hoja">
                        Configuración paso a paso
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="p-5 space-y-2">
                  {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;
                    
                    return (
                      <div
                        key={step.id}
                        className={cn(
                          "relative p-4 rounded-lg transition-all",
                          isActive && "bg-origen-crema/50 border border-origen-pradera/30",
                          isCompleted && "bg-white",
                          !isActive && !isCompleted && "hover:bg-gray-50"
                        )}
                      >
                        {/* Línea conectora */}
                        {index < steps.length - 1 && (
                          <div 
                            className={cn(
                              "absolute left-5 top-full w-0.5 h-4",
                              isCompleted ? "bg-origen-pradera" : "bg-gray-200"
                            )}
                          />
                        )}
                        
                        <div className="flex items-center gap-3">
                          {/* Indicador de estado */}
                          <div className={cn(
                            "relative w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                            isActive && "bg-origen-bosque text-white shadow-sm",
                            isCompleted && "bg-origen-pradera/20 text-origen-pradera border border-origen-pradera/30",
                            !isActive && !isCompleted && "bg-gray-100 text-gray-400"
                          )}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <span className="text-sm font-bold">{index + 1}</span>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className={cn(
                              "text-sm font-semibold",
                              isActive && "text-origen-bosque",
                              isCompleted && "text-origen-oscuro",
                              !isActive && !isCompleted && "text-gray-600"
                            )}>
                              {step.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                              {step.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tiempo estimado */}
                <div className="p-5 border-t border-gray-200 bg-gray-50/50">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-origen-hoja" />
                    <span className="font-medium text-origen-oscuro">Tiempo estimado:</span>
                    <span className="text-origen-hoja">~10 minutos</span>
                  </div>
                </div>
              </Card>
            </div>
          </aside>

          {/* ====================================================================
              MENÚ MÓVIL - Overlay con cards
          ==================================================================== */}
          {isMobileMenuOpen && isMobile && (
            <div className="lg:hidden fixed inset-0 top-16 z-40 bg-white border-t border-gray-200 animate-in slide-in-from-top-2 duration-300">
              <div className="p-5 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {steps.map((step, index) => {
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  
                  return (
                    <Card
                      key={step.id}
                      className={cn(
                        "p-4",
                        isActive && "border-origen-pradera/50 bg-origen-crema/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                          isActive && "bg-origen-bosque text-white",
                          isCompleted && "bg-origen-pradera/20 text-origen-pradera",
                          !isActive && !isCompleted && "bg-gray-100 text-gray-400"
                        )}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={cn(
                            "font-medium text-sm",
                            isActive && "text-origen-bosque"
                          )}>
                            {step.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {step.description}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* ====================================================================
              ÁREA DE CONTENIDO - Cards estilo SimpleRegistration
          ==================================================================== */}
          <div className="flex-1 lg:pl-8">
            <div className="mx-auto px-4 lg:px-8 py-6 lg:py-8 max-w-5xl">
              
              {/* Header del paso - Mismo estilo que SimpleRegistration */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-origen-bosque flex items-center justify-center shadow-sm">
                      <span className="text-2xl text-white">
                        {currentStepData.icon}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" size="sm">
                          Paso {currentStep + 1} de {totalSteps}
                        </Badge>
                      </div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-origen-bosque">
                        {currentStepData.title}
                      </h1>
                      <p className="text-origen-hoja mt-2 text-base lg:text-lg max-w-3xl">
                        {currentStepData.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progreso desktop */}
                  <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-sm font-medium text-origen-hoja">
                        Completado
                      </div>
                      <div className="text-2xl font-bold text-origen-bosque">
                        {Math.round(progress)}%
                      </div>
                    </div>
                    <div className="w-24">
                      <Progress 
                        value={progress} 
                        variant="leaf"
                        size="md"
                        showLabel={false}
                        className="bg-origen-pastel"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido del paso - Cards estilo SimpleRegistration */}
              <div className="space-y-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ====================================================================
          NAVEGACIÓN INFERIOR - Mismo estilo que SimpleRegistration
      ==================================================================== */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-80 xl:left-96 bg-white border-t border-gray-200 shadow-sm z-40">
        <div className="px-5 lg:px-7 py-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* Info de seguridad */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 rounded-lg bg-origen-pradera/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-origen-pradera" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-origen-oscuro">
                  Cifrado SSL
                </p>
                <p className="text-xs text-gray-500">
                  Datos protegidos
                </p>
              </div>
            </div>

            {/* Botones de navegación */}
            <div className="flex items-center gap-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={onBack}
                  disabled={isSubmitting}
                  className="border-gray-300 text-origen-bosque hover:bg-origen-crema/50 hover:border-origen-pradera"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
              )}

              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={onNext}
                  disabled={!isValid || isSubmitting}
                  className="bg-origen-bosque hover:bg-origen-pino text-white shadow-md hover:shadow-lg transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      Continuar
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={onComplete}
                  disabled={!isValid || isSubmitting}
                  className="bg-origen-bosque hover:bg-origen-pino text-white shadow-md hover:shadow-lg transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Finalizando...
                    </>
                  ) : (
                    <>
                      Completar Onboarding
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Mismo estilo que SimpleRegistration */}
      <footer className="hidden lg:block lg:ml-80 xl:ml-96 py-6 px-8 bg-white border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600">
            ¿Necesitas ayuda?{' '}
            <a 
              href="mailto:soporte@origen.es" 
              className="font-medium text-origen-bosque hover:text-origen-hoja transition-colors"
            >
              soporte@origen.es
            </a>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <span>Respuesta en &lt;2h</span>
            <span>•</span>
            <span>+1000 productores</span>
            <span>•</span>
            <span>4.8/5 ★</span>
          </div>
        </div>
      </footer>
    </div>
  );
}