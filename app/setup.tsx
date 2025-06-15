import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Mock data - Backend developers should replace with real API calls
const MOCK_USER_DATA = {
  name: 'Mark Jacobs',
  username: '@markj',
  memberSince: '2002',
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  stats: {
    books: 456,
    points: '4.2K',
    followers: '8.9K',
  }
};

export default function ProfileScreen() {
  const handleBackPress = () => {
    router.back();
  };

  const handleBooksPress = () => {
    router.push('/my-books' as any);
  };

  const handlePointsPress = () => {
    router.push('/points' as any);
  };

  const handleFollowersPress = () => {
    router.push('/followers' as any);
  };

  const handleCreateAuthorAccount = () => {
    router.push('/create-author' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleBackPress}
            accessibilityLabel="Go back"
          >
            <Feather name="arrow-left" size={24} color="#FF6B47" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Membership Card */}
        <View style={styles.membershipCard}>
          {/* Decorative papers background */}
          <View style={styles.paperDecoration1} />
          <View style={styles.paperDecoration2} />
          <View style={styles.paperDecoration3} />
          <View style={styles.paperDecoration4} />
          
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <Text style={styles.brandText}>pagez</Text>
            <Text style={styles.membershipText}>MEMBERSHIP CARD</Text>
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={{ uri: MOCK_USER_DATA.profileImage }}
                style={styles.profileImage}
                accessibilityLabel={`${MOCK_USER_DATA.name}'s profile picture`}
              />
            </View>
            
            <Text style={styles.userName}>{MOCK_USER_DATA.name}</Text>
            <Text style={styles.userHandle}>{MOCK_USER_DATA.username}</Text>
            <Text style={styles.memberSince}>
              MEMBER SINCE {MOCK_USER_DATA.memberSince}
            </Text>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <TouchableOpacity 
              style={styles.statItem}
              onPress={handleBooksPress}
              accessibilityLabel={`${MOCK_USER_DATA.stats.books} books`}
            >
              <Feather name="book-open" size={28} color="white" />
              <Text style={styles.statNumber}>{MOCK_USER_DATA.stats.books}</Text>
              <Text style={styles.statLabel}>Books</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.statItem}
              onPress={handlePointsPress}
              accessibilityLabel={`${MOCK_USER_DATA.stats.points} points`}
            >
              <Feather name="settings" size={28} color="white" />
              <Text style={styles.statNumber}>{MOCK_USER_DATA.stats.points}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.statItem}
              onPress={handleFollowersPress}
              accessibilityLabel={`${MOCK_USER_DATA.stats.followers} followers`}
            >
              <Feather name="users" size={28} color="white" />
              <Text style={styles.statNumber}>{MOCK_USER_DATA.stats.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Create Author Account Button */}
        <TouchableOpacity 
          style={styles.authorButton}
          onPress={handleCreateAuthorAccount}
          accessibilityLabel="Create author account"
        >
          <Feather name="edit-3" size={24} color="#666" />
          <Text style={styles.authorButtonText}>Create author account</Text>
          <Feather name="arrow-right" size={24} color="#666" />
        </TouchableOpacity>

        {/* Bottom spacing for scroll */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    minHeight: screenHeight - 100, // Ensure content fills screen
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F5F5F5',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
  },
  membershipCard: {
    backgroundColor: '#FF6B47',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#FF6B47',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  paperDecoration1: {
    position: 'absolute',
    top: -20,
    right: -10,
    width: 80,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
    transform: [{ rotate: '15deg' }],
  },
  paperDecoration2: {
    position: 'absolute',
    top: 20,
    left: -15,
    width: 60,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    transform: [{ rotate: '-20deg' }],
  },
  paperDecoration3: {
    position: 'absolute',
    bottom: -10,
    right: 30,
    width: 70,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 8,
    transform: [{ rotate: '25deg' }],
  },
  paperDecoration4: {
    position: 'absolute',
    bottom: 40,
    left: -20,
    width: 90,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    transform: [{ rotate: '-15deg' }],
  },
  cardHeader: {
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  brandText: {
    fontSize: 24,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    marginBottom: 4,
  },
  membershipText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'white',
    letterSpacing: 1.5,
    opacity: 0.9,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
    zIndex: 10,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 4,
    marginBottom: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 46,
  },
  userName: {
    fontSize: 32,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 18,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  memberSince: {
    fontSize: 14,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    letterSpacing: 1,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  authorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 32,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  authorButtonText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#333',
    marginLeft: 12,
  },
  bottomSpacing: {
    height: 40,
  },
}); 