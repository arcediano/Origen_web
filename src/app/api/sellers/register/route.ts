/**
 * API Route: Registro de vendedor
 * @route POST /api/sellers/register
 * @description Procesa el registro inicial del vendedor
 */

import { NextRequest, NextResponse } from 'next/server';
import { initialRegistrationSchema } from '@/lib/validations/seller';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos con Zod
    const validatedData = initialRegistrationSchema.parse(body);
    
    // TODO: Guardar en base de datos
    // const registration = await db.sellerRegistrations.create({
    //   data: {
    //     ...validatedData,
    //     status: 'pending_approval',
    //   },
    // });
    
    // Mock response para desarrollo
    const mockRegistration = {
      id: `reg_${Date.now()}`,
      ...validatedData,
      status: 'pending_approval',
      submittedAt: new Date().toISOString(),
    };
    
    // TODO: Enviar email de confirmación
    // await sendEmail({
    //   to: validatedData.email,
    //   subject: 'Solicitud recibida - Origen',
    //   template: 'registration-received',
    // });
    
    return NextResponse.json(
      {
        success: true,
        data: mockRegistration,
        message: 'Solicitud enviada correctamente',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en registro:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
