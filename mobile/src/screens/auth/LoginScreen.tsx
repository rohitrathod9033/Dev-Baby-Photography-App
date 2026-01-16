import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';

export const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useAuthStore((state) => state.login);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        try {
            const response = await api.post('/auth/login', { email, password });
            const { access_token, user } = response.data;
            await login(user, access_token);
        } catch (error: any) {
            console.error('Login Error:', error);
            const message = error.response?.data?.message || error.message || 'Connection failed';
            Alert.alert('Login Failed', message + `\n(Check IP: ${process.env.EXPO_PUBLIC_API_URL})`);
        }
    };

    return (
        <StyledView className="flex-1 bg-gray-900 justify-center px-6">
            <StyledText className="text-3xl text-white font-bold mb-8 text-center">
                Dev Baby Photography
            </StyledText>

            <StyledView className="space-y-4">
                <StyledView>
                    <StyledText className="text-gray-400 mb-2">Email</StyledText>
                    <StyledTextInput
                        className="bg-gray-800 text-white p-4 rounded-xl border border-gray-700"
                        placeholderTextColor="#666"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                </StyledView>

                <StyledView>
                    <StyledText className="text-gray-400 mb-2">Password</StyledText>
                    <StyledTextInput
                        className="bg-gray-800 text-white p-4 rounded-xl border border-gray-700"
                        placeholderTextColor="#666"
                        placeholder="Enter your password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </StyledView>

                <StyledTouchableOpacity onPress={handleLogin} className="bg-indigo-600 p-4 rounded-xl mt-4">
                    <StyledText className="text-white text-center font-bold text-lg">Sign In</StyledText>
                </StyledTouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <StyledText className="text-center text-gray-500 mt-4">Don't have an account? Sign Up</StyledText>
                </TouchableOpacity>

            </StyledView>
        </StyledView>
    );
};
