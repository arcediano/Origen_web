/**
 * @file orders.ts
 * @description Llamadas a la API para el sistema de pedidos
 */

import { type Order, type OrderStats, type OrdersResponse, type OrderFilters } from '@/types/order';
import { ApiResponse } from './products';

// ============================================================================
// DATOS MOCK
// ============================================================================

const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'PED-2024-0001',
    customerId: 'user-123',
    customerName: 'María García',
    customerEmail: 'maria@email.com',
    customerPhone: '612345678',
    
    items: [
      {
        id: 'item-001',
        productId: 'prod-001',
        productName: 'Queso Manchego Curado 12 meses',
        productImage: '/mock/queso.jpg',
        quantity: 2,
        unitPrice: 28.50,
        totalPrice: 57.00
      },
      {
        id: 'item-002',
        productId: 'prod-002',
        productName: 'Aceite de Oliva Virgen Extra',
        productImage: '/mock/aceite.jpg',
        quantity: 1,
        unitPrice: 18.75,
        totalPrice: 18.75
      }
    ],
    
    subtotal: 75.75,
    shippingCost: 5.90,
    tax: 15.92,
    total: 97.57,
    
    status: 'delivered',
    payment: {
      method: 'card',
      status: 'paid',
      transactionId: 'txn-123456',
      amount: 97.57,
      paidAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10) // 10 días
    },
    
    shipping: {
      method: 'Correos Express',
      carrier: 'Correos',
      trackingNumber: 'CP123456789ES',
      trackingUrl: 'https://www.correos.es/seguimiento',
      status: 'delivered',
      estimatedDays: 2,
      shippedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9),
      deliveredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
      cost: 5.90,
      address: {
        fullName: 'María García',
        addressLine1: 'Calle Mayor 123',
        city: 'Madrid',
        postalCode: '28001',
        country: 'España',
        phone: '612345678'
      }
    },
    
    timeline: [
      {
        id: 'tl-001',
        status: 'pending',
        description: 'Pedido creado',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
      },
      {
        id: 'tl-002',
        status: 'processing',
        description: 'Pago confirmado',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9.5)
      },
      {
        id: 'tl-003',
        status: 'shipped',
        description: 'Pedido enviado',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9)
      },
      {
        id: 'tl-004',
        status: 'delivered',
        description: 'Pedido entregado',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8)
      }
    ],
    
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8)
  },
  
  {
    id: 'ord-002',
    orderNumber: 'PED-2024-0002',
    customerId: 'user-456',
    customerName: 'Carlos Rodríguez',
    customerEmail: 'carlos@email.com',
    customerPhone: '623456789',
    
    items: [
      {
        id: 'item-003',
        productId: 'prod-003',
        productName: 'Miel de Romero',
        productImage: '/mock/miel.jpg',
        quantity: 3,
        unitPrice: 12.50,
        totalPrice: 37.50
      }
    ],
    
    subtotal: 37.50,
    shippingCost: 4.90,
    tax: 7.88,
    total: 50.28,
    
    status: 'shipped',
    payment: {
      method: 'paypal',
      status: 'paid',
      transactionId: 'pp-789012',
      amount: 50.28,
      paidAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
    },
    
    shipping: {
      method: 'SEUR',
      carrier: 'SEUR',
      trackingNumber: 'SE123456789ES',
      trackingUrl: 'https://www.seur.com/seguimiento',
      status: 'shipped',
      estimatedDays: 3,
      shippedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      cost: 4.90,
      address: {
        fullName: 'Carlos Rodríguez',
        addressLine1: 'Av. Catalunya 45',
        addressLine2: '2º 2ª',
        city: 'Barcelona',
        postalCode: '08001',
        country: 'España',
        phone: '623456789'
      }
    },
    
    timeline: [
      {
        id: 'tl-005',
        status: 'pending',
        description: 'Pedido creado',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
      },
      {
        id: 'tl-006',
        status: 'processing',
        description: 'Pago confirmado',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)
      },
      {
        id: 'tl-007',
        status: 'shipped',
        description: 'Pedido enviado',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
      }
    ],
    
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
  },
  
  {
    id: 'ord-003',
    orderNumber: 'PED-2024-0003',
    customerId: 'user-789',
    customerName: 'Ana Martínez',
    customerEmail: 'ana@email.com',
    customerPhone: '634567890',
    
    items: [
      {
        id: 'item-004',
        productId: 'prod-004',
        productName: 'Embutido Artesano',
        productImage: '/mock/embutido.jpg',
        quantity: 1,
        unitPrice: 35.90,
        totalPrice: 35.90
      },
      {
        id: 'item-005',
        productId: 'prod-005',
        productName: 'Queso de Oveja',
        productImage: '/mock/queso-oveja.jpg',
        quantity: 1,
        unitPrice: 22.30,
        totalPrice: 22.30
      },
      {
        id: 'item-006',
        productId: 'prod-006',
        productName: 'Vino Tinto Crianza',
        productImage: '/mock/vino.jpg',
        quantity: 2,
        unitPrice: 15.50,
        totalPrice: 31.00
      }
    ],
    
    subtotal: 89.20,
    shippingCost: 5.90,
    tax: 18.73,
    total: 113.83,
    
    status: 'processing',
    payment: {
      method: 'transfer',
      status: 'pending',
      amount: 113.83
    },
    
    shipping: {
      method: 'Correos Express',
      status: 'pending',
      estimatedDays: 3,
      cost: 5.90,
      address: {
        fullName: 'Ana Martínez',
        addressLine1: 'Plaza del Pilar 7',
        city: 'Zaragoza',
        postalCode: '50001',
        country: 'España',
        phone: '634567890'
      }
    },
    
    timeline: [
      {
        id: 'tl-008',
        status: 'pending',
        description: 'Pedido creado',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 horas
      },
      {
        id: 'tl-009',
        status: 'processing',
        description: 'En espera de confirmación de pago',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5)
      }
    ],
    
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5)
  }
];

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

