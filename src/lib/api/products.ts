/**
 * @file products.ts
 * @description Llamadas a la API para la gestión de productos (UNIFICADA)
 */

import { type Product, type ProductFormData } from '@/types/product';
import { MOCK_PRODUCTS } from './products_data';

// ============================================================================
// TIPOS DE RESPUESTA
// ============================================================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResponse {
  valid: boolean;
  errors: ValidationError[];
}

export interface CreateProductResponse {
  product: Product;
  redirectUrl: string;
}

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

/**
 * Simula un retardo de red
 */
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Genera un ID único para el producto (BACKEND)
 */
const generateProductId = (): string => {
  return `prod-${Math.random().toString(36).substring(2, 10)}`;
};

/**
 * Genera un SKU único basado en el nombre y categoría (BACKEND)
 */
const generateSku = (productName: string, categoryId: string): string => {
  const categoryPrefix = {
    quesos: 'QUE',
    aceites: 'ACE',
    vinos: 'VIN',
    embutidos: 'EMB',
    mieles: 'MIE',
    panaderia: 'PAN',
    conservas: 'CON',
    dulces: 'DUL',
    bebidas: 'BEB',
    otros: 'PRO',
  }[categoryId] || 'PRO';

  const nameParts = productName
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z0-9]/g, ' ')
    .split(' ')
    .filter(part => part.length > 0);

  let nameCode = '';
  if (nameParts.length === 1) {
    nameCode = nameParts[0].substring(0, 3);
  } else {
    nameCode = nameParts.map(p => p[0]).join('').substring(0, 3);
  }

  if (nameCode.length < 2) {
    nameCode = (nameCode + 'XX').substring(0, 3);
  }

  const sequential = Math.floor(100 + Math.random() * 900);
  return `${categoryPrefix}-${nameCode}-${sequential}`;
};

/**
 * Genera un slug a partir del nombre
 */
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

// ============================================================================
// VALIDACIONES
// ============================================================================

/**
 * Valida los datos del formulario antes de enviar
 */
export const validateProductForm = (formData: ProductFormData): ValidationResponse => {
  const errors: ValidationError[] = [];

  if (!formData.name || formData.name.trim().length < 5) {
    errors.push({ field: 'name', message: 'El nombre debe tener al menos 5 caracteres' });
  } else if (formData.name.length > 100) {
    errors.push({ field: 'name', message: 'El nombre no puede tener más de 100 caracteres' });
  }

  if (!formData.shortDescription || formData.shortDescription.trim().length < 20) {
    errors.push({ field: 'shortDescription', message: 'La descripción corta debe tener al menos 20 caracteres' });
  } else if (formData.shortDescription.length > 160) {
    errors.push({ field: 'shortDescription', message: 'La descripción corta no puede tener más de 160 caracteres' });
  }

  if (!formData.categoryId) {
    errors.push({ field: 'categoryId', message: 'Debes seleccionar una categoría' });
  }

  if (!formData.gallery || formData.gallery.length === 0) {
    errors.push({ field: 'gallery', message: 'Debes subir al menos una imagen' });
  }

  if (formData.basePrice !== undefined && formData.basePrice <= 0) {
    errors.push({ field: 'basePrice', message: 'El precio base debe ser mayor que 0' });
  }

  if (formData.stock < 0) {
    errors.push({ field: 'stock', message: 'El stock no puede ser negativo' });
  }

  if (formData.lowStockThreshold < 0) {
    errors.push({ field: 'lowStockThreshold', message: 'El umbral de stock bajo no puede ser negativo' });
  }

  // Validar información nutricional si es producto alimenticio
  if (formData.categoryId === 'quesos' || formData.categoryId === 'aceites' || 
      formData.categoryId === 'mieles' || formData.categoryId === 'embutidos' || 
      formData.categoryId === 'panaderia' || formData.categoryId === 'vinos') {
    
    if (!formData.nutritionalInfo?.servingSizeValue || formData.nutritionalInfo.servingSizeValue <= 0) {
      errors.push({ field: 'nutritionalInfo.servingSizeValue', message: 'Debes indicar el tamaño de la ración' });
    }

    if (!formData.nutritionalInfo?.ingredients || formData.nutritionalInfo.ingredients.length === 0) {
      errors.push({ field: 'nutritionalInfo.ingredients', message: 'Debes incluir al menos un ingrediente' });
    }
  }

  return { valid: errors.length === 0, errors };
};

// ============================================================================
// FUNCIONES DE LISTADO Y CONSULTA
// ============================================================================

/**
 * Obtiene todos los productos del productor actual
 */
