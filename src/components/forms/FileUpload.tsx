// 📁 /src/components/forms/FileUpload.tsx
/**
 * Componente para subida de archivos - UI puro
 * Reutilizable para múltiples formularios
 */

'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface UploadedFile {
  id: string;
  name: string;
  size?: number;
  type?: string;
  previewUrl?: string;
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
  accept = "image/*,.pdf,.doc,.docx",
  multiple = false,
  maxSize = 10, // 10MB por defecto
  value,
  onChange,
  className,
  disabled = false,
}: FileUploadProps) {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // Validar tamaño máximo
    const validFiles = files.filter(file => file.size <= maxSize * 1024 * 1024);
    
    // Crear objetos UploadedFile
    const newUploadedFiles: UploadedFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));

    // Actualizar valor
    onChange(multiple ? [...value, ...newUploadedFiles] : newUploadedFiles);
    
    // Resetear input
    event.target.value = '';
  };

  const handleRemove = (id: string) => {
    onChange(value.filter(file => file.id !== id));
  };

  const getFileIcon = (file: UploadedFile) => {
    if (file.type?.startsWith('image/')) {
      return <ImageIcon className="w-5 h-5 text-origen-pradera" />;
    }
    return <FileText className="w-5 h-5 text-origen-bosque" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <Label className="text-origen-bosque font-medium block mb-2">
          {label}
        </Label>
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}
      </div>

      {/* Área de subida */}
      <div className={cn(
        "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors",
        disabled ? "bg-gray-50" : "hover:border-origen-menta hover:bg-origen-crema cursor-pointer"
      )}>
        <input
          type="file"
          id="file-upload"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled}
          className="hidden"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-origen-crema flex items-center justify-center">
              <Upload className="w-6 h-6 text-origen-bosque" />
            </div>
            <div>
              <p className="font-medium text-origen-bosque mb-1">
                Arrastra archivos o haz clic para subir
              </p>
              <p className="text-sm text-gray-600">
                Tamaño máximo: {maxSize}MB • Formatos aceptados: {accept}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              disabled={disabled}
            >
              Seleccionar archivos
            </Button>
          </div>
        </label>
      </div>

      {/* Archivos subidos */}
      {value.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-origen-bosque">
            Archivos subidos ({value.length})
          </p>
          <div className="space-y-2">
            {value.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-origen-crema rounded-lg border border-origen-pradera"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(file)}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-origen-bosque truncate">
                      {file.name}
                    </p>
                    {file.size && (
                      <p className="text-xs text-gray-600">
                        {formatFileSize(file.size)}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(file.id)}
                  className="h-8 w-8"
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