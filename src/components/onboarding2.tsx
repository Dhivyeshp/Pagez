import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';


const { width, height } = Dimensions.get('window');

const ReadingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Content Area */}
        <View style={styles.mainContent}>
          
          {/* Pink Accent Shape - Top Left */}
          <View style={styles.pinkShape} />
          
          {/* Main Reading Image */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/reading-person.png')}
              style={styles.mainImage}
              resizeMode="cover"
            />
            {/* Black Oval Overlay */}
            <View style={styles.blackOval} />
          </View>
          
          {/* Yellow Accent Shape - Bottom Right */}
          <View style={styles.yellowShape} />
          
          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>
              read{'\n'}books{'\n'}& explore{'\n'}stories
            </Text>
          </View>
          
          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: height,
  },
  mainContent: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  
  // Geometric Shapes
  pinkShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.3,
    height: height * 0.4,
    backgroundColor: '#FFB6C1',
    borderBottomRightRadius: 40,
    zIndex: 1,
  },
  yellowShape: {
    position: 'absolute',
    bottom: height * 0.2,
    right: 0,
    width: width * 0.35,
    height: height * 0.25,
    backgroundColor: '#FFD700',
    borderTopLeftRadius: 40,
    zIndex: 1,
  },
  
  // Main Image Section
  imageContainer: {
    position: 'relative',
    marginTop: height * 0.1,
    marginLeft: width * 0.15,
    marginRight: width * 0.1,
    height: height * 0.45,
    zIndex: 2,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  blackOval: {
    position: 'absolute',
    top: -10,
    left: '10%',
    width: '80%',
    height: 40,
    backgroundColor: '#000000',
    borderRadius: 20,
    zIndex: 3,
  },
  
  // Text Section
  textContainer: {
    marginTop: height * 0.05,
    marginLeft: 20,
    zIndex: 3,
  },
  mainText: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 48,
    lineHeight: 52,
    color: '#E74C3C',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  
  // Pagination
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
    zIndex: 3,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#E74C3C',
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});

export default ReadingScreen;