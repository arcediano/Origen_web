// 📁 /src/components/onboarding/Step5Documents.tsx
/**
 * Paso 5: Documentación Legal - UI puro
 * Componente visual sin lógica de negocio
 */

'use client';

import { FileText, Shield, CheckCircle, AlertCircle } from 'lucide-react';

// Interfaz para datos de ejemplo (solo UI)
interface DocumentsData {
  uploaded: Array<{ id: string; name: string; status: 'pending' | 'verified' | 'rejected' }>;
  pending: string[];
}

interface Step5DocumentsProps {
  onChange: (data: DocumentsData) => void;
}

export function Step5Documents({ onChange }: Step5DocumentsProps) {
  // Datos de ejemplo para UI
  const exampleDocuments = [
    { id: '1', name: 'DNI/NIE', status: 'verified' as const },
    { id: '2', name: 'CIF/NIF Empresa', status: 'verified' as const },
    { id: '3', name: 'Licencia Municipal', status: 'pending' as const },
    { id: '4', name: 'Registro Sanitario', status: 'pending' as const },
    { id: '5', name: 'Seguro Responsabilidad', status: 'pending' as const },
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado - Diseño según manual de marca */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-origen-crema mb-4">
          <Shield className="w-6 h-6 text-origen-bosque" />
        </div>
        <h2 className="text-xl font-semibold text-origen-bosque mb-2">
          Documentación legal
        </h2>
        <p className="text-gray-600">
          Verificamos tu documentación para garantizar transparencia y seguridad en Origen.
        </p>
      </div>

      {/* Contenido del paso */}
      <p className="text-gray-700 italic text-center mb-8">
        ⚖️ Este es el paso 5 - Documentación Legal. El sistema de subida y verificación de documentos será desarrollado según los requisitos legales.
      </p>

      {/* Estado de documentos */}
      <div className="bg-origen-crema p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-origen-bosque">Estado de tus documentos</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">2/5 completados</span>
          </div>
        </div>

        {/* Lista de documentos */}
        <div className="space-y-4">
          {exampleDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-origen-bosque" />
                <div>
                  <p className="font-medium text-origen-bosque">{doc.name}</p>
                  <p className="text-sm text-gray-600">Documento requerido</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {doc.status === 'verified' && (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-600">Verificado</span>
                  </>
                )}
                {doc.status === 'pending' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-yellow-600">Pendiente</span>
                  </>
                )}
                <button className="px-3 py-1 bg-origen-menta text-white text-sm rounded hover:bg-origen-pradera">
                  Subir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Información importante */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-4 bg-origen-pastel rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-origen-bosque" />
            <h4 className="font-medium text-origen-bosque">Seguridad garantizada</h4>
          </div>
          <p className="text-sm text-gray-600">
            Tus documentos se almacenan de forma segura y solo se usan para verificación.
          </p>
        </div>
        
        <div className="p-4 bg-origen-pastel rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-origen-bosque" />
            <h4 className="font-medium text-origen-bosque">Confianza del cliente</h4>
          </div>
          <p className="text-sm text-gray-600">
            Los clientes ven el símbolo de verificación y confían más en tu perfil.
          </p>
        </div>
      </div>
    </div>
  );
}