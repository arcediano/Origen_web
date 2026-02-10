/**
 * Configuración de Stripe Connect
 * @module lib/stripe/config
 * @description Centraliza toda la configuración de Stripe
 * 
 * NOTA: Los valores de ejemplo están configurados en .env.example
 */

export const STRIPE_CONFIG = {
  // Claves de API (de variables de entorno)
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  secretKey: process.env.STRIPE_SECRET_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  
  // Comisión de la plataforma (15%)
  platformFeePercent: parseInt(process.env.STRIPE_PLATFORM_FEE_PERCENT || '15', 10),
  
  // URLs de retorno
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Configuración de cuentas Connect
  connectConfig: {
    type: 'express' as const,
    country: 'ES',
  },
};

/**
 * Calcula la comisión de la plataforma sobre un monto
 * @param amount Monto en céntimos
 * @returns Comisión en céntimos
 */
export function calculatePlatformFee(amount: number): number {
  return Math.round((amount * STRIPE_CONFIG.platformFeePercent) / 100);
}
