import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import api from '../../services/api';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

export const ManagePackagesScreen = () => {
    const [packages, setPackages] = useState([
        { id: 1, name: 'New Born', price: '$200', image: null },
        { id: 2, name: 'Toddler Fun', price: '$150', image: null }
    ]);
    const [isCreating, setIsCreating] = useState(false);
    const [newPackage, setNewPackage] = useState({ title: '', price: '', description: '', image: null });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            uploadImage(result.assets[0]);
        }
    };

    const uploadImage = async (asset: any) => {
        const formData = new FormData();
        formData.append('file', {
            uri: asset.uri,
            name: 'upload.jpg',
            type: 'image/jpeg',
        } as any);

        try {
            const res = await api.post('/files/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setNewPackage({ ...newPackage, image: res.data.url });
            Alert.alert('Success', 'Image uploaded successfully');
        } catch (e) {
            console.error(e);
            Alert.alert('Error', 'Failed to upload image');
        }
    };

    const handleCreate = () => {
        // Mock create
        setPackages([...packages, { id: Date.now(), name: newPackage.title, price: newPackage.price, image: newPackage.image }]);
        setIsCreating(false);
        setNewPackage({ title: '', price: '', description: '', image: null });
    };

    return (
        <StyledView className="flex-1 bg-gray-900 pt-12 px-4">
            <StyledView className="flex-row justify-between items-center mb-6">
                <StyledText className="text-white text-2xl font-bold">Manage Packages</StyledText>
                <StyledTouchableOpacity onPress={() => setIsCreating(!isCreating)} className="bg-indigo-600 p-2 rounded-lg">
                    <Ionicons name={isCreating ? "close" : "add"} size={24} color="white" />
                </StyledTouchableOpacity>
            </StyledView>

            {isCreating && (
                <StyledView className="bg-gray-800 p-4 rounded-xl mb-6 border border-gray-700">
                    <StyledTextInput
                        className="bg-gray-700 text-white p-3 rounded-lg mb-3"
                        placeholder="Package Title"
                        placeholderTextColor="#9ca3af"
                        value={newPackage.title}
                        onChangeText={(t) => setNewPackage({ ...newPackage, title: t })}
                    />
                    <StyledTextInput
                        className="bg-gray-700 text-white p-3 rounded-lg mb-3"
                        placeholder="Price (e.g. $200)"
                        placeholderTextColor="#9ca3af"
                        value={newPackage.price}
                        onChangeText={(t) => setNewPackage({ ...newPackage, price: t })}
                    />
                    <StyledTouchableOpacity onPress={pickImage} className="bg-gray-700 p-3 rounded-lg mb-3 flex-row items-center justify-center">
                        <Ionicons name="image" size={20} color="#9ca3af" style={{ marginRight: 8 }} />
                        <StyledText className="text-gray-400">
                            {newPackage.image ? 'Image Uploaded' : 'Pick Image'}
                        </StyledText>
                    </StyledTouchableOpacity>
                    {newPackage.image && (
                        <StyledImage
                            source={{ uri: newPackage.image }}
                            className="w-full h-32 rounded-lg mb-3 bg-gray-600"
                            contentFit="cover"
                            transition={1000}
                        />
                    )}

                    <StyledTouchableOpacity onPress={handleCreate} className="bg-indigo-600 p-3 rounded-lg">
                        <StyledText className="text-white font-bold text-center">Create Package</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            )}

            <ScrollView>
                {packages.map((pkg) => (
                    <StyledView key={pkg.id} className="bg-gray-800 p-4 rounded-xl mb-4 border border-gray-700 flex-row justify-between items-center">
                        <StyledView className="flex-row items-center">
                            {pkg.image && <StyledImage source={{ uri: pkg.image }} className="w-12 h-12 rounded-lg mr-3 bg-gray-700" contentFit="cover" transition={500} />}
                            <StyledView>
                                <StyledText className="text-white font-bold text-lg">{pkg.name}</StyledText>
                                <StyledText className="text-indigo-400">{pkg.price}</StyledText>
                            </StyledView>
                        </StyledView>
                        <StyledView className="flex-row space-x-2">
                            <StyledTouchableOpacity className="bg-gray-700 p-2 rounded-lg mr-2">
                                <Ionicons name="pencil" size={20} color="white" />
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity className="bg-red-900/50 p-2 rounded-lg">
                                <Ionicons name="trash" size={20} color="#ef4444" />
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                ))}
            </ScrollView>
        </StyledView>
    );
};
