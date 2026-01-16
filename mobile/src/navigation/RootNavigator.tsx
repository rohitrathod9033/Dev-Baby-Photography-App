import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { UserTabs } from './UserTabs';
import { AdminTabs } from './AdminTabs';
import { useAuthStore } from '../store/authStore';
import { PackagesScreen } from '../screens/PackagesScreen';
import { SlotSelectionScreen } from '../screens/SlotSelectionScreen';

const Stack = createStackNavigator();

export const RootNavigator = () => {
    // Ideally use store to check if authenticated
    // const { isAuthenticated, user } = useAuthStore();
    const isAuthenticated = false;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
            ) : (
                // Logic to switch between User/Admin based on role
                <Stack.Screen name="UserApp" component={UserTabs} />
            )}
            <Stack.Screen name="Packages" component={PackagesScreen} />
            <Stack.Screen name="SlotSelection" component={SlotSelectionScreen} />
        </Stack.Navigator>
    );
};
