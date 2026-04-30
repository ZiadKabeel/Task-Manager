import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth';
import { NotificationService } from './services/notification.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  if (authService.isAuthenticated()) {
    return true;
  }

  notificationService.showNotification({
    message: 'You must be logged in to access this page.',
    type: 'warning'
  });
  return router.createUrlTree(['/login']);
};
