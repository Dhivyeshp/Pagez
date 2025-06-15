import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function StartScreen() {
  const handleStartPress = () => {
    // Navigate to main app
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#EB4D2A" />

      {/* Floating Paper Elements - Top Group */}
      <View style={styles.floatingElementsTop}>
        <View style={[styles.paper, styles.paper1]} />
        <View style={[styles.paper, styles.paper2]} />
        <View style={[styles.paper, styles.paper3]} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.mainText}>
          Find out about books, authors and stories.
        </Text>
        <Text style={styles.mainText}>
          Read what people think or share yours.
        </Text>
      </View>

      {/* Floating Paper Elements - Bottom Group */}
      <View style={styles.floatingElementsBottom}>
        <View style={[styles.paper, styles.paper4]} />
        <View style={[styles.paper, styles.paper5]} />
        <View style={[styles.paper, styles.paper6]} />
      </View>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
        <Text style={styles.startButtonText}>Start using Pagez</Text>
      </TouchableOpacity>

    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EB4D2A',
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
    left: -20,
    top: 0,
    transform: [{ rotate: '164.35deg' }],
  },
  paper2: {
    width: 71,
    height: 86,
    left: width * 0.6,
    top: 60,
    transform: [{ rotate: '-159.48deg' }],
  },
  paper3: {
    width: 36,
    height: 44,
    left: width * 0.75,
    top: 140,
    transform: [{ rotate: '-159.48deg' }],
  },
  // Bottom floating elements
  paper4: {
    width: 100,
    height: 121,
    left: width * 0.1,
    top: height * 0.35,
    transform: [{ rotate: '24.35deg' }],
  },
  paper5: {
    width: 71,
    height: 86,
    left: width * 0.79,
    top: height * 0.25,
    transform: [{ rotate: '-159.48deg' }],
  },
  paper6: {
    width: 36,
    height: 44,
    left: width * 0.81,
    top: height * 0.45,
    transform: [{ rotate: '156.82deg' }],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 32,
    zIndex: 5,
  },
  mainText: {
    fontFamily: 'Bogart-Regular-Trial',
    fontSize: 38,
    lineHeight: 44,
    letterSpacing: -0.02 * 38,
    color: '#FFFFFF',
    textAlign: 'left',
    width: '100%',
    marginBottom: 18,
  },
  startButton: {
    marginHorizontal: 20,
    marginBottom: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  startButtonText: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.8,
  },
 
});