import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Welcome() {
  const { profileImage } = useLocalSearchParams();
  const handleNext = () => {
    // Navigate to the start screen in onboarding/auth flow
    router.push('/(auth)/start' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#EB4D2A" />
      
      {/* Floating Paper Elements - Top Group */}
      <View style={styles.floatingElementsTop}>
        <View style={[styles.paper, styles.paper1]} />
        <View style={[styles.paper, styles.paper2]} />
        <View style={[styles.paper, styles.paper3]} />
        <View style={[styles.paper, styles.paper4]} />
        <View style={[styles.paper, styles.paper5]} />
        <View style={[styles.paper, styles.paper6]} />
        <View style={[styles.paper, styles.paper7]} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Profile Image */}
        <View style={styles.profileContainer}>
          <Image
            source={profileImage ? { uri: profileImage as string } : { uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face' }}
            style={styles.profileImage}
          />
        </View>

        {/* Welcome Text */}
        <Text style={styles.greetingText}>Oh, hey beautiful.</Text>
        <Text style={styles.welcomeText}>welcome{'\n'}to pagez.</Text>
      </View>

      {/* Floating Paper Elements - Bottom Group */}
      <View style={styles.floatingElementsBottom}>
        <View style={[styles.paper, styles.paper8]} />
        <View style={[styles.paper, styles.paper9]} />
        <View style={[styles.paper, styles.paper10]} />
        <View style={[styles.paper, styles.paper11]} />
        <View style={[styles.paper, styles.paper12]} />
        <View style={[styles.paper, styles.paper13]} />
        <View style={[styles.paper, styles.paper14]} />
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EB4D2A',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileContainer: {
    marginBottom: 40,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
  },
  greetingText: {
    fontFamily: 'Bogart-Regular-Trial',
    fontSize: 34,
    fontWeight: '500',
    color: '#FCF3EC',
    textAlign: 'center',
    letterSpacing: -0.68,
    marginBottom: 15,
  },
  welcomeText: {
    fontFamily: 'Bogart-Regular-Trial',
    fontSize: 64,
    fontWeight: '500',
    color: '#FCF3EC',
    textAlign: 'center',
    letterSpacing: -1.28,
    lineHeight: 60,
  },
  nextButton: {
    marginHorizontal: 20,
    marginBottom: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.8,
  },
  floatingElementsTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
  },
  floatingElementsBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
  },
  paper: {
    position: 'absolute',
    backgroundColor: '#FCF3EC',
  },
  // Top floating elements
  paper1: {
    width: 100,
    height: 121,
    left: width * 0.52,
    top: 96,
    transform: [{ rotate: '164.35deg' }],
  },
  paper2: {
    width: 71,
    height: 86,
    left: width * 0.89,
    top: 176,
    transform: [{ rotate: '-159.48deg' }],
  },
  paper3: {
    width: 36,
    height: 44,
    left: -26,
    top: 122,
    transform: [{ rotate: '-159.48deg' }],
  },
  paper4: {
    width: 36,
    height: 44,
    left: -2,
    top: 329,
    transform: [{ rotate: '-159.48deg' }],
  },
  paper5: {
    width: 45,
    height: 55,
    left: width * 0.36,
    top: 185,
    transform: [{ rotate: '174.26deg' }],
  },
  paper6: {
    width: 35,
    height: 42,
    left: width + 90,
    top: 246,
    transform: [{ rotate: '156.82deg' }],
  },
  paper7: {
    width: 35,
    height: 42,
    left: width * 0.91,
    top: 3,
    transform: [{ rotate: '156.82deg' }],
  },
  // Bottom floating elements
  paper8: {
    width: 100,
    height: 121,
    left: width * 0.1,
    top: height * 0.35,
    transform: [{ rotate: '24.35deg' }],
  },
  paper9: {
    width: 71,
    height: 86,
    left: width * 0.79,
    top: height * 0.25,
    transform: [{ rotate: '-159.48deg' }],
  },
  paper10: {
    width: 36,
    height: 44,
    left: -67,
    top: height * 0.32,
    transform: [{ rotate: '-159.48deg' }],
  },
  paper11: {
    width: 36,
    height: 44,
    left: -42,
    top: height * 0.1,
    transform: [{ rotate: '-159.48deg' }],
  },
  paper12: {
    width: 45,
    height: 55,
    left: width * 0.26,
    top: height * 0.23,
    transform: [{ rotate: '174.26deg' }],
  },
  paper13: {
    width: 35,
    height: 42,
    left: width + 50,
    top: height * 0.15,
    transform: [{ rotate: '156.82deg' }],
  },
  paper14: {
    width: 35,
    height: 42,
    left: width * 0.81,
    top: height * 0.45,
    transform: [{ rotate: '156.82deg' }],
  },
});