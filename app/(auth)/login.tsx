import React, { useState, useRef, useEffect } from 'react';
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
  Animated, // <-- add Animated import
} from 'react-native';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Ionicons } from '@expo/vector-icons';
import { PagezLogo } from '../../src/components/Splash';
const GoogleLogo = require('../../src/assets/images/google-logo.png');
const AppleLogo = require('../../src/assets/images/apple-logo.png');
const FacebookLogo = require('../../src/assets/images/facebook-logo.png');
const WhatsappLogo = require('../../src/assets/images/whatsapp-logo.png');
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const bookHeaderImage = require('../../src/assets/images/book-header.png');

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ inOnboarding }) {
  const [username, setUsername] = useState('user@example.com');
  const [password, setPassword] = useState('password123');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [loginDisabled, setLoginDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Prefill username and password if remembered
  useEffect(() => {
    (async () => {
      // Clear any existing AsyncStorage data for demo purposes
      await AsyncStorage.removeItem('rememberMe');
      await AsyncStorage.removeItem('rememberedUsername');
      await AsyncStorage.removeItem('rememberedPassword');
      setRememberMe(false);
    })();
  }, []);

  // Animated value for button color
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const isLoginEnabled = username.length > 0 && password.length > 0;

  // Debug: log the button state
  console.log('Login button state:', { username, password, isLoginEnabled, loginDisabled });

  useEffect(() => {
    Animated.timing(buttonAnim, {
      toValue: isLoginEnabled ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isLoginEnabled]);

  // Interpolate color from gray to orange
  const buttonColor = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#BBAEA8', '#EB4D2A'], // gray to match 'Let's go...' color
  });

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

  // Placeholder valid usernames/emails (replace with real backend check)
  const validUsers = ['user@example.com', 'markj', 'testuser'];
  const [userError, setUserError] = useState('');

  const handleLogin = () => {
    // Username/email validation
    if (!validUsers.includes(username)) {
      setUserError('*Username or email not registered to an account*');
      setErrorMessage('');
      return;
    } else {
      setUserError('');
    }
    // Placeholder password check (replace with real logic)
    const correctPassword = 'password123';
    if (password !== correctPassword) {
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);
      if (attempts >= 3) {
        setLoginDisabled(true);
        setErrorMessage('*Incorrect password. You have used all your attempts; Click forgot password*');
      } else {
        setErrorMessage(`*Incorrect password - You have ${3 - attempts} more ${3 - attempts === 1 ? 'try' : 'tries'}*`);
      }
      return;
    }
    // Success: clear error and proceed
    setErrorMessage('');
    setFailedAttempts(0);
    setLoginDisabled(false);
    if (rememberMe) {
      AsyncStorage.setItem('rememberMe', 'true');
      AsyncStorage.setItem('rememberedUsername', username);
      AsyncStorage.setItem('rememberedPassword', password);
    } else {
      AsyncStorage.setItem('rememberMe', 'false');
      AsyncStorage.removeItem('rememberedUsername');
      AsyncStorage.removeItem('rememberedPassword');
    }
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

    // Navigate to profile page after social login
    router.replace('/profile' as any);
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
            
            <View style={[
              styles.inputWrapper,
              (failedAttempts > 0 || loginDisabled) && { 
                borderColor: '#EB4D2A', 
                borderWidth: 2
              }
            ]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={[
                    styles.input,
                    { flex: 1 },
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#BBAEA8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!passwordVisible}
                  editable={!loginDisabled}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(v => !v)}
                  style={{ padding: 8 }}
                  accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
                  disabled={loginDisabled}
                >
                  <Ionicons
                    name={passwordVisible ? 'eye' : 'eye-off'}
                    size={22}
                    color="#BBAEA8"
                  />
                </TouchableOpacity>
              </View>
            </View>
          {/* Error message for user or password */}
          {userError ? (
            <Text style={{ color: '#EB4D2A', marginBottom: 6, marginLeft: 8, fontWeight: '500', fontSize: 13 }}>{userError}</Text>
          ) : errorMessage ? (
            <Text style={{ color: '#EB4D2A', marginBottom: 6, marginLeft: 8, fontWeight: '500', fontSize: 13 }}>{errorMessage}</Text>
          ) : null}
            {/* Remember me and Forgot password row */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setRememberMe(v => !v)}>
                <Ionicons
                  name={rememberMe ? 'checkbox' : 'square-outline'}
                  size={20}
                  color={rememberMe ? '#EB4D2A' : '#BBAEA8'}
                  style={{ marginRight: 6 }}
                />
                <Text style={{ color: rememberMe ? '#EB4D2A' : '#1E1E1E', fontWeight: '500', fontSize: 15 }}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ color: '#EB4D2A', fontWeight: '500', fontSize: 15 }} onPress={() => router.push('/(auth)/forgot-password')}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <Animated.View style={[styles.loginButton, { backgroundColor: buttonColor }]}> 
            <TouchableOpacity
              onPress={handleLogin}
              disabled={false}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              activeOpacity={0.7}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Use phone number instead */}
          <TouchableOpacity onPress={handleUsePhone} style={styles.phoneLink}>
            <Text style={styles.phoneLinkText}>Use phone number instead</Text>
          </TouchableOpacity>

          {/* Social Login Section */}
          <View style={styles.socialSection}>
            <Text style={styles.socialTitle}>Or continue using...</Text>
            
            <View style={styles.socialButtons}>
              {/* Apple */}
              <TouchableOpacity 
                style={[styles.socialButton, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E0E0E0' }]} 
                onPress={() => handleSocialLogin('Apple')}
              >
                <Image source={AppleLogo} style={{ width: 26, height: 26, resizeMode: 'contain' }} />
              </TouchableOpacity>

              {/* Google */}
              <TouchableOpacity 
                style={[styles.socialButton, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E0E0E0' }]} 
                onPress={() => handleSocialLogin('Google')}
              >
                <Image source={GoogleLogo} style={{ width: 26, height: 26, resizeMode: 'contain' }} />
              </TouchableOpacity>

              {/* Facebook */}
              <TouchableOpacity 
                style={[styles.socialButton, { backgroundColor: '#1877F3' }]} 
                onPress={() => handleSocialLogin('Facebook')}
              >
                <Image source={FacebookLogo} style={{ width: 26, height: 26, resizeMode: 'contain' }} />
              </TouchableOpacity>

              {/* WhatsApp */}
              <TouchableOpacity 
                style={[styles.socialButton, { backgroundColor: '#25D366' }]} 
                onPress={() => handleSocialLogin('WhatsApp')}
              >
                <Image source={WhatsappLogo} style={{ width: 26, height: 26, resizeMode: 'contain' }} />
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
    marginBottom: 19, // Reduced margin to move content upwards
  },
  inputContainer: {
    marginBottom: 16, // Reduced margin to move content upwards
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
    height: 48,
    borderRadius: 24,
    marginTop: 24,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor removed, handled by Animated.View
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
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