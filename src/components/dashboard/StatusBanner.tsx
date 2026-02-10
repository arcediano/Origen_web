'use client';

import { Button } from '@/components/ui/button';
import { 
  type SellerStatus, 
  SELLER_STATUS_CONFIG 
} from '@/types/seller';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Pause,
  Rocket
} from 'lucide-react';

interface StatusBannerProps {
  status: SellerStatus;
  details?: {
    documentsVerified?: number;
    totalDocuments?: number;
    rejectionReason?: string;
    suspensionReason?: string;
    correctionNotes?: string;
  };
}

export function StatusBanner({ status, details }: StatusBannerProps) {
  const config = SELLER_STATUS_CONFIG[status];
  
  // No mostrar banner si está activo
  if (status === 'active') {
    return null;
  }

  // Configuración visual por estado
  const variants = {
    pending_approval: {
      color: 'bg-blue-50 border-blue-200',
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-blue-100',
      title: 'Solicitud en Revisión',
      description: 'Estamos revisando tu solicitud. Te notificaremos por email en 24-48h.',
    },
    rejected: {
      color: 'bg-red-50 border-red-200',
      icon: <XCircle className="w-6 h-6 text-red-600" />,
      iconBg: 'bg-red-100',
      title: 'Solicitud Rechazada',
      description: details?.rejectionReason || 'Tu solicitud no ha sido aprobada.',
    },
    approved_access: {
      color: 'bg-green-50 border-green-200',
      icon: <Rocket className="w-6 h-6 text-green-600" />,
      iconBg: 'bg-green-100',
      title: '¡Bienvenido a Origen!',
      description: 'Tu solicitud ha sido aprobada. Completa tu perfil para empezar a vender.',
    },
    onboarding_in_progress: {
      color: 'bg-yellow-50 border-yellow-200',
      icon: <AlertCircle className="w-6 h-6 text-yellow-600" />,
      iconBg: 'bg-yellow-100',
      title: 'Perfil Incompleto',
      description: 'Termina de configurar tu perfil para poder vender en Origen.',
    },
    pending_verification: {
      color: 'bg-purple-50 border-purple-200',
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      iconBg: 'bg-purple-100',
      title: 'Documentación en Revisión',
      description: 'Estamos verificando tus documentos. Puedes preparar tu catálogo mientras tanto.',
    },
    suspended: {
      color: 'bg-orange-50 border-orange-200',
      icon: <Pause className="w-6 h-6 text-orange-600" />,
      iconBg: 'bg-orange-100',
      title: 'Cuenta Suspendida',
      description: details?.suspensionReason || 'Tu cuenta ha sido suspendida temporalmente.',
    },
    deactivated: {
      color: 'bg-gray-50 border-gray-200',
      icon: <XCircle className="w-6 h-6 text-gray-600" />,
      iconBg: 'bg-gray-100',
      title: 'Cuenta Desactivada',
      description: 'Esta cuenta ha sido desactivada.',
    },
  };

  const variant = variants[status];
  if (!variant) return null;

  return (
    <div className={`${variant.color} border-l-4 rounded-lg shadow-sm mb-6 overflow-hidden`}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`${variant.iconBg} rounded-full p-3 flex-shrink-0`}>
            {variant.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {variant.title}
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              {variant.description}
            </p>

            {/* Estado específico: pending_verification con progreso */}
            {status === 'pending_verification' && details && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Documentos verificados</span>
                  <span className="font-medium text-gray-900">
                    {details.documentsVerified || 0} / {details.totalDocuments || 7}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((details.documentsVerified || 0) / (details.totalDocuments || 7)) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Notas de corrección */}
            {details?.correctionNotes && (
              <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-1">
                  Correcciones necesarias:
                </p>
                <p className="text-sm text-gray-600">{details.correctionNotes}</p>
              </div>
            )}

            {/* Acciones */}
            {config.nextAction && (
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => (window.location.href = config.nextAction!.href)}
                  size="sm"
                  className="font-medium"
                >
                  {config.nextAction.label}
                </Button>

                {status === 'approved_access' && (
                  <Button
                    onClick={() => (window.location.href = '/dashboard')}
                    size="sm"
                    variant="outline"
                  >
                    Explorar Panel
                  </Button>
                )}
              </div>
            )}

            {/* Información adicional según estado */}
            {status === 'approved_access' && (
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Próximos pasos:</strong>
                </p>
                <ol className="text-xs text-gray-600 space-y-1">
                  <li>✓ Completa tu perfil (15-20 min)</li>
                  <li>✓ Sube documentación legal</li>
                  <li>✓ Configura cuenta de pagos</li>
                  <li>✓ Espera verificación final (24-48h)</li>
                  <li>✓ ¡Empieza a vender!</li>
                </ol>
              </div>
            )}

            {status === 'onboarding_in_progress' && (
              <div className="mt-4 pt-4 border-t border-yellow-200">
                <p className="text-xs text-yellow-700">
                  💡 <strong>Tip:</strong> Puedes guardar y continuar más tarde desde donde lo dejaste.
                </p>
              </div>
            )}

            {status === 'pending_verification' && (
              <div className="mt-4 pt-4 border-t border-purple-200">
                <div className="flex items-start gap-2">
                  <span className="text-xl">💼</span>
                  <div className="text-xs text-gray-600">
                    <p className="font-semibold mb-1">Mientras esperas:</p>
                    <ul className="space-y-1">
                      <li>• Crea tu catálogo de productos</li>
                      <li>• Configura precios e inventario</li>
                      <li>• Familiarízate con el panel</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Componente alternativo: Banner minimalista en la parte superior
 * Para usar en lugar del banner grande
 */
export function StatusBannerMinimal({ status }: { status: SellerStatus }) {
  if (status === 'active') return null;

  const config = SELLER_STATUS_CONFIG[status];

  const colors = {
    pending_approval: 'bg-blue-500',
    rejected: 'bg-red-500',
    approved_access: 'bg-green-500',
    onboarding_in_progress: 'bg-yellow-500',
    pending_verification: 'bg-purple-500',
    suspended: 'bg-orange-500',
    deactivated: 'bg-gray-500',
  };

  return (
    <div className={`${colors[status]} text-white px-4 py-2 text-center text-sm font-medium`}>
      {config.message}
      {config.nextAction && (
        <>
          {' • '}
          <a
            href={config.nextAction.href}
            className="underline hover:no-underline"
          >
            {config.nextAction.label}
          </a>
        </>
      )}
    </div>
  );
}

/**
 * Componente: Indicador de estado con icono
 * Para mostrar en la barra de navegación o perfil
 */
export function StatusIndicator({ status }: { status: SellerStatus }) {
  const variants = {
    pending_approval: {
      color: 'bg-blue-100 text-blue-700 border-blue-300',
      icon: '⏳',
      label: 'En Revisión',
    },
    rejected: {
      color: 'bg-red-100 text-red-700 border-red-300',
      icon: '❌',
      label: 'Rechazado',
    },
    approved_access: {
      color: 'bg-green-100 text-green-700 border-green-300',
      icon: '✅',
      label: 'Aprobado',
    },
    onboarding_in_progress: {
      color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      icon: '📝',
      label: 'Configurando',
    },
    pending_verification: {
      color: 'bg-purple-100 text-purple-700 border-purple-300',
      icon: '🔍',
      label: 'Verificando',
    },
    active: {
      color: 'bg-green-100 text-green-700 border-green-300',
      icon: '✨',
      label: 'Activo',
    },
    suspended: {
      color: 'bg-orange-100 text-orange-700 border-orange-300',
      icon: '⏸️',
      label: 'Suspendido',
    },
    deactivated: {
      color: 'bg-gray-100 text-gray-700 border-gray-300',
      icon: '🔒',
      label: 'Desactivado',
    },
  };

  const variant = variants[status];

  return (
    <div
      className={`${variant.color} inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border`}
    >
      <span>{variant.icon}</span>
      <span>{variant.label}</span>
    </div>
  );
}
