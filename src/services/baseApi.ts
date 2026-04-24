export const API_BASE_URL = 'https://backend-proyecto01.onrender.com/api';

export interface BaseEntity {
  _id: string;
  inabilitado: boolean;
}

export interface User extends BaseEntity {
  nombre: string;
  correo: string;
  rol: string[];
}

export interface Book extends BaseEntity {
  titulo: string;
  autor: string;
  editorial: string;
  fechaPublicacion: string;
  genero: string;
  cantidad: number;
  disponible: number;
  imagen: string;
}

export interface Reservation extends BaseEntity {
  idUsuario: string;
  libro: string;
  fechaReserva: string;
  fechaEntrega: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  usuario?: User;
}

export abstract class BaseApiService {
  protected getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  protected async fetchWithAuth<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  protected buildQueryString(filters?: Record<string, any>): string {
    if (!filters || Object.keys(filters).length === 0) {
      return '';
    }
    return `?${new URLSearchParams(filters).toString()}`;
  }
}