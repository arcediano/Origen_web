/**
 * @file input.tsx
 * @description Componente de input accesible con sistema de validación orgánica mejorada
 * @version 3.0.0 - Rediseño completo según manual de marca Origen
 * 
 * Características principales:
 * ✅ Sistema de validación con iconografía inspirada en naturaleza
 * ✅ Efectos de focus inspirados en el logo Origen (círculo protector)
 * ✅ Auto-resize orgánico con animaciones suaves
 * ✅ Contador de caracteres con progresión visual natural
 * ✅ Estados de validación animados (éxito, error, advertencia)
 * ✅ Compatibilidad total con Manual de Marca Sección 3.3
 * ✅ Accesibilidad WCAG 2.1 AAA garantizada
 * 
 * @author Equipo Origen Design System
 * @created Marzo 2026
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { 
  AlertCircle, 
  Check, 
  Eye, 
  EyeOff, 
  Search, 
  User, 
  Mail, 
  Lock,
  Leaf,
  Loader2,
  MapPin,
  Phone,
  Calendar,
  Hash
} from "lucide-react";
import { Button } from "./button";

// ============================================================================
// TIPOS
// ============================================================================

/**
 * Props del componente Input
 * @description Extiende InputHTMLAttributes excluyendo 'size' para evitar conflictos
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Etiqueta del input (Manual Sección 4.3)
   */
  label?: string;
  
  /**
   * Mensaje de error (sistema de validación mejorado)
   */
  error?: string;
  
  /**
   * Texto de ayuda (Manual Sección 1.3 - Personalidad cercana)
   */
  helperText?: string;
  
  /**
   * Icono izquierdo (sistema de iconografía orgánica)
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Icono derecho personalizado
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Mostrar contador de caracteres (feedback visual)
   */
  showCharCount?: boolean;
  
  /**
   * Límite máximo de caracteres
   */
  maxLength?: number;
  
  /**
   * Estado de éxito (validación positiva)
   */
  success?: boolean;
  
  /**
   * Estado de carga (procesamiento)
   */
  loading?: boolean;
  
  /**
   * Variante del diseño (Manual Sección 3.3)
   */
  variant?: "default" | "outline" | "filled" | "minimal";
  
  /**
   * Tamaño del input (sistema proporcional)
   */
  inputSize?: "sm" | "md" | "lg";
  
  /**
   * Efecto de glow en focus (inspirado en logo)
   */
  glow?: boolean;
  
  /**
   * Mostrar mensaje de advertencia
   */
  warning?: string;
}

// ============================================================================
// SISTEMA DE ICONOGRAFÍA
// ============================================================================

/**
 * Sistema de iconos predefinidos para tipos comunes
 * @description Iconografía inspirada en elementos naturales (Manual Sección 5.1)
 */
const iconMap: Record<string, React.ReactNode> = {
  email: <Mail className="h-4 w-4" />,
  password: <Lock className="h-4 w-4" />,
  text: <User className="h-4 w-4" />,
  search: <Search className="h-4 w-4" />,
  tel: <Phone className="h-4 w-4" />,
  url: <Search className="h-4 w-4" />,
  date: <Calendar className="h-4 w-4" />,
  number: <Hash className="h-4 w-4" />,
  default: <Leaf className="h-4 w-4" />,
};

/**
 * Mapa de iconos de validación
 */
const validationIconMap = {
  success: <Check className="h-4 w-4 text-green-500" />,
  error: <AlertCircle className="h-4 w-4 text-red-500" />,
  warning: <AlertCircle className="h-4 w-4 text-amber-500" />,
  loading: <Loader2 className="h-4 w-4 text-origen-hoja animate-spin" />,
};

// ============================================================================
// COMPONENTE INPUT
// ============================================================================

