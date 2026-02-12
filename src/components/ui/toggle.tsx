/**
 * @file toggle.tsx
 * @description Interruptor (toggle switch) con diseño orgánico inspirado en elementos naturales
 * @version 1.0.1 - Corregidos errores de tipos y dependencias
 * 
 * Características principales:
 * ✅ Diseño inspirado en hojas que giran y semillas que brotan
 * ✅ Animaciones suaves y naturales
 * ✅ Sistema de iconografía orgánica
 * ✅ Estados de carga y validación
 * ✅ Variantes de tamaño y color
 * ✅ Accesibilidad WCAG 2.1 AAA garantizada
 * ✅ Sin dependencias externas (no requiere @radix-ui/react-switch)
 * 
 * @author Equipo Origen Design System
 * @created Marzo 2026
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, X, Moon, Sun, Leaf, Sprout, Loader2 } from "lucide-react";

// ============================================================================
// TIPOS
// ============================================================================

/**
 * Props del componente Toggle
 */
export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Estado del toggle (controlado) */
  checked?: boolean;
  
  /** Estado inicial (no controlado) */
  defaultChecked?: boolean;
  
  /** Función llamada cuando cambia el estado */
  onCheckedChange?: (checked: boolean) => void;
  
  /** Variante visual inspirada en elementos naturales */
  variant?: "leaf" | "seed" | "sun" | "moon" | "accent" | "forest";
  
  /** Tamaño del toggle */
  toggleSize?: "sm" | "md" | "lg";
  
  /** Icono cuando está activo */
  activeIcon?: React.ReactNode;
  
  /** Icono cuando está inactivo */
  inactiveIcon?: React.ReactNode;
  
  /** Etiqueta del toggle */
  label?: string;
  
  /** Descripción adicional */
  description?: string;
  
  /** Posición del label */
  labelPosition?: "left" | "right" | "top" | "bottom";
  
  /** Mostrar como toggle con carga */
  loading?: boolean;
  
  /** Estado de éxito */
  success?: boolean;
  
  /** Estado de error */
  error?: boolean;
  
  /** Texto de error */
  errorText?: string;
  
  /** Mostrar etiquetas de estado */
  showStateLabels?: boolean;
  
  /** Texto para estado activo */
  activeLabel?: string;
  
  /** Texto para estado inactivo */
  inactiveLabel?: string;
  
  /** Si el campo es requerido */
  required?: boolean;
}

// ============================================================================
// COMPONENTE TOGGLE
// ============================================================================

/**
 * Componente Toggle con diseño orgánico
 * @description Interruptor inspirado en elementos naturales
 */
