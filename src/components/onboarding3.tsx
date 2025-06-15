import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ReadingHeroScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Header with geometric shapes */}
        <View style={styles.header}>
          {/* Black oval shape at top */}
          <View style={styles.blackOval} />
          
          {/* Yellow square shape */}
          <View style={styles.yellowSquare} />
          
          {/* Main hero text */}
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroText}>
              For avid{'\n'}readers{'\n'}& story{'\n'}tellers
            </Text>
          </View>
          
          {/* Mint green square */}
          <View style={styles.mintSquare} />
        </View>

        {/* Main image section */}
        <View style={styles.imageSection}>
          {/* Orange rectangle overlay */}
          <View style={styles.orangeRectangle} />
          
          {/* Main image container */}
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face'
              }}
              style={styles.mainImage}
              resizeMode="cover"
            />
          </View>
          
          {/* Light overlay shapes */}
          <View style={styles.lightOverlay1} />
          <View style={styles.lightOverlay2} />
        </View>

        {/* Page indicator dots */}
        <View style={styles.pageIndicator}>
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={[styles.dot, styles.inactiveDot]} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'relative',
    paddingTop: 60,
    paddingHorizontal: 20,
    height: height * 0.55,
  },
  blackOval: {
    position: 'absolute',
    top: 20,
    left: width * 0.25,
    width: width * 0.5,
    height: 40,
    backgroundColor: '#000000',
    borderRadius: 25,
  },
  yellowSquare: {
    position: 'absolute',
    top: 80,
    right: 0,
    width: 80,
    height: 120,
    backgroundColor: '#FFD700',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  heroTextContainer: {
    marginTop: 100,
    marginLeft: 0,
  },
  heroText: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 48,
    lineHeight: 52,
    color: '#E74C3C',
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  mintSquare: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    width: 60,
    height: 40,
    backgroundColor: '#7FDBDA',
    borderRadius: 8,
  },
  imageSection: {
    position: 'relative',
    height: height * 0.5,
    marginTop: -50,
  },
  orangeRectangle: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    width: 80,
    height: 60,
    backgroundColor: '#FF5722',
    borderRadius: 8,
    zIndex: 2,
  },
  imageContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    left: 60,
    bottom: 60,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  lightOverlay1: {
    position: 'absolute',
    top: 30,
    left: 30,
    width: 60,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    transform: [{ rotate: '15deg' }],
  },
  lightOverlay2: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    width: 50,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    transform: [{ rotate: '-10deg' }],
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activeDot: {
    backgroundColor: '#E74C3C',
  },
  inactiveDot: {
    backgroundColor: '#E0E0E0',
  },
});

export default ReadingHeroScreen;