// Store simples de autenticação
import { create } from 'zustand';

interface AuthStore {
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  login: (user: { name: string; email: string }) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  isLoggedIn: false,
  user: null,
  
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
}));
