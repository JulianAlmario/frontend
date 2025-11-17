export const API_BASE_URL = 'http://localhost:3000/api';

export interface Book {
  _id: string;
  titulo: string;
  autor: string;
  editorial: string;
  fechaPublicacion: string;
  genero: string;
  cantidad: number;
  disponible: number;
  inabilitado: boolean;
}

export interface User {
  _id: string;
  nombre: string;
  correo: string;
  rol: string[];
  inabilitado: boolean;
}

export interface Reservation {
  _id: string;
  idUsuario: string;
  libro: string;
  fechaReserva: string;
  fechaEntrega: string;
  inabilitado: boolean;
}

export interface AuthResponse {
  message: string;
  token?: string;
  usuario?: User;
}

class ApiService {
  private getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/iniciar-sesion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo: email, clave: password }),
    });
    return response.json();
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: name, correo: email, clave: password }),
    });
    return response.json();
  }

  async getBooks(filters?: any): Promise<Book[]> {
    const queryString = filters ? `?${new URLSearchParams(filters).toString()}` : '';
    const response = await fetch(`${API_BASE_URL}/libros/buscar/filtros${queryString}`);
    const data = await response.json();
    return data.Libros || [];
  }

  async getBookById(id: string): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/libros/buscar/${id}`);
    const data = await response.json();
    return data.Libro;
  }

  async createBook(bookData: Partial<Book>): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/libros/crear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(bookData),
    });
    const data = await response.json();
    return data.libro;
  }

  async updateBook(id: string, bookData: Partial<Book>): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/libros/actualizar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify({ id, ...bookData }),
    });
    const data = await response.json();
    return data.Libros;
  }

  async deleteBook(id: string): Promise<void> {
    await fetch(`${API_BASE_URL}/libros/eliminar/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeader(),
    });
  }

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/lista-usuarios`, {
      headers: this.getAuthHeader(),
    });
    const data = await response.json();
    return data.Usuarios || [];
  }

  async createReservation(reservationData: Partial<Reservation>): Promise<Reservation> {
    const response = await fetch(`${API_BASE_URL}/reserva/crear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(reservationData),
    });
    const data = await response.json();
    return data.reserva;
  }

  async getUserReservations(): Promise<Reservation[]> {
    const response = await fetch(`${API_BASE_URL}/reserva/devolver`, {
      headers: this.getAuthHeader(),
    });
    const data = await response.json();
    return data.Reservas || [];
  }
}

export const apiService = new ApiService();