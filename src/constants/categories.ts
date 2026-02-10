/**
 * Categorías de productores
 * @module constants/categories
 */

import { ProducerCategory } from '@/types/seller';

export interface CategoryInfo {
  id: ProducerCategory;
  name: string;
  description: string;
  icon: string;
  subcategories: string[];
}

export const PRODUCER_CATEGORIES: CategoryInfo[] = [
  {
    id: 'agricola',
    name: 'Productor Agrícola',
    description: 'Cultivo de frutas, verduras, hortalizas, cereales',
    icon: '🌾',
    subcategories: ['Frutas', 'Verduras', 'Hortalizas', 'Cereales', 'Legumbres'],
  },
  {
    id: 'ganadero',
    name: 'Productor Ganadero',
    description: 'Cría de ganado, producción de lácteos, huevos, carnes',
    icon: '🐄',
    subcategories: ['Lácteos', 'Carne', 'Huevos', 'Aves', 'Ovino', 'Porcino'],
  },
  {
    id: 'artesano',
    name: 'Artesano Alimentario',
    description: 'Elaboración artesanal de quesos, embutidos, conservas',
    icon: '🧀',
    subcategories: ['Quesos', 'Embutidos', 'Conservas', 'Panadería', 'Pastelería'],
  },
  {
    id: 'apicultor',
    name: 'Apicultor',
    description: 'Producción de miel y derivados',
    icon: '🐝',
    subcategories: ['Miel', 'Polen', 'Propóleo', 'Jalea Real'],
  },
  {
    id: 'viticultor',
    name: 'Viticultor',
    description: 'Cultivo de vid y elaboración de vinos',
    icon: '🍇',
    subcategories: ['Vino Tinto', 'Vino Blanco', 'Rosado', 'Espumoso'],
  },
  {
    id: 'especializado',
    name: 'Productor Especializado',
    description: 'Aceites, especias, productos gourmet',
    icon: '⭐',
    subcategories: ['Aceites', 'Especias', 'Vinagres', 'Salsas', 'Gourmet'],
  },
];
