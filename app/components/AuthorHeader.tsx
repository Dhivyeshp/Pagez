import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { router, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface AuthorHeaderProps {
  profileImage: string;
}

const AuthorHeader: React.FC<AuthorHeaderProps> = ({ profileImage }) => {
  const segments = useSegments();
  const currentRoute = segments[segments.length - 1];

  const handleNavigation = (destination: string) => {
    router.push(`/${destination}` as any);
  };

  const handleBackPress = () => {
    if (currentRoute === 'dashboard') {
      router.push('/' as any);
    } else {
      router.back();
    }
  };

  const handleSettingsPress = () => {
    router.push('/settings' as any);
  };

  const handleProfilePress = () => {
    router.push('/profile' as any);
  };

  return (
    <SafeAreaView style={styles.topBlueSection}>
      <StatusBar barStyle="light-content" backgroundColor="#4F7BF7" />
      {/* Header Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Author's Space</Text>
        
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleSettingsPress} style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleProfilePress}>
            <Image 
              source={{ uri: profileImage }} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, currentRoute === 'dashboard' && styles.activeTab]}
          onPress={() => router.push('/author/dashboard' as any)}
        >
          <Text style={[styles.tabText, currentRoute === 'dashboard' && styles.activeTabText]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, currentRoute === 'books' && styles.activeTab]}
          onPress={() => router.push('/author/books' as any)}
        >
          <Text style={[styles.tabText, currentRoute === 'books' && styles.activeTabText]}>Books</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, currentRoute === 'notes' && styles.activeTab]}
          onPress={() => router.push('/author/notes' as any)}
        >
          <Text style={[styles.tabText, currentRoute === 'notes' && styles.activeTabText]}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, currentRoute === 'community' && styles.activeTab]}
          onPress={() => router.push('/author/community' as any)}
        >
          <Text style={[styles.tabText, currentRoute === 'community' && styles.activeTabText]}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, currentRoute === 'you' && styles.activeTab]}
          onPress={() => router.push('/author/you' as any)}
        >
          <Text style={[styles.tabText, currentRoute === 'you' && styles.activeTabText]}>You</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBlueSection: {
    backgroundColor: '#4F7BF7',
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 10,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    fontWeight: '500',
  },
  headerRight: {
    position: 'absolute',
    right: 20,
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsButton: {
    padding: 4,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeTabText: {
    color: 'white',
    fontFamily: 'Bogart-Bold-Trial',
  },
});

export default AuthorHeader; 