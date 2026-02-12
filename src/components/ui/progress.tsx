/**
 * @file progress.tsx
 * @description Componente Progress con diseño orgánico - Sin dependencias externas problemáticas
 * @version 3.0.1 - Corregidas dependencias
 * 
 * @author Equipo Origen Design System
 * @created Marzo 2026
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Leaf, Sprout, Flower, Check } from "lucide-react";

// ============================================================================
// TIPOS
// ============================================================================

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Valor actual del progreso */
  value?: number;
  
  /** Valor máximo del progreso */
  max?: number;
  
  /** Mostrar label con porcentaje */
  showLabel?: boolean;
  
  /** Etiqueta personalizada */
  label?: string;
  
  /** Variante visual */
  variant?: "seed" | "sprout" | "leaf" | "fruit" | "accent" | "forest";
  
  /** Tamaño del progress bar */
  size?: "sm" | "default" | "lg";
  
  /** Mostrar icono de etapa */
  showStageIcon?: boolean;
  
  /** Texto descriptivo */
  description?: string;
}

// ============================================================================
// COMPONENTE PROGRESS
// ============================================================================

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className = "",
      value = 0,
      max = 100,
      showLabel = false,
      label,
      variant = "leaf",
      size = "default",
      showStageIcon = true,
      description,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const variantConfig = {
      seed: {
        track: "bg-origen-crema",
        indicator: "bg-gradient-to-r from-origen-pradera/50 to-origen-pradera",
        icon: null,
      },
      sprout: {
        track: "bg-green-50",
        indicator: "bg-gradient-to-r from-green-200 to-green-400",
        icon: <Sprout className="h-4 w-4 text-green-500" />,
      },
      leaf: {
        track: "bg-origen-pastel",
        indicator: "bg-gradient-to-r from-origen-menta to-origen-hoja",
        icon: <Leaf className="h-4 w-4 text-origen-hoja" />,
      },
      fruit: {
        track: "bg-amber-50",
        indicator: "bg-gradient-to-r from-amber-400 to-orange-500",
        icon: <Flower className="h-4 w-4 text-amber-500" />,
      },
      accent: {
        track: "bg-origen-menta/20",
        indicator: "bg-gradient-to-r from-origen-menta to-origen-pradera",
        icon: <Leaf className="h-4 w-4 text-origen-menta" />,
      },
      forest: {
        track: "bg-origen-bosque/10",
        indicator: "bg-gradient-to-r from-origen-pino to-origen-bosque",
        icon: <Sprout className="h-4 w-4 text-origen-bosque" />,
      },
    };
    
    const config = variantConfig[variant];
    
    const sizeClasses = {
      sm: "h-2",
      default: "h-3",
      lg: "h-4",
    };

    return (
      <div ref={ref} className={cn("w-full space-y-2", className)} {...props}>
        {/* Label y porcentaje */}
        {(showLabel || label) && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {showStageIcon && config.icon && (
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-current/10 to-transparent text-current">
                  {config.icon}
                </div>
              )}
              {label && (
                <span className="text-sm font-medium text-origen-bosque">
                  {label}
                </span>
              )}
            </div>
            {showLabel && (
              <span className="font-semibold text-origen-hoja tabular-nums">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        {/* Barra de progreso */}
        <div
          className={cn(
            "relative overflow-hidden rounded-full",
            config.track,
            sizeClasses[size]
          )}
        >
          <div
            className={cn(
              "h-full transition-all duration-500 ease-out rounded-full",
              config.indicator,
              "relative overflow-hidden",
              "before:absolute before:inset-0",
              "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
              "before:animate-shimmer"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Descripción */}
        {description && (
          <p className="text-xs text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";

// ============================================================================
// PROGRESS CIRCULAR
// ============================================================================

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Valor actual */
  value?: number;
  
  /** Valor máximo */
  max?: number;
  
  /** Tamaño del círculo */
  size?: number;
  
  /** Grosor de la línea */
  strokeWidth?: number;
  
  /** Mostrar label */
  showLabel?: boolean;
  
  /** Variante visual */
  variant?: "seed" | "sprout" | "leaf" | "fruit" | "accent" | "forest";
  
  /** Mostrar icono en el centro */
  showCenterIcon?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  showLabel = true,
  variant = "leaf",
  showCenterIcon = true,
  className = "",
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const variantColors = {
    seed: { track: "#D8F3DC", progress: "#74C69D" },
    sprout: { track: "#D1FAE5", progress: "#10B981" },
    leaf: { track: "#D8F3DC", progress: "#06D6A0" },
    fruit: { track: "#FEF3C7", progress: "#F59E0B" },
    accent: { track: "#D8F3DC", progress: "#06D6A0" },
    forest: { track: "#D1E7DD", progress: "#1B4332" },
  };
  
  const config = variantColors[variant];

  const variantIcons = {
    seed: null,
    sprout: <Sprout className="h-6 w-6 text-green-500" />,
    leaf: <Leaf className="h-6 w-6 text-origen-menta" />,
    fruit: <Flower className="h-6 w-6 text-amber-500" />,
    accent: <Leaf className="h-6 w-6 text-origen-menta" />,
    forest: <Sprout className="h-6 w-6 text-origen-bosque" />,
  };

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)} {...props}>
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={config.track}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={config.progress}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showCenterIcon && variantIcons[variant] && (
            <div className="mb-1 animate-pulse">
              {variantIcons[variant]}
            </div>
          )}
          {showLabel && (
            <span className="text-2xl font-bold text-origen-bosque tabular-nums">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// STEPPED PROGRESS
// ============================================================================

export interface SteppedProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pasos totales */
  steps: number;
  
  /** Paso actual */
  currentStep: number;
  
  /** Etiquetas de los pasos */
  stepLabels?: string[];
  
  /** Variante visual */
  variant?: "seed" | "sprout" | "leaf" | "fruit";
}

const SteppedProgress: React.FC<SteppedProgressProps> = ({
  steps,
  currentStep,
  stepLabels = [],
  variant = "leaf",
  className = "",
  ...props
}) => {
  const stepVariants = {
    seed: {
      active: "bg-origen-pradera border-origen-pradera",
      completed: "bg-origen-menta border-origen-menta",
      upcoming: "bg-white border-origen-pradera/30",
    },
    sprout: {
      active: "bg-green-400 border-green-400",
      completed: "bg-green-500 border-green-500",
      upcoming: "bg-white border-green-300",
    },
    leaf: {
      active: "bg-origen-menta border-origen-menta",
      completed: "bg-origen-hoja border-origen-hoja",
      upcoming: "bg-white border-origen-pradera/30",
    },
    fruit: {
      active: "bg-amber-400 border-amber-400",
      completed: "bg-amber-500 border-amber-500",
      upcoming: "bg-white border-amber-300",
    },
  };
  
  const config = stepVariants[variant];

  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="flex items-center justify-between relative">
        {Array.from({ length: steps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isUpcoming = stepNumber > currentStep;
          
          return (
            <React.Fragment key={index}>
              {/* Conexión entre pasos */}
              {index < steps - 1 && (
                <div 
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-all duration-300",
                    isCompleted ? "bg-origen-hoja" : "bg-gray-200"
                  )}
                />
              )}
              
              {/* Paso individual */}
              <div className="flex flex-col items-center relative z-10">
                <div className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full border-2",
                  "transition-all duration-300",
                  isActive && "scale-110 shadow-lg",
                  isActive && config.active,
                  isCompleted && config.completed,
                  isUpcoming && config.upcoming
                )}>
                  {isCompleted ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : (
                    <span className={cn(
                      "text-sm font-semibold",
                      isActive ? "text-white" : "text-gray-600"
                    )}>
                      {stepNumber}
                    </span>
                  )}
                </div>
                
                {stepLabels[index] && (
                  <span className={cn(
                    "text-xs mt-2 text-center max-w-[80px]",
                    isActive ? "font-semibold text-origen-bosque" : "text-gray-600"
                  )}>
                    {stepLabels[index]}
                  </span>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
      
      <div className="mt-4 text-center text-sm text-origen-bosque">
        Paso {currentStep} de {steps}
      </div>
    </div>
  );
};

// ============================================================================
// EXPORT
// ============================================================================

export { Progress, CircularProgress, SteppedProgress };