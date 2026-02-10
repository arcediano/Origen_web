/**
 * API Route: Crear cuenta Stripe Connect
 * @route POST /api/stripe/connect
 * @description Crea una cuenta Connect Express para el vendedor
 */

import { NextRequest, NextResponse } from 'next/server';
import { createConnectAccount, createAccountLink } from '@/lib/stripe/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sellerId, email, businessName } = body;
    
    if (!sellerId || !email || !businessName) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }
    
    // Crear cuenta Connect
    const account = await createConnectAccount(sellerId, email, businessName);
    
    // Crear Account Link para onboarding
    const accountLink = await createAccountLink(account.id);
    
    // TODO: Guardar stripeAccountId en la base de datos
    // await db.sellers.update({
    //   where: { id: sellerId },
    //   data: { stripeAccountId: account.id },
    // });
    
    return NextResponse.json({
      success: true,
      data: {
        accountId: account.id,
        onboardingUrl: accountLink.url,
      },
    });
  } catch (error) {
    console.error('Error creando cuenta Stripe:', error);
    
    return NextResponse.json(
      { success: false, error: 'Error al crear cuenta de Stripe' },
      { status: 500 }
    );
  }
}
