import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock data - Replace with real API calls
const bookmarkedBooks = [
  {
    id: '1',
    title: "Don't Look Back",
    author: 'Isaac Nelson',
    cover: 'https://danbrown.com/wp-content/uploads/2024/10/Dan-Brown_The-Da-Vinci-Code-book-cover_2024.jpg',
    badge: 'VOTED BEST THRILLER NOVEL 20XX',
  },
  {
    id: '2',
    title: 'Tarzan',
    author: 'Edgar Rice Burroughs',
    cover: 'https://m.media-amazon.com/images/I/91nOqRtayAL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: '3',
    title: 'Walk Into The Shadow',
    author: 'Estelle Darcy',
    cover: 'https://m.media-amazon.com/images/I/61051YAmm+L._UF1000,1000_QL80_.jpg',
  },
];

const continueReadingBooks = [
  {
    id: '4',
    title: 'Dune',
    author: 'Frank Herbert',
    cover: 'https://images.penguinrandomhouse.com/cover/9780593099322',
    progress: 58,
    currentPage: 589,
  },
  {
    id: '5',
    title: 'City of Orange',
    author: 'David Yoon',
    cover: 'https://m.media-amazon.com/images/I/91I6xuf2g9L.jpg',
    progress: 58,
    currentPage: 589,
  },
  {
    id: '6',
    title: 'The Moon and Stars',
    author: 'Jenna Warren',
    cover: 'https://m.media-amazon.com/images/I/61TVnvuvEsL._AC_UF1000,1000_QL80_.jpg',
    progress: 58,
    currentPage: 589,
  },
  {
    id: '7',
    title: 'Tarzan',
    author: 'Edgar Rice Burroughs',
    cover: 'https://m.media-amazon.com/images/I/91nOqRtayAL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: '8',
    title: "Don't Look Back",
    author: 'Isaac Nelson',
    cover: 'https://danbrown.com/wp-content/uploads/2024/10/Dan-Brown_The-Da-Vinci-Code-book-cover_2024.jpg',
  },
  {
    id: '9',
    title: 'Walk Into The Shadow',
    author: 'Estelle Darcy',
    cover: 'https://m.media-amazon.com/images/I/61051YAmm+L._UF1000,1000_QL80_.jpg',
  },
];

const HomeScreen = () => {
  // TODO: Replace with real API calls
  const handleBookPress = (bookId: string) => {
    router.push(`/book/${bookId}` as any);
  };

  const handleViewAllBookmarks = () => {
    router.push('/bookmarks' as any);
  };

  const handleSearchPress = () => {
    router.push('/search' as any);
  };

  const handleProfilePress = () => {
    router.push('/profile' as any);
  };

  const handleNavigation = (screen: string) => {
    router.push(`/${screen}` as any);
  };

  const renderBookmarkItem = (book: any) => (
    <TouchableOpacity
      key={book.id}
      style={styles.bookCoverWrapper}
      onPress={() => handleBookPress(book.id)}
    >
      <View style={styles.bookCoverContainer}>
        {book.badge && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{book.badge}</Text>
          </View>
        )}
        <Image source={{ uri: book.cover }} style={styles.bookCover} />
      </View>
    </TouchableOpacity>
  );

  const renderContinueReadingItem = (book: any) => (
    <TouchableOpacity
      key={book.id}
      style={styles.bookCoverWrapper}
      onPress={() => handleBookPress(book.id)}
    >
      <View style={styles.bookCoverContainer}>
        <Image source={{ uri: book.cover }} style={styles.bookCover} />
        {book.progress !== undefined && (
          <View style={styles.progressOverlay}>
            <Text style={styles.progressPercentage}>{book.progress}%</Text>
            <Text style={styles.progressPage}>Page {book.currentPage}</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${book.progress}%` }]} />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pagezLogo}>pagez</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={handleSearchPress}
          >
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfilePress}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' }} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Bookmarks Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="bookmark-outline" size={20} color="#FF6B35" />
              <Text style={styles.sectionTitle}>Bookmarks</Text>
            </View>
            <TouchableOpacity onPress={handleViewAllBookmarks} style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bookListContainer}
          >
            {bookmarkedBooks.map(renderBookmarkItem)}
          </ScrollView>
        </View>

        {/* Continue Reading Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="glasses-outline" size={20} color="#FF6B35" />
              <Text style={styles.sectionTitle}>Continue Reading...</Text>
            </View>
          </View>
          <View style={styles.continueReadingGrid}>
            {continueReadingBooks.map(renderContinueReadingItem)}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('home')}
        >
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('community')}
        >
          <Ionicons name="people-outline" size={24} color="#666" />
          <Text style={styles.navLabel}>Community</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => handleNavigation('library')}
        >
          <Ionicons name="cube-outline" size={24} color="#FF6B35" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Library</Text>
          <View style={styles.activeNavIndicator} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  pagezLogo: {
    fontSize: 28,
    fontFamily: 'Bogart-Bold-Trial',
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 18,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    paddingTop: 0,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: '600',
    color: '#333',
  },
  viewAllButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
  },
  viewAllButtonText: {
    fontSize: 14,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    fontWeight: '500',
  },
  bookListContainer: {
    paddingHorizontal: 20,
    gap: 15,
    paddingBottom: 10,
  },
  bookCoverWrapper: {
    width: 120,
    marginRight: 0,
    position: 'relative',
  },
  bookCoverContainer: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 100, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 30,
  },
  bookCover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FF6B35',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomRightRadius: 8,
    zIndex: 10,
  },
  badgeText: {
    fontSize: 9,
    fontFamily: 'Bogart-Regular-Trial',
    color: 'white',
    fontWeight: 'bold',
  },
  progressOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 14,
    fontFamily: 'Bogart-Bold-Trial',
    fontWeight: 'bold',
    color: '#333',
  },
  progressPage: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
    marginBottom: 5,
  },
  progressBarBackground: {
    width: '100%',
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  continueReadingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    gap: 15,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 25,
    gap: 40,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 20,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 12,
    fontFamily: 'Bogart-Regular-Trial',
    color: '#666',
  },
  activeNavLabel: {
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  activeNavIndicator: {
    height: 3,
    width: 30,
    backgroundColor: '#FF6B35',
    borderRadius: 1.5,
    position: 'absolute',
    bottom: -10,
  },
});

export default HomeScreen;