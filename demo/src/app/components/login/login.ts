import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})  
export class Login {
  authService = inject(AuthService);
  router = inject(Router);
  notificationService = inject(NotificationService);
  email: string = '';
  password: string = '';
  onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      loginForm.form.markAllAsTouched();
      return;
    }

    this.email = (loginForm.value.email ?? '').toString();
    this.password = (loginForm.value.password ?? '').toString();

    this.authService.login(this.email, this.password).subscribe({
      next: (isLoggedIn) => {
        if (!isLoggedIn) {
          this.notificationService.showNotification({
            message: 'Invalid email or password.',
            type: 'error'
          });
          return;
        }

        this.notificationService.showNotification({
          message: 'Login successful!',
          type: 'success'
        });
        loginForm.resetForm({ email: '', password: '' });
        this.email = '';
        this.password = '';
        this.router.navigate(['/Home']);
      },
      error: () => {
        this.notificationService.showNotification({
          message: 'Unable to login right now. Please try again.',
          type: 'error'
        });
      }
    });
  }
}
