/**
 * @file checkbox.tsx
 * @description Checkbox accesible con diseño orgánico inspirado en el ciclo natural: Semilla → Brote → Hoja
 * @version 3.0.0 - Rediseño completo según manual de marca Origen
 * 
 * Características principales:
 * ✅ Ciclo visual completo: Semilla → Brote → Hoja (Manual Sección 2.1)
 * ✅ Animaciones suaves con timing natural
 * ✅ Sistema de colores jerárquico de la paleta "Bosque Innovador"
 * ✅ Estados claros con feedback háptico visual
 * ✅ Diseño de tarjeta seleccionable mejorado
 * ✅ Totalmente accesible (WCAG 2.1 AA)
 * 
 * @author Equipo Origen Design System
 * @created Marzo 2026
 */

"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { 
  Check, 
  Minus, 
  Leaf,
  Sprout
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// TIPOS
// ============================================================================

/**
 * Tipos base para evitar conflictos
 */
type CheckboxHTMLProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;
type DivHTMLProps = React.HTMLAttributes<HTMLDivElement>;
type FieldsetHTMLProps = React.HTMLAttributes<HTMLFieldSetElement>;

/**
 * Props del componente Checkbox base
 */
interface CheckboxBaseProps extends CheckboxHTMLProps {
  /** Variante visual inspirada en elementos naturales */
  variant?: "seed" | "sprout" | "leaf" | "accent" | "forest";
  
  /** Tamaño del checkbox (sistema de diseño proporcional) */
  size?: "sm" | "md" | "lg";
  
  /** Mostrar animación de ripple (inspirada en gota de agua) */
  ripple?: boolean;
  
  /** Mostrar animación de crecimiento completa */
  animated?: boolean;
}

/**
 * Props para Checkbox con label
 */
interface CheckboxWithLabelProps extends CheckboxBaseProps {
  /** Etiqueta del checkbox */
  label?: string;
  
  /** Descripción adicional */
  description?: string;
  
  /** Mensaje de error */
  error?: string;
  
  /** Posición del label */
  labelPosition?: "right" | "left" | "top" | "bottom";
  
  /** Icono personalizado para estado checked */
  checkedIcon?: React.ReactNode;
  
  /** Icono personalizado para estado unchecked */
  uncheckedIcon?: React.ReactNode;
  
  /** Mostrar como card seleccionable (Manual Sección 6.2) */
  card?: boolean;
}

/**
 * Props para grupo de checkboxes
 */
interface CheckboxGroupProps extends FieldsetHTMLProps {
  /** Título del grupo */
  legend?: string;
  
  /** Descripción del grupo */
  description?: string;
  
  /** Checkboxes hijos */
  children: React.ReactNode;
  
  /** Validación del grupo */
  error?: string;
  
  /** Layout del grupo */
  layout?: "vertical" | "horizontal" | "grid";
}

// ============================================================================
// COMPONENTE CHECKBOX BASE
// ============================================================================

