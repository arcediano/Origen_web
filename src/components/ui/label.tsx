/**
 * Label Component - Origen Design System
 * @description Label accesible basado en Radix UI
 * 
 * ACCESIBILIDAD:
 * - Asociación correcta con form controls
 * - Contraste AAA (Verde Oscuro sobre blanco: 13.1:1)
 * - Indicador visual de campos requeridos
 */

"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

const labelVariants = cva(
  "text-sm font-medium text-origen-bosque leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        error: "text-red-600",
        success: "text-green-600",
        muted: "text-gray-600 font-normal",
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
  optional?: boolean;
  tooltip?: string;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, size, required, optional, tooltip, children, ...props }, ref) => (
  <div className="flex items-center gap-2">
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {required && (
        <span 
          className="text-red-500 ml-1 inline-block" 
          aria-label="campo requerido"
        >
          *
        </span>
      )}
      {optional && (
        <span className="text-gray-400 ml-1 text-xs font-normal">
          (opcional)
        </span>
      )}
    </LabelPrimitive.Root>
    {tooltip && (
      <div className="group relative">
        <AlertCircle 
          className="h-4 w-4 text-gray-400 cursor-help" 
          aria-label="información adicional"
        />
        <div 
          className={cn(
            "absolute left-0 top-6 z-50 hidden group-hover:block",
            "w-64 p-3 rounded-lg bg-origen-oscuro text-white text-xs",
            "shadow-lg animate-in fade-in-0 zoom-in-95"
          )}
          role="tooltip"
        >
          {tooltip}
          <div className="absolute -top-1 left-4 w-2 h-2 bg-origen-oscuro rotate-45" />
        </div>
      </div>
    )}
  </div>
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };

/**
 * EJEMPLOS DE USO:
 * 
 * // Label básico
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" />
 * 
 * // Campo requerido
 * <Label htmlFor="name" required>Nombre completo</Label>
 * <Input id="name" />
 * 
 * // Campo opcional
 * <Label htmlFor="phone" optional>Teléfono</Label>
 * <Input id="phone" />
 * 
 * // Con tooltip
 * <Label 
 *   htmlFor="nif" 
 *   required
 *   tooltip="El NIF debe tener 9 caracteres (8 números + letra)"
 * >
 *   NIF
 * </Label>
 * <Input id="nif" />
 * 
 * // Variante error
 * <Label htmlFor="email" variant="error">Email</Label>
 * <Input id="email" error="Email inválido" />
 * 
 * // Variante success
 * <Label htmlFor="username" variant="success">Nombre de usuario</Label>
 * <Input id="username" success />
 * 
 * // Muted (para campos secundarios)
 * <Label htmlFor="notes" variant="muted">Notas adicionales</Label>
 * <Textarea id="notes" />
 * 
 * // Tamaños
 * <Label size="sm">Pequeño</Label>
 * <Label size="default">Normal</Label>
 * <Label size="lg">Grande</Label>
 * 
 * // Ejemplo completo
 * <div className="space-y-2">
 *   <Label 
 *     htmlFor="businessName" 
 *     required
 *     tooltip="El nombre comercial como aparecerá en la plataforma"
 *   >
 *     Nombre del negocio
 *   </Label>
 *   <Input 
 *     id="businessName" 
 *     placeholder="Ej: Granja Ecológica del Valle"
 *   />
 * </div>
 */