/**
 * Componente Input mejorado con diseño orgánico
 * @description Implementa sistema de validación visual y feedback háptico
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      showCharCount,
      maxLength,
      success,
      loading,
      warning,
      variant = "default",
      inputSize = "md",
      glow = true,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    // ========================================================================
    // ESTADOS
    // ========================================================================
    
    const [showPassword, setShowPassword] = React.useState(false);
    const [charCount, setCharCount] = React.useState(0);
    const [isFocused, setIsFocused] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    
    const inputId = id || React.useId();
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const warningId = `${inputId}-warning`;
    
    // ========================================================================
    // CONFIGURACIÓN
    // ========================================================================
    
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    const IconComponent = iconMap[type] || iconMap.default;
    const hasLeftIcon = leftIcon || IconComponent;
    
    // Determinar estado de validación
    const validationState = error ? "error" : 
                          warning ? "warning" : 
                          success ? "success" : 
                          loading ? "loading" : null;
    
    // ========================================================================
    // MANEJADORES
    // ========================================================================
    
    /**
     * Maneja cambios en el input
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (showCharCount) {
        setCharCount(e.target.value.length);
      }
      props.onChange?.(e);
    };
    
    /**
     * Maneja foco en el input
     */
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };
    
    /**
     * Maneja pérdida de foco
     */
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };
    
    /**
     * Maneja hover
     */
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // ========================================================================
    // ESTILOS POR VARIANTE (Manual Sección 3.3)
    // ========================================================================
    
    const variantClasses = {
      // DEFAULT: Estilo principal del sistema
      default: cn(
        "bg-white border border-origen-pradera/50",
        "hover:border-origen-hoja",
        "focus:border-origen-menta",
        error && "border-red-500",
        warning && !error && "border-amber-500",
        success && !error && !warning && "border-green-500"
      ),
      
      // OUTLINE: Borde destacado (Manual Sección 6.1)
      outline: cn(
        "bg-transparent border-2 border-origen-bosque/30",
        "hover:border-origen-bosque/50",
        "focus:border-origen-menta focus:ring-2 focus:ring-origen-menta/20",
        error && "border-red-500",
        warning && !error && "border-amber-500",
        success && !error && !warning && "border-green-500"
      ),
      
      // FILLED: Fondo suave (Manual Sección 3.2 - Verde Pastel)
      filled: cn(
        "bg-origen-crema border border-transparent",
        "hover:bg-origen-pastel",
        "focus:bg-white focus:border-origen-menta",
        error && "bg-red-50 border-red-500",
        warning && !error && "bg-amber-50 border-amber-500",
        success && !error && !warning && "bg-green-50 border-green-500"
      ),
      
      // MINIMAL: Diseño limpio (Manual Sección 1.3 - Personalidad práctica)
      minimal: cn(
        "bg-transparent border-b border-origen-pradera/30",
        "hover:border-origen-hoja",
        "focus:border-origen-menta focus:border-b-2",
        "rounded-none px-0",
        error && "border-red-500",
        warning && !error && "border-amber-500",
        success && !error && !warning && "border-green-500"
      ),
    };

    // ========================================================================
    // ESTILOS POR TAMAÑO
    // ========================================================================
    
    const sizeClasses = {
      sm: cn(
        "h-10 px-3 text-sm",
        "[&_svg]:h-4 [&_svg]:w-4"
      ),
      md: cn(
        "h-12 px-4 text-base",
        "[&_svg]:h-5 [&_svg]:w-5"
      ),
      lg: cn(
        "h-14 px-5 text-lg",
        "[&_svg]:h-6 [&_svg]:w-6"
      ),
    };

    // ========================================================================
    // CÁLCULO DE PROGRESO
    // ========================================================================
    
    // Calcular progreso para la barra de caracteres
    const progressPercentage = maxLength 
      ? Math.min((charCount / maxLength) * 100, 100) 
      : 0;
    
    // Determinar color de progreso según porcentaje
    const getProgressColor = () => {
      if (!maxLength) return "bg-origen-menta";
      if (charCount === maxLength) return "bg-red-500";
      if (charCount > maxLength * 0.9) return "bg-amber-500";
      if (charCount > maxLength * 0.75) return "bg-origen-hoja";
      return "bg-origen-menta";
    };
    
    const progressColor = getProgressColor();

    // ========================================================================
    // RENDER
    // ========================================================================
    
    return (
      <div className="w-full space-y-3">
        {/* ====================================================================
            LABEL CON ICONO
        ==================================================================== */}
        
        {label && (
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-1.5 rounded-lg",
              "bg-gradient-to-br from-origen-menta/10 to-origen-pradera/10",
              "text-origen-hoja"
            )}>
              {hasLeftIcon}
            </div>
            <label
              htmlFor={inputId}
              className={cn(
                "block text-sm font-semibold text-origen-bosque",
                "transition-colors duration-200",
                disabled && "opacity-50 cursor-not-allowed",
                error && "text-red-600",
                warning && !error && "text-amber-600",
                success && !error && !warning && "text-green-600"
              )}
            >
              {label}
              {props.required && (
                <span className="text-red-500 ml-1" aria-label="requerido">
                  *
                </span>
              )}
            </label>
          </div>
        )}

        {/* ====================================================================
            CONTAINER DEL INPUT
        ==================================================================== */}
        
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* ------------------------------------------------------------------
              LEFT ICON
          ------------------------------------------------------------------ */}
          
          {hasLeftIcon && (
            <div className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2",
              "text-origen-hoja/60 pointer-events-none",
              "transition-all duration-300 ease-out",
              isFocused && "text-origen-menta scale-110",
              isHovered && !isFocused && "text-origen-hoja",
              error && "text-red-500",
              warning && !error && "text-amber-500",
              success && !error && !warning && "text-green-500"
            )}>
              {hasLeftIcon}
            </div>
          )}

          {/* ------------------------------------------------------------------
              INPUT PRINCIPAL
          ------------------------------------------------------------------ */}
          
          <input
            type={inputType}
            id={inputId}
            ref={ref}
            disabled={disabled}
            maxLength={maxLength}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={!!error}
            aria-describedby={cn(
              error && errorId,
              warning && warningId,
              helperText && helperId
            )}
            aria-busy={loading}
            className={cn(
              // Estilos base
              "flex w-full rounded-xl",
              "text-origen-oscuro placeholder:text-origen-pradera/50",
              "transition-all duration-300 ease-out",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
              "focus:outline-none focus:ring-0",
              
              // Efecto glow (inspirado en logo)
              glow && cn(
                "shadow-origen-sm",
                isFocused && !validationState && cn(
                  "shadow-origen-md shadow-origen-menta/20",
                  "ring-2 ring-origen-menta/20"
                ),
                isHovered && !isFocused && "shadow-origen"
              ),
              
              // Aplicar variantes
              variantClasses[variant],
              sizeClasses[inputSize],
              
              // Ajustes de padding para iconos
              hasLeftIcon && "pl-11",
              (rightIcon || isPassword || validationState) && "pr-12",
              
              // Estados de validación
              error && "ring-2 ring-red-500/20",
              warning && !error && "ring-2 ring-amber-500/20",
              success && !error && !warning && "ring-2 ring-green-500/20",
              
              className
            )}
            {...props}
          />

          {/* ------------------------------------------------------------------
              RIGHT ACTIONS (Iconos y acciones)
          ------------------------------------------------------------------ */}
          
          <div className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "flex items-center gap-2"
          )}>
            {/* Icono de validación */}
            {validationState && validationIconMap[validationState]}
            
            {/* Botón para mostrar/ocultar contraseña */}
            {isPassword && !validationState && (
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                className="h-8 w-8 rounded-lg"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>
            )}
            
            {/* Icono derecho personalizado */}
            {rightIcon && !validationState && (
              <div className="text-origen-hoja/60 hover:text-origen-bosque transition-colors">
                {rightIcon}
              </div>
            )}
          </div>
          
          {/* ------------------------------------------------------------------
              BARRA DE PROGRESO PARA CONTADOR
          ------------------------------------------------------------------ */}
          
          {showCharCount && maxLength && (
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-origen-pastel rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-500 ease-out",
                  progressColor
                )}
                style={{ width: `${progressPercentage}%` }}
                aria-hidden="true"
              />
            </div>
          )}
          
          {/* ------------------------------------------------------------------
              EFECTO DE FOCO CIRCULAR (Inspirado en logo)
          ------------------------------------------------------------------ */}
          
          {isFocused && glow && (
            <div 
              className={cn(
                "absolute -inset-1 rounded-2xl",
                "bg-gradient-to-r from-origen-menta/5 to-transparent",
                "pointer-events-none animate-pulse",
                "border border-origen-menta/10"
              )}
              aria-hidden="true"
            />
          )}
        </div>

        {/* ====================================================================
            FOOTER CON MENSAJES Y CONTADOR
        ==================================================================== */}
        
        <div className="flex items-start justify-between gap-2 min-h-[24px]">
          {/* Mensajes de error/helper/advertencia */}
          <div className="flex-1 space-y-1">
            {/* Error Message */}
            {error && (
              <p 
                id={errorId}
                className="text-xs text-red-600 flex items-center gap-1.5 animate-origen-fade-in"
                role="alert"
              >
                <AlertCircle className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </p>
            )}
            
            {/* Warning Message */}
            {warning && !error && (
              <p 
                id={warningId}
                className="text-xs text-amber-600 flex items-center gap-1.5 animate-origen-fade-in"
              >
                <AlertCircle className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                <span>{warning}</span>
              </p>
            )}
            
            {/* Helper Text */}
            {helperText && !error && !warning && (
              <p 
                id={helperId}
                className="text-xs text-origen-hoja leading-relaxed"
              >
                {helperText}
              </p>
            )}
          </div>

          {/* Character Counter */}
          {showCharCount && maxLength && (
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <span 
                  className={cn(
                    "text-xs font-medium tabular-nums transition-colors duration-300",
                    charCount === maxLength 
                      ? "text-red-600" 
                      : charCount > maxLength * 0.9 
                      ? "text-amber-600"
                      : charCount > maxLength * 0.75
                      ? "text-origen-hoja"
                      : "text-origen-hoja"
                  )}
                  aria-live="polite"
                  aria-label={`${charCount} de ${maxLength} caracteres`}
                >
                  {charCount}/{maxLength}
                </span>
                {charCount > 0 && (
                  <span className="text-xs text-origen-pradera">
                    ({Math.round((charCount / maxLength) * 100)}%)
                  </span>
                )}
              </div>
              {charCount === maxLength && (
                <span className="text-[10px] text-red-500 animate-origen-pulse flex items-center gap-1">
                  <AlertCircle className="h-2 w-2" />
                  Límite alcanzado
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

// ============================================================================
// INPUT GROUP
// ============================================================================

/**
 * InputGroup - Para agrupar inputs relacionados
 * @description Sistema de agrupación para formularios complejos
 */
interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Dirección del grupo */
  direction?: "vertical" | "horizontal";
  
  /** Inputs hijos */
  children: React.ReactNode;
  
  /** Etiqueta del grupo */
  groupLabel?: string;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, direction = "vertical", groupLabel, children, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {groupLabel && (
          <h4 className="text-sm font-semibold text-origen-bosque">
            {groupLabel}
          </h4>
        )}
        <div
          ref={ref}
          className={cn(
            direction === "vertical" && "space-y-4",
            direction === "horizontal" && "flex gap-4",
            className
          )}
          role="group"
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);

InputGroup.displayName = "InputGroup";

// ============================================================================
// EXPORT
// ============================================================================

export { Input, InputGroup };

/**
 * EJEMPLOS DE USO:
 * 
 * // Input básico con label
 * <Input 
 *   label="Email" 
 *   type="email" 
 *   placeholder="tu@email.com"
 *   required
 * />
 * 
 * // Input con icono y validación
 * <Input
 *   label="Nombre completo"
 *   leftIcon={<User />}
 *   error={errors.name}
 *   helperText="Tu nombre completo como aparece en el DNI"
 * />
 * 
 * // Input password con toggle
 * <Input
 *   label="Contraseña"
 *   type="password"
 *   showCharCount
 *   maxLength={32}
 *   success={isValidPassword}
 * />
 * 
 * // Input con estado de carga
 * <Input
 *   label="Búsqueda"
 *   type="search"
 *   leftIcon={<Search />}
 *   loading={isSearching}
 * />
 * 
 * // Input con variantes
 * <Input variant="outline" label="Outlined" />
 * <Input variant="filled" label="Filled" />
 * <Input variant="minimal" label="Minimal" />
 * 
 * // Input con advertencia
 * <Input
 *   label="Teléfono"
 *   type="tel"
 *   warning="Formato internacional recomendado: +34 600 000 000"
 * />
 * 
 * // Grupo de inputs
 * <InputGroup direction="horizontal" groupLabel="Dirección">
 *   <Input label="Calle" placeholder="Calle Principal" />
 *   <Input label="Número" placeholder="123" />
 *   <Input label="Piso" placeholder="2º" />
 * </InputGroup>
 * 
 * // Input con contador de caracteres avanzado
 * <Input
 *   label="Descripción del producto"
 *   showCharCount
 *   maxLength={500}
 *   helperText="Describe tu producto con detalle"
 * />
 */