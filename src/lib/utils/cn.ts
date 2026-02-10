/**
 * Utilidades para Tailwind CSS
 * Funciones de utilidad para combinar clases condicionalmente
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind CSS de forma segura
 * @param inputs - Clases a combinar
 * @returns String de clases combinadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}