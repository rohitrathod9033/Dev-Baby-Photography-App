import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

export const ProfileScreen = () => {
    return (
        <StyledView className="flex-1 bg-gray-900 pt-12 px-4">
            <StyledView className="items-center mb-8">
                <StyledView className="w-24 h-24 bg-gray-700 rounded-full mb-4 items-center justify-center overflow-hidden border-2 border-indigo-500">
                    <Ionicons name="person" size={50} color="#9ca3af" />
                </StyledView>
                <StyledText className="text-white text-xl font-bold">Dev Baby</StyledText>
                <StyledText className="text-gray-400">dev@example.com</StyledText>
            </StyledView>

            <StyledView className="space-y-4">
                <StyledTouchableOpacity className="bg-gray-800 p-4 rounded-xl flex-row items-center border border-gray-700">
                    <Ionicons name="settings-outline" size={20} color="white" style={{ marginRight: 12 }} />
                    <StyledText className="text-white flex-1">Settings</StyledText>
                    <Ionicons name="chevron-forward" size={20} color="gray" />
                </StyledTouchableOpacity>

                <StyledTouchableOpacity className="bg-gray-800 p-4 rounded-xl flex-row items-center border border-gray-700">
                    <Ionicons name="help-circle-outline" size={20} color="white" style={{ marginRight: 12 }} />
                    <StyledText className="text-white flex-1">Help & Support</StyledText>
                    <Ionicons name="chevron-forward" size={20} color="gray" />
                </StyledTouchableOpacity>

                <StyledTouchableOpacity className="bg-red-900/20 p-4 rounded-xl flex-row items-center border border-red-900/50 mt-8">
                    <Ionicons name="log-out-outline" size={20} color="#ef4444" style={{ marginRight: 12 }} />
                    <StyledText className="text-red-500 font-bold">Logout</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    );
};
