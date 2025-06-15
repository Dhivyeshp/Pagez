import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Animated } from 'react-native';
import { router } from 'expo-router';
import { OnboardingSlide } from '../src/components/OnboardingSlide';
import { PagezLogo } from '../src/components/Splash'; // Import your new SVG component
import { COLORS, SIZES } from '../src/constants/theme';
import LoginScreen from './(auth)/login'; // Adjust path as needed
const { width, height } = Dimensions.get('window');
import Onboarding2SVG from '../src/components/onboarding2SVG';
import Onboarding3SVG from '../src/components/onboarding3SVG';

// Custom splash slide component using SVG
const SplashSlide = () => {
  return (
    <View style={styles.splashSlide}>
      <PagezLogo width={width * 0.6} />
    </View>
  );
};

const slides = [
  {
    id: '1',
    component: SplashSlide, // Use custom SVG component
    title: '',
    description: '',
  },
  {
    id: '2',
    component: Onboarding2SVG,
    title: '',
    description: '',
  },
  {
    id: '3',
    component: Onboarding3SVG,
    title: '',
    description: '',
  },

  {
    id: '4',
    component: () => <LoginScreen inOnboarding />,
    isLogin: true,
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const timerRef = useRef<number | null>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    const index = viewableItems[0]?.index ?? 0;
    setCurrentIndex(index);
    // Do not navigate away when the login slide is visible
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollToNext = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  useEffect(() => {
    // Only auto-advance from the splash (first) slide
    if (currentIndex === 0) {
      timerRef.current = setTimeout(() => {
        scrollToNext();
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex]);

  const renderSlide = ({ item }: any) => {
    // If the slide has a custom component (like our SVG splash), render that
    if (item.component) {
      const Component = item.component;
      return (
        <View style={styles.slide}>
          <Component />
        </View>
      );
    }
    
    // Otherwise, render the regular OnboardingSlide
    return <OnboardingSlide {...item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderSlide}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        scrollEnabled={currentIndex !== 0} // Only enable manual scroll after splash
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  slide: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashSlide: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f3f0', // Match your app's background color
  },
  loginSlide: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f3f0',
  },
  loginText: {
    fontSize: 28,
    color: '#EB4D2A',
    fontWeight: 'bold',
  },
});