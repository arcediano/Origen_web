// components/forms/SimpleRegistration.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PRODUCER_CATEGORIES } from '@/constants/categories';
import { PROVINCIAS_ESPANA } from '@/constants/provinces';
import { initialRegistrationSchema, type InitialRegistrationFormData } from '@/lib/validations/seller';
import { Leaf, CheckCircle2, AlertCircle, ArrowRight, Sparkles, ShieldCheck, Heart, CheckCircle } from 'lucide-react';

export function SimpleRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InitialRegistrationFormData>({
    resolver: zodResolver(initialRegistrationSchema),
    defaultValues: {
      acceptsTerms: false,
      acceptsPrivacy: false,
    }
  });

  const whyOrigin = watch('whyOrigin') || '';
  const charCount = whyOrigin.length;
  const email = watch('email');
  const acceptsTerms = watch('acceptsTerms');
  const acceptsPrivacy = watch('acceptsPrivacy');

  const onSubmit = async (data: InitialRegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/sellers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Error al enviar la solicitud');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-center border border-origen-pradera">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-origen-crema rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-origen-menta" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-origen-bosque mb-3 md:mb-4">
            ¡Solicitud Enviada con Éxito!
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
            Hemos recibido tu solicitud para unirte a Origen. Nuestro equipo la revisará
            en las próximas 24-48 horas.
          </p>
          <div className="bg-origen-crema rounded-lg p-3 md:p-4 text-left border border-origen-pradera mb-4 md:mb-6">
            <h3 className="font-semibold text-origen-bosque text-sm md:text-base mb-2">Próximos pasos:</h3>
            <ol className="text-xs md:text-sm text-gray-700 space-y-1 md:space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 md:w-6 md:h-6 bg-origen-menta text-white rounded-full flex items-center justify-center text-xs">1</span>
                <span>Revisaremos tu perfil y documentación</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 md:w-6 md:h-6 bg-origen-menta text-white rounded-full flex items-center justify-center text-xs">2</span>
                <span>Te enviaremos un email de confirmación</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 md:w-6 md:h-6 bg-origen-menta text-white rounded-full flex items-center justify-center text-xs">3</span>
                <span>Acceso al panel de vendedor</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 md:w-6 md:h-6 bg-origen-menta text-white rounded-full flex items-center justify-center text-xs">4</span>
                <span>Configuración completa de tu tienda</span>
              </li>
            </ol>
          </div>
          <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
            Recibirás un email en <span className="font-medium text-origen-bosque">{email}</span>
          </p>
          <Button 
            onClick={() => setSubmitStatus('idle')}
            className="bg-origen-bosque hover:bg-origen-pino text-white w-full text-sm md:text-base"
          >
            Volver al formulario
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div id="registration-form" className="w-full">
      {/* Header mejorado del formulario */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-origen-bosque to-origen-pino text-white p-6 md:p-8 lg:p-10 mb-8 md:mb-12">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-origen-menta/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-36 h-36 md:w-48 md:h-48 bg-origen-pradera/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 mb-6 md:mb-8 border border-white/30">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm font-medium">Registro 100% online • Sin costes iniciales</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
            Da el primer paso hacia<br />
            <span className="text-origen-menta">tu tienda online</span>
          </h2>
          
          <p className="text-base md:text-xl text-white/90 mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Completa este formulario para iniciar tu proceso de alta. Nuestro equipo revisará 
            tu solicitud personalmente y te contactará en menos de 48 horas.
          </p>
          
          {/* Estadísticas mejoradas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto mb-6 md:mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-origen-menta">5 min</div>
              <div className="text-white/90 text-sm md:text-base">Para completar</div>
              <div className="text-xs md:text-sm text-white/70 mt-1 md:mt-2">Formulario optimizado</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-origen-menta">98%</div>
              <div className="text-white/90 text-sm md:text-base">Aprobación</div>
              <div className="text-xs md:text-sm text-white/70 mt-1 md:mt-2">De solicitudes aceptadas</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-origen-menta">15%</div>
              <div className="text-white/90 text-sm md:text-base">Comisión única</div>
              <div className="text-xs md:text-sm text-white/70 mt-1 md:mt-2">Solo cuando vendes</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 text-white/80 text-sm md:text-base">
            <div className="flex items-center gap-2 md:gap-3">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-origen-menta" />
              <span>Sin contrato de permanencia</span>
            </div>
            <div className="hidden sm:block w-px h-4 md:h-6 bg-white/30"></div>
            <div className="flex items-center gap-2 md:gap-3">
              <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-origen-menta" />
              <span>Datos 100% seguros</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 lg:p-8 border border-gray-200">
        {submitStatus === 'error' && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 md:gap-3">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 text-sm md:text-base">Error al enviar</h3>
              <p className="text-xs md:text-sm text-red-700">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-1 md:mb-2">
            <span className="text-sm font-medium text-origen-bosque text-xs md:text-sm">Completa el formulario</span>
            <span className="text-sm font-medium text-origen-hoja text-xs md:text-sm">60%</span>
          </div>
          <div className="h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-origen-menta rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Resto del formulario (mantener igual pero con responsive) */}
        {/* Información de Contacto */}
        <div className="mb-8 md:mb-10">
          <h3 className="text-lg md:text-xl font-semibold text-origen-bosque mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
            <span className="w-8 h-8 md:w-10 md:h-10 bg-origen-crema rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-origen-bosque text-sm md:text-base">1</span>
            </span>
            <span>Información de Contacto</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <Label htmlFor="contactName" className="text-origen-bosque font-medium text-sm md:text-base">Nombre *</Label>
              <Input
                id="contactName"
                {...register('contactName')}
                placeholder="Tu nombre"
                className={`mt-1 md:mt-2 text-sm md:text-base ${errors.contactName ? 'border-red-500' : ''}`}
              />
              {errors.contactName && (
                <p className="text-xs md:text-sm text-red-600 mt-1 md:mt-2">{errors.contactName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="contactSurname" className="text-origen-bosque font-medium text-sm md:text-base">Apellidos *</Label>
              <Input
                id="contactSurname"
                {...register('contactSurname')}
                placeholder="Tus apellidos"
                className={`mt-1 md:mt-2 text-sm md:text-base ${errors.contactSurname ? 'border-red-500' : ''}`}
              />
              {errors.contactSurname && (
                <p className="text-xs md:text-sm text-red-600 mt-1 md:mt-2">{errors.contactSurname.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className="text-origen-bosque font-medium text-sm md:text-base">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="tu@email.com"
                className={`mt-1 md:mt-2 text-sm md:text-base ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-xs md:text-sm text-red-600 mt-1 md:mt-2">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone" className="text-origen-bosque font-medium text-sm md:text-base">Teléfono *</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="+34 600 123 456"
                className={`mt-1 md:mt-2 text-sm md:text-base ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && (
                <p className="text-xs md:text-sm text-red-600 mt-1 md:mt-2">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Información del Negocio */}
        <div className="mb-8 md:mb-10">
          <h3 className="text-lg md:text-xl font-semibold text-origen-bosque mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
            <span className="w-8 h-8 md:w-10 md:h-10 bg-origen-crema rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-origen-bosque text-sm md:text-base">2</span>
            </span>
            <span>Información del Negocio</span>
          </h3>
          <div className="space-y-4 md:space-y-6">
            <div>
              <Label htmlFor="businessName" className="text-origen-bosque font-medium text-sm md:text-base">Nombre del Negocio *</Label>
              <Input
                id="businessName"
                {...register('businessName')}
                placeholder="Ej: Huerta de María"
                className={`mt-1 md:mt-2 text-sm md:text-base ${errors.businessName ? 'border-red-500' : ''}`}
              />
              {errors.businessName && (
                <p className="text-xs md:text-sm text-red-600 mt-1 md:mt-2">{errors.businessName.message}</p>
              )}
            </div>
            <div>
              <Label className="text-origen-bosque font-medium text-sm md:text-base mb-2 md:mb-3 block">Tipo de Negocio *</Label>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <label className="flex items-start gap-2 md:gap-3 cursor-pointer group p-2 md:p-3 rounded-lg hover:bg-origen-crema transition-colors">
                  <input
                    type="radio"
                    value="individual"
                    {...register('businessType')}
                    className="w-4 h-4 md:w-5 md:h-5 text-origen-menta focus:ring-origen-menta mt-0.5 md:mt-1"
                  />
                  <div>
                    <span className="block font-medium text-origen-bosque text-sm md:text-base">Autónomo/Individual</span>
                    <span className="text-gray-600 text-xs md:text-sm">Persona física o autónomo</span>
                  </div>
                </label>
                <label className="flex items-start gap-2 md:gap-3 cursor-pointer group p-2 md:p-3 rounded-lg hover:bg-origen-crema transition-colors">
                  <input
                    type="radio"
                    value="company"
                    {...register('businessType')}
                    className="w-4 h-4 md:w-5 md:h-5 text-origen-menta focus:ring-origen-menta mt-0.5 md:mt-1"
                  />
                  <div>
                    <span className="block font-medium text-origen-bosque text-sm md:text-base">Empresa/Sociedad</span>
                    <span className="text-gray-600 text-xs md:text-sm">SL, SA, Cooperativa, etc.</span>
                  </div>
                </label>
              </div>
              {errors.businessType && (
                <p className="text-xs md:text-sm text-red-600 mt-1 md:mt-2">{errors.businessType.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div className="mb-8 md:mb-10">
          <h3 className="text-lg md:text-xl font-semibold text-origen-bosque mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
            <span className="w-8 h-8 md:w-10 md:h-10 bg-origen-crema rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-origen-bosque text-sm md:text-base">3</span>
            </span>
            <span>Ubicación</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <Label htmlFor="province" className="text-origen-bosque font-medium text-sm md:text-base">Provincia *</Label>
              <select
                id="province"
                {...register('province')}
                className={`flex h-9 md:h-11 w-full rounded-lg border ${
                  errors.province ? 'border-red-500' : 'border-gray-300'
                } bg-white px-2 md:px-3 py-1 md:py-2 text-sm md:text-base mt-1 md:mt-2`}
              >
                <option value="">Selecciona una provincia</option>
                {PROVINCIAS_ESPANA.map((provincia) => (
                  <option key={provincia} value={provincia}>
                    {provincia}
                  </option>
                ))}
              </select>
              {errors.province && (
                <p className="text-xs md:text-sm text-red-600 mt-1 md:mt-2">{errors.province.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="city" className="text-origen-bosque font-medium text-sm md:text-base">Ciudad *</Label>
              <Input
                id="city"
                {...register('city')}
                placeholder="Tu ciudad"
                className={`mt-1 md:mt-2 text-sm md:text-base ${errors.city ? 'border-red-500' : ''}`}
              />
              {errors.city && (
                <p className="text-xs md:text-sm text-red-600 mt-1 md:mt-2">{errors.city.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Categoría */}
        <div className="mb-8 md:mb-10">
          <h3 className="text-lg md:text-xl font-semibold text-origen-bosque mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
            <span className="w-8 h-8 md:w-10 md:h-10 bg-origen-crema rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-origen-bosque text-sm md:text-base">4</span>
            </span>
            <span>Categoría de Productor</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {PRODUCER_CATEGORIES.map((category) => (
              <label
                key={category.id}
                className="relative cursor-pointer group"
              >
                <input
                  type="radio"
                  value={category.id}
                  {...register('producerCategory')}
                  className="peer sr-only"
                />
                <div className="border-2 border-gray-200 rounded-lg md:rounded-xl p-3 md:p-4 transition-all peer-checked:border-origen-menta peer-checked:bg-origen-crema hover:border-origen-pradera group-hover:shadow-sm md:group-hover:shadow-md">
                  <div className="text-2xl md:text-3xl mb-2 md:mb-3">{category.icon}</div>
                  <h4 className="font-semibold text-xs md:text-sm text-origen-bosque mb-0.5 md:mb-1">
                    {category.name}
                  </h4>
                  <p className="text-gray-600 text-xs">{category.description}</p>
                </div>
              </label>
            ))}
          </div>
          {errors.producerCategory && (
            <p className="text-xs md:text-sm text-red-600 mt-2 md:mt-4">{errors.producerCategory.message}</p>
          )}
        </div>

        {/* Motivación */}
        <div className="mb-8 md:mb-10">
          <h3 className="text-lg md:text-xl font-semibold text-origen-bosque mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
            <span className="w-8 h-8 md:w-10 md:h-10 bg-origen-crema rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-origen-bosque text-sm md:text-base">5</span>
            </span>
            <span>¿Por qué quieres vender en Origen?</span>
          </h3>
          <div>
            <Textarea
              {...register('whyOrigin')}
              placeholder="Cuéntanos sobre tu proyecto, tus valores, y por qué Origen es la plataforma adecuada para ti..."
              className={`min-h-[100px] md:min-h-[120px] text-sm md:text-base ${errors.whyOrigin ? 'border-red-500' : ''}`}
              maxLength={300}
            />
            <div className="flex justify-between items-center mt-2 md:mt-3">
              <div>
                {errors.whyOrigin && (
                  <p className="text-xs md:text-sm text-red-600">{errors.whyOrigin.message}</p>
                )}
              </div>
              <span className={`text-xs md:text-sm ${
                charCount < 50 ? 'text-gray-400' : 
                charCount > 300 ? 'text-red-600' : 
                'text-origen-menta'
              }`}>
                {charCount}/300
              </span>
            </div>
          </div>
        </div>

        {/* Términos */}
        <div className="mb-8 md:mb-10 space-y-3 md:space-y-4">
          <div className="flex items-start gap-2 md:gap-3">
            <Checkbox 
              id="terms" 
              checked={acceptsTerms}
              onCheckedChange={(checked) => {
                setValue('acceptsTerms', checked === true, {
                  shouldValidate: true
                });
              }}
              className="text-origen-menta border-gray-300 data-[state=checked]:border-origen-menta w-4 h-4 md:w-5 md:h-5"
            />
            <div className="grid gap-1 leading-none">
              <Label htmlFor="terms" className="text-xs md:text-sm font-normal cursor-pointer text-gray-700">
                Acepto los{' '}
                <a href="/terminos" className="text-origen-menta underline font-medium hover:text-origen-pradera">
                  términos y condiciones
                </a>{' '}
                de la plataforma *
              </Label>
              {errors.acceptsTerms && (
                <p className="text-xs md:text-sm text-red-600 mt-0.5 md:mt-1">{errors.acceptsTerms.message}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-start gap-2 md:gap-3">
            <Checkbox 
              id="privacy" 
              checked={acceptsPrivacy}
              onCheckedChange={(checked) => {
                setValue('acceptsPrivacy', checked === true, {
                  shouldValidate: true
                });
              }}
              className="text-origen-menta border-gray-300 data-[state=checked]:border-origen-menta w-4 h-4 md:w-5 md:h-5"
            />
            <div className="grid gap-1 leading-none">
              <Label htmlFor="privacy" className="text-xs md:text-sm font-normal cursor-pointer text-gray-700">
                Acepto la{' '}
                <a href="/privacidad" className="text-origen-menta underline font-medium hover:text-origen-pradera">
                  política de privacidad
                </a>{' '}
                y el tratamiento de mis datos *
              </Label>
              {errors.acceptsPrivacy && (
                <p className="text-xs md:text-sm text-red-600 mt-0.5 md:mt-1">{errors.acceptsPrivacy.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto min-w-[180px] md:min-w-[200px] h-10 md:h-12 text-sm md:text-base bg-origen-menta hover:bg-origen-pradera text-white px-6 md:px-8 shadow-lg hover:shadow-xl transition-all"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Enviando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Enviar Solicitud
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </span>
            )}
          </Button>
          
          <p className="text-xs text-gray-500 text-center mt-3 md:mt-4">
            * Campos obligatorios. Tu información está protegida y solo se usará para el proceso de registro.
          </p>
          
          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-origen-menta" />
                <span>Datos protegidos con encriptación SSL</span>
              </div>
              <div className="hidden md:block w-px h-3 md:h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Heart className="w-3 h-3 md:w-4 md:h-4 text-origen-menta" />
                <span>Sin spam. Respetamos tu privacidad</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}