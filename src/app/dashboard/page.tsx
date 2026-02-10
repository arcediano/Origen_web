/**
 * Dashboard principal del vendedor
 * @route /dashboard
 */

import { StatusBanner } from '@/components/dashboard/StatusBanner';

export default function DashboardPage() {
  // TODO: Obtener datos del vendedor desde la sesión/base de datos
  const mockSeller = {
    status: 'active' as const,
    businessName: 'Huerta de María',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-origen-bosque mb-6">
        Bienvenido, {mockSeller.businessName}
      </h1>
      
      <StatusBanner status={mockSeller.status} />
      
      {/* Dashboard content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Ventas del Mes</h3>
          <p className="text-3xl font-bold text-origen-bosque">1.234€</p>
          <p className="text-sm text-green-600 mt-2">+12% vs mes anterior</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Pedidos Activos</h3>
          <p className="text-3xl font-bold text-origen-bosque">8</p>
          <p className="text-sm text-gray-600 mt-2">3 pendientes de enviar</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Productos Publicados</h3>
          <p className="text-3xl font-bold text-origen-bosque">24</p>
          <p className="text-sm text-gray-600 mt-2">5 con stock bajo</p>
        </div>
      </div>
      
      {/* Más contenido del dashboard */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-origen-bosque mb-4">Pedidos Recientes</h2>
        <div className="text-gray-600">
          <p>Aquí se mostrarán los pedidos más recientes...</p>
        </div>
      </div>
    </div>
  );
}
