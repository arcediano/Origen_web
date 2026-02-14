/**
 * @page NuevoProductoPage
 * @description Formulario para crear un nuevo producto
 * 
 * @data-services
 * - POST /api/products - Crear nuevo producto
 * - POST /api/upload - Subir imágenes
 * - GET /api/categories - Obtener categorías
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { FileUpload, type UploadedFile } from '@/components/forms/FileUpload';
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
  Save,
  Eye,
  Package,
  DollarSign,
  Tag,
  Plus,
  X,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  cost?: number;
  stock: number;
  sku: string;
  barcode?: string;
  category: string;
  tags: string[];
  images: UploadedFile[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  status: 'draft' | 'active';
}

export default function NuevoProductoPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    comparePrice: undefined,
    cost: undefined,
    stock: 0,
    sku: '',
    barcode: '',
    category: '',
    tags: [],
    images: [],
    weight: undefined,
    dimensions: undefined,
    status: 'draft'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: any): string | undefined => {
    if (field === 'name' && !value) return 'El nombre es obligatorio';
    if (field === 'price' && (!value || value <= 0)) return 'El precio debe ser mayor que 0';
    if (field === 'stock' && value === undefined) return 'El stock es obligatorio';
    if (field === 'sku' && !value) return 'El SKU es obligatorio';
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = 'El nombre es obligatorio';
    if (!formData.price || formData.price <= 0) newErrors.price = 'El precio debe ser mayor que 0';
    if (formData.stock === undefined) newErrors.stock = 'El stock es obligatorio';
    if (!formData.sku) newErrors.sku = 'El SKU es obligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    const error = validateField(field, value);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSave = async (publish: boolean = false) => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    // @todo: POST /api/products
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    router.push('/dashboard/productos');
  };

  const handleAddTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const handleCancel = () => {
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    setShowCancelDialog(false);
    router.push('/dashboard/productos');
  };

  const generateSku = () => {
    const prefix = formData.category.slice(0, 3).toUpperCase() || 'PRO';
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const sku = `${prefix}-${random}`;
    handleInputChange('sku', sku);
  };

  return (
    <div className="w-full">
      <div className="px-6 lg:px-8 py-4 border-b border-gray-200/50 bg-white/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-origen-bosque hover:bg-gray-100 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-origen-bosque">Nuevo producto</h1>
              <p className="text-xs text-gray-500 mt-0.5">Añade un producto a tu catálogo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Eye className="w-4 h-4" />}
              disabled
            >
              Vista previa
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Save className="w-4 h-4" />}
              onClick={() => handleSave(false)}
              disabled={isSaving || Object.keys(errors).length > 0}
            >
              Guardar borrador
            </Button>
            <Button
              size="sm"
              onClick={() => handleSave(true)}
              disabled={isSaving || Object.keys(errors).length > 0}
            >
              {isSaving ? 'Publicando...' : 'Publicar'}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 bg-white border border-gray-200/50 shadow-lg">
            <h2 className="text-lg font-semibold text-origen-bosque mb-4">Información básica</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Package className="w-4 h-4 text-origen-pradera" />
                  Nombre del producto <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ej: Queso Curado 6 meses"
                  className={cn(
                    "mt-1",
                    touched.name && errors.name && "border-red-500 focus:ring-red-500"
                  )}
                />
                {touched.name && errors.name && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Descripción</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe tu producto en detalle..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Categoría</label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => handleInputChange('category', v)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Quesos">Quesos</SelectItem>
                    <SelectItem value="Aceites">Aceites</SelectItem>
                    <SelectItem value="Mieles">Mieles</SelectItem>
                    <SelectItem value="Embutidos">Embutidos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200/50 shadow-lg">
            <h2 className="text-lg font-semibold text-origen-bosque mb-4">Precio y stock</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-origen-pradera" />
                  Precio (€) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  placeholder="24.50"
                  step="0.01"
                  min="0"
                  className={cn(
                    "mt-1",
                    touched.price && errors.price && "border-red-500 focus:ring-red-500"
                  )}
                />
                {touched.price && errors.price && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.price}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  Precio comparativa (€)
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </label>
                <Input
                  type="number"
                  value={formData.comparePrice || ''}
                  onChange={(e) => handleInputChange('comparePrice', parseFloat(e.target.value) || undefined)}
                  placeholder="29.90"
                  step="0.01"
                  min="0"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Coste (€)</label>
                <Input
                  type="number"
                  value={formData.cost || ''}
                  onChange={(e) => handleInputChange('cost', parseFloat(e.target.value) || undefined)}
                  placeholder="12.00"
                  step="0.01"
                  min="0"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  Stock <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                  placeholder="45"
                  min="0"
                  className={cn(
                    "mt-1",
                    touched.stock && errors.stock && "border-red-500 focus:ring-red-500"
                  )}
                />
                {touched.stock && errors.stock && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.stock}
                  </p>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200/50 shadow-lg">
            <h2 className="text-lg font-semibold text-origen-bosque mb-4">Identificación</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-origen-pradera" />
                  SKU <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={formData.sku}
                    onChange={(e) => handleInputChange('sku', e.target.value)}
                    placeholder="QUESO-001"
                    className={cn(
                      "flex-1",
                      touched.sku && errors.sku && "border-red-500 focus:ring-red-500"
                    )}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateSku}
                    className="whitespace-nowrap"
                  >
                    Generar
                  </Button>
                </div>
                {touched.sku && errors.sku && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.sku}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Código de barras</label>
                <Input
                  value={formData.barcode || ''}
                  onChange={(e) => handleInputChange('barcode', e.target.value)}
                  placeholder="8431234567890"
                  className="mt-1"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200/50 shadow-lg">
            <h2 className="text-lg font-semibold text-origen-bosque mb-4">Etiquetas</h2>
            
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <Badge key={tag} variant="outline" size="sm" className="bg-origen-crema/30">
                    {tag}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Añadir etiqueta..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button variant="outline" size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200/50 shadow-lg">
            <h2 className="text-lg font-semibold text-origen-bosque mb-4">Logística</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Peso (kg)</label>
                <Input
                  type="number"
                  value={formData.weight || ''}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || undefined)}
                  step="0.1"
                  min="0"
                  className="mt-1 w-48"
                  placeholder="Ej: 0.8"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Dimensiones (cm)</label>
                <div className="grid grid-cols-3 gap-3 max-w-md">
                  <Input
                    placeholder="Largo"
                    value={formData.dimensions?.length || ''}
                    onChange={(e) => handleInputChange('dimensions', {
                      ...formData.dimensions,
                      length: parseFloat(e.target.value) || undefined
                    })}
                  />
                  <Input
                    placeholder="Ancho"
                    value={formData.dimensions?.width || ''}
                    onChange={(e) => handleInputChange('dimensions', {
                      ...formData.dimensions,
                      width: parseFloat(e.target.value) || undefined
                    })}
                  />
                  <Input
                    placeholder="Alto"
                    value={formData.dimensions?.height || ''}
                    onChange={(e) => handleInputChange('dimensions', {
                      ...formData.dimensions,
                      height: parseFloat(e.target.value) || undefined
                    })}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200/50 shadow-lg">
            <h2 className="text-lg font-semibold text-origen-bosque mb-4">Imágenes</h2>
            
            <FileUpload
              value={formData.images}
              onChange={(files) => handleInputChange('images', files)}
              helperText="Arrastra imágenes o haz clic para subir (máx. 5MB)"
              accept="image/*"
              multiple={true}
              maxSize={5}
            />
          </Card>
        </div>
      </div>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar creación?</AlertDialogTitle>
            <AlertDialogDescription>
              Los datos introducidos se perderán permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuar editando</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel} className="bg-red-600 hover:bg-red-700">
              Descartar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}