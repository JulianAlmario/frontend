// Simple auth state management for Astro
import type { User } from '../services';

export class AuthStore {
  private static instance: AuthStore;
  private currentUser: User | null = null;
  private token: string | null = null;

  private constructor() {
    this.loadFromStorage();
  }

  static getInstance(): AuthStore {
    if (!AuthStore.instance) {
      AuthStore.instance = new AuthStore();
    }
    return AuthStore.instance;
  }

  private loadFromStorage(): void {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (this.token && userStr) {
        try {
          this.currentUser = JSON.parse(userStr);
        } catch (error) {
          this.clearAuth();
        }
      }
    }
  }

  private clearAuth(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.currentUser = null;
    this.token = null;
  }

  get user(): User | null {
    return this.currentUser;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser && !!this.token;
  }

  get isLoading(): boolean {
    return false; // Simplified for Astro
  }

  hasRole(role: string): boolean {
    return this.currentUser?.rol?.includes(role) || false;
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  logout(): void {
    this.clearAuth();
  }
}

// Export singleton instance
export const authStore = AuthStore.getInstance();