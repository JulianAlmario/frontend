// Base API
export { API_BASE_URL, BaseApiService } from './baseApi';
export type { BaseEntity, AuthResponse } from './baseApi';

// Interfaces
export type { Book, User, Reservation } from './baseApi';

// Services
export { booksApiService } from './booksApi';
export { usersApiService } from './usersApi';
export { reservationsApiService } from './reservationsApi';

// Legacy service for backward compatibility
export { apiService } from './legacyApi';