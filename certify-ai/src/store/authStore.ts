import { create } from 'zustand';
import { User, UserRole } from '../types';
import { mockUser, mockTeacher } from '../data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string, role?: UserRole) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, _password: string, role: UserRole = 'student') => {
    await new Promise((r) => setTimeout(r, 800));
    if (email) {
      const baseUser = role === 'teacher' ? mockTeacher : mockUser;
      set({ user: { ...baseUser, email }, isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  signup: async (name: string, email: string, _password: string, role: UserRole = 'student') => {
    await new Promise((r) => setTimeout(r, 800));
    const baseUser = role === 'teacher' ? mockTeacher : mockUser;
    set({
      user: { ...baseUser, name, email },
      isAuthenticated: true,
    });
    return true;
  },
}));
