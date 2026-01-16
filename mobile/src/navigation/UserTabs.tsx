import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserdDashboardScreen } from '../screens/user/UserDashboardScreen';
import { MyBookingsScreen } from '../screens/user/MyBookingsScreen';
import { ProfileScreen } from '../screens/user/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const UserTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#1f2937', // gray-800
                    borderTopColor: '#374151', // gray-700
                    height: 60,
                    paddingBottom: 5,
                },
                tabBarActiveTintColor: '#6366f1', // indigo-500
                tabBarInactiveTintColor: '#9ca3af', // gray-400
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'MyBookings') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={UserdDashboardScreen} />
            <Tab.Screen name="MyBookings" component={MyBookingsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};
