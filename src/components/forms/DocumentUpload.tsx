// 📁 /src/components/forms/DocumentUpload.tsx
/**
 * @file DocumentUpload.tsx
 * @description Subida de documentos - VERSIÓN SIMPLIFICADA Y ELEGANTE
 * @version 4.0.0 - Diseño premium, minimalista, proporciones justas
 * 
 * CARACTERÍSTICAS:
 * ✅ Eliminado: cabeceras complejas, categorías, progresos redundantes
 * ✅ Simplificado: una sola vista, cards limpias, feedback sutil
 * ✅ Premium: espaciado generoso, tipografía clara, micro-interacciones
 * ✅ Coherente: exactamente el mismo estilo que SimpleRegistration
 */

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn, formatFileSize } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

import {
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  Shield,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileSearch,
  Loader2,
  Lock,
  ArrowRight
} from 'lucide-react';

// ============================================================================
// TIPOS - MÍNIMOS, ESENCIALES
// ============================================================================

export type DocumentStatus = 'pending' | 'uploading' | 'verified' | 'rejected';

export interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  status: DocumentStatus;
  error?: string;
}

export interface DocumentUploadProps {
  /** Documentos subidos actualmente */
  documents: UploadedDocument[];
  /** Callback al subir archivos */
  onUpload: (files: File[]) => Promise<void>;
  /** Callback al eliminar documento */
  onDelete: (id: string) => void;
  /** Etiqueta principal */
  label?: string;
  /** Descripción corta */
  description?: string;
  /** Mensaje de error general */
  error?: string;
  /** Clase CSS adicional */
  className?: string;
}

// ============================================================================
// COMPONENTE PRINCIPAL - SIMPLIFICADO, ELEGANTE
// ============================================================================

export function DocumentUpload({
  documents,
  onUpload,
  onDelete,
  label = 'Documentación',
  description = 'Sube los documentos requeridos',
  error,
  className
}: DocumentUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    setIsUploading(true);
    await onUpload(files);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;
    
    setIsUploading(true);
    await onUpload(files);
    setIsUploading(false);
  };

  // Estado de completado
  const hasAllDocuments = documents.length > 0 && documents.every(doc => doc.status === 'verified');
  const pendingCount = documents.filter(doc => doc.status === 'pending').length;

  return (
    <div className={cn('w-full space-y-6', className)}>
      
      {/* ================================================================
          HEADER SIMPLIFICADO - Solo label y descripción
      ================================================================ */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-origen-bosque">
            {label}
            {documents.length > 0 && (
              <span className="ml-2 text-sm font-normal text-origen-hoja">
                ({documents.length} {documents.length === 1 ? 'archivo' : 'archivos'})
              </span>
            )}
          </h3>
          {hasAllDocuments && (
            <Badge variant="fruit" size="sm" className="gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Verificado
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>

      {/* ================================================================
          ÁREA DE SUBIDA - Limpia, generosa, con feedback sutil
      ================================================================ */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'relative rounded-xl border-2 border-dashed p-8',
          'transition-all duration-200',
          isDragging 
            ? 'border-origen-menta bg-origen-menta/5' 
            : 'border-gray-200 hover:border-origen-pradera hover:bg-gray-50/50',
          isUploading && 'pointer-events-none opacity-70'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          accept=".pdf,.jpg,.jpeg,.png"
        />

        <div className="flex flex-col items-center text-center">
          <div className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center mb-4',
            'bg-gradient-to-br transition-all duration-300',
            isDragging
              ? 'from-origen-menta to-origen-pradera text-white scale-110'
              : 'from-origen-crema to-white text-origen-bosque border border-gray-200'
          )}>
            {isUploading ? (
              <Loader2 className="w-8 h-8 animate-spin text-origen-menta" />
            ) : (
              <Upload className="w-8 h-8" />
            )}
          </div>

          <div className="space-y-2">
            <p className="text-base font-medium text-origen-bosque">
              {isUploading ? 'Subiendo archivos...' : 'Arrastra archivos o haz clic'}
            </p>
            <p className="text-sm text-gray-500">
              PDF, JPG o PNG • Máx 5MB por archivo
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="mt-6 border-origen-pradera text-origen-pradera hover:bg-origen-pradera/10"
          >
            {isUploading ? (
              <>Subiendo...</>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Seleccionar archivos
              </>
            )}
          </Button>
        </div>

        {isDragging && (
          <div className="absolute inset-0 rounded-xl bg-origen-menta/5 pointer-events-none" />
        )}
      </motion.div>

      {/* ================================================================
          LISTA DE DOCUMENTOS - Cards limpias, una por una
      ================================================================ */}
      {documents.length > 0 && (
        <div className="space-y-3">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                'flex items-center justify-between p-4 rounded-xl',
                'bg-white border transition-all',
                doc.status === 'verified' && 'border-origen-pradera/30 bg-origen-crema/20',
                doc.status === 'rejected' && 'border-red-200 bg-red-50/30',
                doc.status === 'pending' && 'border-gray-200 hover:border-origen-pradera'
              )}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Icono según tipo */}
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                  doc.type.startsWith('image/') 
                    ? 'bg-origen-pradera/10 text-origen-pradera'
                    : 'bg-origen-bosque/10 text-origen-bosque'
                )}>
                  {doc.type.startsWith('image/') ? (
                    <ImageIcon className="w-5 h-5" />
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                </div>

                {/* Información del documento */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-origen-bosque truncate">
                      {doc.name}
                    </p>
                    {doc.status === 'verified' && (
                      <Badge variant="fruit" size="xs" className="flex-shrink-0">
                        <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
                        Verificado
                      </Badge>
                    )}
                    {doc.status === 'pending' && (
                      <Badge variant="seed" size="xs" className="flex-shrink-0">
                        <Clock className="w-2.5 h-2.5 mr-1" />
                        Pendiente
                      </Badge>
                    )}
                    {doc.status === 'rejected' && (
                      <Badge variant="error" size="xs" className="flex-shrink-0">
                        <AlertCircle className="w-2.5 h-2.5 mr-1" />
                        Rechazado
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatFileSize(doc.size)}
                  </p>
                  {doc.error && (
                    <p className="text-xs text-red-600 mt-1">
                      {doc.error}
                    </p>
                  )}
                </div>
              </div>

              {/* Botón eliminar */}
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => onDelete(doc.id)}
                className="ml-2 text-gray-400 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {/* ================================================================
          MENSAJE DE ERROR GENERAL
      ================================================================ */}
      {error && (
        <Alert variant="error" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* ================================================================
          FOOTER DE SEGURIDAD - Sutil, elegante
      ================================================================ */}
      <div className="flex items-center gap-3 pt-2 text-xs text-gray-500 border-t border-gray-100">
        <Lock className="w-3.5 h-3.5 text-origen-pradera" />
        <span>Cifrado SSL • Verificación en 24-48h</span>
        {pendingCount > 0 && (
          <>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="text-origen-hoja">{pendingCount} pendiente{pendingCount !== 1 ? 's' : ''}</span>
          </>
        )}
      </div>
    </div>
  );
}

DocumentUpload.displayName = 'DocumentUpload';

export default DocumentUpload;