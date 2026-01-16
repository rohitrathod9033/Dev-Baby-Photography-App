import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Animated } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledAnimatedView = styled(Animated.View);
const StyledScrollView = styled(ScrollView);

export const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ id: number, text: string, sender: 'user' | 'bot' }[]>([
        { id: 1, text: "Hi! I'm your Dev Baby Assistant. How can I help you book a shoot?", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState("");
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const toggleChat = () => {
        if (isOpen) {
            Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => setIsOpen(false));
        } else {
            setIsOpen(true);
            Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
        }
    };

    const sendMessage = () => {
        if (!inputText.trim()) return;

        const userMsg = { id: Date.now(), text: inputText, sender: 'user' as const };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");

        // Mock AI Response
        setTimeout(() => {
            const botResponses = [
                "That sounds like a wonderful idea! Our newborn packages are very popular.",
                "You can check availability by tapping 'Book Slot Now' on the dashboard.",
                "We offer 3 packages: Newborn, 1 Month, and 6 Month milestones.",
                "Do you have a specific date in mind?"
            ];
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            setMessages(prev => [...prev, { id: Date.now() + 1, text: randomResponse, sender: 'bot' }]);
        }, 1000);
    };

    return (
        <View className="absolute bottom-24 right-4 z-50 items-end">
            {isOpen && (
                <StyledAnimatedView style={{ opacity: fadeAnim }} className="bg-gray-800 w-72 h-96 rounded-2xl mb-4 border border-gray-700 overflow-hidden shadow-2xl elevation-5">
                    <StyledView className="bg-indigo-600 p-4 flex-row justify-between items-center">
                        <StyledText className="text-white font-bold">Assistant</StyledText>
                        <TouchableOpacity onPress={toggleChat}>
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                    </StyledView>

                    <StyledScrollView className="flex-1 p-4">
                        {messages.map((msg) => (
                            <StyledView key={msg.id} className={`mb-3 max-w-[80%] p-3 rounded-xl ${msg.sender === 'user' ? 'bg-indigo-600 self-end rounded-tr-none' : 'bg-gray-700 self-start rounded-tl-none'}`}>
                                <StyledText className="text-white text-sm">{msg.text}</StyledText>
                            </StyledView>
                        ))}
                    </StyledScrollView>

                    <StyledView className="p-3 bg-gray-900 flex-row items-center border-t border-gray-700">
                        <StyledTextInput
                            className="flex-1 bg-gray-800 text-white p-2 rounded-lg mr-2"
                            placeholder="Type a message..."
                            placeholderTextColor="#9ca3af"
                            value={inputText}
                            onChangeText={setInputText}
                        />
                        <TouchableOpacity onPress={sendMessage} className="bg-indigo-600 p-2 rounded-full">
                            <Ionicons name="send" size={18} color="white" />
                        </TouchableOpacity>
                    </StyledView>
                </StyledAnimatedView>
            )}

            <StyledTouchableOpacity
                onPress={toggleChat}
                className="bg-indigo-600 w-14 h-14 rounded-full items-center justify-center shadow-lg elevation-5"
            >
                <Ionicons name="chatbubbles" size={28} color="white" />
            </StyledTouchableOpacity>
        </View>
    );
};
