// 📁 /src/components/onboarding/steps/EnhancedStep1Location.tsx
/**
 * @file EnhancedStep1Location.tsx
 * @description Paso 1: Ubicación - VERSIÓN CORREGIDA CON FILEUPLOAD
 */

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileUpload, type UploadedFile } from '@/components/forms/FileUpload';

import { PROVINCIAS_ESPANA } from '@/constants/provinces';
import { PRODUCER_CATEGORIES } from '@/constants/categories';

import {
  MapPin,
  Building,
  Camera,
  CheckCircle2,
  AlertCircle,
  Leaf,
  Sparkles,
  Home,
  Info,
  Lock,
  Clock
} from 'lucide-react';

export interface EnhancedLocationData {
  address: string;
  city: string;
  province: string;
  postalCode: string;
  categories: string[];
  locationImages: UploadedFile[];
}

export interface EnhancedStep1LocationProps {
  data: EnhancedLocationData;
  onChange: (data: EnhancedLocationData) => void;
}

export function EnhancedStep1Location({ data, onChange }: EnhancedStep1LocationProps) {
  
  const hasBasicInfo = Boolean(
    data.address?.trim() && 
    data.city?.trim() && 
    data.province && 
    data.postalCode?.trim()
  );
  
  const hasCategories = data.categories?.length > 0;
  
  const totalSteps = 2;
  const completedSteps = [hasBasicInfo, hasCategories].filter(Boolean).length;
  const progress = (completedSteps / totalSteps) * 100;
  const isComplete = hasBasicInfo && hasCategories;

  const handleInputChange = (field: keyof EnhancedLocationData, value: any) => {
    onChange({ ...data, [field]: value });
  };
  
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    handleInputChange('postalCode', value);
  };

  return (
    <div className="space-y-8">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-origen-pradera/10 rounded-xl blur-md" />
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-origen-pradera to-origen-hoja flex items-center justify-center shadow-sm">
            <MapPin className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" size="sm" className="bg-white">
              <Sparkles className="w-3 h-3 mr-1.5 text-origen-pradera" />
              Paso 1 de 6
            </Badge>
            {isComplete && (
              <Badge variant="fruit" size="sm">
                <CheckCircle2 className="w-3 h-3 mr-1.5" />
                Completado
              </Badge>
            )}
          </div>
          
          <h2 className="text-xl font-semibold text-origen-bosque mb-2">
            ¿Dónde se encuentra tu negocio?
          </h2>
          
          <p className="text-gray-600 text-sm max-w-2xl">
            Esta información ayuda a los clientes a encontrarte y genera confianza.
          </p>
        </div>
      </motion.div>

      <div className="max-w-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-origen-hoja">
            Información básica
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
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-origen-bosque flex items-center gap-2">
              <Home className="w-4 h-4 text-origen-pradera" />
              Dirección completa <span className="text-red-500">*</span>
            </label>
            <Input
              value={data.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Calle, número, finca, local..."
              className="h-11 text-base border-gray-200 focus:border-origen-menta focus:ring-2 focus:ring-origen-menta/20"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-origen-bosque">
                Ciudad <span className="text-red-500">*</span>
              </label>
              <Input
                value={data.city || ''}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Ej: Madrid"
                className="h-11 text-base border-gray-200 focus:border-origen-menta"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-origen-bosque">
                Código Postal <span className="text-red-500">*</span>
              </label>
              <Input
                value={data.postalCode || ''}
                onChange={handlePostalCodeChange}
                placeholder="28001"
                maxLength={5}
                className="h-11 text-base border-gray-200 focus:border-origen-menta font-mono"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-origen-bosque">
              Provincia <span className="text-red-500">*</span>
            </label>
            <Select
              value={data.province || ''}
              onValueChange={(value) => handleInputChange('province', value)}
            >
              <SelectTrigger className="h-11 text-base border-gray-200 focus:border-origen-menta">
                <SelectValue placeholder="Selecciona provincia" />
              </SelectTrigger>
              <SelectContent>
                {PROVINCIAS_ESPANA.map((province) => (
                  <SelectItem 
                    key={province} 
                    value={province.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                  >
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6 border border-gray-200 bg-white">
        <div className="space-y-4">
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-origen-pradera/10 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-4 h-4 text-origen-pradera" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-origen-bosque mb-1">
                Categorías de producto <span className="text-red-500">*</span>
              </h3>
              <p className="text-xs text-gray-500">
                Selecciona tu especialización principal
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRODUCER_CATEGORIES.map((category) => {
              const isSelected = data.categories?.includes(category.id);
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    const newCategories = isSelected
                      ? data.categories.filter(id => id !== category.id)
                      : [...(data.categories || []), category.id];
                    handleInputChange('categories', newCategories);
                  }}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border-2 transition-all',
                    'focus:outline-none focus:ring-2 focus:ring-origen-menta/50 focus:ring-offset-2',
                    isSelected
                      ? 'border-origen-menta bg-origen-menta/5'
                      : 'border-gray-200 hover:border-origen-pradera bg-white'
                  )}
                >
                  <span className="text-xl">{category.icon}</span>
                  <div className="flex-1 text-left">
                    <p className={cn(
                      'text-sm font-medium',
                      isSelected ? 'text-origen-bosque' : 'text-gray-700'
                    )}>
                      {category.name}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {category.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-origen-menta flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {!hasCategories && data.categories?.length === 0 && (
            <div className="flex items-center gap-2 p-3 bg-amber-50/50 rounded-lg border border-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <p className="text-xs text-amber-700">
                Selecciona al menos una categoría para continuar
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6 border border-gray-200 bg-white">
        <div className="space-y-4">
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-origen-pradera/10 flex items-center justify-center flex-shrink-0">
              <Camera className="w-4 h-4 text-origen-pradera" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-origen-bosque mb-1">
                Fotos del entorno
                <span className="ml-2 text-xs font-normal text-gray-500">(Opcional)</span>
              </h3>
              <p className="text-xs text-gray-500">
                Muestra tu huerta, taller o establecimiento
              </p>
            </div>
          </div>
          
          <FileUpload
            label=""
            description="Arrastra imágenes o haz clic para subir (máx. 5MB)"
            accept="image/*"
            multiple={true}
            maxSize={5}
            value={data.locationImages || []}
            onChange={(files) => handleInputChange('locationImages', files)}
          />
        </div>
      </Card>

      <div className="flex items-center gap-4 pt-2 text-xs text-gray-500 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-origen-pradera" />
          <span>Datos protegidos</span>
        </div>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-origen-pradera" />
          <span>Verificación 24h</span>
        </div>
      </div>
    </div>
  );
}

EnhancedStep1Location.displayName = 'EnhancedStep1Location';

export default EnhancedStep1Location;