import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
import { ManagePackagesScreen } from '../screens/admin/ManagePackagesScreen';

const Tab = createBottomTabNavigator();

export const AdminTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#1f2937',
                    borderTopColor: '#374151',
                },
                tabBarActiveTintColor: '#ef4444',
            }}
        >
            <Tab.Screen name="AdminHome" component={AdminDashboardScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart" size={size} color={color} /> }} />
            <Tab.Screen name="Packages" component={ManagePackagesScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} /> }} />
        </Tab.Navigator>
    );
};
