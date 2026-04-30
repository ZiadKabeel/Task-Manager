import { Component, inject } from '@angular/core';
import {  AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators,ValidationErrors } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { NotificationService } from '../../services/notification.service';

function passwordMatchValidator(form: AbstractControl): ValidationErrors | null{
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { mismatch: true };
  }
  return null;
}
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  authService = inject(AuthService);
  router = inject(Router);
  notificationService = inject(NotificationService);

  signupForm = new FormGroup(
  {
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  },
  {
    validators: [passwordMatchValidator] // Add the custom validator to the form group
  }
);

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    const { username, email, password } = this.signupForm.getRawValue();

    this.authService.signup({
      username: username ?? '',
      email: email ?? '',
      password: password ?? ''
    }).subscribe({
      next: () => {
        this.notificationService.showNotification({
          message: 'Signup successful! Please login.',
          type: 'success'
        });
        this.signupForm.reset();
        this.signupForm.setErrors(null);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.notificationService.showNotification({
          message: 'Unable to signup right now. Please try again.',
          type: 'error'
        });
      }
    });

}
}

