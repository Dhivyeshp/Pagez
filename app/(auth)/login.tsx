import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Ionicons } from '@expo/vector-icons';
import { PagezLogo } from '../../src/components/Splash';

WebBrowser.maybeCompleteAuthSession();

const bookHeaderImage = require('../../src/assets/images/book-header.png');

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ inOnboarding }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Google AuthSession setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '407408718192.apps.googleusercontent.com', // Expo Go demo client ID
    iosClientId: '',
    androidClientId: '',
    webClientId: '',
  });

  // Handle Google Auth response
  React.useEffect(() => {
    if (response?.type === 'success') {
      // TODO: Send response.authentication.accessToken to backend/Firebase here
      router.replace('/home' as any);
    }
  }, [response]);

  const handleLogin = () => {
    // TODO: Add real authentication logic here
    router.replace('/home' as any);
  };

  const handleSocialLogin = (platform) => {
    // TODO: Backend Implementation Required
    // 1. For Google Sign-In:
    //    - Implement proper Google OAuth flow using expo-auth-session
    //    - Set up Google Cloud Console project and configure OAuth 2.0
    //    - Add proper client IDs for iOS and Android
    //    - Handle token exchange and user profile fetching
    //    - Store user session securely
    //
    // 2. For Apple Sign-In:
    //    - Implement Apple Sign-In using expo-auth-session
    //    - Configure Apple Developer account and set up Sign in with Apple
    //    - Add proper service ID and key ID
    //    - Handle token exchange and user profile fetching
    //    - Store user session securely
    //
    // 3. Security Considerations:
    //    - Implement proper token storage and refresh mechanisms
    //    - Add proper error handling for auth failures
    //    - Implement secure session management
    //    - Add proper user profile data handling
    //    - Consider implementing biometric authentication for additional security

    // Temporary navigation to home screen
    router.replace('/home' as any);
  };

  const handleUsePhone = () => {
    router.push('/(auth)/phone' as any);
  };

  const handleJoinNow = () => {
    router.replace('/(auth)/register');
  };

  return (
    <SafeAreaView style={[
      styles.container,
      inOnboarding && { width, height, paddingHorizontal: 0, paddingVertical: 0 }
    ]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f3f0" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section with rotated image and decorative elements */}
        <View style={styles.headerSection}>
          {/* Rotated background image - positioned more in corner */}
          <View style={styles.rotatedImageContainer}>
            <Image
              source={bookHeaderImage}
              style={styles.rotatedImage}
              resizeMode="cover"
            />
          </View>
          
          {/* Logo - made bigger and repositioned */}
          <View style={styles.logoContainer}>
            <PagezLogo width={width * 0.35} />
          </View>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          <Text style={styles.title}>Let's go...</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Username or Email"
                placeholderTextColor="#BBAEA8"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#BBAEA8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Use phone number instead */}
          <TouchableOpacity onPress={handleUsePhone} style={styles.phoneLink}>
            <Text style={styles.phoneLinkText}>Use phone number instead</Text>
          </TouchableOpacity>

          {/* Social Login Section */}
          <View style={styles.socialSection}>
            <Text style={styles.socialTitle}>Or continue using...</Text>
            
            <View style={styles.socialButtons}>
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
            </View>
          </View>

          {/* Sign Up Section */}
          <View style={styles.signupSection}>
            <Text style={styles.signupText}>
              Don't have an account?{' '}
              <Text style={styles.joinNowText} onPress={handleJoinNow}>
                Join now
              </Text>
            </Text>
          </View>

          {/* Page Indicator */}
          <View style={styles.pageIndicator}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3f0',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
    minHeight: height, // Ensure minimum height for proper scrolling
  },
  headerSection: {
    height: Math.min(300, height * 0.42), // Increased height to accommodate larger logo
    position: 'relative',
    overflow: 'visible', // Changed to visible to prevent clipping
  },
  rotatedImageContainer: {
    position: 'absolute',
    width: Math.min(320, width * 0.85), // Adjusted size
    height: Math.min(320, height * 0.32), // Adjusted size
    right: -40, // Positioned more in the corner
    top: -20, // Moved up
    transform: [{ rotate: '-9.33deg' }],
    borderRadius: 8,
    overflow: 'hidden',
  },
  rotatedImage: {
    width: '100%',
    height: '100%',
  },
  pinkSticky: {
    position: 'absolute',
    width: 35,
    height: 45,
    left: width * 0.25, // Adjusted to not overlap with logo
    top: 80, // Fixed position instead of percentage
    backgroundColor: '#FEB3D2',
    borderRadius: 3,
    transform: [{ rotate: '-18deg' }],
  },
  yellowSticky: {
    position: 'absolute',
    width: 50,
    height: 60,
    right: width * 0.35, // Adjusted position to work with new image size
    top: 120, // Fixed position instead of percentage
    backgroundColor: '#F5C106',
    borderRadius: 3,
    transform: [{ rotate: '10.49deg' }],
  },
  logoContainer: {
    position: 'absolute',
    left: 25,
    top: -195,
    zIndex: 10,
  },
  content: {
    paddingHorizontal: 30, // Increased padding to match design
    paddingTop: 20,
  },
  title: {
    fontSize: Math.min(42, width * 0.11),
    fontFamily: 'Bogart-Regular-Trial',
    color: '#EB4D2A',
    fontWeight: '500',
    lineHeight: Math.min(50, width * 0.13),
    letterSpacing: -1,
    marginBottom: 35, // Increased margin
  },
  inputContainer: {
    marginBottom: 30, // Increased margin
  },
  inputWrapper: {
    width: '100%', // Full width
    height: 55, // Slightly taller
    borderWidth: 1.5, // Slightly thicker border
    borderColor: '#BBAEA8',
    borderRadius: 28, // More rounded
    marginBottom: 18, // Increased spacing
    paddingHorizontal: 25, // More padding
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // Added white background
  },
  input: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#1E1E1E',
    letterSpacing: -0.5,
  },
  loginButton: {
    width: '100%', // Full width
    height: 58, // Slightly taller
    backgroundColor: '#EB4D2A',
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Increased margin
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  phoneLink: {
    alignItems: 'center',
    marginBottom: 35, // Increased margin
  },
  phoneLinkText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#1E1E1E',
    letterSpacing: -0.5,
  },
  socialSection: {
    alignItems: 'center',
    marginBottom: 30, // Increased margin
  },
  socialTitle: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#1E1E1E',
    letterSpacing: -0.5,
    marginBottom: 25, // Increased margin
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15, // Increased gap
  },
  socialButton: {
    width: 50, // Made slightly bigger
    height: 50, // Made slightly bigger
    backgroundColor: '#1E1E1E',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupSection: {
    alignItems: 'center',
    marginBottom: 30, // Increased margin
  },
  signupText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#1E1E1E',
    letterSpacing: -0.5,
    lineHeight: 22,
    textAlign: 'center',
  },
  joinNowText: {
    color: '#EB4D2A',
    fontWeight: '600',
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12, // Slightly increased gap
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
  },
  activeDot: {
    backgroundColor: '#EB4D2A',
  },
});