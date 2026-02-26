/**
 * @file document-uploader.tsx
 * @description Uploader de documentos para certificaciones - VERSIÓN PREMIUM
 * 
 * @features
 * - Upload de documentos PDF e imágenes
 * - Vista previa de archivos
 * - Validación de tamaño y formato
 * - Indicador de carga
 * - Estado de verificación
 * 
 * @version 1.0.0
 * @author Equipo de Producto Origen
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  X, 
  FileText, 
  File, 
  Image, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Eye,
  Download,
  Trash2,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// TIPOS
// ============================================================================

export interface DocumentFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  file?: File;
  uploadedAt?: Date;
  status?: 'uploading' | 'uploaded' | 'error';
  error?: string;
  verified?: boolean;
}

export interface DocumentUploaderProps {
  /** Array de documentos */
  value: DocumentFile[];
  /** Función de cambio */
  onChange: (files: DocumentFile[]) => void;
  /** Número máximo de archivos */
  maxFiles?: number;
  /** Tamaño máximo en MB */
  maxSize?: number;
  /** Formatos aceptados */
  acceptedFormats?: string[];
  /** Texto de la etiqueta */
  label?: string;
  /** Descripción */
  description?: string;
  /** Mensaje de error */
  error?: string;
  /** Clase CSS */
  className?: string;
  /** Mostrar verificación */
  showVerification?: boolean;
  /** Estado de carga */
  uploading?: boolean;
  /** Tooltip informativo */
  tooltip?: string;
  /** Función de verificación */
  onVerify?: (file: DocumentFile) => Promise<boolean>;
}

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

const InfoTooltip = ({ text }: { text: string }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <HelpCircle className="h-3.5 w-3.5 text-gray-400 cursor-help transition-colors hover:text-origen-pradera" />
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 rounded-lg bg-origen-oscuro text-white text-xs shadow-lg z-50 pointer-events-none"
          >
            {text}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-origen-oscuro rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (type: string) => {
  if (type.includes('pdf')) return <FileText className="h-5 w-5" />;
  if (type.includes('image')) return <Image className="h-5 w-5" />;
  return <File className="h-5 w-5" />;
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function DocumentUploader({
  value = [],
  onChange,
  maxFiles = 5,
  maxSize = 10,
  acceptedFormats = ['pdf', 'jpg', 'jpeg', 'png'],
  label = "Documentos",
  description,
  error,
  className,
  showVerification = true,
  uploading = false,
  tooltip,
  onVerify
}: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState<Record<string, number>>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || uploading) return;

    const fileArray = Array.from(files);
    
    // Validar límite de archivos
    if (value.length + fileArray.length > maxFiles) {
      alert(`Solo puedes subir un máximo de ${maxFiles} documentos`);
      return;
    }

    const validFiles: DocumentFile[] = [];

    for (const file of fileArray) {
      // Validar tamaño
      if (file.size > maxSize * 1024 * 1024) {
        alert(`El archivo ${file.name} supera el tamaño máximo de ${maxSize}MB`);
        continue;
      }

      // Validar formato
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!extension || !acceptedFormats.includes(extension)) {
        alert(`Formato no aceptado: ${extension}. Formatos permitidos: ${acceptedFormats.join(', ')}`);
        continue;
      }

      // Crear objeto URL para preview si es imagen
      let url;
      if (file.type.includes('image')) {
        url = URL.createObjectURL(file);
      }

      const newFile: DocumentFile = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        file,
        url,
        status: 'uploading',
      };

      validFiles.push(newFile);

      // Simular progreso de carga
      setUploadProgress(prev => ({ ...prev, [newFile.id]: 0 }));
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(r => setTimeout(r, 50));
        setUploadProgress(prev => ({ ...prev, [newFile.id]: i }));
      }

      newFile.status = 'uploaded';
      newFile.uploadedAt = new Date();
    }

    onChange([...value, ...validFiles]);

    // Limpiar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (id: string) => {
    const fileToRemove = value.find(f => f.id === id);
    if (fileToRemove?.url && fileToRemove.type.includes('image')) {
      URL.revokeObjectURL(fileToRemove.url);
    }
    
    onChange(value.filter(f => f.id !== id));
  };

  const handleVerify = async (file: DocumentFile) => {
    if (!onVerify) return;

    const isValid = await onVerify(file);
    if (isValid) {
      const updated = value.map(f =>
        f.id === file.id ? { ...f, verified: true } : f
      );
      onChange(updated);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-origen-pradera" />
          <h3 className="text-sm font-medium text-origen-bosque">{label}</h3>
          {tooltip && <InfoTooltip text={tooltip} />}
        </div>
        
        <Badge variant="seed" size="sm">
          {value.length}/{maxFiles}
        </Badge>
      </div>

      {/* Descripción */}
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      {/* Área de upload */}
      <div
        className={cn(
          "relative rounded-lg border-2 border-dashed transition-all p-6",
          isDragging 
            ? "border-origen-pradera bg-origen-pradera/5" 
            : "border-gray-200 hover:border-origen-pradera/50 hover:bg-gray-50",
          uploading && "opacity-50 pointer-events-none"
        )}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.map(f => `.${f}`).join(',')}
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={uploading}
        />
        
        <div className="text-center">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-origen-bosque mb-1">
            Arrastra o haz clic para subir
          </p>
          <p className="text-xs text-gray-500">
            {acceptedFormats.map(f => f.toUpperCase()).join(', ')} • Máx {maxSize}MB
          </p>
        </div>
      </div>

      {/* Lista de documentos */}
      {value.length > 0 && (
        <div className="space-y-2">
          <AnimatePresence>
            {value.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 group/doc"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-origen-crema flex items-center justify-center flex-shrink-0">
                    {getFileIcon(doc.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-origen-bosque truncate">
                        {doc.name}
                      </p>
                      {doc.verified && (
                        <Badge variant="success" size="xs">
                          <CheckCircle className="w-2.5 h-2.5 mr-1" />
                          Verificado
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(doc.size)}
                    </p>
                  </div>

                  {/* Progreso de carga */}
                  {uploadProgress[doc.id] !== undefined && uploadProgress[doc.id] < 100 && (
                    <div className="w-20">
                      <Progress value={uploadProgress[doc.id]} max={100} className="h-1" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 ml-2">
                  {doc.url && doc.type.includes('image') && (
                    <button
                      onClick={() => window.open(doc.url, '_blank')}
                      className="p-1.5 rounded-md text-gray-400 hover:text-origen-pradera hover:bg-origen-pradera/10 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  
                  {showVerification && !doc.verified && doc.status === 'uploaded' && onVerify && (
                    <button
                      onClick={() => handleVerify(doc)}
                      className="p-1.5 rounded-md text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                      title="Verificar documento"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleRemove(doc.id)}
                    className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="flex items-center gap-2 text-xs text-red-600">
          <AlertCircle className="h-3 w-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}