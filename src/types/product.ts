/**
 * @file product.ts
 * @description Tipos completos para la gestión de productos (UNIFICADO Y CORREGIDO)
 */

import { type UploadedFile } from '@/components/forms/FileUpload';

// ============================================================================
// TIPO ÚNICO DE IMAGEN - SIRVE PARA TODO
// ============================================================================

export interface ProductImage {
  /** ID único de la imagen */
  id: string;
  
  /** URL de la imagen (puede ser blob: temporal o https:// definitiva) */
  url: string;
  
  /** Texto alternativo para accesibilidad */
  alt?: string;
  
  /** Título o descripción corta */
  caption?: string;
  
  /** Indica si es la imagen principal del producto */
  isMain: boolean;
  
  /** Orden para la galería */
  sortOrder: number;
  
  /** Archivo original (solo durante la subida, null después) */
  file?: File | null;
  
  /** Progreso de subida (0-100) */
  progress?: number;
  
  /** Indica si se está subiendo */
  uploading?: boolean;
  
  /** Mensaje de error si la subida falló */
  error?: string;
  
  /** Ancho de la imagen en píxeles */
  width?: number;
  
  /** Alto de la imagen en píxeles */
  height?: number;
  
  /** Tamaño del archivo en bytes */
  size?: number;
  
  /** Tipo MIME del archivo */
  type?: string;
}

// ============================================================================
// TIPOS DE PRECIOS Y DESCUENTOS
// ============================================================================

export interface PriceTier {
  id: string;
  minQuantity: number;
  maxQuantity?: number;
  type: 'fixed' | 'percentage' | 'bundle';
  value?: number;
  buyQuantity?: number;
  payQuantity?: number;
  label?: string;
}

// ============================================================================
// TIPOS DE INFORMACIÓN NUTRICIONAL
// ============================================================================

export interface NutritionalInfo {
  servingSize: string;
  servingSizeValue?: number;
  servingSizeUnit?: string;
  calories?: number;
  protein?: number;
  totalFat?: number;
  saturatedFat?: number;
  transFat?: number;
  cholesterol?: number;
  sodium?: number;
  carbohydrates?: number;
  dietaryFiber?: number;
  sugars?: number;
  addedSugars?: number;
  vitamins?: VitaminInfo[];
  allergens: string[];
  mayContain?: string[];
  ingredients: string[];
  preparationInstructions?: string;
  storageInstructions?: string;
  isGlutenFree?: boolean;
  isLactoseFree?: boolean;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isNutFree?: boolean;
  isEggFree?: boolean;
  isSoyFree?: boolean;
}

export interface VitaminInfo {
  name: string;
  amount: number;
  unit: string;
  dailyValue?: number;
}

// ============================================================================
// TIPOS DE CERTIFICACIONES
// ============================================================================

export interface ProductCertification {
  id: string;
  certificationId: string;
  name: string;
  issuingBody: string;
  logo?: string;
  verified: boolean;
  expiryDate?: Date;
  documentUrl?: string;
}

// ============================================================================
// TIPOS DE INFORMACIÓN DE PRODUCCIÓN
// ============================================================================

export interface ProductionMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption?: string;
  thumbnail?: string;
}

export interface ProductionInfo {
  story?: string;
  origin?: string;
  farmName?: string;
  producerName?: string;
  harvestDate?: Date;
  productionDate?: Date;
  expiryDate?: Date;
  batchNumber?: string;
  productionMethod?: string;
  sustainabilityInfo?: string;
  animalWelfare?: string;
  artisanProcess?: string;
  practices?: string[];
  media?: ProductionMedia[];
}

// ============================================================================
// TIPOS DE ATRIBUTOS DINÁMICOS
// ============================================================================

export interface ProductAttribute {
  id: string;
  name: string;
  value: string | number | boolean;
  type: 'text' | 'number' | 'boolean' | 'date' | 'select';
  unit?: string;
  visible: boolean;
}

// ============================================================================
// TIPOS DE DIMENSIONES
// ============================================================================

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'm';
}

// ============================================================================
// TIPO PRODUCTO PRINCIPAL
// ============================================================================

export interface Product {
  id: string;
  producerId: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  tags: string[];
  mainImage?: ProductImage;
  gallery: ProductImage[];
  basePrice: number; // ← En el producto guardado SIEMPRE es number
  comparePrice?: number;
  priceTiers: PriceTier[];
  sku: string;
  barcode?: string;
  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorders?: boolean;
  weight?: number;
  weightUnit?: 'kg' | 'g';
  dimensions?: Dimensions;
  shippingClass?: string;
  nutritionalInfo?: NutritionalInfo;
  certifications: ProductCertification[];
  productionInfo?: ProductionInfo;
  attributes: ProductAttribute[];
  status: 'draft' | 'active' | 'inactive' | 'out_of_stock';
  visibility: 'public' | 'private' | 'password';
  publishedAt?: Date;
  sales?: number;
  revenue?: number;
  rating?: number;
  reviewCount?: number;
  views?: number;
  conversion?: number;
  createdAt: Date;
  updatedAt: Date;
  lastOrderDate?: Date;
}

// ============================================================================
// TIPO PARA FORMULARIO DE CREACIÓN - CORREGIDO
// ============================================================================

