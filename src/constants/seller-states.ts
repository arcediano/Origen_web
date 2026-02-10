/**
 * Configuración de estados del vendedor
 * @module constants/seller-states
 */

import { SellerStatus } from '@/types/seller';

export interface SellerStatusConfig {
  canLogin: boolean;
  canViewDashboard: boolean;
  canEditProfile: boolean;
  canCreateProducts: boolean;
  canPublishProducts: boolean;
  canReceivePayments: boolean;
  message: string;
  nextAction?: {
    label: string;
    href: string;
  };
}

export const SELLER_STATUS_CONFIG: Record<SellerStatus, SellerStatusConfig> = {
  pending_approval: {
    canLogin: false,
    canViewDashboard: false,
    canEditProfile: false,
    canCreateProducts: false,
    canPublishProducts: false,
    canReceivePayments: false,
    message: 'Tu solicitud está siendo revisada por nuestro equipo.',
  },
  rejected: {
    canLogin: false,
    canViewDashboard: false,
    canEditProfile: false,
    canCreateProducts: false,
    canPublishProducts: false,
    canReceivePayments: false,
    message: 'Lo sentimos, tu solicitud no ha sido aprobada.',
  },
  approved_access: {
    canLogin: true,
    canViewDashboard: true,
    canEditProfile: true,
    canCreateProducts: false,
    canPublishProducts: false,
    canReceivePayments: false,
    message: '¡Bienvenido! Completa tu perfil para empezar a vender.',
    nextAction: {
      label: 'Completar Perfil',
      href: '/onboarding',
    },
  },
  onboarding_in_progress: {
    canLogin: true,
    canViewDashboard: true,
    canEditProfile: true,
    canCreateProducts: false,
    canPublishProducts: false,
    canReceivePayments: false,
    message: 'Completa tu perfil para poder vender.',
    nextAction: {
      label: 'Continuar',
      href: '/onboarding',
    },
  },
  pending_verification: {
    canLogin: true,
    canViewDashboard: true,
    canEditProfile: true,
    canCreateProducts: true,
    canPublishProducts: false,
    canReceivePayments: false,
    message: 'Estamos verificando tu documentación. Puedes preparar tu catálogo mientras tanto.',
  },
  active: {
    canLogin: true,
    canViewDashboard: true,
    canEditProfile: true,
    canCreateProducts: true,
    canPublishProducts: true,
    canReceivePayments: true,
    message: '¡Tu cuenta está activa!',
  },
  suspended: {
    canLogin: true,
    canViewDashboard: true,
    canEditProfile: false,
    canCreateProducts: false,
    canPublishProducts: false,
    canReceivePayments: false,
    message: 'Tu cuenta está suspendida. Contacta con soporte.',
    nextAction: {
      label: 'Contactar Soporte',
      href: '/soporte',
    },
  },
  deactivated: {
    canLogin: false,
    canViewDashboard: false,
    canEditProfile: false,
    canCreateProducts: false,
    canPublishProducts: false,
    canReceivePayments: false,
    message: 'Tu cuenta ha sido desactivada.',
  },
};
