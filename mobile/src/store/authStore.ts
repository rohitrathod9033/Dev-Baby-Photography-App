import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

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
        await SecureStore.setItemAsync('token', token);
        await SecureStore.setItemAsync('user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
    },
    logout: async () => {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('user');
        set({ user: null, token: null, isAuthenticated: false });
    },
    checkAuth: async () => {
        try {
            const token = await SecureStore.getItemAsync('token');
            const userStr = await SecureStore.getItemAsync('user');
            if (token && userStr) {
                set({ token, user: JSON.parse(userStr), isAuthenticated: true });
            }
        } catch (e) {
            console.error('Error checking auth', e);
        }
    },
}));
