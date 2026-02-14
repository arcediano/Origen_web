/**
 * @page Gestión de Certificaciones
 * @version 1.0.0
 */

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Shield, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function CertificacionesPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/perfil">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-origen-bosque">Certificaciones</h1>
            <p className="text-sm text-gray-500">Gestiona tus sellos de calidad</p>
          </div>
        </div>
        <Button className="bg-origen-bosque hover:bg-origen-pino">
          <Plus className="w-4 h-4 mr-2" />
          Añadir certificación
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Agricultura Ecológica</p>
                <p className="text-xs text-green-600">CCAE · Verificado</p>
              </div>
            </div>
            <Badge variant="success" className="bg-green-100 text-green-700">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verificado
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-amber-600" />
              <div>
                <p className="font-medium text-amber-800">DOP Queso Manchego</p>
                <p className="text-xs text-amber-600">Consejo Regulador · Pendiente</p>
              </div>
            </div>
            <Badge variant="warning" className="bg-amber-100 text-amber-700">
              <Clock className="w-3 h-3 mr-1" />
              Pendiente
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}