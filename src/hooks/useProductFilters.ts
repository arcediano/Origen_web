/**
 * @file useProductFilters.ts
 * @description Hook personalizado para filtrar y ordenar productos - SIN FILTROS POR DEFECTO
 */

import { useState, useMemo, useCallback } from 'react';
import { type Product } from '@/types/product';

// ============================================================================
// TIPOS
// ============================================================================

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  selectedStatus: string;
  selectedStock: string;
  sortBy: string;
  currentPage: number;
}

export interface UseProductFiltersReturn {
  // Estado
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedStock: string;
  setSelectedStock: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  
  // Productos filtrados
  filteredProducts: Product[];
  totalPages: number;
  paginatedProducts: Product[];
  
  // Utilidades
  hasFilters: boolean;
  clearFilters: () => void;
  resetPagination: () => void;
}

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const ITEMS_PER_PAGE = 10;

// Opciones para los selects (solo para uso en componentes, no como valores por defecto)
export const STATUS_OPTIONS = [
  { value: 'active', label: 'Activos' },
  { value: 'inactive', label: 'Inactivos' },
  { value: 'out_of_stock', label: 'Sin stock' },
  { value: 'draft', label: 'Borradores' },
];

export const STOCK_OPTIONS = [
  { value: 'bajo', label: 'Stock bajo' },
  { value: 'agotado', label: 'Agotados' },
  { value: 'disponible', label: 'Con stock' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'oldest', label: 'Más antiguos' },
  { value: 'name-asc', label: 'Nombre A-Z' },
  { value: 'name-desc', label: 'Nombre Z-A' },
  { value: 'price-asc', label: 'Precio (menor a mayor)' },
  { value: 'price-desc', label: 'Precio (mayor a menor)' },
  { value: 'stock-asc', label: 'Stock (menor a mayor)' },
  { value: 'stock-desc', label: 'Stock (mayor a menor)' },
  { value: 'sales-desc', label: 'Más vendidos' },
];

// ============================================================================
// HOOK PRINCIPAL
// ============================================================================

/**
 * Hook para filtrar y ordenar productos - SIN FILTROS POR DEFECTO
 * @param products - Lista completa de productos
 * @returns Estado y funciones para filtrar productos
 */
export function useProductFilters(products: Product[]): UseProductFiltersReturn {
  // Estado de filtros - TODOS VACÍOS POR DEFECTO
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedStock, setSelectedStock] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // ==========================================================================
  // FUNCIONES DE FILTRADO
  // ==========================================================================

  /**
   * Aplica todos los filtros a la lista de productos
   */
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filtro por búsqueda (nombre o SKU)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query)
      );
    }

    // Filtro por categoría - SOLO si hay un valor seleccionado
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.categoryName === selectedCategory);
    }

    // Filtro por estado - SOLO si hay un valor seleccionado
    if (selectedStatus) {
      filtered = filtered.filter((product) => product.status === selectedStatus);
    }

    // Filtro por stock - SOLO si hay un valor seleccionado
    if (selectedStock) {
      switch (selectedStock) {
        case 'bajo':
          filtered = filtered.filter(
            (product) =>
              product.lowStockThreshold &&
              product.stock <= product.lowStockThreshold &&
              product.stock > 0
          );
          break;
        case 'agotado':
          filtered = filtered.filter((product) => product.stock === 0);
          break;
        case 'disponible':
          filtered = filtered.filter((product) => product.stock > 0);
          break;
      }
    }

    // Aplicar ordenación - SOLO si hay un valor seleccionado
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'price-asc':
            return a.basePrice - b.basePrice;
          case 'price-desc':
            return b.basePrice - a.basePrice;
          case 'stock-asc':
            return a.stock - b.stock;
          case 'stock-desc':
            return b.stock - a.stock;
          case 'sales-desc':
            return (b.sales || 0) - (a.sales || 0);
          case 'oldest':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, selectedStatus, selectedStock, sortBy]);

  // ==========================================================================
  // PAGINACIÓN
  // ==========================================================================

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  // ==========================================================================
  // UTILIDADES
  // ==========================================================================

  /**
   * Verifica si hay algún filtro activo
   */
  const hasFilters = Boolean(
    searchQuery ||
      selectedCategory ||
      selectedStatus ||
      selectedStock ||
      sortBy
  );

  /**
   * Limpia todos los filtros
   */
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedStatus('');
    setSelectedStock('');
    setSortBy('');
    setCurrentPage(1);
  }, []);

  /**
   * Reinicia la paginación a la primera página
   */
  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    // Estado
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    selectedStock,
    setSelectedStock,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,

    // Productos filtrados
    filteredProducts,
    totalPages,
    paginatedProducts,

    // Utilidades
    hasFilters,
    clearFilters,
    resetPagination,
  };
}