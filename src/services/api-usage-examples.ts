/**
 * Ejemplos de uso de los nuevos servicios de API
 * 
 * Los servicios están organizados por dominio:
 * - booksApiService: Operaciones con libros
 * - usersApiService: Operaciones con usuarios y autenticación
 * - reservationsApiService: Operaciones con reservas
 */

// 📚 USO DEL SERVICIO DE LIBROS
import { booksApiService } from './services/booksApi';

// Obtener todos los libros
const libros = await booksApiService.getBooks();

// Buscar libros por filtros
const librosFiltrados = await booksApiService.getBooks({
  genero: 'Fantasía',
  disponible: true
});

// Obtener un libro específico
const libro = await booksApiService.getBookById('123');

// Crear un nuevo libro (requiere autenticación)
const nuevoLibro = await booksApiService.createBook({
  titulo: 'Nuevo Libro',
  autor: 'Autor Name',
  editorial: 'Editorial Name',
  fechaPublicacion: '2024-01-01',
  genero: 'Ficción',
  cantidad: 10,
  imagen: 'url-imagen.jpg'
});

// Actualizar un libro
const libroActualizado = await booksApiService.updateBook('123', {
  titulo: 'Título Actualizado',
  cantidad: 15
});

// 👥 USO DEL SERVICIO DE USUARIOS
import { usersApiService } from './services/usersApi';

// Login
const authResponse = await usersApiService.login('usuario@email.com', 'contraseña');

// Registro
const registroResponse = await usersApiService.register(
  'Nombre Usuario', 
  'usuario@email.com', 
  'contraseña'
);

// Obtener lista de usuarios (solo admin)
const usuarios = await usersApiService.getUsers();

// Obtener perfil del usuario actual
const perfil = await usersApiService.getCurrentUser();

// Actualizar perfil
const perfilActualizado = await usersApiService.updateProfile({
  nombre: 'Nuevo Nombre'
});

// 📅 USO DEL SERVICIO DE RESERVAS
import { reservationsApiService } from './services/reservationsApi';

// Crear una reserva
const reserva = await reservationsApiService.createReservation({
  idUsuario: 'user123',
  libro: 'book123',
  fechaReserva: '2024-01-01',
  fechaEntrega: '2024-01-15'
});

// Obtener reservas del usuario actual
const misReservas = await reservationsApiService.getUserReservations();

// Obtener todas las reservas (admin)
const todasReservas = await reservationsApiService.getAllReservations();

// Cancelar una reserva
await reservationsApiService.cancelReservation('reserva123');

// Completar una reserva (devolver libro)
await reservationsApiService.completeReservation('reserva123');

// Renovar una reserva
const reservaRenovada = await reservationsApiService.renewReservation(
  'reserva123', 
  '2024-02-01'
);

// Verificar disponibilidad de un libro
const estaDisponible = await reservationsApiService.checkBookAvailability('book123');