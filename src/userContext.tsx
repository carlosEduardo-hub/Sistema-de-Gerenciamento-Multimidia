import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserData } from './dataUser/userData';
import { api } from "../src/api/token";

// Tipos dos dados do usuário
interface User {
  id: number | null;
  email: string;
  username: string;
  name: string;
  description: string | null;
  date_joined: string;
  date_of_birth: string | null;
  profile_picture: string;
}

// Estado inicial do usuário com dados mockados para visualização imediata
const initialUserState: User = {
  id: 1,
  email: 'usuario@teste.com',
  username: 'usuario_teste',
  name: 'Usuário de Teste',
  description: 'Descrição do usuário de teste',
  date_joined: '2024-01-01',
  date_of_birth: '2000-01-01',
  profile_picture: '/robot_perfil.png',
};

// Tipos para o contexto
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  fetchUserData: () => void; // Adicionada função para buscar os dados do usuário
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider do contexto
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(initialUserState);

  const fetchUserData = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('user_id');

      if (!token || !userId) {
        // Se não houver token, mantemos o estado inicial (que já contém dados mockados)
        setUser(initialUserState);
        return; 
      }

      // Adiciona o token ao cabeçalho da API
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Faz a requisição utilizando `api.get`
      const response = await api.get<UserData>(`/users/${userId}/`);

      // Define os dados do usuário no estado
      setUser(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Erro ao buscar dados do usuário (usando mock):', error.response?.data || error.message);
      // Em caso de erro, usa o mock (initialUserState)
      setUser(initialUserState);
    }
  };

  useEffect(() => {
    fetchUserData(); // Busca os dados do usuário ao carregar
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para acessar o contexto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
