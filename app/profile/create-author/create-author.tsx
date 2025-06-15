import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const handleBackPress = () => {
    // TODO: Backend developer - implement navigation back to previous screen
    router.back();
  };

  const handleCreateAccount = () => {
    // TODO: Backend developer - navigate to author registration/signup flow
    router.push("/profile/create-author/two" as any);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#6B9FFF', '#4A7EFF', '#3B6EFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
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
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Pagez Author</Text>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
              <Text style={styles.discoveryText}>YOU'VE JUST DISCOVERED</Text>
              
              {/* App Icon - Updated to match the design */}
              <View style={styles.iconContainer}>
                <View style={styles.iconBackground}>
                  <Ionicons name="person" size={130} color="#4A7EFF" style={styles.personIconGlow} />
                </View>
              </View>

              {/* Title and Features */}
              <View style={styles.titleSection}>
                <Text style={styles.mainTitle}>
                  <Text style={styles.mainTitleBold}>Author's</Text>
                  <Text style={styles.mainTitleLight}> Space</Text>
                </Text>
                
                <View style={styles.featuresContainer}>
                  <Text style={styles.featureText}>Create & Manage books</Text>
                  <Text style={styles.featureText}>Create Author notes</Text>
                  <Text style={styles.featureText}>Communicate with readers</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* CTA Button at the bottom */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={handleCreateAccount}
            >
              <Text style={styles.ctaButtonText}>Create your author account</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 120,
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
    left: 10,
    top: 15,
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Bogart-Bold-Trial',
    textAlign: 'center',
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  discoveryText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Bogart-Regular-Trial',
    letterSpacing: 2,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: '500',
  },
  iconContainer: {
    marginBottom: 40,
    transform: [{ rotateZ: '-7deg' }],
  },
  iconBackground: {
    width: 140,
    height: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 20,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 34,
    color: 'white',
    fontFamily: 'Bogart-Bold-Trial',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 40,
    fontWeight: '700',
  },
  mainTitleBold: {
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '700',
  },
  mainTitleLight: {
    fontFamily: 'Bogart-Regular-Trial',
    fontWeight: '300',
  },
  featuresContainer: {
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Bogart-Regular-Trial',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 45,
    left: 24,
    right: 24,
  },
  ctaButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  ctaButtonText: {
    fontSize: 17,
    color: '#333',
    fontFamily: 'Bogart-Bold-Trial',
    textAlign: 'center',
    fontWeight: '600',
  },
  personIconGlow: {
    shadowColor: '#4A7EFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
});