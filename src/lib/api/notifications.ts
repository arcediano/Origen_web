/**
 * @file notifications.ts
 * @description Llamadas a la API para el sistema de notificaciones
 */

import { type Notification, type NotificationsResponse } from '@/types/notification';
import { ApiResponse } from './products';

// ============================================================================
// DATOS MOCK - Hacerlos constantes y no mutables
// ============================================================================

// Datos base (constantes)
const BASE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'product',
    title: 'Producto agotado',
    description: 'Queso Manchego Curado 12 meses',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    actionUrl: '/products/prod-001'
  },
  {
    id: '2',
    type: 'product',
    title: 'Stock bajo',
    description: 'Aceite de Oliva Virgen Extra (3 uds)',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    actionUrl: '/products/prod-002'
  },
  {
    id: '3',
    type: 'order',
    title: 'Nuevo pedido',
    description: 'Pedido #1234 - 89,50€',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
    actionUrl: '/dashboard/pedidos/1234'
  },
  {
    id: '4',
    type: 'order',
    title: 'Pedido enviado',
    description: 'Pedido #1230 en camino',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: false,
    actionUrl: '/dashboard/pedidos/1230'
  },
  {
    id: '5',
    type: 'certification',
    title: 'Certificación aceptada',
    description: 'Agricultura Ecológica UE',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    read: true,
    actionUrl: '/dashboard/profile/certificaciones'
  },
  {
    id: '6',
    type: 'certification',
    title: 'Certificación por caducar',
    description: 'D.O. caduca en 30 días',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    read: false,
    actionUrl: '/dashboard/profile/certificaciones'
  },
  {
    id: '7',
    type: 'system',
    title: 'Documentación requerida',
    description: 'Revisa los documentos pendientes',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    read: false,
    actionUrl: '/dashboard/configuracion/documentos'
  }
];

// Copia de trabajo que podemos modificar (in-memory)
let currentNotifications = [...BASE_NOTIFICATIONS];

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

const calculateStats = (notifications: Notification[]) => {
  const unread = notifications.filter(n => !n.read).length;
  const byType = notifications.reduce((acc, n) => {
    acc[n.type] = (acc[n.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: notifications.length,
    unread,
    byType: {
      product: byType.product || 0,
      order: byType.order || 0,
      certification: byType.certification || 0,
      system: byType.system || 0
    }
  };
};

// ============================================================================
// FUNCIONES DE LA API
// ============================================================================

/**
 * Obtiene las notificaciones del usuario
 */
export async function fetchNotifications(params?: {
  page?: number;
  limit?: number;
  type?: string;
  read?: boolean;
}): Promise<ApiResponse<NotificationsResponse>> {
  try {
    await delay(500);

    let filtered = [...currentNotifications]; // Usar copia
    
    if (params?.type) {
      filtered = filtered.filter(n => n.type === params.type);
    }
    
    if (params?.read !== undefined) {
      filtered = filtered.filter(n => n.read === params.read);
    }

    // Ordenar por fecha (más recientes primero)
    filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    return {
      data: {
        notifications: paginated,
        stats: calculateStats(currentNotifications),
        hasMore: end < filtered.length
      },
      status: 200
    };
  } catch (error) {
    console.error('Error en fetchNotifications:', error);
    return { error: 'Error al cargar notificaciones', status: 500 };
  }
}

/**
 * Obtiene las notificaciones no leídas (para la campana)
 */
export async function fetchUnreadNotifications(): Promise<ApiResponse<Notification[]>> {
  try {
    await delay(300);
    // Siempre devolver una NUEVA copia del array filtrado
    const unread = currentNotifications.filter(n => !n.read);
    return { 
      data: [...unread], // <- Importante: devolver copia
      status: 200 
    };
  } catch (error) {
    console.error('Error en fetchUnreadNotifications:', error);
    return { error: 'Error al cargar notificaciones no leídas', status: 500 };
  }
}

/**
 * Marca una notificación como leída
 */
export async function markNotificationAsRead(id: string): Promise<ApiResponse<Notification>> {
  try {
    await delay(200);
    
    // Buscar la notificación en el array actual
    const index = currentNotifications.findIndex(n => n.id === id);
    if (index === -1) {
      return { error: 'Notificación no encontrada', status: 404 };
    }
    
    // Crear una copia de la notificación con read = true
    const updatedNotification = {
      ...currentNotifications[index],
      read: true
    };
    
    // Actualizar el array (in-memory)
    currentNotifications = [
      ...currentNotifications.slice(0, index),
      updatedNotification,
      ...currentNotifications.slice(index + 1)
    ];
    
    return { 
      data: { ...updatedNotification }, // <- Devolver copia
      status: 200 
    };
  } catch (error) {
    console.error('Error en markNotificationAsRead:', error);
    return { error: 'Error al marcar notificación', status: 500 };
  }
}

/**
 * Marca todas las notificaciones como leídas
 */
export async function markAllNotificationsAsRead(): Promise<ApiResponse<{ count: number }>> {
  try {
    await delay(400);
    
    const unreadCount = currentNotifications.filter(n => !n.read).length;
    
    // Actualizar todas las notificaciones (in-memory)
    currentNotifications = currentNotifications.map(n => ({
      ...n,
      read: true
    }));
    
    return { 
      data: { count: unreadCount }, 
      status: 200 
    };
  } catch (error) {
    console.error('Error en markAllNotificationsAsRead:', error);
    return { error: 'Error al marcar notificaciones', status: 500 };
  }
}

/**
 * Elimina una notificación
 */
export async function deleteNotification(id: string): Promise<ApiResponse<null>> {
  try {
    await delay(300);
    
    const index = currentNotifications.findIndex(n => n.id === id);
    if (index === -1) {
      return { error: 'Notificación no encontrada', status: 404 };
    }
    
    // Eliminar la notificación (in-memory)
    currentNotifications = [
      ...currentNotifications.slice(0, index),
      ...currentNotifications.slice(index + 1)
    ];
    
    return { status: 200, data: null };
  } catch (error) {
    console.error('Error en deleteNotification:', error);
    return { error: 'Error al eliminar notificación', status: 500 };
  }
}

/**
 * Obtiene el contador de notificaciones no leídas
 */
export async function getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
  try {
    await delay(100);
    const count = currentNotifications.filter(n => !n.read).length;
    return { data: { count }, status: 200 };
  } catch (error) {
    console.error('Error en getUnreadCount:', error);
    return { error: 'Error al obtener contador', status: 500 };
  }
}

/**
 * Resetea las notificaciones al estado inicial (útil para desarrollo)
 */
export function resetNotifications() {
  currentNotifications = [...BASE_NOTIFICATIONS];
}