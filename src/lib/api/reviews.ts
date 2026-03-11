/**
 * @file reviews.ts
 * @description Llamadas a la API para el sistema de reseñas
 */

import { type Review, type ReviewStats, type ReviewsResponse, type ReviewFilters, ReviewStatus } from '@/types/review';
import { ApiResponse } from './products';

// ============================================================================
// DATOS MOCK
// ============================================================================

const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-001',
    type: 'product',
    targetId: 'prod-001',
    targetName: 'Queso Manchego Curado 12 meses',
    authorId: 'user-123',
    authorName: 'María García',
    authorAvatar: 'https://i.pravatar.cc/150?u=123',
    rating: 5,
    title: 'Excelente queso, sabor intenso',
    content: 'Llevo años comprando queso manchego y este es de los mejores. Se nota la curación de 12 meses, textura firme y sabor intenso. Perfecto para tabla de quesos.',
    status: 'approved',
    helpful: 24,
    notHelpful: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 días
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    verifiedPurchase: true,
    images: ['/mock/review-1.jpg', '/mock/review-2.jpg'],
    response: {
      id: 'resp-001',
      authorId: 'prod-001',
      authorName: 'Quesería El Gazpacho',
      authorType: 'producer',
      content: '¡Gracias por tu reseña María! Nos alegra mucho que disfrutes nuestro queso. Seguimos trabajando con la misma pasión.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4)
    }
  },
  {
    id: 'rev-002',
    type: 'product',
    targetId: 'prod-001',
    targetName: 'Queso Manchego Curado 12 meses',
    authorId: 'user-456',
    authorName: 'Carlos Rodríguez',
    rating: 4,
    title: 'Muy bueno, pero un poco caro',
    content: 'El queso es excelente, calidad top. La única pega es el precio, me parece un poco elevado comparado con otros similares.',
    status: 'approved',
    helpful: 12,
    notHelpful: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
    verifiedPurchase: true
  },
  {
    id: 'rev-003',
    type: 'product',
    targetId: 'prod-002',
    targetName: 'Aceite de Oliva Virgen Extra',
    authorId: 'user-789',
    authorName: 'Ana Martínez',
    rating: 5,
    title: 'Espectacular, como de la abuela',
    content: 'Este aceite me transporta a mi infancia. Sabor afrutado, picor justo. Ideal para pan con tomate o ensaladas.',
    status: 'pending',
    helpful: 8,
    notHelpful: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    verifiedPurchase: true,
    images: ['/mock/review-3.jpg']
  },
  {
    id: 'rev-004',
    type: 'producer',
    targetId: 'prod-001',
    targetName: 'Quesería El Gazpacho',
    authorId: 'user-234',
    authorName: 'Laura Sánchez',
    rating: 5,
    title: 'Productor excepcional',
    content: 'Trato excelente, envío rápido y producto perfecto. Resolvieron todas mis dudas antes de comprar. Volveré a comprar sin duda.',
    status: 'approved',
    helpful: 15,
    notHelpful: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
    verifiedPurchase: true,
    response: {
      id: 'resp-002',
      authorId: 'prod-001',
      authorName: 'Quesería El Gazpacho',
      authorType: 'producer',
      content: '¡Gracias Laura! Nos esforzamos cada día por ofrecer el mejor servicio. Un saludo.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
    }
  },
  {
    id: 'rev-005',
    type: 'product',
    targetId: 'prod-003',
    targetName: 'Miel de Romero',
    authorId: 'user-567',
    authorName: 'Javier López',
    rating: 2,
    title: 'No era lo que esperaba',
    content: 'La miel estaba cristalizada y el bote llegó un poco abierto. El sabor no es malo, pero la presentación deja que desear.',
    status: 'flagged',
    helpful: 3,
    notHelpful: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    verifiedPurchase: true,
    flags: [
      {
        id: 'flag-001',
        reason: 'inappropriate',
        description: 'El usuario está siendo muy duro sin motivo',
        reportedBy: 'prod-003',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
        resolved: false
      }
    ]
  },
  {
    id: 'rev-006',
    type: 'producer',
    targetId: 'prod-004',
    targetName: 'Aceites La Alquería',
    authorId: 'user-890',
    authorName: 'Pedro Gómez',
    rating: 1,
    title: 'Pésima experiencia',
    content: 'Pedido llegó tarde, el producto no correspondía con la descripción y no responden a los mensajes. No recomiendo.',
    status: 'rejected',
    helpful: 2,
    notHelpful: 8,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18),
    verifiedPurchase: true
  }
];

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

