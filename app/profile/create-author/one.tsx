import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const handleBackPress = () => {
    // TODO: Backend developer - implement navigation back to previous screen
    router.back();
  };

  const handleCreateAccount = () => {
    router.push("/auth/signup" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4F7CFF', '#5B8CFF', '#6B9AFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Pagez Author</Text>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <Text style={styles.discoveryText}>YOU'VE JUST DISCOVERED</Text>
            
            {/* App Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.iconBackground}>
                <View style={styles.iconCircle}>
                  <View style={styles.iconHead} />
                  <View style={styles.iconBody} />
                </View>
              </View>
            </View>

            {/* Title and Features */}
            <View style={styles.titleSection}>
              <Text style={styles.mainTitle}>Author's Space</Text>
              
              <View style={styles.featuresContainer}>
                <Text style={styles.featureText}>Create & Manage books</Text>
                <Text style={styles.featureText}>Create Author notes</Text>
                <Text style={styles.featureText}>Communicate with readers</Text>
              </View>
            </View>
          </View>

          {/* CTA Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={handleCreateAccount}
            >
              <Text style={styles.ctaButtonText}>Create your author account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: screenHeight,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 20,
    padding: 8,
  },
  backArrow: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Bogart-Regular-Trial',
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Bogart-Bold-Trial',
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  discoveryText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Bogart-Regular-Trial',
    letterSpacing: 2,
    marginBottom: 60,
    textAlign: 'center',
  },
  iconContainer: {
    marginBottom: 60,
  },
  iconBackground: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  iconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconHead: {
    width: 32,
    height: 32,
    backgroundColor: '#4FC3F7',
    borderRadius: 16,
    marginBottom: 8,
  },
  iconBody: {
    width: 48,
    height: 24,
    backgroundColor: '#4F7CFF',
    borderRadius: 12,
  },
  titleSection: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 48,
    color: 'white',
    fontFamily: 'Bogart-Bold-Trial',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 56,
  },
  featuresContainer: {
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Bogart-Regular-Trial',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  ctaButton: {
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaButtonText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Bogart-Bold-Trial',
    textAlign: 'center',
  },
});