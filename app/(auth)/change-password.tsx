import React, { useState, useEffect } from 'react';
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
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PagezLogo } from '../../src/components/Splash';

const bookHeaderImage = require('../../src/assets/images/book-header.png');
const { width, height } = Dimensions.get('window');

export default function ChangePasswordScreen() {
  const params = useLocalSearchParams();
  const { method, contact } = params;
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Validate passwords whenever they change
  useEffect(() => {
    const isNewPasswordValid = newPassword.length >= 6;
    const isConfirmPasswordValid = confirmPassword.length >= 6;
    const doPasswordsMatch = newPassword === confirmPassword;
    
    setIsValid(isNewPasswordValid && isConfirmPasswordValid && doPasswordsMatch);
  }, [newPassword, confirmPassword]);

  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleChangePassword = () => {
    if (!isValid) return;

    // TODO: Update password via backend
    // For now, just navigate to success screen
    router.push({
      pathname: '/(auth)/password-changed',
      params: { method, contact }
    });
  };

  const handleBack = () => {
    router.back();
  };

  const getPasswordStrength = () => {
    if (newPassword.length === 0) return { text: '', color: '#BBAEA8' };
    if (newPassword.length < 6) return { text: 'Too short', color: '#EB4D2A' };
    if (newPassword.length < 8) return { text: 'Weak', color: '#FF9500' };
    if (newPassword.length < 10) return { text: 'Good', color: '#34C759' };
    return { text: 'Strong', color: '#34C759' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f3f0" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.rotatedImageContainer}>
            <Image
              source={bookHeaderImage}
              style={styles.rotatedImage}
              resizeMode="cover"
            />
          </View>
          
          <View style={styles.logoContainer}>
            <PagezLogo width={width * 0.35} />
          </View>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          <Text style={styles.title}>New password</Text>

          <View style={styles.passwordContainer}>
            <Text style={styles.subtitle}>
              Create a new password for your account
            </Text>

            {/* New Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>New password</Text>
              <View style={styles.inputWrapper}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Enter new password"
                    placeholderTextColor="#BBAEA8"
                    value={newPassword}
                    onChangeText={handleNewPasswordChange}
                    secureTextEntry={!newPasswordVisible}
                  />
                  <TouchableOpacity
                    onPress={() => setNewPasswordVisible(v => !v)}
                    style={{ padding: 8 }}
                  >
                    <Ionicons
                      name={newPasswordVisible ? 'eye' : 'eye-off'}
                      size={22}
                      color="#BBAEA8"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {newPassword.length > 0 && (
                <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                  {passwordStrength.text}
                </Text>
              )}
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm password</Text>
              <View style={styles.inputWrapper}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Confirm new password"
                    placeholderTextColor="#BBAEA8"
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                    secureTextEntry={!confirmPasswordVisible}
                  />
                  <TouchableOpacity
                    onPress={() => setConfirmPasswordVisible(v => !v)}
                    style={{ padding: 8 }}
                  >
                    <Ionicons
                      name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                      size={22}
                      color="#BBAEA8"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                <Text style={styles.errorText}>Passwords don't match</Text>
              )}
            </View>

            {/* Change Password Button */}
            <TouchableOpacity 
              style={[
                styles.changeButton,
                isValid && { backgroundColor: '#EB4D2A' }
              ]}
              onPress={handleChangePassword}
              disabled={false}
            >
              <Text style={[
                styles.changeButtonText,
                isValid && { color: '#FFFFFF' }
              ]}>Change password</Text>
            </TouchableOpacity>
          </View>

          {/* Back to Verification */}
          <TouchableOpacity onPress={handleBack} style={styles.backLink}>
            <Ionicons name="chevron-back" size={20} color="#EB4D2A" />
            <Text style={styles.backLinkText}>Back to verification</Text>
          </TouchableOpacity>
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
    minHeight: height,
  },
  headerSection: {
    height: Math.min(300, height * 0.42),
    position: 'relative',
    overflow: 'visible',
  },
  rotatedImageContainer: {
    position: 'absolute',
    width: Math.min(320, width * 0.85),
    height: Math.min(320, height * 0.32),
    right: -40,
    top: -20,
    transform: [{ rotate: '-9.33deg' }],
    borderRadius: 8,
    overflow: 'hidden',
  },
  rotatedImage: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    position: 'absolute',
    left: 25,
    top: -195,
    zIndex: 10,
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: Math.min(42, width * 0.11),
    fontFamily: 'Bogart-Regular-Trial',
    color: '#EB4D2A',
    fontWeight: '500',
    lineHeight: Math.min(50, width * 0.13),
    letterSpacing: -1,
    marginBottom: 19,
  },
  passwordContainer: {
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#1E1E1E',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#1E1E1E',
    marginBottom: 10,
    marginLeft: 8,
  },
  inputWrapper: {
    width: '100%',
    height: 55,
    borderWidth: 1.5,
    borderColor: '#BBAEA8',
    borderRadius: 28,
    paddingHorizontal: 25,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#1E1E1E',
    letterSpacing: -0.5,
  },
  strengthText: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
    marginTop: 6,
    marginLeft: 8,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#EB4D2A',
    marginTop: 6,
    marginLeft: 8,
  },
  changeButton: {
    height: 48,
    borderRadius: 24,
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BBAEA8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  changeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  backLinkText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#EB4D2A',
    marginLeft: 4,
  },
}); 