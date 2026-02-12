// 📁 /src/components/onboarding/steps/EnhancedStep4Capacity.tsx
/**
 * @file EnhancedStep4Capacity.tsx
 * @description Paso 4: Capacidad y Logística - VERSIÓN CORREGIDA
 */

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

import { PROVINCIAS_ESPANA } from '@/constants/provinces';

import {
  Package,
  Truck,
  MapPin,
  Clock,
  Euro,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Lock,
  Plus,
  Minus,
  Store,
  Zap
} from 'lucide-react';

export interface EnhancedCapacityData {
  productionCapacity: {
    daily: number;
  };
  deliveryOptions: string[];
  deliveryAreas: string[];
  minOrderAmount: number;
}

export interface EnhancedStep4CapacityProps {
  data: EnhancedCapacityData;
  onChange: (data: EnhancedCapacityData) => void;
}

const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Envío estándar', icon: <Truck className="w-4 h-4" />, description: '2-3 días' },
  { id: 'express', label: 'Envío exprés', icon: <Zap className="w-4 h-4" />, description: '24 horas' },
  { id: 'pickup', label: 'Recogida en local', icon: <Store className="w-4 h-4" />, description: 'Sin coste' }
];

export function EnhancedStep4Capacity({ data, onChange }: EnhancedStep4CapacityProps) {

  const hasProduction = data.productionCapacity?.daily > 0;
  const hasDeliveryOptions = data.deliveryOptions?.length > 0;
  const hasDeliveryAreas = data.deliveryAreas?.length > 0;
  const hasMinOrder = data.minOrderAmount >= 10;
  
  const totalSteps = 4;
  const completedSteps = [hasProduction, hasDeliveryOptions, hasDeliveryAreas, hasMinOrder].filter(Boolean).length;
  const progress = (completedSteps / totalSteps) * 100;
  const isComplete = hasProduction && hasDeliveryOptions && hasDeliveryAreas && hasMinOrder;

  const handleCapacityChange = (value: number) => {
    onChange({
      ...data,
      productionCapacity: { daily: value }
    });
  };

  const toggleDeliveryOption = (optionId: string) => {
    const newOptions = data.deliveryOptions?.includes(optionId)
      ? data.deliveryOptions.filter(id => id !== optionId)
      : [...(data.deliveryOptions || []), optionId];
    onChange({ ...data, deliveryOptions: newOptions });
  };

  const toggleDeliveryArea = (province: string) => {
    const normalized = province.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const newAreas = data.deliveryAreas?.includes(normalized)
      ? data.deliveryAreas.filter(p => p !== normalized)
      : [...(data.deliveryAreas || []), normalized];
    onChange({ ...data, deliveryAreas: newAreas });
  };

  return (
    <div className="space-y-8">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-origen-bosque/10 rounded-xl blur-md" />
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-origen-bosque to-origen-pradera flex items-center justify-center shadow-sm">
            <Package className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" size="sm" className="bg-white">
              <Sparkles className="w-3 h-3 mr-1.5 text-origen-bosque" />
              Paso 4 de 6
            </Badge>
            {isComplete && (
              <Badge variant="fruit" size="sm">
                <CheckCircle2 className="w-3 h-3 mr-1.5" />
                Completado
              </Badge>
            )}
          </div>
          
          <h2 className="text-xl font-semibold text-origen-bosque mb-2">
            Capacidad y logística
          </h2>
          
          <p className="text-gray-600 text-sm max-w-2xl">
            Cuéntanos cómo produces y cómo llegarán tus productos.
          </p>
        </div>
      </motion.div>

      <div className="max-w-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-origen-hoja">
            Configuración completada
          </span>
          <span className="text-xs font-semibold text-origen-menta">
            {completedSteps}/{totalSteps}
          </span>
        </div>
        <Progress 
          value={progress} 
          variant="leaf" 
          size="sm" 
          showLabel={false}
          className="bg-origen-pastel"
        />
      </div>

      <Card className="p-6 border border-gray-200 bg-white">
        <div className="space-y-5">
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-origen-bosque/10 flex items-center justify-center flex-shrink-0">
              <Package className="w-4 h-4 text-origen-bosque" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-origen-bosque mb-1">
                Capacidad de producción <span className="text-red-500">*</span>
              </h3>
              <p className="text-xs text-gray-500">
                ¿Cuántas unidades puedes producir al día?
              </p>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Producción diaria</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-origen-menta">
                  {data.productionCapacity?.daily || 0}
                </span>
                <span className="text-xs text-gray-500">unidades</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => handleCapacityChange(Math.max(0, (data.productionCapacity?.daily || 0) - 10))}
                disabled={(data.productionCapacity?.daily || 0) <= 0}
                className="h-8 w-8 rounded-lg"
              >
                <Minus className="w-3.5 h-3.5" />
              </Button>
              
              <div className="flex-1">
                <Slider
                  value={[data.productionCapacity?.daily || 0]}
                  onValueChange={(vals) => handleCapacityChange(vals[0])}
                  min={0}
                  max={500}
                  step={10}
                  variant="leaf"
                />
              </div>
              
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => handleCapacityChange((data.productionCapacity?.daily || 0) + 10)}
                disabled={(data.productionCapacity?.daily || 0) >= 500}
                className="h-8 w-8 rounded-lg"
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
            
            <div className="flex justify-between mt-2 text-[10px] text-gray-400">
              <span>Pequeña escala</span>
              <span>Media</span>
              <span>Gran escala</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 border border-gray-200 bg-white">
        <div className="space-y-4">
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-origen-bosque/10 flex items-center justify-center flex-shrink-0">
              <Truck className="w-4 h-4 text-origen-bosque" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-origen-bosque mb-1">
                Opciones de envío <span className="text-red-500">*</span>
              </h3>
              <p className="text-xs text-gray-500">
                ¿Cómo entregas tus productos?
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DELIVERY_OPTIONS.map((option) => {
              const isSelected = data.deliveryOptions?.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleDeliveryOption(option.id)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                    'focus:outline-none focus:ring-2 focus:ring-origen-menta/50',
                    isSelected
                      ? 'border-origen-menta bg-origen-menta/5'
                      : 'border-gray-200 hover:border-origen-pradera'
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    isSelected ? 'text-origen-menta' : 'text-gray-500'
                  )}>
                    {option.icon}
                  </div>
                  <span className={cn(
                    'text-sm font-medium',
                    isSelected ? 'text-origen-bosque' : 'text-gray-600'
                  )}>
                    {option.label}
                  </span>
                  <span className="text-xs text-gray-500">
                    {option.description}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-origen-menta mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      <Card className="p-6 border border-gray-200 bg-white">
        <div className="space-y-4">
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-origen-bosque/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-origen-bosque" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-origen-bosque mb-1">
                Áreas de entrega <span className="text-red-500">*</span>
              </h3>
              <p className="text-xs text-gray-500">
                ¿A qué provincias puedes enviar?
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
            {PROVINCIAS_ESPANA.slice(0, 10).map((province) => {
              const normalized = province.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
              const isSelected = data.deliveryAreas?.includes(normalized);
              return (
                <Badge
                  key={province}
                  variant={isSelected ? 'forest' : 'outline'}
                  size="md"
                  interactive
                  onClick={() => toggleDeliveryArea(province)}
                  className={cn(
                    'cursor-pointer px-3 py-1.5',
                    isSelected && 'bg-gradient-to-br from-origen-bosque to-origen-pino text-white'
                  )}
                >
                  <MapPin className="w-3 h-3 mr-1.5" />
                  {province}
                </Badge>
              );
            })}
            {PROVINCIAS_ESPANA.length > 10 && (
              <Badge variant="outline" size="md" className="bg-gray-50">
                +{PROVINCIAS_ESPANA.length - 10} más
              </Badge>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6 border border-gray-200 bg-white">
        <div className="space-y-4">
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-origen-bosque/10 flex items-center justify-center flex-shrink-0">
              <Euro className="w-4 h-4 text-origen-bosque" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-origen-bosque mb-1">
                Pedido mínimo <span className="text-red-500">*</span>
              </h3>
              <p className="text-xs text-gray-500">
                Importe mínimo por pedido en euros
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
              <Input
                type="number"
                value={data.minOrderAmount || 20}
                onChange={(e) => onChange({ ...data, minOrderAmount: parseFloat(e.target.value) || 0 })}
                min={0}
                step={5}
                className="h-11 pl-8 text-base border-gray-200 focus:border-origen-menta"
              />
            </div>
            <span className="text-sm text-gray-500">euros</span>
          </div>
          
          <p className="text-xs text-gray-500">
            Recomendado: 20-30€ para venta al público general
          </p>
        </div>
      </Card>

      <div className="flex items-center gap-4 pt-2 text-xs text-gray-500 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-origen-bosque" />
          <span>Configuración guardada</span>
        </div>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-origen-bosque" />
          <span>Puedes modificarlo después</span>
        </div>
      </div>
    </div>
  );
}

EnhancedStep4Capacity.displayName = 'EnhancedStep4Capacity';

export default EnhancedStep4Capacity;