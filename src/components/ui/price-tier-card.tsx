/**
 * @file price-tier-card.tsx
 * @description Tarjeta de tramo de precio premium - 100% responsive
 * @version 2.0.1 - CORREGIDO: inputSize en lugar de size
 */

"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { CurrencyInput } from './currency-input';
import { PercentageInput } from './percentage-input';
import { Badge } from '@/components/ui/badge';
import { X, GripVertical, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PriceTier {
  id?: string;
  minQuantity: number;
  maxQuantity?: number;
  type: 'fixed' | 'percentage';
  value: number;
  label?: string;
}

export interface PriceTierCardProps {
  tier: PriceTier;
  index: number;
  onUpdate: (index: number, field: keyof PriceTier, value: any) => void;
  onRemove: (index: number) => void;
  isDraggable?: boolean;
  currency?: string;
  error?: string;
}

export function PriceTierCard({ 
  tier, 
  index, 
  onUpdate, 
  onRemove, 
  isDraggable = false,
  currency = 'EUR',
  error
}: PriceTierCardProps) {
  
  const handleTypeChange = (value: string) => {
    if (value === 'fixed' || value === 'percentage') {
      onUpdate(index, 'type', value);
      // Resetear valor al cambiar tipo
      onUpdate(index, 'value', 0);
    }
  };

  return (
    <div className={cn(
      "p-3 sm:p-4 bg-white rounded-xl border border-gray-200 relative group",
      "hover:border-origen-pradera/30 hover:shadow-origen transition-all",
      error && "border-red-500 bg-red-50/30"
    )}>
      {/* Header con acciones */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-1 sm:gap-2">
          {isDraggable && (
            <GripVertical className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 cursor-move" />
          )}
          <Badge variant="seed" size="sm" className="bg-origen-crema/50">
            <Tag className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
            Tramo {index + 1}
          </Badge>
          {tier.label && (
            <span className="text-[10px] sm:text-xs text-gray-500 truncate max-w-[80px] sm:max-w-[120px]">
              {tier.label}
            </span>
          )}
        </div>
        <button
          onClick={() => onRemove(index)}
          className="text-gray-400 hover:text-red-600 transition-colors p-1"
          aria-label="Eliminar tramo"
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-[10px] sm:text-xs text-red-600 mb-2">{error}</p>
      )}

      {/* Grid de campos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {/* Cantidad mínima */}
        <div>
          <label className="text-[10px] sm:text-xs text-gray-500 mb-1 block">
            Mínimo <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            value={tier.minQuantity}
            onChange={(e) => onUpdate(index, 'minQuantity', parseInt(e.target.value) || 1)}
            min={1}
            inputSize="sm"  // ✅ Cambiado de size a inputSize
            className="h-8 sm:h-9 text-xs sm:text-sm"
            placeholder="Ej: 2"
          />
        </div>

        {/* Cantidad máxima */}
        <div>
          <label className="text-[10px] sm:text-xs text-gray-500 mb-1 block">Máximo</label>
          <Input
            type="number"
            value={tier.maxQuantity || ''}
            onChange={(e) => onUpdate(index, 'maxQuantity', parseInt(e.target.value) || undefined)}
            min={1}
            inputSize="sm"  // ✅ Cambiado de size a inputSize
            className="h-8 sm:h-9 text-xs sm:text-sm"
            placeholder="Ilimitado"
          />
        </div>

        {/* Tipo */}
        <div>
          <label className="text-[10px] sm:text-xs text-gray-500 mb-1 block">Tipo</label>
          <Select
            value={tier.type}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger className="h-8 sm:h-9 text-xs sm:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">Precio fijo</SelectItem>
              <SelectItem value="percentage">Descuento %</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Valor */}
        <div>
          <label className="text-[10px] sm:text-xs text-gray-500 mb-1 block">
            {tier.type === 'fixed' ? 'Precio' : 'Descuento'}
          </label>
          {tier.type === 'fixed' ? (
            <CurrencyInput
              value={tier.value}
              onChange={(v) => onUpdate(index, 'value', v)}
              min={0}
              className="h-8 sm:h-9 text-xs sm:text-sm"
              placeholder={`0,00 ${currency}`}
            />
          ) : (
            <PercentageInput
              value={tier.value}
              onChange={(v) => onUpdate(index, 'value', v)}
              min={0}
              max={100}
              className="h-8 sm:h-9 text-xs sm:text-sm"
              placeholder="0%"
            />
          )}
        </div>
      </div>

      {/* Etiqueta personalizada (opcional) */}
      <div className="mt-2">
        <Input
          value={tier.label || ''}
          onChange={(e) => onUpdate(index, 'label', e.target.value)}
          inputSize="sm"  // ✅ Cambiado de size a inputSize
          className="h-7 sm:h-8 text-xs sm:text-sm"
          placeholder="Etiqueta personalizada (opcional)"
        />
      </div>
    </div>
  );
}