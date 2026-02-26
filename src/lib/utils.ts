/**
 * Utilidades generales
 * @module lib/utils
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Combina clases de Tailwind CSS de forma inteligente */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatea bytes a formato legible (KB, MB, GB) */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/** Formatea cantidad en céntimos a euros */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount / 100);
}

/** Formatea fecha a formato español */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

/** Genera ID único */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/** Trunca texto con puntos suspensivos */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/** Capitaliza primera letra */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/** Formatea número de teléfono español */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return cleaned.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
  }
  return phone;
}

/** Obtiene iniciales de nombre */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

/** Debounce simple */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// ============================================================================
// UTILIDADES PARA SKU (Stock Keeping Unit)
// ============================================================================

/**
 * Genera un SKU único basado en categoría y timestamp
 * @param category - Categoría del producto (opcional)
 * @param productName - Nombre del producto (opcional)
 * @returns SKU generado con formato: PREFIJO-123456789
 * 
 * @example
 * generateSku('Quesos', 'Queso Manchego') // -> QUE-123456789
 * generateSku(undefined, 'Aceite de Oliva') // -> ACE-123456789
 * generateSku() // -> PRD-123456789
 */
export function generateSku(category?: string, productName?: string): string {
  // Obtener prefijo de categoría
  let prefix = 'PRD';
  
  if (category) {
    // Extraer primeras 3 letras de la categoría (solo caracteres alfabéticos)
    const categoryMatch = category.match(/[A-Za-z]/g);
    if (categoryMatch && categoryMatch.length >= 3) {
      prefix = categoryMatch.slice(0, 3).join('').toUpperCase();
    }
  } else if (productName) {
    // Usar primeras 3 letras del producto
    const nameMatch = productName.match(/[A-Za-z]/g);
    if (nameMatch && nameMatch.length >= 3) {
      prefix = nameMatch.slice(0, 3).join('').toUpperCase();
    }
  }

  // Añadir timestamp (últimos 6 dígitos)
  const timestamp = Date.now().toString().slice(-6);
  
  // Añadir número aleatorio de 3 dígitos
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `${prefix}-${timestamp}${random}`;
}

/**
 * Valida el formato de SKU
 * @param sku - SKU a validar
 * @returns true si el formato es válido (PREFIJO-123456789)
 * 
 * @example
 * validateSkuFormat('QUE-123456789') // -> true
 * validateSkuFormat('queso-123') // -> false
 */
export function validateSkuFormat(sku: string): boolean {
  const skuRegex = /^[A-Z0-9]{2,5}-[0-9]{9}$/;
  return skuRegex.test(sku);
}

/**
 * Extrae información del SKU
 * @param sku - SKU a analizar
 * @returns Objeto con prefijo y código, o null si el formato es inválido
 * 
 * @example
 * parseSku('QUE-123456789') // -> { prefix: 'QUE', code: '123456789' }
 */
export function parseSku(sku: string): { prefix: string; code: string } | null {
  const match = sku.match(/^([A-Z0-9]{2,5})-([0-9]{9})$/);
  if (!match) return null;
  
  return {
    prefix: match[1],
    code: match[2]
  };
}

/**
 * Genera un SKU basado en el nombre del producto (inteligente)
 * @param productName - Nombre del producto
 * @returns SKU sugerido basado en palabras clave del nombre
 * 
 * @example
 * generateSkuFromName('Queso Curado Artesanal de Oveja') // -> QUCRAR-123456789
 * generateSkuFromName('Aceite de Oliva Virgen Extra') // -> ACOLVI-123456789
 */
export function generateSkuFromName(productName: string): string {
  if (!productName || productName.trim() === '') {
    return generateSku();
  }

  // Limpiar el nombre
  const clean = productName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar tildes
    .replace(/[^a-zA-Z0-9\s]/g, '') // Eliminar caracteres especiales
    .trim()
    .toUpperCase();

  // Obtener palabras significativas (longitud > 2)
  const words = clean.split(/\s+/).filter(word => word.length > 2);
  
  // Si no hay palabras suficientes, usar PRD
  if (words.length === 0) {
    return generateSku();
  }
  
  // Generar prefijo inteligente:
  // - Si hay 1 palabra: primeras 3 letras
  // - Si hay 2 palabras: 2 letras de cada una
  // - Si hay 3+ palabras: 2 letras de las 3 primeras
  let prefix = '';
  if (words.length === 1) {
    prefix = words[0].substring(0, 3);
  } else if (words.length === 2) {
    prefix = words[0].substring(0, 2) + words[1].substring(0, 2);
  } else {
    prefix = words[0].substring(0, 2) + 
             words[1].substring(0, 2) + 
             words[2].substring(0, 2);
  }

  // Limitar a 5 caracteres máximo
  prefix = prefix.substring(0, 5);

  // Añadir timestamp
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

  return `${prefix}-${timestamp}${random}`;
}

/**
 * Genera un SKU sugerido basado en categoría y nombre
 * @param category - Categoría del producto
 * @param productName - Nombre del producto
 * @returns SKU optimizado combinando categoría y nombre
 */
export function generateOptimizedSku(category: string, productName: string): string {
  if (!category && !productName) return generateSku();
  
  // Obtener prefijo de categoría (3 letras)
  let categoryPrefix = 'PRD';
  if (category) {
    const catMatch = category.match(/[A-Za-z]/g);
    if (catMatch && catMatch.length >= 3) {
      categoryPrefix = catMatch.slice(0, 3).join('').toUpperCase();
    }
  }

  // Si no hay nombre, solo usar categoría
  if (!productName || productName.trim() === '') {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${categoryPrefix}-${timestamp}${random}`;
  }

  // Limpiar nombre
  const clean = productName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .toUpperCase();

  const words = clean.split(/\s+/).filter(word => word.length > 2);
  
  // Extraer primeras letras del nombre
  let namePrefix = '';
  if (words.length >= 1) {
    namePrefix = words[0].substring(0, 2);
  }
  if (words.length >= 2) {
    namePrefix += words[1].substring(0, 1);
  }

  // Combinar: categoría (3) + nombre (hasta 2)
  const finalPrefix = (categoryPrefix + namePrefix).substring(0, 5);

  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

  return `${finalPrefix}-${timestamp}${random}`;
}