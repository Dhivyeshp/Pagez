//link/navigate to author

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [bio, setBio] = useState('');

  // TODO: Backend developer - integrate with user profile API
  const handleContinue = () => {
    console.log('Bio to save:', bio);
    router.push('/author/dashboard' as any);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Blue Gradient Background */}
      <View style={styles.gradientContainer}>
        <LinearGradient
          colors={['#6B9FFF', '#4A7EFF', '#3B6EFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
      </View>

      {/* Gray Background */}
      <View style={styles.grayBackground} />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pagez Author</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Content */}
          <View style={styles.content}>
            <Text style={styles.mainTitle}>Tell us about yourself</Text>

            {/* Bio Section */}
            <View style={styles.bioSection}>
              <Text style={styles.bioLabel}>Bio</Text>
              <TextInput
                style={styles.bioInput}
                value={bio}
                onChangeText={setBio}
                placeholder="Write a short bio about yourself..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  gradient: {
    flex: 1,
  },
  grayBackground: {
    position: 'absolute',
    top: 300,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F5F5F5',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
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
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  mainTitle: {
    fontSize: 28,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    marginTop: 10,
    marginBottom: 30,
    lineHeight: 32,
    fontWeight: '600',
  },
  bioSection: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  bioLabel: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    marginBottom: 12,
  },
  bioInput: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
  continueButton: {
    backgroundColor: '#4A7EFF',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#4A7EFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '600',
  },
});

// TODO: Backend developer integration points:
// 1. Replace mock bio state with user profile data from API
// 2. Implement handleContinue function to save bio to backend
// 3. Add proper error handling for API calls
// 4. Add loading states during API operations
// 5. Implement character count validation (currently set to 500 max)
// 6. Add proper navigation flow based on user completion status