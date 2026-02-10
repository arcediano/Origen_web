// 📁 /src/components/onboarding/Step3Visual.tsx
/**
 * Paso 3: Perfil Visual - UI puro
 * Componente visual sin lógica de negocio
 */

'use client';

import { Image, Upload, Camera, Palette } from 'lucide-react';

// Interfaz para datos de ejemplo (solo UI)
interface VisualData {
  logo: File | null;
  banner: File | null;
  productImages: File[];
  farmImages: File[];
}

interface Step3VisualProps {
  onChange: (data: VisualData) => void;
}

export function Step3Visual({ onChange }: Step3VisualProps) {
  return (
    <div className="space-y-6">
      {/* Encabezado - Diseño según manual de marca */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-origen-crema mb-4">
          <Palette className="w-6 h-6 text-origen-bosque" />
        </div>
        <h2 className="text-xl font-semibold text-origen-bosque mb-2">
          Tu identidad visual
        </h2>
        <p className="text-gray-600">
          Una imagen vale más que mil palabras. Muestra tu trabajo con fotos auténticas.
        </p>
      </div>

      {/* Contenido del paso */}
      <p className="text-gray-700 italic text-center mb-8">
        🎨 Este es el paso 3 - Perfil Visual. Los componentes de subida de imágenes serán desarrollados según los requisitos de diseño.
      </p>

      {/* Grid de secciones visuales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo */}
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-origen-menta transition-colors">
          <div className="w-16 h-16 mx-auto bg-origen-crema rounded-full flex items-center justify-center mb-4">
            <Image className="w-8 h-8 text-origen-bosque" />
          </div>
          <h3 className="font-medium text-origen-bosque mb-2">Logo</h3>
          <p className="text-sm text-gray-600 mb-4">
            Sube el logo de tu marca o proyecto
          </p>
          <button className="px-4 py-2 bg-origen-crema text-origen-bosque rounded-lg text-sm font-medium hover:bg-origen-pastel">
            Subir logo
          </button>
        </div>

        {/* Banner/Portada */}
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-origen-menta transition-colors">
          <div className="w-16 h-16 mx-auto bg-origen-crema rounded-full flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-origen-bosque" />
          </div>
          <h3 className="font-medium text-origen-bosque mb-2">Imagen de portada</h3>
          <p className="text-sm text-gray-600 mb-4">
            Una foto que represente tu negocio
          </p>
          <button className="px-4 py-2 bg-origen-crema text-origen-bosque rounded-lg text-sm font-medium hover:bg-origen-pastel">
            Subir imagen
          </button>
        </div>

        {/* Productos */}
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-origen-menta transition-colors">
          <div className="w-16 h-16 mx-auto bg-origen-crema rounded-full flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-origen-bosque" />
          </div>
          <h3 className="font-medium text-origen-bosque mb-2">Productos</h3>
          <p className="text-sm text-gray-600 mb-4">
            Fotos de tus productos (3-5 imágenes)
          </p>
          <button className="px-4 py-2 bg-origen-crema text-origen-bosque rounded-lg text-sm font-medium hover:bg-origen-pastel">
            Subir productos
          </button>
        </div>

        {/* Instalaciones */}
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-origen-menta transition-colors">
          <div className="w-16 h-16 mx-auto bg-origen-crema rounded-full flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-origen-bosque" />
          </div>
          <h3 className="font-medium text-origen-bosque mb-2">Instalaciones</h3>
          <p className="text-sm text-gray-600 mb-4">
            Fotos de tu granja/taller/instalaciones
          </p>
          <button className="px-4 py-2 bg-origen-crema text-origen-bosque rounded-lg text-sm font-medium hover:bg-origen-pastel">
            Subir fotos
          </button>
        </div>
      </div>

      {/* Recomendaciones visuales */}
      <div className="mt-8 p-4 bg-origen-pastel rounded-lg border border-origen-menta">
        <div className="flex items-start gap-3">
          <Camera className="w-5 h-5 text-origen-bosque mt-0.5" />
          <div>
            <p className="text-sm text-origen-bosque font-medium">
              Recomendaciones para tus fotos
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>• Usa luz natural y fondos simples</li>
              <li>• Enfócate en la calidad y textura de los productos</li>
              <li>• Muestra el proceso y las personas detrás del producto</li>
              <li>• Evita filtros excesivos, busca autenticidad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}