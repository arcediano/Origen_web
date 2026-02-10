// 📁 /src/components/onboarding/Step2Story.tsx
/**
 * Paso 2: Historia y Valores - UI puro
 * Componente visual sin lógica de negocio
 */

'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Heart, Target, Star } from 'lucide-react';

// Interfaz para datos de ejemplo (solo UI)
interface StoryData {
  businessName: string;
  description: string;
  values: string[];
  history: string;
  certifications: string[];
}

interface Step2StoryProps {
  data: StoryData;
  onChange: (data: StoryData) => void;
}

export function Step2Story({ data, onChange }: Step2StoryProps) {
  // Función de ejemplo para UI (sin lógica real)
  const handleInputChange = (field: keyof StoryData, value: string | string[]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Encabezado - Diseño según manual de marca */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-origen-crema mb-4">
          <BookOpen className="w-6 h-6 text-origen-bosque" />
        </div>
        <h2 className="text-xl font-semibold text-origen-bosque mb-2">
          Cuenta tu historia
        </h2>
        <p className="text-gray-600">
          Cada producto tiene una historia. Comparte la tuya para conectar con clientes que valoran el origen.
        </p>
      </div>

      {/* Contenido del paso */}
      <p className="text-gray-700 italic text-center mb-8">
        💡 Este es el paso 2 - Historia y Valores. El contenido específico será desarrollado según los requisitos de diseño.
      </p>

      {/* Placeholder para el formulario real */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre del negocio */}
        <div className="md:col-span-2">
          <Label htmlFor="businessName" className="text-origen-bosque font-medium">
            Nombre de tu negocio/proyecto
          </Label>
          <Input
            id="businessName"
            value={data.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            placeholder="Ej: Granja Orgánica del Valle"
            className="mt-1"
          />
        </div>

        {/* Descripción breve */}
        <div className="md:col-span-2">
          <Label htmlFor="description" className="text-origen-bosque font-medium">
            Descripción breve
          </Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe tu negocio en 1-2 frases..."
            className="mt-1 min-h-[100px]"
          />
        </div>

        {/* Sección de valores (placeholder) */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-origen-menta" />
            <Label className="text-origen-bosque font-medium">
              Valores de tu negocio
            </Label>
          </div>
          <div className="p-4 bg-origen-crema rounded-lg border border-dashed border-gray-300 text-center">
            <p className="text-gray-600 mb-2">
              Selector de valores será implementado aquí
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-origen-pastel text-origen-bosque rounded-full text-sm">
                Sostenibilidad
              </span>
              <span className="px-3 py-1 bg-origen-pastel text-origen-bosque rounded-full text-sm">
                Calidad
              </span>
              <span className="px-3 py-1 bg-origen-pastel text-origen-bosque rounded-full text-sm">
                Tradición
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Información de ejemplo */}
      <div className="mt-8 p-4 bg-origen-pastel rounded-lg border border-origen-menta">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-origen-bosque mt-0.5" />
          <div>
            <p className="text-sm text-origen-bosque font-medium">
              ¿Por qué tu historia importa?
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Los clientes de Origen buscan conexión auténtica con los productores. 
              Tu historia hace que tu producto sea único y memorable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}