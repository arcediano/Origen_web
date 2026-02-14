/**
 * @file StatusBanner.tsx
 * @description Banner de estado flotante ultra compacto en la parte inferior derecha
 */

'use client';

import { 
  type SellerStatus, 
  SELLER_STATUS_CONFIG 
} from '@/types/seller';
import { 
  Clock, 
  XCircle, 
  Rocket,
  AlertCircle, 
  FileText,
  Pause,
  ArrowRight,
  X
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface StatusBannerProps {
  status: SellerStatus;
  details?: {
    documentsVerified?: number;
    totalDocuments?: number;
    rejectionReason?: string;
    suspensionReason?: string;
  };
  className?: string;
  dismissible?: boolean;
}

export function StatusBanner({ status, details, className, dismissible = true }: StatusBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const config = SELLER_STATUS_CONFIG[status];
  
  // No mostrar si está oculto o si está activo
  if (!isVisible || status === 'active') {
    return null;
  }

  // Configuración de colores pastel
  const variants = {
    pending_approval: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      textLight: 'text-blue-600',
      icon: <Clock className="w-3.5 h-3.5 text-blue-600" />,
      title: 'Solicitud en revisión',
    },
    rejected: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      textLight: 'text-red-600',
      icon: <XCircle className="w-3.5 h-3.5 text-red-600" />,
      title: 'Solicitud no aprobada',
    },
    approved_access: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      textLight: 'text-green-600',
      icon: <Rocket className="w-3.5 h-3.5 text-green-600" />,
      title: '¡Bienvenido!',
    },
    onboarding_in_progress: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      textLight: 'text-yellow-600',
      icon: <AlertCircle className="w-3.5 h-3.5 text-yellow-600" />,
      title: 'Perfil incompleto',
    },
    pending_verification: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-800',
      textLight: 'text-purple-600',
      icon: <FileText className="w-3.5 h-3.5 text-purple-600" />,
      title: 'Documentación',
    },
    suspended: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-800',
      textLight: 'text-orange-600',
      icon: <Pause className="w-3.5 h-3.5 text-orange-600" />,
      title: 'Cuenta suspendida',
    },
    deactivated: {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-800',
      textLight: 'text-gray-600',
      icon: <XCircle className="w-3.5 h-3.5 text-gray-600" />,
      title: 'Cuenta desactivada',
    },
  };

  const variant = variants[status];
  if (!variant) return null;

  const showProgress = status === 'pending_verification' && details;
  const progress = showProgress 
    ? ((details.documentsVerified || 0) / (details.totalDocuments || 7)) * 100
    : 0;

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 max-w-xs w-full animate-in slide-in-from-bottom-5 fade-in duration-300",
      className
    )}>
      <div className={cn(
        "relative rounded-lg border shadow-md overflow-hidden backdrop-blur-sm",
        variant.bg,
        variant.border
      )}>
        {/* Barra superior animada ultra sutil */}
        {(status === 'pending_approval' || status === 'pending_verification') && (
          <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
            <div className={cn(
              "h-full w-1/3 rounded-full animate-[slide_2s_ease-in-out_infinite]",
              status === 'pending_approval' ? "bg-blue-400/50" : "bg-purple-400/50"
            )} />
          </div>
        )}

        {/* Botón de cierre */}
        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-3 h-3" />
          </button>
        )}

        <div className="p-3 pr-7">
          <div className="flex items-center gap-2">
            {/* Icono ultra pequeño */}
            <div className="flex-shrink-0">
              {variant.icon}
            </div>

            {/* Contenido compacto */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className={cn(
                  "text-xs font-medium truncate",
                  variant.text
                )}>
                  {variant.title}
                </h4>
                
                {/* Indicador de progreso mini */}
                {showProgress && (
                  <span className="text-[9px] text-purple-600 font-medium whitespace-nowrap">
                    {details.documentsVerified}/{details.totalDocuments}
                  </span>
                )}
              </div>

              {/* Barra de progreso ultra mini */}
              {showProgress && (
                <div className="mt-1 w-full h-1 bg-purple-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-400 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {/* Acción en línea */}
              {config.nextAction && (
                <Link
                  href={config.nextAction.href}
                  className={cn(
                    "inline-flex items-center gap-0.5 text-[9px] font-medium mt-1",
                    "hover:underline",
                    variant.textLight
                  )}
                >
                  {config.nextAction.label}
                  <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}