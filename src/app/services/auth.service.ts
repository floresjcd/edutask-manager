import { Injectable, signal } from '@angular/core';
import { User } from '../models/task.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'edutask_users';
  private readonly CURRENT_USER_KEY = 'edutask_current_user';

  currentUser = signal<User | null>(null);

  constructor(private router: Router) {
    const savedUser = localStorage.getItem(this.CURRENT_USER_KEY);
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  register(user: User): boolean {
    const users = this.getUsers();
    if (users.find(u => u.email === user.email)) {
      return false;
    }
    user.id = Date.now().toString();
    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      this.currentUser.set(userWithoutPassword);
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }
}
