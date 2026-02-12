/**
 * @file badge.tsx
 * @description Sistema de badges con diseño orgánico completo inspirado en el ciclo natural
 * @version 3.0.0 - Rediseño completo según manual de marca
 * 
 * Características principales:
 * ✅ Sistema visual completo: Semilla → Brote → Hoja → Fruto
 * ✅ Animaciones sutiles de crecimiento natural
 * ✅ Sistema de colores jerárquico de la paleta "Bosque Innovador"
 * ✅ Badges interactivos con micro-interacciones mejoradas
 * ✅ Estados específicos de producto, vendedor y envío
 * ✅ Totalmente accesible (WCAG 2.1 AA)
 * 
 * @author Equipo Origen Design System
 * @created Marzo 2026
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { 
  X, 
  Leaf, 
  Star, 
  Flame, 
  Sprout, 
  Shield,
  Truck,
  Clock,
  CheckCircle,
  ShieldCheck,
  MapPin,
  Package,
  Award,
  TrendingUp
} from "lucide-react";

// ============================================================================
// SISTEMA DE VARIANTES
// ============================================================================

/**
 * Sistema de variantes inspirado en el ciclo natural del logo Origen
 * @description Semilla → Brote → Hoja → Fruto (Manual Sección 2.1)
 */
const badgeVariants = cva(
  cn(
    "inline-flex items-center gap-2",
    "rounded-full font-semibold transition-all duration-300",
    "select-none animate-origen-fade-in",
    // Sistema de sombras orgánico
    "shadow-sm hover:shadow-md",
    "relative overflow-hidden",
    // Efecto de brillo interno sutil
    "before:absolute before:inset-0 before:bg-gradient-to-b",
    "before:from-white/0 before:to-white/20 before:opacity-0",
    "hover:before:opacity-30 before:transition-opacity before:duration-300"
  ),
  {
    variants: {
      variant: {
        /**
         * SEMILLA: Estado base, origen, nuevo (Manual 2.1 - Semilla/Raíz)
         * Uso: Nuevos productos, estados iniciales
         */
        seed: cn(
          "bg-gradient-to-br from-origen-crema to-white",
          "text-origen-bosque border-2 border-origen-pradera/30",
          "hover:border-origen-pradera/50 hover:scale-[1.02]",
          "shadow-sm shadow-origen-pradera/10"
        ),
        
        /**
         * BROTE: Crecimiento, desarrollo, progreso (Manual 2.1 - Brote)
         * Uso: En desarrollo, en progreso, beta
         */
        sprout: cn(
          "bg-gradient-to-br from-green-100 to-emerald-50",
          "text-emerald-800 border-2 border-emerald-300/50",
          "hover:border-emerald-400/70",
          "shadow-sm shadow-emerald-200/30"
        ),
        
        /**
         * HOJA: Natural, ecológico, sostenible (Manual 2.1 - Hojas)
         * Uso: Productos ecológicos, estados naturales
         */
        leaf: cn(
          "bg-gradient-to-br from-origen-pastel to-green-50",
          "text-green-800 border-2 border-green-300/50",
          "hover:border-green-400/70",
          "shadow-sm shadow-green-200/30"
        ),
        
        /**
         * FRUTO: Maduro, listo, destacado (Manual 2.1 - Ciclo completo)
         * Uso: Productos premium, destacados, maduros
         */
        fruit: cn(
          "bg-gradient-to-br from-orange-100 to-amber-50",
          "text-amber-800 border-2 border-amber-300/50",
          "hover:border-amber-400/70",
          "shadow-sm shadow-amber-200/30"
        ),
        
        /**
         * MENTA: Acento, llamada a la acción (Manual 3.1 - Menta Vibrante)
         * Uso: CTAs, acciones importantes
         */
        mint: cn(
          "bg-gradient-to-br from-origen-menta/20 to-origen-menta/10",
          "text-origen-bosque border-2 border-origen-menta/30",
          "hover:border-origen-menta/50",
          "shadow-sm shadow-origen-menta/20"
        ),
        
        /**
         * BOSQUE: Principal, importante, premium (Manual 3.1 - Verde Bosque)
         * Uso: Estados premium, importantes
         */
        forest: cn(
          "bg-gradient-to-br from-origen-bosque to-origen-pino",
          "text-white border-2 border-origen-bosque/30",
          "shadow-lg shadow-origen-bosque/20",
          "hover:shadow-xl hover:shadow-origen-bosque/30",
          "hover:scale-[1.02]"
        ),
        
        /**
         * OUTLINE: Contorno, sutil, elegante (Manual 3.3 - Jerarquía)
         * Uso: Estados secundarios, elegantes
         */
        outline: cn(
          "bg-transparent text-origen-bosque border-2 border-origen-bosque",
          "hover:bg-origen-crema/50",
          "shadow-none hover:shadow-sm"
        ),
        
        /**
         * GHOST: Discreto, secundario (Manual 1.3 - Personalidad práctica)
         * Uso: Estados discretos, secundarios
         */
        ghost: cn(
          "bg-transparent text-origen-hoja border border-origen-pradera/20",
          "hover:bg-origen-pastel/30 hover:text-origen-bosque",
          "shadow-none hover:shadow-sm"
        ),
        
        /**
         * SUCCESS: Éxito, aprobado, verificado (Manual 3.2 - Estados)
         * Uso: Aprobaciones, verificaciones
         */
        success: cn(
          "bg-gradient-to-br from-green-50 to-emerald-50",
          "text-emerald-700 border-2 border-emerald-300",
          "shadow-sm shadow-emerald-200/50"
        ),
        
        /**
         * WARNING: Advertencia, atención (Manual 3.2 - Estados)
         * Uso: Advertencias, estados pendientes
         */
        warning: cn(
          "bg-gradient-to-br from-amber-50 to-orange-50",
          "text-amber-700 border-2 border-amber-300",
          "shadow-sm shadow-amber-200/50"
        ),
        
        /**
         * ERROR: Error, rechazado, problema (Manual 3.2 - Estados)
         * Uso: Errores, rechazos
         */
        error: cn(
          "bg-gradient-to-br from-red-50 to-rose-50",
          "text-rose-700 border-2 border-rose-300",
          "shadow-sm shadow-rose-200/50"
        ),
      },
      size: {
        /**
         * Sistema de tamaños proporcionales
         */
        xs: "px-2 py-0.5 text-xs gap-1",
        sm: "px-2.5 py-1 text-sm gap-1.5",
        md: "px-3 py-1.5 text-base gap-2",
        lg: "px-4 py-2 text-lg gap-2.5",
      },
      shape: {
        default: "rounded-full",
        pill: "rounded-lg",
        square: "rounded-md",
      },
      pulse: {
        true: "animate-origen-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "seed",
      size: "md",
      shape: "default",
      pulse: false,
    },
  }
);

// ============================================================================
// TIPOS
// ============================================================================

/**
 * Tipos base para evitar conflictos
 */
type BadgeDivProps = React.HTMLAttributes<HTMLDivElement>;
type BadgeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Props base del componente Badge
 */
type BadgeBaseProps = {
  /** Función para eliminar el badge */
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** Icono personalizado */
  icon?: React.ReactNode;
  
  /** Mostrar icono de verificación */
  verified?: boolean;
  
  /** Contador para badges numéricos */
  count?: number;
  
  /** Mostrar como badge interactivo */
  interactive?: boolean;
  
  /** Estado de selección */
  selected?: boolean;
  
  /** Tooltip descriptivo */
  tooltip?: string;
} & VariantProps<typeof badgeVariants>;

// Tipos específicos para diferentes usos
type BadgeAsDivProps = BadgeBaseProps & 
  Omit<BadgeDivProps, keyof BadgeBaseProps | 'onClick'> & {
    as?: 'div';
  };

type BadgeAsButtonProps = BadgeBaseProps & 
  Omit<BadgeButtonProps, keyof BadgeBaseProps> & {
    as: 'button';
  };

// Tipo unión
type BadgeProps = BadgeAsDivProps | BadgeAsButtonProps;

// ============================================================================
// COMPONENTE BADGE PRINCIPAL
// ============================================================================

/**
 * Componente Badge principal con diseño orgánico
 * @description Implementa el sistema visual completo del ciclo natural
 */
const Badge = React.forwardRef<HTMLDivElement | HTMLButtonElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      pulse,
      onRemove,
      icon,
      verified = false,
      count,
      interactive = false,
      selected = false,
      tooltip,
      children,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const [showTooltip, setShowTooltip] = React.useState(false);
    const isButton = props.as === 'button' || interactive || ('onClick' in props && props.onClick);
    
    // ========================================================================
    // MANEJADORES
    // ========================================================================
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      if (isButton) {
        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 150);
      }
      
      if ('onClick' in props && props.onClick) {
        props.onClick(e as any);
      }
    };
    
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onRemove?.(e);
    };

    const handleMouseEnter = () => {
      if (tooltip) setShowTooltip(true);
    };
    
    const handleMouseLeave = () => {
      if (tooltip) setShowTooltip(false);
    };

    // ========================================================================
    // RENDER
    // ========================================================================
    
    const content = (
      <>
        {/* Icono izquierdo */}
        {icon && (
          <span 
            className={cn(
              "inline-flex transition-transform duration-200",
              isPressed && "scale-110",
              interactive && "group-hover:scale-110"
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        
        {/* Contador opcional */}
        {count !== undefined && (
          <span className={cn(
            "tabular-nums font-bold",
            size === "xs" && "text-xs",
            size === "sm" && "text-sm",
            size === "md" && "text-base",
            size === "lg" && "text-lg"
          )}>
            {count}
          </span>
        )}
        
        {/* Contenido principal */}
        <span className="truncate max-w-[200px]">{children}</span>
        
        {/* Icono de verificación */}
        {verified && (
          <ShieldCheck 
            className={cn(
              "text-current",
              size === "xs" && "h-3 w-3",
              size === "sm" && "h-3.5 w-3.5",
              size === "md" && "h-4 w-4",
              size === "lg" && "h-5 w-5"
            )}
            aria-hidden="true"
          />
        )}
        
        {/* Botón de eliminación */}
        {onRemove && (
          <button
            type="button"
            onClick={handleRemove}
            className={cn(
              "inline-flex items-center justify-center rounded-full",
              "hover:bg-black/10 active:bg-black/20 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1",
              size === "xs" && "h-3 w-3",
              size === "sm" && "h-4 w-4",
              size === "md" && "h-5 w-5",
              size === "lg" && "h-6 w-6"
            )}
            aria-label="Eliminar"
          >
            <X 
              className={cn(
                size === "xs" && "h-2 w-2",
                size === "sm" && "h-2.5 w-2.5",
                size === "md" && "h-3 w-3",
                size === "lg" && "h-3.5 w-3.5"
              )}
              aria-hidden="true" 
            />
          </button>
        )}
      </>
    );

    const badgeClasses = cn(
      badgeVariants({ variant, size, shape, pulse, className }),
      selected && "ring-2 ring-origen-menta ring-offset-1",
      interactive && "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
      isPressed && "scale-95"
    );

    // Extraer props específicas
    const { as, onClick, ...restProps } = props as any;

    // ========================================================================
    // RENDER CONDICIONAL
    // ========================================================================
    
    if (isButton) {
      return (
        <div className="relative inline-block">
          <button
            ref={ref as React.Ref<HTMLButtonElement>}
            className={badgeClasses}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-pressed={selected}
            {...restProps}
          >
            {content}
          </button>
          
          {/* Tooltip */}
          {tooltip && showTooltip && (
            <div 
              className={cn(
                "absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50",
                "w-64 p-3 rounded-lg bg-origen-oscuro text-white text-xs",
                "shadow-lg animate-in fade-in-0 zoom-in-95"
              )}
              role="tooltip"
            >
              {tooltip}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-origen-oscuro rotate-45" />
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="relative inline-block">
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={badgeClasses}
          onClick={interactive ? handleClick : undefined}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          {...restProps}
        >
          {content}
        </div>
        
        {/* Tooltip */}
        {tooltip && showTooltip && (
          <div 
            className={cn(
              "absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50",
              "w-64 p-3 rounded-lg bg-origen-oscuro text-white text-xs",
              "shadow-lg animate-in fade-in-0 zoom-in-95"
            )}
            role="tooltip"
          >
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
// BADGES ESPECIALIZADOS
// ============================================================================

/**
 * Configuración para badges de producto
 */
const productBadgeConfig = {
  organic: {
    label: "Orgánico",
    variant: "leaf" as const,
    icon: <Leaf className="h-4 w-4" />,
    description: "Certificado de agricultura ecológica",
    tooltip: "Producto cultivado sin pesticidas ni químicos sintéticos"
  },
  local: {
    label: "Local",
    variant: "sprout" as const,
    icon: <MapPin className="h-4 w-4" />,
    description: "Producido en tu región",
    tooltip: "Procedente de productores locales (menos de 100km)"
  },
  fresh: {
    label: "Fresco",
    variant: "leaf" as const,
    icon: <Leaf className="h-4 w-4" />,
    description: "Recogido hoy",
    tooltip: "Recolección del día, máxima frescura garantizada"
  },
  seasonal: {
    label: "Temporada",
    variant: "fruit" as const,
    icon: <Star className="h-4 w-4" />,
    description: "Producto de temporada",
    tooltip: "En su momento óptimo de consumo"
  },
  artisanal: {
    label: "Artesanal",
    variant: "mint" as const,
    icon: <Shield className="h-4 w-4" />,
    description: "Hecho a mano",
    tooltip: "Elaboración manual tradicional"
  },
  premium: {
    label: "Premium",
    variant: "forest" as const,
    icon: <Award className="h-4 w-4" />,
    description: "Calidad superior",
    tooltip: "Productos seleccionados de máxima calidad"
  },
  sale: {
    label: "Oferta",
    variant: "error" as const,
    icon: <Flame className="h-4 w-4" />,
    description: "Precio especial",
    tooltip: "Descuento limitado por tiempo"
  },
  new: {
    label: "Nuevo",
    variant: "seed" as const,
    icon: <Sprout className="h-4 w-4" />,
    description: "Nuevo en catálogo",
    tooltip: "Producto recién añadido"
  },
  trending: {
    label: "Tendencia",
    variant: "fruit" as const,
    icon: <TrendingUp className="h-4 w-4" />,
    description: "Muy demandado",
    tooltip: "Entre los productos más populares"
  },
};

/**
 * Props para ProductBadge
 */
interface ProductBadgeProps extends Omit<BadgeAsDivProps, 'variant' | 'icon'> {
  /** Tipo de badge de producto */
  type: keyof typeof productBadgeConfig;
}

/**
 * Badge de estado específico para productos
 * @description Sistema completo de categorización de productos
 */
const ProductBadge = React.forwardRef<HTMLDivElement, ProductBadgeProps>(
  ({ type, ...props }, ref) => {
    const config = productBadgeConfig[type];
    
    return (
      <Badge
        ref={ref}
        variant={config.variant}
        icon={config.icon}
        tooltip={config.tooltip}
        {...props}
      >
        {config.label}
      </Badge>
    );
  }
);

ProductBadge.displayName = "ProductBadge";

/**
 * Configuración para badges de estado
 */
const statusConfig = {
  pending_approval: {
    label: "Pendiente",
    variant: "warning" as const,
    icon: <Clock className="h-4 w-4" />,
    description: "Esperando aprobación",
    tooltip: "En proceso de revisión por nuestro equipo"
  },
  approved_access: {
    label: "Aprobado",
    variant: "success" as const,
    icon: <CheckCircle className="h-4 w-4" />,
    description: "Acceso concedido",
    tooltip: "Cuenta verificada y activa"
  },
  onboarding_in_progress: {
    label: "En Progreso",
    variant: "mint" as const,
    icon: <Sprout className="h-4 w-4" />,
    description: "Completando registro",
    tooltip: "Finaliza los pasos restantes para activar tu cuenta"
  },
  pending_verification: {
    label: "Verificación",
    variant: "warning" as const,
    icon: <Shield className="h-4 w-4" />,
    description: "En proceso de verificación",
    tooltip: "Validando documentación e información"
  },
  active: {
    label: "Activo",
    variant: "success" as const,
    icon: <Leaf className="h-4 w-4" />,
    description: "Vendedor activo",
    tooltip: "Cuenta activa y publicando productos"
  },
  suspended: {
    label: "Suspendido",
    variant: "error" as const,
    icon: <Clock className="h-4 w-4" />,
    description: "Cuenta temporalmente suspendida",
    tooltip: "Cuenta suspendida por incumplimiento de normas"
  },
  deactivated: {
    label: "Desactivado",
    variant: "outline" as const,
    icon: <X className="h-4 w-4" />,
    description: "Cuenta desactivada",
    tooltip: "Cuenta desactivada por el usuario o el sistema"
  },
};

/**
 * Props para StatusBadge
 */
interface StatusBadgeProps extends Omit<BadgeAsDivProps, 'variant'> {
  /** Estado del vendedor */
  status: keyof typeof statusConfig;
}

/**
 * Badge de estado para vendedores
 * @description Sistema de estados completo para usuarios
 */
const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    const config = statusConfig[status];
    
    return (
      <Badge
        ref={ref}
        variant={config.variant}
        icon={config.icon}
        tooltip={config.tooltip}
        pulse={status === "pending_approval" || status === "pending_verification"}
        {...props}
      >
        {config.label}
      </Badge>
    );
  }
);

StatusBadge.displayName = "StatusBadge";

/**
 * Configuración para badges de envío
 */
const shippingConfig = {
  express: {
    label: "Express 24h",
    variant: "forest" as const,
    icon: <Truck className="h-4 w-4" />,
    description: "Entrega en 24 horas",
    tooltip: "Envío prioritario garantizado en 24 horas"
  },
  standard: {
    label: "Estándar",
    variant: "outline" as const,
    icon: <Truck className="h-4 w-4" />,
    description: "Entrega en 2-3 días",
    tooltip: "Entrega estándar en 48-72 horas"
  },
  pickup: {
    label: "Recogida",
    variant: "mint" as const,
    icon: <Package className="h-4 w-4" />,
    description: "Recogida en punto",
    tooltip: "Recogida en nuestro centro o punto autorizado"
  },
  free: {
    label: "Envío Gratis",
    variant: "success" as const,
    icon: <Truck className="h-4 w-4" />,
    description: "Envío gratuito",
    tooltip: "Sin coste de envío para este pedido"
  },
  eco: {
    label: "Eco-Envío",
    variant: "leaf" as const,
    icon: <Leaf className="h-4 w-4" />,
    description: "Envío sostenible",
    tooltip: "Envío con mínimo impacto ambiental"
  },
};

/**
 * Props para ShippingBadge
 */
interface ShippingBadgeProps extends Omit<BadgeAsDivProps, 'variant'> {
  /** Tipo de envío */
  type: keyof typeof shippingConfig;
}

/**
 * Badge de envío
 * @description Sistema de categorización de métodos de envío
 */
const ShippingBadge = React.forwardRef<HTMLDivElement, ShippingBadgeProps>(
  ({ type, ...props }, ref) => {
    const config = shippingConfig[type];
    
    return (
      <Badge
        ref={ref}
        variant={config.variant}
        icon={config.icon}
        tooltip={config.tooltip}
        {...props}
      >
        {config.label}
      </Badge>
    );
  }
);

ShippingBadge.displayName = "ShippingBadge";

// ============================================================================
// EXPORT
// ============================================================================

export { 
  Badge, 
  badgeVariants, 
  ProductBadge, 
  StatusBadge, 
  ShippingBadge 
};

export type { 
  BadgeProps,
  ProductBadgeProps,
  StatusBadgeProps,
  ShippingBadgeProps
};

/**
 * EJEMPLOS DE USO:
 * 
 * // Badge básico con variantes naturales
 * <Badge variant="seed">Nuevo</Badge>
 * <Badge variant="sprout">En desarrollo</Badge>
 * <Badge variant="leaf">Ecológico</Badge>
 * <Badge variant="fruit">Destacado</Badge>
 * 
 * // Badge interactivo
 * <Badge 
 *   variant="mint" 
 *   interactive
 *   onClick={() => console.log('clicked')}
 * >
 *   Click me
 * </Badge>
 * 
 * // Badge con eliminación
 * <Badge 
 *   variant="forest" 
 *   onRemove={() => console.log('removed')}
 * >
 *   Premium
 * </Badge>
 * 
 * // Badge de producto especializado
 * <ProductBadge type="organic" />
 * <ProductBadge type="local" />
 * <ProductBadge type="fresh" />
 * <ProductBadge type="premium" />
 * 
 * // Badge de estado de vendedor
 * <StatusBadge status="active" />
 * <StatusBadge status="pending_verification" />
 * <StatusBadge status="suspended" />
 * 
 * // Badge de envío
 * <ShippingBadge type="express" />
 * <ShippingBadge type="free" />
 * <ShippingBadge type="eco" />
 * 
 * // Badge con contador
 * <Badge variant="forest" count={5}>
 *   Notificaciones
 * </Badge>
 * 
 * // Badge con tooltip
 * <Badge 
 *   variant="warning" 
 *   tooltip="Este producto necesita atención especial"
 * >
 *   Advertencia
 * </Badge>
 * 
 * // Grupo de badges
 * <div className="flex flex-wrap gap-2">
 *   <ProductBadge type="organic" size="sm" />
 *   <ProductBadge type="local" size="sm" />
 *   <ProductBadge type="fresh" size="sm" />
 *   <ShippingBadge type="free" size="sm" />
 * </div>
 */