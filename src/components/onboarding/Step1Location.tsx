// 📁 /src/components/onboarding/Step1Location.tsx
/**
 * Paso 1: Ubicación y Región - UI puro
 * Componente visual sin lógica de negocio
 */

'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CategorySelector } from '@/components/forms/CategorySelector';
import { MapPin, Search } from 'lucide-react';
import { PRODUCER_CATEGORIES, TOURISTIC_REGIONS } from '@/constants/onboarding';

// Interfaz para datos de ejemplo (solo UI)
interface LocationData {
  address: string;
  city: string;
  province: string;
  postalCode: string;
  region: string;
  categories: string[];
}

interface Step1LocationProps {
  data: LocationData;
  onChange: (data: LocationData) => void;
}

export function Step1Location({ data, onChange }: Step1LocationProps) {
  // Función de ejemplo para UI (sin lógica real)
  const handleInputChange = (field: keyof LocationData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Encabezado - Diseño según manual de marca */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-origen-crema mb-4">
          <MapPin className="w-6 h-6 text-origen-bosque" />
        </div>
        <h2 className="text-xl font-semibold text-origen-bosque mb-2">
          ¿Dónde está la esencia de tu producto?
        </h2>
        <p className="text-gray-600">
          Tu ubicación no es solo una dirección, es parte de la historia que los clientes quieren conocer
        </p>
      </div>

      {/* Formulario - Estructura visual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda - Datos básicos */}
        <div className="space-y-4">
          {/* Dirección */}
          <div>
            <Label htmlFor="address" className="text-origen-bosque font-medium">
              Dirección completa
            </Label>
            <Input
              id="address"
              value={data.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Calle, número, piso..."
              className="mt-1"
            />
          </div>

          {/* Ciudad y Provincia */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="text-origen-bosque font-medium">
                Ciudad
              </Label>
              <Input
                id="city"
                value={data.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Ciudad"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="province" className="text-origen-bosque font-medium">
                Provincia
              </Label>
              <Select
                value={data.province}
                onValueChange={(value) => handleInputChange('province', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecciona provincia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="madrid">Madrid</SelectItem>
                  <SelectItem value="barcelona">Barcelona</SelectItem>
                  <SelectItem value="valencia">Valencia</SelectItem>
                  <SelectItem value="sevilla">Sevilla</SelectItem>
                  <SelectItem value="zaragoza">Zaragoza</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Código Postal */}
          <div>
            <Label htmlFor="postalCode" className="text-origen-bosque font-medium">
              Código Postal
            </Label>
            <Input
              id="postalCode"
              value={data.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              placeholder="00000"
              className="mt-1"
              maxLength={5}
            />
          </div>
        </div>

        {/* Columna derecha - Región y categorías */}
        <div className="space-y-6">
          {/* Selección de región turística */}
          <div>
            <Label className="text-origen-bosque font-medium mb-2 block">
              Región Turística
              <span className="text-xs text-gray-500 ml-2">
                (Opcional - Para destacar tu ubicación)
              </span>
            </Label>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar región..."
                className="pl-10"
              />
            </div>

            {/* Lista de regiones - UI de ejemplo */}
            <div className="mt-3 space-y-2 max-h-60 overflow-y-auto p-2 border rounded-md">
              {TOURISTIC_REGIONS.slice(0, 3).map(region => (
                <div
                  key={region.id}
                  className={`p-3 rounded cursor-pointer transition-all ${
                    data.region === region.id
                      ? 'bg-origen-crema border border-origen-menta'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleInputChange('region', region.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-origen-bosque">
                        {region.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {region.description}
                      </div>
                    </div>
                    {data.region === region.id && (
                      <div className="w-2 h-2 rounded-full bg-origen-menta" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categorías de producto - Usando componente reutilizable */}
          <CategorySelector
            categories={PRODUCER_CATEGORIES}
            selected={data.categories}
            onChange={(selected) => onChange({ ...data, categories: selected })}
            label="¿Qué tipo de productos ofreces?"
          />
        </div>
      </div>

      {/* Nota informativa - Diseño según marca */}
      <div className="mt-8 p-4 bg-origen-crema rounded-lg border border-origen-pradera">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-origen-bosque mt-0.5" />
          <div>
            <p className="text-sm text-origen-bosque font-medium">
              ¿Por qué preguntamos tu ubicación?
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Los clientes de Origen valoran conocer el origen exacto de los productos. 
              Una ubicación clara aumenta la confianza y ayuda a clientes locales a encontrarte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}