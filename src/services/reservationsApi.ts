import { BaseApiService } from './baseApi';
import type {Reservation, Book} from './baseApi'

class ReservationsApiService extends BaseApiService {
  /**
   * Crea una nueva reserva
   */
  async createReservation(reservationData: Partial<Reservation>): Promise<Reservation> {
    const data = await this.fetchWithAuth<{ reserva: Reservation }>('/reserva/crear', {
      method: 'POST',
      body: JSON.stringify(reservationData),
    });
    return data.reserva;
  }

  /**
   * Obtiene todas las reservas del usuario actual
   */
  async getUserReservations(): Promise<Reservation[]> {
    const data = await this.fetchWithAuth<{ Reservas: Reservation[] }>('/reserva/devolver');
    return data.Reservas || [];
  }

  /**
   * Obtiene todas las reservas (admin)
   */
  async getAllReservations(): Promise<Reservation[]> {
    const data = await this.fetchWithAuth<{ Reservas: Reservation[] }>('/reservas/todas');
    return data.Reservas || [];
  }

  /**
   * Obtiene una reserva específica por ID
   */
  async getReservationById(id: string): Promise<Reservation> {
    const data = await this.fetchWithAuth<{ reserva: Reservation }>(`/reserva/${id}`);
    return data.reserva;
  }

  /**
   * Actualiza una reserva existente
   */
  async updateReservation(id: string, reservationData: Partial<Reservation>): Promise<Reservation> {
    const data = await this.fetchWithAuth<{ reserva: Reservation }>(`/reserva/actualizar`, {
      method: 'PATCH',
      body: JSON.stringify({ id, ...reservationData }),
    });
    return data.reserva;
  }

  /**
   * Cancela una reserva
   */
  async cancelReservation(id: string): Promise<void> {
    await this.fetchWithAuth(`/reserva/cancelar/${id}`, {
      method: 'PATCH',
    });
  }

  /**
   * Completa una reserva (devuelve el libro)
   */
  async completeReservation(id: string): Promise<void> {
    await this.fetchWithAuth(`/reserva/completar/${id}`, {
      method: 'PATCH',
    });
  }

  /**
   * Obtiene las reservas activas (no completadas ni canceladas)
   */
  async getActiveReservations(): Promise<Reservation[]> {
    const data = await this.fetchWithAuth<{ Reservas: Reservation[] }>('/reservas/activas');
    return data.Reservas || [];
  }

  /**
   * Obtiene las reservas vencidas
   */
  async getOverdueReservations(): Promise<Reservation[]> {
    const data = await this.fetchWithAuth<{ Reservas: Reservation[] }>('/reservas/vencidas');
    return data.Reservas || [];
  }

  /**
   * Renueva una reserva
   */
  async renewReservation(id: string, newReturnDate: string): Promise<Reservation> {
    const data = await this.fetchWithAuth<{ reserva: Reservation }>(`/reserva/renovar/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ fechaEntrega: newReturnDate }),
    });
    return data.reserva;
  }

  /**
   * Verifica si un libro está disponible para reserva
   */
  async checkBookAvailability(bookId: string): Promise<boolean> {
    const data = await this.fetchWithAuth<{ disponible: boolean }>(`/libro/disponible/${bookId}`);
    return data.disponible;
  }

  /**
   * Obtiene el historial de reservas de un usuario
   */
  async getUserReservationHistory(userId: string): Promise<Reservation[]> {
    const data = await this.fetchWithAuth<{ Reservas: Reservation[] }>(`/usuario/${userId}/reservas`);
    return data.Reservas || [];
  }
}

export const reservationsApiService = new ReservationsApiService();