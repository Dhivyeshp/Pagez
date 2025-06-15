import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  Alert,
  Keyboard,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

export default function RegistrationScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // For the Create Profile section (second slide)
  const [name, setName] = useState('');
  const [profileUsername, setProfileUsername] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // For the Phone Registration section (third slide)
  const [phone, setPhone] = useState('');

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
    // Logic for the first page's create account button
    // This will advance to the next slide
    if (username.trim() === '' || email.trim() === '') {
      Alert.alert('Input Required', 'Please enter a username and email.');
      return;
    }
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: width, animated: true });
      setCurrentPage(1);
    }
  };

  const handleCompleteProfile = () => {
    if (!name.trim()) {
      Alert.alert('Name required', 'Please enter your name to continue.');
      return;
    }
    
    if (!profileUsername.trim()) {
      Alert.alert('Username required', 'Please enter a username to continue.');
      return;
    }

    // Handle final account creation logic here
    console.log('Creating account with:', { name, profileUsername, profileImage });
    // Navigate to welcome screen with profile image
    router.replace({ pathname: '/(auth)/welcome', params: { profileImage } });
  };

  const handleSkip = () => {
    // Handle skip logic - might create account with minimal data
    console.log('Skipping profile completion');
    router.replace({ pathname: '/main/homepage' } as any);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // router.replace('/home' as any);
  };

  const handlePhoneLogin = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: width * 2, animated: true });
      setCurrentPage(2);
    }
  };

  const handleRegisterWithPhone = () => {
    // TODO: Send phone to backend, send code, etc.
    router.replace('/(auth)/phone-verification' as any);
  };

  const handleUseEmailInstead = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
      setCurrentPage(0);
    }
  };

  const handleGoBack = () => {
    if (currentPage === 2) {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: width, animated: true });
        setCurrentPage(1);
      }
    } else if (currentPage === 1) {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, animated: true });
        setCurrentPage(0);
      }
    } else {
      router.replace('/(auth)/login');
    }
  };

  const isProfileFormValid = name.trim() !== '' && profileUsername.trim() !== '';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={24} color="#EB4D2A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {currentPage === 0 ? 'Register' : currentPage === 1 ? 'Complete Profile' : 'Register with Phone'}
        </Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Main Content - Horizontal ScrollView */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // Disable manual swiping for now
      >
        {/* First Slide: Registration Form */}
        <View style={styles.pageContent}>
          <Text style={styles.title}>Create your account here</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#BBAEA8"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#BBAEA8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone Number Option */}
          <TouchableOpacity onPress={handlePhoneLogin}>
            <Text style={styles.phoneOption}>Use phone number instead</Text>
          </TouchableOpacity>

          {/* Social Login Section */}
          <View style={styles.socialSection}>
            <Text style={styles.socialTitle}>Or continue using...</Text>
            
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity 
                style={styles.socialButton} 
                onPress={() => handleSocialLogin('Apple')}
              >
                <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.socialButton} 
                onPress={() => handleSocialLogin('Google')}
              >
                <Ionicons name="logo-google" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.socialButton} 
                onPress={() => handleSocialLogin('Instagram')}
              >
                <Ionicons name="logo-instagram" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.socialButton} 
                onPress={() => handleSocialLogin('Facebook')}
              >
                <Ionicons name="logo-facebook" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Create Account Button */}
          <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
            <Text style={styles.createButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* Second Slide: Create Profile Form */}
        <View style={styles.pageContent}>
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
              value={profileUsername}
              onChangeText={setProfileUsername}
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
                !isProfileFormValid && styles.createAccountButtonDisabled
              ]}
              onPress={handleCompleteProfile}
              disabled={!isProfileFormValid}
            >
              <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Third Slide: Phone Registration Form */}
        <View style={styles.pageContent}>
          <Text style={styles.title}>Register with Phone</Text>

          {/* Phone number input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#BBAEA8"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Register button */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegisterWithPhone}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          {/* Use email instead link */}
          <TouchableOpacity onPress={handleUseEmailInstead} style={styles.emailLink}>
            <Text style={styles.emailLinkText}>Use email instead</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Home Indicator - if still needed */}
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
    paddingTop: 30,
    paddingBottom: 20,
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
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    letterSpacing: -0.04,
    marginRight: 44, // To center the title accounting for back button
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(171, 176, 186, 0.4)',
    marginHorizontal: 0,
  },
  pageContent: {
    width: width, // Each page takes full screen width
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 29, // Adjusted to fit within the screen below header
  },
  title: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
    textAlign: 'center',
    letterSpacing: -0.04,
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#BBAEA8',
    borderRadius: 45,
    paddingHorizontal: 20,
    fontFamily: 'Bogart-Regular-Trial',
    fontSize: 17,
    fontWeight: '500',
    color: '#1E1E1E',
    letterSpacing: -0.04,
  },
  phoneOption: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
    textAlign: 'center',
    letterSpacing: -0.04,
    marginTop: 20,
    marginBottom: 60,
  },
  socialSection: {
    alignItems: 'center',
    marginTop: 210,
    marginBottom: 40,
  },
  socialTitle: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
    letterSpacing: -0.04,
    marginBottom: 24,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 44,
    height: 44,
    backgroundColor: '#1E1E1E',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    height: 55,
    backgroundColor: '#EB4D2A',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  createButtonText: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.04,
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    marginLeft: -67,
    width: 134,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 100,
  },
  // Styles copied from create-profile.tsx
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
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 'auto',
    marginBottom: 40,
  },
  skipButton: {
    flex: 1,
    height: 55,
    backgroundColor: '#F4F4F4',
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
    flex: 1,
    height: 55,
    backgroundColor: '#EB4D2A',
    borderRadius: 45,
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
  // Styles copied from phone.tsx
  registerButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#EB4D2A',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: -0.04,
  },
  emailLink: {
    alignItems: 'center',
    marginTop: 10,
  },
  emailLinkText: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
    letterSpacing: -0.04,
  },
});