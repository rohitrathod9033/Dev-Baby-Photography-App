import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { ChatAssistant } from '../../components/ChatAssistant';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const UserdDashboardScreen = ({ navigation }: any) => {
    return (
        <StyledView className="flex-1 bg-gray-900 pt-12 px-4">
            <StyledView className="flex-row justify-between items-center mb-6">
                <StyledView>
                    <StyledText className="text-gray-400 text-sm">Welcome back,</StyledText>
                    <StyledText className="text-white text-2xl font-bold">Dev Baby</StyledText>
                </StyledView>
                <StyledTouchableOpacity className="bg-gray-800 p-2 rounded-full">
                    <Ionicons name="notifications-outline" size={24} color="white" />
                </StyledTouchableOpacity>
            </StyledView>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Promo Banner */}
                <StyledView className="bg-indigo-600 rounded-2xl p-6 mb-8">
                    <StyledText className="text-white text-xl font-bold mb-2">Capture Precious Moments</StyledText>
                    <StyledText className="text-indigo-100 mb-4">Book a luxury photography session for your little one today.</StyledText>
                    <StyledTouchableOpacity
                        className="bg-white py-3 px-6 rounded-lg self-start"
                        onPress={() => (navigation as any).navigate('Packages')}
                    >
                        <StyledText className="text-indigo-600 font-bold">Book Slot Now</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>

                <StyledText className="text-white text-lg font-bold mb-4">Recent Packages</StyledText>
                {/* Placeholder for Package Cards */}
                <StyledView className="space-y-4">
                    {[1, 2].map((i) => (
                        <StyledView key={i} className="bg-gray-800 p-4 rounded-xl flex-row items-center border border-gray-700">
                            <StyledView className="w-16 h-16 bg-gray-700 rounded-lg mr-4"></StyledView>
                            <StyledView className="flex-1">
                                <StyledText className="text-white font-bold">New Born Special</StyledText>
                                <StyledText className="text-gray-400 text-xs">2 Hours • 10 Photos</StyledText>
                            </StyledView>
                            <StyledText className="text-indigo-400 font-bold">$200</StyledText>
                        </StyledView>
                    ))}
                </StyledView>
            </ScrollView>
            <ChatAssistant />
        </StyledView>
    );
};
