/**
 * @deprecated Este archivo está deprecado. Usa los servicios específicos por dominio:
 * - booksApiService para operaciones con libros
 * - usersApiService para operaciones con usuarios y autenticación  
 * - reservationsApiService para operaciones con reservas
 * 
 * Ejemplo de uso de los nuevos servicios:
 * import { booksApiService, usersApiService, reservationsApiService } from './services';
 */

export { apiService } from './legacyApi';
export * from './baseApi';