export type ProductFormData = {
  // Información básica
  name: string;
  shortDescription: string;
  fullDescription: string;
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  tags: string[];
  
  // Imágenes
  mainImage?: ProductImage;
  gallery: ProductImage[];
  
  // Precios - EN EL FORMULARIO PUEDEN SER UNDEFINED
  basePrice?: number;        // ← CORREGIDO: explícitamente opcional
  comparePrice?: number;     // ← CORREGIDO: explícitamente opcional
  priceTiers: PriceTier[];
  
  // Inventario
  sku: string;
  barcode?: string;
  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorders?: boolean;
  weight?: number;
  weightUnit?: 'kg' | 'g';
  dimensions?: Dimensions;
  shippingClass?: string;
  
  // Información nutricional
  nutritionalInfo?: NutritionalInfo;
  
  // Certificaciones
  certifications: ProductCertification[];
  
  // Información de producción
  productionInfo?: ProductionInfo;
  
  // Atributos dinámicos
  attributes: ProductAttribute[];
  
  // Estado - específico del formulario
  status: 'draft' | 'pending_approval' | 'active' | 'scheduled';
  visibility: 'public' | 'private' | 'password';
};

// ============================================================================
// CONSTANTES
// ============================================================================

export const FORM_STEPS = [
  { id: 'basic', label: 'Básico', icon: 'Package' },
  { id: 'images', label: 'Imágenes', icon: 'Camera' },
  { id: 'pricing', label: 'Precios', icon: 'DollarSign' },
  { id: 'nutritional', label: 'Nutricional', icon: 'FlaskConical' },
  { id: 'production', label: 'Producción', icon: 'Leaf' },
  { id: 'inventory', label: 'Inventario', icon: 'ShoppingBag' },
  { id: 'certifications', label: 'Certificaciones', icon: 'Award' },
] as const;

export type FormStepId = typeof FORM_STEPS[number]['id'];

// ============================================================================
// VALORES POR DEFECTO PARA EL FORMULARIO
// ============================================================================

export const defaultNutritionalInfo: NutritionalInfo = {
  servingSize: '100g',
  servingSizeValue: 100,
  servingSizeUnit: 'g',
  calories: undefined,
  protein: undefined,
  totalFat: undefined,
  saturatedFat: undefined,
  transFat: undefined,
  cholesterol: undefined,
  sodium: undefined,
  carbohydrates: undefined,
  dietaryFiber: undefined,
  sugars: undefined,
  addedSugars: undefined,
  vitamins: [],
  allergens: [],
  mayContain: [],
  ingredients: [],
  preparationInstructions: '',
  storageInstructions: '',
  isGlutenFree: false,
  isLactoseFree: false,
  isVegan: false,
  isVegetarian: false,
  isNutFree: false,
  isEggFree: false,
  isSoyFree: false,
};

export const defaultProductionInfo: ProductionInfo = {
  story: '',
  farmName: '',
  origin: '',
  productionMethod: '',
  harvestDate: undefined,
  productionDate: undefined,
  expiryDate: undefined,
  batchNumber: '',
  sustainabilityInfo: '',
  animalWelfare: '',
  artisanProcess: '',
  practices: [],
  media: [],
};

export const defaultFormData: ProductFormData = {
  name: '',
  shortDescription: '',
  fullDescription: '',
  categoryId: '',
  categoryName: '',
  subcategoryId: '',
  tags: [],
  mainImage: undefined,
  gallery: [],
  basePrice: undefined,
  comparePrice: undefined,
  priceTiers: [],
  sku: '',
  barcode: '',
  stock: 0,
  lowStockThreshold: 5,
  trackInventory: true,
  allowBackorders: false,
  weight: undefined,
  weightUnit: 'kg',
  dimensions: undefined,
  shippingClass: '',
  nutritionalInfo: defaultNutritionalInfo,
  certifications: [],
  productionInfo: defaultProductionInfo,
  attributes: [],
  status: 'draft',
  visibility: 'private',
};

// ============================================================================
// FUNCIÓN UTILITARIA PARA CONVERTIR FORMULARIO A PRODUCTO
// ============================================================================

/**
 * Convierte los datos del formulario a un producto válido para la API
 * Asigna valores por defecto a los campos opcionales que son requeridos en Product
 */
export function formDataToProduct(formData: ProductFormData, producerId: string): Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    ...formData,
    producerId,
    slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
    basePrice: formData.basePrice || 0,  // ← Convertimos undefined a 0
    status: formData.status === 'pending_approval' ? 'draft' : 
            formData.status === 'scheduled' ? 'draft' : 
            formData.status as any,
    publishedAt: formData.status === 'active' ? new Date() : undefined,
    sales: 0,
    revenue: 0,
    rating: 0,
    reviewCount: 0,
    views: 0,
    conversion: 0,
  };
}

// ============================================================================
// CONSTANTES COMPARTIDAS
// ============================================================================

export const PRODUCT_CATEGORIES = [
  { id: 'quesos', name: 'Quesos', icon: '🧀' },
  { id: 'aceites', name: 'Aceites', icon: '🫒' },
  { id: 'vinos', name: 'Vinos', icon: '🍷' },
  { id: 'embutidos', name: 'Embutidos', icon: '🥩' },
  { id: 'mieles', name: 'Mieles', icon: '🍯' },
  { id: 'conservas', name: 'Conservas', icon: '🥫' },
  { id: 'panaderia', name: 'Panadería', icon: '🍞' },
  { id: 'dulces', name: 'Dulces y Postres', icon: '🍰' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
  { id: 'otros', name: 'Otros', icon: '📦' },
];

export const ALLERGENS = [
  'Gluten',
  'Crustáceos',
  'Huevos',
  'Pescado',
  'Cacahuetes',
  'Soja',
  'Lácteos',
  'Frutos de cáscara',
  'Apio',
  'Mostaza',
  'Sésamo',
  'Sulfitos',
  'Altramuces',
  'Moluscos',
];