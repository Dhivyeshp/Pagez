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
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PagezLogo } from '../../src/components/Splash';

const bookHeaderImage = require('../../src/assets/images/book-header.png');
const { width, height } = Dimensions.get('window');

export default function VerificationCodeScreen() {
  const params = useLocalSearchParams();
  const { method, contact } = params;
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Placeholder verification code (replace with real backend)
  const correctCode = '123456';

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all digits are entered
    if (newCode.every(digit => digit !== '') && newCode.join('') === correctCode) {
      // Navigate to change password screen
      router.push({
        pathname: '/(auth)/change-password',
        params: { method, contact }
      });
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    setTimer(60);
    setCanResend(false);
    setCode(['', '', '', '', '', '']);
    // TODO: Send new verification code via backend
    Alert.alert('Code Sent', 'A new verification code has been sent to your ' + method);
  };

  const handleBack = () => {
    router.back();
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
          <Text style={styles.title}>Verification</Text>

          <View style={styles.verificationContainer}>
            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to your {method}
            </Text>
            
            <Text style={styles.contactText}>
              {formatContact(contact)}
            </Text>

            {/* Code Input */}
            <View style={styles.codeContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => inputRefs.current[index] = ref}
                  style={styles.codeInput}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                  autoFocus={index === 0}
                />
              ))}
            </View>

            {/* Timer and Resend */}
            <View style={styles.timerContainer}>
              {!canResend ? (
                <Text style={styles.timerText}>
                  Resend code in {timer}s
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResendCode}>
                  <Text style={styles.resendText}>Resend code</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Back to Forgot Password */}
          <TouchableOpacity onPress={handleBack} style={styles.backLink}>
            <Ionicons name="chevron-back" size={20} color="#EB4D2A" />
            <Text style={styles.backLinkText}>Back to forgot password</Text>
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
  verificationContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#1E1E1E',
    marginBottom: 10,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#BBAEA8',
    marginBottom: 30,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  codeInput: {
    width: 45,
    height: 55,
    borderWidth: 1.5,
    borderColor: '#BBAEA8',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#1E1E1E',
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#BBAEA8',
  },
  resendText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#EB4D2A',
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