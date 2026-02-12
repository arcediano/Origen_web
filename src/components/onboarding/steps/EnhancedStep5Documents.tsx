// 📁 /src/components/onboarding/steps/EnhancedStep5Documents.tsx
/**
 * @file EnhancedStep5Documents.tsx
 * @description Paso 5: Documentación - VERSIÓN CORREGIDA CON FILEUPLOAD
 */

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileUpload, type UploadedFile } from '@/components/forms/FileUpload';

import {
  FileText,
  Shield,
  CheckCircle2,
  Sparkles,
  Clock,
  Lock,
  FileSignature,
  FileBadge,
  Leaf,
  Sprout,
  Beef,
  ChefHat,
  Flower,
  Wine,
  Package,
  AlertCircle,
  Info
} from 'lucide-react';

export interface EnhancedStep5DocumentsData {
  documents: UploadedFile[];
  producerCategory: string;
  verificationStatus?: 'pending' | 'partial' | 'complete';
}

export interface EnhancedStep5DocumentsProps {
  data: EnhancedStep5DocumentsData;
  onChange: (data: EnhancedStep5DocumentsData) => void;
}

const REQUIRED_DOCUMENTS = [
  {
    id: 'cif_nie',
    name: 'CIF / NIF',
    description: 'Documento de identificación fiscal',
    icon: <FileSignature className="w-5 h-5" />
  },
  {
    id: 'seguro_responsabilidad',
    name: 'Seguro RC',
    description: 'Responsabilidad civil (mín. 150.000€)',
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 'manipulador_alimentos',
    name: 'Manipulador de alimentos',
    description: 'Certificado oficial',
    icon: <FileBadge className="w-5 h-5" />
  }
];

const OPTIONAL_DOCUMENTS = [
  {
    id: 'certificacion_ecologica',
    name: 'Certificación ecológica',
    description: 'CCAE, CAAE u otros sellos',
    icon: <Leaf className="w-5 h-5" />
  },
  {
    id: 'denominacion_origen',
    name: 'Denominación de origen',
    description: 'DOP, IGP, DOCa',
    icon: <FileBadge className="w-5 h-5" />
  }
];

