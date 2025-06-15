import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

// Mock data - Replace with real API calls
const mockAuthorData = {
  name: 'J. K. Rowling',
  username: '@jkr',
  bio: 'Writer of Harry Potter and many more series, you know what. Writer sometimes known as Robert Galbraith',
  profileImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/J._K._Rowling_2010.jpg/800px-J._K._Rowling_2010.jpg',
  stats: {
    books: 5,
    posts: 145,
    followers: 8900, // 8.9K
  },
  isFollowing: true,
};

const mockBooks = [
  {
    id: 1,
    title: 'The Martian',
    author: 'Andy Weir',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Italo Calvino',
    author: 'Oscar Mondadori',
    cover: 'https://m.media-amazon.com/images/I/81bqwMW+gqL.jpg',
  },
  {
    id: 3,
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    cover: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=200&h=300&fit=crop',
  },
  {
    id: 4,
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    cover: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=200&h=300&fit=crop',
  },
];

// Add paper image import
const paperImage = require('../../src/assets/images/papers.png');

const mockTabs = ['Dashboard', 'Books', 'Notes', 'Community', 'You'];

export default function AuthorProfileScreen() {
  const [activeTab, setActiveTab] = React.useState('You');
  const handleBackPress = () => {
    // TODO: Implement navigation back
    router.back();
  };

  const handleSettingsPress = () => {
    router.push('/settings' as any);
  };

  const handleTabPress = (tab: string) => {
    router.push(`/${tab.toLowerCase()}` as any);
  };

  const handleFollowPress = () => {
    // TODO: Implement follow/unfollow API call
    console.log('Follow button pressed');
  };

  const handleBookPress = (bookId: number) => {
    router.push(`/book/${bookId}` as any);
  };

  const handleViewAllBooks = () => {
    router.push('/books' as any);
  };

  const formatFollowerCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F7BF7" />
    

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>This is how readers view your profile:</Text>
          
          <View style={styles.authorCard}>
            {/* Decorative papers */}
            <View style={styles.decorativePapers}>
              <Image source={paperImage} style={[styles.paper, styles.paper1]} />
              <Image source={paperImage} style={[styles.paper, styles.paper2]} />
              <Image source={paperImage} style={[styles.paper, styles.paper3]} />
              <Image source={paperImage} style={[styles.paper, styles.paper4]} />
            </View>
            
            {/* Pagez branding */}
            <View style={styles.brandingContainer}>
              <Text style={styles.pagezText}>pagez</Text>
              <Text style={styles.authorCardText}>AUTHOR CARD</Text>
            </View>
            
            {/* Author info */}
            <View style={styles.authorInfo}>
              <Image 
                source={{ uri: mockAuthorData.profileImage }} 
                style={styles.authorImage}
              />
              
              <Text style={styles.authorName}>{mockAuthorData.name}</Text>
              <Text style={styles.authorUsername}>{mockAuthorData.username}</Text>
              <Text style={styles.authorBio}>{mockAuthorData.bio}</Text>
              
              <TouchableOpacity 
                style={[styles.followButton, !mockAuthorData.isFollowing && styles.unfollowButton]}
                onPress={handleFollowPress}
              >
                <Text style={styles.followButtonText}>
                  {mockAuthorData.isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
              
              {/* Stats */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Ionicons name="book-outline" size={24} color="white" />
                  <Text style={styles.statNumber}>{mockAuthorData.stats.books}</Text>
                  <Text style={styles.statLabel}>Books</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Ionicons name="settings-outline" size={24} color="white" />
                  <Text style={styles.statNumber}>{mockAuthorData.stats.posts}</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Ionicons name="people-outline" size={24} color="white" />
                  <Text style={styles.statNumber}>{formatFollowerCount(mockAuthorData.stats.followers)}</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Books Section */}
        <View style={styles.booksSection}>
          <View style={styles.booksSectionHeader}>
            <View style={styles.booksHeaderLeft}>
              <Ionicons name="bookmark" size={20} color="#FF4444" />
              <Text style={styles.booksSectionTitle}>Books</Text>
            </View>
            <TouchableOpacity onPress={handleViewAllBooks}>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.booksScrollView}
          >
            {mockBooks.map((book) => (
              <TouchableOpacity
                key={book.id}
                onPress={() => handleBookPress(book.id)}
                style={styles.bookItem}
              >
                <Image source={{ uri: book.cover }} style={styles.bookCover} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4F7BF7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 60,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  settingsButton: {
    padding: 5,
  },
  profileButton: {
    padding: 2,
  },
  headerProfileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  tabContainer: {
    backgroundColor: '#4F7BF7',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
  },
  activeTabText: {
    color: 'white',
    fontFamily: 'Bogart-Bold-Trial',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  profileSection: {
    backgroundColor: '#F5F7FA',
    paddingTop: 20,
    alignItems: 'center',
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    marginBottom: 20,
  },
  authorCard: {
    width: screenWidth * 0.9,
    height: 470, // Increased height for the card
    backgroundColor: '#4F7BF7',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
    paddingBottom: 50,
  },
  decorativePapers: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  paper: {
    position: 'absolute',
    resizeMode: 'contain',
    opacity: 0.2, // Adjust opacity for subtle effect
  },
  paper1: {
    width: 100,
    height: 100,
    top: -20,
    left: -30,
    transform: [{ rotate: '-20deg' }],
  },
  paper2: {
    width: 80,
    height: 80,
    top: 50,
    right: -20,
    transform: [{ rotate: '30deg' }],
  },
  paper3: {
    width: 120,
    height: 120,
    bottom: -30,
    left: 20,
    transform: [{ rotate: '10deg' }],
  },
  paper4: {
    width: 90,
    height: 90,
    bottom: 40,
    right: -40,
    transform: [{ rotate: '-40deg' }],
  },
  brandingContainer: {
    position: 'absolute',
    top: 20,
    left: 130,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
  },
  pagezText: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#EB4D2A',
  },
  authorCardText: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'white',
    opacity: 0.8,
  },
  authorInfo: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  authorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
   
    marginBottom: 10,
  },
  authorName: {
    fontSize: 24,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    marginBottom: 5,
  },
  authorUsername: {
    fontSize: 16,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 15,
  },
  authorBio: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'white',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  followButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  unfollowButton: {
    backgroundColor: '#FF6B6B', // Example for unfollow state
  },
  followButtonText: {
    fontSize: 16,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#4F7BF7',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    color: 'white',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  booksSection: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 30,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  booksSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  booksHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  booksSectionTitle: {
    fontSize: 18,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#4F7BF7',
  },
  booksScrollView: {
    marginBottom: 20,
  },
  bookItem: {
    marginRight: 15,
  },
  bookCover: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
});