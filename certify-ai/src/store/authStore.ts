import { create } from 'zustand';
import { User } from '../types';
import { mockUser } from '../data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    if (email) {
      set({ user: mockUser, isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  signup: async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    set({
      user: { ...mockUser, name, email },
      isAuthenticated: true,
    });
    return true;
  },
}));
