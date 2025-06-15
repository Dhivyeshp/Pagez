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
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

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

const papersBg = require('../../src/assets/images/papers.png');

export default function ProfileScreen() {
  // TODO: Backend integration - fetch user profile data
  const handleBackPress = () => {
    router.back();
  };

  const handleCreateAuthorAccount = () => {
    router.push('/profile/create-author/create-author' as any);
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
            style={styles.headerIconButton}
            onPress={handleBackPress}
            accessibilityLabel="Go back"
          >
            <Ionicons name="chevron-back" size={24} color="#FF6B35" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerRightIcons}>
            <TouchableOpacity style={styles.headerIconButton}>
              <Ionicons name="share-social-outline" size={22} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconButton}>
              <Ionicons name="settings-outline" size={22} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Membership Card */}
        <View style={styles.membershipCard}>
          <ImageBackground source={papersBg} style={styles.papersBg} imageStyle={{ borderRadius: 24 }} resizeMode="cover">
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.brandText}>pagez</Text>
                <Text style={styles.membershipText}>MEMBERSHIP CARD</Text>
              </View>
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
              <View style={styles.statItem}>
                <Ionicons name="book-outline" size={22} color="white" style={styles.statIcon} />
                <Text style={styles.statNumber}>{MOCK_USER_DATA.stats.books}</Text>
                <Text style={styles.statLabel}>Books</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="star-outline" size={22} color="white" style={styles.statIcon} />
                <Text style={styles.statNumber}>{MOCK_USER_DATA.stats.points}</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="people-outline" size={22} color="white" style={styles.statIcon} />
                <Text style={styles.statNumber}>{MOCK_USER_DATA.stats.followers}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Bottom spacing for scroll */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
      {/* Create Author Account Button at the bottom */}
      <TouchableOpacity 
        style={styles.authorButton}
        onPress={handleCreateAuthorAccount}
        accessibilityLabel="Create author account"
      >
        <Feather name="edit-3" size={20} color="#222" style={{ marginRight: 10 }} />
        <Text style={styles.authorButtonText}>Create author account</Text>
        <View style={styles.arrowCircle}>
          <Ionicons name="arrow-forward-outline" size={16} color="#222" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F6F2',
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
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 10,
    backgroundColor: '#F9F6F2',
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#222',
    textAlign: 'center',
    flex: 1,
    fontWeight: '700',
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  membershipCard: {
    backgroundColor: 'transparent',
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    paddingLeft: 15,
    paddingRight: 15,
    shadowColor: '#FF6B47',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
  },
  papersBg: {
    flex: 1,
    width: '100%',
    minHeight: 380,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: 'rgba(255,107,53,0.92)',
  },
  cardHeader: {
    alignItems: 'flex-start',
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 25,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  brandText: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FF4444',
    fontWeight: 'bold',
    marginBottom: 0,
    letterSpacing: 0.2,
  },
  membershipText: {
    fontSize: 10,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#FFFFFF',
    letterSpacing: 1.1,
    opacity: 0.95,
    fontWeight: '500',
    marginTop: -2,
    marginLeft: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 6,
    zIndex: 10,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 3,
    marginBottom: 10,
    marginTop: 0,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 2,
    letterSpacing: 0.1,
  },
  userHandle: {
    fontSize: 13,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 0,
    marginTop: 0,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  memberSince: {
    fontSize: 10,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FFFFFF',
    letterSpacing: 1.1,
    fontWeight: '600',
    marginBottom: 2,
    marginTop: 2,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 8,
    width: '100%',
    gap: 0,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    gap: 0,
  },
  statIcon: {
    marginBottom: 0,
    marginTop: 2,
  },
  statNumber: {
    fontSize: 15,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 0,
    letterSpacing: 0.1,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '400',
    marginTop: 0,
    letterSpacing: 0.1,
  },
  authorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F6F2',
    marginHorizontal: 16,
    marginBottom: 54,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 27,
    height: 54,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  authorButtonText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#222',
    marginLeft: 0,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  arrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 60,
  },
});