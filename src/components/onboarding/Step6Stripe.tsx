// 📁 /src/components/onboarding/Step6Stripe.tsx
/**
 * Paso 6: Configuración de Stripe - UI puro
 * Componente visual sin lógica de negocio
 */

'use client';

import { CreditCard, Shield, Lock, Check } from 'lucide-react';

// Interfaz para datos de ejemplo (solo UI)
interface StripeData {
  accountId: string;
  connected: boolean;
  onboardingUrl: string;
}

interface Step6StripeProps {
  onChange: (data: StripeData) => void;
}

export function Step6Stripe({ onChange }: Step6StripeProps) {
  const isConnected = false; // Estado de ejemplo

  return (
    <div className="space-y-6">
      {/* Encabezado - Diseño según manual de marca */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-origen-crema mb-4">
          <CreditCard className="w-6 h-6 text-origen-bosque" />
        </div>
        <h2 className="text-xl font-semibold text-origen-bosque mb-2">
          Configuración de pagos
        </h2>
        <p className="text-gray-600">
          Conecta tu cuenta de Stripe para recibir pagos de forma segura y automática.
        </p>
      </div>

      {/* Contenido del paso */}
      <p className="text-gray-700 italic text-center mb-8">
        💳 Este es el paso 6 - Configuración de Stripe. La integración real con Stripe Connect será desarrollada según los requisitos técnicos.
      </p>

      {/* Estado de conexión */}
      <div className="text-center p-8 bg-origen-crema rounded-lg">
        {isConnected ? (
          <>
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-origen-bosque mb-2">
              ✅ Cuenta conectada
            </h3>
            <p className="text-gray-600 mb-6">
              Tu cuenta de Stripe está configurada correctamente.
            </p>
            <button className="px-6 py-3 bg-origen-bosque text-white rounded-lg font-medium hover:bg-origen-pino">
              Gestionar cuenta
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto bg-origen-pastel rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-origen-bosque" />
            </div>
            <h3 className="text-xl font-medium text-origen-bosque mb-2">
              Conectar con Stripe
            </h3>
            <p className="text-gray-600 mb-6">
              Stripe es nuestro socio de pagos seguro. Te redirigiremos a su plataforma para configurar tu cuenta.
            </p>
            <button className="px-6 py-3 bg-origen-menta text-origen-bosque rounded-lg font-medium hover:bg-origen-pradera">
              Conectar cuenta Stripe
            </button>
          </>
        )}
      </div>

      {/* Beneficios de Stripe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-4 bg-white border border-gray-200 rounded-lg text-center">
          <div className="w-10 h-10 mx-auto bg-origen-crema rounded-full flex items-center justify-center mb-3">
            <Shield className="w-5 h-5 text-origen-bosque" />
          </div>
          <h4 className="font-medium text-origen-bosque mb-2">Seguridad máxima</h4>
          <p className="text-sm text-gray-600">
            Stripe es líder mundial en pagos seguros
          </p>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg text-center">
          <div className="w-10 h-10 mx-auto bg-origen-crema rounded-full flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-origen-bosque" />
          </div>
          <h4 className="font-medium text-origen-bosque mb-2">Datos protegidos</h4>
          <p className="text-sm text-gray-600">
            Tus datos bancarios nunca pasan por nuestros servidores
          </p>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg text-center">
          <div className="w-10 h-10 mx-auto bg-origen-crema rounded-full flex items-center justify-center mb-3">
            <CreditCard className="w-5 h-5 text-origen-bosque" />
          </div>
          <h4 className="font-medium text-origen-bosque mb-2">Pagos automáticos</h4>
          <p className="text-sm text-gray-600">
            Recibe pagos directamente en tu cuenta
          </p>
        </div>
      </div>

      {/* Información de comisiones */}
      <div className="mt-8 p-4 bg-origen-pastel rounded-lg">
        <div className="flex items-start gap-3">
          <CreditCard className="w-5 h-5 text-origen-bosque mt-0.5" />
          <div>
            <p className="text-sm text-origen-bosque font-medium">
              ¿Cómo funcionan las comisiones?
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Stripe cobra una pequeña comisión por transacción. 
              Además, Origen aplica una comisión del 15% sobre la venta para mantener la plataforma.
              Ambos importes se deducen automáticamente de cada venta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}