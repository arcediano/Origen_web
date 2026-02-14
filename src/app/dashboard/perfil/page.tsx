/**
 * @page PerfilPage
 * @description Edición del perfil público del productor
 * 
 * @data-services
 * - GET /api/producer/profile - Obtener perfil actual
 * - PUT /api/producer/profile - Actualizar perfil
 * - POST /api/producer/validate - Validar campos del formulario
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Store, MapPin, Calendar, Users } from 'lucide-react';

export default function PerfilPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // @todo: PUT /api/producer/profile
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="w-full">
      {/* Cabecera de página */}
      <div className="px-6 lg:px-8 py-6 border-b border-gray-200/50 bg-white/30">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-origen-bosque">Editar perfil</h1>
            <p className="text-sm text-gray-500 mt-1">Actualiza la información de tu negocio</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            {isSaving ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6 lg:p-8 max-w-4xl">
        <Card className="p-6 bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-origen-bosque">Información básica</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Store className="w-4 h-4 text-origen-pradera" />
                  Nombre del negocio
                </label>
                <Input placeholder="Ej: Quesería Artesana Valle" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Eslogan</label>
                <Input placeholder="El sabor de la tradición" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-origen-pradera" />
                  Año de fundación
                </label>
                <Input type="number" placeholder="1985" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Users className="w-4 h-4 text-origen-pradera" />
                  Tamaño del equipo
                </label>
                <Input placeholder="Ej: 6-10 personas" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-origen-pradera" />
                  Provincia
                </label>
                <Input placeholder="Toledo" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Ciudad</label>
                <Input placeholder="Toledo" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Descripción</label>
              <Textarea placeholder="Cuéntanos tu historia..." rows={4} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}