const delay = (ms: number = 400) => new Promise(resolve => setTimeout(resolve, ms));

const calculateStats = (reviews: Review[]): ReviewStats => {
  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
    flagged: reviews.filter(r => r.status === 'flagged').length,
    averageRating: 0,
    byRating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>,
    helpful: reviews.reduce((acc, r) => acc + r.helpful, 0),
    notHelpful: reviews.reduce((acc, r) => acc + r.notHelpful, 0)
  };

  reviews.forEach(r => {
    stats.byRating[r.rating] = (stats.byRating[r.rating] || 0) + 1;
  });

  const totalRatings = Object.values(stats.byRating).reduce((a, b) => a + b, 0);
  if (totalRatings > 0) {
    const sumRatings = Object.entries(stats.byRating).reduce(
      (acc, [rating, count]) => acc + Number(rating) * count, 0
    );
    stats.averageRating = sumRatings / totalRatings;
  }

  return stats;
};

const filterReviews = (reviews: Review[], filters?: ReviewFilters): Review[] => {
  if (!filters) return reviews;

  return reviews.filter(review => {
    if (filters.type && review.type !== filters.type) return false;
    if (filters.status && review.status !== filters.status) return false;
    if (filters.rating && review.rating !== filters.rating) return false;
    if (filters.verifiedOnly && !review.verifiedPurchase) return false;
    if (filters.hasResponse && !review.response) return false;
    if (filters.hasImages && (!review.images || review.images.length === 0)) return false;
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const matchesTitle = review.title.toLowerCase().includes(search);
      const matchesContent = review.content.toLowerCase().includes(search);
      const matchesAuthor = review.authorName.toLowerCase().includes(search);
      const matchesTarget = review.targetName.toLowerCase().includes(search);
      if (!matchesTitle && !matchesContent && !matchesAuthor && !matchesTarget) return false;
    }

    if (filters.dateFrom && review.createdAt < filters.dateFrom) return false;
    if (filters.dateTo && review.createdAt > filters.dateTo) return false;

    return true;
  });
};

// ============================================================================
// FUNCIONES DE LA API
// ============================================================================

/**
 * Obtiene todas las reseñas con filtros
 */
export async function fetchReviews(params?: {
  page?: number;
  limit?: number;
  filters?: ReviewFilters;
}): Promise<ApiResponse<ReviewsResponse>> {
  try {
    await delay(600);

    let filtered = filterReviews([...MOCK_REVIEWS], params?.filters);
    
    // Ordenar por fecha (más recientes primero)
    filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    return {
      data: {
        reviews: paginated,
        stats: calculateStats(filtered),
        hasMore: end < filtered.length
      },
      status: 200
    };
  } catch (error) {
    console.error('Error en fetchReviews:', error);
    return { error: 'Error al cargar reseñas', status: 500 };
  }
}

/**
 * Obtiene reseñas pendientes de moderación
 */
export async function fetchPendingReviews(params?: {
  page?: number;
  limit?: number;
}): Promise<ApiResponse<ReviewsResponse>> {
  return fetchReviews({
    ...params,
    filters: { status: 'pending' }
  });
}

/**
 * Obtiene reseñas por tipo (producto o productor)
 */
export async function fetchReviewsByType(
  type: 'product' | 'producer',
  targetId?: string,
  params?: { page?: number; limit?: number }
): Promise<ApiResponse<ReviewsResponse>> {
  let filtered = MOCK_REVIEWS.filter(r => r.type === type);
  if (targetId) {
    filtered = filtered.filter(r => r.targetId === targetId);
  }

  await delay(400);

  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return {
    data: {
      reviews: paginated,
      stats: calculateStats(filtered),
      hasMore: end < filtered.length
    },
    status: 200
  };
}

/**
 * Aprueba una reseña
 */