export async function fetchProducts(params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  stock?: string;
  sortBy?: string;
}): Promise<ApiResponse<PaginatedResponse<Product>>> {
  try {
    await delay(600);

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    
    let filteredProducts = [...MOCK_PRODUCTS];
    
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p: Product) => p.name.toLowerCase().includes(searchLower) || p.sku.toLowerCase().includes(searchLower)
      );
    }
    
    if (params?.category && params.category !== 'Todas') {
      filteredProducts = filteredProducts.filter((p: Product) => p.categoryName === params.category);
    }
    
    if (params?.status && params.status !== 'todos') {
      filteredProducts = filteredProducts.filter((p: Product) => p.status === params.status);
    }
    
    if (params?.stock && params.stock !== 'todos') {
      switch (params.stock) {
        case 'bajo':
          filteredProducts = filteredProducts.filter(
            (p: Product) => p.lowStockThreshold && p.stock <= p.lowStockThreshold && p.stock > 0
          );
          break;
        case 'agotado':
          filteredProducts = filteredProducts.filter((p: Product) => p.stock === 0);
          break;
        case 'disponible':
          filteredProducts = filteredProducts.filter((p: Product) => p.stock > 0);
          break;
      }
    }
    
    if (params?.sortBy) {
      switch (params.sortBy) {
        case 'name-asc':
          filteredProducts.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filteredProducts.sort((a: Product, b: Product) => b.name.localeCompare(a.name));
          break;
        case 'price-asc':
          filteredProducts.sort((a: Product, b: Product) => a.basePrice - b.basePrice);
          break;
        case 'price-desc':
          filteredProducts.sort((a: Product, b: Product) => b.basePrice - a.basePrice);
          break;
        case 'stock-asc':
          filteredProducts.sort((a: Product, b: Product) => a.stock - b.stock);
          break;
        case 'stock-desc':
          filteredProducts.sort((a: Product, b: Product) => b.stock - a.stock);
          break;
        case 'sales-desc':
          filteredProducts.sort((a: Product, b: Product) => (b.sales || 0) - (a.sales || 0));
          break;
        case 'oldest':
          filteredProducts.sort((a: Product, b: Product) => a.createdAt.getTime() - b.createdAt.getTime());
          break;
        case 'newest':
        default:
          filteredProducts.sort((a: Product, b: Product) => b.createdAt.getTime() - a.createdAt.getTime());
          break;
      }
    }
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedItems = filteredProducts.slice(start, end);
    
    return {
      data: {
        items: paginatedItems,
        total: filteredProducts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit),
      },
      status: 200,
    };
  } catch (error) {
    console.error('Error en fetchProducts:', error);
    return { error: 'Error al obtener productos', status: 500 };
  }
}

/**
 * Obtiene un producto por su ID
 */
export async function fetchProductById(id: string): Promise<ApiResponse<Product>> {
  try {
    await delay(400);
    const product = MOCK_PRODUCTS.find((p: Product) => p.id === id);
    if (!product) return { error: 'Producto no encontrado', status: 404 };
    return { data: product, status: 200 };
  } catch (error) {
    console.error('Error en fetchProductById:', error);
    return { error: 'Error al obtener el producto', status: 500 };
  }
}

/**
 * Obtiene las estadísticas de productos
 */
export async function fetchProductStats(): Promise<
  ApiResponse<{
    total: number;
    active: number;
    lowStock: number;
    outOfStock: number;
    totalRevenue: number;
    avgRating: number;
    totalSales: number;
    totalViews: number;
  }>
> {
  try {
    await delay(300);
    
    const total = MOCK_PRODUCTS.length;
    const active = MOCK_PRODUCTS.filter((p: Product) => p.status === 'active').length;
    const lowStock = MOCK_PRODUCTS.filter(
      (p: Product) => p.lowStockThreshold && p.stock <= p.lowStockThreshold && p.stock > 0
    ).length;
    const outOfStock = MOCK_PRODUCTS.filter((p: Product) => p.stock === 0).length;
    const totalRevenue = MOCK_PRODUCTS.reduce((sum: number, p: Product) => sum + (p.revenue || 0), 0);
    const totalSales = MOCK_PRODUCTS.reduce((sum: number, p: Product) => sum + (p.sales || 0), 0);
    const totalViews = MOCK_PRODUCTS.reduce((sum: number, p: Product) => sum + (p.views || 0), 0);
    
    const productsWithRating = MOCK_PRODUCTS.filter((p: Product) => p.rating);
    const avgRating = productsWithRating.length > 0
      ? productsWithRating.reduce((sum: number, p: Product) => sum + (p.rating || 0), 0) / productsWithRating.length
      : 0;
    
    return {
      data: {
        total,
        active,
        lowStock,
        outOfStock,
        totalRevenue,
        avgRating: parseFloat(avgRating.toFixed(1)),
        totalSales,
        totalViews,
      },
      status: 200,
    };
  } catch (error) {
    console.error('Error en fetchProductStats:', error);
    return { error: 'Error al obtener estadísticas', status: 500 };
  }
}

