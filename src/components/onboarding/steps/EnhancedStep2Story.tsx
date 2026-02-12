// 📁 /src/components/onboarding/steps/EnhancedStep2Story.tsx
/**
 * @file EnhancedStep2Story.tsx
 * @description Paso 2: Historia y Valores - VERSIÓN CORREGIDA CON FILEUPLOAD
 */

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileUpload, type UploadedFile } from '@/components/forms/FileUpload';

import {
  BookOpen,
  Building,
  Users,
  Heart,
  Target,
  Globe,
  Camera,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Clock,
  Lock,
  Quote
} from 'lucide-react';

export interface EnhancedStoryData {
  businessName: string;
  tagline: string;
  description: string;
  values: string[];
  teamSize: string;
  mission: string;
  vision: string;
  photos: UploadedFile[];
}

export interface EnhancedStep2StoryProps {
  data: EnhancedStoryData;
  onChange: (data: EnhancedStoryData) => void;
}

const CORE_VALUES = [
  { id: 'sostenibilidad', name: 'Sostenibilidad', icon: '🌱' },
  { id: 'calidad', name: 'Calidad', icon: '⭐' },
  { id: 'tradicion', name: 'Tradición', icon: '🏛️' },
  { id: 'innovacion', name: 'Innovación', icon: '💡' },
  { id: 'local', name: 'Local', icon: '📍' },
  { id: 'artesanal', name: 'Artesanal', icon: '👐' },
  { id: 'ecologico', name: 'Ecológico', icon: '🌿' },
  { id: 'familiar', name: 'Familiar', icon: '👨‍👩‍👧‍👦' }
];

const TEAM_SIZES = [
  { value: 'solo', label: 'Emprendedor individual' },
  { value: 'small', label: '2-5 personas' },
  { value: 'medium', label: '6-20 personas' },
  { value: 'large', label: '+20 personas' },
  { value: 'coop', label: 'Cooperativa' }
];

