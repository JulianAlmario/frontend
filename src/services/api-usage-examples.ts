/**
 * Ejemplos de uso de los nuevos servicios de API
 * 
 * Los servicios están organizados por dominio:
 * - booksApiService: Operaciones con libros
 * - usersApiService: Operaciones con usuarios y autenticación
 * - reservationsApiService: Operaciones con reservas
 */

// 📚 USO DEL SERVICIO DE LIBROS
import { booksApiService } from './booksApi';

// Obtener todos los libros
const libros = await booksApiService.getBooks();
console.log(libros);

// Buscar libros por filtros
const librosFiltrados = await booksApiService.getBooks({
  genero: 'Fantasía',
  disponible: true
});
console.log(librosFiltrados);

// Obtener un libro específico
const libro = await booksApiService.getBookById('123');
console.log(libro);

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
console.log(nuevoLibro);

// Actualizar un libro
const libroActualizado = await booksApiService.updateBook('123', {
  titulo: 'Título Actualizado',
  cantidad: 15
});
console.log(libroActualizado);

// 👥 USO DEL SERVICIO DE USUARIOS
import { usersApiService } from './usersApi';

// Login
const authResponse = await usersApiService.login('usuario@email.com', 'contraseña');
console.log(authResponse);

// Registro
const registroResponse = await usersApiService.register(
  'Nombre Usuario', 
  'usuario@email.com', 
  'contraseña'
);
console.log(registroResponse);

// Obtener lista de usuarios (solo admin)
const usuarios = await usersApiService.getUsers();
console.log(usuarios);

// Obtener perfil del usuario actual
const perfil = await usersApiService.getCurrentUser();
console.log(perfil);

// Actualizar perfil
const perfilActualizado = await usersApiService.updateProfile({
  nombre: 'Nuevo Nombre'
});
console.log(perfilActualizado);

// 📅 USO DEL SERVICIO DE RESERVAS
import { reservationsApiService } from './reservationsApi';

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