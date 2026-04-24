import { BaseApiService } from './baseApi';
import type { Book } from './baseApi';

class BooksApiService extends BaseApiService {
  /**
   * Obtiene todos los libros con filtros opcionales
   */
  async getBooks(filters?: Record<string, any>): Promise<Book[]> {
    const queryString = this.buildQueryString(filters);
    const data = await this.fetchWithAuth<{ Libros: Book[] }>(`/libros/buscar/filtros${queryString}`);
    return data.Libros || [];
  }

  async getAllBooks(): Promise<Book[]> {
    const data = await this.fetchWithAuth<{ Libros: Book[] }>(`/libros/buscar/filtros`);
    return data.Libros || [];
  }

  /**
   * Obtiene un libro específico por ID
   */
  async getBookById(id: string): Promise<Book> {
    const data = await this.fetchWithAuth<{ Libro: Book }>(`/libros/buscar/${id}`);
    return data.Libro;
  }

  /**
   * Crea un nuevo libro
   */
  async createBook(bookData: Partial<Book>): Promise<Book> {
    const data = await this.fetchWithAuth<{ libro: Book }>(`/libros/crear`, {
      method: 'POST',
      body: JSON.stringify(bookData),
    });
    return data.libro;
  }

  /**
   * Actualiza un libro existente
   */
  async updateBook(id: string, bookData: Partial<Book>): Promise<Book> {
    const data = await this.fetchWithAuth<{ Libros: Book }>(`/libros/actualizar`, {
      method: 'PATCH',
      body: JSON.stringify({ id, ...bookData }),
    });
    return data.Libros;
  }

  /**
   * Elimina un libro por ID
   */
  async deleteBook(id: string): Promise<void> {
    await this.fetchWithAuth(`/libros/eliminar/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * Busca libros por título
   */
  async searchBooksByTitle(title: string): Promise<Book[]> {
    return this.getBooks({ titulo: title });
  }

  /**
   * Busca libros por autor
   */
  async searchBooksByAuthor(author: string): Promise<Book[]> {
    return this.getBooks({ autor: author });
  }

  /**
   * Busca libros por género
   */
  async searchBooksByGenre(genre: string): Promise<Book[]> {
    return this.getBooks({ genero: genre });
  }

  /**
   * Obtiene solo libros disponibles
   */
  async getAvailableBooks(): Promise<Book[]> {
    const books = await this.getBooks();
    return books.filter(book => book.disponible > 0 && !book.inabilitado);
  }
}

export const booksApiService = new BooksApiService();