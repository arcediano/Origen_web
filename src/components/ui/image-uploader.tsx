/**
 * @file image-uploader.tsx
 * @description Componente para subida de imágenes con guía de formato
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Image as ImageIcon, Info, Star } from "lucide-react";

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  isMain?: boolean;
  sortOrder: number;
}

export interface ImageUploaderProps {
  value: ImageFile[];
  onChange: (files: ImageFile[]) => void;
  maxFiles?: number;
  maxSize?: number; // en MB
  recommendedSize?: string;
  acceptedFormats?: string[];
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  showMainBadge?: boolean;
  seoNote?: string;
}

const ImageUploader = React.forwardRef<HTMLDivElement, ImageUploaderProps>(
  ({ 
    value = [], 
    onChange,
    maxFiles = 10,
    maxSize = 5,
    recommendedSize = "1200x1200px",
    acceptedFormats = ["jpg", "jpeg", "png", "webp"],
    label = "Imágenes del producto",
    description,
    error,
    className,
    showMainBadge = true,
    seoNote = "Las imágenes que cumplen con las recomendaciones de formato y tamaño tienen mayor probabilidad de aparecer en las primeras posiciones de búsqueda.",
  }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileSelect = (files: FileList | null) => {
      if (!files) return;

      const newFiles: ImageFile[] = [];
      const currentCount = value.length;

      for (let i = 0; i < files.length; i++) {
        if (currentCount + newFiles.length >= maxFiles) break;
        
        const file = files[i];
        
        // Validar tamaño
        if (file.size > maxSize * 1024 * 1024) continue;
        
        // Validar formato
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (!extension || !acceptedFormats.includes(extension)) continue;

        newFiles.push({
          id: Math.random().toString(36).substring(2, 11),
          file,
          preview: URL.createObjectURL(file),
          sortOrder: value.length + newFiles.length,
        });
      }

      onChange([...value, ...newFiles]);
    };

    const handleRemove = (id: string) => {
      const newFiles = value.filter(f => f.id !== id);
      // Reordenar sortOrder
      newFiles.forEach((file, index) => {
        file.sortOrder = index;
      });
      onChange(newFiles);
    };

    const handleSetMain = (id: string) => {
      const newFiles = value.map(file => ({
        ...file,
        isMain: file.id === id,
      }));
      onChange(newFiles);
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

    return (
      <div ref={ref} className={cn("w-full space-y-4", className)}>
        {/* Cabecera */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-origen-bosque">{label}</h3>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <Badge variant="outline" size="sm" className="bg-orange-50 text-orange-700 border-orange-200">
            {value.length}/{maxFiles}
          </Badge>
        </div>

        {/* Nota SEO */}
        <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-200 flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700">
            <span className="font-medium">Consejo SEO:</span> {seoNote}
          </p>
        </div>

        {/* Grid de imágenes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {value.map((image, index) => (
            <div
              key={image.id}
              className={cn(
                "relative aspect-square rounded-lg border-2 overflow-hidden group",
                image.isMain ? "border-origen-pradera ring-2 ring-origen-pradera/20" : "border-gray-200"
              )}
            >
              <img
                src={image.preview}
                alt={`Producto ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay de acciones */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {showMainBadge && !image.isMain && (
                  <button
                    onClick={() => handleSetMain(image.id)}
                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-origen-crema transition-colors"
                    title="Establecer como principal"
                  >
                    <Star className="w-4 h-4 text-gray-700" />
                  </button>
                )}
                <button
                  onClick={() => handleRemove(image.id)}
                  className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Badge de principal */}
              {image.isMain && (
                <div className="absolute top-2 left-2">
                  <Badge variant="success" size="xs" className="bg-origen-pradera text-white border-0">
                    Principal
                  </Badge>
                </div>
              )}

              {/* Badge de orden */}
              <div className="absolute bottom-2 right-2">
                <div className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}

          {/* Botón de añadir */}
          {value.length < maxFiles && (
            <button
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "aspect-square rounded-lg border-2 border-dashed transition-all",
                "flex flex-col items-center justify-center gap-2",
                isDragging
                  ? "border-origen-pradera bg-origen-pradera/5"
                  : "border-gray-200 hover:border-origen-pradera hover:bg-gray-50"
              )}
            >
              <Upload className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-500">Subir imagen</span>
            </button>
          )}
        </div>

        {/* Input oculto */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.map(f => `.${f}`).join(',')}
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />

        {/* Guía de formato */}
        <div className="p-3 bg-gray-50/50 rounded-lg text-xs text-gray-500">
          <p className="font-medium mb-1">Formatos aceptados:</p>
          <p>{acceptedFormats.join(', ').toUpperCase()} • Máx {maxSize}MB por imagen</p>
          <p className="mt-1">Tamaño recomendado: {recommendedSize}</p>
        </div>

        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

ImageUploader.displayName = "ImageUploader";

export { ImageUploader };