/**
 * Componente Checkbox base con diseño orgánico inspirado en el logo Origen
 * @description Representa el ciclo: Semilla (unchecked) → Brote (indeterminate) → Hoja (checked)
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxBaseProps
>(({ 
  className, 
  variant = "seed",
  size = "md",
  ripple = true,
  animated = true,
  checked,
  ...props 
}, ref) => {
  const [isRippling, setIsRippling] = React.useState(false);
  const [animationStage, setAnimationStage] = React.useState<"seed" | "sprout" | "leaf">("seed");
  
  // Manejar correctamente el tipo de checked
  const isChecked = checked === true;
  const isIndeterminate = checked === "indeterminate";
  
  // Determinar etapa de animación
  React.useEffect(() => {
    if (!animated) return;
    
    if (isIndeterminate) {
      setAnimationStage("sprout");
    } else if (isChecked) {
      setAnimationStage("leaf");
    } else {
      setAnimationStage("seed");
    }
  }, [isChecked, isIndeterminate, animated]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 600);
    }
    props.onClick?.(e);
  };

  // ==========================================================================
  // ESTILOS POR VARIANTE (Inspirados en Manual Sección 3)
  // ==========================================================================
  
  const variantClasses = {
    // SEMILLA: Estado base, origen (Manual Sección 2.1 - Semilla/Raíz)
    seed: cn(
      "border-origen-pradera/50 bg-white",
      "hover:border-origen-hoja hover:bg-origen-crema/30",
      "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-origen-menta data-[state=checked]:to-origen-pradera",
      "data-[state=checked]:border-origen-menta",
      "data-[state=indeterminate]:bg-gradient-to-br data-[state=indeterminate]:from-origen-pradera data-[state=indeterminate]:to-origen-hoja",
      "data-[state=indeterminate]:border-origen-pradera"
    ),
    
    // BROTE: Crecimiento, desarrollo (Manual Sección 2.1 - Brote)
    sprout: cn(
      "border-origen-hoja/40 bg-white",
      "hover:border-origen-hoja hover:bg-green-50/30",
      "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-green-100 data-[state=checked]:to-emerald-100",
      "data-[state=checked]:border-emerald-300",
      "data-[state=indeterminate]:bg-gradient-to-br data-[state=indeterminate]:from-origen-pradera data-[state=indeterminate]:to-origen-hoja",
      "data-[state=indeterminate]:border-origen-pradera"
    ),
    
    // HOJA: Natural, ecológico (Manual Sección 2.1 - Hojas)
    leaf: cn(
      "border-green-300/40 bg-white",
      "hover:border-green-400 hover:bg-green-50/30",
      "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-green-50 data-[state=checked]:to-emerald-50",
      "data-[state=checked]:border-emerald-400",
      "data-[state=indeterminate]:bg-gradient-to-br data-[state=indeterminate]:from-green-100 data-[state=indeterminate]:to-emerald-100",
      "data-[state=indeterminate]:border-emerald-300"
    ),
    
    // ACENTO: Menta vibrante (Manual Sección 3.1 - Menta Vibrante)
    accent: cn(
      "border-origen-menta/30 bg-white",
      "hover:border-origen-menta hover:bg-origen-menta/10",
      "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-origen-menta data-[state=checked]:to-origen-pradera",
      "data-[state=checked]:border-origen-menta",
      "data-[state=indeterminate]:bg-gradient-to-br data-[state=indeterminate]:from-origen-menta/50 data-[state=indeterminate]:to-origen-pradera/50",
      "data-[state=indeterminate]:border-origen-menta/50"
    ),
    
    // BOSQUE: Principal, premium (Manual Sección 3.1 - Verde Bosque)
    forest: cn(
      "border-origen-bosque/30 bg-white",
      "hover:border-origen-bosque hover:bg-origen-bosque/5",
      "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-origen-bosque data-[state=checked]:to-origen-pino",
      "data-[state=checked]:border-origen-bosque",
      "data-[state=indeterminate]:bg-gradient-to-br data-[state=indeterminate]:from-origen-bosque/50 data-[state=indeterminate]:to-origen-pino/50",
      "data-[state=indeterminate]:border-origen-bosque/50"
    ),
  };

  // ==========================================================================
  // ESTILOS POR TAMAÑO
  // ==========================================================================
  
  const sizeClasses = {
    sm: cn(
      "h-4 w-4",
      "[&_svg]:h-2.5 [&_svg]:w-2.5"
    ),
    md: cn(
      "h-5 w-5",
      "[&_svg]:h-3.5 [&_svg]:w-3.5"
    ),
    lg: cn(
      "h-6 w-6",
      "[&_svg]:h-4.5 [&_svg]:w-4.5"
    ),
  };

  // ==========================================================================
  // ICONOS POR ETAPA DE ANIMACIÓN
  // ==========================================================================
  
  const getIcon = () => {
    if (!animated) {
      return isIndeterminate ? (
        <Minus className="text-current" aria-hidden="true" />
      ) : isChecked ? (
        <Check className="text-current" aria-hidden="true" />
      ) : null;
    }
    
    switch (animationStage) {
      case "seed":
        return (
          <div className="flex items-center justify-center">
            <div className="h-1 w-1 rounded-full bg-current opacity-70" />
          </div>
        );
      case "sprout":
        return <Sprout className="text-current" aria-hidden="true" />;
      case "leaf":
        return <Leaf className="text-current" aria-hidden="true" />;
      default:
        return null;
    }
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================
  
  return (
    <div className="relative inline-flex">
      {/* Efecto ripple (inspirado en gota de agua) */}
      {isRippling && (
        <div 
          className={cn(
            "absolute inset-0 rounded-lg",
            "animate-ping opacity-20",
            variant === "seed" && "bg-origen-pradera",
            variant === "sprout" && "bg-origen-hoja",
            variant === "leaf" && "bg-green-500",
            variant === "accent" && "bg-origen-menta",
            variant === "forest" && "bg-origen-bosque"
          )}
          style={{
            top: "-25%",
            left: "-25%",
            width: "150%",
            height: "150%",
          }}
        />
      )}

      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          // Estilos base
          "shrink-0 rounded-lg border-2 bg-white",
          "transition-all duration-500 ease-out",
          "focus-visible:outline-none focus-visible:ring-3",
          "focus-visible:ring-origen-menta/40 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "disabled:data-[state=checked]:bg-gray-400 disabled:data-[state=checked]:border-gray-400",
          
          // Aplicar variantes y tamaños
          variantClasses[variant],
          sizeClasses[size],
          
          // Animaciones
          animated && "overflow-hidden",
          animated && isChecked && "shadow-md shadow-current/20",
          
          className
        )}
        onClick={handleClick}
        checked={checked}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn(
            "flex items-center justify-center text-white",
            "transition-all duration-500 ease-out",
            animated && "animate-in zoom-in-75"
          )}
        >
          {getIcon()}
        </CheckboxPrimitive.Indicator>
        
        {/* Efecto de brillo interno */}
        {animated && (
          <div className={cn(
            "absolute inset-0 bg-gradient-to-b from-white/30 to-transparent",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300"
          )} />
        )}
      </CheckboxPrimitive.Root>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

