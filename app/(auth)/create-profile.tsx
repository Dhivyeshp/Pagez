import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function CreateProfileScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need camera roll permissions to upload your picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleCreateAccount = () => {
    if (!name.trim()) {
      Alert.alert('Name required', 'Please enter your name to continue.');
      return;
    }
    
    if (!username.trim()) {
      Alert.alert('Username required', 'Please enter a username to continue.');
      return;
    }

    // Handle account creation logic here
    console.log('Creating account with:', { name, username, profileImage });
    // Navigate to welcome screen with profile image
    router.replace({ pathname: '/(auth)/welcome', params: { profileImage } });
  };

  const handleSkip = () => {
    // Handle skip logic - might create account with minimal data
    console.log('Skipping profile completion');
    router.replace({ pathname: '/main/homepage' } as any);
  };

  const isFormValid = name.trim() !== '' && username.trim() !== '';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            console.log('Back button pressed');
            router.replace({ pathname: '/(auth)/phone-verification' } as any);
          }}
        >
          <Ionicons name="chevron-back" size={24} color="#EB4D2A" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Complete Profile</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Now, let's complete your profile.
        </Text>

        {/* Profile Picture */}
        <TouchableOpacity 
          style={styles.profileImageContainer}
          onPress={handleImagePicker}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="camera" size={40} color="#BBAEA8" />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleImagePicker}>
          <Text style={styles.uploadText}>Upload your picture</Text>
        </TouchableOpacity>

        {/* Form Inputs */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor="#BBAEA8"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            returnKeyType="next"
          />

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#BBAEA8"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.createAccountButton,
              !isFormValid && styles.createAccountButtonDisabled
            ]}
            onPress={handleCreateAccount}
            disabled={!isFormValid}
          >
            <Text style={styles.createAccountText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Home Indicator */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    position: 'relative',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(217, 217, 217, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    letterSpacing: -0.04,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(171, 176, 186, 0.4)',
    marginHorizontal: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  instructionText: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    textAlign: 'center',
    color: '#1E1E1E',
    letterSpacing: -0.04,
    marginBottom: 40,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginBottom: 18,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#D9D9D9',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#EB4D2A',
    letterSpacing: -0.04,
    marginBottom: 60,
  },
  formContainer: {
    gap: 10,
    marginBottom: 60,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#BBAEA8',
    borderRadius: 45,
    paddingHorizontal: 20,
    fontSize: 17,
    fontFamily: 'Bogart-Regular-Trial',
    fontWeight: '500',
    color: '#1E1E1E',
    letterSpacing: -0.04,
  },
  buttonContainer: {
    gap: 10,
    marginTop: 'auto',
    marginBottom: 40,
  },
  skipButton: {
    height: 55,
    borderWidth: 1,
    borderColor: 'rgba(137, 138, 141, 0.5)',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
    letterSpacing: -0.04,
  },
  createAccountButton: {
    backgroundColor: '#EB4D2A',
    borderRadius: 45,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountButtonDisabled: {
    opacity: 0.5,
  },
  createAccountText: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.04,
  },
  homeIndicator: {
    width: 139,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 8,
  },
});