// 📁 /src/components/onboarding/OnboardingLayout.tsx
/**
 * Layout visual del onboarding - Solo UI
 * Presenta estructura visual sin lógica de negocio
 */

'use client';

import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
}

interface OnboardingLayoutProps {
  steps: Step[];
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  onComplete: () => void;
  children: ReactNode;
  isSubmitting?: boolean;
  isValid?: boolean;
}

export function OnboardingLayout({
  steps,
  currentStep,
  onNext,
  onBack,
  onComplete,
  children,
  isSubmitting = false,
  isValid = true,
}: OnboardingLayoutProps) {
  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-origen-crema to-white">
      {/* Header - Estructura visual */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" showText />
            <div className="text-sm text-gray-600">
              Paso {currentStep + 1} de {steps.length}
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Contenido principal - UI puro */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Encabezado del paso */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            {currentStepData.icon}
            <h1 className="text-2xl font-bold text-origen-bosque">
              {currentStepData.title}
            </h1>
          </div>
          <p className="text-gray-600">
            {currentStepData.description}
          </p>
        </div>

        {/* Contenido del paso (UI del formulario) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
          {children}
        </div>

        {/* Navegación - Botones visuales */}
        <div className="flex justify-between items-center">
          <div>
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={onBack}
                disabled={isSubmitting}
              >
                <ChevronLeft className="w-4 h-4" />
                Atrás
              </Button>
            )}
          </div>

          <div>
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={onNext}
                disabled={!isValid || isSubmitting}
                className="gap-2 bg-origen-bosque hover:bg-origen-pino"
              >
                Continuar
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={onComplete}
                disabled={!isValid || isSubmitting}
                className="bg-origen-menta hover:bg-origen-pradera text-origen-bosque"
              >
                {isSubmitting ? 'Completando...' : 'Finalizar Onboarding'}
              </Button>
            )}
          </div>
        </div>
      </main>

      {/* Footer - Información visual */}
      <footer className="border-t border-gray-200 bg-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p className="text-origen-bosque font-medium">🌱 Cada paso acerca a tu negocio a más clientes conscientes</p>
          <p className="mt-1">¿Necesitas ayuda? Contacta a <a href="mailto:soporte@origen.es" className="text-origen-pino hover:underline">soporte@origen.es</a></p>
        </div>
      </footer>
    </div>
  );
}