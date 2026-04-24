import { create } from 'zustand';
import { booksApiService } from '../services';
import type {Book} from '../services';

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
  fetchBooks: (filters?: any) => Promise<void>;
  getBookById: (id: string) => Book | undefined;
  updateBookAvailability: (id: string, newAvailable: number) => void;
  preloadBooks: () => Promise<void>;
  clearCache: () => void;
}

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useBooksStore = create<BooksState>((set, get) => ({
  books: [],
  loading: false,
  error: null,
  lastFetch: null,

  fetchBooks: async (filters?: any) => {
    const { lastFetch, books } = get();
    const now = Date.now();
    
    // Use cache if data is fresh and no filters are applied
    if (!filters && books.length > 0 && lastFetch && (now - lastFetch) < CACHE_DURATION) {
      return;
    }
    
    set({ loading: true, error: null });
    try {
      const fetchedBooks = await booksApiService.getBooks(filters);
      set({ 
        books: fetchedBooks, 
        loading: false, 
        lastFetch: now 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar libros', 
        loading: false 
      });
    }
  },

  preloadBooks: async () => {
    const { books, lastFetch } = get();
    const now = Date.now();
    
    // Preload only if no data or data is stale
    if (books.length === 0 || !lastFetch || (now - lastFetch) >= CACHE_DURATION) {
      try {
        const fetchedBooks = await booksApiService.getBooks();
        set({ 
          books: fetchedBooks, 
          lastFetch: now 
        });
      } catch (error) {
        console.warn('Failed to preload books:', error);
      }
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
  },

  clearCache: () => {
    set({ 
      books: [], 
      lastFetch: null 
    });
  }
}));