/**
 * @page NuevoProductoPage
 * @description Formulario completo para crear un nuevo producto - Diseño Shopify
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
import { Checkbox } from '@/components/ui/checkbox';
import { CurrencyInput } from '@/components/ui/currency-input';
import { PercentageInput } from '@/components/ui/percentage-input';
import { ImageUploader, type ImageFile } from '@/components/ui/image-uploader';
import { PriceTierCard } from '@/components/ui/price-tier-card';
import { AttributeCard } from '@/components/ui/attribute-card';

import {
  type Product,
  type ProductImage,
  type PriceTier,
  type ProductAttribute,
  type NutritionalInfo,
  type ProductionInfo,
  type SEOInfo,
  PRODUCT_CATEGORIES,
  SUBCATEGORIES,
  PRODUCTION_METHODS,
  ALLERGENS,
  SHIPPING_CLASSES,
  PRODUCT_STATUS,
  VISIBILITY_OPTIONS,
} from '@/types/product';

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
  Camera,
  FileText,
  Scale,
  Ruler,
  Truck,
  Leaf,
  FlaskConical,
  ShoppingBag,
  Globe,
  Hash,
  Calendar,
  MapPin,
  User,
  Clock,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Copy,
  Trash2,
  Settings,
  AlertCircle,
  Info
} from 'lucide-react';

// ============================================================================
// COMPONENTE SECTION HEADER
// ============================================================================

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  badge?: string;
  action?: React.ReactNode;
}

const SectionHeader = ({ title, description, icon, badge, action }: SectionHeaderProps) => (
  <div className="flex items-start justify-between mb-6">
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-origen-pradera/10 flex items-center justify-center mt-0.5">
        {icon}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-origen-bosque">{title}</h2>
          {badge && (
            <Badge variant="outline" size="xs" className="bg-origen-crema/50">
              {badge}
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </div>
    {action && (
      <div className="flex-shrink-0">
        {action}
      </div>
    )}
  </div>
);

// ============================================================================
// COMPONENTE INFO TOOLTIP
// ============================================================================

interface InfoTooltipProps {
  text: string;
}

const InfoTooltip = ({ text }: InfoTooltipProps) => (
  <div className="group relative inline-block">
    <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
      {text}
      <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-gray-900 rotate-45" />
    </div>
  </div>
);

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function NuevoProductoPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    pricing: true,
    inventory: true,
    shipping: false,
    nutrition: false,
    production: false,
    attributes: false,
    seo: false,
  });

  // Estado del formulario
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    shortDescription: '',
    fullDescription: '',
    categoryId: '',
    subcategoryId: '',
    tags: [],
    basePrice: 0,
    comparePrice: undefined,
    cost: undefined,
    priceTiers: [],
    sku: '',
    barcode: '',
    stock: 0,
    lowStockThreshold: 5,
    trackInventory: true,
    gallery: [],
    nutritionalInfo: {
      servingSize: '',
      allergens: [],
      ingredients: [],
    },
    productionInfo: {},
    attributes: [],
    weight: undefined,
    dimensions: undefined,
    shippingClass: 'standard',
    status: 'draft',
    visibility: 'public',
    seo: {
      title: '',
      description: '',
      keywords: [],
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Handlers
  const handleInputChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validaciones
    if (field === 'name' && !value) {
      setErrors(prev => ({ ...prev, name: 'El nombre es obligatorio' }));
    } else if (field === 'basePrice' && value <= 0) {
      setErrors(prev => ({ ...prev, basePrice: 'El precio debe ser mayor que 0' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNestedChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof Product] as any),
        [field]: value
      }
    }));
  };

  const handleAddPriceTier = () => {
    const newTier: PriceTier = {
      id: `tier-${Date.now()}`,
      minQuantity: 2,
      type: 'percentage',
      value: 10,
    };
    setFormData(prev => ({
      ...prev,
      priceTiers: [...(prev.priceTiers || []), newTier]
    }));
  };

  const handleUpdatePriceTier = (index: number, field: keyof PriceTier, value: any) => {
    setFormData(prev => ({
      ...prev,
      priceTiers: prev.priceTiers?.map((tier, i) => 
        i === index ? { ...tier, [field]: value } : tier
      )
    }));
  };

  const handleRemovePriceTier = (index: number) => {
    setFormData(prev => ({
      ...prev,
      priceTiers: prev.priceTiers?.filter((_, i) => i !== index)
    }));
  };

  const handleAddAttribute = () => {
    const newAttribute: ProductAttribute = {
      id: `attr-${Date.now()}`,
      name: '',
      value: '',
      type: 'text',
      visible: true,
    };
    setFormData(prev => ({
      ...prev,
      attributes: [...(prev.attributes || []), newAttribute]
    }));
  };

  const handleUpdateAttribute = (index: number, field: keyof ProductAttribute, value: any) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes?.map((attr, i) => 
        i === index ? { ...attr, [field]: value } : attr
      )
    }));
  };

  const handleRemoveAttribute = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes?.filter((_, i) => i !== index)
    }));
  };

  const handleAddTag = (tag: string) => {
    if (tag && !formData.tags?.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag]
      }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag)
    }));
  };

  const handleImagesChange = (files: ImageFile[]) => {
    const gallery: ProductImage[] = files.map(f => ({
      id: f.id,
      url: f.preview,
      isMain: f.isMain || false,
      sortOrder: f.sortOrder,
    }));
    handleInputChange('gallery', gallery);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // @todo: POST /api/products
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    router.push('/dashboard/productos');
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const generateSku = () => {
    const prefix = formData.categoryId?.slice(0, 3).toUpperCase() || 'PRO';
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const sku = `${prefix}-${random}`;
    handleInputChange('sku', sku);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Barra superior fija - Estilo Shopify */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCancelDialog(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="h-6 w-px bg-gray-200" />
              <h1 className="text-lg font-semibold text-gray-900">Nuevo producto</h1>
              <Badge variant="outline" size="sm" className="ml-2">
                Borrador
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('/preview', '_blank')}
                leftIcon={<Eye className="w-4 h-4" />}
              >
                Vista previa
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Save className="w-4 h-4" />}
                onClick={() => handleSave()}
                disabled={isSaving}
              >
                Guardar borrador
              </Button>
              <Button
                size="sm"
                onClick={() => handleSave()}
                disabled={isSaving}
                className="bg-origen-bosque hover:bg-origen-pino"
              >
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna principal - 2/3 del ancho */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Información básica */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <SectionHeader
                title="Información básica"
                icon={<Package className="w-5 h-5 text-origen-pradera" />}
              />
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    Título del producto <span className="text-red-500">*</span>
                    <InfoTooltip text="El título debe ser descriptivo e incluir palabras clave relevantes" />
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ej: Queso Curado Artesanal 6 meses"
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
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    Descripción corta
                    <InfoTooltip text="Breve descripción que aparece en las listas de productos" />
                  </label>
                  <Input
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    placeholder="Máximo 160 caracteres"
                    className="mt-1"
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {formData.shortDescription?.length || 0}/160
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Descripción completa</label>
                  <Textarea
                    value={formData.fullDescription}
                    onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                    placeholder="Describe tu producto en detalle..."
                    className="mt-1 min-h-[200px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Categoría</label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(v) => {
                        handleInputChange('categoryId', v);
                        handleInputChange('subcategoryId', undefined);
                      }}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRODUCT_CATEGORIES.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>
                            <span className="flex items-center gap-2">
                              <span>{cat.icon}</span>
                              <span>{cat.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Subcategoría</label>
                    <Select
                      value={formData.subcategoryId}
                      onValueChange={(v) => handleInputChange('subcategoryId', v)}
                      disabled={!formData.categoryId}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={formData.categoryId ? "Seleccionar" : "Primero elige categoría"} />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.categoryId && SUBCATEGORIES[formData.categoryId as keyof typeof SUBCATEGORIES]?.map(sub => (
                          <SelectItem key={sub.id} value={sub.id}>
                            {sub.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Etiquetas</label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-3">
                    {formData.tags?.map(tag => (
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
              </div>
            </Card>

            {/* Imágenes */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <ImageUploader
                value={formData.gallery?.map((img, index) => ({
                  id: img.id,
                  file: null as any, // Se reemplazará con el archivo real
                  preview: img.url,
                  isMain: img.isMain,
                  sortOrder: index,
                })) || []}
                onChange={handleImagesChange}
                maxFiles={10}
                maxSize={5}
                recommendedSize="1200x1200px"
                acceptedFormats={['jpg', 'jpeg', 'png', 'webp']}
                seoNote="Las imágenes que cumplen con las recomendaciones (1200x1200px, formato JPG/PNG, peso máximo 5MB) tienen hasta un 40% más de probabilidad de aparecer en las primeras posiciones de búsqueda."
              />
            </Card>

            {/* Precios - Colapsable */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <button
                onClick={() => toggleSection('pricing')}
                className="w-full flex items-center justify-between"
              >
                <SectionHeader
                  title="Precios"
                  description="Configura el precio base y descuentos por cantidad"
                  icon={<DollarSign className="w-5 h-5 text-origen-pradera" />}
                />
                {expandedSections.pricing ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedSections.pricing && (
                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <CurrencyInput
                      label="Precio base"
                      value={formData.basePrice}
                      onChange={(v) => handleInputChange('basePrice', v)}
                      icon={<Tag className="w-4 h-4" />}
                      min={0}
                      error={touched.basePrice && errors.basePrice ? errors.basePrice : undefined}
                    />
                    
                    <CurrencyInput
                      label="Precio comparativa"
                      value={formData.comparePrice || 0}
                      onChange={(v) => handleInputChange('comparePrice', v || undefined)}
                      icon={<Tag className="w-4 h-4" />}
                      min={0}
                      helperText="Precio de referencia"
                    />

                    <CurrencyInput
                      label="Coste"
                      value={formData.cost || 0}
                      onChange={(v) => handleInputChange('cost', v || undefined)}
                      icon={<DollarSign className="w-4 h-4" />}
                      min={0}
                      helperText="Para calcular márgenes"
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-700">Descuentos por cantidad</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddPriceTier}
                        leftIcon={<Plus className="w-4 h-4" />}
                      >
                        Añadir tramo
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {formData.priceTiers?.map((tier, index) => (
                        <PriceTierCard
                          key={tier.id}
                          tier={tier}
                          index={index}
                          onUpdate={handleUpdatePriceTier}
                          onRemove={handleRemovePriceTier}
                        />
                      ))}
                      
                      {(!formData.priceTiers || formData.priceTiers.length === 0) && (
                        <p className="text-sm text-gray-400 text-center py-4 bg-gray-50 rounded-lg">
                          No hay descuentos por cantidad configurados
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Inventario - Colapsable */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <button
                onClick={() => toggleSection('inventory')}
                className="w-full flex items-center justify-between"
              >
                <SectionHeader
                  title="Inventario"
                  description="Gestiona el stock y la identificación del producto"
                  icon={<ShoppingBag className="w-5 h-5 text-origen-pradera" />}
                />
                {expandedSections.inventory ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedSections.inventory && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        SKU
                        <InfoTooltip text="Código único para identificar el producto" />
                      </label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          value={formData.sku}
                          onChange={(e) => handleInputChange('sku', e.target.value)}
                          placeholder="QUESO-001"
                          className="flex-1"
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Stock actual</label>
                      <Input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                        min={0}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Stock mínimo</label>
                      <Input
                        type="number"
                        value={formData.lowStockThreshold}
                        onChange={(e) => handleInputChange('lowStockThreshold', parseInt(e.target.value) || 0)}
                        min={0}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Checkbox
                      id="trackInventory"
                      checked={formData.trackInventory}
                      onCheckedChange={(checked) => handleInputChange('trackInventory', checked)}
                    />
                    <label htmlFor="trackInventory" className="text-sm text-gray-700">
                      Controlar inventario
                    </label>
                  </div>
                </div>
              )}
            </Card>

            {/* Logística - Colapsable */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full flex items-center justify-between"
              >
                <SectionHeader
                  title="Logística"
                  description="Dimensiones, peso y opciones de envío"
                  icon={<Truck className="w-5 h-5 text-origen-pradera" />}
                  badge="Opcional"
                />
                {expandedSections.shipping ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedSections.shipping && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Peso (kg)</label>
                      <Input
                        type="number"
                        value={formData.weight || ''}
                        onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || undefined)}
                        step={0.1}
                        min={0}
                        className="mt-1"
                        placeholder="Ej: 0.8"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Clase de envío</label>
                      <Select
                        value={formData.shippingClass}
                        onValueChange={(v) => handleInputChange('shippingClass', v)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {SHIPPING_CLASSES.map(sc => (
                            <SelectItem key={sc.id} value={sc.id}>{sc.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Dimensiones (cm)</label>
                    <div className="grid grid-cols-3 gap-3">
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
              )}
            </Card>

            {/* Información nutricional - Colapsable */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <button
                onClick={() => toggleSection('nutrition')}
                className="w-full flex items-center justify-between"
              >
                <SectionHeader
                  title="Información nutricional"
                  description="Para productos alimenticios"
                  icon={<FlaskConical className="w-5 h-5 text-origen-pradera" />}
                  badge="Opcional"
                />
                {expandedSections.nutrition ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedSections.nutrition && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Tamaño por ración</label>
                      <Input
                        value={formData.nutritionalInfo?.servingSize || ''}
                        onChange={(e) => handleNestedChange('nutritionalInfo', 'servingSize', e.target.value)}
                        placeholder="Ej: 100g"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Raciones por envase</label>
                      <Input
                        type="number"
                        value={formData.nutritionalInfo?.servingsPerContainer || ''}
                        onChange={(e) => handleNestedChange('nutritionalInfo', 'servingsPerContainer', parseInt(e.target.value) || undefined)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Calorías (kcal)</label>
                      <Input
                        type="number"
                        value={formData.nutritionalInfo?.calories || ''}
                        onChange={(e) => handleNestedChange('nutritionalInfo', 'calories', parseInt(e.target.value) || undefined)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Proteínas (g)</label>
                      <Input
                        type="number"
                        value={formData.nutritionalInfo?.protein || ''}
                        onChange={(e) => handleNestedChange('nutritionalInfo', 'protein', parseFloat(e.target.value) || undefined)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Ingredientes</label>
                    <Textarea
                      value={formData.nutritionalInfo?.ingredients?.join(', ') || ''}
                      onChange={(e) => handleNestedChange('nutritionalInfo', 'ingredients', e.target.value.split(',').map(i => i.trim()))}
                      placeholder="Lista de ingredientes separados por comas"
                      className="mt-1 min-h-[80px]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Alérgenos</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {ALLERGENS.map(allergen => (
                        <label key={allergen} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                          <Checkbox
                            checked={formData.nutritionalInfo?.allergens?.includes(allergen)}
                            onCheckedChange={(checked) => {
                              const current = formData.nutritionalInfo?.allergens || [];
                              const updated = checked 
                                ? [...current, allergen]
                                : current.filter(a => a !== allergen);
                              handleNestedChange('nutritionalInfo', 'allergens', updated);
                            }}
                          />
                          <span className="text-sm text-gray-700">{allergen}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Información de producción - Colapsable */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <button
                onClick={() => toggleSection('production')}
                className="w-full flex items-center justify-between"
              >
                <SectionHeader
                  title="Información de producción"
                  description="Detalles sobre el origen y elaboración"
                  icon={<Leaf className="w-5 h-5 text-origen-pradera" />}
                  badge="Opcional"
                />
                {expandedSections.production ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedSections.production && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Origen</label>
                      <Input
                        value={formData.productionInfo?.origin || ''}
                        onChange={(e) => handleNestedChange('productionInfo', 'origin', e.target.value)}
                        placeholder="Ej: Toledo, España"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Nombre de la finca</label>
                      <Input
                        value={formData.productionInfo?.farmName || ''}
                        onChange={(e) => handleNestedChange('productionInfo', 'farmName', e.target.value)}
                        placeholder="Ej: Finca El Valle"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Método de producción</label>
                    <Select
                      value={formData.productionInfo?.productionMethod}
                      onValueChange={(v) => handleNestedChange('productionInfo', 'productionMethod', v)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRODUCTION_METHODS.map(method => (
                          <SelectItem key={method} value={method}>{method}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Historia del productor</label>
                    <Textarea
                      value={formData.productionInfo?.story || ''}
                      onChange={(e) => handleNestedChange('productionInfo', 'story', e.target.value)}
                      placeholder="Comparte la historia detrás de este producto..."
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                </div>
              )}
            </Card>

            {/* Atributos personalizados - Colapsable */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <SectionHeader
                  title="Atributos personalizados"
                  description="Añade características específicas del producto"
                  icon={<Settings className="w-5 h-5 text-origen-pradera" />}
                  badge="Opcional"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddAttribute}
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Añadir atributo
                </Button>
              </div>

              <div className="space-y-3">
                {formData.attributes?.map((attr, index) => (
                  <AttributeCard
                    key={attr.id}
                    attribute={attr}
                    index={index}
                    onUpdate={handleUpdateAttribute}
                    onRemove={handleRemoveAttribute}
                  />
                ))}
                
                {(!formData.attributes || formData.attributes.length === 0) && (
                  <p className="text-sm text-gray-400 text-center py-4 bg-gray-50 rounded-lg">
                    No hay atributos personalizados
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Columna lateral - 1/3 del ancho */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Estado y visibilidad */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <h3 className="text-sm font-medium text-gray-700 mb-4">ESTADO Y VISIBILIDAD</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-2">Estado</label>
                  <Select
                    value={formData.status}
                    onValueChange={(v) => handleInputChange('status', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_STATUS.map(status => (
                        <SelectItem key={status.id} value={status.id}>{status.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-2">Visibilidad</label>
                  <Select
                    value={formData.visibility}
                    onValueChange={(v) => handleInputChange('visibility', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {VISIBILITY_OPTIONS.map(opt => (
                        <SelectItem key={opt.id} value={opt.id}>{opt.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Creado: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>

            {/* SEO - Resumen */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
              <h3 className="text-sm font-medium text-gray-700 mb-4">OPTIMIZACIÓN SEO</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Título SEO</label>
                  <Input
                    value={formData.seo?.title || ''}
                    onChange={(e) => handleNestedChange('seo', 'title', e.target.value)}
                    placeholder="Título para buscadores"
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">Meta descripción</label>
                  <Textarea
                    value={formData.seo?.description || ''}
                    onChange={(e) => handleNestedChange('seo', 'description', e.target.value)}
                    placeholder="Breve descripción para resultados de búsqueda"
                    className="min-h-[60px] text-sm"
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {formData.seo?.description?.length || 0}/160
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-1">Palabras clave</label>
                  <Input
                    value={formData.seo?.keywords?.join(', ') || ''}
                    onChange={(e) => handleNestedChange('seo', 'keywords', e.target.value.split(',').map(k => k.trim()))}
                    placeholder="ejemplo, palabras, clave"
                    className="text-sm"
                  />
                </div>
              </div>
            </Card>

            {/* Resumen de precios */}
            <Card className="p-6 bg-origen-crema/30 border border-origen-pradera/20 shadow-sm">
              <h3 className="text-sm font-medium text-origen-bosque mb-4">RESUMEN</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Precio base:</span>
                  <span className="font-semibold text-origen-pradera">
                    {formData.basePrice?.toFixed(2)}€
                  </span>
                </div>
                {formData.comparePrice && formData.comparePrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Comparativa:</span>
                    <span className="text-gray-400 line-through">
                      {formData.comparePrice?.toFixed(2)}€
                    </span>
                  </div>
                )}
                {formData.cost && formData.cost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Margen:</span>
                    <span className="font-medium text-green-600">
                      {(((formData.basePrice - (formData.cost || 0)) / formData.basePrice) * 100).toFixed(1)}%
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-origen-pradera/20">
                  <span className="text-gray-600">Stock:</span>
                  <span className={cn(
                    "font-medium",
                    formData.stock === 0 ? "text-red-600" : "text-gray-900"
                  )}>
                    {formData.stock} unidades
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Diálogo de cancelación */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Descartar cambios?</AlertDialogTitle>
            <AlertDialogDescription>
              Los datos no guardados se perderán permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuar editando</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push('/dashboard/productos')} className="bg-red-600 hover:bg-red-700">
              Descartar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}