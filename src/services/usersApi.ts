import { BaseApiService  } from './baseApi';
import type {User,AuthResponse} from './baseApi'

class UsersApiService extends BaseApiService {
  /**
   * Inicia sesión con email y contraseña
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await this.fetchWithAuth<AuthResponse>('/iniciar-sesion', {
      method: 'POST',
      body: JSON.stringify({ correo: email, clave: password }),
    });
    return data;
  }

  /**
   * Registra un nuevo usuario
   */
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const data = await this.fetchWithAuth<AuthResponse>('/registro', {
      method: 'POST',
      body: JSON.stringify({ nombre: name, correo: email, clave: password }),
    });
    return data;
  }

  /**
   * Obtiene todos los usuarios (requiere autenticación)
   */
  async getUsers(): Promise<User[]> {
    const data = await this.fetchWithAuth<{ Usuarios: User[] }>('/lista-usuarios');
    return data.Usuarios || [];
  }

  /**
   * Obtiene un usuario específico por ID
   */
  async getUserById(id: string): Promise<User> {
    const data = await this.fetchWithAuth<{ usuario: User }>(`/usuarios/${id}`);
    return data.usuario;
  }

  /**
   * Actualiza un usuario existente
   */
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const data = await this.fetchWithAuth<{ usuario: User }>(`/usuarios/actualizar`, {
      method: 'PATCH',
      body: JSON.stringify({ id, ...userData }),
    });
    return data.usuario;
  }

  /**
   * Desactiva un usuario (soft delete)
   */
  async deactivateUser(id: string): Promise<void> {
    await this.fetchWithAuth(`/usuarios/desactivar/${id}`, {
      method: 'PATCH',
    });
  }

  /**
   * Obtiene el perfil del usuario actual
   */
  async getCurrentUser(): Promise<User> {
    const data = await this.fetchWithAuth<{ usuario: User }>('/perfil');
    return data.usuario;
  }

  /**
   * Actualiza el perfil del usuario actual
   */
  async updateProfile(userData: Partial<User>): Promise<User> {
    const data = await this.fetchWithAuth<{ usuario: User }>('/perfil/actualizar', {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
    return data.usuario;
  }

  /**
   * Cambia la contraseña del usuario
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.fetchWithAuth('/cambiar-contrasena', {
      method: 'POST',
      body: JSON.stringify({
        contrasenaActual: currentPassword,
        nuevaContrasena: newPassword,
      }),
    });
  }
}

export const usersApiService = new UsersApiService();