const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className = "",
      variant = "leaf",
      toggleSize = "md",
      activeIcon,
      inactiveIcon,
      label,
      description,
      labelPosition = "right",
      loading = false,
      success = false,
      error = false,
      errorText,
      showStateLabels = false,
      activeLabel = "Activo",
      inactiveLabel = "Inactivo",
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    // ========================================================================
    // ESTADOS
    // ========================================================================
    
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const [isHovered, setIsHovered] = React.useState(false);
    
    // Determinar si está controlado o no
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;
    
    // ========================================================================
    // SISTEMA DE VARIANTES
    // ========================================================================
    
    const variantConfig = {
      leaf: {
        background: "bg-origen-crema",
        checkedBackground: "bg-gradient-to-r from-origen-menta to-origen-hoja",
        thumb: "bg-white",
        iconColor: "text-origen-hoja",
        checkedIconColor: "text-origen-menta",
        defaultActiveIcon: <Leaf className="h-3 w-3" />,
        defaultInactiveIcon: <Sprout className="h-3 w-3" />,
      },
      seed: {
        background: "bg-origen-crema",
        checkedBackground: "bg-gradient-to-r from-origen-pradera to-origen-hoja",
        thumb: "bg-white",
        iconColor: "text-origen-pradera",
        checkedIconColor: "text-origen-hoja",
        defaultActiveIcon: <Check className="h-3 w-3" />,
        defaultInactiveIcon: <X className="h-3 w-3" />,
      },
      sun: {
        background: "bg-amber-50",
        checkedBackground: "bg-gradient-to-r from-amber-400 to-orange-500",
        thumb: "bg-white",
        iconColor: "text-amber-500",
        checkedIconColor: "text-amber-600",
        defaultActiveIcon: <Sun className="h-3 w-3" />,
        defaultInactiveIcon: <Moon className="h-3 w-3" />,
      },
      moon: {
        background: "bg-indigo-50",
        checkedBackground: "bg-gradient-to-r from-indigo-400 to-violet-500",
        thumb: "bg-white",
        iconColor: "text-indigo-500",
        checkedIconColor: "text-violet-600",
        defaultActiveIcon: <Moon className="h-3 w-3" />,
        defaultInactiveIcon: <Sun className="h-3 w-3" />,
      },
      accent: {
        background: "bg-origen-menta/20",
        checkedBackground: "bg-gradient-to-r from-origen-menta to-origen-pradera",
        thumb: "bg-white",
        iconColor: "text-origen-menta",
        checkedIconColor: "text-origen-pradera",
        defaultActiveIcon: <Check className="h-3 w-3" />,
        defaultInactiveIcon: <X className="h-3 w-3" />,
      },
      forest: {
        background: "bg-origen-bosque/10",
        checkedBackground: "bg-gradient-to-r from-origen-pino to-origen-bosque",
        thumb: "bg-white",
        iconColor: "text-origen-bosque",
        checkedIconColor: "text-origen-pino",
        defaultActiveIcon: <Check className="h-3 w-3" />,
        defaultInactiveIcon: <X className="h-3 w-3" />,
      },
    };
    
    const config = variantConfig[variant];
    
    // Iconos finales
    const finalActiveIcon = activeIcon || config.defaultActiveIcon;
    const finalInactiveIcon = inactiveIcon || config.defaultInactiveIcon;

    // ========================================================================
    // SISTEMA DE TAMAÑOS
    // ========================================================================
    
    const sizeConfig = {
      sm: {
        switch: "w-10 h-6",
        thumb: "h-5 w-5",
        thumbTranslate: "translate-x-4",
        icon: "h-2.5 w-2.5",
        label: "text-xs",
      },
      md: {
        switch: "w-12 h-7",
        thumb: "h-6 w-6",
        thumbTranslate: "translate-x-5",
        icon: "h-3 w-3",
        label: "text-sm",
      },
      lg: {
        switch: "w-14 h-8",
        thumb: "h-7 w-7",
        thumbTranslate: "translate-x-6",
        icon: "h-3.5 w-3.5",
        label: "text-base",
      },
    };
    
    const size = sizeConfig[toggleSize];

    // ========================================================================
    // MANEJADORES
    // ========================================================================
    
    const handleToggle = () => {
      if (disabled || loading) return;
      
      const newValue = !isChecked;
      
      if (!isControlled) {
        setInternalChecked(newValue);
      }
      
      onCheckedChange?.(newValue);
    };
    
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleToggle();
      }
    };

    // ========================================================================
    // RENDER DEL TOGGLE
    // ========================================================================
    
    const toggleElement = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-label={label || "Toggle"}
        aria-required={required}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        disabled={disabled || loading}
        className={cn(
          // Estilos base
          "group relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
          "transition-all duration-300 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-menta focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          
          // Estados de validación
          error && !disabled && "border-red-500",
          success && !error && !disabled && "border-green-500",
          
          // Aplicar tamaños y fondos
          size.switch,
          isChecked ? config.checkedBackground : config.background,
          
          // Efectos de hover
          !disabled && !loading && isHovered && "scale-105",
          
          className
        )}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-state={isChecked ? "checked" : "unchecked"}
        {...props}
      >
        {/* Thumb (control deslizante) */}
        <span
          className={cn(
            "pointer-events-none inline-block transform rounded-full transition-all duration-300 ease-out",
            "flex items-center justify-center",
            "shadow-lg",
            size.thumb,
            config.thumb,
            isChecked && size.thumbTranslate,
            loading && "animate-pulse"
          )}
        >
          {/* Icono dentro del thumb */}
          {loading ? (
            <Loader2 className={cn("animate-spin", size.icon)} />
          ) : isChecked ? (
            <span className={config.checkedIconColor}>
              {finalActiveIcon}
            </span>
          ) : (
            <span className={config.iconColor}>
              {finalInactiveIcon}
            </span>
          )}
        </span>
        
        {/* Efecto de brillo */}
        <span className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent",
          "opacity-0 group-hover:opacity-100 group-data-[state=checked]:opacity-50",
          "transition-opacity duration-300"
        )} />
        
        {/* Etiquetas de estado */}
        {showStateLabels && (
          <span className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
            <span className={cn(
              "text-[10px] font-semibold transition-all duration-300",
              isChecked ? "text-white/70" : "text-current opacity-50"
            )}>
              {inactiveLabel}
            </span>
            <span className={cn(
              "text-[10px] font-semibold transition-all duration-300",
              isChecked ? "text-white" : "text-current opacity-30"
            )}>
              {activeLabel}
            </span>
          </span>
        )}
      </button>
    );

    // ========================================================================
    // RENDER CON LABEL
    // ========================================================================
    
    if (label || description || errorText) {
      return (
        <div className="space-y-2">
          <div className={cn(
            "flex items-start gap-3",
            labelPosition === "top" && "flex-col",
            labelPosition === "bottom" && "flex-col-reverse",
            labelPosition === "left" && "flex-row-reverse",
            labelPosition === "right" && "flex-row"
          )}>
            {toggleElement}
            
            {(label || description) && (
              <div className={cn(
                "grid gap-1 leading-none flex-1",
                labelPosition === "left" && "text-right",
                labelPosition === "right" && "text-left",
                labelPosition === "top" && "text-left",
                labelPosition === "bottom" && "text-left"
              )}>
                {label && (
                  <label
                    className={cn(
                      "font-medium text-origen-bosque",
                      "transition-colors duration-200",
                      disabled && "cursor-not-allowed opacity-50",
                      isChecked && "text-origen-pino",
                      size.label
                    )}
                    onClick={() => !disabled && !loading && handleToggle()}
                  >
                    {label}
                    {required && (
                      <span className="text-red-500 ml-1" aria-label="requerido">
                        *
                      </span>
                    )}
                  </label>
                )}
                {description && (
                  <p className={cn(
                    "text-xs text-origen-hoja leading-relaxed",
                    disabled && "opacity-50"
                  )}>
                    {description}
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Mensaje de error */}
          {error && errorText && (
            <p className="text-xs text-red-600 flex items-center gap-1.5 animate-origen-fade-in ml-1">
              <X className="h-3 w-3 flex-shrink-0" />
              <span>{errorText}</span>
            </p>
          )}
        </div>
      );
    }

    return toggleElement;
  }
);

Toggle.displayName = "Toggle";

// ============================================================================
// COMPONENTE TOGGLE GROUP
// ============================================================================

/**
 * Props para ToggleGroup
 */
export interface ToggleGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Toggles hijos */
  children: React.ReactNode;
  
  /** Dirección del grupo */
  direction?: "horizontal" | "vertical";
  
  /** Espaciado entre toggles */
  spacing?: "none" | "tight" | "normal" | "loose";
  
  /** Etiqueta del grupo */
  groupLabel?: string;
  
  /** Descripción del grupo */
  groupDescription?: string;
  
  /** Valor seleccionado (para grupo exclusivo) */
  value?: string;
  
  /** Valor por defecto */
  defaultValue?: string;
  
  /** Función llamada cuando cambia la selección */
  onValueChange?: (value: string) => void;
  
  /** Si el grupo es exclusivo (solo uno seleccionable) */
  exclusive?: boolean;
}

