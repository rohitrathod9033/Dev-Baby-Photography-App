import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const SlotSelectionScreen = ({ route, navigation }: any) => {
    const { packageId } = route.params;
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    // Mock slots - In real app, fetch from backend based on date
    const slots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];

    const handleBooking = async () => {
        if (!selectedSlot) {
            Alert.alert('Error', 'Please select a slot');
            return;
        }

        // Call API to create booking
        try {
            // await api.post('/bookings', { packageId, date: ... });
            Alert.alert('Success', 'Booking Confirmed!', [
                { text: 'OK', onPress: () => navigation.navigate('MyBookings') }
            ]);
        } catch (e) {
            Alert.alert('Error', 'Booking failed');
        }
    };

    return (
        <StyledView className="flex-1 bg-gray-900 pt-12 px-4">
            <StyledView className="flex-row items-center mb-6">
                <TouchableOpacity onPress={() => navigation.goBack()} className="bg-gray-800 p-2 rounded-lg mr-4">
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <StyledText className="text-white text-2xl font-bold">Select Slot</StyledText>
            </StyledView>

            <StyledView className="mb-6">
                <StyledText className="text-gray-400 mb-2">Select Date</StyledText>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
                    {[0, 1, 2, 3, 4].map(day => (
                        <StyledTouchableOpacity
                            key={day}
                            onPress={() => setSelectedDate(`Day ${day}`)}
                            className={`p-4 rounded-xl border ${selectedDate === `Day ${day}` ? 'bg-indigo-600 border-indigo-600' : 'bg-gray-800 border-gray-700'}`}
                        >
                            <StyledText className="text-white font-bold text-center">OCT</StyledText>
                            <StyledText className="text-white text-xl font-bold text-center">{25 + day}</StyledText>
                        </StyledTouchableOpacity>
                    ))}
                </ScrollView>
            </StyledView>

            <StyledText className="text-gray-400 mb-4">Available Slots</StyledText>
            <StyledView className="flex-row flex-wrap justify-between">
                {slots.map((slot) => (
                    <StyledTouchableOpacity
                        key={slot}
                        onPress={() => setSelectedSlot(slot)}
                        className={`w-[48%] mb-4 p-4 rounded-xl border ${selectedSlot === slot ? 'bg-indigo-600 border-indigo-600' : 'bg-gray-800 border-gray-700'}`}
                    >
                        <StyledText className="text-white text-center font-bold">{slot}</StyledText>
                    </StyledTouchableOpacity>
                ))}
            </StyledView>

            <StyledView className="flex-1 justify-end mb-6">
                <StyledTouchableOpacity
                    onPress={handleBooking}
                    className={`p-4 rounded-xl ${selectedSlot ? 'bg-indigo-600' : 'bg-gray-700'}`}
                    disabled={!selectedSlot}
                >
                    <StyledText className="text-white text-center font-bold text-lg">Confirm Booking</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    );
};
