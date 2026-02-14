/**
 * @file price-tier-card.tsx
 * @description Componente reutilizable para tramos de precio
 */

"use client";

import { PriceTier } from '@/types/product';
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
import { X, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PriceTierCardProps {
  tier: PriceTier;
  index: number;
  onUpdate: (index: number, field: keyof PriceTier, value: any) => void;
  onRemove: (index: number) => void;
  isDraggable?: boolean;
}

export function PriceTierCard({ 
  tier, 
  index, 
  onUpdate, 
  onRemove, 
  isDraggable = false 
}: PriceTierCardProps) {
  
  // Manejador para el cambio de tipo con tipado correcto
  const handleTypeChange = (value: string) => {
    // Validar que el valor sea uno de los tipos permitidos
    if (value === 'fixed' || value === 'percentage') {
      onUpdate(index, 'type', value);
    }
  };

  return (
    <div className={cn(
      "p-4 bg-white rounded-xl border border-gray-200 relative group",
      "hover:border-origen-pradera/30 hover:shadow-sm transition-all"
    )}>
      {/* Header con acciones */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isDraggable && (
            <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
          )}
          <Badge variant="outline" size="sm" className="bg-origen-crema/50">
            Tramo {index + 1}
          </Badge>
        </div>
        <button
          onClick={() => onRemove(index)}
          className="text-gray-400 hover:text-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Grid de campos */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="col-span-1">
          <label className="text-xs text-gray-500 mb-1 block">
            Mínimo <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            value={tier.minQuantity}
            onChange={(e) => onUpdate(index, 'minQuantity', parseInt(e.target.value) || 1)}
            min={1}
            className="h-9 text-sm"
            placeholder="Ej: 2"
          />
        </div>

        <div className="col-span-1">
          <label className="text-xs text-gray-500 mb-1 block">Máximo</label>
          <Input
            type="number"
            value={tier.maxQuantity || ''}
            onChange={(e) => onUpdate(index, 'maxQuantity', parseInt(e.target.value) || undefined)}
            min={1}
            className="h-9 text-sm"
            placeholder="Ilimitado"
          />
        </div>

        <div className="col-span-1">
          <label className="text-xs text-gray-500 mb-1 block">Tipo</label>
          <Select
            value={tier.type}
            onValueChange={handleTypeChange} // ✅ Usamos el manejador con tipado correcto
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">Precio fijo</SelectItem>
              <SelectItem value="percentage">Descuento %</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1">
          <label className="text-xs text-gray-500 mb-1 block">
            {tier.type === 'fixed' ? 'Precio' : 'Descuento'}
          </label>
          {tier.type === 'fixed' ? (
            <CurrencyInput
              value={tier.value}
              onChange={(v) => onUpdate(index, 'value', v)}
              min={0}
              className="h-9 text-sm"
            />
          ) : (
            <PercentageInput
              value={tier.value}
              onChange={(v) => onUpdate(index, 'value', v)}
              min={0}
              max={100}
              className="h-9 text-sm"
            />
          )}
        </div>

        <div className="col-span-1">
          <label className="text-xs text-gray-500 mb-1 block">Etiqueta</label>
          <Input
            value={tier.label || ''}
            onChange={(e) => onUpdate(index, 'label', e.target.value)}
            className="h-9 text-sm"
            placeholder="Opcional"
          />
        </div>
      </div>
    </div>
  );
}