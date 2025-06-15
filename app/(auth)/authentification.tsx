import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

export default function AuthentificationScreen() {
  const [loading, setLoading] = useState(false);

  // Google AuthSession setup
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_EXPO_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // For Expo Go and web
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  });

  // Handle Google Auth response
  React.useEffect(() => {
    if (response?.type === 'success') {
      setLoading(true);
      // TODO: Send response.authentication.accessToken to backend/Firebase here
      setTimeout(() => {
        setLoading(false);
        router.replace('/'); // Navigate to home on success
      }, 1200);
    }
  }, [response]);

  // Simulated Apple login
  const handleAppleLogin = async () => {
    setLoading(true);
    // TODO: Replace with real Apple auth logic
    setTimeout(() => {
      setLoading(false);
      // Simulate receiving user data
      const fakeAppleUser = {
        id: 'apple123',
        name: 'Apple User',
        email: 'appleuser@example.com',
      };
      // TODO: Send fakeAppleUser to backend/Firebase here
      router.replace('/');
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to continue</Text>


      {/* Google Login */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#fff', borderColor: '#4285F4', borderWidth: 1 }]}
        disabled={!request || loading}
        onPress={() => {
          setLoading(true);
          promptAsync().finally(() => setLoading(false));
        }}
      >
        <Ionicons name="logo-google" size={20} color="#4285F4" style={{ marginRight: 8 }} />
        <Text style={[styles.buttonText, { color: '#4285F4' }]}>Sign in with Google</Text>
      </TouchableOpacity>

      {/* Apple Login (Simulated) */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#000' }]}
        disabled={loading}
        onPress={handleAppleLogin}
      >
        <Ionicons name="logo-apple" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={[styles.buttonText, { color: '#fff' }]}>Sign in with Apple (Fake)</Text>
      </TouchableOpacity>

      {/* Loading Spinner */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#EB4D2A" />
          <Text style={styles.loadingText}>Authenticating...</Text>
        </View>
      )}

      {/* Placeholders for future backend logic */}
      {/* 
        // TODO: On successful login, send user data/token to your backend or Firebase here.
        // TODO: Handle error and show user-friendly messages.
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Bogart-Bold',
    color: '#EB4D2A',
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#EB4D2A',
    fontFamily: 'Inter',
    fontWeight: '500',
  },
});