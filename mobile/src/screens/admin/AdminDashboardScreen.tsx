import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);

export const AdminDashboardScreen = () => {
    return (
        <StyledView className="flex-1 bg-gray-900 pt-12 px-4">
            <StyledText className="text-white text-2xl font-bold mb-6">Admin Dashboard</StyledText>

            <StyledView className="flex-row flex-wrap justify-between">
                <StyledView className="w-[48%] bg-gray-800 p-4 rounded-xl mb-4 border border-gray-700">
                    <Ionicons name="people" size={24} color="#6366f1" className="mb-2" />
                    <StyledText className="text-gray-400 text-sm">Total Users</StyledText>
                    <StyledText className="text-white text-2xl font-bold">1,240</StyledText>
                </StyledView>

                <StyledView className="w-[48%] bg-gray-800 p-4 rounded-xl mb-4 border border-gray-700">
                    <Ionicons name="calendar" size={24} color="#10b981" className="mb-2" />
                    <StyledText className="text-gray-400 text-sm">Bookings</StyledText>
                    <StyledText className="text-white text-2xl font-bold">856</StyledText>
                </StyledView>

                <StyledView className="w-[48%] bg-gray-800 p-4 rounded-xl mb-4 border border-gray-700">
                    <Ionicons name="images" size={24} color="#f59e0b" className="mb-2" />
                    <StyledText className="text-gray-400 text-sm">Packages</StyledText>
                    <StyledText className="text-white text-2xl font-bold">12</StyledText>
                </StyledView>

                <StyledView className="w-[48%] bg-gray-800 p-4 rounded-xl mb-4 border border-gray-700">
                    <Ionicons name="cash" size={24} color="#ef4444" className="mb-2" />
                    <StyledText className="text-gray-400 text-sm">Pending</StyledText>
                    <StyledText className="text-white text-2xl font-bold">45</StyledText>
                </StyledView>
            </StyledView>

            <StyledText className="text-white text-lg font-bold mb-4 mt-4">Recent Activity</StyledText>
            <ScrollView>
                {[1, 2, 3].map(i => (
                    <StyledView key={i} className="bg-gray-800 p-4 rounded-xl mb-2 flex-row items-center border border-gray-700">
                        <StyledView className="w-2 h-2 rounded-full bg-indigo-500 mr-4" />
                        <StyledText className="text-gray-300">New Booking: New Born Package</StyledText>
                    </StyledView>
                ))}
            </ScrollView>
        </StyledView>
    );
};
