// components/register/SimpleRegistration.tsx
/**
 * @file SimpleRegistration.tsx
 * @description Formulario de registro premium - Diseño amplio, campos legibles
 * @version 26.0.0 - Diseño premium, sin cabecera, márgenes cero laterales
 */

'use client';

import { useState, useCallback, useEffect, useRef, useId } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ============================================================================
// COMPONENTES UI
// ============================================================================

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertWithIcon } from '@/components/ui/alert';
import { Select } from '@/components/ui/select';
import { Loading } from '@/components/shared/Loading';

// ============================================================================
// CONSTANTES Y VALIDACIONES
// ============================================================================

import { PRODUCER_CATEGORIES } from '@/constants/categories';
import { PROVINCIAS_ESPANA } from '@/constants/provinces';
import {
  initialRegistrationSchema,
  type InitialRegistrationFormData
} from '@/lib/validations/seller';

// ============================================================================
// ICONOS - Misma línea que BenefitsSection y ProcessSection
// ============================================================================

import {
  Check,
  AlertCircle,
  ArrowRight,
  X,
  User,
  Building2,
  Store,
  MapPin,
  Package,
  Leaf,
  Mail,
  CheckCircle,
  Phone,
  Heart,
  Beef,
  ChefHat,
  Wine,
  Sprout,
  Flower,
  Briefcase,
  BadgeCheck,
  Shield,
  ShieldCheck,
  Copy,
  CheckCircle2,
  Clock,
  Award,
  TrendingUp,
  Globe,
  Sparkles
} from 'lucide-react';

// ============================================================================
// TIPOS
// ============================================================================

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

interface SimpleRegistrationProps {
  onSuccess?: (data: InitialRegistrationFormData) => void;
  className?: string;
}

// ============================================================================
// UTILS
// ============================================================================