// ============================================================================
// CHECKBOX CON LABEL MEJORADO
// ============================================================================

/**
 * Checkbox con label y descripción mejorada
 * @description Versión completa con soporte para tarjetas seleccionables
 */
const CheckboxWithLabel = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxWithLabelProps
>(({ 
  label, 
  description, 
  error, 
  id,
  labelPosition = "right",
  checkedIcon,
  uncheckedIcon,
  card = false,
  className,
  checked,
  ...props 
}, ref) => {
  const checkboxId = id || React.useId();
  const isChecked = checked === true || checked === "indeterminate";
  const isIndeterminate = checked === "indeterminate";
  const isCheckedBool = checked === true;
  
  // ==========================================================================
  // VERSIÓN CARD (Manual Sección 6.2 - Tarjetas de Visita)
  // ==========================================================================
  
  if (card) {
    return (
      <div className={cn(
        "relative w-full",
        labelPosition === "top" && "flex flex-col",
        labelPosition === "bottom" && "flex flex-col-reverse",
        labelPosition === "left" && "flex-row-reverse items-start",
        labelPosition === "right" && "flex items-start"
      )}>
        <div
          className={cn(
            "flex-1 cursor-pointer",
            "border-2 rounded-xl p-4 transition-all duration-300",
            "hover:border-origen-hoja hover:shadow-origen-md",
            isChecked 
              ? cn(
                  "border-origen-menta bg-gradient-to-br",
                  "from-origen-crema to-white",
                  "shadow-origen-md"
                ) 
              : "border-origen-pradera/30 bg-white",
            props.disabled && "opacity-50 cursor-not-allowed",
            "group"
          )}
          onClick={(e) => {
            if (!props.disabled && ref && 'current' in ref) {
              const checkbox = ref.current;
              if (checkbox) {
                checkbox.click();
              }
            }
          }}
        >
          <div className="flex items-start gap-3">
            <div className="relative">
              <Checkbox
                ref={ref}
                id={checkboxId}
                className="mt-0.5"
                checked={checked}
                {...props}
              />
              {/* Indicador de selección para card */}
              {isChecked && (
                <div className="absolute -top-1 -right-1">
                  <div className="h-2 w-2 rounded-full bg-origen-menta animate-ping" />
                  <div className="h-2 w-2 rounded-full bg-origen-menta" />
                </div>
              )}
            </div>
            <div className="flex-1">
              {label && (
                <span className={cn(
                  "block font-semibold text-origen-bosque mb-1",
                  "transition-colors duration-300",
                  isChecked && "text-origen-pino"
                )}>
                  {label}
                </span>
              )}
              {description && (
                <p className="text-sm text-origen-hoja leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {/* Efecto de selección sutil */}
          {isChecked && (
            <div className={cn(
              "absolute inset-0 rounded-xl",
              "bg-gradient-to-br from-origen-menta/5 to-transparent",
              "pointer-events-none"
            )} />
          )}
        </div>
        {error && (
          <p className="text-xs text-red-600 mt-2 ml-11" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  // ==========================================================================
  // VERSIÓN ESTÁNDAR
  // ==========================================================================
  
  return (
    <div className="space-y-2">
      <div className={cn(
        "flex items-start gap-3",
        labelPosition === "top" && "flex-col",
        labelPosition === "bottom" && "flex-col-reverse",
        labelPosition === "left" && "flex-row-reverse",
        labelPosition === "right" && ""
      )}>
        <Checkbox
          ref={ref}
          id={checkboxId}
          className={cn(
            labelPosition === "top" && "self-start mt-2",
            labelPosition === "bottom" && "self-start mb-2",
            labelPosition === "left" && "order-2",
            labelPosition === "right" && "order-1 mt-0.5",
            className
          )}
          checked={checked}
          {...props}
        />
        {label && (
          <div className={cn(
            "grid gap-1 leading-none flex-1",
            labelPosition === "left" && "order-1 text-right",
            labelPosition === "right" && "order-2"
          )}>
            <label
              htmlFor={checkboxId}
              className={cn(
                "text-sm font-medium text-origen-bosque cursor-pointer",
                "transition-colors duration-200",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                props.disabled && "cursor-not-allowed opacity-50",
                isChecked && "text-origen-pino"
              )}
            >
              {label}
              {props.required && (
                <span className="text-red-500 ml-1" aria-label="requerido">
                  *
                </span>
              )}
            </label>
            {description && (
              <p className="text-xs text-origen-hoja leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-600 ml-8" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

CheckboxWithLabel.displayName = "CheckboxWithLabel";

// ============================================================================
// CHECKBOX GROUP
// ============================================================================

/**
 * CheckboxGroup - Para grupos de checkboxes relacionados
 * @description Sistema de agrupación con validación y layout flexible
 */
const CheckboxGroup = React.forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  ({ 
    className, 
    legend, 
    description, 
    children, 
    error,
    layout = "vertical",
    ...props 
  }, ref) => {
    const layoutClasses = {
      vertical: "space-y-3",
      horizontal: "flex flex-wrap gap-4",
      grid: "grid grid-cols-1 md:grid-cols-2 gap-4",
    };
    
    return (
      <fieldset 
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        {(legend || description) && (
          <div className="space-y-2">
            {legend && (
              <legend className="text-base font-semibold text-origen-bosque">
                {legend}
              </legend>
            )}
            {description && (
              <p className="text-sm text-origen-hoja">
                {description}
              </p>
            )}
          </div>
        )}
        <div className={layoutClasses[layout]}>
          {children}
        </div>
        {error && (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </fieldset>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";

// ============================================================================
// EXPORT
// ============================================================================

export { 
  Checkbox, 
  CheckboxWithLabel, 
  CheckboxGroup 
};

export type { 
  CheckboxBaseProps as CheckboxProps,
  CheckboxWithLabelProps,
  CheckboxGroupProps 
};

/**
 * EJEMPLOS DE USO:
 * 
 * // Checkbox básico con ciclo de animación
 * <Checkbox 
 *   variant="seed"
 *   animated
 *   checked={isChecked}
 *   onCheckedChange={setIsChecked}
 * />
 * 
 * // Checkbox con label y descripción
 * <CheckboxWithLabel 
 *   label="Acepto términos y condiciones"
 *   description="Al marcar esta casilla, aceptas nuestros términos de servicio"
 *   required
 *   variant="forest"
 * />
 * 
 * // Checkbox como tarjeta seleccionable
 * <CheckboxWithLabel
 *   card
 *   label="Plan Básico"
 *   description="Perfecto para pequeños productores"
 *   variant="accent"
 *   checked={selectedPlan === "basic"}
 * />
 * 
 * // Grupo de checkboxes con validación
 * <CheckboxGroup
 *   legend="Selecciona tus intereses"
 *   description="Elige las categorías que más te interesen"
 *   layout="grid"
 *   error={errors.interests}
 * >
 *   <CheckboxWithLabel label="Vegetales" value="vegetables" />
 *   <CheckboxWithLabel label="Frutas" value="fruits" />
 *   <CheckboxWithLabel label="Lácteos" value="dairy" />
 *   <CheckboxWithLabel label="Artesanía" value="crafts" />
 * </CheckboxGroup>
 * 
 * // Checkbox con estados personalizados
 * <Checkbox
 *   variant="leaf"
 *   size="lg"
 *   ripple={false}
 *   animated={false}
 *   checked={isComplete}
 * />
 */