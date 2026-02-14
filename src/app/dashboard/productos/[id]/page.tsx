/**
 * @page ProductoDetallePage
 * @description Página de detalle de un producto
 * 
 * @data-services
 * - GET /api/products/:id - Obtener detalle del producto
 * - GET /api/products/:id/stats - Estadísticas del producto
 * - DELETE /api/products/:id - Eliminar producto
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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
  Tag
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  cost?: number;
  stock: number;
  sku: string;
  barcode?: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  category: string;
  tags: string[];
  images: string[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  createdAt: string;
  updatedAt: string;
}

const MOCK_PRODUCT: Product = {
  id: '1',
  name: 'Queso Curado Artesanal 6 meses',
  description: 'Queso de oveja curado durante 6 meses en cueva natural. Elaborado con leche cruda de oveja de nuestra propia ganadería. Sabor intenso y textura firme.',
  price: 24.50,
  comparePrice: 29.90,
  cost: 12.00,
  stock: 45,
  sku: 'QUESO-001',
  barcode: '8431234567890',
  status: 'active',
  category: 'Quesos',
  tags: ['artesano', 'ecológico', 'tradición'],
  images: [],
  weight: 0.8,
  dimensions: {
    length: 15,
    width: 15,
    height: 8
  },
  createdAt: '2024-01-15',
  updatedAt: '2024-03-10'
};

export default function ProductoDetallePage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(MOCK_PRODUCT);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    // @todo: DELETE /api/products/:id
    console.log('Producto eliminado:', product.id);
    setShowDeleteDialog(false);
    router.push('/dashboard/productos');
  };

  const handleDuplicate = () => {
    // @todo: POST /api/products/:id/duplicate
    console.log('Duplicar producto:', product.id);
  };

  return (
    <div className="w-full">
      <div className="px-6 lg:px-8 py-4 border-b border-gray-200/50 bg-white/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/productos">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-origen-bosque">{product.name}</h1>
              <p className="text-xs text-gray-500 mt-0.5">SKU: {product.sku}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Copy className="w-4 h-4" />}
              onClick={handleDuplicate}
            >
              Duplicar
            </Button>
            <Link href={`/productos/${product.id}`} target="_blank">
              <Button variant="outline" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                Ver en tienda
              </Button>
            </Link>
            <Link href={`/dashboard/productos/${product.id}/editar`}>
              <Button size="sm" leftIcon={<Edit className="w-4 h-4" />}>
                Editar
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={() => setShowDeleteDialog(true)}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white border border-gray-200/50 shadow-lg">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-origen-crema to-gray-100 flex items-center justify-center">
                {product.images.length > 0 ? (
                  <div className="w-full h-full bg-cover bg-center rounded-lg" />
                ) : (
                  <Package className="w-24 h-24 text-gray-400" />
                )}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white border border-gray-200/50 shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-3 bg-gray-50/50 rounded-lg">
                  <p className="text-xs text-gray-500">Precio</p>
                  <p className="text-lg font-semibold text-origen-pradera mt-1">{product.price}€</p>
                  {product.comparePrice && (
                    <p className="text-xs text-gray-400 line-through">{product.comparePrice}€</p>
                  )}
                </div>
                <div className="p-3 bg-gray-50/50 rounded-lg">
                  <p className="text-xs text-gray-500">Stock</p>
                  <p className="text-lg font-semibold text-origen-bosque mt-1">{product.stock} uds</p>
                </div>
                <div className="p-3 bg-gray-50/50 rounded-lg">
                  <p className="text-xs text-gray-500">Estado</p>
                  <div className="mt-1">
                    {product.status === 'active' && (
                      <Badge variant="success" size="sm">Activo</Badge>
                    )}
                    {product.status === 'inactive' && (
                      <Badge variant="outline" size="sm">Inactivo</Badge>
                    )}
                    {product.status === 'out_of_stock' && (
                      <Badge variant="warning" size="sm">Sin stock</Badge>
                    )}
                  </div>
                </div>
                <div className="p-3 bg-gray-50/50 rounded-lg">
                  <p className="text-xs text-gray-500">Categoría</p>
                  <p className="text-sm font-medium text-origen-bosque mt-1">{product.category}</p>
                </div>
              </div>

              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Información</TabsTrigger>
                  <TabsTrigger value="details">Detalles</TabsTrigger>
                  <TabsTrigger value="stats">Estadísticas</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="pt-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Descripción</h3>
                    <p className="text-sm text-gray-700">{product.description}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Etiquetas</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map(tag => (
                        <Badge key={tag} variant="outline" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="pt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs text-gray-500">SKU</h3>
                      <p className="text-sm font-medium text-origen-bosque">{product.sku}</p>
                    </div>
                    <div>
                      <h3 className="text-xs text-gray-500">Código de barras</h3>
                      <p className="text-sm font-medium text-origen-bosque">{product.barcode || '-'}</p>
                    </div>
                    <div>
                      <h3 className="text-xs text-gray-500">Peso</h3>
                      <p className="text-sm font-medium text-origen-bosque">{product.weight ? `${product.weight} kg` : '-'}</p>
                    </div>
                    <div>
                      <h3 className="text-xs text-gray-500">Dimensiones</h3>
                      <p className="text-sm font-medium text-origen-bosque">
                        {product.dimensions 
                          ? `${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.height} cm`
                          : '-'
                        }
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="stats" className="pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50/50 rounded-lg">
                      <ShoppingBag className="w-4 h-4 text-origen-pradera mb-2" />
                      <p className="text-xs text-gray-500">Ventas totales</p>
                      <p className="text-xl font-semibold text-origen-bosque">124</p>
                    </div>
                    <div className="p-4 bg-gray-50/50 rounded-lg">
                      <DollarSign className="w-4 h-4 text-origen-pradera mb-2" />
                      <p className="text-xs text-gray-500">Ingresos</p>
                      <p className="text-xl font-semibold text-origen-bosque">3.038€</p>
                    </div>
                    <div className="p-4 bg-gray-50/50 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-origen-pradera mb-2" />
                      <p className="text-xs text-gray-500">Margen</p>
                      <p className="text-xl font-semibold text-origen-bosque">48%</p>
                    </div>
                    <div className="p-4 bg-gray-50/50 rounded-lg">
                      <Star className="w-4 h-4 text-origen-pradera mb-2" />
                      <p className="text-xs text-gray-500">Valoración</p>
                      <p className="text-xl font-semibold text-origen-bosque">4.8</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el producto
              <span className="font-semibold text-origen-bosque"> {product.name}</span> del catálogo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}