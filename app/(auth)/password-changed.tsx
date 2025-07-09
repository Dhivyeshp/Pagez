import React from 'react';
import {
  View,
  Text,
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

export default function PasswordChangedScreen() {
  const params = useLocalSearchParams();
  const { method, contact } = params;

  const handleBackToLogin = () => {
    router.replace('/(auth)/login');
  };

  const formatContact = (contact) => {
    if (method === 'email') {
      return contact;
    } else {
      // Mask phone number
      return contact.replace(/(\d{3})(\d{3})(\d{4})/, '$1***$3');
    }
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
          <View style={styles.successContainer}>
            {/* Success Icon */}
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={80} color="#34C759" />
            </View>

            <Text style={styles.title}>Password changed!</Text>

            <Text style={styles.subtitle}>
              Your password has been successfully updated
            </Text>

            <Text style={styles.contactText}>
              You can now log in with your new password using {formatContact(contact)}
            </Text>

            {/* Back to Login Button */}
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleBackToLogin}
            >
              <Text style={styles.loginButtonText}>Back to login</Text>
            </TouchableOpacity>
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
  successContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  successIcon: {
    marginBottom: 30,
  },
  title: {
    fontSize: Math.min(42, width * 0.11),
    fontFamily: 'Bogart-Regular-Trial',
    color: '#EB4D2A',
    fontWeight: '500',
    lineHeight: Math.min(50, width * 0.13),
    letterSpacing: -1,
    marginBottom: 19,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#1E1E1E',
    marginBottom: 15,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#BBAEA8',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 22,
  },
  loginButton: {
    height: 48,
    borderRadius: 24,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EB4D2A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 200,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '600',
    letterSpacing: -0.5,
  },
}); 