/**
 * @file textarea.tsx
 * @description Componente Textarea con diseño orgánico - CORREGIDO v3.0.3
 * @version 3.0.3 - Eliminados todos los usos de Menta (#06D6A0)
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { 
  AlertCircle, 
  Check, 
  Info,
  Minus,
  Plus,
  Type,
  Loader2,
  Maximize2,
  Minimize2,
  Leaf
} from "lucide-react";
import { Button } from "./button";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  autoResize?: boolean;
  success?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  variant?: "default" | "outline" | "filled" | "minimal";
  textareaSize?: "sm" | "md" | "lg";
  showZoomControls?: boolean;
  warningThreshold?: number;
  resizable?: boolean;
  markdownPreview?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className = "",
      label,
      error,
      helperText,
      showCharCount = false,
      maxLength,
      autoResize = true,
      disabled,
      success,
      loading,
      icon = <Type className="h-4 w-4" />,
      variant = "default",
      textareaSize = "md",
      showZoomControls = false,
      warningThreshold = 80,
      resizable = false,
      markdownPreview = false,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(0);
    const [isFocused, setIsFocused] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [fontSize, setFontSize] = React.useState(16);
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [showPreview, setShowPreview] = React.useState(false);
    
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const textareaId = id || React.useId();
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    const warningLevel = maxLength 
      ? (charCount / maxLength) * 100 
      : 0;
    
    const isNearLimit = warningLevel >= warningThreshold;
    const isAtLimit = charCount === maxLength;
    
    const validationState = error ? "error" : 
                          success ? "success" : 
                          loading ? "loading" : null;

    const variantClasses = {
      default: "bg-white border border-origen-pradera/50 hover:border-origen-hoja focus:border-origen-pradera",
      outline: "bg-transparent border-2 border-origen-bosque/30 hover:border-origen-bosque/50 focus:border-origen-pradera focus:ring-2 focus:ring-origen-pradera/20",
      filled: "bg-origen-crema border border-transparent hover:bg-origen-pastel focus:bg-white focus:border-origen-pradera",
      minimal: "bg-transparent border-b border-origen-pradera/30 hover:border-origen-hoja focus:border-origen-pradera focus:border-b-2 rounded-none px-0",
    };

    const sizeClasses = {
      sm: "min-h-[80px] px-3 py-2 text-sm",
      md: "min-h-[120px] px-4 py-3 text-base",
      lg: "min-h-[160px] px-5 py-4 text-lg",
    };

    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (textarea && autoResize && !isExpanded) {
        textarea.style.height = "auto";
        const newHeight = Math.max(
          textarea.scrollHeight,
          textareaSize === "sm" ? 80 : textareaSize === "lg" ? 160 : 120
        );
        textarea.style.height = `${newHeight}px`;
      }
    }, [autoResize, textareaSize, isExpanded]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (showCharCount) {
        setCharCount(e.target.value.length);
      }
      if (autoResize) {
        adjustHeight();
      }
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
      if (textareaRef.current) {
        if (!isExpanded) {
          textareaRef.current.style.height = "400px";
        } else {
          adjustHeight();
        }
      }
    };

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement) => {
        textareaRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement>).current = node;
        }
      },
      [ref]
    );

    React.useEffect(() => {
      if (autoResize) {
        setTimeout(adjustHeight, 0);
      }
    }, [adjustHeight, autoResize]);

    React.useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.fontSize = `${fontSize}px`;
      }
    }, [fontSize]);

    const getProgressColor = () => {
      if (!maxLength) return "bg-origen-pradera";
      if (isAtLimit) return "bg-red-500";
      if (isNearLimit) return "bg-amber-500";
      if (charCount > maxLength * 0.5) return "bg-origen-hoja";
      return "bg-origen-pradera";
    };
    
    const progressColor = getProgressColor();

    return (
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-1.5 rounded-lg",
              "bg-gradient-to-br from-origen-pradera/10 to-origen-hoja/10",
              "text-origen-hoja transition-all duration-300",
              isFocused && "from-origen-pradera/20 to-origen-hoja/20",
              error && "from-red-100 to-red-50 text-red-500",
              success && !error && "from-green-100 to-green-50 text-green-500"
            )}>
              {icon}
            </div>
            {label && (
              <label
                htmlFor={textareaId}
                className={cn(
                  "block text-sm font-semibold text-origen-bosque",
                  disabled && "opacity-50 cursor-not-allowed",
                  error && "text-red-600",
                  success && !error && "text-green-600"
                )}
              >
                {label}
                {props.required && (
                  <span className="text-red-500 ml-1" aria-label="requerido">
                    *
                  </span>
                )}
              </label>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {showZoomControls && (
              <div className="flex items-center gap-1 bg-origen-crema rounded-lg p-1">
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
                  disabled={fontSize <= 12}
                  aria-label="Reducir tamaño de texto"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-xs font-medium text-origen-bosque w-8 text-center">
                  {fontSize}px
                </span>
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => setFontSize(prev => Math.min(24, prev + 2))}
                  disabled={fontSize >= 24}
                  aria-label="Aumentar tamaño de texto"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {resizable && (
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                onClick={toggleExpand}
                className="h-8 w-8 rounded-lg"
                aria-label={isExpanded ? "Minimizar" : "Expandir"}
              >
                {isExpanded ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            )}
            
            {markdownPreview && (
              <Button
                type="button"
                size="icon-sm"
                variant={showPreview ? "secondary" : "ghost"}
                onClick={() => setShowPreview(!showPreview)}
                className="h-8 w-8 rounded-lg"
                aria-label={showPreview ? "Ocultar preview" : "Mostrar preview"}
              >
                <Leaf className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <textarea
            id={textareaId}
            ref={setRefs}
            disabled={disabled}
            maxLength={maxLength}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={!!error}
            aria-describedby={cn(error && errorId, helperText && helperId)}
            aria-busy={loading}
            className={cn(
              "flex w-full rounded-xl",
              "text-origen-oscuro placeholder:text-origen-pradera/50",
              "transition-all duration-300 ease-out",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
              "focus:outline-none focus:ring-0",
              isFocused && !validationState && cn(
                "shadow-origen-md shadow-origen-pradera/20",
                "ring-2 ring-origen-pradera/20"
              ),
              isHovered && !isFocused && "shadow-origen",
              variantClasses[variant],
              sizeClasses[textareaSize],
              error && "ring-2 ring-red-500/20",
              success && !error && "ring-2 ring-green-500/20",
              resizable && !autoResize && "resize-y",
              !resizable && "resize-none",
              className
            )}
            {...props}
          />

          <div className="absolute right-3 top-3 flex items-center gap-2">
            {loading && (
              <Loader2 className="h-5 w-5 animate-spin text-origen-hoja" />
            )}
            {success && !error && !loading && (
              <div className="animate-origen-slide-in">
                <Check className="h-5 w-5 text-green-500" />
              </div>
            )}
            {error && !loading && (
              <div className="animate-origen-slide-in">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>
          
          {showCharCount && maxLength && (
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-origen-pastel rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-500 ease-out",
                  progressColor
                )}
                style={{ width: `${Math.min(warningLevel, 100)}%` }}
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-2 min-h-[24px]">
          <div className="flex-1 space-y-1">
            {error && (
              <p 
                id={errorId}
                className="text-xs text-red-600 flex items-center gap-1.5 animate-origen-fade-in"
                role="alert"
              >
                <AlertCircle className="h-3 w-3 flex-shrink-0" />
                <span>{error}</span>
              </p>
            )}
            
            {helperText && !error && (
              <p 
                id={helperId}
                className="text-xs text-origen-hoja leading-relaxed"
              >
                {helperText}
              </p>
            )}
            
            {showCharCount && maxLength && isNearLimit && !isAtLimit && !error && (
              <p className="text-xs text-amber-600 flex items-center gap-1.5 animate-origen-fade-in">
                <Info className="h-3 w-3 flex-shrink-0" />
                <span>Cerca del límite ({Math.round(warningLevel)}%)</span>
              </p>
            )}
          </div>

          {showCharCount && maxLength && (
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <span 
                  className={cn(
                    "text-xs font-medium tabular-nums transition-colors duration-300",
                    isAtLimit ? "text-red-600" : 
                    isNearLimit ? "text-amber-600" : "text-origen-hoja"
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
              {isAtLimit && (
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

Textarea.displayName = "Textarea";

export { Textarea };