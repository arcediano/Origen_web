/**
 * Datos de ejemplo para desarrollo
 * @module mocks/sellers
 */

import { Seller, SellerStatus } from '@/types/seller';

export const MOCK_SELLERS: Seller[] = [
  {
    id: 'seller_1',
    userId: 'user_1',
    status: 'active',
    businessName: 'Huerta de María',
    slug: 'huerta-de-maria',
    contactName: 'María García',
    email: 'maria@huertademaria.es',
    phone: '+34 600 123 456',
    location: {
      street: 'Calle del Roble',
      number: '15',
      postalCode: '28730',
      city: 'Buitrago del Lozoya',
      province: 'Madrid',
      autonomousCommunity: 'Comunidad de Madrid',
      country: 'España',
      touristicRegion: {
        id: 'sierra-rincon',
        name: 'Sierra del Rincón',
        province: 'Madrid',
        description: 'Reserva de la Biosfera',
      },
    },
    producerCategory: 'agricola',
    subcategories: ['Verduras', 'Hortalizas'],
    stripeAccountId: 'acct_example123',
    stripeAccountStatus: 'active',
    canPublishProducts: true,
    canReceivePayments: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: 'seller_2',
    userId: 'user_2',
    status: 'pending_verification',
    businessName: 'Quesos Artesanos del Valle',
    slug: 'quesos-artesanos-valle',
    contactName: 'Juan Pérez',
    email: 'juan@quesosdevalle.es',
    phone: '+34 600 987 654',
    producerCategory: 'artesano',
    subcategories: ['Quesos'],
    stripeAccountId: 'acct_example456',
    stripeAccountStatus: 'pending',
    canPublishProducts: false,
    canReceivePayments: false,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-08'),
  },
];

export const getMockSellerByStatus = (status: SellerStatus): Seller => {
  return MOCK_SELLERS.find(s => s.status === status) || MOCK_SELLERS[0];
};
