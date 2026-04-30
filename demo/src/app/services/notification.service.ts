import { Injectable, signal } from '@angular/core';
import { Notification } from '../types';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification = signal<Notification>({
    message: '',
    type: 'info'
  });

  private notificationTimer: ReturnType<typeof setTimeout> | null = null;

  showNotification(notification: Notification): void {
    this.notification.set(notification);

    if (this.notificationTimer) {
      clearTimeout(this.notificationTimer);
    }

    this.notificationTimer = setTimeout(() => {
      this.clearNotification();
      this.notificationTimer = null;
    }, 3000);
  }

  clearNotification(): void {
    this.notification.set({
      message: '',
      type: 'info'
    });
  }
}
