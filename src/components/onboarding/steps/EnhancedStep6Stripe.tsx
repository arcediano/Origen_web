// 📁 /src/components/onboarding/steps/EnhancedStep6Stripe.tsx
/**
 * @file EnhancedStep6Stripe.tsx
 * @description Paso 6: Configuración de pagos - VERSIÓN CORREGIDA
 */

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckboxWithLabel } from '@/components/ui/checkbox';

import {
  CreditCard,
  Shield,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Lock,
  Zap
} from 'lucide-react';

export interface EnhancedStep6StripeData {
  stripeConnected: boolean;
  acceptTerms: boolean;
}

export interface EnhancedStep6StripeProps {
  data: EnhancedStep6StripeData;
  onChange: (data: EnhancedStep6StripeData) => void;
}

export function EnhancedStep6Stripe({ data, onChange }: EnhancedStep6StripeProps) {
  const [isConnecting, setIsConnecting] = React.useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onChange({ ...data, stripeConnected: true });
    setIsConnecting(false);
  };

  const isComplete = data.stripeConnected && data.acceptTerms;

  return (
    <div className="space-y-8">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-origen-menta/10 rounded-xl blur-md" />
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-origen-menta to-origen-pradera flex items-center justify-center shadow-sm">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" size="sm" className="bg-white">
              <Sparkles className="w-3 h-3 mr-1.5 text-origen-menta" />
              Paso 6 de 6
            </Badge>
            {isComplete && (
              <Badge variant="fruit" size="sm">
                <CheckCircle2 className="w-3 h-3 mr-1.5" />
                Completado
              </Badge>
            )}
          </div>
          
          <h2 className="text-xl font-semibold text-origen-bosque mb-2">
            Configuración de pagos
          </h2>
          
          <p className="text-gray-600 text-sm max-w-2xl">
            Conecta tu cuenta de Stripe para recibir pagos de forma segura.
          </p>
        </div>
      </motion.div>

      <Card className="p-8 border border-gray-200 bg-white">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-origen-menta/10 to-origen-pradera/10 flex items-center justify-center mb-6">
            <Zap className="w-10 h-10 text-origen-menta" />
          </div>

          <h3 className="text-xl font-semibold text-origen-bosque mb-3">
            Stripe Connect
          </h3>
          
          <p className="text-gray-600 text-sm mb-8">
            Procesa pagos con tarjeta, transferencia y métodos locales.
            Comisión transparente del 1.4% + 0.25€ por transacción.
          </p>

          {data.stripeConnected ? (
            <div className="w-full p-4 bg-origen-crema/50 rounded-xl border border-origen-pradera/30 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-origen-pradera/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-origen-pradera" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-origen-bosque">
                    Cuenta conectada
                  </p>
                  <p className="text-xs text-gray-600">
                    Stripe está configurado correctamente
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full bg-origen-bosque hover:bg-origen-pino text-white h-12 mb-6"
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Conectando...
                </>
              ) : (
                <>
                  Conectar con Stripe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Lock className="w-3.5 h-3.5" />
            <span>Conexión segura · Cifrado SSL</span>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <CheckboxWithLabel
          label="Acepto los términos y condiciones de Stripe"
          description="Stripe es nuestro proveedor de pagos autorizado"
          checked={data.acceptTerms || false}
          onChange={(checked) => onChange({ ...data, acceptTerms: checked })}
          variant="leaf"
        />

        <div className="flex items-center gap-4 pt-2 text-xs text-gray-500 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-origen-menta" />
            <span>Pagos seguros garantizados</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>Protección contra fraude</span>
        </div>
      </div>
    </div>
  );
}

EnhancedStep6Stripe.displayName = 'EnhancedStep6Stripe';

export default EnhancedStep6Stripe;