const delay = (ms: number = 400) => new Promise(resolve => setTimeout(resolve, ms));

const calculateStats = (orders: Order[]): OrderStats => {
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    refunded: orders.filter(o => o.status === 'refunded').length,
    totalRevenue: orders.reduce((acc, o) => acc + (o.status === 'delivered' ? o.total : 0), 0),
    averageOrderValue: 0,
    todayOrders: orders.filter(o => {
      const today = new Date();
      return o.createdAt.toDateString() === today.toDateString();
    }).length,
    todayRevenue: orders.filter(o => {
      const today = new Date();
      return o.createdAt.toDateString() === today.toDateString();
    }).reduce((acc, o) => acc + (o.status === 'delivered' ? o.total : 0), 0)
  };

  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  stats.averageOrderValue = deliveredOrders.length > 0 
    ? stats.totalRevenue / deliveredOrders.length 
    : 0;

  return stats;
};

const filterOrders = (orders: Order[], filters?: OrderFilters): Order[] => {
  if (!filters) return orders;

  return orders.filter(order => {
    if (filters.status && order.status !== filters.status) return false;
    if (filters.paymentStatus && order.payment.status !== filters.paymentStatus) return false;
    if (filters.shippingStatus && order.shipping.status !== filters.shippingStatus) return false;
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const matchesOrderNumber = order.orderNumber.toLowerCase().includes(search);
      const matchesCustomerName = order.customerName.toLowerCase().includes(search);
      const matchesCustomerEmail = order.customerEmail.toLowerCase().includes(search);
      if (!matchesOrderNumber && !matchesCustomerName && !matchesCustomerEmail) return false;
    }

    if (filters.dateFrom && order.createdAt < filters.dateFrom) return false;
    if (filters.dateTo && order.createdAt > filters.dateTo) return false;

    if (filters.minAmount !== undefined && order.total < filters.minAmount) return false;
    if (filters.maxAmount !== undefined && order.total > filters.maxAmount) return false;

    if (filters.customerId && order.customerId !== filters.customerId) return false;

    return true;
  });
};

// ============================================================================
// FUNCIONES DE LA API
// ============================================================================

/**
 * Obtiene todos los pedidos con filtros
 */
export async function fetchOrders(params?: {
  page?: number;
  limit?: number;
  filters?: OrderFilters;
}): Promise<ApiResponse<OrdersResponse>> {
  try {
    await delay(600);

    let filtered = filterOrders([...MOCK_ORDERS], params?.filters);
    
    // Ordenar por fecha (más recientes primero)
    filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    return {
      data: {
        orders: paginated,
        stats: calculateStats(filtered),
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit)
      },
      status: 200
    };
  } catch (error) {
    console.error('Error en fetchOrders:', error);
    return { error: 'Error al cargar pedidos', status: 500 };
  }
}

/**
 * Obtiene un pedido por ID
 */
export async function fetchOrderById(id: string): Promise<ApiResponse<Order>> {
  try {
    await delay(400);
    const order = MOCK_ORDERS.find(o => o.id === id);
    if (!order) {
      return { error: 'Pedido no encontrado', status: 404 };
    }
    return { data: { ...order }, status: 200 };
  } catch (error) {
    console.error('Error en fetchOrderById:', error);
    return { error: 'Error al cargar el pedido', status: 500 };
  }
}

/**
 * Actualiza el estado de un pedido
 */
export async function updateOrderStatus(
  id: string, 
  status: Order['status'],
  comment?: string
): Promise<ApiResponse<Order>> {
  try {
    await delay(300);
    const order = MOCK_ORDERS.find(o => o.id === id);
    if (!order) {
      return { error: 'Pedido no encontrado', status: 404 };
    }

    order.status = status;
    order.updatedAt = new Date();
    
    // Añadir a la línea de tiempo
    order.timeline.push({
      id: `tl-${Date.now()}`,
      status,
      description: comment || `Estado actualizado a ${status}`,
      createdAt: new Date()
    });

    return { data: { ...order }, status: 200 };
  } catch (error) {
    console.error('Error en updateOrderStatus:', error);
    return { error: 'Error al actualizar el pedido', status: 500 };
  }
}

/**
 * Obtiene estadísticas de pedidos
 */
export async function fetchOrderStats(): Promise<ApiResponse<OrderStats>> {
  try {
    await delay(300);
    return {
      data: calculateStats(MOCK_ORDERS),
      status: 200
    };
  } catch (error) {
    console.error('Error en fetchOrderStats:', error);
    return { error: 'Error al obtener estadísticas', status: 500 };
  }
}