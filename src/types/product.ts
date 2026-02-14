/**
 * @file product.ts
 * @description Tipos completos para la gestión de productos
 */

import { type UploadedFile } from '@/components/forms/FileUpload';

// ============================================================================
// TIPOS PRINCIPALES
// ============================================================================

export interface Product {
  // Información básica
  id: string;
  producerId: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  
  // Categorización
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  tags: string[];
  
  // Imágenes
  mainImage?: ProductImage;
  gallery: ProductImage[];
  
  // Precios
  basePrice: number;
  comparePrice?: number;
  cost?: number;
  priceTiers: PriceTier[];
  
  // Inventario
  sku: string;
  barcode?: string;
  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  
  // Información nutricional (para alimentos)
  nutritionalInfo?: NutritionalInfo;
  
  // Certificaciones
  certifications: ProductCertification[];
  
  // Información de producción
  productionInfo?: ProductionInfo;
  
  // Atributos dinámicos
  attributes: ProductAttribute[];
  
  // Información de envío
  weight?: number;
  dimensions?: Dimensions;
  shippingClass?: string;
  
  // Estado y visibilidad
  status: 'draft' | 'active' | 'inactive' | 'out_of_stock';
  visibility: 'public' | 'private' | 'password';
  publishedAt?: Date;
  
  // SEO
  seo: SEOInfo;
  
  // Fechas
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// TIPOS DE IMÁGENES
// ============================================================================

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  caption?: string;
  isMain: boolean;
  sortOrder: number;
  file?: UploadedFile; // Para el formulario de subida
}

// ============================================================================
// TIPOS DE PRECIOS Y DESCUENTOS
// ============================================================================

export interface PriceTier {
  id: string;
  minQuantity: number;
  maxQuantity?: number;
  type: 'fixed' | 'percentage';
  value: number; // Precio fijo o porcentaje de descuento
  label?: string;
}

// ============================================================================
// TIPOS DE INFORMACIÓN NUTRICIONAL
// ============================================================================

export interface NutritionalInfo {
  servingSize: string;
  servingsPerContainer?: number;
  calories?: number;
  totalFat?: number;
  saturatedFat?: number;
  transFat?: number;
  cholesterol?: number;
  sodium?: number;
  totalCarbohydrates?: number;
  dietaryFiber?: number;
  sugars?: number;
  addedSugars?: number;
  protein?: number;
  vitamins?: VitaminInfo[];
  allergens: string[];
  ingredients: string[];
  preparationInstructions?: string;
  storageInstructions?: string;
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
  certificationId: string; // ID de la certificación general
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

export interface ProductionInfo {
  producerNotes?: string;
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
  story?: string;
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
// TIPOS DE SEO
// ============================================================================

export interface SEOInfo {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

// ============================================================================
// TIPOS PARA EL FORMULARIO
// ============================================================================

export interface ProductFormData extends Omit<Product, 'id' | 'producerId' | 'createdAt' | 'updatedAt' | 'slug'> {
  // Versión del formulario con campos opcionales
  mainImage?: ProductImage;
  gallery: ProductImage[];
  priceTiers: PriceTier[];
  certifications: ProductCertification[];
  attributes: ProductAttribute[];
  nutritionalInfo?: NutritionalInfo;
  productionInfo?: ProductionInfo;
  seo: SEOInfo;
}

// ============================================================================
// CONSTANTES
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

export const SUBCATEGORIES: Record<string, { id: string; name: string }[]> = {
  quesos: [
    { id: 'curado', name: 'Curado' },
    { id: 'semicurado', name: 'Semicurado' },
    { id: 'fresco', name: 'Fresco' },
    { id: 'azul', name: 'Azul' },
    { id: 'cabra', name: 'De cabra' },
    { id: 'oveja', name: 'De oveja' },
  ],
  aceites: [
    { id: 'virgen-extra', name: 'Virgen Extra' },
    { id: 'virgen', name: 'Virgen' },
    { id: 'arbequina', name: 'Arbequina' },
    { id: 'picual', name: 'Picual' },
    { id: 'hojiblanca', name: 'Hojiblanca' },
  ],
  vinos: [
    { id: 'tinto', name: 'Tinto' },
    { id: 'blanco', name: 'Blanco' },
    { id: 'rosado', name: 'Rosado' },
    { id: 'cava', name: 'Cava' },
    { id: 'dulce', name: 'Dulce' },
  ],
};

export const PRODUCTION_METHODS = [
  'Agricultura ecológica',
  'Agricultura biodinámica',
  'Agricultura regenerativa',
  'Producción integrada',
  'Artesanal tradicional',
  'Industrial',
  'Sin procesar',
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

export const SHIPPING_CLASSES = [
  { id: 'standard', name: 'Estándar' },
  { id: 'heavy', name: 'Pesado' },
  { id: 'fragile', name: 'Frágil' },
  { id: 'perishable', name: 'Perecedero' },
  { id: 'cold', name: 'Frío' },
];

export const PRODUCT_STATUS = [
  { id: 'draft', name: 'Borrador' },
  { id: 'active', name: 'Activo' },
  { id: 'inactive', name: 'Inactivo' },
  { id: 'out_of_stock', name: 'Sin stock' },
];

export const VISIBILITY_OPTIONS = [
  { id: 'public', name: 'Público' },
  { id: 'private', name: 'Privado' },
  { id: 'password', name: 'Protegido con contraseña' },
];