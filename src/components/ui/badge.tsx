/**
 * @file badge.tsx
 * @description Sistema de badges premium - CORREGIDO: Iconos alineados correctamente
 * @version 3.5.0
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// ============================================================================
// VARIANTES
// ============================================================================

const badgeVariants = cva(
  cn(
    "inline-flex items-center justify-center whitespace-nowrap",
    "rounded-full font-medium transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-origen-pradera/50 focus:ring-offset-2"
  ),
  {
    variants: {
      variant: {
        seed: cn(
          "bg-gradient-to-br from-origen-crema to-white",
          "text-origen-bosque border border-origen-pradera/30",
          "hover:bg-origen-crema/80"
        ),
        
        leaf: cn(
          "bg-gradient-to-br from-origen-pastel to-green-50",
          "text-green-800 border border-green-300/50",
          "hover:bg-green-100/80"
        ),
        
        fruit: cn(
          "bg-gradient-to-br from-orange-100 to-amber-50",
          "text-amber-800 border border-amber-300/50",
          "hover:bg-amber-100/80"
        ),
        
        forest: cn(
          "bg-gradient-to-br from-origen-bosque to-origen-pino",
          "text-white border border-origen-bosque/30",
          "hover:from-origen-pino hover:to-origen-bosque"
        ),
        
        outline: cn(
          "bg-transparent text-origen-bosque border border-origen-bosque",
          "hover:bg-origen-crema/30"
        ),
        
        success: cn(
          "bg-green-50 text-green-700 border border-green-200",
          "hover:bg-green-100"
        ),
        
        warning: cn(
          "bg-amber-50 text-amber-700 border border-amber-200",
          "hover:bg-amber-100"
        ),
        
        error: cn(
          "bg-red-50 text-red-700 border border-red-200",
          "hover:bg-red-100"
        ),
        
        info: cn(
          "bg-blue-50 text-blue-700 border border-blue-200",
          "hover:bg-blue-100"
        ),
      },
      size: {
        xs: "px-1.5 py-0.5 text-[10px] gap-1",
        sm: "px-2 py-1 text-xs gap-1.5",
        md: "px-2.5 py-1.5 text-sm gap-2",
        lg: "px-3 py-2 text-base gap-2.5",
      },
    },
    defaultVariants: {
      variant: "seed",
      size: "md",
    },
  }
);

// ============================================================================
// TIPOS
// ============================================================================

interface BadgeBaseProps extends VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  verified?: boolean;
  count?: number;
  tooltip?: string;
  onRemove?: () => void;
}

export interface BadgeProps extends BadgeBaseProps, React.HTMLAttributes<HTMLDivElement> {}

// ============================================================================
// COMPONENTE BADGE
// ============================================================================

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant, 
    size, 
    icon, 
    verified, 
    count, 
    tooltip, 
    onRemove, 
    children, 
    ...props 
  }, ref) => {
    const [showTooltip, setShowTooltip] = React.useState(false);

    return (
      <div className="relative inline-block">
        <div
          ref={ref}
          className={cn(badgeVariants({ variant, size }), className)}
          onMouseEnter={() => tooltip && setShowTooltip(true)}
          onMouseLeave={() => tooltip && setShowTooltip(false)}
          {...props}
        >
          {/* ✅ Iconos y texto al mismo nivel */}
          {icon && icon}
          {verified && <CheckCircle className={cn(
            size === "xs" && "h-2.5 w-2.5",
            size === "sm" && "h-3 w-3",
            size === "md" && "h-3.5 w-3.5",
            size === "lg" && "h-4 w-4"
          )} />}
          {count !== undefined && (
            <span className="tabular-nums font-bold">{count}</span>
          )}
          <span className="truncate">{children}</span>
          {onRemove && (
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className={cn(
                "inline-flex items-center justify-center rounded-full",
                "hover:bg-black/10 active:bg-black/20 transition-colors",
                size === "xs" && "h-3 w-3",
                size === "sm" && "h-3.5 w-3.5",
                size === "md" && "h-4 w-4",
                size === "lg" && "h-5 w-5"
              )}
            >
              <X className={cn(
                size === "xs" && "h-2 w-2",
                size === "sm" && "h-2.5 w-2.5",
                size === "md" && "h-3 w-3",
                size === "lg" && "h-3.5 w-3.5"
              )} />
            </button>
          )}
        </div>
        
        {tooltip && showTooltip && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 px-2 py-1 rounded bg-origen-oscuro text-white text-xs whitespace-nowrap shadow-lg">
            {tooltip}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-origen-oscuro rotate-45" />
          </div>
        )}
      </div>
    );
  }
);

Badge.displayName = "Badge";

// ============================================================================
// BADGE INTERACTIVO (COMO BOTÓN)
// ============================================================================

export interface InteractiveBadgeProps extends BadgeBaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  interactive?: boolean;
}

