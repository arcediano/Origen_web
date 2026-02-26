/**
 * @file badge.tsx
 * @description Componente de badge para mostrar estados
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertCircle, Clock, XCircle, Package, FileText } from 'lucide-react';

// ============================================================================
// TIPOS
// ============================================================================

export type StatusType = 
  // Estados de producto
  | 'active' 
  | 'inactive' 
  | 'out_of_stock'
  | 'draft'
  | 'pending_approval'
  // Estados de pedido
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  // Estados de verificación
  | 'verified'
  | 'pending_verification'
  | 'approved'
  | 'suspended'
  // Estados genéricos
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface StatusBadgeProps {
  /** Estado a mostrar */
  status: StatusType;
  /** Tamaño del badge */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Clase CSS adicional */
  className?: string;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Badge para mostrar estados con colores semánticos
 * 
 * @example
 * <StatusBadge status="active" />
 * <StatusBadge status="out_of_stock" size="sm" />
 */
export function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  // Configuración de cada estado
  const config: Record<StatusType, { label: string; icon: React.ReactNode; classes: string }> = {
    // Estados de producto
    active: {
      label: 'Activo',
      icon: <CheckCircle className="w-3 h-3" />,
      classes: 'bg-green-50 text-green-700 border-green-200',
    },
    inactive: {
      label: 'Inactivo',
      icon: <Clock className="w-3 h-3" />,
      classes: 'bg-gray-50 text-gray-600 border-gray-200',
    },
    out_of_stock: {
      label: 'Sin stock',
      icon: <AlertCircle className="w-3 h-3" />,
      classes: 'bg-red-50 text-red-700 border-red-200',
    },
    draft: {
      label: 'Borrador',
      icon: <FileText className="w-3 h-3" />,
      classes: 'bg-gray-50 text-gray-600 border-gray-200',
    },
    pending_approval: {
      label: 'Pendiente aprobación',
      icon: <Clock className="w-3 h-3" />,
      classes: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    // Estados de pedido
    pending: {
      label: 'Pendiente',
      icon: <Clock className="w-3 h-3" />,
      classes: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    processing: {
      label: 'Procesando',
      icon: <Package className="w-3 h-3" />,
      classes: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    shipped: {
      label: 'Enviado',
      icon: <Package className="w-3 h-3" />,
      classes: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    delivered: {
      label: 'Entregado',
      icon: <CheckCircle className="w-3 h-3" />,
      classes: 'bg-green-50 text-green-700 border-green-200',
    },
    cancelled: {
      label: 'Cancelado',
      icon: <XCircle className="w-3 h-3" />,
      classes: 'bg-red-50 text-red-700 border-red-200',
    },
    // Estados de verificación
    verified: {
      label: 'Verificado',
      icon: <CheckCircle className="w-3 h-3" />,
      classes: 'bg-green-50 text-green-700 border-green-200',
    },
    pending_verification: {
      label: 'Pendiente verificación',
      icon: <Clock className="w-3 h-3" />,
      classes: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    approved: {
      label: 'Aprobado',
      icon: <CheckCircle className="w-3 h-3" />,
      classes: 'bg-green-50 text-green-700 border-green-200',
    },
    suspended: {
      label: 'Suspendido',
      icon: <AlertCircle className="w-3 h-3" />,
      classes: 'bg-red-50 text-red-700 border-red-200',
    },
    // Estados genéricos
    success: {
      label: 'Éxito',
      icon: <CheckCircle className="w-3 h-3" />,
      classes: 'bg-green-50 text-green-700 border-green-200',
    },
    warning: {
      label: 'Advertencia',
      icon: <AlertCircle className="w-3 h-3" />,
      classes: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    error: {
      label: 'Error',
      icon: <XCircle className="w-3 h-3" />,
      classes: 'bg-red-50 text-red-700 border-red-200',
    },
    info: {
      label: 'Información',
      icon: <Clock className="w-3 h-3" />,
      classes: 'bg-blue-50 text-blue-700 border-blue-200',
    },
  };

  const { label, icon, classes } = config[status] || config.info;

  // Tamaños
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px] gap-1',
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        sizeClasses[size],
        classes,
        className
      )}
    >
      {icon}
      {label}
    </span>
  );
}

// ============================================================================
// BADGE SIMPLE (para otros usos)
// ============================================================================

export interface BadgeProps {
  /** Texto del badge */
  children: React.ReactNode;
  /** Variante de color */
  variant?: 'default' | 'leaf' | 'success' | 'warning' | 'destructive' | 'outline';
  /** Tamaño del badge */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Clase CSS adicional */
  className?: string;
  /** Icono opcional */
  icon?: React.ReactNode;
}

/**
 * Badge genérico para otros usos
 * 
 * @example
 * <Badge variant="leaf">Nuevo</Badge>
 * <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>Completado</Badge>
 */
export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md', 
  icon,
  className 
}: BadgeProps) {
  const variants = {
    default: 'bg-origen-pradera/10 text-origen-bosque border-origen-pradera/30',
    leaf: 'bg-origen-pastel text-origen-hoja border-origen-pradera/30',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    destructive: 'bg-red-50 text-red-700 border-red-200',
    outline: 'bg-transparent text-gray-600 border-gray-200',
  };

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px] gap-1',
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-2.5 py-1.5 text-xs gap-1.5',
    lg: 'px-3 py-2 text-sm gap-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        sizeClasses[size],
        variants[variant],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}