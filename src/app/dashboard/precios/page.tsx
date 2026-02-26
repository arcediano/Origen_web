/**
 * @page PreciosPage
 * @description Gestión global de precios y promociones para todos los productos
 * 
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CurrencyInput } from '@/components/ui/currency-input';
import { PercentageInput } from '@/components/ui/percentage-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

import {
  DollarSign,
  Percent,
  Tag,
  Gift,
  TrendingUp,
  TrendingDown,
  Package,
  Search,
  Filter,
  ArrowUpDown,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Copy,
  Calendar,
  Clock,
  Zap,
  Sparkles,
  Award,
  CheckCircle,
  AlertCircle,
  Download,
  Printer,
  ChevronRight
} from 'lucide-react';

// ============================================================================
// TIPOS
// ============================================================================

interface PriceTier {
  id: string;
  minQuantity: number;
  maxQuantity?: number;
  type: 'percentage' | 'fixed' | 'bundle';
  value?: number;
  buyQuantity?: number;
  payQuantity?: number;
  label: string;
  savings?: number;
}

interface ProductPrice {
  id: string;
  name: string;
  sku: string;
  category: string;
  basePrice: number;
  comparePrice?: number;
  cost?: number;
  margin: number;
  priceTiers: PriceTier[];
  status: 'active' | 'inactive' | 'promotion';
  promotion?: {
    type: string;
    value: number;
    endDate?: string;
  };
  lastUpdated: string;
}

// ============================================================================
// DATOS DE EJEMPLO
// ============================================================================

const MOCK_PRICING: ProductPrice[] = [
  {
    id: 'prod-001',
    name: 'Queso Curado Artesanal D.O. 12 meses',
    sku: 'QUESO-CURADO-012',
    category: 'Quesos',
    basePrice: 28.50,
    comparePrice: 34.90,
    cost: 14.20,
    margin: 48.2,
    priceTiers: [
      { id: 't1', minQuantity: 2, type: 'percentage', value: 5, label: '5% dto', savings: 1.42 },
      { id: 't2', minQuantity: 5, type: 'percentage', value: 10, label: '10% dto', savings: 2.85 },
      { id: 't3', minQuantity: 10, type: 'percentage', value: 15, label: '15% dto', savings: 4.27 },
    ],
    status: 'active',
    lastUpdated: '2024-03-10',
  },
  {
    id: 'prod-002',
    name: 'Queso Fresco de Cabra 500g',
    sku: 'QUESO-FRESCO-023',
    category: 'Quesos',
    basePrice: 12.90,
    comparePrice: 14.50,
    cost: 6.20,
    margin: 51.9,
    priceTiers: [],
    status: 'promotion',
    promotion: {
      type: 'percentage',
      value: 15,
      endDate: '2024-04-15',
    },
    lastUpdated: '2024-03-14',
  },
  {
    id: 'prod-003',
    name: 'AOVE Ecológico Arbequina 500ml',
    sku: 'ACEITE-ARBEQUINA-001',
    category: 'Aceites',
    basePrice: 16.90,
    comparePrice: 19.90,
    cost: 8.50,
    margin: 49.7,
    priceTiers: [
      { id: 't4', minQuantity: 3, type: 'percentage', value: 10, label: '10% dto', savings: 1.69 },
    ],
    status: 'active',
    lastUpdated: '2024-03-12',
  },
  {
    id: 'prod-004',
    name: 'Vino Tinto Crianza Ribera 75cl',
    sku: 'VINO-CRIANZA-456',
    category: 'Vinos',
    basePrice: 18.50,
    comparePrice: 22.00,
    cost: 9.80,
    margin: 47.0,
    priceTiers: [],
    status: 'inactive',
    lastUpdated: '2024-03-13',
  },
  {
    id: 'prod-005',
    name: 'Embutido Chorizo Ibérico',
    sku: 'EMB-IBERICO-789',
    category: 'Embutidos',
    basePrice: 22.50,
    comparePrice: 25.90,
    cost: 11.80,
    margin: 47.6,
    priceTiers: [
      { id: 't5', minQuantity: 2, type: 'percentage', value: 5, label: '5% dto', savings: 1.12 },
    ],
    status: 'promotion',
    promotion: {
      type: 'bundle',
      value: 20,
      endDate: '2024-04-30',
    },
    lastUpdated: '2024-03-15',
  },
];

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

const StatusBadge = ({ status }: { status: ProductPrice['status'] }) => {
  const config = {
    active: { 
      label: 'Activo', 
      icon: <CheckCircle className="h-3 w-3" />,
      classes: "bg-green-50 text-green-700 border border-green-200"
    },
    inactive: { 
      label: 'Inactivo', 
      icon: <Clock className="h-3 w-3" />,
      classes: "bg-gray-50 text-gray-700 border border-gray-200"
    },
    promotion: { 
      label: 'Promoción', 
      icon: <Zap className="h-3 w-3" />,
      classes: "bg-origen-pastel text-origen-hoja border-origen-pradera/30"
    },
  };
  
  const { label, icon, classes } = config[status];
  
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", classes)}>
      {icon}
      {label}
    </span>
  );
};

const IconBadge = ({ icon, children, variant = "default" }: any) => {
  const variants: Record<string, string> = {
    default: "bg-origen-pradera/10 text-origen-bosque border-origen-pradera/30",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    leaf: "bg-origen-pastel text-origen-hoja border-origen-pradera/30",
    info: "bg-blue-50 text-blue-700 border-blue-200",
  };
  return (
    <span className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm", variants[variant])}>
      <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      {children}
    </span>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function PreciosPage() {
  const [pricing] = useState(MOCK_PRICING);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [priceValue, setPriceValue] = useState<number>(0);
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<'percentage' | 'fixed' | 'none'>('none');
  const [bulkValue, setBulkValue] = useState<number>(0);

  const categories = Array.from(new Set(pricing.map(p => p.category)));

  const filteredPricing = pricing.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    totalProducts: pricing.length,
    avgPrice: (pricing.reduce((sum, item) => sum + item.basePrice, 0) / pricing.length).toFixed(2),
    avgMargin: (pricing.reduce((sum, item) => sum + item.margin, 0) / pricing.length).toFixed(1),
    promotions: pricing.filter(p => p.status === 'promotion').length,
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredPricing.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredPricing.map(p => p.id));
    }
  };

  const handleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(p => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-white to-origen-crema"
    >
      {/* Elementos decorativos */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-origen-pradera/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-origen-hoja/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* ===== CABECERA ===== */}
      <div className="px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-origen-bosque">Precios y Promociones</h1>
            <p className="text-sm text-gray-500 mt-1">Gestiona precios y ofertas de todos tus productos</p>
          </div>
          <div className="flex items-center gap-2">
            <IconBadge icon={<DollarSign className="h-4 w-4" />} variant="leaf">
              {stats.totalProducts} productos
            </IconBadge>
            <IconBadge icon={<Percent className="h-4 w-4" />} variant="info">
              Margen medio {stats.avgMargin}%
            </IconBadge>
            {stats.promotions > 0 && (
              <IconBadge icon={<Zap className="h-4 w-4" />} variant="success">
                {stats.promotions} promociones
              </IconBadge>
            )}
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card variant="elevated" hoverEffect="organic" className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-origen-pradera/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-origen-pradera" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Precio medio</p>
                <p className="text-xl font-bold text-origen-bosque">{stats.avgPrice}€</p>
              </div>
            </div>
          </Card>
          <Card variant="elevated" hoverEffect="organic" className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-origen-menta/10 flex items-center justify-center">
                <Percent className="w-5 h-5 text-origen-menta" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Margen medio</p>
                <p className="text-xl font-bold text-origen-bosque">{stats.avgMargin}%</p>
              </div>
            </div>
          </Card>
          <Card variant="elevated" hoverEffect="organic" className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-origen-hoja/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-origen-hoja" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Ofertas activas</p>
                <p className="text-xl font-bold text-origen-bosque">{stats.promotions}</p>
              </div>
            </div>
          </Card>
          <Card variant="elevated" hoverEffect="organic" className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Con descuento</p>
                <p className="text-xl font-bold text-origen-bosque">
                  {pricing.filter(p => p.priceTiers.length > 0 || p.promotion).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filtros y acciones masivas */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por nombre o SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 rounded-xl border-gray-200"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px] h-10 rounded-xl border-gray-200">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px] h-10 rounded-xl border-gray-200">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
              <SelectItem value="promotion">Promoción</SelectItem>
            </SelectContent>
          </Select>
          
          {selectedProducts.length > 0 && (
            <Button 
              variant="outline" 
              className="h-10 rounded-xl border-origen-pradera text-origen-pradera"
              onClick={() => setShowBulkEdit(true)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar {selectedProducts.length} productos
            </Button>
          )}
        </div>
      </div>

      {/* ===== TABLA DE PRECIOS ===== */}
      <div className="px-6 lg:px-8 py-4">
        <Card variant="elevated" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-origen-crema/50 border-b border-gray-200">
                <tr>
                  <th className="w-10 p-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredPricing.length && filteredPricing.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-origen-pradera focus:ring-origen-pradera"
                    />
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500">Producto</th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500">SKU</th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500">Estado</th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500">Precio base</th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500">PVP ref.</th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500">Coste</th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500">Margen</th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500">Ofertas</th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPricing.map(item => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-origen-crema/30 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(item.id)}
                        onChange={() => handleSelectProduct(item.id)}
                        className="rounded border-gray-300 text-origen-pradera focus:ring-origen-pradera"
                      />
                    </td>
                    <td className="p-4">
                      <Link href={`/dashboard/products/${item.id}`} className="font-medium text-origen-bosque hover:text-origen-pradera">
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{item.sku}</td>
                    <td className="p-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="p-4">
                      {editingPrice === item.id ? (
                        <CurrencyInput
                          value={priceValue}
                          onChange={setPriceValue}
                          className="w-24 h-8 text-sm"
                        />
                      ) : (
                        <span className="font-medium text-origen-bosque">{item.basePrice.toFixed(2)}€</span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-gray-400 line-through">
                      {item.comparePrice?.toFixed(2)}€
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {item.cost?.toFixed(2)}€
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "text-sm font-medium",
                        item.margin >= 50 ? "text-green-600" :
                        item.margin >= 30 ? "text-origen-hoja" :
                        "text-amber-600"
                      )}>
                        {item.margin}%
                      </span>
                    </td>
                    <td className="p-4">
                      {item.priceTiers.length > 0 && (
                        <Badge variant="leaf" size="sm">
                          {item.priceTiers.length} escalones
                        </Badge>
                      )}
                      {item.promotion && (
                        <Badge variant="success" size="sm" className="ml-1">
                          <Zap className="w-3 h-3 mr-1" />
                          Promo
                        </Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {editingPrice === item.id ? (
                          <>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="w-8 h-8 text-green-600"
                              onClick={() => setEditingPrice(null)}
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="w-8 h-8 text-red-600"
                              onClick={() => setEditingPrice(null)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="w-8 h-8"
                            onClick={() => {
                              setEditingPrice(item.id);
                              setPriceValue(item.basePrice);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                        <Link href={`/dashboard/products/${item.id}`}>
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {filteredPricing.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No hay productos</h3>
            <p className="text-sm text-gray-500">No se encontraron productos con los filtros aplicados</p>
          </div>
        )}
      </div>

      {/* Diálogo de edición masiva */}
      <AlertDialog open={showBulkEdit} onOpenChange={setShowBulkEdit}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-origen-pradera" />
              Edición masiva de precios
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4 mt-4">
                <p className="text-sm text-gray-600">
                  Productos seleccionados: <span className="font-medium text-origen-bosque">{selectedProducts.length}</span>
                </p>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Tipo de ajuste</p>
                  <div className="flex gap-2">
                    <Button
                      variant={bulkAction === 'percentage' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setBulkAction('percentage')}
                      className={cn(
                        "flex-1",
                        bulkAction === 'percentage' ? "bg-origen-bosque hover:bg-origen-pino" : ""
                      )}
                    >
                      <Percent className="w-4 h-4 mr-2" />
                      Porcentaje
                    </Button>
                    <Button
                      variant={bulkAction === 'fixed' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setBulkAction('fixed')}
                      className={cn(
                        "flex-1",
                        bulkAction === 'fixed' ? "bg-origen-bosque hover:bg-origen-pino" : ""
                      )}
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Cantidad fija
                    </Button>
                  </div>
                </div>

                {bulkAction !== 'none' && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      {bulkAction === 'percentage' ? 'Porcentaje de ajuste' : 'Cantidad a aplicar (€)'}
                    </p>
                    {bulkAction === 'percentage' ? (
                      <PercentageInput
                        value={bulkValue}
                        onChange={setBulkValue}
                        className="h-10"
                        placeholder="Ej: 10"
                      />
                    ) : (
                      <CurrencyInput
                        value={bulkValue}
                        onChange={setBulkValue}
                        className="h-10"
                        placeholder="Ej: 2.50"
                      />
                    )}
                  </div>
                )}

                <div className="p-3 bg-origen-crema/30 rounded-lg">
                  <p className="text-xs text-gray-600">
                    <span className="font-medium">Acción:</span>{' '}
                    {bulkAction === 'percentage' && `Aplicar ${bulkValue}% ${bulkValue >= 0 ? 'de incremento' : 'de descuento'}`}
                    {bulkAction === 'fixed' && `${bulkValue >= 0 ? 'Añadir' : 'Restar'} ${Math.abs(bulkValue).toFixed(2)}€ al precio`}
                    {bulkAction === 'none' && 'Selecciona un tipo de ajuste'}
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl border-2 hover:border-origen-pradera">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                // Aplicar cambios masivos
                setShowBulkEdit(false);
                setSelectedProducts([]);
              }} 
              className="bg-origen-bosque hover:bg-origen-pino text-white rounded-xl"
              disabled={bulkAction === 'none'}
            >
              Aplicar cambios
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}