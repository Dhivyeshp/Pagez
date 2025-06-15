import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [authorName, setAuthorName] = useState('J.K. Rowlings');
  const [username, setUsername] = useState('jkr');
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/women/44.jpg');

  const handleBack = () => {
    router.back();
  };

  const handleChoosePicture = () => {
    console.log('Choose picture pressed');
  };

  const handleContinue = () => {
    router.push('/profile/create-author/three' as any);
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
            <Text style={styles.mainTitle}>Complete your profile</Text>

            {/* Profile Picture Section */}
            <View style={styles.profileSection}>
              <TouchableOpacity onPress={handleChoosePicture} style={styles.profileImageContainer}>
                <Image 
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleChoosePicture}>
                <Text style={styles.choosePictureText}>Choose a picture</Text>
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              {/* Author Name Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Author Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={authorName}
                  onChangeText={setAuthorName}
                  placeholder="J.K. Rowlings"
                  placeholderTextColor="#999"
                />
              </View>

              {/* Username Field */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  style={styles.textInput}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="jkr"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                />
              </View>
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
  profileSection: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  profileImageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
  },
  choosePictureText: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#4F7DF3',
    fontWeight: '500',
  },
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    padding: 0,
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