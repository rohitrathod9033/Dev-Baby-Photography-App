import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export const MyBookingsScreen = () => {
    // Placeholder data
    const bookings = [
        { id: '1', package: 'New Born Shoot', date: '2023-10-25 10:00 AM', status: 'Upcoming' },
        { id: '2', package: '1 Month Celebration', date: '2023-09-15 02:00 PM', status: 'Completed' },
    ];

    return (
        <StyledView className="flex-1 bg-gray-900 pt-12 px-4">
            <StyledText className="text-white text-2xl font-bold mb-6">My Bookings</StyledText>

            <ScrollView>
                {bookings.map((booking) => (
                    <StyledView key={booking.id} className="bg-gray-800 p-4 rounded-xl mb-4 border border-gray-700">
                        <StyledView className="flex-row justify-between mb-2">
                            <StyledText className="text-white font-bold text-lg">{booking.package}</StyledText>
                            <StyledView className={`px-2 py-1 rounded ${booking.status === 'Upcoming' ? 'bg-indigo-900' : 'bg-green-900'}`}>
                                <StyledText className={`text-xs ${booking.status === 'Upcoming' ? 'text-indigo-300' : 'text-green-300'}`}>{booking.status}</StyledText>
                            </StyledView>
                        </StyledView>
                        <StyledText className="text-gray-400">{booking.date}</StyledText>
                    </StyledView>
                ))}
            </ScrollView>
        </StyledView>
    );
};