export function EnhancedStep2Story({ data, onChange }: EnhancedStep2StoryProps) {
  const [charCount, setCharCount] = React.useState(data.description?.length || 0);

  const hasBusinessName = Boolean(data.businessName?.trim());
  const hasDescription = data.description?.length >= 50;
  const hasTeamSize = Boolean(data.teamSize);
  const hasValues = data.values?.length > 0;
  
  const totalSteps = 4;
  const completedSteps = [hasBusinessName, hasDescription, hasTeamSize, hasValues].filter(Boolean).length;
  const progress = (completedSteps / totalSteps) * 100;
  const isComplete = hasBusinessName && hasDescription && hasTeamSize && hasValues;

  const handleInputChange = (field: keyof EnhancedStoryData, value: any) => {
    if (field === 'description') {
      setCharCount(value.length);
    }
    onChange({ ...data, [field]: value });
  };
  
  const toggleValue = (valueId: string) => {
    const newValues = data.values.includes(valueId)
      ? data.values.filter(id => id !== valueId)
      : [...data.values, valueId];
    handleInputChange('values', newValues);
  };

  return (
    <div className="space-y-8">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-origen-hoja/10 rounded-xl blur-md" />
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-origen-hoja to-origen-pino flex items-center justify-center shadow-sm">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" size="sm" className="bg-white">
              <Sparkles className="w-3 h-3 mr-1.5 text-origen-hoja" />
              Paso 2 de 6
            </Badge>
            {isComplete && (
              <Badge variant="fruit" size="sm">
                <CheckCircle2 className="w-3 h-3 mr-1.5" />
                Completado
              </Badge>
            )}
          </div>
          
          <h2 className="text-xl font-semibold text-origen-bosque mb-2">
            Cuéntanos tu historia
          </h2>
          
          <p className="text-gray-600 text-sm max-w-2xl">
            Los compradores conectan con personas, no solo con productos.
          </p>
        </div>
      </motion.div>

      <div className="max-w-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-origen-hoja">
            Información de marca
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
              <Building className="w-4 h-4 text-origen-hoja" />
              Nombre del negocio <span className="text-red-500">*</span>
            </label>
            <Input
              value={data.businessName || ''}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              placeholder="Ej: Huerta Orgánica del Valle"
              className="h-11 text-base border-gray-200 focus:border-origen-menta"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-origen-bosque flex items-center gap-2">
              <Quote className="w-4 h-4 text-origen-hoja" />
              Slogan o frase descriptiva
            </label>
            <Input
              value={data.tagline || ''}
              onChange={(e) => handleInputChange('tagline', e.target.value)}
              placeholder="Una frase que capture la esencia de tu marca"
              className="h-11 text-base border-gray-200 focus:border-origen-menta"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-origen-bosque">
                Tamaño del equipo <span className="text-red-500">*</span>
              </label>
              <Select
                value={data.teamSize || ''}
                onValueChange={(value) => handleInputChange('teamSize', value)}
              >
                <SelectTrigger className="h-11 text-base border-gray-200">
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  {TEAM_SIZES.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 border border-gray-200 bg-white">
        <div className="space-y-3">
          <label className="text-sm font-medium text-origen-bosque">
            Descripción breve <span className="text-red-500">*</span>
          </label>
          <Textarea
            value={data.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe tu negocio en 1-2 párrafos. ¿Qué ofreces? ¿Qué te hace único?"
            className="min-h-[120px] text-base border-gray-200 focus:border-origen-menta"
            maxLength={300}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {charCount >= 50 ? (
                <Badge variant="fruit" size="xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Válida
                </Badge>
              ) : (
                <Badge variant="seed" size="xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Mínimo 50 caracteres
                </Badge>
              )}
            </div>
            <span className={cn(
              'text-xs',
              charCount > 250 ? 'text-amber-600' : 'text-gray-500'
            )}>
              {charCount}/300
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 border border-gray-200 bg-white">
        <div className="space-y-4">
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-origen-hoja/10 flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 text-origen-hoja" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-origen-bosque mb-1">
                Valores <span className="text-red-500">*</span>
              </h3>
              <p className="text-xs text-gray-500">
                Selecciona los que mejor te representen
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {CORE_VALUES.map((value) => {
              const isSelected = data.values.includes(value.id);
              return (
                <Badge
                  key={value.id}
                  variant={isSelected ? 'forest' : 'outline'}
                  size="md"
                  interactive
                  onClick={() => toggleValue(value.id)}
                  className={cn(
                    'cursor-pointer px-4 py-2',
                    isSelected && 'bg-gradient-to-br from-origen-bosque to-origen-pino text-white'
                  )}
                >
                  <span className="mr-1.5">{value.icon}</span>
                  {value.name}
                  {isSelected && (
                    <CheckCircle2 className="w-3.5 h-3.5 ml-1.5" />
                  )}
                </Badge>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5 border border-gray-200 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-origen-hoja" />
            <h3 className="text-sm font-medium text-origen-bosque">Misión</h3>
            <span className="text-xs text-gray-400 ml-auto">Opcional</span>
          </div>
          <Textarea
            value={data.mission || ''}
            onChange={(e) => handleInputChange('mission', e.target.value)}
            placeholder="¿Cuál es tu propósito?"
            className="min-h-[100px] text-sm border-gray-200"
          />
        </Card>
        
        <Card className="p-5 border border-gray-200 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-origen-hoja" />
            <h3 className="text-sm font-medium text-origen-bosque">Visión</h3>
            <span className="text-xs text-gray-400 ml-auto">Opcional</span>
          </div>
          <Textarea
            value={data.vision || ''}
            onChange={(e) => handleInputChange('vision', e.target.value)}
            placeholder="¿Hacia dónde quieres ir?"
            className="min-h-[100px] text-sm border-gray-200"
          />
        </Card>
      </div>

      <Card className="p-6 border border-gray-200 bg-white">
        <div className="space-y-4">
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-origen-hoja/10 flex items-center justify-center flex-shrink-0">
              <Camera className="w-4 h-4 text-origen-hoja" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-origen-bosque mb-1">
                Fotos de tu equipo o proceso
                <span className="ml-2 text-xs font-normal text-gray-500">(Opcional)</span>
              </h3>
              <p className="text-xs text-gray-500">
                Las imágenes generan confianza
              </p>
            </div>
          </div>
          
          <FileUpload
            label=""
            description="Arrastra imágenes o haz clic para subir (máx. 5MB)"
            accept="image/*"
            multiple={true}
            maxSize={5}
            value={data.photos || []}
            onChange={(files) => handleInputChange('photos', files)}
          />
        </div>
      </Card>

      <div className="flex items-center gap-4 pt-2 text-xs text-gray-500 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-origen-hoja" />
          <span>Información verificable</span>
        </div>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-origen-hoja" />
          <span>Tiempo estimado: 4-5 min</span>
        </div>
      </div>
    </div>
  );
}

EnhancedStep2Story.displayName = 'EnhancedStep2Story';

export default EnhancedStep2Story;