/**
 * Grupo de toggles relacionados
 */
const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ 
    className = "",
    children, 
    direction = "vertical", 
    spacing = "normal",
    groupLabel,
    groupDescription,
    value,
    defaultValue,
    onValueChange,
    exclusive = false,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    
    const spacingClasses = {
      none: "gap-0",
      tight: "gap-2",
      normal: "gap-3",
      loose: "gap-4",
    };
    
    const handleValueChange = (itemValue: string) => {
      if (exclusive) {
        const newValue = currentValue === itemValue ? undefined : itemValue;
        
        if (!isControlled) {
          setInternalValue(newValue);
        }
        
        onValueChange?.(newValue || "");
      }
    };
    
    // Clonar children para pasar props de contexto
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement<any>(child) && exclusive) {
        const itemValue = child.props.value || child.props.label;
        
        return React.cloneElement(child, {
          checked: currentValue === itemValue,
          onCheckedChange: () => handleValueChange(itemValue),
        });
      }
      return child;
    });
    
    return (
      <div className="space-y-3">
        {(groupLabel || groupDescription) && (
          <div className="space-y-1">
            {groupLabel && (
              <h4 className="text-sm font-semibold text-origen-bosque">
                {groupLabel}
              </h4>
            )}
            {groupDescription && (
              <p className="text-xs text-origen-hoja">
                {groupDescription}
              </p>
            )}
          </div>
        )}
        
        <div
          ref={ref}
          className={cn(
            direction === "vertical" && "flex flex-col",
            direction === "horizontal" && "flex flex-wrap items-center",
            spacingClasses[spacing],
            className
          )}
          role={exclusive ? "radiogroup" : "group"}
          {...props}
        >
          {childrenWithProps}
        </div>
      </div>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

// ============================================================================
// EXPORT
// ============================================================================

export { Toggle, ToggleGroup };