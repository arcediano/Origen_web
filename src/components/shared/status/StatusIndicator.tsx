/**
 * @file StatusIndicator.tsx
 * @description Indicador de estado minimalista para navbar/perfil
 */

'use client';

import { type SellerStatus } from '@/types/seller';
import { cn } from '@/lib/utils';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Pause,
  Rocket 
} from 'lucide-react';

interface StatusIndicatorProps {
  status: SellerStatus;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export function StatusIndicator({ status, className, showLabel = true, size = 'md' }: StatusIndicatorProps) {
  const variants = {
    pending_approval: {
      dot: 'bg-blue-500',
      icon: Clock,
      label: 'En revisión',
    },
    rejected: {
      dot: 'bg-red-500',
      icon: XCircle,
      label: 'Rechazado',
    },
    approved_access: {
      dot: 'bg-green-500',
      icon: Rocket,
      label: 'Aprobado',
    },
    onboarding_in_progress: {
      dot: 'bg-yellow-500',
      icon: AlertCircle,
      label: 'Incompleto',
    },
    pending_verification: {
      dot: 'bg-purple-500',
      icon: Clock,
      label: 'Verificando',
    },
    active: {
      dot: 'bg-green-500',
      icon: CheckCircle2,
      label: 'Activo',
    },
    suspended: {
      dot: 'bg-orange-500',
      icon: Pause,
      label: 'Suspendido',
    },
    deactivated: {
      dot: 'bg-gray-500',
      icon: XCircle,
      label: 'Desactivado',
    },
  };

  const variant = variants[status];
  const Icon = variant.icon;

  const sizeClasses = {
    sm: {
      dot: 'w-1.5 h-1.5',
      icon: 'w-3 h-3',
      text: 'text-xs',
      gap: 'gap-1.5',
    },
    md: {
      dot: 'w-2 h-2',
      icon: 'w-3.5 h-3.5',
      text: 'text-sm',
      gap: 'gap-2',
    },
  };

  const sz = sizeClasses[size];

  return (
    <div className={cn(
      "inline-flex items-center",
      sz.gap,
      className
    )}>
      <div className={cn(
        "rounded-full",
        variant.dot,
        sz.dot
      )} />
      
      {showLabel && (
        <span className={cn(
          "text-gray-600",
          sz.text
        )}>
          {variant.label}
        </span>
      )}
    </div>
  );
}