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
import { Ionicons } from '@expo/vector-icons';
import { PagezLogo } from '../../src/components/Splash';

const bookHeaderImage = require('../../src/assets/images/book-header.png');
const { width, height } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
  const [contactMethod, setContactMethod] = useState(''); // 'email' or 'phone'
  const [contactValue, setContactValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Placeholder valid contacts (replace with real backend check)
  const validEmails = ['user@example.com', 'test@example.com'];
  const validPhones = ['+1234567890', '+0987654321'];

  const handleContactMethodSelect = (method) => {
    setContactMethod(method);
    setContactValue('');
    setIsValid(false);
  };

  const handleContactChange = (value) => {
    setContactValue(value);
    // Basic validation
    if (contactMethod === 'email') {
      setIsValid(value.includes('@') && value.includes('.'));
    } else if (contactMethod === 'phone') {
      setIsValid(value.length >= 10);
    }
  };

  const handleContinue = () => {
    if (!contactValue || !isValid) return;

    // Check if contact exists
    let contactExists = false;
    if (contactMethod === 'email') {
      contactExists = validEmails.includes(contactValue);
    } else if (contactMethod === 'phone') {
      contactExists = validPhones.includes(contactValue);
    }

    if (contactExists) {
      // Navigate to verification screen
      router.push({
        pathname: '/(auth)/verification-code',
        params: { method: contactMethod, contact: contactValue }
      });
    } else {
      // Show error - contact not found
      alert(`${contactMethod === 'email' ? 'Email' : 'Phone number'} not found. Please check and try again.`);
    }
  };

  const handleBack = () => {
    router.back();
  };

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
          <Text style={styles.title}>Forgot password</Text>

          {/* Contact Method Selection */}
          <View style={styles.methodContainer}>
            <Text style={styles.subtitle}>How would you like to reset your password?</Text>
            
            <View style={styles.methodButtons}>
              <TouchableOpacity 
                style={[
                  styles.methodButton,
                  contactMethod === 'email' && styles.methodButtonActive
                ]}
                onPress={() => handleContactMethodSelect('email')}
              >
                <Ionicons 
                  name="mail-outline" 
                  size={24} 
                  color={contactMethod === 'email' ? '#EB4D2A' : '#BBAEA8'} 
                />
                <Text style={[
                  styles.methodButtonText,
                  contactMethod === 'email' && styles.methodButtonTextActive
                ]}>Email</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.methodButton,
                  contactMethod === 'phone' && styles.methodButtonActive
                ]}
                onPress={() => handleContactMethodSelect('phone')}
              >
                <Ionicons 
                  name="call-outline" 
                  size={24} 
                  color={contactMethod === 'phone' ? '#EB4D2A' : '#BBAEA8'} 
                />
                <Text style={[
                  styles.methodButtonText,
                  contactMethod === 'phone' && styles.methodButtonTextActive
                ]}>Phone</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Contact Input */}
          {contactMethod && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                {contactMethod === 'email' ? 'Email address' : 'Phone number'}
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder={contactMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                  placeholderTextColor="#BBAEA8"
                  value={contactValue}
                  onChangeText={handleContactChange}
                  keyboardType={contactMethod === 'email' ? 'email-address' : 'phone-pad'}
                  autoCapitalize="none"
                />
              </View>
            </View>
          )}

          {/* Continue Button */}
          {contactMethod && contactValue && (
            <TouchableOpacity 
              style={[
                styles.continueButton,
                isValid && { backgroundColor: '#EB4D2A' }
              ]}
              onPress={handleContinue}
              disabled={!isValid}
            >
              <Text style={[
                styles.continueButtonText,
                isValid && { color: '#FFFFFF' }
              ]}>Continue</Text>
            </TouchableOpacity>
          )}

          {/* Back to Login */}
          <TouchableOpacity onPress={handleBack} style={styles.backLink}>
            <Ionicons name="chevron-back" size={20} color="#EB4D2A" />
            <Text style={styles.backLinkText}>Back to login</Text>
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
  methodContainer: {
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#1E1E1E',
    marginBottom: 20,
    textAlign: 'center',
  },
  methodButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  methodButton: {
    flex: 1,
    height: 60,
    borderWidth: 1.5,
    borderColor: '#BBAEA8',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  methodButtonActive: {
    borderColor: '#EB4D2A',
    backgroundColor: '#FFF5F2',
  },
  methodButtonText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#BBAEA8',
  },
  methodButtonTextActive: {
    color: '#EB4D2A',
  },
  inputContainer: {
    marginBottom: 30,
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
  continueButton: {
    height: 48,
    borderRadius: 24,
    marginTop: 24,
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
  continueButtonText: {
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