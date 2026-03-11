/**
 * @file notification.ts
 * @description Tipos para el sistema de notificaciones
 */

export type NotificationType = 'product' | 'order' | 'certification' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>; // Para datos adicionales específicos del tipo
}

export interface NotificationGroup {
  type: NotificationType;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<NotificationType, number>;
}

export interface NotificationsResponse {
  notifications: Notification[];
  stats: NotificationStats;
  hasMore: boolean;
  nextCursor?: string;
}