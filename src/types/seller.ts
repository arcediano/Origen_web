/**
 * Tipos del sistema de vendedores
 * @module types/seller
 * @description Define todos los tipos relacionados con vendedores
 */

/** Estados posibles de un vendedor en el sistema */
export type SellerStatus =
  | 'pending_approval'        // Registrado, esperando 1ª aprobación admin
  | 'rejected'                // Rechazado por el administrador
  | 'approved_access'         // Aprobado para login, debe completar onboarding
  | 'onboarding_in_progress'  // Completando información del onboarding
  | 'pending_verification'    // Onboarding completo, esperando verificación de documentos
  | 'active'                  // Verificado y activo, puede vender
  | 'suspended'               // Suspendido temporalmente
  | 'deactivated';            // Desactivado permanentemente

/** Categorías de productores disponibles */
export type ProducerCategory =
  | 'agricola'      // Productor agrícola
  | 'ganadero'      // Productor ganadero
  | 'artesano'      // Artesano alimentario
  | 'apicultor'     // Apicultor
  | 'viticultor'    // Viticultor
  | 'especializado'; // Productos especializados

/** Días de la semana para entregas */
export type DayOfWeek =
  | 'lunes' | 'martes' | 'miercoles' | 'jueves' 
  | 'viernes' | 'sabado' | 'domingo';

/** Datos del formulario de registro inicial */
export interface InitialRegistration {
  contactName: string;
  contactSurname: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: 'individual' | 'company';
  province: string;
  city: string;
  producerCategory: ProducerCategory;
  whyOrigin: string;
  acceptsTerms: boolean;
  acceptsPrivacy: boolean;
}

/** Región turística asociada a la ubicación */
export interface TouristicRegion {
  id: string;
  name: string;
  province: string;
  description: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

/** Ubicación completa del vendedor */
export interface SellerLocation {
  street: string;
  number: string;
  postalCode: string;
  city: string;
  province: string;
  autonomousCommunity: string;
  country: string;
  touristicRegion?: TouristicRegion;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

/** Vendedor completo */
export interface Seller {
  id: string;
  userId: string;
  status: SellerStatus;
  businessName: string;
  slug: string;
  contactName: string;
  email: string;
  phone: string;
  location?: SellerLocation;
  producerCategory: ProducerCategory;
  subcategories: string[];
  stripeAccountId?: string;
  stripeAccountStatus: 'not_created' | 'pending' | 'active' | 'disabled';
  canPublishProducts: boolean;
  canReceivePayments: boolean;
  createdAt: Date;
  updatedAt: Date;
}