export async function approveReview(id: string): Promise<ApiResponse<Review>> {
  try {
    await delay(300);
    const review = MOCK_REVIEWS.find(r => r.id === id);
    if (!review) {
      return { error: 'Reseña no encontrada', status: 404 };
    }
    review.status = 'approved';
    review.updatedAt = new Date();
    return { data: { ...review }, status: 200 };
  } catch (error) {
    console.error('Error en approveReview:', error);
    return { error: 'Error al aprobar reseña', status: 500 };
  }
}

/**
 * Rechaza una reseña
 */
export async function rejectReview(id: string, reason?: string): Promise<ApiResponse<Review>> {
  try {
    await delay(300);
    const review = MOCK_REVIEWS.find(r => r.id === id);
    if (!review) {
      return { error: 'Reseña no encontrada', status: 404 };
    }
    review.status = 'rejected';
    review.updatedAt = new Date();
    return { data: { ...review }, status: 200 };
  } catch (error) {
    console.error('Error en rejectReview:', error);
    return { error: 'Error al rechazar reseña', status: 500 };
  }
}

/**
 * Añade una respuesta a una reseña
 */
export async function addReviewResponse(
  reviewId: string,
  response: { authorId: string; authorName: string; content: string }
): Promise<ApiResponse<Review>> {
  try {
    await delay(400);
    const review = MOCK_REVIEWS.find(r => r.id === reviewId);
    if (!review) {
      return { error: 'Reseña no encontrada', status: 404 };
    }

    review.response = {
      id: `resp-${Date.now()}`,
      authorId: response.authorId,
      authorName: response.authorName,
      authorType: 'producer',
      content: response.content,
      createdAt: new Date()
    };
    review.updatedAt = new Date();

    return { data: { ...review }, status: 200 };
  } catch (error) {
    console.error('Error en addReviewResponse:', error);
    return { error: 'Error al añadir respuesta', status: 500 };
  }
}

/**
 * Reporta una reseña
 */
export async function flagReview(
  reviewId: string,
  reason: 'inappropriate' | 'spam' | 'fake' | 'offensive' | 'other',
  description?: string
): Promise<ApiResponse<Review>> {
  try {
    await delay(300);
    const review = MOCK_REVIEWS.find(r => r.id === reviewId);
    if (!review) {
      return { error: 'Reseña no encontrada', status: 404 };
    }

    if (!review.flags) review.flags = [];
    review.flags.push({
      id: `flag-${Date.now()}`,
      reason,
      description,
      reportedBy: 'current-user',
      createdAt: new Date(),
      resolved: false
    });
    review.status = 'flagged';
    review.updatedAt = new Date();

    return { data: { ...review }, status: 200 };
  } catch (error) {
    console.error('Error en flagReview:', error);
    return { error: 'Error al reportar reseña', status: 500 };
  }
}

/**
 * Marca una reseña como útil/no útil
 */
export async function markReviewHelpful(id: string, helpful: boolean): Promise<ApiResponse<Review>> {
  try {
    await delay(200);
    const review = MOCK_REVIEWS.find(r => r.id === id);
    if (!review) {
      return { error: 'Reseña no encontrada', status: 404 };
    }

    if (helpful) {
      review.helpful += 1;
    } else {
      review.notHelpful += 1;
    }

    return { data: { ...review }, status: 200 };
  } catch (error) {
    console.error('Error en markReviewHelpful:', error);
    return { error: 'Error al marcar reseña', status: 500 };
  }
}

/**
 * Elimina una reseña
 */
export async function deleteReview(id: string): Promise<ApiResponse<null>> {
  try {
    await delay(400);
    const index = MOCK_REVIEWS.findIndex(r => r.id === id);
    if (index === -1) {
      return { error: 'Reseña no encontrada', status: 404 };
    }
    MOCK_REVIEWS.splice(index, 1);
    return { status: 200, data: null };
  } catch (error) {
    console.error('Error en deleteReview:', error);
    return { error: 'Error al eliminar reseña', status: 500 };
  }
}

/**
 * Obtiene estadísticas de reseñas
 */
export async function fetchReviewStats(): Promise<ApiResponse<ReviewStats>> {
  try {
    await delay(300);
    return {
      data: calculateStats(MOCK_REVIEWS),
      status: 200
    };
  } catch (error) {
    console.error('Error en fetchReviewStats:', error);
    return { error: 'Error al obtener estadísticas', status: 500 };
  }
}