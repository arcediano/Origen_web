/**
 * Componente de carga
 * @component Loading
 */

export function Loading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-origen-crema border-t-origen-menta rounded-full animate-spin" />
        <p className="text-sm text-gray-600">Cargando...</p>
      </div>
    </div>
  );
}