// ============================================================================
// FUNCIONES DE CREACIÓN Y EDICIÓN
// ============================================================================

/**
 * Obtiene una sugerencia de SKU (solo previsualización)
 */
export async function suggestSku(
  productName: string,
  categoryId: string
): Promise<ApiResponse<{ suggestedSku: string }>> {
  try {
    await delay(300);

    if (!productName || productName.trim().length < 3) {
      return { data: { suggestedSku: 'PRO-XXX-001' }, status: 200 };
    }

    const categoryPrefix = {
      quesos: 'QUE', aceites: 'ACE', vinos: 'VIN', embutidos: 'EMB',
      mieles: 'MIE', panaderia: 'PAN', conservas: 'CON', dulces: 'DUL',
      bebidas: 'BEB', otros: 'PRO',
    }[categoryId] || 'PRO';

    const nameParts = productName
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Z0-9]/g, ' ')
      .split(' ')
      .filter(part => part.length > 0);

    let nameCode = '';
    if (nameParts.length === 1) {
      nameCode = nameParts[0].substring(0, 3);
    } else {
      nameCode = nameParts.map(p => p[0]).join('').substring(0, 3);
    }

    if (nameCode.length < 2) {
      nameCode = (nameCode + 'XX').substring(0, 3);
    }

    const suggestedSku = `${categoryPrefix}-${nameCode}-XXX`;
    return { data: { suggestedSku }, status: 200 };
  } catch (error) {
    console.error('Error en suggestSku:', error);
    return { error: 'Error al generar sugerencia', status: 500 };
  }
}

/**
 * Verifica si un SKU ya existe
 */
export async function checkSkuExists(sku: string): Promise<ApiResponse<{ exists: boolean }>> {
  try {
    await delay(300);
    const exists = MOCK_PRODUCTS.some((p: Product) => p.sku === sku);
    return { data: { exists }, status: 200 };
  } catch (error) {
    console.error('Error en checkSkuExists:', error);
    return { error: 'Error al verificar SKU', status: 500 };
  }
}

/**
 * Crea un nuevo producto (EL BACKEND GENERA EL SKU)
 */
export async function createProduct(
  formData: ProductFormData,
  producerId: string = 'user-123'
): Promise<ApiResponse<CreateProductResponse>> {
  try {
    await delay(1200);

    const validation = validateProductForm(formData);
    if (!validation.valid) {
      return {
        error: 'Error de validación',
        message: validation.errors.map(e => e.message).join(', '),
        status: 400,
      };
    }

    // Generar SKU en backend
    const sku = generateSku(formData.name, formData.categoryId);
    const productId = generateProductId();
    const slug = generateSlug(formData.name);

    // CORREGIDO: Usar un objeto de mapeo simple
    // Mapeo de estados del formulario a estados del producto
    const statusMap: Record<string, 'draft' | 'active' | 'inactive' | 'out_of_stock'> = {
      'draft': 'draft',
      'pending_approval': 'draft',
      'active': 'active',
      'scheduled': 'draft',
      'inactive': 'inactive',
      'out_of_stock': 'out_of_stock'
    };

    const productStatus = statusMap[formData.status] || 'draft';

    const newProduct: Product = {
      id: productId,
      producerId,
      slug,
      name: formData.name,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription,
      categoryId: formData.categoryId,
      categoryName: PRODUCT_CATEGORIES.find(c => c.id === formData.categoryId)?.name || formData.categoryId,
      subcategoryId: formData.subcategoryId,
      tags: formData.tags,
      mainImage: formData.mainImage,
      gallery: formData.gallery,
      basePrice: formData.basePrice || 0,
      comparePrice: formData.comparePrice,
      priceTiers: formData.priceTiers,
      sku,
      barcode: formData.barcode,
      stock: formData.stock,
      lowStockThreshold: formData.lowStockThreshold,
      trackInventory: formData.trackInventory,
      allowBackorders: formData.allowBackorders,
      weight: formData.weight,
      weightUnit: formData.weightUnit,
      dimensions: formData.dimensions,
      shippingClass: formData.shippingClass,
      nutritionalInfo: formData.nutritionalInfo,
      certifications: formData.certifications,
      productionInfo: formData.productionInfo,
      attributes: formData.attributes,
      status: productStatus,
      visibility: formData.visibility || 'public',
      publishedAt: productStatus === 'active' ? new Date() : undefined,
      sales: 0,
      revenue: 0,
      rating: 0,
      reviewCount: 0,
      views: 0,
      conversion: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastOrderDate: undefined,
    };

    MOCK_PRODUCTS.push(newProduct);
    console.log('✅ Producto creado:', newProduct.name, 'SKU:', newProduct.sku);

    return {
      data: { product: newProduct, redirectUrl: `/products/${newProduct.id}` },
      status: 201,
    };
  } catch (error) {
    console.error('Error en createProduct:', error);
    return { error: 'Error al crear el producto', status: 500 };
  }
}

