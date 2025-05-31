import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/auth';
import { Usuario, Login, Cadastro, AuthContextData } from '../types/auth';
import Toast from 'react-native-toast-message';

const STORAGE_KEYS = {
  USER: '@AlertHaven:user',
  TOKEN: '@AlertHaven:token',
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
    loadRegisteredUsers();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await authService.getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRegisteredUsers = async () => {
    try {
      await authService.loadRegisteredUsers();
    } catch (error) {
      console.error('Erro ao carregar usuários registrados:', error);
    }
  };

  const signIn = async (login: Login) => {
    try {
      const response = await authService.signIn(login);
      setUser(response.usuario);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.usuario));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: Cadastro) => {
    try {
      const response = await authService.register(data);
      setUser(response.usuario);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.usuario));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const updateUser = async (updatedUser: Partial<Usuario>) => {
    try {
      if (!user) throw new Error('Nenhum usuário logado');
      
      const mergedUser = { ...user, ...updatedUser };
      await authService.updateUser(mergedUser);
      setUser(mergedUser);
      
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Perfil atualizado com sucesso!',
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error instanceof Error ? error.message : 'Erro ao atualizar perfil',
        position: 'bottom',
      });
      throw error;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      if (!user) throw new Error('Nenhum usuário logado');
      
      if (user.senha !== currentPassword) {
        throw new Error('Senha atual incorreta');
      }
      
      await authService.updatePassword(user.id, newPassword);
      setUser({ ...user, senha: newPassword });
      
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Senha alterada com sucesso!',
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error instanceof Error ? error.message : 'Erro ao alterar senha',
        position: 'bottom',
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, register, signOut, updateUser, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
