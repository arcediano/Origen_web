// 📁 /src/app/onboarding/page.tsx
/**
 * @page Onboarding Premium - VERSIÓN CORREGIDA
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { EnhancedStep1Location } from '@/components/onboarding/steps/EnhancedStep1Location';
import { EnhancedStep2Story } from '@/components/onboarding/steps/EnhancedStep2Story';
import { EnhancedStep3Visual } from '@/components/onboarding/steps/EnhancedStep3Visual';
import { EnhancedStep4Capacity } from '@/components/onboarding/steps/EnhancedStep4Capacity';
import { EnhancedStep5Documents } from '@/components/onboarding/steps/EnhancedStep5Documents';
import { EnhancedStep6Stripe } from '@/components/onboarding/steps/EnhancedStep6Stripe';

import {
  MapPin,
  BookOpen,
  Camera,
  Package,
  FileText,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Leaf,
  ArrowRight,
  CheckCircle2,
  Clock
} from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: 'Ubicación',
    description: 'Dónde se encuentra tu negocio',
    icon: MapPin,
    color: 'from-origen-pradera to-origen-hoja'
  },
  {
    id: 2,
    title: 'Historia',
    description: 'Cuéntanos tu proyecto',
    icon: BookOpen,
    color: 'from-origen-hoja to-origen-pino'
  },
  {
    id: 3,
    title: 'Perfil visual',
    description: 'Logo, banner y fotos',
    icon: Camera,
    color: 'from-origen-pino to-origen-bosque'
  },
  {
    id: 4,
    title: 'Capacidad',
    description: 'Producción y logística',
    icon: Package,
    color: 'from-origen-bosque to-origen-pradera'
  },
  {
    id: 5,
    title: 'Documentación',
    description: 'Verifica tu negocio',
    icon: FileText,
    color: 'from-origen-oscuro to-origen-bosque'
  },
  {
    id: 6,
    title: 'Pagos',
    description: 'Configura Stripe',
    icon: CreditCard,
    color: 'from-origen-menta to-origen-pradera'
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const [formData, setFormData] = useState({
    step1: { 
      address: '', 
      city: '', 
      province: '', 
      postalCode: '', 
      categories: [], 
      locationImages: [] 
    },
    step2: { 
      businessName: '', 
      tagline: '', 
      description: '', 
      values: [], 
      teamSize: '',
      mission: '',
      vision: '',
      photos: [] 
    },
    step3: { 
      logo: null, 
      banner: null, 
      productImages: [] 
    },
    step4: {
      productionCapacity: { daily: 50 },
      deliveryOptions: [],
      deliveryAreas: [],
      minOrderAmount: 20
    },
    step5: {
      documents: [],
      producerCategory: 'agricola',
      verificationStatus: 'pending'
    },
    step6: {
      stripeConnected: false,
      acceptTerms: false
    }
  });

  const currentStepData = STEPS[currentStep];
  const StepIcon = currentStepData.icon;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    const props = {
      data: formData[`step${currentStep + 1}` as keyof typeof formData],
      onChange: (data: any) => setFormData(prev => ({ ...prev, [`step${currentStep + 1}`]: data }))
    };

    switch (currentStep) {
      case 0: return <EnhancedStep1Location {...props} />;
      case 1: return <EnhancedStep2Story {...props} />;
      case 2: return <EnhancedStep3Visual {...props} />;
      case 3: return <EnhancedStep4Capacity {...props} />;
      case 4: return <EnhancedStep5Documents {...props} />;
      case 5: return <EnhancedStep6Stripe {...props} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-origen-bosque flex items-center justify-center transition-all group-hover:bg-origen-pino">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-origen-bosque">ORIGEN</span>
            </Link>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3">
                <span className="text-xs text-gray-500">
                  Paso {currentStep + 1} de {STEPS.length}
                </span>
                <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-origen-menta to-origen-pradera rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              
              <Badge variant="outline" size="sm" className="bg-white">
                <Sparkles className="w-3 h-3 mr-1.5 text-origen-pradera" />
                Onboarding exclusivo
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16 min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-4 space-y-8">
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    'bg-gradient-to-br',
                    currentStepData.color,
                    'text-white shadow-sm'
                  )}>
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <Badge variant="outline" size="sm" className="mb-2 bg-white">
                      Paso {currentStep + 1}
                    </Badge>
                    <h1 className="text-2xl font-bold text-origen-bosque">
                      {currentStepData.title}
                    </h1>
                  </div>
                </div>
                <p className="text-gray-600 text-base pl-16">
                  {currentStepData.description}
                </p>
              </div>

              <div className="space-y-1 pt-4">
                {STEPS.map((step, index) => {
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.id}
                      className={cn(
                        'relative flex items-center gap-4 py-3 px-4 rounded-lg transition-colors',
                        isActive && 'bg-origen-crema/50'
                      )}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                        isCompleted && 'bg-origen-pradera/10 text-origen-pradera',
                        isActive && 'bg-origen-bosque text-white shadow-sm',
                        !isActive && !isCompleted && 'bg-gray-100 text-gray-400'
                      )}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={cn(
                          'text-sm font-medium',
                          isActive && 'text-origen-bosque',
                          isCompleted && 'text-gray-700',
                          !isActive && !isCompleted && 'text-gray-500'
                        )}>
                          {step.title}
                        </p>
                      </div>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-origen-menta" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 text-xs text-gray-500 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Tiempo estimado: 8-10 minutos</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <Card className="border-0 shadow-none bg-transparent">
                <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10">
                  
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      {renderStep()}
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-100">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentStep === 0 || isSubmitting}
                      className="border-gray-200 text-gray-600 hover:text-origen-bosque hover:border-origen-pradera"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Anterior
                    </Button>

                    {currentStep < STEPS.length - 1 ? (
                      <Button
                        onClick={handleNext}
                        disabled={!isValid || isSubmitting}
                        className="bg-origen-bosque hover:bg-origen-pino text-white shadow-sm hover:shadow transition-all"
                      >
                        Continuar
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleComplete}
                        disabled={!isValid || isSubmitting}
                        className="bg-origen-bosque hover:bg-origen-pino text-white shadow-sm hover:shadow transition-all"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Completando...
                          </>
                        ) : (
                          <>
                            Finalizar
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  ¿Necesitas ayuda?{' '}
                  <a 
                    href="mailto:soporte@origen.es" 
                    className="font-medium text-origen-bosque hover:text-origen-hoja transition-colors"
                  >
                    soporte@origen.es
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}