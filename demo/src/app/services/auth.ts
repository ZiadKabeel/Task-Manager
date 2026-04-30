import { inject, Injectable, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { API } from './api';
import { User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = inject(API);
  currentUser = signal<User | null>(null);
  sessionKey = 'currentUser';

  constructor() {
    const savedUser = localStorage.getItem(this.sessionKey);
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser) as User);
    }
  }

  signup(user: User): Observable<User> {
    const normalizedUser: User = {
      ...user,
      username: user.username.trim(),
      email: user.email.trim().toLowerCase(),
      password: user.password.trim()
    };

    return this.api.addUser(normalizedUser);
  }

  login(email: string, password: string): Observable<boolean> {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    
    return this.api.getUsers().pipe(
      map((users) =>
        users.find(
          (user) =>
            user.email.trim().toLowerCase() === normalizedEmail &&
            user.password.trim() === normalizedPassword
        ) ?? null
      ),
      tap((matchedUser) => {
        if (matchedUser) {
          this.currentUser.set(matchedUser);
          localStorage.setItem(this.sessionKey, JSON.stringify(matchedUser));
        }
      }),
      map((matchedUser) => matchedUser !== null)
    );
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem(this.sessionKey);
  }
}