/**
 * Guarda un borrador del producto
 */
export async function saveProductDraft(
  formData: ProductFormData,
  producerId: string = 'user-123'
): Promise<ApiResponse<{ draftId: string; message: string }>> {
  try {
    await delay(600);
    return { data: { draftId: generateProductId(), message: 'Borrador guardado' }, status: 200 };
  } catch (error) {
    console.error('Error en saveProductDraft:', error);
    return { error: 'Error al guardar el borrador', status: 500 };
  }
}

/**
 * Actualiza un producto existente
 */
export async function updateProduct(
  id: string,
  productData: Partial<Product>
): Promise<ApiResponse<Product>> {
  try {
    await delay(600);
    const productIndex = MOCK_PRODUCTS.findIndex((p: Product) => p.id === id);
    if (productIndex === -1) return { error: 'Producto no encontrado', status: 404 };
    
    const updatedProduct = { ...MOCK_PRODUCTS[productIndex], ...productData, updatedAt: new Date() };
    MOCK_PRODUCTS[productIndex] = updatedProduct;
    return { data: updatedProduct, status: 200 };
  } catch (error) {
    console.error('Error en updateProduct:', error);
    return { error: 'Error al actualizar el producto', status: 500 };
  }
}

/**
 * Elimina un producto
 */
export async function deleteProduct(id: string): Promise<ApiResponse<null>> {
  try {
    await delay(500);
    const productIndex = MOCK_PRODUCTS.findIndex((p: Product) => p.id === id);
    if (productIndex === -1) return { error: 'Producto no encontrado', status: 404 };
    MOCK_PRODUCTS.splice(productIndex, 1);
    return { status: 200, data: null };
  } catch (error) {
    console.error('Error en deleteProduct:', error);
    return { error: 'Error al eliminar el producto', status: 500 };
  }
}

/**
 * Duplica un producto
 */
export async function duplicateProduct(id: string): Promise<ApiResponse<Product>> {
  try {
    await delay(700);
    const originalProduct = MOCK_PRODUCTS.find((p: Product) => p.id === id);
    if (!originalProduct) return { error: 'Producto no encontrado', status: 404 };
    
    const duplicatedProduct: Product = {
      ...originalProduct,
      id: `prod-${Math.random().toString(36).substring(2, 10)}`,
      name: `${originalProduct.name} (copia)`,
      slug: `${originalProduct.slug}-copia`,
      sku: `${originalProduct.sku}-COPY`,
      status: 'draft',
      visibility: 'private',
      publishedAt: undefined,
      sales: 0,
      revenue: 0,
      views: 0,
      conversion: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastOrderDate: undefined,
    };
    return { data: duplicatedProduct, status: 201 };
  } catch (error) {
    console.error('Error en duplicateProduct:', error);
    return { error: 'Error al duplicar el producto', status: 500 };
  }
}

/**
 * Actualiza el stock de un producto
 */
export async function updateProductStock(
  id: string,
  stock: number,
  reason?: string
): Promise<ApiResponse<Product>> {
  try {
    await delay(400);
    const productIndex = MOCK_PRODUCTS.findIndex((p: Product) => p.id === id);
    if (productIndex === -1) return { error: 'Producto no encontrado', status: 404 };
    
    const currentProduct = MOCK_PRODUCTS[productIndex];
    
    // Determinar el nuevo estado basado en el stock
    let newStatus: 'active' | 'inactive' | 'out_of_stock' | 'draft' = currentProduct.status;
    
    if (stock === 0) {
      newStatus = 'out_of_stock';
    } else if (stock > 0 && currentProduct.status === 'out_of_stock') {
      newStatus = 'active';
    }
    
    const updatedProduct = {
      ...currentProduct,
      stock,
      status: newStatus,
      updatedAt: new Date(),
    };
    
    MOCK_PRODUCTS[productIndex] = updatedProduct;
    return { data: updatedProduct, status: 200 };
  } catch (error) {
    console.error('Error en updateProductStock:', error);
    return { error: 'Error al actualizar el stock', status: 500 };
  }
}

// Importar PRODUCT_CATEGORIES
import { PRODUCT_CATEGORIES } from '@/types/product';