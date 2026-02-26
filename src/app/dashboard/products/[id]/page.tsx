/**
 * @page ProductoDetallePage
 * @description Página de detalle de producto - VERSIÓN FINAL CON CABECERA INTEGRADA
 * 
 * @version 7.0.0 - Cabecera sin borde, contenido enriquecido en tabs
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  ArrowLeft,
  Edit,
  Package,
  Eye,
  Copy,
  Trash2,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Star,
  Tag,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Clock,
  Weight,
  Ruler,
  Barcode,
  Calendar,
  FileText,
  Award,
  RefreshCw,
  ExternalLink,
  Leaf,
  MapPin,
  FlaskConical,
  Wheat,
  Droplet,
  Milk,
  Beef,
  Users,
  BarChart3,
  Shield,
  Heart,
  Globe,
  TreePine,
  Sun,
  Percent,
  Scale,
  Info,
  Quote,
  Layers,
  Gift,
  History,
  Download,
  Printer,
  Share2,
  ChevronRight,
  TrendingDown,
  Zap,
  GripVertical
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

interface Product {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  comparePrice?: number;
  cost?: number;
  stock: number;
  lowStockThreshold: number;
  sku: string;
  barcode?: string;
  status: 'active' | 'inactive' | 'out_of_stock' | 'draft' | 'pending_approval';
  category: string;
  subcategory: string;
  tags: string[];
  images: string[];
  
  // Información nutricional
  nutritionalInfo: {
    servingSize: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    totalFat: number;
    saturatedFat: number;
    sugars: number;
    fiber: number;
    sodium: number;
    allergens: string[];
    isGlutenFree: boolean;
    isLactoseFree: boolean;
    isVegan: boolean;
    isVegetarian: boolean;
    ingredients: string[];
  };
  
  // Información de producción
  productionInfo: {
    farmName: string;
    origin: string;
    harvestDate: string;
    expiryDate: string;
    story: string;
    practices: string[];
    batchNumber: string;
  };
  
  // Precios y ofertas
  priceTiers: PriceTier[];
  
  // Datos de envío
  weight?: number;
  weightUnit: 'kg' | 'g';
  dimensions?: { length: number; width: number; height: number };
  shippingClass: string;
  
  // Certificaciones
  certifications: { id: string; name: string; verified: boolean; expiryDate?: string }[];
  
  // Atributos dinámicos
  attributes: { id: string; name: string; value: string; visible: boolean }[];
  
  // Métricas enriquecidas
  metrics: {
    sales: number;
    revenue: number;
    rating: number;
    reviewCount: number;
    views: number;
    conversion: number;
    returnRate: number;
    stockRotation: number;
    dailySales: number[];
    monthlySales: number[];
    topRegions: { region: string; percentage: number }[];
  };
  
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastOrderDate?: string;
}

// ============================================================================
// DATOS DE EJEMPLO ENRIQUECIDOS
// ============================================================================

const MOCK_PRODUCT: Product = {
  id: 'prod-001',
  name: 'Queso Curado Artesanal D.O. 12 meses',
  shortDescription: 'Queso de oveja con Denominación de Origen, curado 12 meses en cueva natural. Textura firme y sabor intenso con notas de frutos secos.',
  fullDescription: `Elaborado con leche cruda de oveja de nuestra propia ganadería en la Sierra de Grazalema. La leche se cuaja con cuajo natural de cordero y se prensa manualmente en moldes tradicionales de esparto. La maduración se realiza durante 12 meses en cuevas naturales, donde la humedad y temperatura constantes desarrollan su personalidad única.

Características:
- Textura firme y ligeramente cristalizada
- Sabor intenso y persistente con notas de frutos secos y hierbas de la sierra
- Corteza natural lavada con aceite de oliva virgen extra

Reconocimientos:
- Medalla de Oro en los World Cheese Awards 2024
- Mejor Queso de España 2023 (Guía Gourmet)`,
  price: 28.50,
  comparePrice: 34.90,
  cost: 14.20,
  stock: 38,
  lowStockThreshold: 10,
  sku: 'QUESO-CURADO-012',
  barcode: '8434567890123',
  status: 'active',
  category: 'Quesos',
  subcategory: 'Artesano',
  tags: ['artesano', 'ecológico', 'premiado', 'denominación origen', 'oveja', 'curado'],
  images: [],
  
  nutritionalInfo: {
    servingSize: '100g',
    calories: 420,
    protein: 28,
    carbohydrates: 1.5,
    totalFat: 34,
    saturatedFat: 22,
    sugars: 0.2,
    fiber: 0,
    sodium: 620,
    allergens: ['Lácteos'],
    isGlutenFree: true,
    isLactoseFree: false,
    isVegan: false,
    isVegetarian: true,
    ingredients: [
      'Leche cruda de oveja (100% raza Manchega)',
      'Cuajo natural de cordero',
      'Sal marina',
      'Fermentos lácticos',
      'Cloruro cálcico'
    ],
  },
  
  productionInfo: {
    farmName: 'Quesería El Gazpacho',
    origin: 'Sierra de Grazalema, Cádiz',
    harvestDate: '2024-02-15',
    expiryDate: '2025-02-15',
    batchNumber: 'LOTE-024-0224',
    story: `"Nuestros quesos son el reflejo de nuestra tierra. Cada pieza cuenta la historia de nuestras ovejas, que pastan en libertad en las laderas de la sierra, alimentándose de tomillo y romero." - María García, Maesa Quesera.`,
    practices: ['renewable_energy', 'water_conservation', 'local_sourcing', 'biodiversity'],
  },
  
  priceTiers: [
    { id: 'tier1', minQuantity: 2, type: 'percentage', value: 5, label: '5% dto', savings: 1.42 },
    { id: 'tier2', minQuantity: 5, type: 'percentage', value: 10, label: '10% dto', savings: 2.85 },
    { id: 'tier3', minQuantity: 10, type: 'percentage', value: 15, label: '15% dto', savings: 4.27 },
  ],
  
  weight: 1.2,
  weightUnit: 'kg',
  dimensions: { length: 18, width: 18, height: 10 },
  shippingClass: 'perishable',
  
  certifications: [
    { id: 'cert-1', name: 'Denominación de Origen', verified: true, expiryDate: '2025-12-31' },
    { id: 'cert-2', name: 'Agricultura Ecológica UE', verified: true, expiryDate: '2024-11-30' },
    { id: 'cert-3', name: 'Bienestar Animal', verified: false },
  ],
  
  attributes: [
    { id: 'attr-1', name: 'Tipo de leche', value: 'Oveja 100% Manchega', visible: true },
    { id: 'attr-2', name: 'Tiempo de curación', value: '12 meses', visible: true },
    { id: 'attr-3', name: 'Maduración', value: 'En cueva natural', visible: true },
    { id: 'attr-4', name: 'Textura', value: 'Firme y cristalizada', visible: true },
    { id: 'attr-5', name: 'Intensidad', value: 'Fuerte', visible: true },
    { id: 'attr-6', name: 'Maridaje', value: 'Vinos tintos, Pedro Ximénez', visible: true },
    { id: 'attr-7', name: 'Temperatura de servicio', value: '18-20°C', visible: true },
  ],
  
  metrics: {
    sales: 187,
    revenue: 5329.50,
    rating: 4.9,
    reviewCount: 42,
    views: 3452,
    conversion: 5.4,
    returnRate: 0.5,
    stockRotation: 3.2,
    dailySales: [12, 8, 15, 10, 7, 9, 14, 11, 13, 16, 10, 8, 12, 14, 9, 11, 13, 15, 10, 8, 12, 14, 16, 11, 9, 13, 15, 10, 12, 14],
    monthlySales: [145, 168, 187, 203, 195, 210, 234, 256, 278, 301, 325, 350],
    topRegions: [
      { region: 'Madrid', percentage: 35 },
      { region: 'Barcelona', percentage: 22 },
      { region: 'Valencia', percentage: 15 },
      { region: 'Andalucía', percentage: 12 },
      { region: 'País Vasco', percentage: 8 },
    ],
  },
  
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-03-10T15:45:00Z',
  createdBy: 'María García',
  lastOrderDate: '2024-03-15T09:30:00Z',
};

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

const StatusBadge = ({ status }: { status: Product['status'] }) => {
  const config = {
    active: { 
      label: 'Activo', 
      icon: <CheckCircle className="h-4 w-4" />,
      classes: "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
    },
    inactive: { 
      label: 'Inactivo', 
      icon: <Clock className="h-4 w-4" />,
      classes: "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
    },
    out_of_stock: { 
      label: 'Sin stock', 
      icon: <AlertCircle className="h-4 w-4" />,
      classes: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
    },
    draft: { 
      label: 'Borrador', 
      icon: <FileText className="h-4 w-4" />,
      classes: "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
    },
    pending_approval: { 
      label: 'Pendiente', 
      icon: <Clock className="h-4 w-4" />,
      classes: "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
    },
  };
  
  const { label, icon, classes } = config[status];
  
  return (
    <span className={cn(
      "justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-origen-menta/50 focus:ring-offset-1 whitespace-nowrap px-2 py-1 text-xs sm:gap-1.5 flex items-center gap-1",
      classes
    )}>
      <span className="truncate flex items-center gap-1">
        {icon}
        {label}
      </span>
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

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-origen-bosque hover:text-origen-pradera hover:bg-origen-pradera/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-origen-menta"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
};

const PrimaryButton = ({ children, icon, onClick, className, ...props }: any) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-origen-menta disabled:pointer-events-none disabled:opacity-50 disabled:grayscale-[30%] active:scale-[0.98] overflow-hidden group shadow-md shadow-origen-bosque/30 hover:shadow-lg hover:shadow-origen-bosque/40 border border-origen-pino gap-2.5 rounded-xl relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-700 after:rounded-[inherit] bg-origen-bosque hover:bg-origen-pino text-white h-9 sm:h-10 px-4 sm:px-5 text-sm sm:text-base w-full sm:w-auto",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <span className="truncate">
          <span className="flex items-center gap-2">
            {icon}
            {children}
          </span>
        </span>
      </span>
    </button>
  );
};

const OutlineButton = ({ children, icon, onClick, className, ...props }: any) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-origen-menta disabled:pointer-events-none disabled:opacity-50 disabled:grayscale-[30%] active:scale-[0.98] relative overflow-hidden group text-sm sm:text-base sm:w-auto bg-transparent text-origen-bosque border-origen-bosque active:bg-origen-pastel h-9 sm:h-10 px-4 sm:px-5 rounded-xl border-2 hover:border-origen-pradera hover:bg-origen-pradera/5 gap-2",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <span className="truncate">
          <span className="flex items-center gap-2">
            {icon}
            {children}
          </span>
        </span>
      </span>
    </button>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function ProductoDetallePage() {
  const router = useRouter();
  const [product] = useState(MOCK_PRODUCT);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const marginAmount = product.price - (product.cost || 0);
  const marginPercentage = ((marginAmount / product.price) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-white to-origen-crema"
    >
      {/* Elementos decorativos */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-origen-pradera/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-origen-hoja/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* ===== CABECERA INTEGRADA (SIN BORDE INFERIOR) ===== */}
      <div className="px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton onClick={() => router.back()} />
            
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-origen-bosque">{product.name}</h1>
                <StatusBadge status={product.status} />
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1">
                  <Barcode className="w-3 h-3" />
                  SKU: {product.sku}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Creado: {formatDate(product.createdAt)}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Actualizado: {formatDate(product.updatedAt)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Botones principales (solo editar y eliminar) */}
          <div className="flex items-center gap-2">
            <IconBadge icon={<Award className="h-4 w-4" />} variant="leaf">
              {product.certifications.length} certificaciones
            </IconBadge>

            <Link href={`/dashboard/products/${product.id}/editar`}>
              <PrimaryButton icon={<Edit className="w-4 h-4" />}>
                Editar
              </PrimaryButton>
            </Link>

            <OutlineButton
              icon={<Trash2 className="w-4 h-4" />}
              onClick={() => setShowDeleteDialog(true)}
            >
              Eliminar
            </OutlineButton>
          </div>
        </div>
      </div>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <div className="px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          
          {/* ===== SECCIÓN 1: MÉTRICAS CLAVE ===== */}
          <div className="grid grid-cols-6 gap-4 mb-8">
            <Card variant="elevated" hoverEffect="organic" className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-origen-pradera/10 flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5 text-origen-pradera" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Precio</p>
                  <p className="text-lg font-bold text-origen-bosque">{product.price.toFixed(2)}€</p>
                  {product.comparePrice && (
                    <p className="text-xs text-gray-400 line-through">{product.comparePrice.toFixed(2)}€</p>
                  )}
                </div>
              </div>
            </Card>

            <Card variant="elevated" hoverEffect="organic" className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-origen-hoja/10 flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-origen-hoja" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Stock</p>
                  <p className="text-lg font-bold text-origen-bosque">{product.stock} uds</p>
                  <p className="text-xs text-gray-400">Rotación: {product.metrics.stockRotation}/mes</p>
                </div>
              </div>
            </Card>

            <Card variant="elevated" hoverEffect="organic" className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-origen-menta/10 flex items-center justify-center shrink-0">
                  <Percent className="w-5 h-5 text-origen-menta" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Margen</p>
                  <p className="text-lg font-bold text-origen-bosque">{marginPercentage}%</p>
                  <p className="text-xs text-gray-400">{marginAmount.toFixed(2)}€/ud</p>
                </div>
              </div>
            </Card>

            <Card variant="elevated" hoverEffect="organic" className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Valoración</p>
                  <p className="text-lg font-bold text-origen-bosque">{product.metrics.rating}</p>
                  <p className="text-xs text-gray-400">{product.metrics.reviewCount} reseñas</p>
                </div>
              </div>
            </Card>

            <Card variant="elevated" hoverEffect="organic" className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ventas</p>
                  <p className="text-lg font-bold text-origen-bosque">{product.metrics.sales}</p>
                  <p className="text-xs text-gray-400">{product.metrics.revenue}€ ingresos</p>
                </div>
              </div>
            </Card>

            <Card variant="elevated" hoverEffect="organic" className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Visibilidad</p>
                  <p className="text-lg font-bold text-origen-bosque">{product.metrics.views}</p>
                  <p className="text-xs text-gray-400">{product.metrics.conversion}% conversión</p>
                </div>
              </div>
            </Card>
          </div>

          {/* ===== SECCIÓN 2: DOS COLUMNAS ===== */}
          <div className="grid grid-cols-12 gap-8">
            
            {/* COLUMNA IZQUIERDA (4/12) */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              
              {/* Imagen */}
              <Card variant="elevated" hoverEffect="organic" className="p-5">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-origen-crema to-gray-100 flex items-center justify-center">
                  <Package className="w-20 h-20 text-origen-pradera/30" />
                </div>
              </Card>

              {/* Datos del producto */}
              <Card variant="elevated" hoverEffect="organic" className="p-5">
                <h3 className="text-sm font-semibold text-origen-bosque mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-origen-pradera" />
                  Datos del producto
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-sm text-gray-600">Categoría</span>
                    <span className="text-sm font-medium text-origen-bosque">{product.category} / {product.subcategory}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-sm text-gray-600">Origen</span>
                    <span className="text-sm font-medium text-origen-bosque">{product.productionInfo.origin}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-sm text-gray-600">Productor</span>
                    <span className="text-sm font-medium text-origen-bosque">{product.productionInfo.farmName}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-sm text-gray-600">Peso / dimensiones</span>
                    <span className="text-sm font-medium text-origen-bosque">
                      {product.weight} kg · {product.dimensions?.length}x{product.dimensions?.width}x{product.dimensions?.height} cm
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-sm text-gray-600">Clase de envío</span>
                    <span className="text-sm font-medium text-origen-bosque capitalize">{product.shippingClass}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lote actual</span>
                    <span className="text-sm font-mono font-medium text-origen-bosque">{product.productionInfo.batchNumber}</span>
                  </div>
                </div>
              </Card>

              {/* Certificaciones */}
              <Card variant="elevated" hoverEffect="organic" className="p-5">
                <h3 className="text-sm font-semibold text-origen-bosque mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-origen-pradera" />
                  Certificaciones
                </h3>
                <div className="space-y-3">
                  {product.certifications.map(cert => (
                    <div key={cert.id} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        {cert.verified ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Award className="w-4 h-4 text-origen-pradera" />
                        )}
                        <span className="text-sm text-gray-700">{cert.name}</span>
                      </div>
                      {cert.verified && (
                        <Badge variant="success" size="xs">Verificada</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Atributos destacados */}
              <Card variant="elevated" hoverEffect="organic" className="p-5">
                <h3 className="text-sm font-semibold text-origen-bosque mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-origen-pradera" />
                  Atributos
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.attributes.slice(0, 6).map(attr => (
                    <div key={attr.id} className="p-2 bg-origen-crema/30 rounded-lg">
                      <p className="text-xs text-gray-500">{attr.name}</p>
                      <p className="text-sm font-medium text-origen-bosque truncate">{attr.value}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* COLUMNA DERECHA (8/12) */}
            <div className="col-span-12 lg:col-span-8">
              <Card variant="elevated" hoverEffect="organic" className="p-6">
                
                {/* Descripción */}
                <div className="mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-origen-pradera/10 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-origen-pradera" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base font-semibold text-origen-bosque mb-2">Descripción</h2>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                        {product.fullDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-200">
                  {product.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm bg-origen-pastel text-origen-hoja border-origen-pradera/30">
                      <span className="[&>svg]:h-4 [&>svg]:w-4">
                        <Tag className="h-4 w-4" />
                      </span>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* TABS ENRIQUECIDOS */}
                <Tabs defaultValue="nutritional" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 p-1 bg-origen-crema/50 rounded-xl mb-6">
                    <TabsTrigger value="nutritional" className="rounded-lg data-[state=active]:bg-white">
                      <FlaskConical className="w-4 h-4 mr-2" />
                      Nutricional
                    </TabsTrigger>
                    <TabsTrigger value="production" className="rounded-lg data-[state=active]:bg-white">
                      <Leaf className="w-4 h-4 mr-2" />
                      Producción
                    </TabsTrigger>
                    <TabsTrigger value="pricing" className="rounded-lg data-[state=active]:bg-white">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Precios
                    </TabsTrigger>
                    <TabsTrigger value="inventory" className="rounded-lg data-[state=active]:bg-white">
                      <Package className="w-4 h-4 mr-2" />
                      Inventario
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-white">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </TabsTrigger>
                  </TabsList>

                  {/* ===== TAB 1: NUTRICIONAL (ENRIQUECIDO) ===== */}
                  <TabsContent value="nutritional" className="mt-0">
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      <div className="text-center p-3 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500">Calorías</p>
                        <p className="text-xl font-bold text-origen-bosque">{product.nutritionalInfo.calories}</p>
                        <p className="text-xs text-gray-400">kcal</p>
                      </div>
                      <div className="text-center p-3 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500">Proteínas</p>
                        <p className="text-xl font-bold text-origen-bosque">{product.nutritionalInfo.protein}</p>
                        <p className="text-xs text-gray-400">g</p>
                      </div>
                      <div className="text-center p-3 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500">Grasas</p>
                        <p className="text-xl font-bold text-origen-bosque">{product.nutritionalInfo.totalFat}</p>
                        <p className="text-xs text-gray-400">g</p>
                      </div>
                      <div className="text-center p-3 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500">Carbohid.</p>
                        <p className="text-xl font-bold text-origen-bosque">{product.nutritionalInfo.carbohydrates}</p>
                        <p className="text-xs text-gray-400">g</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500">Grasas saturadas</p>
                        <p className="text-sm font-medium text-origen-bosque">{product.nutritionalInfo.saturatedFat}g</p>
                      </div>
                      <div className="p-3 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500">Azúcares</p>
                        <p className="text-sm font-medium text-origen-bosque">{product.nutritionalInfo.sugars}g</p>
                      </div>
                      <div className="p-3 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500">Fibra</p>
                        <p className="text-sm font-medium text-origen-bosque">{product.nutritionalInfo.fiber}g</p>
                      </div>
                      <div className="p-3 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500">Sodio</p>
                        <p className="text-sm font-medium text-origen-bosque">{product.nutritionalInfo.sodium}mg</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-origen-bosque mb-2">Ingredientes</h4>
                      <div className="p-3 bg-origen-crema/30 rounded-lg">
                        <ul className="list-disc list-inside space-y-1">
                          {product.nutritionalInfo.ingredients.map((ing, idx) => (
                            <li key={idx} className="text-sm text-gray-700">{ing}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.nutritionalInfo.allergens.map(allergen => (
                        <span key={allergen} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm bg-origen-pastel text-origen-hoja border-origen-pradera/30">
                          <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <AlertCircle className="h-4 w-4" />
                          </span>
                          {allergen}
                        </span>
                      ))}
                      {product.nutritionalInfo.isGlutenFree && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm bg-green-50 text-green-700 border-green-200">
                          <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <CheckCircle className="h-4 w-4" />
                          </span>
                          Sin gluten
                        </span>
                      )}
                      {product.nutritionalInfo.isVegetarian && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm bg-green-50 text-green-700 border-green-200">
                          <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <CheckCircle className="h-4 w-4" />
                          </span>
                          Vegetariano
                        </span>
                      )}
                    </div>
                  </TabsContent>

                  {/* ===== TAB 2: PRODUCCIÓN (ENRIQUECIDO) ===== */}
                  <TabsContent value="production" className="mt-0">
                    <div className="flex gap-4 mb-4 p-4 bg-origen-crema/30 rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-origen-pradera/10 flex items-center justify-center shrink-0">
                        <Quote className="w-5 h-5 text-origen-pradera" />
                      </div>
                      <p className="text-sm text-gray-600 italic">{product.productionInfo.story}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Fecha cosecha
                        </p>
                        <p className="text-sm font-medium text-origen-bosque">{formatDate(product.productionInfo.harvestDate)}</p>
                      </div>
                      <div className="p-3 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Fecha caducidad
                        </p>
                        <p className="text-sm font-medium text-origen-bosque">{formatDate(product.productionInfo.expiryDate)}</p>
                      </div>
                    </div>

                    <h4 className="text-sm font-medium text-origen-bosque mb-3">Prácticas sostenibles</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {product.productionInfo.practices.includes('renewable_energy') && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm bg-origen-pastel text-origen-hoja border-origen-pradera/30">
                          <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <Sun className="h-4 w-4" />
                          </span>
                          Energía renovable
                        </span>
                      )}
                      {product.productionInfo.practices.includes('water_conservation') && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm bg-origen-pastel text-origen-hoja border-origen-pradera/30">
                          <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <Droplet className="h-4 w-4" />
                          </span>
                          Ahorro de agua
                        </span>
                      )}
                      {product.productionInfo.practices.includes('local_sourcing') && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm bg-origen-pastel text-origen-hoja border-origen-pradera/30">
                          <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <MapPin className="h-4 w-4" />
                          </span>
                          Proveedores locales
                        </span>
                      )}
                      {product.productionInfo.practices.includes('biodiversity') && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm bg-origen-pastel text-origen-hoja border-origen-pradera/30">
                          <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <TreePine className="h-4 w-4" />
                          </span>
                          Biodiversidad
                        </span>
                      )}
                    </div>
                  </TabsContent>

                  {/* ===== TAB 3: PRECIOS Y OFERTAS ===== */}
                  <TabsContent value="pricing" className="mt-0">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-4 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500">Precio base</p>
                        <p className="text-2xl font-bold text-origen-bosque">{product.price.toFixed(2)}€</p>
                      </div>
                      <div className="p-4 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500">Precio de referencia</p>
                        <p className="text-2xl font-bold text-gray-400 line-through">{product.comparePrice?.toFixed(2)}€</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg col-span-2">
                        <p className="text-xs text-green-600">Margen de beneficio</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-bold text-green-700">{marginPercentage}%</p>
                          <p className="text-sm text-green-600">{marginAmount.toFixed(2)}€ por unidad</p>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-sm font-medium text-origen-bosque mb-3 flex items-center gap-2">
                      <Gift className="w-4 h-4 text-origen-pradera" />
                      Ofertas por cantidad
                    </h4>

                    <div className="space-y-2">
                      {product.priceTiers.map(tier => (
                        <div key={tier.id} className="flex items-center justify-between p-3 bg-origen-crema/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-origen-pradera/10 flex items-center justify-center">
                              <Percent className="w-4 h-4 text-origen-pradera" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-origen-bosque">{tier.label}</p>
                              <p className="text-xs text-gray-500">Desde {tier.minQuantity} unidades</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-green-600">Ahorra {tier.savings?.toFixed(2)}€</p>
                            <p className="text-xs text-gray-400">por unidad</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* ===== TAB 4: INVENTARIO DETALLADO ===== */}
                  <TabsContent value="inventory" className="mt-0">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-4 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500">Stock actual</p>
                        <p className="text-2xl font-bold text-origen-bosque">{product.stock} uds</p>
                      </div>
                      <div className="p-4 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500">Umbral stock bajo</p>
                        <p className="text-2xl font-bold text-origen-bosque">{product.lowStockThreshold} uds</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Nivel de stock</span>
                        <span className="text-sm font-medium text-origen-bosque">{Math.min((product.stock / 50) * 100, 100)}%</span>
                      </div>
                      <Progress value={Math.min((product.stock / 50) * 100, 100)} variant="leaf" size="md" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <History className="w-3 h-3" />
                          Rotación
                        </p>
                        <p className="text-lg font-bold text-origen-bosque">{product.metrics.stockRotation}/mes</p>
                      </div>
                      <div className="p-3 bg-origen-crema/30 rounded-lg">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <TrendingDown className="w-3 h-3" />
                          Tasa retorno
                        </p>
                        <p className="text-lg font-bold text-origen-bosque">{product.metrics.returnRate}%</p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-700 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        Último pedido: {product.lastOrderDate ? formatDate(product.lastOrderDate) : 'No hay pedidos'}
                      </p>
                    </div>
                  </TabsContent>

                  {/* ===== TAB 5: ANALYTICS ===== */}
                  <TabsContent value="analytics" className="mt-0">
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="p-3 bg-origen-crema/30 rounded-lg text-center">
                        <p className="text-xs text-gray-500">Ventas totales</p>
                        <p className="text-xl font-bold text-origen-bosque">{product.metrics.sales}</p>
                      </div>
                      <div className="p-3 bg-origen-crema/30 rounded-lg text-center">
                        <p className="text-xs text-gray-500">Ingresos</p>
                        <p className="text-xl font-bold text-origen-bosque">{product.metrics.revenue}€</p>
                      </div>
                      <div className="p-3 bg-origen-crema/30 rounded-lg text-center">
                        <p className="text-xs text-gray-500">Conversión</p>
                        <p className="text-xl font-bold text-origen-bosque">{product.metrics.conversion}%</p>
                      </div>
                    </div>

                    <h4 className="text-sm font-medium text-origen-bosque mb-3">Ventas últimos 30 días</h4>
                    <div className="h-20 flex items-end gap-1 mb-4">
                      {product.metrics.dailySales.slice(-14).map((value, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div 
                            className="w-full bg-origen-pradera/50 rounded-t-sm hover:bg-origen-pradera transition-colors"
                            style={{ height: `${(value / 20) * 100}%` }}
                          />
                        </div>
                      ))}
                    </div>

                    <h4 className="text-sm font-medium text-origen-bosque mb-3">Distribución geográfica</h4>
                    <div className="space-y-2">
                      {product.metrics.topRegions.map(region => (
                        <div key={region.region} className="flex items-center gap-2">
                          <span className="text-xs text-gray-600 w-20">{region.region}</span>
                          <div className="flex-1 h-2 bg-origen-crema rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-origen-pradera rounded-full"
                              style={{ width: `${region.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-origen-bosque w-10 text-right">{region.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* ===== DIALOGO ELIMINAR ===== */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              ¿Eliminar producto?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el producto
              <span className="font-semibold text-origen-bosque"> {product.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl border-2 hover:border-origen-pradera">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => setShowDeleteDialog(false)} 
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}