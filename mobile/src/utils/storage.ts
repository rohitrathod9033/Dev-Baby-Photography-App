import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const storage = {
    setItem: async (key: string, value: string) => {
        try {
            if (isWeb) {
                localStorage.setItem(key, value);
            } else {
                await SecureStore.setItemAsync(key, value);
            }
        } catch (e) {
            console.error('Error setting item', e);
        }
    },
    getItem: async (key: string): Promise<string | null> => {
        try {
            if (isWeb) {
                return localStorage.getItem(key);
            } else {
                return await SecureStore.getItemAsync(key);
            }
        } catch (e) {
            console.error('Error getting item', e);
            return null;
        }
    },
    deleteItem: async (key: string) => {
        try {
            if (isWeb) {
                localStorage.removeItem(key);
            } else {
                await SecureStore.deleteItemAsync(key);
            }
        } catch (e) {
            console.error('Error deleting item', e);
        }
    },
};
