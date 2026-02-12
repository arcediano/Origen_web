// 📁 /src/components/onboarding/steps/EnhancedStep3Visual.tsx
/**
 * @file EnhancedStep3Visual.tsx
 * @description Paso 3: Perfil Visual - VERSIÓN CORREGIDA CON FILEUPLOAD
 */

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { FileUpload, type UploadedFile } from '@/components/forms/FileUpload';

import {
  Camera,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Lock,
  Clock,
  X,
  Heart
} from 'lucide-react';

export interface EnhancedVisualData {
  logo: UploadedFile | null;
  banner: UploadedFile | null;
  productImages: UploadedFile[];
}

export interface EnhancedStep3VisualProps {
  data: EnhancedVisualData;
  onChange: (data: EnhancedVisualData) => void;
}

export function EnhancedStep3Visual({ data, onChange }: EnhancedStep3VisualProps) {

  const hasLogo = Boolean(data.logo);
  const hasBanner = Boolean(data.banner);
  const hasProductImages = data.productImages?.length > 0;
  
  const totalSteps = 3;
  const completedSteps = [hasLogo, hasBanner, hasProductImages].filter(Boolean).length;
  const progress = (completedSteps / totalSteps) * 100;
  const isComplete = hasLogo && hasProductImages;

  const handleDeleteLogo = () => {
    onChange({ ...data, logo: null });
  };

  const handleDeleteBanner = () => {
    onChange({ ...data, banner: null });
  };

  const handleDeleteProductImage = (id: string) => {
    onChange({ 
      ...data, 
      productImages: data.productImages.filter(img => img.id !== id) 
    });
  };

  return (
    <div className="space-y-8">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-origen-pino/10 rounded-xl blur-md" />
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-origen-pino to-origen-bosque flex items-center justify-center shadow-sm">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" size="sm" className="bg-white">
              <Sparkles className="w-3 h-3 mr-1.5 text-origen-pino" />
              Paso 3 de 6
            </Badge>
            {isComplete && (
              <Badge variant="fruit" size="sm">
                <CheckCircle2 className="w-3 h-3 mr-1.5" />
                Completado
              </Badge>
            )}
          </div>
          
          <h2 className="text-xl font-semibold text-origen-bosque mb-2">
            Perfil visual
          </h2>
          
          <p className="text-gray-600 text-sm max-w-2xl">
            Las imágenes generan confianza. Un perfil completo multiplica las visitas.
          </p>
        </div>
      </motion.div>

      <div className="max-w-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-origen-hoja">
            Imágenes subidas
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
        <div className="space-y-4">
          
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-origen-pino/10 flex items-center justify-center flex-shrink-0">
                <ImageIcon className="w-4 h-4 text-origen-pino" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-origen-bosque mb-1">
                  Logo de tu negocio
                  <span className="ml-2 text-xs font-normal text-gray-500">Recomendado</span>
                </h3>
                <p className="text-xs text-gray-500">
                  PNG, JPG o SVG • Máx 2MB • Fondo transparente ideal
                </p>
              </div>
            </div>
            {hasLogo && (
              <Badge variant="fruit" size="xs">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Subido
              </Badge>
            )}
          </div>
          
          {data.logo ? (
            <div className="flex items-center gap-4 p-4 bg-origen-crema/20 rounded-xl border border-origen-pradera/30">
              <div className="w-16 h-16 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                <div className="w-12 h-12 bg-gradient-to-br from-origen-pradera/20 to-origen-hoja/20 rounded" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-origen-bosque truncate">
                  {data.logo.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {(data.logo.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleDeleteLogo}
                className="text-gray-400 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <FileUpload
              label=""
              description="PNG, JPG o SVG • Máx 2MB"
              accept="image/*,.svg"
              multiple={false}
              maxSize={2}
              value={[]}
              onChange={async (files) => {
                if (files.length > 0) {
                  onChange({ ...data, logo: files[0] });
                }
              }}
            />
          )}
        </div>
      </Card>

      <Card className="p-6 border border-gray-200 bg-white">
        <div className="space-y-4">
          
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-origen-pino/10 flex items-center justify-center flex-shrink-0">
                <Camera className="w-4 h-4 text-origen-pino" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-origen-bosque mb-1">
                  Imagen de cabecera
                  <span className="ml-2 text-xs font-normal text-gray-500">Opcional</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Recomendado: 1200x400px • JPG o PNG
                </p>
              </div>
            </div>
            {hasBanner && (
              <Badge variant="outline" size="xs">
                <CheckCircle2 className="w-3 h-3 mr-1 text-origen-pradera" />
                Subido
              </Badge>
            )}
          </div>
          
          {data.banner ? (
            <div className="flex items-center gap-4 p-4 bg-origen-crema/20 rounded-xl border border-gray-200">
              <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-origen-bosque truncate">
                  {data.banner.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {(data.banner.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleDeleteBanner}
                className="text-gray-400 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <FileUpload
              label=""
              description="Recomendado: 1200x400px • JPG o PNG • Máx 5MB"
              accept="image/*"
              multiple={false}
              maxSize={5}
              value={[]}
              onChange={async (files) => {
                if (files.length > 0) {
                  onChange({ ...data, banner: files[0] });
                }
              }}
            />
          )}
        </div>
      </Card>

      <Card className="p-6 border border-gray-200 bg-white">
        <div className="space-y-4">
          
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-origen-pino/10 flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-origen-pino" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-origen-bosque mb-1">
                  Fotos de tus productos
                  <span className="ml-2 text-xs font-normal text-gray-500">Mínimo 1</span>
                </h3>
                <p className="text-xs text-gray-500">
                  JPG o PNG • Máx 5MB • La primera será la principal
                </p>
              </div>
            </div>
            {hasProductImages && (
              <Badge variant="fruit" size="xs">
                {data.productImages.length} {data.productImages.length === 1 ? 'foto' : 'fotos'}
              </Badge>
            )}
          </div>
          
          {data.productImages?.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
              {data.productImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative aspect-square rounded-lg border-2 overflow-hidden group"
                >
                  <div className="w-full h-full bg-gradient-to-br from-origen-crema to-gray-100 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  {index === 0 && (
                    <div className="absolute top-1 left-1">
                      <Badge variant="fruit" size="xs" className="text-[10px]">
                        Principal
                      </Badge>
                    </div>
                  )}
                  <button
                    onClick={() => handleDeleteProductImage(image.id)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <FileUpload
            label=""
            description="Arrastra imágenes o haz clic para añadir (máx. 5MB)"
            accept="image/*"
            multiple={true}
            maxSize={5}
            value={data.productImages || []}
            onChange={(files) => onChange({ ...data, productImages: files })}
          />
          
          {!hasProductImages && (
            <div className="flex items-center gap-2 p-3 bg-amber-50/50 rounded-lg border border-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <p className="text-xs text-amber-700">
                Necesitas al menos una foto de producto para continuar
              </p>
            </div>
          )}
        </div>
      </Card>

      <div className="flex items-center gap-4 pt-2 text-xs text-gray-500 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-origen-pino" />
          <span>Imágenes seguras</span>
        </div>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-origen-pino" />
          <span>Tiempo estimado: 3-4 min</span>
        </div>
      </div>
    </div>
  );
}

EnhancedStep3Visual.displayName = 'EnhancedStep3Visual';

export default EnhancedStep3Visual;