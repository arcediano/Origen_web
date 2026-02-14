/**
 * @file currency-input.tsx
 * @description Input con formato de moneda (€) con 2 decimales
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  min?: number;
  max?: number;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ 
    className, 
    value, 
    onChange, 
    label, 
    error, 
    helperText, 
    icon,
    min = 0,
    max,
    disabled,
    id,
    ...props 
  }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(
      value ? value.toFixed(2) : ''
    );
    const inputId = id || React.useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/[^\d.,]/g, '');
      const numericValue = parseFloat(rawValue.replace(',', '.'));
      
      if (isNaN(numericValue)) {
        setDisplayValue('');
        onChange(0);
        return;
      }

      let clampedValue = numericValue;
      if (min !== undefined) clampedValue = Math.max(min, clampedValue);
      if (max !== undefined) clampedValue = Math.min(max, clampedValue);
      
      setDisplayValue(clampedValue.toFixed(2));
      onChange(clampedValue);
    };

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium text-origen-bosque",
              error && "text-red-600"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <div className="absolute left-9 top-1/2 -translate-y-1/2 text-gray-500">€</div>
          <input
            ref={ref}
            id={inputId}
            type="text"
            inputMode="decimal"
            value={displayValue}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm",
              "placeholder:text-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-origen-pradera/50 focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              icon ? "pl-9" : "pl-3",
              "pl-12", // Espacio para el €
              error && "border-red-500 focus:ring-red-500/50",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };