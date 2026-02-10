// 📁 /src/components/onboarding/Step4Capacity.tsx
/**
 * Paso 4: Capacidad y Logística - UI puro
 * Componente visual sin lógica de negocio
 */

'use client';

import { Package, Truck, Calendar, MapPin } from 'lucide-react';

// Interfaz para datos de ejemplo (solo UI)
interface CapacityData {
  productionCapacity: string;
  deliveryOptions: string[];
  deliveryAreas: string[];
  pickupAvailable: boolean;
  minOrderAmount: number;
}

interface Step4CapacityProps {
  onChange: (data: CapacityData) => void;
}

export function Step4Capacity({ onChange }: Step4CapacityProps) {
  return (
    <div className="space-y-6">
      {/* Encabezado - Diseño según manual de marca */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-origen-crema mb-4">
          <Package className="w-6 h-6 text-origen-bosque" />
        </div>
        <h2 className="text-xl font-semibold text-origen-bosque mb-2">
          Capacidad y logística
        </h2>
        <p className="text-gray-600">
          Define cómo produces y entregas para asegurar la mejor experiencia a tus clientes.
        </p>
      </div>

      {/* Contenido del paso */}
      <p className="text-gray-700 italic text-center mb-8">
        📦 Este es el paso 4 - Capacidad y Logística. Los formularios específicos serán desarrollados según los requisitos de negocio.
      </p>

      {/* Secciones principales */}
      <div className="space-y-8">
        {/* Capacidad de producción */}
        <div className="p-6 border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-origen-crema rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-origen-bosque" />
            </div>
            <div>
              <h3 className="font-medium text-origen-bosque">Capacidad de producción</h3>
              <p className="text-sm text-gray-600">Define tu volumen de producción</p>
            </div>
          </div>
          <div className="text-center py-4">
            <p className="text-gray-700">
              Selector de capacidad será implementado aquí
            </p>
          </div>
        </div>

        {/* Opciones de entrega */}
        <div className="p-6 border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-origen-crema rounded-full flex items-center justify-center">
              <Truck className="w-5 h-5 text-origen-bosque" />
            </div>
            <div>
              <h3 className="font-medium text-origen-bosque">Opciones de entrega</h3>
              <p className="text-sm text-gray-600">Cómo entregas tus productos</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Envío a domicilio', 'Recogida en punto', 'Mercados locales'].map((option, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg text-center hover:border-origen-menta transition-colors">
                <p className="font-medium text-origen-bosque">{option}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Zonas de entrega */}
        <div className="p-6 border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-origen-crema rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-origen-bosque" />
            </div>
            <div>
              <h3 className="font-medium text-origen-bosque">Zonas de entrega</h3>
              <p className="text-sm text-gray-600">Donde realizas entregas</p>
            </div>
          </div>
          <div className="text-center py-4">
            <p className="text-gray-700">
              Mapa o selector de zonas será implementado aquí
            </p>
          </div>
        </div>

        {/* Frecuencia y calendario */}
        <div className="p-6 border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-origen-crema rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-origen-bosque" />
            </div>
            <div>
              <h3 className="font-medium text-origen-bosque">Frecuencia de entrega</h3>
              <p className="text-sm text-gray-600">Cuándo realizas entregas</p>
            </div>
          </div>
          <div className="text-center py-4">
            <p className="text-gray-700">
              Calendario de disponibilidad será implementado aquí
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}