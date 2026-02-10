// 📁 /src/app/onboarding/page.tsx
/**
 * Página principal del onboarding - Solo UI
 * Componente de demostración visual
 */

import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { Step1Location } from '@/components/onboarding/Step1Location';
// import { Step2Story } from '@/components/onboarding/Step2Story';
// import { Step3Visual } from '@/components/onboarding/Step3Visual';
// import { Step4Capacity } from '@/components/onboarding/Step4Capacity';
// import { Step5Documents } from '@/components/onboarding/Step5Documents';
// import { Step6Stripe } from '@/components/onboarding/Step6Stripe';
import { ONBOARDING_STEPS } from '@/constants/onboarding';
import { 
  MapPin, 
  BookOpen, 
  Image, 
  Package, 
  FileText, 
  CreditCard 
} from 'lucide-react';

// Iconos para cada paso (según manual de marca)
const STEP_ICONS = [
  <MapPin key="location" className="w-6 h-6 text-origen-bosque" />,
  <BookOpen key="story" className="w-6 h-6 text-origen-bosque" />,
  <Image key="visual" className="w-6 h-6 text-origen-bosque" />,
  <Package key="capacity" className="w-6 h-6 text-origen-bosque" />,
  <FileText key="documents" className="w-6 h-6 text-origen-bosque" />,
  <CreditCard key="stripe" className="w-6 h-6 text-origen-bosque" />,
];

export default function OnboardingPage() {
  // Datos de ejemplo para mostrar UI (no lógica real)
  const exampleData = {
    location: {
      address: "Calle Ejemplo, 123",
      city: "Madrid",
      province: "Madrid",
      postalCode: "28001",
      region: "meseta",
      categories: ["vegetales", "frutas"],
    },
    story: {
      businessName: "Granja Orgánica del Valle",
      description: "Productos orgánicos desde 1990",
      values: ["sostenibilidad", "calidad", "tradición"],
      history: "Tres generaciones dedicadas a la agricultura ecológica",
      certifications: ["ecológico", "km0"],
    },
  };

  // Preparar steps con iconos (UI puro)
  const steps = ONBOARDING_STEPS.map((step, index) => ({
    ...step,
    icon: STEP_ICONS[index],
  }));

  // Estado visual para demostración (sin lógica real)
  const currentStep = 0; // Mostrando paso 1
  const isSubmitting = false; // Estado visual
  const isValid = true; // Estado visual

  // Renderizar el paso actual (solo UI)
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1Location
            data={exampleData.location}
            // onChange es solo para mostrar prop, no funcional
            onChange={() => {}}
          />
        );
      case 1:
        return (
          <Step2Story
            data={exampleData.story}
            onChange={() => {}}
          />
        );
      case 2:
        return <Step3Visual onChange={() => {}} />;
      case 3:
        return <Step4Capacity onChange={() => {}} />;
      case 4:
        return <Step5Documents onChange={() => {}} />;
      case 5:
        return <Step6Stripe onChange={() => {}} />;
      default:
        return null;
    }
  };

  return (
    <OnboardingLayout
      steps={steps}
      currentStep={currentStep}
      onNext={() => {}} // Función vacía para UI
      onBack={() => {}} // Función vacía para UI
      onComplete={() => {}} // Función vacía para UI
      isSubmitting={isSubmitting}
      isValid={isValid}
    >
      {renderStep()}
    </OnboardingLayout>
  );
}