import React from 'react';
import { View, ScrollView, Animated, Text, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { styled } from 'nativewind';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const StyledView = styled(View);
const StyledText = styled(Text);

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 300;

export const ParallaxScrollView = ({ children, imageSrc, title }: any) => {
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const translateHeader = scrollY.interpolate({
        inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
        outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
        extrapolate: 'clamp',
    });

    const scaleHeader = scrollY.interpolate({
        inputRange: [-HEADER_HEIGHT, 0],
        outputRange: [2, 1],
        extrapolateLeft: 'extend',
        extrapolateRight: 'clamp',
    });

    return (
        <View className="flex-1 bg-gray-900">
            <Animated.View style={{ height: HEADER_HEIGHT, transform: [{ translateY: translateHeader }, { scale: scaleHeader }], position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1 }}>
                <AnimatedImage
                    source={imageSrc}
                    style={{ flex: 1, width: null, height: null }}
                    contentFit="cover"
                    transition={1000}
                />
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
                    <StyledText className="text-white text-3xl font-bold bg-black/30 px-4 py-2 rounded-lg backdrop-blur-md">{title}</StyledText>
                </View>
            </Animated.View>

            <Animated.ScrollView
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
            >
                <StyledView className="bg-gray-900 min-h-screen rounded-t-3xl -mt-6 p-6">
                    {children}
                </StyledView>
            </Animated.ScrollView>
        </View>
    );
};
