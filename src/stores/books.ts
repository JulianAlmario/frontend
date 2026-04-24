import { create } from 'zustand';
import {booksApiService } from '../services';
import type { Book } from '../services/baseApi';

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: (filters?: any) => Promise<void>;
  getBookById: (id: string) => Book | undefined;
  updateBookAvailability: (id: string, newAvailable: number) => void;
}

export const useBooksStore = create<BooksState>((set, get) => ({
  books: [],
  loading: false,
  error: null,

  fetchBooks: async (filters?: any) => {
    set({ loading: true, error: null });
    try {
      const books = await booksApiService.getBooks(filters);
      set({ books, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar libros', 
        loading: false 
      });
    }
  },

  getBookById: (id: string) => {
    const { books } = get();
    return books.find(book => book._id === id);
  },

  updateBookAvailability: (id: string, newAvailable: number) => {
    set((state) => ({
      books: state.books.map(book => 
        book._id === id ? { ...book, disponible: newAvailable } : book
      )
    }));
  }
}));