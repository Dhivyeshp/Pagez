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
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function PhoneVerificationScreen() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    // Dismiss keyboard when all digits are entered
    if (newCode.every(d => d !== '')) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCreateAccount = () => {
    const verificationCode = code.join('');
    if (verificationCode.length === 6) {
      // Handle verification logic here
      console.log('Verification code:', verificationCode);
      // Navigate to create profile screen
      router.replace('/(auth)/create-profile' as any);
    }
  };

  const isCompleted = code.every(digit => digit !== '');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.replace('/(auth)/phone' as any)}
          >
            <Ionicons name="chevron-back" size={24} color="#EB4D2A" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Phone Number Verification</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.instructionText}>
            We've sent you a 6-digit number to verify your number
          </Text>

          {/* Code Input */}
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => { inputRefs.current[index] = ref; }}
                style={[
                  styles.codeInput,
                  digit ? styles.codeInputFilled : styles.codeInputEmpty
                ]}
                value={digit}
                onChangeText={(text) => handleCodeChange(text.slice(-1), index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
                autoFocus={index === 0}
              />
            ))}
          </View>

          {/* Create Account Button */}
          <TouchableOpacity
            style={[
              styles.createAccountButton,
              !isCompleted && styles.createAccountButtonDisabled
            ]}
            onPress={handleCreateAccount}
            disabled={!isCompleted}
          >
            <Text style={styles.createAccountText}>Create Account</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
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
    paddingTop: 40,
  },
  instructionText: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    textAlign: 'center',
    color: '#1E1E1E',
    letterSpacing: -0.04,
    marginBottom: 60,
    paddingHorizontal: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 0.5,
    marginBottom: 80,
  },
  codeInput: {
    width: 52,
    height: 52,
    borderRadius: 45,
    fontSize: 17,
    fontFamily: 'Bogart-Regular-Trial',
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: -0.04,
  },
  codeInputFilled: {
    backgroundColor: '#EB4D2A',
    borderWidth: 0,
  },
  codeInputEmpty: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#BBAEA8',
    color: '#1E1E1E',
  },
  createAccountButton: {
    backgroundColor: '#EB4D2A',
    borderRadius: 45,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  createAccountButtonDisabled: {
    opacity: 0.5,
  },
  createAccountText: {
    fontFamily: 'Bogart-Bold-Trial',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.04,
  },
 
});