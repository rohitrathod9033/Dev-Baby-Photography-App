import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

import { useState } from 'react';
import { Alert } from 'react-native';
import api from '../../services/api';

export const RegisterScreen = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            await api.post('/auth/register', { name, email, password });
            Alert.alert('Success', 'Account created! Please login.', [
                { text: 'OK', onPress: () => navigation.navigate('Login') }
            ]);
        } catch (error: any) {
            console.error(error);
            Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <StyledView className="flex-1 bg-gray-900 justify-center px-6">
            <StyledText className="text-3xl text-white font-bold mb-8 text-center">
                Create Account
            </StyledText>

            <StyledView className="space-y-4">
                <StyledView>
                    <StyledText className="text-gray-400 mb-2">Full Name</StyledText>
                    <StyledTextInput
                        className="bg-gray-800 text-white p-4 rounded-xl border border-gray-700"
                        placeholderTextColor="#666"
                        placeholder="Dev Baby"
                        value={name}
                        onChangeText={setName}
                    />
                </StyledView>

                <StyledView>
                    <StyledText className="text-gray-400 mb-2">Email</StyledText>
                    <StyledTextInput
                        className="bg-gray-800 text-white p-4 rounded-xl border border-gray-700"
                        placeholderTextColor="#666"
                        placeholder="dev@example.com"
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
                        placeholder="******"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </StyledView>

                <StyledTouchableOpacity onPress={handleRegister} className="bg-indigo-600 p-4 rounded-xl mt-4">
                    <StyledText className="text-white text-center font-bold text-lg">Sign Up</StyledText>
                </StyledTouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <StyledText className="text-center text-gray-500 mt-4">Already have an account? Sign In</StyledText>
                </TouchableOpacity>
            </StyledView>
        </StyledView>
    );
};
