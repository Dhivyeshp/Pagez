import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

export default function PhoneRegistrationScreen() {
  const [phone, setPhone] = useState('');

  const handleRegisterWithPhone = () => {
    // TODO: Send phone to backend, send code, etc.
    router.replace('/(auth)/phone-verification' as any);
  };

  const handleUseEmailInstead = () => {
    router.replace('/(auth)/register' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header with back button and title */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(auth)/register')}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="chevron-back" size={24} color="#EB4D2A" />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Register</Text>
      </View>

      {/* Divider line */}
      <View style={styles.divider} />

      {/* Main content */}
      <View style={styles.content}>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 25,
  },
  backButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(217, 217, 217, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
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
    paddingTop: 29,
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
    marginBottom: 30,
  },
  input: {
    width: '100%',
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