const generateTrackingCode = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORG-${random}-${year}`;
};

const useLockBodyScroll = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [locked]);
};

const CATEGORY_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'agricola': Sprout,
  'ganadero': Beef,
  'artesano': ChefHat,
  'apicultor': Flower,
  'viticultor': Wine,
  'especializado': Package
};

const getCategoryIcon = (categoryId: string): React.ComponentType<{ className?: string }> => {
  return CATEGORY_ICON_MAP[categoryId] || Package;
};

// ============================================================================
// COMPONENTES AUXILIARES - DISEÑO PREMIUM
// ============================================================================

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  className
}) => {
  const percentage = Math.min(100, Math.round((value / max) * 100));
  
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-origen-hoja">Mínimo 50 caracteres</span>
        <span className="text-sm font-semibold text-origen-menta">{percentage}%</span>
      </div>
      <div className="h-2 bg-origen-crema rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-origen-menta to-origen-pradera transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

interface CustomCheckboxProps {
  id?: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id: providedId,
  label,
  description,
  checked,
  onChange,
  required = false,
  error,
  className
}) => {
  const generatedId = useId();
  const checkboxId = providedId || `checkbox-${generatedId}`;

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-start gap-3">
        <div className="relative flex items-center justify-center mt-0.5 flex-shrink-0">
          <button
            type="button"
            id={checkboxId}
            role="checkbox"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={cn(
              "h-5 w-5 rounded-md border-2 bg-white transition-all",
              "focus:outline-none focus:ring-2 focus:ring-origen-menta/50 focus:ring-offset-2",
              checked ? "bg-origen-bosque border-origen-bosque" : "border-gray-300 hover:border-origen-pradera",
              error && "border-destructive"
            )}
          >
            {checked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center"
              >
                <Check className="h-4 w-4 text-white stroke-[3]" />
              </motion.div>
            )}
          </button>
        </div>
        <div className="flex-1">
          <label htmlFor={checkboxId} className="text-base font-medium text-origen-bosque cursor-pointer">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
          {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
        </div>
      </div>
      {error && (
        <p className="text-sm text-destructive mt-1 flex items-center gap-1 ml-8">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

interface BusinessTypeSelectorProps {
  value: 'individual' | 'company';
  onChange: (value: 'individual' | 'company') => void;
  error?: string;
}

const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({
  value,
  onChange,
  error
}) => {
  return (
    <div className="space-y-3">
      <label className="text-base font-medium text-origen-bosque flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-origen-pradera" />
        Tipo de negocio <span className="text-destructive">*</span>
      </label>
      <div className="grid grid-cols-2 gap-4">
        {[
          { id: 'individual', label: 'Autónomo', desc: 'Particular / Freelance', icon: User },
          { id: 'company', label: 'Empresa', desc: 'Sociedad / Corporación', icon: Building2 }
        ].map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id as 'individual' | 'company')}
              className={cn(
                "relative bg-white rounded-xl p-5 border-2 transition-all",
                "hover:shadow-lg hover:scale-[1.02]",
                "focus:outline-none focus:ring-2 focus:ring-origen-menta/50",
                isSelected
                  ? "border-origen-menta bg-origen-menta/5 shadow-md"
                  : "border-gray-200 hover:border-origen-pradera"
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-origen-menta to-origen-pradera rounded-full flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              )}
              <div className="flex flex-col items-center text-center">
                <div className={cn(
                  "w-16 h-16 rounded-xl flex items-center justify-center mb-3 transition-all",
                  isSelected
                    ? "bg-gradient-to-br from-origen-menta to-origen-pradera text-white shadow-lg"
                    : "bg-origen-crema text-origen-bosque group-hover:scale-110"
                )}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className={cn(
                  "text-lg font-semibold mb-1",
                  isSelected ? "text-origen-bosque" : "text-gray-900"
                )}>
                  {option.label}
                </h3>
                <p className="text-sm text-gray-500">{option.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="text-sm text-destructive mt-2 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

interface CategoryCardProps {
  category: typeof PRODUCER_CATEGORIES[0];
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onSelect
}) => {
  const IconComponent = getCategoryIcon(category.id);
  
  const getGradient = (id: string): string => {
    const gradients: Record<string, string> = {
      'agricola': 'from-origen-pradera/20 to-origen-hoja/20',
      'ganadero': 'from-origen-hoja/20 to-origen-pino/20',
      'artesano': 'from-origen-pino/20 to-origen-bosque/20',
      'apicultor': 'from-origen-menta/20 to-origen-pradera/20',
      'viticultor': 'from-origen-pradera/20 to-origen-pino/20',
      'especializado': 'from-origen-menta/20 to-origen-hoja/20'
    };
    return gradients[id] || 'from-origen-pradera/20 to-origen-hoja/20';
  };
  
  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      className={cn(
        "group relative bg-white rounded-xl p-5 border-2 transition-all",
        "hover:shadow-lg hover:scale-[1.02]",
        "focus:outline-none focus:ring-2 focus:ring-origen-menta/50",
        isSelected
          ? "border-origen-menta bg-gradient-to-br from-origen-menta/5 to-origen-pradera/5 shadow-md"
          : "border-gray-200 hover:border-origen-pradera"
      )}
    >
      {isSelected && (
        <div className="absolute top-3 right-3">
          <div className="w-6 h-6 bg-gradient-to-br from-origen-menta to-origen-pradera rounded-full flex items-center justify-center shadow-md">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      )}
      <div className="flex flex-col items-center text-center">
        <div className={cn(
          "w-16 h-16 rounded-xl flex items-center justify-center mb-3 transition-all",
          isSelected
            ? "bg-gradient-to-br from-origen-menta to-origen-pradera text-white shadow-lg"
            : `bg-gradient-to-br ${getGradient(category.id)} text-origen-bosque group-hover:scale-110`
        )}>
          <IconComponent className="w-8 h-8" />
        </div>
        <h3 className={cn(
          "text-lg font-semibold mb-1",
          isSelected ? "text-origen-bosque" : "text-gray-900"
        )}>
          {category.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {category.description}
        </p>
      </div>
    </button>
  );
};

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  badge?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className,
  badge
}) => {
  return (
    <div className={cn(
      "bg-white rounded-2xl border border-gray-200 p-8",
      "hover:border-origen-pradera transition-all shadow-sm hover:shadow-md",
      className
    )}>
      {badge && (
        <div className="inline-flex items-center gap-2 bg-origen-crema/80 rounded-full px-4 py-1.5 mb-6 border border-origen-pradera/30">
          <Sparkles className="w-4 h-4 text-origen-menta" />
          <span className="text-sm font-semibold text-origen-bosque">{badge}</span>
        </div>
      )}
      <h3 className="text-xl font-bold text-origen-bosque mb-2">{title}</h3>
      {description && (
        <p className="text-base text-gray-600 mb-6">{description}</p>
      )}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// MODAL DE CONFIRMACIÓN - DISEÑO PREMIUM
// ============================================================================

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  contactName: string;
  email: string;
  city: string;
  province: string;
  trackingCode: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  businessName,
  contactName,
  email,
  city,
  province,
  trackingCode
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  
  useLockBodyScroll(isOpen);
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  const initial = businessName?.charAt(0).toUpperCase() || 'O';
  const provinceName = PROVINCIAS_ESPANA.find(
    p => p.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === province
  ) || province;
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-origen-bosque/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={cn(
              "relative w-full max-w-3xl",
              "bg-white rounded-2xl",
              "shadow-2xl border border-gray-200",
              "overflow-hidden"
            )}
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-origen-menta via-origen-pradera to-origen-hoja" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-gray-600 border border-gray-200 hover:border-origen-pradera hover:bg-origen-crema/50 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-origen-crema rounded-full px-4 py-2 border border-origen-pradera/30 mb-4">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-origen-menta to-origen-pradera flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-bold text-origen-bosque uppercase tracking-wide">
                    Registro completado
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-origen-bosque mb-2">
                  ¡Bienvenido a Origen, {contactName}!
                </h2>
                <p className="text-lg text-gray-600">
                  Tu solicitud ha sido recibida correctamente
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-origen-crema/30 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-origen-menta to-origen-pradera flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-2xl font-bold text-white">{initial}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-origen-bosque truncate">
                        {businessName}
                      </h3>
                      <p className="text-base text-gray-600 truncate mt-1">{email}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-2">
                        <MapPin className="w-4 h-4" />
                        {city}, {provinceName}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-900 to-origen-bosque rounded-xl p-6 shadow-xl">
                  <p className="text-sm font-medium text-white/60 uppercase tracking-wider mb-2">
                    Código de seguimiento
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <code className="font-mono text-xl font-bold text-white break-all">
                      {trackingCode}
                    </code>
                    <button
                      onClick={handleCopyCode}
                      className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
                    >
                      {copied ? (
                        <CheckCircle className="w-5 h-5 text-origen-menta" />
                      ) : (
                        <Copy className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-origen-crema/50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 text-base text-gray-600">
                  <Mail className="w-5 h-5 text-origen-pradera" />
                  <span>
                    Hemos enviado un email de confirmación a <span className="font-semibold text-origen-bosque">{email}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  onClick={onClose}
                  className="bg-origen-bosque hover:bg-origen-pino text-white px-6 py-3 h-auto text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <span className="flex items-center gap-2">
                    Ir a mi panel
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL - DISEÑO PREMIUM, SIN CABECERA, MÁRGENES CERO
// ============================================================================

export function SimpleRegistration({
  onSuccess,
  className
}: SimpleRegistrationProps): JSX.Element {
  
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<InitialRegistrationFormData | null>(null);
  const [trackingCode, setTrackingCode] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<InitialRegistrationFormData>({
    resolver: zodResolver(initialRegistrationSchema),
    mode: 'onChange',
    defaultValues: {
      contactName: '',
      contactSurname: '',
      email: '',
      phone: '',
      businessName: '',
      businessType: 'individual',
      province: '',
      city: '',
      producerCategory: undefined,
      whyOrigin: '',
      acceptsTerms: false,
      acceptsPrivacy: false
    }
  });

  const formValues = watch();
  const whyOriginValue = formValues.whyOrigin || '';
  const textareaValid = whyOriginValue.length >= 50;
  const isFormValid = isValid && textareaValid;

  const onSubmit = useCallback(async (data: InitialRegistrationFormData) => {
    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const code = generateTrackingCode();
      setTrackingCode(code);
      setSubmittedData(data);
      setSubmitStatus('success');
      setIsModalOpen(true);
      onSuccess?.(data);
      
    } catch {
      setSubmitStatus('error');
      setErrorMessage('No hemos podido procesar tu solicitud. Inténtalo de nuevo.');
    }
  }, [onSuccess]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setValue('producerCategory', categoryId as any, { 
      shouldValidate: true,
      shouldDirty: true 
    });
  }, [setValue]);

  return (
    <>
      <AnimatePresence>
        {submittedData && isModalOpen && (
          <SuccessModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            businessName={submittedData.businessName}
            contactName={submittedData.contactName}
            email={submittedData.email}
            city={submittedData.city}
            province={submittedData.province}
            trackingCode={trackingCode}
          />
        )}
      </AnimatePresence>
      
      <div className={cn("w-full", className)}>
        
        {/* SIN CABECERA - Eliminada porque ya viene en page.tsx */}

        {submitStatus === 'error' && errorMessage && (
          <div className="mb-6">
            <AlertWithIcon
              variant="error"
              description={errorMessage}
              dismissible
              onDismiss={() => setSubmitStatus('idle')}
            />
          </div>
        )}

        {submitStatus === 'submitting' && (
          <div className="bg-white rounded-2xl p-12 shadow-xl border border-gray-200 text-center">
            <Loading />
            <p className="text-base text-gray-600 mt-4">Procesando tu solicitud...</p>
          </div>
        )}

        {submitStatus !== 'submitting' && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* SECCIÓN 1: Contacto - Diseño premium, campos amplios */}
            <FormSection 
              title="Información de contacto" 
              description="¿Cómo podemos llamarte?"
              badge="Paso 1 de 5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-base font-medium text-origen-bosque flex items-center gap-2">
                    <User className="w-5 h-5 text-origen-pradera" />
                    Nombre <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="Ej: María"
                    error={errors.contactName?.message}
                    {...register('contactName')}
                    className="h-12 text-base border-gray-200 focus:border-origen-menta focus:ring-1 focus:ring-origen-menta/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base font-medium text-origen-bosque flex items-center gap-2">
                    <User className="w-5 h-5 text-origen-pradera" />
                    Apellidos <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="Ej: García López"
                    error={errors.contactSurname?.message}
                    {...register('contactSurname')}
                    className="h-12 text-base border-gray-200 focus:border-origen-menta focus:ring-1 focus:ring-origen-menta/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-base font-medium text-origen-bosque flex items-center gap-2">
                    <Mail className="w-5 h-5 text-origen-pradera" />
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    error={errors.email?.message}
                    {...register('email')}
                    className="h-12 text-base border-gray-200 focus:border-origen-menta focus:ring-1 focus:ring-origen-menta/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base font-medium text-origen-bosque flex items-center gap-2">
                    <Phone className="w-5 h-5 text-origen-pradera" />
                    Teléfono <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="600 000 000"
                    error={errors.phone?.message}
                    {...register('phone')}
                    className="h-12 text-base border-gray-200 focus:border-origen-menta focus:ring-1 focus:ring-origen-menta/30"
                  />
                </div>
              </div>
            </FormSection>

            {/* SECCIÓN 2: Negocio - Diseño premium */}
            <FormSection 
              title="Tu negocio" 
              description="Cuéntanos sobre tu proyecto"
              badge="Paso 2 de 5"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-base font-medium text-origen-bosque flex items-center gap-2">
                    <Store className="w-5 h-5 text-origen-pradera" />
                    Nombre del negocio <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="Ej: Huerta Ecológica del Valle"
                    error={errors.businessName?.message}
                    {...register('businessName')}
                    className="h-12 text-base border-gray-200 focus:border-origen-menta focus:ring-1 focus:ring-origen-menta/30"
                  />
                </div>

                <BusinessTypeSelector
                  value={formValues.businessType}
                  onChange={(value) => setValue('businessType', value, { shouldValidate: true })}
                  error={errors.businessType?.message}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-base font-medium text-origen-bosque flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-origen-pradera" />
                      Provincia <span className="text-destructive">*</span>
                    </label>
                    <Select
                      items={PROVINCIAS_ESPANA.map(p => ({
                        value: p.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
                        label: p
                      }))}
                      value={formValues.province}
                      onValueChange={(value) => setValue('province', value, { shouldValidate: true })}
                      placeholder="Selecciona provincia"
                      error={errors.province?.message}
                      searchable
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-base font-medium text-origen-bosque flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-origen-pradera" />
                      Ciudad <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder="Tu localidad"
                      error={errors.city?.message}
                      {...register('city')}
                      className="h-12 text-base border-gray-200 focus:border-origen-menta focus:ring-1 focus:ring-origen-menta/30"
                    />
                  </div>
                </div>
              </div>
            </FormSection>

            {/* SECCIÓN 3: Categoría - Grid premium */}
            <FormSection 
              title="¿Qué vendes?" 
              description="Selecciona tu categoría principal"
              badge="Paso 3 de 5"
            >
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {PRODUCER_CATEGORIES.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    isSelected={formValues.producerCategory === category.id}
                    onSelect={handleCategorySelect}
                  />
                ))}
              </div>
              {errors.producerCategory && (
                <div className="mt-4 p-4 bg-destructive/10 rounded-lg border border-destructive/30">
                  <p className="text-base text-destructive flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {errors.producerCategory.message}
                  </p>
                </div>
              )}
            </FormSection>

            {/* SECCIÓN 4: Historia - Premium */}
            <FormSection 
              title="Tu historia" 
              description="Los compradores conectan con personas, no solo con productos"
              badge="Paso 4 de 5"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-base font-medium text-origen-bosque flex items-center gap-2">
                    <Heart className="w-5 h-5 text-origen-pradera" />
                    ¿Por qué quieres vender en Origen? <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    placeholder="Comparte tu pasión, tus valores, lo que te motiva... (mínimo 50 caracteres)"
                    error={errors.whyOrigin?.message}
                    maxLength={300}
                    {...register('whyOrigin')}
                    className="min-h-[120px] text-base border-gray-200 focus:border-origen-menta focus:ring-1 focus:ring-origen-menta/30 resize-y"
                  />
                </div>
                
                {whyOriginValue.length > 0 && (
                  <ProgressBar value={whyOriginValue.length} max={50} />
                )}
                
                {textareaValid && (
                  <div className="flex items-center gap-2 text-base text-origen-menta bg-origen-crema/50 p-4 rounded-lg border border-origen-pradera/30">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">¡Gracias por compartir tu historia!</span>
                  </div>
                )}
              </div>
            </FormSection>

            {/* SECCIÓN 5: Legal - Premium */}
            <FormSection 
              title="Confirmación legal" 
              description="Último paso para unirte a la comunidad"
              badge="Paso 5 de 5"
            >
              <div className="space-y-4">
                <CustomCheckbox
                  label="Acepto los términos y condiciones"
                  description="He leído y acepto las condiciones de uso de la plataforma Origen"
                  checked={formValues.acceptsTerms}
                  onChange={(checked) => setValue('acceptsTerms', checked, { shouldValidate: true })}
                  error={errors.acceptsTerms?.message}
                  required
                />
                
                <CustomCheckbox
                  label="Acepto la política de privacidad"
                  description="Autorizo el tratamiento de mis datos personales según el RGPD"
                  checked={formValues.acceptsPrivacy}
                  onChange={(checked) => setValue('acceptsPrivacy', checked, { shouldValidate: true })}
                  error={errors.acceptsPrivacy?.message}
                  required
                />
              </div>
            </FormSection>

            {/* Botón de envío - Mismo estilo que ProcessSection */}
            <div className="flex flex-col items-center pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={!isFormValid}
                className={cn(
                  "w-full md:w-auto min-w-[280px]",
                  "bg-origen-bosque hover:bg-origen-pino",
                  "text-white text-lg font-semibold",
                  "rounded-xl shadow-xl hover:shadow-2xl",
                  "transition-all transform hover:-translate-y-1",
                  "disabled:opacity-50 disabled:hover:translate-y-0",
                  "h-14 px-8"
                )}
              >
                {isFormValid ? (
                  <span className="flex items-center justify-center gap-3">
                    Enviar solicitud
                    <ArrowRight className="w-5 h-5" />
                  </span>
                ) : (
                  <span>Completar registro</span>
                )}
              </Button>
              
              {/* Trust badges - Mismo estilo que footer */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-origen-pradera" />
                  <span className="text-sm text-gray-600">SSL 256-bit</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-origen-pradera" />
                  <span className="text-sm text-gray-600">Respuesta 24h</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-origen-pradera" />
                  <span className="text-sm text-gray-600">Kilómetro 0</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}