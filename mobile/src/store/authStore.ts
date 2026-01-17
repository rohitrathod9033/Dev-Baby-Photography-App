import { create } from 'zustand';
import { storage } from '../utils/storage';

interface AuthState {
    user: any | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: any, token: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    login: async (user, token) => {
        await storage.setItem('token', token);
        await storage.setItem('user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
    },
    logout: async () => {
        await storage.deleteItem('token');
        await storage.deleteItem('user');
        set({ user: null, token: null, isAuthenticated: false });
    },
    checkAuth: async () => {
        try {
            const token = await storage.getItem('token');
            const userStr = await storage.getItem('user');
            if (token && userStr) {
                set({ token, user: JSON.parse(userStr), isAuthenticated: true });
            }
        } catch (e) {
            console.error('Error checking auth', e);
        }
    },
}));
