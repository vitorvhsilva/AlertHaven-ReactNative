import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse, Cadastro, Login, Usuario } from '../types/auth';

const STORAGE_KEYS = {
  USER: '@AlertHaven:user',
  TOKEN: '@AlertHaven:token',
  REGISTERED_USERS: '@AlertHaven:registeredUsers',
};

let usuarioSalvos: Usuario[] = [] 

export const authService = {

    async loadRegisteredUsers(): Promise<void> {
      try {
        const usersJson = await AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
        if (usersJson) {
          usuarioSalvos = JSON.parse(usersJson);
          console.log(usuarioSalvos)
        }
      } catch (error) {
        console.error('Erro ao carregar usuários registrados:', error);
      }
    },

    async signIn(login: Login): Promise<AuthResponse> {
        const usuario: Usuario | undefined = usuarioSalvos.find(
          (u) => u.email === login.email
        );
        if (usuario?.senha === login.senha && usuario?.senha === login.senha) {
          return {
            usuario: usuario,
            token: usuario.id,
          };
        }
        throw new Error('Email ou senha inválidos');
    },

  async register(data: Cadastro): Promise<AuthResponse> {
    if (
      usuarioSalvos.some((u) => u.email === data.email)
    ) {
      throw new Error('Email já está em uso');
    }

    const novoUsuario: Usuario = {
      id: `${usuarioSalvos.length + 1}`,
      nome: data.nome,
      cpf: data.cpf,
      telefone: data.telefone,
      email: data.email,
      senha: data.senha,
      dataNascimento: data.dataNascimento,
      dataCriacao: data.dataCriacao
    };

    console.log('Novo usuário adicionado:', novoUsuario); 
    console.log('Lista atualizada:', usuarioSalvos); 

    usuarioSalvos.push(novoUsuario);

    await AsyncStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(usuarioSalvos));

    return {
      usuario: novoUsuario,
      token: novoUsuario.id,
    };
  },

  async signOut(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  async getStoredUser(): Promise<Usuario | null> {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      if (userJson) {
        return JSON.parse(userJson);
      }
      return null;
    } catch (error) {
      console.error('Erro ao obter usuário armazenado:', error);
      return null;
    }
  },

  async updateUser(updatedUser: Usuario): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      
      const usersJson = await AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      if (usersJson) {
        const users: Usuario[] = JSON.parse(usersJson);
        const updatedUsers = users.map(user => 
          user.id === updatedUser.id ? updatedUser : user
        );
        await AsyncStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  },

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    try {
      const usersJson = await AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      if (usersJson) {
        const users: Usuario[] = JSON.parse(usersJson);
        const updatedUsers = users.map(user => 
          user.id === userId ? { ...user, senha: newPassword } : user
        );
        await AsyncStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(updatedUsers));
        
        const currentUser = await this.getStoredUser();
        if (currentUser && currentUser.id === userId) {
          await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({
            ...currentUser,
            senha: newPassword
          }));
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      throw error;
    }
  }
}; 
