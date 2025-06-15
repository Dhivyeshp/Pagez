import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/theme';

interface OnboardingSlideProps {
  image: any;
}

const { width, height } = Dimensions.get('window');

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  image,
}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  image: {
    width: width,
    height: height,
  },
}); 