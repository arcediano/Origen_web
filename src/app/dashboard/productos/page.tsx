/**
 * @page ProductosPage
 * @description Listado de productos con eliminación confirmada
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import {
  Plus,
  Search,
  Edit,
  Eye,
  Copy,
  Trash2,
  Package,
  TrendingUp,
  SlidersHorizontal,
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

// ============================================================================
// TIPOS
// ============================================================================

interface Product {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  stock: number;
  sku: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  category: string;
  images: string[];
  sales?: number;
}

// ============================================================================
// DATOS MOCK
// ============================================================================

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Queso Curado Artesanal 6 meses',
    price: 24.50,
    comparePrice: 29.90,
    stock: 45,
    sku: 'QUESO-001',
    status: 'active',
    category: 'Quesos',
    images: [],
    sales: 124
  },
  {
    id: '2',
    name: 'Queso Semi Curado 3 meses',
    price: 18.90,
    stock: 38,
    sku: 'QUESO-002',
    status: 'active',
    category: 'Quesos',
    images: [],
    sales: 89
  },
  {
    id: '3',
    name: 'Queso Fresco de Oveja',
    price: 12.50,
    stock: 0,
    sku: 'QUESO-003',
    status: 'out_of_stock',
    category: 'Quesos',
    images: [],
    sales: 67
  },
  {
    id: '4',
    name: 'Aceite de Oliva Virgen Extra',
    price: 16.90,
    comparePrice: 19.90,
    stock: 62,
    sku: 'ACEITE-001',
    status: 'active',
    category: 'Aceites',
    images: [],
    sales: 156
  }
];

const CATEGORIES = ['Todas', 'Quesos', 'Aceites', 'Mieles', 'Embutidos'];

// ============================================================================
// FUNCIÓN AUXILIAR
// ============================================================================

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge variant="success" size="xs" className="bg-green-100 text-green-700 border-green-200">Activo</Badge>;
    case 'inactive':
      return <Badge variant="outline" size="xs">Inactivo</Badge>;
    case 'out_of_stock':
      return <Badge variant="warning" size="xs" className="bg-amber-100 text-amber-700 border-amber-200">Sin stock</Badge>;
    default:
      return null;
  }
};

// ============================================================================
// COMPONENTE PRODUCT CARD
// ============================================================================

interface ProductCardProps {
  product: Product;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductCard = ({ product, onEdit, onDuplicate, onDelete }: ProductCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const discount = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDelete(product.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative group"
      >
        <Card className="overflow-hidden bg-white border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Imagen */}
          <Link href={`/dashboard/productos/${product.id}`}>
            <div className="relative h-40 bg-gradient-to-br from-origen-crema to-gray-100 cursor-pointer">
              {product.images.length > 0 ? (
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${product.images[0]})` }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {getStatusBadge(product.status)}
                {discount > 0 && (
                  <Badge variant="error" size="xs" className="bg-red-500 text-white border-red-600">
                    -{discount}%
                  </Badge>
                )}
              </div>
            </div>
          </Link>

          {/* Información */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <Link 
                href={`/dashboard/productos/${product.id}`}
                className="text-base font-semibold text-origen-bosque hover:text-origen-pradera transition-colors line-clamp-1 flex-1"
              >
                {product.name}
              </Link>
              <button
                onClick={handleDeleteClick}
                className="text-gray-300 hover:text-red-500 transition-colors ml-2"
                aria-label="Eliminar producto"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xl font-bold text-origen-pradera">{product.price.toFixed(2)}€</span>
                {product.comparePrice && (
                  <span className="text-xs text-gray-400 line-through ml-2">{product.comparePrice.toFixed(2)}€</span>
                )}
              </div>
              <Badge variant="outline" size="xs" className="bg-gray-50">
                {product.stock} uds
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <Package className="w-3 h-3" />
                {product.category}
              </span>
              {product.sales && (
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {product.sales} vend.
                </span>
              )}
            </div>

            {/* Acciones */}
            <div className="flex items-center justify-end gap-1 pt-2 border-t border-gray-100">
              <Link href={`/dashboard/productos/${product.id}`}>
                <Button
                  size="xs"
                  variant="ghost"
                  className="h-7 px-2 text-gray-600 hover:text-origen-bosque hover:bg-origen-crema/80"
                >
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  <span className="text-xs">Ver</span>
                </Button>
              </Link>
              <Button
                size="xs"
                variant="ghost"
                className="h-7 px-2 text-gray-600 hover:text-origen-bosque hover:bg-origen-crema/80"
                onClick={() => onEdit(product.id)}
              >
                <Edit className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">Editar</span>
              </Button>
              <Button
                size="xs"
                variant="ghost"
                className="h-7 px-2 text-gray-600 hover:text-origen-bosque hover:bg-origen-crema/80"
                onClick={() => onDuplicate(product.id)}
              >
                <Copy className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">Duplicar</span>
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Diálogo de confirmación de eliminación */}
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
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function ProductosPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filtrar productos
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (id: string) => {
    router.push(`/dashboard/productos/${id}/editar`);
  };

  const handleDuplicate = (id: string) => {
    // Encontrar el producto original
    const original = MOCK_PRODUCTS.find(p => p.id === id);
    if (original) {
      // Crear copia con nuevo ID
      const duplicated = {
        ...original,
        id: `${original.id}-copy-${Date.now()}`,
        name: `${original.name} (copia)`,
        sku: `${original.sku}-COPY`
      };
      console.log('Producto duplicado:', duplicated);
      // Aquí iría la llamada a la API para guardar la copia
    }
  };

  const handleDelete = (id: string) => {
    console.log('Producto eliminado:', id);
    // Aquí iría la llamada a la API para eliminar
    // router.refresh() para actualizar la lista
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todas');
    setCurrentPage(1);
    setShowFilters(false);
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="px-6 lg:px-8 py-4 border-b border-gray-200/50 bg-white/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-origen-bosque">Productos</h1>
            <p className="text-xs text-gray-500 mt-0.5">{filteredProducts.length} productos</p>
          </div>
          <Link href="/dashboard/productos/nuevo">
            <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Nuevo producto
            </Button>
          </Link>
        </div>
      </div>

      {/* BÚSQUEDA Y FILTROS */}
      <div className="px-6 lg:px-8 py-4 border-b border-gray-200/50 bg-white/30">
        <div className="flex items-center gap-3">
          {/* Input de búsqueda */}
          <div className="relative w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre o SKU..."
              className="w-full h-9 pl-9 pr-8 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-origen-pradera/20 focus:border-origen-pradera transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Botón filtros */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
              showFilters
                ? "bg-origen-pradera text-white hover:bg-origen-hoja"
                : "bg-white border border-gray-200 text-gray-700 hover:border-origen-pradera hover:bg-origen-crema/30"
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtros</span>
            {(selectedCategory !== 'Todas' || searchQuery) && (
              <span className="ml-1 w-2 h-2 bg-origen-pradera rounded-full animate-pulse" />
            )}
          </button>

          {/* Selector de vista */}
          <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-0.5 ml-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "flex items-center justify-center h-8 w-8 rounded-md transition-all",
                viewMode === 'grid' ? "bg-origen-crema text-origen-bosque" : "text-gray-500 hover:text-origen-bosque hover:bg-gray-100"
              )}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "flex items-center justify-center h-8 w-8 rounded-md transition-all",
                viewMode === 'list' ? "bg-origen-crema text-origen-bosque" : "text-gray-500 hover:text-origen-bosque hover:bg-gray-100"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* FILTROS EXPANDIBLES */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-visible relative z-40"
            >
              <div className="pt-4 flex flex-wrap items-center gap-4 ml-[332px]">
                <div className="w-48 relative z-50">
                  <label className="text-xs text-gray-500 mb-1 block">Categoría</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-9 bg-white text-sm">
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-white shadow-xl border border-gray-200">
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <button
                  onClick={clearFilters}
                  className="h-9 px-3 text-sm text-gray-500 hover:text-origen-bosque transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="p-6 lg:p-8">
        {viewMode === 'grid' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginatedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* PAGINACIÓN */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-origen-pradera hover:text-origen-pradera disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                      pageNum = currentPage - 3 + i;
                    }
                    if (pageNum <= totalPages) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={cn(
                            "h-8 w-8 rounded-lg text-sm font-medium transition-all",
                            currentPage === pageNum
                              ? "bg-origen-bosque text-white hover:bg-origen-pino"
                              : "border border-gray-200 bg-white text-gray-700 hover:border-origen-pradera hover:text-origen-pradera"
                          )}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-origen-pradera hover:text-origen-pradera disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          // Vista de lista
          <Card className="p-4 bg-white border border-gray-200/50 shadow-lg">
            <div className="space-y-2">
              {paginatedProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 border-b last:border-0 border-gray-100 hover:bg-gray-50/50 transition-colors rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-origen-pradera/20 to-origen-hoja/20 flex items-center justify-center">
                      <Package className="w-4 h-4 text-origen-pradera" />
                    </div>
                    <div>
                      <Link 
                        href={`/dashboard/productos/${product.id}`}
                        className="text-sm font-medium text-origen-bosque hover:text-origen-pradera transition-colors"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-origen-pradera">{product.price.toFixed(2)}€</span>
                    {getStatusBadge(product.status)}
                    <div className="flex items-center gap-1">
                      <Link href={`/dashboard/productos/${product.id}`}>
                        <button className="h-7 w-7 rounded-md flex items-center justify-center text-gray-500 hover:text-origen-bosque hover:bg-gray-100 transition-all">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleEdit(product.id)}
                        className="h-7 w-7 rounded-md flex items-center justify-center text-gray-500 hover:text-origen-bosque hover:bg-gray-100 transition-all"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Mensaje sin resultados */}
        {paginatedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white/50 rounded-2xl border border-gray-200/50"
          >
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
              No se encontraron productos con los filtros seleccionados.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-all"
            >
              Limpiar filtros
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}