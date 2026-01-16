import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Image } from 'expo-image';
import { ParallaxScrollView } from '../components/ParallaxScrollView';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

export const PackagesScreen = ({ navigation }: any) => {
    const [packages, setPackages] = useState<any[]>([]);

    useEffect(() => {
        // Mock data
        setPackages([
            { _id: '1', title: 'New Born Baby', description: 'Capture the tiny toes and sleepy smiles.', price: '$200', duration: 120, images: ['https://images.unsplash.com/photo-1544126566-47a3e7904ba4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'] },
            { _id: '2', title: '1 Month Sitter', description: 'First milestones captured forever.', price: '$150', duration: 60, images: ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'] },
            { _id: '3', title: 'Cake Smash', description: 'Fun and messy 1st birthday celebration.', price: '$250', duration: 90, images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'] }
        ]);
    }, []);

    return (
        <ParallaxScrollView
            title="Our Packages"
            imageSrc="https://images.unsplash.com/photo-1510520434100-3be590d960fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        >
            {packages.map((pkg) => (
                <StyledTouchableOpacity
                    key={pkg._id}
                    className="bg-gray-800 rounded-2xl mb-6 overflow-hidden border border-gray-700 elevation-5 shadow-lg"
                    onPress={() => navigation.navigate('SlotSelection', { packageId: pkg._id })}
                >
                    <StyledImage
                        source={pkg.images[0]}
                        className="w-full h-48 bg-gray-700"
                        contentFit="cover"
                        transition={1000}
                    />
                    <StyledView className="p-4">
                        <StyledView className="flex-row justify-between mb-2">
                            <StyledText className="text-white text-xl font-bold">{pkg.title}</StyledText>
                            <StyledText className="text-indigo-400 text-lg font-bold">{pkg.price}</StyledText>
                        </StyledView>
                        <StyledText className="text-gray-400 mb-4">{pkg.description}</StyledText>
                        <StyledView className="flex-row items-center">
                            <StyledView className="bg-gray-700 px-3 py-1 rounded-full mr-2">
                                <StyledText className="text-gray-300 text-xs">{pkg.duration} Mins</StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledView>
                </StyledTouchableOpacity>
            ))}
        </ParallaxScrollView>
    );
};
