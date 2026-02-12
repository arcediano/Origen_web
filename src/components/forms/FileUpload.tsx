// 📁 /src/components/forms/FileUpload.tsx
/**
 * Componente para subida de archivos - UI puro
 * Reutilizable para múltiples formularios
 */

'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, X, FileText, Image as ImageIcon, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn, formatFileSize } from '@/lib/utils';
import { useState } from 'react';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  status?: 'pending' | 'uploading' | 'verified' | 'rejected';
  error?: string;
}

interface FileUploadProps {
  label: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // en MB
  value: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  className?: string;
  disabled?: boolean;
}

export function FileUpload({
  label,
  description,
  accept = "image/*,.pdf,.jpg,.jpeg,.png",
  multiple = false,
  maxSize = 5,
  value = [],
  onChange,
  className,
  disabled = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // Validar tamaño máximo
    const validFiles = files.filter(file => file.size <= maxSize * 1024 * 1024);
    
    // Crear objetos UploadedFile
    const newUploadedFiles: UploadedFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substring(2, 11),
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      status: 'pending',
    }));

    // Actualizar valor
    onChange(multiple ? [...value, ...newUploadedFiles] : newUploadedFiles);
    
    // Resetear input
    event.target.value = '';
  };

  const handleRemove = (id: string) => {
    onChange(value.filter(file => file.id !== id));
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
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => file.size <= maxSize * 1024 * 1024);
    
    const newUploadedFiles: UploadedFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substring(2, 11),
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      status: 'pending',
    }));

    onChange(multiple ? [...value, ...newUploadedFiles] : newUploadedFiles);
  };

  const getFileIcon = (file: UploadedFile) => {
    if (file.type?.startsWith('image/')) {
      return <ImageIcon className="w-5 h-5 text-origen-pradera" />;
    }
    return <FileText className="w-5 h-5 text-origen-bosque" />;
  };

  // Asegurar que value es un array
  const safeValue = Array.isArray(value) ? value : [];

  return (
    <div className={cn("w-full space-y-4", className)}>
      
      {/* Label y descripción */}
      {(label || description) && (
        <div className="space-y-1">
          {label && (
            <Label className="text-sm font-medium text-origen-bosque">
              {label}
            </Label>
          )}
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
      )}

      {/* Área de subida */}
      <div
        className={cn(
          "relative rounded-xl border-2 border-dashed p-6 transition-all",
          isDragging 
            ? "border-origen-menta bg-origen-menta/5" 
            : "border-gray-200 hover:border-origen-pradera hover:bg-gray-50/50",
          disabled && "opacity-50 pointer-events-none bg-gray-50",
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled}
          className="hidden"
        />
        
        <label 
          htmlFor="file-upload" 
          className={cn(
            "flex flex-col items-center text-center cursor-pointer",
            disabled && "cursor-not-allowed"
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all",
            isDragging
              ? "bg-origen-menta text-white scale-110"
              : "bg-origen-crema text-origen-bosque"
          )}>
            <Upload className="w-6 h-6" />
          </div>
          
          <p className="text-sm font-medium text-origen-bosque mb-1">
            Arrastra archivos o haz clic para subir
          </p>
          
          <p className="text-xs text-gray-500 mb-3">
            Tamaño máximo: {maxSize}MB • {accept.replace(/\./g, '').toUpperCase()}
          </p>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            className="border-origen-pradera text-origen-pradera hover:bg-origen-pradera/10"
          >
            Seleccionar archivos
          </Button>
        </label>
      </div>

      {/* Archivos subidos */}
      {safeValue.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-origen-bosque">
              Archivos subidos ({safeValue.length})
            </p>
          </div>
          
          <div className="space-y-2">
            {safeValue.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-origen-pradera transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="flex-shrink-0">
                    {getFileIcon(file)}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-origen-bosque truncate">
                        {file.name}
                      </p>
                      {file.status === 'verified' && (
                        <Badge variant="fruit" size="xs">
                          <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
                          Verificado
                        </Badge>
                      )}
                      {file.status === 'pending' && (
                        <Badge variant="seed" size="xs">
                          Pendiente
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </span>
                      {file.error && (
                        <span className="text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {file.error}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleRemove(file.id)}
                  className="h-8 w-8 text-gray-400 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}