import { booksApiService } from './booksApi';
import { usersApiService } from './usersApi';
import { reservationsApiService } from './reservationsApi';
import type { Book, User, Reservation, AuthResponse } from './baseApi';


/**
 * Servicio API legacy para mantener compatibilidad con código existente
 * Este servicio delega a los nuevos servicios específicos por dominio
 */
class LegacyApiService {
  // Books methods
  async getBooks(filters?: any): Promise<Book[]> {
    return booksApiService.getBooks(filters);
  }

  async getAllBooks(): Promise<Book[]> {
    return booksApiService.getAllBooks();
  }

  async getBookById(id: string): Promise<Book> {
    return booksApiService.getBookById(id);
  }

  async createBook(bookData: Partial<Book>): Promise<Book> {
    return booksApiService.createBook(bookData);
  }

  async updateBook(id: string, bookData: Partial<Book>): Promise<Book> {
    return booksApiService.updateBook(id, bookData);
  }

  async deleteBook(id: string): Promise<void> {
    return booksApiService.deleteBook(id);
  }

  // Users methods
  async login(email: string, password: string): Promise<AuthResponse> {
    return usersApiService.login(email, password);
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    return usersApiService.register(name, email, password);
  }

  async getUsers(): Promise<User[]> {
    return usersApiService.getUsers();
  }

  // Reservations methods
  async createReservation(reservationData: Partial<Reservation>): Promise<Reservation> {
    return reservationsApiService.createReservation(reservationData);
  }

  async getUserReservations(): Promise<Reservation[]> {
    return reservationsApiService.getUserReservations();
  }
}

export const apiService = new LegacyApiService();