export function EnhancedStep5Documents({ data, onChange }: EnhancedStep5DocumentsProps) {

  const requiredIds = REQUIRED_DOCUMENTS.map(d => d.id);
  const uploadedRequired = data.documents?.filter(
    doc => requiredIds.includes(doc.id) && doc.status === 'verified'
  ) || [];
  
  const progress = (uploadedRequired.length / REQUIRED_DOCUMENTS.length) * 100;
  const isComplete = uploadedRequired.length === REQUIRED_DOCUMENTS.length;

  const handleUpload = async (files: UploadedFile[]) => {
    const newDocuments = files.map(file => ({
      ...file,
      id: file.id,
      status: 'pending' as const
    }));
    
    onChange({
      ...data,
      documents: [...(data.documents || []), ...newDocuments]
    });
  };

  const handleDelete = (id: string) => {
    onChange({
      ...data,
      documents: data.documents?.filter(doc => doc.id !== id) || []
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
          <div className="absolute inset-0 bg-origen-oscuro/10 rounded-xl blur-md" />
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-origen-oscuro to-origen-bosque flex items-center justify-center shadow-sm">
            <FileText className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" size="sm" className="bg-white">
              <Sparkles className="w-3 h-3 mr-1.5 text-origen-oscuro" />
              Paso 5 de 6
            </Badge>
            {isComplete && (
              <Badge variant="fruit" size="sm">
                <CheckCircle2 className="w-3 h-3 mr-1.5" />
                Completado
              </Badge>
            )}
          </div>
          
          <h2 className="text-xl font-semibold text-origen-bosque mb-2">
            Documentación
          </h2>
          
          <p className="text-gray-600 text-sm max-w-2xl">
            Sube los documentos requeridos para verificar tu negocio.
          </p>
        </div>
      </motion.div>

      <div className="max-w-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-origen-hoja">
            Documentos verificados
          </span>
          <span className="text-xs font-semibold text-origen-menta">
            {uploadedRequired.length}/{REQUIRED_DOCUMENTS.length}
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
          
          <div className="flex items-start gap-3">
            <div className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center',
              data.producerCategory === 'agricola' && 'bg-origen-pradera/10 text-origen-pradera',
              data.producerCategory === 'ganadero' && 'bg-origen-hoja/10 text-origen-hoja',
              data.producerCategory === 'artesano' && 'bg-origen-pino/10 text-origen-pino',
              data.producerCategory === 'apicultor' && 'bg-origen-menta/10 text-origen-menta',
              data.producerCategory === 'viticultor' && 'bg-origen-bosque/10 text-origen-bosque'
            )}>
              {data.producerCategory === 'agricola' && <Sprout className="w-4 h-4" />}
              {data.producerCategory === 'ganadero' && <Beef className="w-4 h-4" />}
              {data.producerCategory === 'artesano' && <ChefHat className="w-4 h-4" />}
              {data.producerCategory === 'apicultor' && <Flower className="w-4 h-4" />}
              {data.producerCategory === 'viticultor' && <Wine className="w-4 h-4" />}
              {!['agricola', 'ganadero', 'artesano', 'apicultor', 'viticultor'].includes(data.producerCategory) && 
                <Package className="w-4 h-4" />
              }
            </div>
            <div>
              <p className="text-sm font-medium text-origen-bosque">
                Requisitos para {data.producerCategory === 'agricola' && 'productores agrícolas'}
                {data.producerCategory === 'ganadero' && 'ganaderos'}
                {data.producerCategory === 'artesano' && 'productores artesanales'}
                {data.producerCategory === 'apicultor' && 'apicultores'}
                {data.producerCategory === 'viticultor' && 'viticultores'}
                {!['agricola', 'ganadero', 'artesano', 'apicultor', 'viticultor'].includes(data.producerCategory) && 
                  'tu categoría'
                }
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {REQUIRED_DOCUMENTS.length} documentos obligatorios
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 border border-gray-200 bg-white">
        <div className="space-y-4">
          
          <h3 className="text-sm font-medium text-origen-bosque">
            Documentos obligatorios
          </h3>
          
          <div className="space-y-3">
            {REQUIRED_DOCUMENTS.map((doc) => {
              const uploaded = data.documents?.find(d => d.id === doc.id);
              return (
                <div key={doc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-8 h-8 rounded-lg bg-origen-oscuro/10 flex items-center justify-center">
                    {doc.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-origen-bosque">{doc.name}</p>
                      {uploaded?.status === 'verified' && (
                        <Badge variant="fruit" size="xs">Verificado</Badge>
                      )}
                      {uploaded?.status === 'pending' && (
                        <Badge variant="seed" size="xs">Pendiente</Badge>
                      )}
                      {!uploaded && (
                        <Badge variant="outline" size="xs">Pendiente</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{doc.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <Card className="p-6 border border-gray-200 bg-white">
        <div className="space-y-4">
          
          <h3 className="text-sm font-medium text-origen-bosque">
            Documentos opcionales
            <span className="ml-2 text-xs font-normal text-gray-500">Mejoran tu perfil</span>
          </h3>
          
          <div className="space-y-3">
            {OPTIONAL_DOCUMENTS.map((doc) => {
              const uploaded = data.documents?.find(d => d.id === doc.id);
              return (
                <div key={doc.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                    {doc.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-origen-bosque">{doc.name}</p>
                      {uploaded && (
                        <Badge variant="outline" size="xs">
                          <CheckCircle2 className="w-2.5 h-2.5 mr-1 text-origen-pradera" />
                          Subido
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{doc.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <Card className="p-6 border border-gray-200 bg-white">
        <FileUpload
          label="Subir documentos"
          description="PDF, JPG o PNG • Máx 5MB por archivo"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple={true}
          maxSize={5}
          value={data.documents || []}
          onChange={handleUpload}
        />
      </Card>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-origen-pradera/5 to-origen-crema/30 rounded-xl p-5 border border-origen-pradera/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-origen-pradera/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-origen-pradera" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-origen-bosque">
                Documentación completada
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Revisaremos tus documentos en menos de 24h
              </p>
            </div>
            <Badge variant="outline" size="sm" className="bg-white">
              <Clock className="w-3 h-3 mr-1.5" />
              En revisión
            </Badge>
          </div>
        </motion.div>
      )}

      {!isComplete && (
        <div className="flex items-center gap-2 p-4 bg-blue-50/30 rounded-lg border border-blue-100">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <p className="text-xs text-blue-700">
            ¿Necesitas ayuda? Contacta a{' '}
            <a href="mailto:soporte@origen.es" className="font-medium underline underline-offset-2">
              soporte@origen.es
            </a>
          </p>
        </div>
      )}

      <div className="flex items-center gap-4 pt-2 text-xs text-gray-500 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-origen-oscuro" />
          <span>Cifrado SSL 256-bit</span>
        </div>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span>Verificación 24-48h</span>
      </div>
    </div>
  );
}

EnhancedStep5Documents.displayName = 'EnhancedStep5Documents';

export default EnhancedStep5Documents;