const InteractiveBadge = React.forwardRef<HTMLButtonElement, InteractiveBadgeProps>(
  ({ 
    className, 
    variant, 
    size, 
    icon, 
    verified, 
    count, 
    tooltip, 
    onRemove, 
    children, 
    interactive = true,
    ...props 
  }, ref) => {
    const [showTooltip, setShowTooltip] = React.useState(false);

    return (
      <div className="relative inline-block">
        <button
          ref={ref}
          className={cn(
            badgeVariants({ variant, size }),
            "cursor-pointer hover:scale-105 active:scale-95",
            className
          )}
          onMouseEnter={() => tooltip && setShowTooltip(true)}
          onMouseLeave={() => tooltip && setShowTooltip(false)}
          {...props}
        >
          {/* ✅ Iconos y texto al mismo nivel */}
          {icon && icon}
          {verified && <CheckCircle className={cn(
            size === "xs" && "h-2.5 w-2.5",
            size === "sm" && "h-3 w-3",
            size === "md" && "h-3.5 w-3.5",
            size === "lg" && "h-4 w-4"
          )} />}
          {count !== undefined && (
            <span className="tabular-nums font-bold">{count}</span>
          )}
          <span className="truncate">{children}</span>
          {onRemove && (
            <span
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className={cn(
                "inline-flex items-center justify-center rounded-full",
                "hover:bg-black/10 active:bg-black/20 transition-colors",
                size === "xs" && "h-3 w-3",
                size === "sm" && "h-3.5 w-3.5",
                size === "md" && "h-4 w-4",
                size === "lg" && "h-5 w-5"
              )}
            >
              <X className={cn(
                size === "xs" && "h-2 w-2",
                size === "sm" && "h-2.5 w-2.5",
                size === "md" && "h-3 w-3",
                size === "lg" && "h-3.5 w-3.5"
              )} />
            </span>
          )}
        </button>
        
        {tooltip && showTooltip && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 px-2 py-1 rounded bg-origen-oscuro text-white text-xs whitespace-nowrap shadow-lg">
            {tooltip}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-origen-oscuro rotate-45" />
          </div>
        )}
      </div>
    );
  }
);

InteractiveBadge.displayName = "InteractiveBadge";

// ============================================================================
// BADGES ESPECIALIZADOS
// ============================================================================

export interface ProductBadgeProps {
  type: 'organic' | 'local' | 'fresh' | 'seasonal' | 'premium' | 'new' | 'trending';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ProductBadge = ({ 
  type, 
  size = 'sm', 
  interactive = false,
  className,
  onClick 
}: ProductBadgeProps) => {
  const config = {
    organic: { label: "Orgánico", variant: "leaf" as const, icon: <Leaf className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    local: { label: "Local", variant: "leaf" as const, icon: <MapPin className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    fresh: { label: "Fresco", variant: "leaf" as const, icon: <Sprout className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    seasonal: { label: "Temporada", variant: "fruit" as const, icon: <Star className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    premium: { label: "Premium", variant: "forest" as const, icon: <Award className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    new: { label: "Nuevo", variant: "seed" as const, icon: <Sparkles className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    trending: { label: "Tendencia", variant: "fruit" as const, icon: <TrendingUp className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> }
  };

  const { label, variant, icon } = config[type];

  if (interactive) {
    return (
      <InteractiveBadge variant={variant} size={size} icon={icon} className={className} onClick={onClick}>
        {label}
      </InteractiveBadge>
    );
  }

  return (
    <Badge variant={variant} size={size} icon={icon} className={className}>
      {label}
    </Badge>
  );
};

export interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'active' | 'inactive' | 'suspended' | 'verified' | 'pending_verification';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const StatusBadge = ({ 
  status, 
  size = 'sm', 
  interactive = false,
  className,
  onClick 
}: StatusBadgeProps) => {
  const config = {
    pending: { label: "Pendiente", variant: "warning" as const, icon: <Clock className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    approved: { label: "Aprobado", variant: "success" as const, icon: <CheckCircle className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    active: { label: "Activo", variant: "success" as const, icon: <ShieldCheck className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    inactive: { label: "Inactivo", variant: "outline" as const, icon: <X className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    suspended: { label: "Suspendido", variant: "error" as const, icon: <AlertCircle className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    verified: { label: "Verificado", variant: "success" as const, icon: <CheckCircle className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    pending_verification: { label: "Pendiente", variant: "warning" as const, icon: <Clock className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> }
  };

  const { label, variant, icon } = config[status];

  if (interactive) {
    return (
      <InteractiveBadge variant={variant} size={size} icon={icon} className={className} onClick={onClick}>
        {label}
      </InteractiveBadge>
    );
  }

  return (
    <Badge variant={variant} size={size} icon={icon} className={className}>
      {label}
    </Badge>
  );
};

export interface ShippingBadgeProps {
  type: 'express' | 'free' | 'standard' | 'pickup';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ShippingBadge = ({ 
  type, 
  size = 'sm', 
  interactive = false,
  className,
  onClick 
}: ShippingBadgeProps) => {
  const config = {
    express: { label: "Express", variant: "forest" as const, icon: <Truck className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    free: { label: "Gratis", variant: "success" as const, icon: <Truck className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    standard: { label: "Estándar", variant: "outline" as const, icon: <Truck className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> },
    pickup: { label: "Recogida", variant: "leaf" as const, icon: <Package className={cn(size === "xs" ? "h-2.5 w-2.5" : size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} /> }
  };

  const { label, variant, icon } = config[type];

  if (interactive) {
    return (
      <InteractiveBadge variant={variant} size={size} icon={icon} className={className} onClick={onClick}>
        {label}
      </InteractiveBadge>
    );
  }

  return (
    <Badge variant={variant} size={size} icon={icon} className={className}>
      {label}
    </Badge>
  );
};

// ============================================================================
// EXPORT
// ============================================================================

export { 
  Badge, 
  InteractiveBadge,
  badgeVariants 
};

// Iconos necesarios
import { 
  Leaf, 
  MapPin, 
  Sprout, 
  Star, 
  Award, 
  Sparkles, 
  TrendingUp,
  Clock,
  CheckCircle,
  ShieldCheck,
  AlertCircle,
  Truck,
  Package
} from 'lucide-react';